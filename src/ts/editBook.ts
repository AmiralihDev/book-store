// import modules

import { addBookToCart } from "./addToCart"
import { addBookToFav } from "./addToFav"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { silverBox } from "./silverBox"



// edit book
function editBook(e: object) {
    // get books list
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    let favBook = JSON.parse(getDataFromLs("favBook"))
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // get book body
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    // valid : is book ?
    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];


        if (`شماره کتاب : ${book.id}` == bookNum ) {
            // show modal
            getNewData(book.name, book.zhanr, book.author, book.makeYear, book.price)

            // get modal elements
            let confirm = document.getElementById("confirm")
            let newBookSrc = document.getElementById("newBookSrc")
            let newBookName = document.getElementById("newBookName")
            let newBookZhanr = document.getElementById("newBookZhanr")
            let newBookYear = document.getElementById("newBookYear")
            let newBookPrice = document.getElementById("newBookPrice")
            let newBookAuthor = document.getElementById("newBookAuthor")
            let url: any;
            newBookSrc?.addEventListener("change", () => {
                // get img url and save thats
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

                // change book value
                book.name = newBookName.value
                book.zhanr = newBookZhanr.value
                book.author = newBookAuthor.value
                book.price = parseInt(newBookPrice.value)
                book.makeYear = newBookYear.value

                // set book list to ls
                setDataToLs("bookList", JSON.stringify(bookList))
                let parent = e.parentElement
                // empty container
                parent.innerHTML = ""

                // create books
                let book2 = bookList
                for (const key of book2) {


                    let template: any

                    template = showNewBook(key.id, key.name, key.zhanr, key.author, key.makeYear, key.imgSrc, key.price)
                    console.log(key);
                    // check is book in slider (index.html) ?
                    if (parent.classList == "swiper-wrapper") {
                        // add slider class to template
                        template.classList.add("swiper-slide")

                    } else {

                    }
                    // append to client
                    parent.append(template)
                }

                // amaliat buttons events
                let editBooks = document.querySelectorAll(".edit")
                editBooks.forEach(btn => btn.addEventListener("click", () => {
                    editBook(btn.parentElement?.parentElement)
                }))
                // valid : is this book in other lists 
                // change book value too
                for (let index = 0; index < favBook.length; index++) {
                    const favbook = favBook[index];


                    if (`شماره کتاب : ${favbook.id}` == bookNum &&
                        favbook.name == bookName &&
                        `ژانر : ${favbook.zhanr}` == zhanr &&
                        `نویسنده : ${favbook.author}` == author &&
                        `سال انتشار : ${favbook.makeYear}` == makeNum &&
                        `قیمت کتاب : ${favbook.price.toLocaleString()}` == price
                    ) {

                        if (url) {

                            favbook.imgSrc = url.toString()
                        }
                        favbook.name = newBookName.value
                        favbook.zhanr = newBookZhanr.value
                        favbook.author = newBookAuthor.value
                        favbook.price = parseInt(newBookPrice.value)
                        favbook.makeYear = parseInt(newBookYear.value)
                        setDataToLs("favBook", JSON.stringify(favBook))
                    }
                }

                for (let index = 0; index < cartBook.length; index++) {
                    const cartbook = cartBook[index];


                    if (`شماره کتاب : ${cartbook.id}` == bookNum 
                    ) {
                        if (url) {

                            cartbook.imgSrc = url.toString()
                        }
                        cartbook.name = newBookName.value
                        cartbook.zhanr = newBookZhanr.value
                        cartbook.author = newBookAuthor.value
                        cartbook.price = parseInt(newBookPrice.value)
                        cartbook.makeYear = parseInt(newBookYear.value)


                        setDataToLs("cartBook", JSON.stringify(cartBook))
                    }
                }
            })
        }
    }



}


// create new modal
/**
 * 
 * @param {string} bookName 
 * @param {string} zhanr 
 * @param {string} author 
 * @param {number} makeYear 
 * @param {number} price 
 */


function getNewData(bookName: string, zhanr: string, author: string, makeYear: string, price: string) {
    silverBox({
        title: {
            text: "ویرایش"
        },
        centerContent: true,
        text: "مشخصات جدید را وارد کنید",
        showCloseButton: true,
        confirmButton: {
            text: "ویرایش",
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
                value: `${bookName}`,
                id: "newBookName"
            },
            {
                label: "نویسنده",
                type: "text",
                placeHolder: "نام نویسنده را وارد کنید",
                value: author,
                id: "newBookAuthor"
            },
            {
                label: "ژانر کتاب",
                type: "text",
                placeHolder: " ژانر کتاب را وارد کنید",
                value: zhanr,
                id: "newBookZhanr"
            },
            {
                label: "سال انتشار ",
                type: "number",
                placeHolder: "سال انتشار را وارد کنید",
                value: makeYear,
                id: "newBookYear"
            },
            {
                label: "قیمت کتاب",
                type: "number",
                placeHolder: " قیمت کتاب را وارد کنید",
                value: price,
                id: "newBookPrice"
            },
        ]
    })




}
export { editBook }