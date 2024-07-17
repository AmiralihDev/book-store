import { getDataFromLs } from "./getDataFromLs"

function calclutor(){
    let cartBook = JSON.parse(getDataFromLs("cartBook"))

    let productLength = document.getElementById("productLength")
    let result = document.getElementById("result")
    if (cartBook.length == 0){
        let h1 = document.createElement("h1")
        h1.innerText = "سبد خرید شما خالی است"
        result?.parentElement?.parentElement?.parentElement?.append(h1)
        result?.parentElement?.parentElement?.remove()
        return
    }
    productLength.innerText = `تعداد محصولات : ${cartBook.length}`

    let finalPrice : number = 0
    cartBook.forEach((e : object) => {
        finalPrice += e.price
    })

    result.innerText = finalPrice.toLocaleString()

    return finalPrice

}
export {calclutor}