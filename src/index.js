import makeSearchQuery from './scripts/makeQuery';
import gallery from './scripts/gallery';
import makeSmoothScroll from './scripts/smoothScroll';
import { createMarkup, clearMarkup } from './scripts/markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addInfScroll, removeInfScroll } from './scripts/infiniteScroll';

const searchFormRef = document.querySelector('.search-form');
const contentParentElement = document.querySelector('.search-results');

let query = '';
let pageNumber = 1;
let totalPages = 1;
let totalHits = 0;
const itemsOnPage = 40;

searchFormRef.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(evt) {
  evt.preventDefault();

  query = evt.target.searchQuery.value;

  if (query === '') {
    return;
  }
  pageNumber = 1;
  totalPages = 1;
  clearMarkup(contentParentElement);
  searchImages();
}

async function searchImages() {
  try {
    const response = await makeSearchQuery(query, pageNumber, itemsOnPage);
    requestHandler(response);
  } catch (error) {
    console.log(error);
  }
}

function requestHandler({ data }) {
  const content = data.hits;
  if (!content[0]) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  totalHits = data.totalHits;
  totalPages = Math.ceil(totalHits / itemsOnPage);
  createMarkup(content, contentParentElement);
  gallery.refresh();
  addInfScroll(loadNextPage);
  pageNumber !== 1 && makeSmoothScroll();
}

function loadNextPage() {
  removeInfScroll();
  if (totalPages === pageNumber) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
    return;
  }
  pageNumber += 1;
  searchImages();
  console.log(`total pages: ${totalPages}`);
  console.log(`current page: ${pageNumber}`);
}
