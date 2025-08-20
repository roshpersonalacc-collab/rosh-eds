/* eslint-disable linebreak-style */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // TITLE: If there's only 1 column, treat as static title block
    if (cells.length === 1) {
      const titleWrapper = document.createElement('div');
      titleWrapper.classList.add('flipcard-title');
      titleWrapper.innerHTML = cells[0].innerHTML;
      block.append(titleWrapper);
      return;
    }

    // FLIP CARD: Requires exactly 3 cells
    if (cells.length === 3) {
      const li = document.createElement('li');
      li.classList.add('flip-card');
      li.setAttribute('tabindex', '0');
      moveInstrumentation(row, li);

      const flipInner = document.createElement('div');
      flipInner.className = 'flip-card-inner';

      // Cells: icon | front content | back content
      const [iconCell, frontTextCell, backTextCell] = cells;

      /* FRONT */
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

      /* BACK */
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

  // Clear original block and add processed items
  block.textContent = '';
  block.append(ul);

  // FLIP LOGIC
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
