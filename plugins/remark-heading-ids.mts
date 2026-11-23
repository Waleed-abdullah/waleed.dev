import { collectHeadings, type MdastNode } from './mdx-headings.mts';

/**
 * Sets an `id` on every heading of a post, so headings can be linked to and
 * listed in the table of contents (see `headings` in the post-metadata plugin).
 */
export const remarkHeadingIds = () => (tree: MdastNode) => {
  collectHeadings(tree, (node, id) => {
    node.data = {
      ...node.data,
      hProperties: { ...node.data?.hProperties, id },
    };
  });
};
