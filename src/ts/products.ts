import { addNewBook } from "./addNewBook"
import { addBookToCart } from "./addToCart"
import { addBookToFav } from "./addToFav"
import { editBook } from "./editBook"
import { getDataFromLs } from "./getDataFromLs"
import { getBookId } from "./main"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { silverBox } from "./silverBox"
import { trashBook } from "./trashBook"


let newBook = document.getElementById("newBook")
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
    newBook?.addEventListener("click", addNewBookToList)
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
    let filter2 = filter.reverse()
    filter2.forEach((book) => {
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
                book.children[1].children[0].innerText.toUpperCase().includes(userBookSearch.toUpperCase()) ||
                book.children[1].children[1].innerText.toUpperCase().includes(userBookSearch.toUpperCase()) ||
                book.children[2].children[1].innerText.toUpperCase().includes(userBookSearch) ||
                book.children[2].children[2].innerText.toUpperCase().includes(userBookSearch.toUpperCase())
            ) {
                book.style.display = "flex";
            } else {
                book.style.display = "none";
            }
        });
        localStorage.setItem("userBookSearch", "")
    }
}


function addNewBookToList() {
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

    let confirm = document.getElementById("confirm")
    let newBookSrc = document.getElementById("newBookSrc")
    let newBookName = document.getElementById("newBookName")
    let newBookZhanr = document.getElementById("newBookZhanr")
    let newBookYear = document.getElementById("newBookYear")
    let newBookPrice = document.getElementById("newBookPrice")
    let newBookAuthor = document.getElementById("newBookAuthor")
    let url: any;

    let book = {
        name: "",
        id: 0,
        author: "",
        makeYear: "",
        zhanr: "",
        price: 0,
        imgSrc: ""
    }
    newBookSrc?.addEventListener("change", () => {

        let fr = new FileReader()
        fr.readAsDataURL(newBookSrc.files[0])
        fr.addEventListener("load", () => {
            url = fr.result
            if (url) {

                book.imgSrc = url.toString()
            }
        })
    })


    confirm?.addEventListener("click", () => {
        book.name = newBookName.value;
        book.author = newBookAuthor.value;
        book.makeYear = newBookYear.value;
        book.zhanr = newBookZhanr.value;
        book.price = newBookPrice.value;
        book.id = bookList.length + 1
        bookList.push(book)
        setDataToLs("bookList", JSON.stringify(bookList))
        product.innerHTML = ""
        bookList.forEach(booke => {

            let tmp = showNewBook(booke.id, booke.name, booke.zhanr, booke.author, booke.makeYear, booke.imgSrc, booke.price)
            product?.append(tmp)
        })

        let addToFav = document.querySelectorAll(".addToFav")

        let addToCart = document.querySelectorAll(".addToCart")
        console.log(addToCart);
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

    })
}