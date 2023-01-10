const express = require('express');

const app = express();
app.use(express.json());

//middle logger
// const myLog = require('./logger')
// app.use(myLog)


const validateToken = require('./validateToken')
const userRouter = require('./routes/user.router');//import user.router
const ordersRouter = require('./routes/orders.router')

app.use('/api/users',userRouter)
app.use('/api/orders',validateToken,ordersRouter)

app.get("/",(req, res) => {
    res.send('web 63 lesson2')
});

const port = 3001;

app.listen(port, () =>{
    console.log(`Example app listening on ${port} `)
});


