

import { addBookToFav } from "./addToFav"
import { calclutor } from "./calclautor"
import { getDataFromLs } from "./getDataFromLs"
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

function removeBookFromCart(e: object) {
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

            cartBook.splice(book.index, 1)
            setDataToLs("cartBook", JSON.stringify(cartBook))
            updateCartLength()


        }
    })
}


function requestCreator(price: number) {
    
    let obj = {
        finalPrice : price, 
        cartBook : cartBook,
        isPayTrue : false,
        isRequest : true
    }
    setDataToLs("payRequest",JSON.stringify(obj))
}


export { removeBookFromCart }