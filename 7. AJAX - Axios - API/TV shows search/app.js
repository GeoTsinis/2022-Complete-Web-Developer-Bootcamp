const myForm = document.querySelector('#searchForm');
const showsList = document.querySelector('#shows');

myForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clear();
    const searchTerm = myForm.elements.query.value;
    const config = { params: {q: searchTerm} } // here I can add params and headers for the http request
    const result = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    genShowImages(result.data);
    myForm.elements.query.value = "";
})

const genShowImages = (shows) => {
    for (let res of shows) {
        if (res.show.image) {
            const img = document.createElement('IMG');
            const show = document.createElement('LI');
            img.src = res.show.image.medium;
            show.append(img);
            showsList.append(show);
        } 
    }
}

function clear() {
    showsList.innerHTML = "";
}