/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  // eslint-disable-next-line linebreak-style

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const imageDiv = row.querySelector(':scope > div:nth-child(1)');
    const altText = row.querySelector(':scope > div:nth-child(2)')?.textContent || '';
    const backTextDiv = row.querySelector(':scope > div:nth-child(3)');
    const ctaHref = row.querySelector(':scope > div:nth-child(4) a')?.href || '#';
    const ctaLabel = row.querySelector(':scope > div:nth-child(5)')?.textContent || 'Learn More';

    const img = imageDiv?.querySelector('img');
    const optimizedPic = img
      ? createOptimizedPicture(img.src, altText, false, [{ width: '750' }])
      : '';

    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          ${optimizedPic.outerHTML}
        </div>
        <div class="flip-card-back">
          <div class="text">${backTextDiv?.innerHTML || ''}</div>
          <a class="cta" href="${ctaHref}">${ctaLabel}</a>
        </div>
      </div>
    `;

    li.append(card);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
