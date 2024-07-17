import { addBookToCart } from "./addToCart"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showFavBook, showNewBook } from "./showData"
import { updateFavLength } from "./updateLength"

let container = document.getElementById("container")

let favBook: object[] = []
let bookList: object[] = []

function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
}
eventListener()

function init() {
    favBook = JSON.parse(getDataFromLs("favBook"))
    bookList = JSON.parse(getDataFromLs("bookList"))
    showBook()
}

function showBook() {

    favBook.forEach((book) => {
        let template: HTMLElement = showFavBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        container?.append(template)
    });

    let removeFavBook = document.querySelectorAll(".removeToFav")
    let addToCart = document.querySelectorAll(".addToCart")
    removeFavBook.forEach((book) => {
        book.addEventListener("click", () => {
            removeBookFromFav(book.parentElement?.parentElement)
            book.parentElement?.parentElement.remove()
        })
    })
    addToCart.forEach((book) => {
        book.addEventListener("click", () => {
            addBookToCart(book.parentElement?.parentElement)
        })
    })
}

function removeBookFromFav(e: object) {
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText


    bookList.forEach((book) => {

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            
            favBook.splice(book.index, 1)
            
            setDataToLs("favBook", JSON.stringify(favBook))
            updateFavLength()
            

        }
    })
}
export {removeBookFromFav}