const express = require('express');
const PORT = 5000;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tdd',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    // .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

app.use(express.json()); //미들웨어 함수 추가, restful json 데이터를 body에 받는 경우

app.use("/api/products", productRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})


app.listen(PORT);
console.log(`Running on port ${PORT}`)

module.exports = app;
