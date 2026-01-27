//======================================= QUERY SELECTORS ====================================
const addBookButton = document.querySelector('#addBookButton');
const cardsContainer = document.querySelector('#cardsContainer');
const submitButton = document.querySelector('#submitButton')
const closeButton = document.querySelector("#closeButton");
const dialog = document.querySelector("dialog");

const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const status = document.querySelector('#status');

//=========================================== EVENT LISTENERS ==================================

addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.showModal(); 
})

//======================================= Dialog logic =========================================

function getSelectedStatus() { // <------------------ REVIEW: You must query it at the moment of submit, because radio buttons change.
  return document.querySelector('input[name="status"]:checked');
}

submitButton.addEventListener("click", (event) => {
  const statusSelected = getSelectedStatus();
  if (author.value === "" || title.value === "" || pages.value === "" || !statusSelected){
    alert("Please fill out the full form");
  }else{
    event.preventDefault();
    addBookToLibrary(author.value, title.value, pages.value, statusSelected.value);
    updateLibrary();
    dialog.close();
  }
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// ========================================= LOGIC ============================================

const myLibrary = [];

// object constructor for the Book
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

// adds book to array myLibrary
function addBookToLibrary(author, title, pages, status) {
  const newBook = new Book(author, title, pages, status, crypto.randomUUID());
  myLibrary.push(newBook);
}

// deletes all children of cardsContainer and adds all array elements to the page using the displayBook function
function updateLibrary(){   
  cardsContainer.replaceChildren();
    for (const books of myLibrary){
        displayBook(books.author, books.title, books.pages, books.status, books.token);
    }
}

// creates a container and add all the book information as children
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