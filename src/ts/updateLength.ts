import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"

// update header cart length hint
function updateCartLength(){
    // get cart list
    let cartLength = document.getElementById("cartLength")
    let cartBook = getDataFromLs("cartBook")
    if (cartBook == null) {
        setDataToLs("cartBook",JSON.stringify([]))
        return
    }
    // show cart length
    cartBook = JSON.parse(cartBook)
    cartLength.innerText = cartBook?.length
    
}

// show fav book length header hint
function updateFavLength(){
    // get fav book
    let favLength = document.getElementById("favLength")
    let favBook = getDataFromLs("favBook")
    if (favBook == null) {
        setDataToLs("favBook",JSON.stringify([]))
        return
    }
    // show fav book length to header hint
    favBook = JSON.parse(favBook)
    favLength.innerText = favBook?.length
   
}

export {updateCartLength,updateFavLength}