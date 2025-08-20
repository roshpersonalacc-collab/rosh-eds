/* eslint-disable linebreak-style */
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create a <ul> to wrap the cards
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Build the flip card structure
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    flipCard.setAttribute('tabindex', '0');

    const flipCardInner = document.createElement('div');
    flipCardInner.className = 'flip-card-inner';

    const [iconDiv, textDiv] = row.children;

    // --- FRONT SIDE ---
    const front = document.createElement('div');
    front.className = 'flip-card-front';

    // Icon
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon';

    const picture = iconDiv.querySelector('picture');
    const img = picture?.querySelector('img');

    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '75' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconContainer.appendChild(optimizedPic);
    }

    // Text
    const textContainer = document.createElement('div');
    textContainer.className = 'text';

    // Move over heading and paragraph
    [...textDiv.children].forEach((child) => {
      textContainer.appendChild(child);
    });

    // Add flip trigger
    const triggerFront = document.createElement('span');
    triggerFront.className = 'flip-trigger';
    triggerFront.textContent = 'Click to flip card for more information';
    textContainer.appendChild(triggerFront);

    front.append(iconContainer, textContainer);

    // --- BACK SIDE ---
    const back = document.createElement('div');
    back.className = 'flip-card-back';

    const backText = document.createElement('p');
    backText.textContent =
      'In agitation that may happen with dementia due to Alzheimer’s disease...';

    const ulList = document.createElement('ul');
    ulList.innerHTML = `
      <li>Agitated behaviors</li>
      <li>Restless mannerisms</li>
    `;

    const triggerBack = document.createElement('span');
    triggerBack.className = 'flip-trigger';
    triggerBack.textContent = '🔄';

    back.append(backText, ulList, triggerBack);

    // Compose flip card
    flipCardInner.append(front, back);
    flipCard.appendChild(flipCardInner);
    li.appendChild(flipCard);
    ul.appendChild(li);
  });

  // Flip functionality
  ul.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // Clear existing and inject final structure
  block.textContent = '';
  block.appendChild(ul);
}
