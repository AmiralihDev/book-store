// import modules

import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"
import { removeBookFromFav } from "./removeFromCart"


// get fav list
let favBook = JSON.parse(getDataFromLs("favBook"))


// add book to fav function
function addBookToFav(e: object) {
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // get body book request
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


        // check book value
        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {


            // valid is it in fav book list
            if (validationIsBook("fav", book)) {
                // add book to fav book list
                favBook.push(book)

                // set new fav book list
                setDataToLs("favBook", JSON.stringify(favBook))
                favBook = []

                // update header fav hint text
                updateFavLength()

                // get book button
                let btn = e.children[4].children[1]


                // create delete fav books
                let deleteBook = domGenerator({
                    tag: "button",
                    properties: { innerText: "حذف علاقه مندی" },
                    eventListeners: {
                        click: (e) => {
                            // send request to remove book from fav list
                            removeBookFromFav(e.target.parentElement.parentElement)

                            // create add book button
                            let b = domGenerator({
                                tag: "button",
                                properties: { innerText: "علاقه مندی ها" },
                                eventListeners: {
                                    click: (ev) => {
                                        // send request to add book to fav book list
                                        addBookToFav(ev.target.parentElement.parentElement)
                                        //replace buttons
                                        b.replaceWith(deleteBook)
                                    }
                                }
                            })

                            
                            //replace buttons
                            deleteBook.replaceWith(b)
                        }
                    }
                })
                
                //replace buttons
                btn.replaceWith(deleteBook)
            } else {


            }


        }
    }



}

export { addBookToFav }