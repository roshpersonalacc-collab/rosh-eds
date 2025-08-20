/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style, no-unused-vars
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flipcards-wrapper');

  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // TITLE: Single cell = heading text
    if (cells.length === 1) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'flipcards-title';
      titleDiv.innerHTML = cells[0].innerHTML;
      wrapper.append(titleDiv);
      return;
    }

    // FLIP CARD: Should be 3 cells
    if (cells.length === 3) {
      const li = document.createElement('li');
      li.classList.add('flip-card');
      li.setAttribute('tabindex', '0');

      moveInstrumentation(row, li);
      const flipInner = document.createElement('div');
      flipInner.className = 'flip-card-inner';

      const [iconCell, frontTextCell, backTextCell] = cells;

      const front = document.createElement('div');
      front.className = 'flip-card-front';
      const icon = document.createElement('div');
      icon.className = 'icon';
      icon.innerHTML = iconCell?.innerHTML || '👤';

      const frontText = document.createElement('div');
      frontText.className = 'text';
      frontText.innerHTML = `
        ${frontTextCell?.innerHTML || ''}
        <span class="flip-trigger">Click to flip card for more information 🔄</span>
      `;
      front.append(icon, frontText);

      const back = document.createElement('div');
      back.className = 'flip-card-back';
      back.innerHTML = `
        ${backTextCell?.innerHTML || ''}
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

  // Flip logic
  ul.querySelectorAll('.flip-card').forEach((card) => {
    const triggers = card.querySelectorAll('.flip-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
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
