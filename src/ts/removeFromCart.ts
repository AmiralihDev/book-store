import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"


let cartBook = JSON.parse(getDataFromLs("cartBook"))
let bookList = JSON.parse(getDataFromLs("bookList"))
let favBook = JSON.parse(getDataFromLs("favBook"))

function removeBookFromCart(e: object) {
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText


    bookList.forEach((book, index) => {

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            
            cartBook.splice(book.index, 1)
            setDataToLs("cartBook", JSON.stringify(cartBook))

            updateCartLength()
            
        }
    })
}

function removeBookFromFav(e: object) {
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText


    bookList.forEach((book, index) => {

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {

            console.log(favBook);
            favBook.splice(book.index, 1)

            setDataToLs("favBook", JSON.stringify(favBook))

            updateFavLength()


        }
    })
}
export { removeBookFromFav }
export { removeBookFromCart }