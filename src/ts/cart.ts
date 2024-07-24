// import modules

import { addBookToFav } from "./addToFav"
import { calculator } from "./calculator"
import { getDataFromLs } from "./getDataFromLs"
import { removeBookFromCart } from "./removeFromCart"
import { setDataToLs } from "./setDataToLs"
import { showFavBook, showNewBook, showCartBook } from "./showData"
import { updateCartLength, updateFavLength } from "./updateLength"

// selector
let pay = document.getElementById("pay")
let container = document.getElementById("products")


// book and cart list
let bookList: object[] = []
let cartBook: object[] = []

// event listeners
function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
    pay.addEventListener("click", (e) => {


        // get final price
        let price = calculator();
        // create new pay request
        requestCreator(price)
    })
}
eventListener()

function init() {
    cartBook = JSON.parse(getDataFromLs("cartBook"))
    bookList = JSON.parse(getDataFromLs("bookList"))
    showBook()
    calculator()
}

function showBook() {
    // show cart book
    cartBook.forEach((book) => {
        let template: HTMLElement = showCartBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        container?.append(template)
    });

    // amaliat buttons events
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
            calculator()

        })
    })
}

// create new pay request
function requestCreator(price: number) {
    let obj = {
        finalPrice : price,
        isRequest : true,
        isPayTrue : false,
    }

    // send request to ls for get request
    setDataToLs("payRequest",JSON.stringify(obj))
}
