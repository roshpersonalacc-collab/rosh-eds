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

    if (cells.length === 3) {
      const li = document.createElement('li');
      li.classList.add('flip-card');
      li.setAttribute('tabindex', '0');
      moveInstrumentation(row, li);

      // Flippable container
      const flipContainer = document.createElement('div');
      flipContainer.className = 'flip-card-container';

      // FRONT SIDE
      const front = document.createElement('div');
      front.className = 'flip-card-front';

      const image = cells[0].querySelector('img');
      const picture = image
        ? createOptimizedPicture(image.src, image.alt || '', false, [{ width: '250' }])
        : '';

      const frontContent = document.createElement('div');
      frontContent.className = 'flip-card-content';

      if (picture) {
        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.append(picture);
        frontContent.appendChild(icon);
      }

      const frontText = document.createElement('div');
      frontText.className = 'text';
      frontText.innerHTML = cells[1].innerHTML;
      frontContent.appendChild(frontText);

      // FRONT Flip trigger (text + icon)
      const frontTriggerWrapper = document.createElement('div');
      frontTriggerWrapper.className = 'flip-trigger-wrapper';

      const frontTriggerText = document.createElement('span');
      frontTriggerText.className = 'flip-text';
      frontTriggerText.textContent = 'Click to flip for more information';

      const frontTriggerBtn = document.createElement('button');
      frontTriggerBtn.className = 'flip-trigger';
      frontTriggerBtn.setAttribute('type', 'button');
      frontTriggerBtn.setAttribute('aria-label', 'Flip card');
      frontTriggerBtn.innerHTML = `
        <img src="https://author-p135369-e1615158.adobeaemcloud.com/ui#/aem/assetdetails.html/content/dam/your-project/flip-icon.svg" alt="Flip icon">
      `;

      frontTriggerWrapper.append(frontTriggerText, frontTriggerBtn);
      front.append(frontContent, frontTriggerWrapper);

      // BACK SIDE
      const back = document.createElement('div');
      back.className = 'flip-card-back';

      const backContent = document.createElement('div');
      backContent.className = 'flip-card-content';

      const backText = document.createElement('div');
      backText.className = 'text';
      backText.innerHTML = cells[2].innerHTML;
      backContent.appendChild(backText);

      // BACK flip trigger (icon only, right-aligned)
      const backTriggerWrapper = document.createElement('div');
      backTriggerWrapper.className = 'flip-trigger-wrapper';

      const backTriggerBtn = document.createElement('button');
      backTriggerBtn.className = 'flip-trigger';
      backTriggerBtn.setAttribute('type', 'button');
      backTriggerBtn.setAttribute('aria-label', 'Flip card');
      backTriggerBtn.innerHTML = `
        <img src="https://author-p135369-e1615158.adobeaemcloud.com/ui#/aem/assetdetails.html/content/dam/your-project/flip-icon.svg" alt="Flip icon">
      `;

      backTriggerWrapper.appendChild(backTriggerBtn);
      back.append(backContent, backTriggerWrapper);

      // Combine
      flipContainer.append(front, back);
      li.append(flipContainer);
      ul.append(li);

      // Flip on trigger button click
      [frontTriggerBtn, backTriggerBtn].forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          flipContainer.classList.toggle('flipping-card-container--flipped');
        });
      });

      // Keyboard accessibility
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipContainer.classList.toggle('flipping-card-container--flipped');
        }
      });
    }
  });

  wrapper.append(ul);
  block.textContent = '';
  block.append(wrapper);
}
