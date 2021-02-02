let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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
    
}
