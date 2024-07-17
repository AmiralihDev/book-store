import { getDataFromLs } from "./getDataFromLs"

function validationIsBook(which: "fav" | "cart" | "book", bookItem: object) {
    let bookList: object[] = JSON.parse(getDataFromLs("bookList"))
    let favList: object[] = JSON.parse(getDataFromLs("favBook"))
    let cartList: object[] = JSON.parse(getDataFromLs("cartBook"))

    let e: object[]

    switch (which) {
        case "cart":
            e = cartList
            break
        case "book":
            e = bookList
            break
        case "fav":
            e = favList
            break
    }
    let isBreak = false
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
    if (isBreak == true){
        return false
    }
    return true

}

export { validationIsBook }