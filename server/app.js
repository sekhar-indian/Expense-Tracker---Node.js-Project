const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./models/signup');

// const admin=require('./routers/admin');
const user=require('./routers/user');

app.use(cors());
app.use(bodyParser.json());

// app.use(admin);
app.use(user);

sequelize.sync()
.then(res=> console.log('database conection ok'))
.catch(err=>console.log(err))

app.listen(3000,()=>{
    console.log('server ok')
})