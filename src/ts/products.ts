// import modules

import { addBookToFav } from "./addToFav"
import { editBook } from "./editBook"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { silverBox } from "./silverBox"
import { trashBook } from "./trashBook"

// selector
let newBook = document.getElementById("newBook")
let product = document.querySelector(".products-list")
let zhanrFilter = document.querySelector(".active-tab")
let bookList: object[] = []
// event listeners

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
    newBook?.addEventListener("click", addNewBookToList)
}
eventListener()
// init when document of loaded
function init() {
    // show all books
    showBook()
    let data = getDataFromLs("bookList")
    // check ls data
    if (data) bookList = JSON.parse(data)
    else setDataToLs("bookList", JSON.stringify(bookList))
    filterBooks(zhanrFilter?.getAttribute("value"))
}

// filter books
/**
 * 
 * @param {string} zhanr
 */
function filterBooks(zhanr: string) {
    let filter: object[] = []

    // valid filter
    if (zhanr == "همه") {
        filter = bookList
    } else {

        bookList.filter((book) => {

            if (book.categories[0]?.title.includes(zhanr)) {
                filter.push(book)
            }
        })
    }
    // show we dont have any book text
    product.innerHTML = ""
    if (filter.length == 0) {
        let h1 = document.createElement("h1")
        h1.id = "notBook"
        h1.innerText = "درحال حاضر کتابی در این ژانر نداریم"
        product?.append(h1)
    }
    // show all book
    let filter2 = filter
    filter2.forEach((book) => {
        let template: HTMLElement
        if (book.categories[0]?.title == undefined){

        }else{

            template = showNewBook(book.id, book.title, book.categories[0]?.title, `${book.authors[0].firstName} ${book.authors[0].lastName} `,  book.coverUri, book.beforeOffPrice)
    
    
            product?.append(template)
        }
    })
    // check user search
    filterSearchBook()
    // amaliat buttons events
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

}



function showBook() {

}

// check and show user search
function filterSearchBook() {
    let userBookSearch = getDataFromLs("userBookSearch")
    // valid search
    if (userBookSearch == null) {
        return
    }
    else {
        // check all books
        let books = document.querySelectorAll(".books");
        books.forEach((book, index) => {
            if (
                book.children[1].children[0].innerText.toUpperCase().includes(userBookSearch.toUpperCase()) ||
                book.children[1].children[1].innerText.toUpperCase().includes(userBookSearch.toUpperCase()) ||
                book.children[2].children[1].innerText.toUpperCase().includes(userBookSearch) ||
                book.children[2].children[2].innerText.toUpperCase().includes(userBookSearch.toUpperCase())
            ) {
                // show books
                book.style.display = "flex";
            } else {
                // delete book in client
                book.style.display = "none";
            }
        });
        localStorage.setItem("userBookSearch", "")
    }
}

// add new book
function addNewBookToList() {
    // show modal
    silverBox({
        title: {
            text: "افزودن کتاب جدید"
        },
        centerContent: true,
        text: "مشخصات جدید را وارد کنید",
        showCloseButton: true,
        confirmButton: {
            text: "افزودن",
            closeOnClick: true,
            id: "confirm"
        },
        cancelButton: {
            text: "لغو"
        },
        input: [
            {
                label: "عکس کتاب",
                type: "file",
                id: "newBookSrc",

            },
            {
                label: "نام کتاب",
                type: "text",
                placeHolder: "نام جدید کتاب را وارد کنید",
                maxLength: 30,
                id: "newBookName"
            },
            {
                label: "نویسنده",
                type: "text",
                placeHolder: "نام نویسنده را وارد کنید",
                id: "newBookAuthor"
            },
            {
                label: "ژانر کتاب",
                type: "text",
                placeHolder: " ژانر کتاب را وارد کنید",
                id: "newBookZhanr"
            },
            {
                label: "سال انتشار ",
                type: "number",
                placeHolder: "سال انتشار را وارد کنید",
                id: "newBookYear"
            },
            {
                label: "قیمت کتاب",
                type: "number",
                placeHolder: " قیمت کتاب را وارد کنید",
                id: "newBookPrice"
            },
        ]
    })

    // get modal elements
    let confirm = document.getElementById("confirm")
    let newBookSrc = document.getElementById("newBookSrc")
    let newBookName = document.getElementById("newBookName")
    let newBookZhanr = document.getElementById("newBookZhanr")
    let newBookYear = document.getElementById("newBookYear")
    let newBookPrice = document.getElementById("newBookPrice")
    let newBookAuthor = document.getElementById("newBookAuthor")
    let url: any;
    // create new book object
    let book = {
        title : "",
        id: 0,
        authors: [
            {firstName: "", lastName : ""}
        ],
        // makeYear: "",
        categories: [
            {title : ""}
        ],
        beforeOffPrice: 0,
        coverUri: ""
    }
    newBookSrc?.addEventListener("change", () => {
        // create img url
        let fr = new FileReader()
        fr.readAsDataURL(newBookSrc.files[0])
        fr.addEventListener("load", () => {
            url = fr.result
            if (url) {

                book.coverUri = url.toString()
            }
        })
    })


    confirm?.addEventListener("click", () => {
        // add modal value to new book object
        let unicID = 0
        bookList.forEach (async bookb => {
            if (bookb.id > unicID){
                unicID = bookb.id
            }
        }
            
        )
        book.title = newBookName.value;
        book.authors[0].firstName = newBookAuthor.value;
        book.authors[0].lastName = ""
        book.categories[0].title = newBookZhanr.value;
        book.beforeOffPrice = newBookPrice.value;
        book.id = unicID + 1
        bookList.push(book)
        setDataToLs("bookList", JSON.stringify(bookList))
        product.innerHTML = ""
        // show books
        bookList.forEach(booke => {

            let tmp = showNewBook(booke.id, booke.title, booke.categories[0]?.title, `${booke.authors[0].firstName} ${booke.authors[0].lastName} `, booke.coverUri, booke.beforeOffPrice)
            product?.append(tmp)
        })

        // amaliat buttons events
        
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
    })
}