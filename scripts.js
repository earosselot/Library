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


function addBookToDOM(book) {
    const row = document.createElement('div');
    row.classList.add('row');

    Object.keys(book).forEach((val, key, arr) => {
        if (Object.is(arr.length - 1, key)) {
            row.setAttribute('data-id', book[val]);

            const col = document.createElement('div');
            col.classList.add('col-1', 'text-center');

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'delete');
            deleteButton.id = book[val];
            deleteButton.textContent = 'x';

            deleteButton.addEventListener('click', () => {
                const indexbookToDelete = myLibrary.findIndex(book => book._id == deleteButton.id);
                console.log(indexbookToDelete);
                console.log(deleteButton.id)
                myLibrary.splice(indexbookToDelete, 1);
    
                let rowToDelete = deleteButton.parentElement.parentElement;
                rowToDelete.remove();
            })

            col.appendChild(deleteButton); 
            row.appendChild(col);
        } else if (Object.is(arr.length - 2, key)) {

            const col = document.createElement('div');
            col.classList.add('col', 'text-center', 'form-check');

            const readButton = document.createElement('input');
            readButton.setAttribute('type', 'checkbox');
            readButton.classList.add('read-button');

            const readButtonLabel = document.createElement('label');
            readButtonLabel.classList.add('form-chack-label');

            if (book[val]) {
                readButtonLabel.textContent = 'read';
                readButton.checked = true;
            } else {
                readButtonLabel.textContent = 'not read';
                readButton.checked = false;
            }
            
            readButton.addEventListener('change', (event) => {
                bookId = event.currentTarget.parentElement.parentElement.dataset.id;
                const indexReadBook = myLibrary.findIndex(book => book._id == bookId);
             
                const sibilingLabbel = readButton.nextSibling;

                if (event.currentTarget.checked) {
                    sibilingLabbel.textContent = 'read';
                    myLibrary[indexReadBook]['read'] = true;
                } else {
                    sibilingLabbel.textContent = 'not read';
                    myLibrary[indexReadBook]['read'] = false;
                }
            });

            col.appendChild(readButton);
            col.appendChild(readButtonLabel);
            row.appendChild(col);

            // Bootstrap switches. I can't make an event listener that works for them
            // const switchButton = document.createElement('input');
            // switchButton.setAttribute('type', 'checkbox');
            // switchButton.classList.add('read-switch');
            // switchButton.setAttribute('data-toggle', 'toggle');
            // switchButton.setAttribute('data-on', 'Read');
            // switchButton.setAttribute('data-off', 'Not Read');
            // switchButton.setAttribute('data-onstyle', 'success');
            // switchButton.setAttribute('data-offstyle', 'secondary');
            // col.appendChild(switchButton);
            
        } else {
            const col = document.createElement('div');
            col.classList.add('col', 'text-center');
            col.textContent = book[val];
            row.appendChild(col);
        }
    });
    libraryTable.appendChild(row);
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