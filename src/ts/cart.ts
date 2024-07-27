// import modules

import { calculator } from "./calculator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"


// selector
let pay = document.getElementById("pay")
let container = document.getElementById("products")


// book and cart list
let bookList: object[] = []
let cartBook: object[] = []

// all event listeners
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
// this function running if page is loaded
function init() {
    cartBook = JSON.parse(getDataFromLs("cartBook"))
    bookList = JSON.parse(getDataFromLs("bookList"))
    showBook()
    calculator()
}
// show cart books to client 
function showBook() {
    // show cart book
    cartBook.forEach((book) => {
        // create book template
        let template: HTMLElement = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        // append my template created to container
        container?.append(template)
    });

}
/**
 *  -- get final price for created object request and set to local storage 
 * 
 * @param {number} price - get cart final price
 */
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
