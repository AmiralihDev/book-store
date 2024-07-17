import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"
import { silverBox } from "./silverBox"
import { createClient } from '@supabase/supabase-js'



function editBook(e: object) {
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    let favBook = JSON.parse(getDataFromLs("favBook"))
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

            let newBook = getNewData(book.name, book.zhanr, book.author, book.makeYear, book.price)
            let confirm = document.getElementById("confirm")
            let newBookSrc = document.getElementById("newBookSrc")
            let newBookName = document.getElementById("newBookName")
            let newBookZhanr = document.getElementById("newBookZhanr")
            let newBookYear = document.getElementById("newBookYear")
            let newBookPrice = document.getElementById("newBookPrice")
            let newBookAuthor = document.getElementById("newBookAuthor")
        
        confirm?.addEventListener("click", () => {
            fetch('/single',{
                method : "post"
            })
            // book.imgSrc = 
            book.name = newBookName.value
            book.zhanr = newBookZhanr.value
            book.author = newBookAuthor.value
            book.price = parseInt(newBookPrice.value)
            book.makeYear = parseInt(newBookYear.value)
            setDataToLs("bookList", JSON.stringify(bookList))
            for (let index = 0; index < favBook.length; index++) {
                const book = favBook[index];


                if (`شماره کتاب : ${book.id}` == bookNum &&
                    book.name == bookName &&
                    `ژانر : ${book.zhanr}` == zhanr &&
                    `نویسنده : ${book.author}` == author &&
                    `سال انتشار : ${book.makeYear}` == makeNum &&
                    `قیمت کتاب : ${book.price.toLocaleString()}` == price
                ) {



                }
            }

            for (let index = 0; index < cartBook.length; index++) {
                const book = cartBook[index];


                if (`شماره کتاب : ${book.id}` == bookNum &&
                    book.name == bookName &&
                    `ژانر : ${book.zhanr}` == zhanr &&
                    `نویسنده : ${book.author}` == author &&
                    `سال انتشار : ${book.makeYear}` == makeNum &&
                    `قیمت کتاب : ${book.price.toLocaleString()}` == price
                ) {

                    setDataToLs("cartBook", JSON.stringify(cartBook))


                }
            }
        })
    }
}





}

function getNewData(bookName: string, zhanr: string, author: string, makeYear: string, price: string) {
    silverBox({
        title: {
            text: "ویرایش"
        },
        centerContent: true,
        text: "مشخصات جدید را وارد کنید",
        showCloseButton: true,
        confirmButton: {
            text: "ویرایش",
            closeOnClick: true,
            id: "confirm"
        },
        cancelButton: {},
        input: [
            {
                label: "عکس کتاب",
                type: "file",
                id: "newBookSrc",
                
            },
            {
                label: "نام کتاب",
                type: "text",
                placeHolder: "نام جدید کتاب را وارد کنید",
                maxLength: 30,
                value: `${bookName}`,
                id: "newBookName"
            },
            {
                label: "نویسنده",
                type: "text",
                placeHolder: "نام نویسنده را وارد کنید",
                value: author,
                id: "newBookAuthor"
            },
            {
                label: "ژانر کتاب",
                type: "text",
                placeHolder: " ژانر کتاب را وارد کنید",
                value: zhanr,
                id: "newBookZhanr"
            },
            {
                label: "سال انتشار ",
                type: "number",
                placeHolder: "سال انتشار را وارد کنید",
                value: makeYear,
                id: "newBookYear"
            },
            {
                label: "قیمت کتاب",
                type: "number",
                placeHolder: " قیمت کتاب را وارد کنید",
                value: price,
                id: "newBookPrice"
            },
        ]
    })



    
}
export { editBook }