// import modules

import { addBookToCart } from "./addToCart";
import { addBookToFav } from "./addToFav";
import { editBook } from "./editBook";
import { getDataFromLs } from "./getDataFromLs";
import { removeBookFromCart, removeBookFromFav } from "./removeFromCart";
import { setDataToLs } from "./setDataToLs";
import { showNewBook } from "./showData";
import { silverBox } from "./silverBox";
import { trashBook } from "./trashBook";
import { updateCartLength, updateFavLength } from "./updateLength";
import { validationIsBook } from "./validationIsBook";
import { writeTxt } from "./writeTxt";


//selector
let newProducts = document.querySelector(".products-list")
let zhanrFilter = document.querySelector(".active-tab")
let productAnimation1 = document.querySelector(".swiper-wrapper")
let productAnimation2 = document.querySelector("#animationItem2")
let productsList = document.querySelector(".products-list")

// dataVariable
let cartBook: object[] = []
let favBook: object[] = []
// let bookList: object[] = [
//     {
//         id: 0,
//         name: "عادت های اتمی",
//         zhanr: "انگیزشی",
//         author: "برایان تریسی",
//         makeYear: 1397,
//         imgSrc: "/public/bookimg/adatAtomi.jpg",
//         price: 65_000

//     },
//     {
//         id: 0,
//         name: "صد سال تنهایی",
//         zhanr: "رمان",
//         author: "گابریل گارسیا مارکز",
//         makeYear: 1346,
//         imgSrc: "/public/bookimg/100Years.jpg",
//         price: 100_000
//     },
//     {
//         id: 0,
//         name: "عقاید یک دلقک",
//         zhanr: "رمان",
//         author: "هاینریش بل",
//         makeYear: 1342,
//         imgSrc: "/public/bookimg/agayedDalgak.jpg",
//         price: 30_000
//     },
//     {
//         id: 0,
//         name: "اوای وحش",
//         zhanr: "رمان",
//         author: "جک لندن",
//         makeYear: 1282,
//         imgSrc: "/public/bookimg/avayeVahsh.jpg",
//         price: 50_000

//     },
//     {
//         id: 0,
//         name: "بیگانه",
//         zhanr: "رمان",
//         author: "آلبر کامو",
//         makeYear: 1321,
//         imgSrc: "/public/bookimg/bigane.jpg",
//         price: 150_000

//     },
//     {
//         id: 0,
//         name: "بخش دی",
//         zhanr: "جنایی",
//         author: "فردریک مک فادن",
//         makeYear: 1402,
//         imgSrc: "/public/bookimg/dSection.jpg",
//         price: 70_000
//     },
//     {
//         id: 0,
//         name: "انسان در جستجوی معنا",
//         zhanr: "تاریخ",
//         author: "ویکتور فرانکل",
//         makeYear: 1394,
//         imgSrc: "/public/bookimg/emsanDarJostego.jpg",
//         price: 40_000

//     },
//     {
//         id: 0,
//         name: "قدرت مداومت",
//         zhanr: "انگیزشی",
//         author: "جف اولسون",
//         makeYear: 1398,
//         imgSrc: "/public/bookimg/godratMogavemat.jpg",
//         price: 70_000

