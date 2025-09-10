/* eslint-disable linebreak-style */
import { renderBlock } from '../../scripts/faintly.js';

export default async function decorate(block) {
  const quote = block.children[0].textContent.trim();
  const authorName = block.children[1].textContent.trim();
  await renderBlock(block, {
    quote,
    authorName,
    someFunction: () => `${authorName} test`,
  });
}
