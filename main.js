const addButton = document.querySelector(".add-btn");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".modal-form");
let BOOKS = JSON.parse(localStorage.getItem("kitoblar")) || [];

document.addEventListener("keydown", (e) => e.key == "Escape" && closeModal());
overlay.addEventListener("click", closeModal);
addButton.addEventListener("click", openModal);
form.addEventListener("submit", addNewBook);
window.addEventListener("load", displayBooks());

function addNewBook(e) {
    e.preventDefault();
    let readingStatus;

    const reading = form.querySelector("#reading");
    const finishedReading = form.querySelector("#finished-reading");

    if (reading.checked) {
        readingStatus = "O'qiyapman";
    } else if (finishedReading.checked) {
        readingStatus = "O'qib tugatdim";
    }
    const bookObject = {
        title: form.querySelector("#book-title").value,
        author: form.querySelector("#book-author").value,
        year: form.querySelector("#book-year").value,
        genre: form.querySelector("#book-genre").value,
        status: readingStatus,
    };
    BOOKS.push(bookObject);
    setbooks();
    displayBooks();

    form.reset();
    closeModal();
}

function displayBooks() {
    // yangi kitob card yaratish kerak
    // card ni saxifaga qo'shishi kerak
    const booksGrid = document.querySelector(".books");
    booksGrid.innerHTML = "";
    console.log(BOOKS);
    BOOKS.map((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
                        <h2 class="book__title">"${book.title}"</h2>
                        <div class="book__info">
                            <h3 class="book__author">${book.author}</h3>
                            <div class="line"></div>
                            <div>
                                <h3 class="book__year">${book.year}</h3>
                                <h3 class="book__genre">${book.genre}</h3>
                            </div>
                        </div>
                        <span class="read">${book.status}</span>
                        <button onclick ="deleteBook(${index})" class="btn btn-remove">O'chirish</button>
        `;
        booksGrid.append(bookCard);
    });
}
function deleteBook(id) {
    BOOKS = BOOKS.filter((book, index) => id != index);
    setbooks();
    displayBooks();
}
function setbooks() {
    localStorage.setItem("kitoblar", JSON.stringify(BOOKS));
}

function openModal() {
    modalWindow.classList.add("open");
    overlay.classList.add("open");
}
function closeModal() {
    modalWindow.classList.remove("open");
    overlay.classList.remove("open");
}
