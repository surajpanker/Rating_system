const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');



var app = express();
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
  res.status(200).json({
    message:"hello world"
  });
});

app.post('/',(req,res,next)=>{
  const person={
    name:req.body.name,
    age:req.body.age
  }
  
  res.status(200).json({
    message:"person data",
    createPerson:person
  });
})
app.listen(3000, () => {
  var moment = require('moment-timezone');
console.log(moment().tz("Asia/Taipei").format())
console.log("http://localhost:3000")

})