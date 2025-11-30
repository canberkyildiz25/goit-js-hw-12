import { searchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('searchForm');
const searchInput = document.querySelector('.search-input');
const loadingMessage = document.getElementById('loadingMessage');
const searchResults = document.getElementById('searchResults');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let lightbox = null;
let currentQuery = '';
let currentPage = 1;
const perPage = 40;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  // Clear previous results
  searchResults.innerHTML = '';

  // Show loading message
  loadingMessage.style.display = 'block';
  // Reset pagination state and hide load more initially
  loadMoreBtn.style.display = 'none';
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  try {
    const data = await searchImages(currentQuery, currentPage, perPage);

    // Hide loading message
    loadingMessage.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000,
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#fff',
      });
      return;
    }

    totalHits = data.totalHits || 0;
    displayImages(data.hits);

    // Determine if more pages are available
    const hasMore = currentPage * perPage < totalHits;
    loadMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
  } catch (error) {
    loadingMessage.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Sorry, something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
      progressBarColor: '#fff',
    });
  }
});

loadMoreBtn?.addEventListener('click', async () => {
  // Increment page for next request
  currentPage += 1;
  // Show loader while fetching additional images
  loadingMessage.style.display = 'block';

  try {
    const data = await searchImages(currentQuery, currentPage, perPage);
    loadingMessage.style.display = 'none';

    if (data.hits.length === 0) {
      // No more images; hide the button
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
        timeout: 5000,
      });
      return;
    }

    displayImages(data.hits);

    // Smoothly scroll by two card heights after appending
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    const hasMore = currentPage * perPage < (data.totalHits || totalHits);
    totalHits = data.totalHits || totalHits;
    loadMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
    if (!hasMore) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
        timeout: 5000,
      });
    }
  } catch (error) {
    loadingMessage.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Sorry, something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
      progressBarColor: '#fff',
    });
  }
});

function displayImages(images) {
  const markup = images
    .map(
      image => `
        <div class="gallery-item">
          <a href="${image.largeImageURL}" class="gallery-link">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </div>
      `
    )
    .join('');

  // Append new items to the gallery
  searchResults.insertAdjacentHTML('beforeend', markup);

  // Initialize or refresh SimpleLightbox
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-link', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}
