function Books(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const formEl = document.querySelector('.form');
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const pagesEl = document.querySelector('#pages');
const readEl = document.querySelector('#read');
const cardContainerEl = document.querySelector('.card-container');
const deleteBtn = document.querySelector('.delete-btn');
const bookReadEl = document.querySelector('.books-read');
const bookUnReadEl = document.querySelector('.books-unread');
const totalBooksEl = document.querySelector('.total-books');


let library = JSON.parse(localStorage.getItem("library")) || []; // state variable

let buttonsArr = JSON.parse(localStorage.getItem("buttonsArr")) || []; // state variable

let booksCount = JSON.parse(localStorage.getItem('booksCount')) || []; // state variable

renderCards();

formEl.addEventListener('submit',(e) => {
    e.preventDefault();
    
    const book = new Books(titleEl.value, authorEl.value, pagesEl.value, readEl.checked);

    book.uniq = 'id' + (new Date()).getTime()
    library.push(book)

    localStorage.setItem("library",JSON.stringify(library))

    renderCards();
    cleanForm();
    
})

deleteBtn.addEventListener('click', ()=> {
    cleanForm();

    library = library.splice();
    buttonsArr = buttonsArr.splice();

    localStorage.setItem("library", JSON.stringify(library));
    localStorage.setItem("buttonsArr", JSON.stringify(buttonsArr));

    renderCards();
    
})

function cleanForm() {

    titleEl.innerHTML = "";
    titleEl.value = "";
    authorEl.innerHTML = "";
    authorEl.value = "";
    pagesEl.innerHTML = "";
    pagesEl.value = "";
    readEl.checked = false;
};



function renderCards() {
    cardContainerEl.innerHTML = ""

    library.forEach(book => {
       
        if (book.read) {
            cardContainerEl.innerHTML += `
                <div class="card">
                    <div class="card-title">
                        <h3>${book.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>${book.author}</p>
                        <p>${book.pages}</p>
                        <div class="card-read">
                            <p>Read:</p>
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p class="remove-card" data-id=${book.uniq}>Remove</p>
                    </div>
                </div>
                `; 
        } else {
            cardContainerEl.innerHTML += `
                <div class="card">
                    <div class="card-title">
                        <h3>${book.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>${book.author}</p>
                        <p>${book.pages}</p>
                        <div class="card-read">
                            <p>Read:</p>
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p class="remove-card" data-id=${book.uniq}>Remove</p>
                    </div>
                </div>
            `;
        }     
    });
    
    buttonsArr = [...document.querySelectorAll('.remove-card')]
    localStorage.setItem('buttonsArr', JSON.stringify(buttonsArr))

    booksCount = library.slice();
    localStorage.setItem('booksCount', JSON.stringify(booksCount));
    renderValues();
}

function renderValues() {
    let unreadBooks = booksCount.filter(book => book.read === false);
    let readBooks = booksCount.filter(book => book.read === true);

    totalBooksEl.innerHTML = booksCount.length;
    bookReadEl.innerHTML = readBooks.length;
    bookUnReadEl.innerHTML = unreadBooks.length;
}

function removeCard() {
    
    library = library.filter(book => book.uniq !== this.dataset.id)
    
    localStorage.setItem('library', JSON.stringify(library))

    renderCards();
}



window.addEventListener('click', (e) => {

    if (!e.target.classList.contains('remove-card')) {
        return;
    }
    if (e.target.classList.contains('remove-card')) {
        buttonsArr.forEach(button => {
            button.addEventListener('click', removeCard);
        })
        
    }
})












