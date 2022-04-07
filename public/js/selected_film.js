// Eventlistener para guardar en favoritos:
const saveFav = async (event) => {
    const buttonID = event.target.getAttribute('id');
    try {
        await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieID: buttonID })
        });

        event.target.setAttribute('class', 'input__delete');
        event.target.setAttribute('onclick', 'removeFromFav(event)');
        event.target.setAttribute('value', 'Saved');
    }
    catch (error) {
        console.log(error)
    }
}

// Eventlistener para borrar de favoritos
const removeFromFav = async (event) => {
    const buttonID = event.target.getAttribute('id');
    try {
        await fetch('http://localhost:3000/movies/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieID: buttonID })
        });

        event.target.setAttribute('class', 'input__save');
        event.target.setAttribute('onclick', 'saveFav(event)');
        event.target.setAttribute('value', 'Save as favourite<3');
    }
    catch (error) {
        console.log(error)
    }
}

const goBack = () => {
    window.location.href = 'http://localhost:3000/search'
}

// Scrapping:

const getReviews = async () => {
    let text = document.querySelector('#movie-title').innerText;
    let button = document.querySelector('main > button');
    let id = button.getAttribute('id');
    if (id.length < 25) {
        return []
    }

    let title = text.replace(/Title: /gi, '');
    let parsedTitle = title.includes(' ') ? title.replace(/\s/gi, '-') : title;

    const fetchScrapping = async () => {
        const response = await fetch(`http://localhost:3000/search/${parsedTitle}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data)
        return data
    }
    
    let data = await fetchScrapping();

    while (data.result[1].length < 1) {
        data = await fetchScrapping();
    };

    const comments = [];

    // La petición a Puppeteer devuelve un array bidimensional, por lo que hay que simplificarlo en un objeto que podamos pasar a pug:
    data.result[0].forEach((item, index) => comments.push({ name: item, text: data.result[1][index] }));

    return comments
}

getReviews()
.then((reviews) => {
    reviews.forEach(review => {
        const comment = document.createElement('div');
        comment.innerHTML = `<h3>${review.name}</h3>
                             <p>${review.text}</p>`;
        const main = document.querySelector('main');
        main.appendChild(comment);
    });
});