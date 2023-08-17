const categorySelect = document.getElementById('category');
const getJokeBtn = document.getElementById('getJokeBtn');
const jokeCategory = document.getElementById('jokeCategory');
const jokeText = document.getElementById('jokeText');

getJokeBtn.addEventListener('click', fetchJoke);

async function fetchJoke() {
    const selectedCategory = categorySelect.value;
    let apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategory}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            if (selectedCategory === 'Any') {
                jokeCategory.textContent = 'Random Joke';
                jokeText.textContent = data.joke || `${data.setup} ${data.delivery}`;
            } else {
                jokeCategory.textContent = selectedCategory;
                if (data.type === 'single') {
                    jokeText.textContent = data.joke;
                } else if (data.type === 'twopart') {
                    jokeText.textContent = `${data.setup}\n\n${data.delivery}`;
                }
            }
        } else {
            showError('An error occurred while fetching the joke.');
        }
    } catch (error) {
        showError('An error occurred while fetching the joke.');
    }
}

function showError(message) {
    jokeCategory.textContent = 'Error';
    jokeText.textContent = message;
}