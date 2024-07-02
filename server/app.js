const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const sequilze=require('sequelize');

// const admin=require('./routers/admin');
const user=require('./routers/user');

app.use(cors());
app.use(bodyParser.json());

// app.use(admin);
app.use(user);

app.listen(3000,()=>{
    console.log('server ok')
})