//     },
//     {
//         id: 0,
//         name: "غرور و تعصب",
//         zhanr: "عاشقانه",
//         author: "جین آستن",
//         makeYear: 1393,
//         imgSrc: "/public/bookimg/gororAndTasob.jpg",
//         price: 200_000
//     },
//     {
//         id: 0,
//         name: "کار اهسته",
//         zhanr: "انگیزشی",
//         author: "کال نیوپورت",
//         makeYear: 1402,
//         imgSrc: "/public/bookimg/karAheste.jpg",
//         price: 25_000
//     },
//     {
//         id: 0,
//         name: "خود اموز دیکتاتورها",
//         zhanr: "تاریخ",
//         author: "رندال وود، کارمینه دولوکا",
//         makeYear: 1398,
//         imgSrc: "/public/bookimg/khodAmozDiktator.jpg",
//         price: 250_000
//     },
//     {
//         id: 0,
//         name: "مغازه خود کشی",
//         zhanr: "رمان",
//         author: "ژان تولی",
//         makeYear: 1397,
//         imgSrc: "/public/bookimg/khodKoshi.jpg",
//         price: 40_000
//     },
//     {
//         id: 0,
//         name: "کیمیاگر",
//         zhanr: "رمان",
//         author: "پائولو کوئیلو",
//         makeYear: 1389,
//         imgSrc: "/public/bookimg/kimiaGar.jpg",
//         price: 120_000
//     },
//     {
//         id: 0,
//         name: "مرز ها و رابطه ها",
//         zhanr: "روانشناسی",
//         author: "ملیسا اربن",
//         makeYear: 1403,
//         imgSrc: "/public/bookimg/marzHaVaRabetheHa.jpg",
//         price: 20_000
//     },
//     {
//         id: 0,
//         name: "نبرد من",
//         zhanr: "تاریخ",
//         author: "ادولف هیتلر",
//         makeYear: 1392,
//         imgSrc: "/public/bookimg/nabardMan.jpg",
//         price: 300_000
//     },
//     {
//         id: 0,
//         name: "شیوه گرگ",
//         zhanr: "انگیزشی",
//         author: "جردن بلفورت",
//         makeYear: 1401,
//         imgSrc: "/public/bookimg/shiveGorg.jpg",
//         price: 35_000
//     },

// ]

let bookList:object[] = []
  
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
async function init() {
    // write text effect to main
    let fetchedData = async () => {
        let rawData = await fetch("https://get.taaghche.com/v2/everything")

        let parseData = await rawData.json()

        bookList = [
            ...parseData.boxes[6].bookData.books,
            ...parseData.boxes[4].bookData.books,
            ...parseData.boxes[3].bookData.books
        ]
        
        

    }
    await fetchedData()

    await getBookId()
    writeTxt()
    let data = getDataFromLs("bookList")
    if (data) {
        bookList = JSON.parse(data)
    } else {
        await setDataToLs("bookList", JSON.stringify(bookList))
    }
    //show new book
    await showBestBook()
    let cartLs = getDataFromLs("cartBook")
    let favLs = getDataFromLs("favBook")
    if (favLs != null) { favBook = JSON.parse(favLs) }
    else if (favLs == null) { setDataToLs("favBook", JSON.stringify(favBook)) }
    if (cartLs != null) { cartBook = JSON.parse(favLs) }
    else if (favLs == null) { setDataToLs("cartBook", JSON.stringify(cartBook)) }
    await filterBooks(zhanrFilter?.getAttribute("value"))
    updateFavLength()
    updateCartLength()
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 20,
        autoplay: {
            delay: 1200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    })
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
        if (book.categories[0]?.title == undefined) {

        } else {

            let template: HTMLElement = showNewBook(book.id, book.title, book.categories[0]?.title, `${book.authors[0].firstName} ${book.authors[0].lastName} `, book.coverUri, book.beforeOffPrice)
            template.classList.add("swiper-slide")
            productAnimation1?.append(template)
        }

    }
}
/**
 * 
 * @param {string} zhanr 
 */
//find book from zhanr
function filterBooks(zhanr: string) {

    let newBook: object[] = []
    let filter: object[] = []

    let l: number
    //check book length
    if (bookList.length > 35) l = 35
    else l = bookList.length

    for (let index = 0; index < l; index++) {
        const book = bookList[index];
        //add book to newbook list
        newBook.push(book);
    }
    // check filter
    if (zhanr == "همه") {
        filter = newBook
    } else {

        newBook.filter((book) => {

            if (book.categories[0]?.title.includes(zhanr)) {
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
    // check is fav book? cart book ? or fav and cart book ?
    filter.forEach((book) => {
      
      let template: HTMLElement
        if (book.categories[0]?.title == undefined){

        }
        else{

          template = showNewBook(book.id, book.title, book.categories[0]?.title, `${book.authors[0].firstName} ${book.authors[0].lastName} `, book.coverUri, book.beforeOffPrice)
        newProducts?.append(template)
        }
    })

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
            bookList = JSON.parse(getDataFromLs("bookList"))
        })
    })
}



export { getBookId }