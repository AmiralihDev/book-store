import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { addBookToFav } from "./addToFav"
import { removeBookFromCart, removeBookFromFav } from "./removeFromCart"
import { addBookToCart } from "./addToCart"
import { calculator } from "./calculator"


/**
 * \
 * @param {string} id 
 * @param {string} name 
 * @param {string} zhanr 
 * @param {string} author 
 * @param {number} makeYear 
 * @param {string} imgSrc 
 * @param {number} price
 * @returns {HTMLElement} 
 */

// books templates
function showNewBook(id: number, name: string, zhanr: string, author: string, makeYear: number, imgSrc: string, price: number): HTMLElement {

    let bookInCart = JSON.parse(getDataFromLs("cartBook"))
    let cartBookFound = bookInCart.find((book) => { return book.id == id })

    let bookInFav = JSON.parse(getDataFromLs("favBook"))
    let favBookFound = bookInFav.find((book) => { return book.id == id })

    let template = domGenerator({
        tag: "div",
        attributes: {
            class: "books"
        },
        children: [
            {
                tag: "img",
                attributes: {
                    src: imgSrc,
                    class: "imgBook"
                }

            },
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        attributes: {

                            class: "bookName"
                        },
                        properties: {
                            innerText: name
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookId",

                        },
                        properties: {
                            innerText: `شماره کتاب : ${id}`
                        }
                    },
                ]
            },

            {
                tag: "div",
                children: [
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `ژانر : ${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `نویسنده : ${author}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookYear",

                        },
                        properties: {
                            innerText: `سال انتشار : ${makeYear}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `قیمت کتاب : ${price.toLocaleString()}`
                        }
                    },
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "amaliatBtn"
                },
                children: [
                    {
                        tag: "button",
                        properties: {
                            innerText: "ویرایش کتاب"
                        },
                        attributes: {
                            type: "button",
                            class: "edit"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف کتاب"
                        },
                        attributes: {
                            type: "button",
                            class: "trash"
                        }
                    }
                ]
            },
            {
                tag: "div",
                attributes: {
                    class: "bookBtn"
                },
                children: [
                    {
                        tag: cartBookFound ? removeCart() : addCart()
                    },
                    {
                        tag: favBookFound ? removeFav() : addFav()
                    }
                ]
            },

        ]
    })

    return template
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function addFav() : HTMLButtonElement{
    return buttonCreator("علاقه مندی ها", "addToFav", (e: object) => {
        addBookToFav(e.target.parentElement.parentElement)
        e.target.replaceWith(removeFav())
    })
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function removeFav() : HTMLButtonElement{
    return buttonCreator("حذف علاقه مندی", "removeToFav", (e: object) => {

        removeBookFromFav(e.target.parentElement.parentElement)
        if (e.target.parentElement.parentElement.parentElement.id == "container"){
            e.target.parentElement.parentElement.remove()
        }else{

            e.target.replaceWith(addFav())
        }
    })
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function addCart() :HTMLButtonElement{
    return buttonCreator("افزودن به سبد خرید", "addToCart", (e: object) => {
        addBookToCart(e.target.parentElement.parentElement)
        e.target.replaceWith(removeCart())
    })
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function removeCart() : HTMLButtonElement{
    return buttonCreator("حذف از سبد خرید", "removeToCart", (e: object) => {
        removeBookFromCart(e.target.parentElement.parentElement)
        if (e.target.parentElement.parentElement.parentElement.id == "products"){
            e.target.parentElement.parentElement.remove()
            calculator()
        }else{

            e.target.replaceWith(addCart())
        }
        
    })
}
/**
 * @param {string} text 
 * @param {string} className 
 * @param {Function} click 
 * @returns {HTMLButtonElement}
 */

function buttonCreator(text: string, className: string, click: any) : HTMLButtonElement{
    return domGenerator({
        tag: "button",
        properties: {
            textContent: text
        },
        attributes: {
            type: "button",
            class: className
        },
        eventListeners: {
            click: click
        }
    })
}


export { showNewBook }