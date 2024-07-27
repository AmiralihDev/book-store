import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { addBookToFav } from "./addToFav"
import { addBookToCart } from "./addToCart"

// get book lists
let cartBook = JSON.parse(getDataFromLs("cartBook"))
let bookList = JSON.parse(getDataFromLs("bookList"))
let favBook = JSON.parse(getDataFromLs("favBook"))

// remove book from cart list
function removeBookFromCart(e: object) {
    // get book body
    let bookNum = e.children[1].children[1].innerText
   
    // check is it book ?
    cartBook = JSON.parse(getDataFromLs("cartBook"))
    cartBook.forEach((book: object, index) => {
        if (`شماره کتاب : ${book.id}` == bookNum) {
            // delete book from cart list
            cartBook = JSON.parse(getDataFromLs("cartBook"))
            cartBook.splice(index, 1)

            setDataToLs("cartBook", JSON.stringify(cartBook))
            cartBook = []
            updateCartLength()

            
        }
    })
}
// remove book from fav list
function removeBookFromFav(e: object) {

    // get book id value
    let bookNum = e.children[1].children[1].innerText
    // check is it any book ?
    favBook = JSON.parse(getDataFromLs("favBook"))
    favBook.forEach((book: object, index : number) => {

        if (`شماره کتاب : ${book.id}` == bookNum) {

            // delete book from fav list
            favBook = JSON.parse(getDataFromLs("favBook"))

            favBook.splice(index, 1)

            setDataToLs("favBook", JSON.stringify(favBook))
            favBook = []
            updateFavLength()
        }
    })
}
export { removeBookFromFav }
export { removeBookFromCart }