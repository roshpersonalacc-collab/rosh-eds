/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// import { createOptimizedPicture } from '../../scripts/aem.js';
// import { moveInstrumentation } from '../../scripts/scripts.js';

// export default function decorate(block) {
//   const wrapper = document.createElement('div');
//   wrapper.classList.add('flipcards-wrapper');

//   const ul = document.createElement('ul');
//   ul.classList.add('flipcard-list');

//   [...block.children].forEach((row) => {
//     const cells = [...row.children];

//     // Case 1: Section Title (single cell row)
//     if (cells.length === 1) {
//       const titleDiv = document.createElement('div');
//       titleDiv.className = 'flipcards-title';
//       titleDiv.innerHTML = cells[0].innerHTML;
//       wrapper.append(titleDiv);
//       return;
//     }

//     // Case 2: Flip Card (expects 3 cells: icon, front text, back text)
//     if (cells.length === 3) {
//       const li = document.createElement('li');
//       li.classList.add('flip-card');
//       li.setAttribute('tabindex', '0');
//       moveInstrumentation(row, li);

//       const flipInner = document.createElement('div');
//       flipInner.className = 'flip-card-inner';

//       const [iconCell, frontTextCell, backTextCell] = cells;

//       // Front Side
//       const front = document.createElement('div');
//       front.className = 'flip-card-front';

//       const icon = document.createElement('div');
//       icon.className = 'icon';
//       const picture = iconCell.querySelector('picture');
//       if (picture) {
//         const img = picture.querySelector('img');
//         const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
//         moveInstrumentation(img, optimized.querySelector('img'));
//         icon.append(optimized);
//       }

//       const frontText = document.createElement('div');
//       frontText.className = 'text';
//       frontText.innerHTML = `
//         ${frontTextCell?.innerHTML || ''}
//         <span class="flip-trigger">Click to flip card for more information 🔄</span>
//       `;
//       front.append(icon, frontText);

//       // Back Side
//       const back = document.createElement('div');
//       back.className = 'flip-card-back';
//       back.innerHTML = `
//         ${backTextCell?.innerHTML || ''}
//         <span class="flip-trigger">🔄</span>
//       `;

//       flipInner.append(front, back);
//       li.append(flipInner);
//       ul.append(li);
//     }
//   });

//   wrapper.append(ul);
//   block.textContent = '';
//   block.append(wrapper);

//   // Flip interactivity
//   ul.querySelectorAll('.flip-card').forEach((card) => {
//     const triggers = card.querySelectorAll('.flip-trigger');

//     triggers.forEach((trigger) => {
//       trigger.addEventListener('click', () => {
//         card.classList.toggle('flipped');
//       });
//     });

//     card.addEventListener('keydown', (e) => {
//       if (e.key === 'Enter' || e.key === ' ') {
//         e.preventDefault();
//         card.classList.toggle('flipped');
//       }
//     });
//   });
// }
