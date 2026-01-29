//======================================= QUERY SELECTORS ====================================
const addBookButton = document.querySelector('#addBookButton');
const cardsContainer = document.querySelector('#cardsContainer');
const submitButton = document.querySelector('#submitButton')
const closeButton = document.querySelector("#closeButton");
const dialog = document.querySelector("dialog");
// const deleteButton = document.querySelector('.deleteButton');
//===================================== QUERY SELECTORS FOR FORM ELEMENTS ====================
const author = document.querySelector('#author');
const title = document.querySelector('#title');
const pages = document.querySelector('#pages');
const status = document.querySelector('#status');
const read = document.querySelector('#read');
const unread = document.querySelector('#not-read');

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
    clearForm();
    dialog.close();
  }
});

function clearForm(){
  author.value = "";
  title.value = "";
  pages.value = "";
  read.checked = false;
  unread.checked = false;
}

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

Book.prototype.changeStatusToRead = function(){
  this.status = "Read";
  updateLibrary();
}

Book.prototype.changeStatusToUnRead = function(){
  this.status = "Not Read";
  updateLibrary();
}

// adds book to array myLibrary with a unique ID
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

// creates a container and add all the book information as children + the delete button and it's event listener + the change status button and it's event listener
function displayBook(author, title, pages, status, token){
    const container = document.createElement('div');
    cardsContainer.appendChild(container);
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
    tokenText.classList.add('token');

    const deleteButton = document.createElement('button');
    container.appendChild(deleteButton);
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = "delete";

    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      container.remove();
      let obj = myLibrary.find(o => o.token === tokenText.textContent);
      const index = myLibrary.indexOf(obj);
      if (index > -1) {
        myLibrary.splice(index, 1);
      }
    })

    const changeStatus = document.createElement('button');
    container.appendChild(changeStatus);
    changeStatus.classList.add('changeStatusButton');
    changeStatus.textContent = "Change Status";

    if (statusText.textContent === "read"){
      changeStatus.textContent = "Change Status to Unread";
    }else if (statusText.textContent === "not read"){
      changeStatus.textContent = "Change Status to Read";
    }

    changeStatus.addEventListener('click', () => {
      if (statusText.textContent === "read"){
        statusText.textContent = "not read";
      }else if (statusText.textContent === "not read"){
        statusText.textContent = "read";
      }
      else{
        alert('ERROR WITH changeStatus even Listener 1st else statement')
      }
      if (statusText.textContent === "read"){
        changeStatus.textContent = "Change Status to Unread";
      }else if (statusText.textContent === "not read"){
        changeStatus.textContent = "Change Status to Read";
      }else{
        alert('ERROR WITH changeStatus even Listener 2nd else statement')
      }
    })
}