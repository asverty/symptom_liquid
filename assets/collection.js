// FILTERS

const newOutline = document.querySelector('#filter-new-outline');
const minOutline = document.querySelector('#filter-min-price-outline');
const maxOutline = document.querySelector('#filter-max-price-outline');
const currentUrl = String(document.URL);

if (currentUrl.includes('sort_by=created-descending')) {
  newOutline.classList.remove('filters__filter-outline_hidden');
} else if (currentUrl.includes('sort_by=price-ascending')) {
  minOutline.classList.remove('filters__filter-outline_hidden');
} else if (currentUrl.includes('sort_by=price-descending')) {
  maxOutline.classList.remove('filters__filter-outline_hidden');
}
