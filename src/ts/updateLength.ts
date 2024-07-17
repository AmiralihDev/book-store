import { getDataFromLs } from "./getDataFromLs"
import { setDataToLs } from "./setDataToLs"


function updateCartLength(){
    let cartLength = document.getElementById("cartLength")
    let cartBook = getDataFromLs("cartBook")
    if (cartBook == null) {
        setDataToLs("cartBook",JSON.stringify([]))
        return
    }
    cartBook = JSON.parse(cartBook)
    cartLength.innerText = cartBook?.length
    
}

function updateFavLength(){
    let favLength = document.getElementById("favLength")
    let favBook = getDataFromLs("favBook")
    if (favBook == null) {
        setDataToLs("favBook",JSON.stringify([]))
        return
    }
    favBook = JSON.parse(favBook)
    favLength.innerText = favBook?.length
   
}

export {updateCartLength,updateFavLength}