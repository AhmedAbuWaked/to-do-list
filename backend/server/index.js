const express = require('express');
const app = express();
const db = require('../database/db');
const toDoModel = require('../database/model');
const cors = require('cors');

app.use(cors());

app.use(express.json({ extended: false }));
db();
var index = 0;
app.post('/addToDo', async (req, res) => {
    const { text } = req.body;
    console.log(text)
    let toDo = new toDoModel({
        text,
        index
    })
    await toDo.save().then((resp) => {
        index++
        console.log(resp)
        res.send(resp.id)
    }).catch(err => {
        res.send(err);
    })
});

app.get('/allList', async (req, res) => {
    await toDoModel.find({})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err.message)
        })
})

app.delete('/deleteToDo/:index', async (req, res) => {
    const { index } = req.params
    console.log(index)
    await toDoModel.deleteOne({ index })
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err);
        })
});

app.delete('/deleteAll', async (req, res) => {
    await toDoModel.deleteMany({})
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            res.send(err);
        })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
