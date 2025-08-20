/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('flipcard-list');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('paragraph__card--type-j');

    moveInstrumentation(row, li);

    const frontImageCell = row.children[0];
    const frontTextCell = row.children[1];
    const backTextCell = row.children[2];

    // Create card container
    const cardContent = document.createElement('div');
    cardContent.className = 'paragraph__card-content';

    // === FRONT SIDE ===
    const frontSide = document.createElement('div');
    frontSide.className = 'paragraph__card-content--front-side';

    const frontImgEl = frontImageCell.querySelector('img');
    if (frontImgEl) {
      const optimizedPic = createOptimizedPicture(frontImgEl.src, frontImgEl.alt, false, [
        { width: '750' },
      ]);
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'paragraph__image';
      moveInstrumentation(frontImgEl, optimizedPic.querySelector('img'));
      imgWrapper.append(optimizedPic);
      frontSide.append(imgWrapper);
    }

    const frontText = document.createElement('div');
    frontText.innerHTML = frontTextCell.innerHTML;
    frontSide.append(frontText);

    const frontFooter = document.createElement('div');
    frontFooter.className = 'paragraph__card-content--front-side-footer';
    frontFooter.innerHTML = `
      <p>Click to flip card for more information</p>
      <button class="flip-button" aria-label="Flip card"></button>
    `;
    frontSide.append(frontFooter);

    // === BACK SIDE ===
    const backSide = document.createElement('div');
    backSide.className = 'paragraph__card-content--back-side';

    const backContent = document.createElement('div');
    backContent.innerHTML = backTextCell.innerHTML;
    backSide.append(backContent);

    const backButton = document.createElement('button');
    backButton.className = 'flip-button back';
    backButton.setAttribute('aria-label', 'Flip back');
    backSide.append(backButton);

    // Append both sides to card
    cardContent.append(frontSide, backSide);
    li.append(cardContent);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);

  // === FLIP FUNCTIONALITY ===
  ul.querySelectorAll('.flip-button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.paragraph__card--type-j');
      card.classList.toggle('flip');
    });
  });
}
