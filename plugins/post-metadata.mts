import { readFile } from 'node:fs/promises';

import { createProcessor } from '@mdx-js/mdx';
import { toJs } from 'estree-util-to-js';
import type { Plugin } from 'vite';

import {
  collectHeadings,
  getReadingMinutes,
  type MdastNode,
} from './mdx-headings.mts';

const POST_METADATA_QUERY = '?metadata';
const POST_METADATA_PREFIX = '\0post-metadata:';

/**
 * Resolves `*.mdx?metadata` imports to a module that only contains the post's
 * `export const metadata = {...}` statement, plus two values computed from
 * the post body: `readingMinutes` and `headings` (the h2/h3 headings with the
 * ids that `remark-heading-ids` gives them). This lets the post lists import
 * the metadata of every post eagerly while the post bodies stay in their own
 * lazily loaded chunks.
 *
 * The resolved id starts with `\0`, so @mdx-js/rollup does not compile it.
 */
export const postMetadata = (): Plugin => ({
  name: 'post-metadata',
  enforce: 'pre',
  async resolveId(source, importer) {
    if (!source.endsWith(`.mdx${POST_METADATA_QUERY}`)) return null;

    const resolved = await this.resolve(
      source.slice(0, -POST_METADATA_QUERY.length),
      importer,
      { skipSelf: true }
    );

    return resolved ? `${POST_METADATA_PREFIX}${resolved.id}` : null;
  },
  async load(id) {
    if (!id.startsWith(POST_METADATA_PREFIX)) return null;

    const file = id.slice(POST_METADATA_PREFIX.length);
    this.addWatchFile(file);

    const tree = createProcessor().parse(await readFile(file, 'utf8'));
    const program: Parameters<typeof toJs>[0] = {
      type: 'Program',
      sourceType: 'module',
      body: tree.children.flatMap((node) =>
        node.type === 'mdxjsEsm' && node.data?.estree
          ? node.data.estree.body.filter(
              (statement) =>
                statement.type === 'ExportNamedDeclaration' &&
                statement.declaration?.type === 'VariableDeclaration' &&
                statement.declaration.declarations.some(
                  (declaration) =>
                    declaration.id.type === 'Identifier' &&
                    declaration.id.name === 'metadata'
                )
            )
          : []
      ),
    };

    const computed = [
      `export const readingMinutes = ${getReadingMinutes(tree as MdastNode)};`,
      `export const headings = ${JSON.stringify(collectHeadings(tree as MdastNode))};`,
    ].join('\n');

    // Missing metadata fails the Zod validation in src/core/utils/post.
    if (program.body.length === 0) {
      return `export const metadata = undefined;\n${computed}`;
    }

    return `${toJs(program).value}\n${computed}`;
  },
});
