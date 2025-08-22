/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flipcards-wrapper');

  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // FLIP CARD: Each row should contain 3 cells: image, front content, back content
    if (cells.length === 3) {
      const li = document.createElement('li');
      li.classList.add('flip-card');
      li.setAttribute('tabindex', '0');
      moveInstrumentation(row, li);

      const flipInner = document.createElement('div');
      flipInner.className = 'flip-card-inner';

      const [imageCell, frontTextCell, backTextCell] = cells;

      const front = document.createElement('div');
      front.className = 'flip-card-front';

      const image = imageCell.querySelector('img');
      const picture = image
        ? createOptimizedPicture(image.src, image.alt || '', false, [{ width: '150' }])
        : '';
      const icon = document.createElement('div');
      icon.className = 'icon';
      if (picture) icon.append(picture);

      const frontText = document.createElement('div');
      frontText.className = 'text';
      frontText.innerHTML = `
        ${frontTextCell.innerHTML}
        <span class="flip-trigger">Click to flip 🔄</span>
      `;

      front.append(icon, frontText);

      const back = document.createElement('div');
      back.className = 'flip-card-back';
      back.innerHTML = `
        ${backTextCell.innerHTML}
        <span class="flip-trigger">🔄</span>
      `;

      flipInner.append(front, back);
      li.append(flipInner);
      ul.append(li);
    }
  });

  wrapper.append(ul);
  block.textContent = '';
  block.append(wrapper);

  // Flip interaction
  ul.querySelectorAll('.flip-card').forEach((card) => {
    const triggers = card.querySelectorAll('.flip-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => card.classList.toggle('flipped'));
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
}
