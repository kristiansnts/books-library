const openButton = document.getElementById('open');
const dialog = document.getElementById('dialog');
const closeButton = document.getElementById('close');
const overlay = document.getElementById('overlay');
const submitButton = document.querySelector('button[type="submit"]');
const inputList = document.querySelectorAll('input');
const myLibrary = [];

// == Modal Box Script == //

// show the overlay and the dialog
openButton.addEventListener('click', function () {
    dialog.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

// hide the overlay and the dialog
closeButton.addEventListener('click', closeModal);

function closeModal(){
    dialog.classList.add('hidden');
    overlay.classList.add('hidden');
    inputList.forEach(input => input.value = '');
}


// ==  Library Script == //
changeUI(myLibrary);

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
    changeUI(myLibrary);
}

submitButton.addEventListener('click', function(e){
    e.preventDefault();
    let book, elem, bookInput, newBook;
    elem = document.querySelectorAll('input');
    book = new Book();
    bookInput = elem.length;
    newBook = addBook(book, elem, bookInput);
    addBookToLibrary(newBook);
    closeModal();
})


function changeUI(myLibrary){
    const contentBooks = document.querySelector('.books');
    const allBooks = document.querySelector('.all--book');
    let content = '';
    if(myLibrary.length == 0){
        content = `<div class="notFound mt-20 row-start-2 col-start-2">
        <img src="assets/notFound.png" class="">
        <span class="block text-center mt-5 font-bold text-slate-500">Books is Empty!!</span>
      </div>`;
    }

    for(let i = 0; i < myLibrary.length; i++){
        content += `<li class="relative">
                        <img src="https://source.unsplash.com/random/200x300/?${myLibrary[i].title}">
                        <span class="book--title absolute bottom-3 left-3 bg-sky-500 w-20 rounded text-center text-sm">${myLibrary[i].title}</span>
                    </li>`;
        }
    
    allBooks.textContent = `All Book (${myLibrary.length})`;
    contentBooks.innerHTML = content;
}
