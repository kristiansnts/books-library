const openButton = document.getElementById('open');
const modalAdd = document.getElementById('modal--add');
const closeButton = document.getElementById('close');
const overlay = document.getElementById('overlay');
const submitButton = document.querySelector('button[type="submit"]');
const inputList = document.querySelectorAll('input');
const myLibrary = [];

// == Modal Box Script == //

// show the overlay and the dialog
openButton.addEventListener('click', function () {
    modalAdd.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

// hide the overlay and the dialog
closeButton.addEventListener('click', closeModal);

function closeModal(){
    modalAdd.classList.add('hidden');
    overlay.classList.add('hidden');
    inputList.forEach(input => input.value = '');
}


// ==  Library Script == //
changeUI(myLibrary);

class Book {
    constructor(title, author, pages, isCompleted){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isCompleted = isCompleted;
    }
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

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('readChange')){
        const target = e.target;
        toggleRead(target);
        const parentId = parseInt(target.parentNode.parentNode.parentNode.id);
        switchRead(parentId);
        (target.textContent == 'Not Read') ? target.textContent = 'Read' : target.textContent = 'Not Read';
    }
    if(e.target.classList.contains('removeCard')){
        confirm('Are you sure remove this book?');
        const parentId = parseInt(e.target.parentNode.parentNode.parentNode.id);
        removeBookfromLibrary(parentId);
    }
})

function toggleRead(target){
    if(target.textContent == 'Not Read'){
        target.classList.remove('bg-red-400');
        target.classList.add('bg-green-400');
    } else {
        target.classList.add('bg-red-400');
        target.classList.remove('bg-green-400');
    }
}

function switchRead(parentId){
    myLibrary[parentId].isCompleted = !myLibrary[parentId].isCompleted;
}

function removeBookfromLibrary(parentId){
    myLibrary.splice(myLibrary.indexOf(parentId, 1))
    changeUI(myLibrary)
}

function changeUI(myLibrary){
    const contentBooks = document.querySelector('.books');
    const allBooks = document.querySelector('.all--book');
    let content = '';
    if(myLibrary.length == 0){
        content = `<div class="notFound mx-auto mt-20 row-start-2 col-start-2 md:col-start-3 lg:col-start-4 xl:col-start-5">
        <img src="assets/notFound.png" class="">
        <h1 class="text-center mt-5 font-bold text-slate-500">Books is Empty!!</h1>
      </div>`;
    }

    for(let i = 0; i < myLibrary.length; i++){
        content += `<li class="w-full" id="${i}">
                        <div class="card px-4 py-5 shadow-lg border-2 rounded text-center">
                        <h1 class="font-bold text-xl">${myLibrary[i].title}</h1>
                        <span class="block text-sm my-3">${myLibrary[i].author} (Author)</span>
                        <p class="font-bold mb-4">${myLibrary[i].pages} Pages</p>
                        <div class="card--cta">
                            ${myLibrary[i].isCompleted ? '<a class="block readChange bg-green-400 rounded my-2 py-2 cursor-pointer">Read</a>' : '<a class="block readChange bg-red-400 rounded my-2 py-2 cursor-pointer">Not Read</a>'}    
                            <a class="block removeCard bg-red-500 text-white rounded my-2 py-2 cursor-pointer">Remove</a>
                        </div>
                        </div>
                    </li>`;
        }
    
    allBooks.textContent = `All Book (${myLibrary.length})`;
    contentBooks.innerHTML = content;
}
