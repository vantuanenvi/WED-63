const express = require('express');

const router = express.Router();

router.get('/', ((req, res) =>{
    res.send('This is user api');
}));

router.post('/login',(req,res)=>{
    let {username, password} = req.body;
    if (!username || !password ) {
        // throw new Error ('Please write username and password')
        res.send({success:false, token:''})
    }
    res.send({success:true, token: 'abc'})
})
module.exports = router