import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"

// calc all books prices 

/** -- get all books in cart 
 * 
 *     -- and then calc books prices and then show in client and return final price
 * 
 *  -- if cart book list does not have any book show you do not have any book
 * 
 * @returns {number | void} - get price and calc all and in final return final price
 */

function calculator() : number| void{
    // get updated cart books
    let cartBook = JSON.parse(getDataFromLs("cartBook"))
    // selectors
    let productLength = document.getElementById("productLength")
    let result = document.getElementById("result")

    // check cart books length
    if (cartBook.length == 0){
        // show your cart is empty
        let h1 = document.createElement("h1")
        h1.innerText = "سبد خرید شما خالی است"
        // used dom generator for i want show image and is down : my text
        let tmp = domGenerator({
            tag : "div",
            // add id to my div
            attributes : {id : "noBook"},
            children : [
                {   // my image element
                    tag : "img", 
                    // img src
                    attributes : {src : "/public/image/emptyCart.webp"}
                },
                {   // my text element
                    tag : h1
                }
            ]
        })
        // append my template created to client 
        result?.parentElement?.parentElement?.parentElement?.append(tmp)
        // remove products factor
        result?.parentElement?.parentElement?.remove()
        return
    }

    // show products length and products final price
    productLength.innerText = `تعداد محصولات : ${cartBook.length}`

    let finalPrice : number = 0
    // add all cart books prices to final price
    cartBook.forEach((e : object) => {
        finalPrice += e.price
    })
    // show final price to client
    result.innerText = finalPrice.toLocaleString()
    // return final price
    return finalPrice

}
export {calculator}