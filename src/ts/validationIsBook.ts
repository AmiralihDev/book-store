import { getDataFromLs } from "./getDataFromLs"
// check is book in which book list
function validationIsBook(which: "fav" | "cart" | "book", bookItem: object) {
    let favList: object[] = JSON.parse(getDataFromLs("favBook"))
    let cartList: object[] = JSON.parse(getDataFromLs("cartBook"))
    let bookList: object[] = JSON.parse(getDataFromLs("bookList"))

    let e: object[]
    // check user want
    switch (which) {
        case "cart":
             cartList = JSON.parse(getDataFromLs("cartBook"))
            e = cartList
            break
        case "book":
             bookList= JSON.parse(getDataFromLs("bookList"))
            e = bookList
            break
        case "fav":
             favList = JSON.parse(getDataFromLs("favBook"))

            e = favList
            break
    }
    let isBreak = false
    // valid is book ?
    for (let index = 0; index < e.length; index++) {
        const book = e[index];

        if (
            bookItem.id == book.id && bookItem.imgSrc == book.imgSrc &&
            bookItem.name == book.name &&
            bookItem.author == book.author &&
            book.makeYear == bookItem.makeYear &&
            book.price == bookItem.price
        ) {
            isBreak = true
            break

        }

    }
    // return result
    if (isBreak == true) {
        return false
    }
    return true

}

export { validationIsBook }