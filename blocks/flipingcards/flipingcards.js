/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Extracting each column
    const iconCol = row.querySelector(':scope > div:nth-child(1)');
    const frontTextCol = row.querySelector(':scope > div:nth-child(2)');
    const backTextCol = row.querySelector(':scope > div:nth-child(3)');
    // eslint-disable-next-line no-unused-vars
    const ctaCol = row.querySelector(':scope > div:nth-child(4)');
    // eslint-disable-next-line no-unused-vars
    const ctaTextCol = row.querySelector(':scope > div:nth-child(5)');

    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    flipCard.tabIndex = 0;

    flipCard.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="icon">${iconCol?.innerHTML || ''}</div>
          <div class="text">
            ${frontTextCol?.innerHTML || ''}
            <span class="flip-trigger">🔄</span>
          </div>
        </div>
        <div class="flip-card-back">
          <div class="text">
            ${backTextCol?.innerHTML || ''}
          </div>
          <span class="flip-trigger">🔄</span>
        </div>
      </div>
    `;

    // Add click handler to both flip triggers
    flipCard.querySelectorAll('.flip-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        flipCard.classList.toggle('flipped');
      });
    });

    li.append(flipCard);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
