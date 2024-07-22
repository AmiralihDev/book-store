

import { addBookToFav } from "./addToFav"
import { calclutor } from "./calclautor"
import { getDataFromLs } from "./getDataFromLs"
import { removeBookFromCart } from "./removeFromCart"
import { setDataToLs } from "./setDataToLs"
import { showFavBook, showNewBook, showCartBook } from "./showData"
import { updateCartLength, updateFavLength } from "./updateLength"


let pay = document.getElementById("pay")
let container = document.getElementById("products")

let bookList: object[] = []
let cartBook: object[] = []

function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
    pay.addEventListener("click", (e) => {
        
        let price = calclutor()
        requestCreator(price)
    })
}
eventListener()

function init() {
    cartBook = JSON.parse(getDataFromLs("cartBook"))
    bookList = JSON.parse(getDataFromLs("bookList"))
    showBook()
    calclutor()
}

function showBook() {

    cartBook.forEach((book) => {
        let template: HTMLElement = showCartBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        container?.append(template)
    });

    let removeCartBook = document.querySelectorAll(".removeToCart")
    let addToFav = document.querySelectorAll(".addToFav")

    addToFav.forEach((book) => {

        book.addEventListener("click", () => {
            addBookToFav(book.parentElement?.parentElement)
        })
    })
    removeCartBook.forEach((book) => {
        book.addEventListener("click", () => {
            removeBookFromCart(book.parentElement?.parentElement)
            book.parentElement?.parentElement.remove()
            calclutor()

        })
    })
}

