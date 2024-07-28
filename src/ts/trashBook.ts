
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"



// trash book
/** 
 * -- get book element and get id from thats element
 *  
 * - valid id and check that (this is book) and final remove book from all book lists
 * 
 * @param {object} e - get book element for get element id
 * @returns {void} - just get id and remove that
 */
function trashBook(e: object): void {
    // get book lists
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    let favBook = JSON.parse(getDataFromLs("favBook"))
    let bookList = JSON.parse(getDataFromLs("bookList"))

    // egt book body value
    let bookNum = e.children[1].children[1].innerText
    bookList = JSON.parse(getDataFromLs("bookList"))

    // valid is it books ?
    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];


        if (`شماره کتاب : ${book.id}` == bookNum
        ) {
            // delete book
            bookList.splice(index,1)
            setDataToLs("bookList",JSON.stringify(bookList))

        }
    }
    
    // check is it fav book?
    for (let index = 0; index < favBook.length; index++) {
        const book = favBook[index];


        if (`شماره کتاب : ${book.id}` == bookNum
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


        if (`شماره کتاب : ${book.id}` == bookNum
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