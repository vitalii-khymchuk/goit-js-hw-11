import cardTpl from '../templates/cardTpl.hbs';

export function createMarkup(content, contentParentElement) {
  const markup = cardTpl(content);
  contentParentElement.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup(contentParentElement) {
  contentParentElement.innerHTML = '';
}
