
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"


// trash book
function trashBook(e: object) {
    // get book lists
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    let favBook = JSON.parse(getDataFromLs("favBook"))
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // egt book body value
    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    bookList = JSON.parse(getDataFromLs("bookList"))

    // valid is it books ?
    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];


        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            // delete book
            bookList.splice(index,1)
            setDataToLs("bookList",JSON.stringify(bookList))

        }
    }
    
    // check is it fav book?
    for (let index = 0; index < favBook.length; index++) {
        const book = favBook[index];


        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            // delete book from fav book
            favBook.splice(index,1)
            setDataToLs("favBook",JSON.stringify(favBook))
            updateFavLength()
        }
    }
    // check is it cart book
    for (let index = 0; index < cartBook.length; index++) {
        const book = cartBook[index];


        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            // delete cart book
            cartBook.splice(index,1)
            setDataToLs("cartBook",JSON.stringify(cartBook))
            updateCartLength()
            
        }
    }
    // remove book from client
    e.remove()
    // document is refresh
    location.reload()
}

export { trashBook }