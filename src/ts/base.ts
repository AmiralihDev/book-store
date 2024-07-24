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
            entry.target.classList.add("show")
        }else{
            entry.target.classList.remove("show")
        }
    })
})

let hiddenElement = document.querySelectorAll(".hiddenEl")
// set new class for run animation
hiddenElement.forEach((el) => {
    observer.observe(el)
})

function eventListener(){
    document.addEventListener("DOMContentLoaded",init)
    searchFilter?.addEventListener("keydown",showFilter)
}
eventListener()

function init(){
    updateFavLength()
    updateCartLength()
}
// send user to products page
function showFilter(e : object){
    if(e.key == "Enter"){
        // set user search value to ls for get and show books
        setDataToLs("userBookSearch",searchFilter.value)
        // close this page
        window.close()
        // open products page
        window.open("/pages/products.html")
    }
}