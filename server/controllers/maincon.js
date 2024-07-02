
exports.singupformdata=(req,res,next)=>{
    console.log(req.body);
    console.log('oooooo');
    res.status(200).send('Signup data received');
}