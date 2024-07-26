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
        let template: HTMLElement = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        container?.append(template)
    });

}