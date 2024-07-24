

import { addBookToCart } from "./addToCart"
import { addBookToFav } from "./addToFav"
import { removeBookFromFav } from "./fav"
import { updateCartLength, updateFavLength } from "./updateLength"
import "../scss/silverBox.css"
import { setDataToLs } from "./setDataToLs"

let searchFilter = document.getElementById("search-filter")

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

function showFilter(e : object){
    if(e.key == "Enter"){
        setDataToLs("userBookSearch",searchFilter.value)
        window.close()
        window.open("/pages/products.html")
    }
}