let myLibrary = []
const libraryTable = document.getElementById('libraryTable')


let Book = (function() {
    let nextId = 0;

    return function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this._id = nextId++;
    }
})();


Book.prototype.info = function() {
    let readedString;
    if (this.read) {
        readedString = 'readed';
    } else {
        readedString = 'not readed yet';
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readedString}.`;
}


function restoreDeleteButtons() {
    deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.id;
            const indexbookToDelete = myLibrary.findIndex(book => book._id == bookId);
            myLibrary.splice(indexbookToDelete, 1);

            let rowToDelete = button.parentElement;
            rowToDelete.remove();
        })
    });
}


function addBookToDOM(book) {
    let row = document.createElement('div');
    row.classList.add('row');

    Object.keys(book).forEach((val, key, arr) => {
        if (Object.is(arr.length - 1, key)) {
            row.setAttribute('data-id', book[val]);
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'delete');
            deleteButton.id = book[val];
            deleteButton.textContent = 'x';
            row.appendChild(deleteButton); 
        } else if (Object.is(arr.length - 2, key)) {
            let col = document.createElement('div');
            col.classList.add('col');
            if (book[val]) {
                col.textContent = 'Read';
            } else {
                col.textContent = 'Not Read Yet';
            }
            row.appendChild(col);
            
        } else {
            let col = document.createElement('div');
            col.classList.add('col');
            col.textContent = book[val];
            row.appendChild(col);
        }
    });
    libraryTable.appendChild(row);
    restoreDeleteButtons();
}


function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookToDOM(newBook);
}


function bookSubmit(event) {

    const title = newBookForm.elements["book-title"].value;
    const author = newBookForm.elements["book-author"].value;
    const pages = newBookForm.elements["book-pages"].value;
    const read = newBookForm.elements["book-read"].checked;
    
    addBookToLibrary(title, author, pages, read);
    event.preventDefault();
}


const newBookForm = document.forms['new-book'];
newBookForm.addEventListener('submit', bookSubmit);


addBookToLibrary('Hobbit', 'Tolkien', 540, true);
addBookToLibrary('harry Potter', 'Rowling', 246, true);
addBookToLibrary('caperucita', 'Anonimo', 30, false);