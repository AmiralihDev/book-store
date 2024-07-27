// import modules
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"


// get cart list
let cartBook = getDataFromLs("cartBook")
if (cartBook == null) { setDataToLs("cartBook", JSON.stringify([])) }
else { cartBook = JSON.parse(cartBook) }


// valid and add to cart list
function addBookToCart(e: object) {
    let bookList = JSON.parse(getDataFromLs("bookList"))

    //get body request 
    let bookNum = e.children[1].children[1].innerText

    //valid : is book ?
    bookList.forEach((book: object) => {

        if (`شماره کتاب : ${book.id}` == bookNum ) {

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