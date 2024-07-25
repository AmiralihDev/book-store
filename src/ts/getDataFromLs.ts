// get key and return value
function getDataFromLs(key : string){
    let data = localStorage.getItem(key)

    return data
}


export {getDataFromLs}