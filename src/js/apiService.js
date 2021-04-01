async function fetchPhoto(search, num) {
    const BASIC_URL = 'https://pixabay.com/api/';
    const KEY = '20957573-739e267d9cf8553f9fb24fb52';   
    try {
        const response = await fetch(`${BASIC_URL}?image_type=photo&orientation=horizontal&q=${search}&page=${num}&per_page=12&key=${KEY}`);
        if (!response.ok) {
            throw new Error("Добавление не удалось")
        }
        const response = await response.json();
        
    } catch (error) {
        console.log(error);
    }
}