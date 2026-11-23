/**
 * Helpers shared by the MDX build plugins: heading ids (used for anchors and
 * the post table of contents) and the reading time estimate.
 *
 * Both `remark-heading-ids` (which sets the ids in the compiled post) and
 * `post-metadata` (which lists the headings for the table of contents) walk
 * the same parsed tree with `collectHeadings`, so their ids always match.
 */

export interface MdastNode {
  type: string;
  value?: string;
  depth?: number;
  children?: MdastNode[];
  data?: { hProperties?: Record<string, unknown> } & Record<string, unknown>;
}

export interface PostHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

const WORDS_PER_MINUTE = 200;
// Code is skimmed rather than read word by word.
const CODE_WORD_WEIGHT = 0.5;

const toText = (node: MdastNode): string =>
  node.value ?? (node.children ?? []).map(toText).join('');

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'section';

/**
 * Gives every heading a unique id (duplicates get `-1`, `-2`, ... suffixes)
 * and returns the h2 and h3 headings in document order.
 */
export const collectHeadings = (
  tree: MdastNode,
  onHeading?: (node: MdastNode, id: string) => void
): PostHeading[] => {
  const seen = new Map<string, number>();
  const headings: PostHeading[] = [];

  const visit = (node: MdastNode) => {
    if (node.type === 'heading') {
      const text = toText(node).trim();
      const base = slugify(text);
      const count = seen.get(base) ?? 0;
      const id = count === 0 ? base : `${base}-${count}`;

      seen.set(base, count + 1);
      onHeading?.(node, id);

      if (node.depth === 2 || node.depth === 3) {
        headings.push({ depth: node.depth, text, id });
      }

      return;
    }

    node.children?.forEach(visit);
  };

  visit(tree);

  return headings;
};

/** Estimated reading time in whole minutes, at least 1. */
export const getReadingMinutes = (tree: MdastNode) => {
  let proseWords = 0;
  let codeWords = 0;

  const countWords = (value = '') => value.split(/\s+/).filter(Boolean).length;

  const visit = (node: MdastNode) => {
    if (node.type === 'code') {
      codeWords += countWords(node.value);
      return;
    }

    if (node.type === 'text' || node.type === 'inlineCode') {
      proseWords += countWords(node.value);
    }

    node.children?.forEach(visit);
  };

  visit(tree);

  return Math.max(
    1,
    Math.round((proseWords + codeWords * CODE_WORD_WEIGHT) / WORDS_PER_MINUTE)
  );
};
