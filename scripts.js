let myLibrary = []
const libraryTable = document.querySelector('#libraryTable')

function Book (title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

Book.prototype.info = function() {
    let readedString;
    if (this.read) {
        readedString = 'readed';
    } else {
        readedString = 'not readed yet';
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readedString}.`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary('Hobbit', 'Tolkien', 540, true);
addBookToLibrary('harry Potter', 'Rowling', 246, true);
addBookToLibrary('caperucita', 'Anonimo', 30, false);

console.log(myLibrary);
console.table(myLibrary);


myLibrary.forEach(book => {
    let row = document.createElement('div');
    row.classList.add('row');
    Object.keys(book).forEach(key => {
        let col = document.createElement('div');
        col.classList.add('col');
        col.textContent = book[key];
        row.appendChild(col);
    });
    libraryTable.appendChild(row);
});

