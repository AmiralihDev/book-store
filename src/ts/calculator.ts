import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"

// calculat all books prices
function calculator(){
    // get cart books
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    // selector
    let productLength = document.getElementById("productLength")
    let result = document.getElementById("result")

    // check cart books length
    if (cartBook.length == 0){
        // show your cart is empty
        let h1 = document.createElement("h1")
        h1.innerText = "سبد خرید شما خالی است"
        let tmp = domGenerator({
            tag : "div",
            attributes : {id : "noBook"},
            children : [
                {
                    tag : "img",
                    attributes : {src : "/public/image/emptyCart.webp"}
                },
                {
                    tag : h1
                }
            ]
        })
        result?.parentElement?.parentElement?.parentElement?.append(tmp)
        result?.parentElement?.parentElement?.remove()
        return
    }

    // show products length and products final price
    productLength.innerText = `تعداد محصولات : ${cartBook.length}`

    let finalPrice : number = 0
    cartBook.forEach((e : object) => {
        finalPrice += e.price
    })
    result.innerText = finalPrice.toLocaleString()

    return finalPrice

}
export {calculator}