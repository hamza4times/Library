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