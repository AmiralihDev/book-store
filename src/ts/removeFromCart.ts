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
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    // check is it book ?
    cartBook = JSON.parse(getDataFromLs("bookList"))
    cartBook.forEach((book: object, index) => {
        if (`شماره کتاب : ${book.id}` == bookNum) {
            // delete book from cart list
            cartBook = JSON.parse(getDataFromLs("cartBook"))
            cartBook.splice(index, 1)

            setDataToLs("cartBook", JSON.stringify(cartBook))
            cartBook = []
            updateCartLength()

            // let btn = e.children[4].children[0]
            // let deleteBook = domGenerator({
            //     tag: "button",
            //     properties: { innerText: "افزودن به سبد خرید" },
            //     attributes: { class: "addToCart" },
            //     eventListeners: {
            //         click: (e) => {
            //             // send request to remove book from fav list
            //             addBookToCart(e.target.parentElement.parentElement)

            //             // create add book button
            //             let b = domGenerator({
            //                 tag: "button",
            //                 properties: { innerText: "حذف از سبد خرید" },
            //                 attributes: { class: "removeToCart" },
            //                 eventListeners: {
            //                     click: (ev) => {
            //                         // send request to add book to fav book list
            //                         removeBookFromCart(ev.target.parentElement.parentElement)
            //                         //replace buttons
            //                         b.replaceWith(deleteBook)
            //                     }
            //                 }
            //             })


            //             //replace buttons
            //             deleteBook.replaceWith(b)
            //         }
            //     }
            // })

            // btn.replaceWith(deleteBook)
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
    favBook = JSON.parse(getDataFromLs("favBook"))
    favBook.forEach((book: object, index) => {

        if (`شماره کتاب : ${book.id}` == bookNum) {

            // delete book from fav list
            favBook = JSON.parse(getDataFromLs("favBook"))

            favBook.splice(index, 1)

            setDataToLs("favBook", JSON.stringify(favBook))
            favBook = []
            updateFavLength()

            // let btn = e.children[4].children[1]
            // let deleteBook = domGenerator({
            //     tag: "button",
            //     properties: { innerText: "علاقه مندی ها" },
            //     attributes: { class: "addToFav" },
            //     eventListeners: {
            //         click: (e) => {
            //             // send request to remove book from fav list
            //             addBookToFav(e.target.parentElement.parentElement)

            //             // create add book button
            //             let b = domGenerator({
            //                 tag: "button",
            //                 properties: { innerText: "حذف علاقه مندی" },
            //                 attributes: { class: "removeToFav" },
            //                 eventListeners: {
            //                     click: (ev) => {
            //                         // send request to add book to fav book list
            //                         removeBookFromFav(ev.target.parentElement.parentElement)
            //                         //replace buttons
            //                         b.replaceWith(deleteBook)
            //                     }
            //                 }
            //             })


            //             //replace buttons
            //             deleteBook.replaceWith(b)
            //         }
            //     }
            // })
            // btn.replaceWith(deleteBook)
        }
    })
}
export { removeBookFromFav }
export { removeBookFromCart }