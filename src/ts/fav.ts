import { addBookToCart } from "./addToCart"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { updateFavLength } from "./updateLength"

let container = document.getElementById("container")
// book lists
let favBook: object[] = []
let bookList: object[] = []

// event listeners
function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
}
eventListener()

// init when location is reload
function init() {
    favBook = JSON.parse(getDataFromLs("favBook"))
    bookList = JSON.parse(getDataFromLs("bookList"))
    showBook()
}

// show book to client
function showBook() {

    favBook.forEach((book) => {
        let template: HTMLElement = showNewBook(book.id, book.title, book.categories[0]?.title, `${book.authors[0].firstName} ${book.authors[0].lastName} `,  book.coverUri, book.beforeOffPrice)
        container?.append(template)
    });

}