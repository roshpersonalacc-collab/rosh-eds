/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'paragraph__otsk-ds-wrapper',
    'paragraph__otsk-ds-wrapper--default',
    'complex-cards-j',
    'spacer-ds',
  );

  const container = document.createElement('div');
  container.classList.add('container__container', 'container');

  const content = document.createElement('div');
  content.classList.add('paragraph__otsk-ds-wrapper-content');

  const title = block.querySelector('p');
  if (title) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('paragraph__otsk-ds-wrapper-title');

    const titleField = document.createElement('div');
    titleField.classList.add(
      'field',
      'field-name-field-otsk-ds-wrapper-title',
      'field-type-text',
      'field-label-hidden',
    );

    const titleItem = document.createElement('div');
    titleItem.classList.add('field--item');
    titleItem.innerHTML = title.innerHTML;

    titleField.appendChild(titleItem);
    titleWrapper.appendChild(titleField);
    content.appendChild(titleWrapper);
  }

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('paragraph__otsk-ds-wrapper-paragraphs');

  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    if (cells.length !== 3) return;

    const li = document.createElement('li');
    li.classList.add('flip-card');
    li.setAttribute('tabindex', '0');
    moveInstrumentation(row, li);

    const flipInner = document.createElement('div');
    flipInner.className = 'flip-card-inner';

    const [iconCell, frontTextCell, backTextCell] = cells;

    // ✅ Use createOptimizedPicture if there's an <img> in iconCell
    let optimizedIconHTML = '';
    const img = iconCell.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const optimizedPicture = createOptimizedPicture(src, alt, false, [{ width: 150 }]);
      optimizedIconHTML = optimizedPicture.outerHTML;
    }

    const front = document.createElement('div');
    front.className = 'flip-card-front';
    front.innerHTML = `
      <div class="icon">${optimizedIconHTML}</div>
      <div class="text">
        ${frontTextCell.innerHTML}
        <div class="paragraph__card-content--front-side-footer">
          <p>Click to flip card for more information</p>
          <button type="button" class="flip-button front" title="Flip the card">↺</button>
        </div>
      </div>`;

    const back = document.createElement('div');
    back.className = 'flip-card-back';
    back.innerHTML = `
      <div class="text">${backTextCell.innerHTML}</div>
      <button type="button" class="flip-button back" title="Flip the card">↺</button>`;

    flipInner.append(front, back);
    li.append(flipInner);
    ul.append(li);
  });

  cardWrapper.append(ul);
  content.append(cardWrapper);
  container.append(content);
  wrapper.append(container);
  block.textContent = '';
  block.append(wrapper);

  // Flip logic
  ul.querySelectorAll('.flip-card').forEach((card) => {
    card.querySelectorAll('.flip-button').forEach((btn) => {
      btn.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
}
