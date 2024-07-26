// import modules

import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"
import { removeBookFromCart } from "./removeFromCart"

// get cart list
let cartBook = getDataFromLs("cartBook")
if (cartBook == null) { setDataToLs("cartBook", JSON.stringify([])) }
else { cartBook = JSON.parse(cartBook) }


// valid and add to cart list
function addBookToCart(e: object) {
    let bookList = JSON.parse(getDataFromLs("bookList"))

    //get body request 
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    //valid : is book ?
    bookList.forEach((book: object) => {

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {

            // valid if book request is not in cart list
            if (validationIsBook("cart", book)) {
                // add book to array
                cartBook = JSON.parse(getDataFromLs("cartBook"))
                cartBook.push(book)
                // set new cart list to ls
                setDataToLs("cartBook", JSON.stringify(cartBook))


                // update header hint text
                updateCartLength()
            } else {

            }


        }
    })

}

// export add to cart function
export { addBookToCart }