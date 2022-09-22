export default function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.search-results')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
