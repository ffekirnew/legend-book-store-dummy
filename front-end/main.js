const form = document.querySelector('#add-book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const categoryInput = document.querySelector('#category');
const backgroundStoryInput = document.querySelector('#backgroundStory');
const exampleQuoteInput = document.querySelector('#exampleQuote');
const priceInput = document.querySelector('#price');
const coverImageInput = document.querySelector('#coverImage');
const audioDescriptionInput = document.querySelector('#audioDescription');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData();
  data.append('title', titleInput.value);
  data.append('author', authorInput.value);
  data.append('category', categoryInput.value);
  data.append('backgroundStory', backgroundStoryInput.value);
  data.append('exampleQuote', exampleQuoteInput.value);
  data.append('synopsis', synopsisInput.value);
  data.append('price', priceInput.value);
  data.append('coverImage', coverImageInput.files[0]);

  console.log(data);
  
  const response = await fetch('http://localhost:3000/books', {
    method: 'POST',
    body: data,
  });

  if (response.ok) {
    console.log('Book added successfully');
  } else {
    console.error('Error adding book');
  }
});