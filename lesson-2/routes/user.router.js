const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', ((req, res) =>{
    res.send('This is user api');
}));

router.post('/login',(req,res)=>{
    let {username, password} = req.body;
    if (!username || !password ) {
        // throw new Error ('Please write username and password')
        res.send({success:false, token:''})
    } else{
        let token = jwt.sign({username: username} ,'ngcaDBiBWKatwMXO5S07');
        res.send({success:true, token: token})
    }
})
module.exports = router