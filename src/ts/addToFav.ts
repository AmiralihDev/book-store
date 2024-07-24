import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { updateFavLength } from "./updateLength"
import { validationIsBook } from "./validationIsBook"
import { removeBookFromFav } from "./removeFromCart"
import { addBookToCart } from "./addToCart"


let favBook = JSON.parse(getDataFromLs("favBook"))

function addBookToFav(e: object) {
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

    for (let index = 0; index < bookList.length; index++) {
        const book = bookList[index];

        if (`شماره کتاب : ${book.id}` == bookNum &&
            book.name == bookName &&
            `ژانر : ${book.zhanr}` == zhanr &&
            `نویسنده : ${book.author}` == author &&
            `سال انتشار : ${book.makeYear}` == makeNum &&
            `قیمت کتاب : ${book.price.toLocaleString()}` == price
        ) {
            let find = findFavBook(book)

            if (validationIsBook("fav", book)) {

                favBook.push(book)
                setDataToLs("favBook", JSON.stringify(favBook))
                favBook = []
                updateFavLength()

                console.log(e.children[4].children[1]);
                let btn = e.children[4].children[1]
                
                let deleteBook = domGenerator({
                    tag : "button",
                    properties : {innerText : "حذف علاقه مندی" },
                    eventListeners : {click : (e) => {
                        removeBookFromFav(e.target.parentElement.parentElement)

                        let b = domGenerator({
                            tag : "button",
                            properties : {innerText : "علاقه مندی ها"},
                            eventListeners : {click : (ev) => {

                                addBookToFav(ev.target.parentElement.parentElement)
                                
                                b.replaceWith(deleteBook)
                            }}
                        })


                        deleteBook.replaceWith(b)
                    }}
                })

                btn.replaceWith(deleteBook)
            } else {


            }


        }
    }



}

function findFavBook(e: object) {
    let f = false
    favBook.forEach((book) => {
        if (book == e) {

            f = true

        }

    })
    return f
}


export { addBookToFav }