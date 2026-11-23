/**
 * Keeps list rendering identical to the previous Next.js build, which compiled
 * MDX with mdxjs-rs (`experimental.mdxRs`).
 *
 * mdxjs-rs marks a list as loose (wrapping each item in a <p>) when it is
 * followed by two or more blank lines. With nested lists only the innermost
 * list that ends the block is affected. micromark, used by @mdx-js/mdx,
 * follows CommonMark and keeps those lists tight. This plugin applies the
 * mdxjs-rs behaviour so existing posts render the same way.
 *
 * Details that match mdxjs-rs:
 * - The line break that ends the last line of the file is not a blank line.
 * - `\r\n`, `\r` and `\n` are all line endings.
 * - For a list inside a blockquote, only blank lines inside that blockquote
 *   count (lines that contain nothing but `>` markers). Blank lines after the
 *   blockquote do not.
 *
 * Other containers (JSX blocks, footnotes, and so on) are not special-cased.
 */

interface Position {
  start: { line: number };
  end: { line: number };
}

interface MdastNode {
  type: string;
  children?: MdastNode[];
  spread?: boolean | null;
  position?: Position;
}

interface Container {
  /** Blockquote nesting depth of the list */
  quoteDepth: number;
  /** Last line (1-based) that belongs to the enclosing blockquote */
  lastLine: number;
}

const isBlankLine = (line: string, quoteDepth: number) =>
  (quoteDepth > 0 ? line.replace(/^(?:\s*>)+/, '') : line).trim() === '';

const countBlankLinesAfter = (
  lines: string[],
  line: number,
  { quoteDepth, lastLine }: Container
) => {
  let count = 0;

  // `line` is 1-based, so lines[line] is the line right after it.
  for (let index = line; index < Math.min(lines.length, lastLine); index++) {
    if (!isBlankLine(lines[index], quoteDepth)) break;
    count++;
  }

  return count;
};

const endsWithNestedList = (list: MdastNode) => {
  const lastItem = list.children?.at(-1);
  const lastChild = lastItem?.children?.at(-1);

  return (
    lastChild?.type === 'list' &&
    lastChild.position?.end.line === list.position?.end.line
  );
};

export const remarkMdxRsListSpread =
  () => (tree: MdastNode, file: { value: unknown }) => {
    const lines = String(file.value).split(/\r\n|\r|\n/);

    // The line ending of the last line is not followed by another line.
    if (lines.at(-1) === '') lines.pop();

    const visit = (node: MdastNode, container: Container) => {
      if (
        node.type === 'list' &&
        node.position &&
        !endsWithNestedList(node) &&
        countBlankLinesAfter(lines, node.position.end.line, container) >= 2
      ) {
        node.spread = true;
      }

      const childContainer =
        node.type === 'blockquote' && node.position
          ? {
              quoteDepth: container.quoteDepth + 1,
              lastLine: node.position.end.line,
            }
          : container;

      node.children?.forEach((child) => visit(child, childContainer));
    };

    visit(tree, { quoteDepth: 0, lastLine: Infinity });
  };
