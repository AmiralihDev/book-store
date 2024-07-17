let express = require('express')
let app = express()

let multer = require('multer')
let fileStorageEngin = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null, './public/bookImg')
    },
    filename: (req,file, callback) => {
        callback(null,Date.now() + "--" +file.originalname)
    }
})

const upload = multer({storage : fileStorageEngin})


app.post("/single", upload.single("image"),(req, res) => {
    console.log(req.file);
    res.send("single file upload successfully")
})

app.post("/multiple", upload.array('images',3) , (req,res) => {
    console.log(req.files)
    res.send("multiple files upload successfully")
})



app.listen(5173,() => {
    console.log('server run on post' + 5173);
})