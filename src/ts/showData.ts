import domGenerator from "dom-generator"
import { getDataFromLs } from "./getDataFromLs"
import { addBookToFav } from "./addToFav"
import { removeBookFromCart, removeBookFromFav } from "./removeFromCart"
import { addBookToCart } from "./addToCart"
import { calculator } from "./calculator"
import { StringOptionsWithImporter } from "sass"


/**
 * \ 
 *  -- this function can make book template 
 * 
 *  just get book id, book name, book zhanr, book author, book year, book image src, book price
 *  
 *  -- check id for know this id in cart book or fav book list 
 * 
 *   - and create template and add events to buttons book template 
 * 
 * @param {string} id - get book id and id for show and check cart book list and fav book list
 * @param {string} name - get book name
 * @param {string} zhanr - get book zhanr
 * @param {string} author - get book author
 * @param {string} imgSrc - get book image src 
 * @param {number} price - get book price 
 * 
 * @returns {HTMLElement} - get parament and create book template (element) and return thats template
 */

// books templates
function showNewBook(id: number, name: string, zhanr: string, author: StringOptionsWithImporter, imgSrc: string, price: number): HTMLElement {
    // get updated cart book list
    let bookInCart = JSON.parse(getDataFromLs("cartBook"))
    // find book id for create buttons template and add events to buttons
    let cartBookFound = bookInCart.find((book) => { return book.id == id })
    // get updated fav book list
    let bookInFav = JSON.parse(getDataFromLs("favBook"))
    // find book id from fav book list to create buttons template and add events to buttons
    let favBookFound = bookInFav.find((book) => { return book.id == id })
    // create element
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
                            class: "bookYear",

                        },
                        properties: {
                            innerText: ``
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookAuthor",

                        },
                        properties: {
                            innerText: `${author}`
                        }
                    },
                    
                    {
                        tag: "p",
                        attributes: {
                            class: "bookZhanr",

                        },
                        properties: {
                            innerText: `${zhanr}`
                        }
                    },
                    {
                        tag: "p",
                        attributes: {
                            class: "bookPrice",

                        },
                        properties: {
                            innerText: `${price.toLocaleString()} ت`
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
                            innerText: "ویرایش"
                        },
                        attributes: {
                            type: "button",
                            class: "edit"
                        }
                    },
                    {
                        tag: "button",
                        properties: {
                            innerText: "حذف"
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
                    {   // check cart buttons
                        tag: cartBookFound ? removeCart() : addCart()
                    },
                    {   // check fav buttons
                        tag: favBookFound ? removeFav() : addFav()
                    }
                ]
            },

        ]
    })
    // return thats template
    return template
}
/**
 *  
 * @returns {HTMLButtonElement}
 */
function addFav() : HTMLButtonElement{
    return buttonCreator("/public/image/saved-icon.webp", "addToFav", (e: object) => {
        addBookToFav(e.target.parentElement.parentElement)
        e.target.replaceWith(removeFav())
    })
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function removeFav() : HTMLButtonElement{
    return buttonCreator("/public/image/notSave.webp", "removeToFav", (e: object) => {

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
    return buttonCreator("/public/image/addCart.webp", "addToCart", (e: object) => {
        addBookToCart(e.target.parentElement.parentElement)
        e.target.replaceWith(removeCart())
    })
}
/**
 * 
 * @returns {HTMLButtonElement}
 */
function removeCart() : HTMLButtonElement{
    return buttonCreator("/public/image/cartRemove.webp", "removeToCart", (e: object) => {
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
 *  -- get button img src, image class, image click events 
 *  and create buttons and return that
 * 
 * @param {string} src - get img src for button
 * @param {string} className - get img class
 * @param {Function} click  - get image click events
 * @returns {HTMLImageElement} create images button and return thats
 */

function buttonCreator(src: string, className: string, click: any) : HTMLImageElement{
    return domGenerator({
        tag: "img",
       
        attributes: {
            src : src,
            class: className
        },
        eventListeners: {
            click: click
        }
        
        
    })
}


export { showNewBook }