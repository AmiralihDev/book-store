// import modules

import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { showNewBook } from "./showData"
import { silverBox } from "./silverBox"



// edit book
/** get book element and get book values from element
 *  
 * check book id
 * 
 * show modal for get new id and get modal value
 * set new book value
 * 
 * 
 * @param {object} e - get book element to get book values
 *  @returns {void} 
 */
function editBook(e: object) {
    // get books list
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    let favBook = JSON.parse(getDataFromLs("favBook"))
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // get book body
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let price = e.children[2].children[3].innerText

    // valid : is book ?
    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];


        if (`شماره کتاب : ${book.id}` == bookNum) {
            // show modal
            getNewData(book.title, book.categories[0]?.title,`${book.authors[0]?.firstName} ${book.authors[0]?.lastName}`, book.beforeOffPrice)

            // get modal elements
            let confirm = document.getElementById("confirm")
            let newBookSrc = document.getElementById("newBookSrc")
            let newBookName = document.getElementById("newBookName")
            let newBookZhanr = document.getElementById("newBookZhanr")
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

                        book.coverUri = url.toString()

                    }
                })

            })
            confirm?.addEventListener("click", () => {

                // change book value
                book.title = newBookName.value
                book.categories[0].title = newBookZhanr.value
                book.authors[0].firstName = newBookAuthor.value
                book.authors[0].lastName = ""
                book.beforeOffPrice = parseInt(newBookPrice.value)
                    

                // set book list to ls
                setDataToLs("bookList", JSON.stringify(bookList))
                let parent = e.parentElement
                // empty container
                parent.innerHTML = ""
                let l:number
                // create books
                if(parent.classList == "products-list"){
                    l = 34
                }else{
                    l = bookList.length
                }
                for (let i=0; i <= l ; i++) {
                    let key = bookList[i]
                    let template: any
                    if(key.categories[0]?.title != undefined){

                        template = showNewBook(key.id, key.title, key.categories[0]?.title, `${key.authors[0].firstName} ${key.authors[0].lastName}`, key.coverUri, key.beforeOffPrice)
                        if (parent.classList == "swiper-wrapper") {
                            // add slider class to template
                            template.classList.add("swiper-slide")
    
                        } else {
    
                        }
                        // append to client
                        parent.append(template)
                    }
                    else{

                    }
                    // check is book in slider (index.html) ?
                   
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
                        favbook.title == bookName &&
                        `ژانر : ${favbook.categories[0]?.title}` == zhanr &&
                        `نویسنده : ${favbook.authors[0]?.firstName} ${favBook.authors[0]?.lastName}` == author &&
                        `قیمت کتاب : ${favbook.beforeOffPrice.toLocaleString()}` == price
                    ) {

                        if (url) {

                            favbook.imgSrc = url.toString()
                        }
                        favbook.title = newBookName.value
                        favbook.categories[0].title = newBookZhanr.value
                        favbook.authors[0].firstName = newBookAuthor.value
                        favbook.authors[0].lastName = ""
                        favbook.beforeOffPrice = parseInt(newBookPrice.value)
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
                        cartbook.title = newBookName.value
                        cartbook.categories[0].title = newBookZhanr.value
                        cartbook.authors[0].firstName = newBookAuthor.value
                        book.authors[0].lastName = ""

                        cartbook.beforeOffPrice = parseInt(newBookPrice.value)


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
 * @param {number} price 
 */


function getNewData(bookName: string, zhanr: string, author: string, price: string) {
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