import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"

// get book lists
let cartBook = JSON.parse(getDataFromLs("cartBook"))
let bookList = JSON.parse(getDataFromLs("bookList"))
let favBook = JSON.parse(getDataFromLs("favBook"))

// remove book from cart list
function removeBookFromCart(e: object) {
    // get book body
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    // check is it book ?
    bookList.forEach((book:object, index) => {
        if (`شماره کتاب : ${book.id}` == bookNum ) {
            // delete book from cart list
            cartBook = JSON.parse(getDataFromLs("cartBook"))
            cartBook.splice(index, 1)
            setDataToLs("cartBook", JSON.stringify(cartBook))

            updateCartLength()
            
        }
    })
}
// remove book from fav list
function removeBookFromFav(e: object) {
    
    // get book body value
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    // check is it any book ?
    bookList.forEach((book : object, index) => {

        if (`شماره کتاب : ${book.id}` == bookNum) {

            // delete book from fav list
            favBook = JSON.parse(getDataFromLs("favBook"))

            favBook.splice(index, 1)

            setDataToLs("favBook", JSON.stringify(favBook))

            updateFavLength()


        }
    })
}
export { removeBookFromFav }
export { removeBookFromCart }