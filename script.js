const button = document.querySelector('button');
const cardsContainer = document.querySelector('#cardsContainer')

button.addEventListener('click', () => {
    event.preventDefault();
    addBookToLibrary("fdafa", "cccccc", 12, "read");
    updateLibrary();

})

const myLibrary = [];

function Book(author, title, pages, status, token) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
  this.token = token;
}

function addBookToLibrary(author, title, pages, status) {
  const newBook = new Book(author, title, pages, status, crypto.randomUUID());
  myLibrary.push(newBook);
}

function updateLibrary(){
  cardsContainer.replaceChildren();
    for (const books in myLibrary){ // <----------------------------------------------------- REVIEW FOR IN 4 arrays !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        displayBook(myLibrary[books].author, myLibrary[books].title, myLibrary[books].status, myLibrary[books].token);
    }
}

function displayBook(author, title, pages, status, token){
  const container = document.createElement('div');
  cardsContainer.appendChild(container); //-----------FIXED ERROR: remove "document." before cardsContainer
  container.classList.add('container');

    const authorText = document.createElement('h1');
    authorText.textContent = author;
    container.appendChild(authorText);

    const titleText = document.createElement('h1');
    titleText.textContent = title;
    container.appendChild(titleText);

    const pagesText = document.createElement('h1');
    pagesText.textContent = pages;
    container.appendChild(pagesText);

    const statusText = document.createElement('h1');
    statusText.textContent = status;
    container.appendChild(statusText);

    const tokenText = document.createElement('h1');
    tokenText.textContent = token;
    container.appendChild(tokenText);
}