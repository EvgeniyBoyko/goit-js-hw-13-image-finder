import './styles.css';
import markup from './templates/createMarkupCard.hbs';
import ApiService from './js/apiService.js';

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
    service.resetPage();
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

function createMarkupCard(photo) {
    const card = markup(photo)
    refs.gallery.insertAdjacentHTML('beforeend', card);
}