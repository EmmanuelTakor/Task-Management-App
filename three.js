let express = require('express');

let app = express();

let db;
app.use(express.static('public'))
let {MongoClient,ObjectId} = require('mongodb');
async function go(){
let client = new MongoClient('mongodb+srv://Takor:1234@cluster0.zykorjw.mongodb.net/TodoApp?retryWrites=true&w=majority')
await client.connect()
db = client.db()
app.listen(3000, () =>{console.log('server is up!')});
}
go()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/',(req,res) => {
    db.collection('items').find().toArray((err,items) =>{
        res.send(`<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> Task Management App </title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">Task Management App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action="/create-item"  method="POST">
                <div class="d-flex align-items-center">
                  <input name='item' autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
          ${items.map(item =>{return `   <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
          <span class="item-text">${item.text}</span>
          <div>
            <button data-d="${item._d}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button class="delete-me btn btn-danger btn-sm">Delete</button>
          </div>
        </li>`}).join('')}
            </ul>
            
          </div>
          <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
          <script src="/browser.js"></script>
        </body>
        </html>`)
    })
})
app.post('/create-item',(req,res) => {
   if(req.body.item != ''){
    db.collection('items').insertOne({text: req.body.item})
    res.redirect("/")
   } else  {
   res.redirect("/")
     }})
     app.post('/update-item',(req,res)=>{console.log(req.body.text)
        db.collection('items').findOneAndUpdate({_id: new ObjectId(req.body.id)}, {$set: {text: req.body.text}},()=>{res.send("succcess!")})
     })
     app.delete('/delete-item', (req,res)=>{

      db.collection('items').findOneAndDelete({_id: new ObjectId(req.body.id)},)
     })