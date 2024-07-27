// import modules

import { updateCartLength, updateFavLength } from "./updateLength"
import "../scss/silverBox.css"
import { setDataToLs } from "./setDataToLs"

// selector
let searchFilter = document.getElementById("search-filter")

// create elements animation
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            // add show class to elements
            entry.target.classList.add("show")
        }else{
            // remove show class to elements
            entry.target.classList.remove("show")
        }
    })
})

let hiddenElement = document.querySelectorAll(".hiddenEl")
// set new class for run animation
hiddenElement.forEach((el) => {
    observer.observe(el)
})
// all elements events listeners 
function eventListener(){
    document.addEventListener("DOMContentLoaded",init)
    searchFilter?.addEventListener("keydown",showFilter)
}
eventListener()
/** -- this function just started if page is reloaded
 * @returns {void} - this function just started if page is reloaded because any function is running
 */
function init() : void{
    updateFavLength()
    updateCartLength()
}
// send user to products page
/**
 * -- get user search value from dom and set value to local storage
 * and then page is closed  
 * and product page is opening
 * 
 * @param {object} e - get user search value
 * @returns {void} 
 */
function showFilter(e : object) : void{
    if(e.key == "Enter"){
        // set user search value to ls for get and show books
        setDataToLs("userBookSearch",searchFilter.value)
        // close this page
        window.close()
        // open products page
        window.open("/pages/products.html")
    }
}