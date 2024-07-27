// import modules
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"


// get cart book list
let cartBook = getDataFromLs("cartBook")
// if cart book list is null created cart list
if (cartBook == null) { setDataToLs("cartBook", JSON.stringify([])) }
// else cart book is parse
else { cartBook = JSON.parse(cartBook) }


// valid and add to cart list
/**
 * -- get books div and get id from thats div and check id ! if true book is add to cart
 * 
 * 
 * @param {object} e - get books div and in this object get client id
 * @returns {void} - this function just get element and check books id and then add to cart book list
 */
function addBookToCart(e: object): void {
    // get updated general book list 
    let bookList = JSON.parse(getDataFromLs("bookList"))

    //get book id request for check id
    let bookNum = e.children[1].children[1].innerText

    //valid : is book ?
    bookList.forEach((book: object) => {
        // check book id request and object book 
        if (`شماره کتاب : ${book.id}` == bookNum ) {

            // valid if book request is not in cart list
            if (validationIsBook("cart", book)) {
                // get updated cart bok list
                cartBook = JSON.parse(getDataFromLs("cartBook"))
                // add book to cart book list and then set to local storage
                cartBook.push(book)
                // set new cart list to local storage
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