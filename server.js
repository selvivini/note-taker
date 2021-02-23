const express = require('express');
const path = require('path');
const fs= require('fs');
const noteData = require('./db/db.json')
const app= express();
const PORT =process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/api/notes',(req,res)=>{
    
    res.send(noteData)
})

app.post('/api/notes',(req,res)=>{
 let dataPath = path.join(__dirname, "db/db.json")
 let newNote = req.body;
 console.log(newNote)
noteData.push(newNote)
 fs.writeFile(dataPath, JSON.stringify(noteData), (err)=>{
 if(err){
     console.log(err)
 }else{
     console.log("your note is saved")
 }
 })
 res.json(newNote)
})

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
    
})
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})



app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})