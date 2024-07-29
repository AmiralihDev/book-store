let i:number = 0;
let i2:number = 0
let i3:number = 0


// get text
let txt:string = "اینده ای خوب با کتابی خوب"
let txt2:string = ""
let txt3:string = ""

// text write speeds
let speed : number = 150;
let speed2 : number = 250
// selector
let jsText = document.getElementById("jsText")
let jsText2 = document.getElementById("jsText2")
let jsText3 = document.getElementById("jsText3")

// valid writes
function writeTxt(){
    writeTxt1()
    if (i == txt.length){

        writeTxt2()
    }if (i2 == txt2.length) {
        
        writeTxt3()
    }
}
// write text 1
function writeTxt1() {
    if (i < txt.length) {
        jsText.innerHTML += txt.charAt(i);
        i++;
        setTimeout(writeTxt, speed);
    }
}

// write text 2
function writeTxt2() {

    if (i2 < txt2.length) {
        jsText2.innerHTML += txt2.charAt(i2);
        i2++;
        setTimeout(writeTxt, speed);
    }
}
// write text 3
function writeTxt3() {

    if (i3 < txt3.length) {
        jsText3.innerHTML += txt3.charAt(i3);
        i3++;
        setTimeout(writeTxt, speed2);
    }
}
export { writeTxt }