
async function loginform(event){
    event.preventDefault();
    const data={
        email:event.target.email.value,
        password:event.target.password.value
    }
   
    try{
        const loginformData= await axios.post('http://localhost:3000/loginformdata',data)
            .then(res=>{
                alert(res.data)
            })
            .catch(error=>{alert(res.data)})
        event.target.reset()
        
    }catch(err){
        console.log(err)
    }
}    