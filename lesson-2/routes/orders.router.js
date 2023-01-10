const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
    const { userId } = req.query;   
    const { token } = req.headers;
    console.log(`UserId: ${userId}` )
    console.log(`Token: ${token}` )
    res.send('get userid and token')
});

router.get("/:orderId/:custId", (req, res) => {
    const {orderId, custId} = req.params;
    console.log(`orderID ${orderId}`,`custID ${custId}` );
    res.send('get orders by order id and customer id ');
});



module.exports = router
