/* eslint-disable linebreak-style */
export default function decorate(block) {
  const titleText = block.querySelector('p');

  if (titleText) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('paragraph__otsk-ds-wrapper-title');
    wrapper.innerHTML = titleText.innerHTML;

    block.innerHTML = '';
    block.append(wrapper);
  }
}
