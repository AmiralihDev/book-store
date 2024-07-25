// get key and value and set to local storage
function setDataToLs(key : string, value : any){
    localStorage.setItem(key,value)
}
export {setDataToLs}