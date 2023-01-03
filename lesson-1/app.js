const express = require('express'); //giai thich

const app = express();

app.use(express.json())

const port = 3001;

app.get('/', function (req, res) { //callback
  res.send('Hello World!');
});

//GET API BY ROUTE PARAMS
app.get('/orders/:orderID/:custID',(req,res)=>{
    const { orderID, custID } = req.params;

    console.log(`orderid: ${orderID} ,custid: ${custID}`);
    res.send('get order by orderid and custid');
})

//GET API BY QUERY PARAMS and Headers
app.get('/orders',( req, res ) => {
    const { userId } = req.query;
    const {token} = req.headers;
    console.log(`UserId : ${userId}`)
    console.log(`Token: ${token}`)
    res.send('get order by userid')
})

//POST API 
app.post('/orders',( req,res ) => {
    let data = req.body;
    console.log(data);
    res.json({status :1, message: 'post method orders'})
})


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
