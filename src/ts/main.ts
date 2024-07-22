import { addBookToCart } from "./addToCart";
import { addBookToFav } from "./addToFav";
import { editBook } from "./editBook";
import { removeBookFromFav } from "./fav";
import { getDataFromLs } from "./getDataFromLs";
import { removeBookFromCart } from "./removeFromCart";
import { setDataToLs } from "./setDataToLs";
import { showCartBook, showFavAndCartBook, showFavBook, showNewBook } from "./showData";
import { silverBox } from "./silverBox";
import { trashBook } from "./trashBook";
import { updateCartLength, updateFavLength } from "./updateLength";
import { validationIsBook } from "./validationIsBook";
import { writeTxt } from "./writeTxt";


//selector
let newProducts = document.querySelector(".products-list")
let zhanrFilter = document.querySelector(".active-tab")
let productAnimation1 = document.querySelector("#animationItem1")
let productAnimation2 = document.querySelector("#animationItem2")
let productsList = document.querySelector(".products-list")

// dataVariable
let cartBook: object[] = []
let favBook: object[] = []
let bookList: object[] = [
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1350,
        imgSrc: "/public/bookimg/default.jpg",
        price: 450_000

    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 100_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 500_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1350,
        imgSrc: "/public/bookimg/default.jpg",
        price: 150_000

    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 150_000

    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 270_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1350,
        imgSrc: "/public/bookimg/default.jpg",
        price: 365_000

    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "انگیزشی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 415_000

    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 200_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 340_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 180_000
    },
    {
        id: 0,
        name: "عادت های اتمی",
        zhanr: "روانشناسی",
        author: "برایان تریسی",
        makeYear: 1380,
        imgSrc: "/public/bookimg/default.jpg",
        price: 200_000
    },

]


//eventListeners
function eventListeners() {
    //when page is loaded
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

eventListeners()
// event of loading
function init() {
    //write text effect to main
    getBookId()
    writeTxt()
    //get data from ls
    let data = getDataFromLs("bookList")
    // check ls data
    if (data) bookList = JSON.parse(data)
    else setDataToLs("bookList", JSON.stringify(bookList))
    //show new book
    showBestBook()
    let cartLs = getDataFromLs("cartBook")
    let favLs = getDataFromLs("favBook")
    if (favLs != null) { favBook = JSON.parse(favLs) }
    else if (favLs == null) { setDataToLs("favBook", JSON.stringify(favBook)) }
    if (cartLs != null) { cartBook = JSON.parse(favLs) }
    else if (favLs == null) { setDataToLs("cartBook", JSON.stringify(cartBook)) }
    filterBooks(zhanrFilter?.getAttribute("value"))
    updateFavLength()
    updateCartLength()
}
function getBookId() {
    for (let index = 0; index < bookList.length; index++) {
        let book = bookList[index];
        book.id = index + 1

    }
}
//show best book when document is loading
function showBestBook() {
    let bestBook: object[] = []
    let l: number
    //check book length
    if (bookList.length > 18) l = 18
    else l = bookList.length


    for (let index = 0; index < l; index++) {
        bestBook.push(bookList[index])

    }
    for (let index = 0; index < bestBook.length; index++) {
        const book = bestBook[index];
        let template: HTMLElement = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        let template2: HTMLElement = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        productAnimation1.append(template)
        productAnimation2.append(template2);
    }
}

//find book from zhanr
function filterBooks(e: string) {

    let newBook: object[] = []
    let filter: object[] = []

    let l: number
    //check book length
    if (bookList.length > 40) l = 40
    else l = bookList.length
    for (let index = 0; index < l; index++) {
        const book = bookList[index];
        //add book to newbook list
        newBook.push(book);
    }
    if (e == "همه") {
        filter = newBook
    } else {

        newBook.filter((book) => {

            if (book.zhanr == e) {
                filter.push(book)
            }
        })
    }
    // show data
    newProducts.innerHTML = ""
    if (filter.length == 0) {
        let h1 = document.createElement("h1")
        h1.id = "notBook"
        h1.innerText = "درحال حاضر کتاب جدیدی در این ژانر نداریم"
        newProducts?.append(h1)
    }
    let justBook = true
    let favb = false
    let cartb = false
    let cartAndfavb = false
    filter.forEach((book) => {
        let template: HTMLElement

        favBook.forEach(favbook => {
            if (book.id == favbook.id && book.name == favbook.name) {
                favb = true
            }
        })
        cartBook.forEach(cartbook => {
            if (book.id == cartbook.id && book.name == cartbook.name) {
                cartb = true
            }
        })


        if (cartb && favb) {
            template = showFavAndCartBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        }

        else if (cartb) {
            template = showCartBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        }
        else if (favb) {
            template = showFavBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)

        }
        else {
            template = showNewBook(book.id, book.name, book.zhanr, book.author, book.makeYear, book.imgSrc, book.price)
        }

        newProducts?.append(template)
        cartb = false
        favb = false
    })

    let removeToFav = document.querySelectorAll(".removeToFav")
    let removeToCart = document.querySelectorAll("removeToCart")
    let addToFav = document.querySelectorAll(".addToFav")
    let addToCart = document.querySelectorAll(".addToCart")
    let trash = document.querySelectorAll(".trash")
    let edit = document.querySelectorAll(".edit")
    addToFav.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            addBookToFav(btn.parentElement?.parentElement);

        })
    })
    edit.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            editBook(btn.parentElement?.parentElement);

        })
    })
    trash.forEach((btn) => {
        btn.addEventListener("click", (e) => {

            trashBook(btn.parentElement?.parentElement);
            bookList = JSON.parse(getDataFromLs("bookList"))
        })
    })
    addToCart.forEach((btn) => {
        btn.addEventListener("click", () => {

            addBookToCart(btn.parentElement?.parentElement)


        })
    })
    removeToCart.forEach((btn) => {
        btn.addEventListener("click", () => {
            removeBookFromCart(btn.parentElement?.parentElement)
            filterBooks(zhanrFilter?.getAttribute("value"))
        })
    })
    removeToFav.forEach((btn) => {
        btn.addEventListener("click", () => {
            removeBookFromFav(btn.parentElement?.parentElement)
            filterBooks(zhanrFilter?.getAttribute("value"))

        })
    })
}


export { getBookId }