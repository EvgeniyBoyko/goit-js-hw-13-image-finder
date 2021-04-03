import './styles.css';
import markup from './templates/createMarkupCard.hbs';
import ApiService from './js/apiService.js';
// import { search } from 'core-js/fn/symbol';

const refs = {
    input: document.querySelector('#search-form'),
    btn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const service = new ApiService();

refs.input.addEventListener('submit', onSearchPhoto)

refs.btn.addEventListener('click', onClickLoadMoreBtn)


function onSearchPhoto(e) {
    e.preventDefault()

    refs.gallery.innerHTML = '';
    service.query = e.currentTarget.elements.query.value;
    service.fetchPhoto().then(createMarkupCard);
    
}

function onClickLoadMoreBtn(e) {
    e.preventDefault()

    service.fetchPhoto().then(result => {
        const lastPhoto = document.querySelector('.gallery-item:last-child')
        createMarkupCard(result)
        if (lastPhoto) {
            const sctollValue = lastPhoto.offsetTop + lastPhoto.clientHeight;
            window.scrollTo({
                top: sctollValue,
                behavior: 'smooth',
            })
        }
    });
    service.incrementPage()
}

// async function loadMore() {
//     service.page += 1;
//     
//     
//     try {
//         const { markupCard } = await onSearchPhoto();
//         console.log(markupCard);
//     } catch (error) {
//         return error;
//     }
// }

function createMarkupCard(photo) {
    const card = markup(photo)
    refs.gallery.insertAdjacentHTML('beforeend', card);
}













// refs.input.addEventListener('submit', onSearchInput)
// refs.btn.addEventListener('click', async function(e){
//     e.preventDefault()
    
//     const options = {
//     search,
//     page: 1,
//     perPage: 12,
//     }
//     options.page += 1
//     const {data} = await axios.get(searchURL)
//     const cards = markup(data.hits);
//     refs.gallery.insertAdjacentHTML('beforeend', cards)
// })
// function observeLastPhoto() {
//     const observeCallback = async (entries, observer) => {
//         const elem = entries[0];
//         if (elem.isIntersecting) {
//             observer.unobserve(elem.target)
//             await loadMorePhoto()
//             const last = document.querySelector('.gallery:last-child')
//             observer.observe(last)
//         }
//     }
// }

// async function onSearchInput(e) {
//     e.preventDefault()
//     const search = this.querySelector('#gallery-input').value
//     const options = {
//         search,
//         page: 1,
//         perPage: 12,
//     }
//     const searchURL = fetchPhoto(options)
//     try {
//         const {data} = await axios.get(searchURL)
//         const cards = markup(data.hits);
//         refs.gallery.insertAdjacentHTML('beforeend', cards)
       
//     } catch (error) {
//         console.log(error);
//     }
// }

// function fetchPhoto({ search, pege, perPage }) {
//     const KEY = '20957573-739e267d9cf8553f9fb24fb52';
//     const BASIC_URL = 'https://pixabay.com/api/';
//     const url = `${BASIC_URL}?image_type=photo&orientation=horizontal&q=${search}&page=${pege}&per_page=${perPage}&key=${KEY}`;
//     return url;
// }

