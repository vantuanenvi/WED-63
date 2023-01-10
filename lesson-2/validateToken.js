const validateToken = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || authorization == ""){
        res.status(403).send("Unauthorized")
    }

    next()
}

module.exports = validateToken