const submitButton = document.querySelector('button[type="submit"]');
const myLibrary = [];


function Book(title, author, pages, isCompleted) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;
}

function addBook(book, elem, bookInput){
    for( let i = 0; i < bookInput; i++){
        book[elem[i].name] = elem[i].value;
        if(elem[i].name == 'isCompleted'){
            book[elem[i].name] = elem[i].checked;
        }
    }
    return book;
}

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
    return myLibrary;
}

submitButton.addEventListener('click', function(e){
    e.preventDefault();
    let book, elem, bookInput, newBook;
    elem = document.querySelectorAll('input');
    book = new Book();
    bookInput = elem.length;
    newBook = addBook(book, elem, bookInput);
    addBookToLibrary(newBook);
})

