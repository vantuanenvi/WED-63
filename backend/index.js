const exp = require("express");
const cors = require("cors")
const app = exp();
app.use(exp.json());

// const myLog = require("./logger");
// app.use(myLog);

//cors cho phep truy cap front end - backend
app.use(cors());

const validateToken = require("./validateToken");

const userRouter = require("./routes/user.router");
const orderRouter = require("./routes/order.router");
app.use("/api/users", userRouter);
app.use("/api/orders",validateToken ,orderRouter);

app.get("/", (req, res) => {
  res.send("web63 b2");
});
const database = require("./database")
const db = new database()

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listenting on port ${port}`);
  db.connect().then((err, result)=>{
    if(err) throw err
    console.log('database is connected')
  })
});
