import { addBookToCart } from "./addToCart"
import { addBookToFav } from "./addToFav"
import { editBook } from "./editBook"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { trashBook } from "./trashBook"

let product = document.querySelector(".products-list")
let zhanrFilter = document.querySelector(".active-tab")
let bookList: object[] = []
function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
    let tabs = document.querySelectorAll(".tab-btn")
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            zhanrFilter?.classList.remove("active-tab")
            tab.classList.add("active-tab")
            zhanrFilter = document.querySelector(".active-tab")
            filterBooks(tab.getAttribute("value"))
        })
    })
}
eventListener()
function init() {
    showBook()
    let data = getDataFromLs("bookList")
    // check ls data
    if (data) bookList = JSON.parse(data)
    else setDataToLs("bookList", JSON.stringify(bookList))
    filterBooks(zhanrFilter?.getAttribute("value"))

}


function filterBooks(e: string) {
    let filter: object[] = []


    if (e == "همه") {
        filter = bookList
    } else {

        bookList.filter((book) => {

            if (book.zhanr == e) {
                filter.push(book)
            }
        })
    }
    // show data
    product.innerHTML = ""
    if (filter.length == 0) {
        let h1 = document.createElement("h1")
        h1.id = "notBook"
        h1.innerText = "درحال حاضر کتابی در این ژانر نداریم"
        product?.append(h1)
    }
    filter.forEach((book) => {
        let template: HTMLElement
        template = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)


        product?.append(template)
    })

    filterSearchBook()
    let addToFav = document.querySelectorAll(".addToFav")
    let addToCart = document.querySelectorAll(".addToCart")
    let trash = document.querySelectorAll(".trash")
    let edit = document.querySelectorAll(".edit")
    edit.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            editBook(btn.parentElement?.parentElement);

        })
    })
    trash.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            trashBook(btn.parentElement?.parentElement);

        })
    })
    addToFav.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            addBookToFav(btn.parentElement?.parentElement);

        })
    })
    addToCart.forEach((btn) => {
        btn.addEventListener("click", () => {


            addBookToCart(btn.parentElement?.parentElement)


        })
    })
}



function showBook() {

}

function filterSearchBook() {
    let userBookSearch = getDataFromLs("userBookSearch")

    if (userBookSearch == null) {
        return
    }
    else {

        let books = document.querySelectorAll(".books");
        books.forEach((book, index) => {
            if (
                book.children[1].children[0].innerText
                    .toUpperCase()
                    .includes(userBookSearch.toUpperCase())
            ) {
                book.style.display = "flex";
            } else {
                book.style.display = "none";
            }
        });
        localStorage.setItem("userBookSearch", "")
    }
}