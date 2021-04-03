class Gallery {
    constructor() {
        this.page = 1;
        this.search = '';
        this.KEY = '20957573-739e267d9cf8553f9fb24fb52';
        this.BASIC_URL = 'https://pixabay.com/api/';
    }

    fetchPhoto() {
        return fetch(`${this.BASIC_URL}?image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=12&key=${this.KEY}`)
            .then(response => response.json())
            .then(result => result.hits)
            .catch(error => error)
    }

    incrementPage() {
        this.page += 1
    }

    get query() {
        return this.seatch;
    }

    set query(newQuery) {
        console.log(newQuery);
        return this.search = newQuery;
    }


    
}

export default Gallery;
