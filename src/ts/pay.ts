import domGenerator from "dom-generator"
import { removeBookFromCart } from "./cart"
import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"


let cvv2 = document.getElementById("cvv2")
let dateYear = document.getElementById("dateY")
let dateMonth = document.getElementById("dateM")
let cardHolder = document.getElementById("cardHolder")
let cardNumber = document.getElementById("cardNumber")
let finalP = document.getElementById("finalP")
let container = document.querySelector(".container")
let bodyBg = document.getElementById("bg")
let left = document.getElementById("left")
let right = document.getElementById("right")
let holder = document.getElementById("holder")
let cardCvv2 = document.getElementById("cardCvv2")
let pay = document.getElementById("pay")
let nums = document.getElementById("nums")
let secPass = document.getElementById("secPass")

let counter = 0
let isRequest = getDataFromLs("payRequest")
isRequest = JSON.parse(isRequest)



function eventListener() {
    document.addEventListener("DOMContentLoaded", init)
    cardHolder?.addEventListener("input", () => {
        holder.innerText = cardHolder.value
    })
    cvv2?.addEventListener("input", () => {

        cvv2.setAttribute("maxlength", "4")
        cardCvv2.innerText = cvv2.value

    })
    cardNumber?.addEventListener("input", writeCartNum)
    cardNumber?.addEventListener("keydown", (e) => {
        if (e.key == "Backspace" && cardNumber.value.length == 0 && counter > 0 && counter <= 4) {
            counter -= 1
            cardNumber.value = nums?.children[counter].innerText
        }
    })
    pay?.addEventListener("click", checkPay)
}

eventListener()

function init() {
    let request = isRequestValidation()
    if (request == false) {
        requestFaild()
        return
    }
    finalP.innerText = `قیمت نهایی : ${isRequest.finalPrice.toLocaleString()}`


}

function isRequestValidation() {

    if (isRequest == null || isRequest.isRequest == false) {
        return false
    } else {
        return true
    }
}

function requestFaild() {
    let h1 = document.createElement("h1")
    h1.innerText = "شما درخواست فعالی ندارید"
    right?.remove()
    left?.remove()
    bodyBg?.remove()
    h1.style.position = "absolute"
    h1.style.right = "0"
    container?.append(h1)
}

function writeCartNum() {

    if (counter == 4) {
        cardNumber.value = ""
        return
    }
    nums.children[counter].innerText = cardNumber.value
    if (cardNumber.value.length % 4 == 0) {
        counter += 1
        cardNumber.value += " "
    }
}

function checkPay() {
    let cardNumbers = ""
    let isCardNum = false
    let isDate = false
    let isHolder = false
    let isCvv2 = false
    let isSecPass = false


    for (let index = 0; index < nums.children.length; index++) {
        const num = nums?.children[index].innerText;

        cardNumbers += num

    }

    if (cardNumbers.length == 16) {
        isCardNum = true
    }
    if (dateMonth.value.length == 2 && parseInt(dateMonth.value) <= 12 && parseInt(dateMonth.value) > 0 && parseInt(dateYear.value) >= 0 && dateYear.value.length == 2) {
        isDate = true
    }
    if (cardHolder.value.includes(" ")) {
        isHolder = true
    }
    if (cvv2.value.length == 4) {
        isCvv2 = true
    }
    if (secPass.value.length == 8) {
        isSecPass = true
    }

    if (
        isCardNum &&
        isCvv2 &&
        isDate &&
        isHolder &&
        isSecPass
    ) {
        isRequest.isRequest = false
        isRequest.isPayTrue = true

        setDataToLs("payRequest", JSON.stringify(isRequest))

        setDataToLs("cartBook", JSON.stringify([]))
        showTnx()
    } else {
        isRequest.isRequest = false
        setDataToLs("payRequest", JSON.stringify(isRequest))
        right?.remove()
        let spinner = document.createElement("img")
        spinner.src = "/public/image/spinner.gif"
        spinner.id = "right"
        let tnxTemplate: HTMLElement = domGenerator({
            tag: "div",
            attributes: { id: "right" },
            children: [
                {
                    tag: "h1",
                    properties: {
                        innerText: "متاسفانه خرید شما با مشکل مواجه شد"
                    },
                    attributes: {
                        style: "text-align:center"
                    }
                }, {
                    tag: "a",
                    attributes: {
                        id: "comeBack",
                        href: "/pages/priceBox.html"
                    },
                    children: [
                        {
                            tag: "button",
                            properties: {
                                innerText: "بازگشت"
                            },
                        }

                    ]
                }
            ]
        })

        container?.append(spinner)

        setTimeout(() => {
            spinner.remove()
            container?.append(tnxTemplate)
        }, 2000)
    }
}

function showTnx() {
    right?.remove()
    let spinner = document.createElement("img")
    spinner.src = "/public/image/spinner.gif"
    spinner.id = "right"
    let tnxTemplate: HTMLElement = domGenerator({
        tag: "div",
        attributes: { id: "right" },
        children: [
            {
                tag: "h1",
                properties: {
                    innerText: "خرید شما با موفقیت انجام شد ! از خرید شما ممنونیم"
                },
                attributes: {
                    style: "text-align:center"
                }
            }, {
                tag: "a",
                attributes: {
                    id: "comeBack",
                    href: "/pages/priceBox.html"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "بازگشت"
                        },
                    }

                ]
            }
        ]
    })

    container?.append(spinner)

    setTimeout(() => {
        spinner.remove()
        container?.append(tnxTemplate)
    }, 2000)
}