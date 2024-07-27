// import modules

import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"
import { removeBookFromFav } from "./removeFromCart"


// get fav list
let favBook = JSON.parse(getDataFromLs("favBook"))

/**
 * get id from e and check id ! if id is true book is add to fav book lisr
 * @param {object} e - get books div and in thats div get book id
 * 
 * @returns {void} - just get book and append to fav book list
 */
// add book to fav function
function addBookToFav(e: object) : void{
    // get updated general book list from local storage
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // get body book request
    // get id value from e(book div) and then check id
    let bookNum = e.children[1].children[1].innerText
    // valid : is book ?
    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];

        // check book request value and object book value
        if (`شماره کتاب : ${book.id}` == bookNum ) {
            // valid is it in fav book list or no ?
            if (validationIsBook("fav", book)) {
                
                // get updated fav book list on local sorage
                favBook = JSON.parse(getDataFromLs("favBook"))
                // add book to fav book list
                favBook.push(book)

                 // set new fav book list
                setDataToLs("favBook", JSON.stringify(favBook))
              // update header fav hint text
                updateFavLength()
            } else {
            }
        }
    }
}

export { addBookToFav }