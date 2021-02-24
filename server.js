const express = require('express');
const path = require('path');
const fs= require('fs');
const noteData = require('./db/db.json')
const app= express();
const PORT =process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// api to get the note object
app.get('/api/notes',(req,res)=>{
    
    res.send(noteData)
})

// api route hits when the note title and text gets posted
app.post('/api/notes',(req,res)=>{
 let dataPath = path.join(__dirname, "db/db.json")
 let newNote = {
     title :req.body.title,
     text: req.body.text,
     };
 let uniqueId = noteData.length+1
 newNote.id = uniqueId 

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

// api to delete the individual note
app.delete('/api/notes/:id', (req, res)=>{
   let deleteNote= noteData.filter(note=> note.id == JSON.parse(req.params.id))
//    console.log(deleteNote)
   noteData.splice(noteData.indexOf(deleteNote),1);
   fs.writeFileSync('db/db.json',JSON.stringify(noteData))
   res.send('note deleted')
})

// route to  get in to the notes page
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
    
})
// base route which fetches the index.html page
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})



app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})