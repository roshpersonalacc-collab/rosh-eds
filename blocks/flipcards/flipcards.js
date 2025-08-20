/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('flip-card');
    li.setAttribute('tabindex', '0');

    moveInstrumentation(row, li);

    const flipInner = document.createElement('div');
    flipInner.className = 'flip-card-inner';

    // Cells from the CMS block
    const iconCell = row.children[0]; // Emoji or image/icon
    const frontTextCell = row.children[1]; // Front title and subtitle
    const backTextCell = row.children[2]; // Back content

    /* === FRONT SIDE === */
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

    /* === BACK SIDE === */
    const back = document.createElement('div');
    back.className = 'flip-card-back';

    back.innerHTML = `
      ${backTextCell?.innerHTML || ''}
      <span class="flip-trigger">🔄</span>
    `;

    // Assemble the card
    flipInner.append(front, back);
    li.append(flipInner);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);

  // === Flip interaction (click + keyboard) ===
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
