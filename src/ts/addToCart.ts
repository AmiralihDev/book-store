import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateCartLength, updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"
import { removeBookFromCart } from "./removeFromCart"


let cartBook = getDataFromLs("cartBook")
if (cartBook == null){setDataToLs("cartBook",JSON.stringify([]))}
else {cartBook = JSON.parse(cartBook)}

function addBookToCart(e: object) {
    let bookList = JSON.parse(getDataFromLs("bookList"))


    let imgSrc = e.children[0].src
    let bookNum = e.children[1].children[1].innerText
    let bookName = e.children[1].children[0].innerText
    let zhanr = e.children[2].children[0].innerText
    let author = e.children[2].children[1].innerText
    let makeNum = e.children[2].children[2].innerText
    let price = e.children[2].children[3].innerText

    let obj = {
        id: bookNum,
        name: bookName,
        zhanr,
        author,
        makeYear: makeNum,
        imgSrc
    }
    bookList.forEach((book : object) => {

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {

            let find = findCartBook(book)

            if (validationIsBook("cart",book)) {
                cartBook.push(book)
                setDataToLs("cartBook", JSON.stringify(cartBook))
                cartBook = []
                updateCartLength()

                console.log(e.children[4].children[0]);
                let btn = e.children[4].children[0]
               
                let deleteBook = domGenerator({
                    tag : "button",
                    properties : {innerText : "حذف از سبد خرید" },
                    eventListeners : {click : (e) => {
                        removeBookFromCart(e.target.parentElement.parentElement)

                        let b = domGenerator({
                            tag : "button",
                            properties : {innerText : "افزودن به سبد خرید"},
                            eventListeners : {click : (ev) => {

                                addBookToCart(ev.target.parentElement.parentElement)
                                
                                b.replaceWith(deleteBook)
                            }}
                        })


                        deleteBook.replaceWith(b)
                    }}
                })

                btn.replaceWith(deleteBook)
            }else{

            }


        }
    })

}

function findCartBook(e: object) {
    let f = false
    cartBook.forEach((book : object) => {
        if (book == e) {

            f = true

        }

    })
    return f
}



export {addBookToCart}