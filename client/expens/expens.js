
async function expenseAdd(event){
    event.preventDefault()
   
    const data={
        expense:event.target.expense.value,
        dicription:event.target.dicription.value,
        expenses:event.target.expenses.value,
        userid:localStorage.getItem('userid')
    }
   const jwtToken=localStorage.getItem('jwtToken');

try{
    const postData= await axios.post('http://localhost:3000/expense',data,{
        headers:{
            'Authorization': `Bearer ${jwtToken}`
        }
    }).then(r=>  getDataExpenses())
   
    event.target.reset()
} catch(err){
    console.log(err)
} 
}

window.onload=()=>{
    getDataExpenses() 
    jwtTokenPrimium=localStorage.getItem('primium');
    decodeToken=parseJwt(jwtTokenPrimium)
    if(decodeToken.premium){
        
        document.getElementById('rzp-button1').style.visibility = 'hidden'; 
        document.getElementById('massage').innerHTML = `<button onclick='leaderboard(event)' >show leadr board</button>`
    }
}

function parseJwt(token) {
    // Example implementation to decode JWT token
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function getDataExpenses(){
 const jwtToken=localStorage.getItem('jwtToken');

 try{
    const data=axios.get('http://localhost:3000/getExpenses',{
        headers:{
            'Authorization': `Bearer ${jwtToken}`
        }
     }).then(response=>{
        console.log(response.data);
        let chElement=document.getElementById('dataElement');
        chElement.innerHTML=''
        for(let i=0;i<response.data.length;i++){
            let tempElement=document.createElement('div');
            tempElement.className='data-container'
            tempElement.id=`${response.data[i].id}`
            tempElement.innerHTML=`<div class='data-item-container'>${response.data[i].expense} => ${response.data[i].dicription} => ${response.data[i].expenses}</div>
            <button class='data-delete-button-container' onclick="deleteData(event,'${response.data[i].id}')">Delete</button>`;
            chElement.prepend(tempElement);
        }
     })
  //print data here
 }catch(err){
    console.log('err')
 }
}



//delete button finction
function deleteData(event,i){
    const jwtToken=localStorage.getItem('jwtToken');
    console.log(i);
    const id = event.target.parentElement.id;
    axios.get(`http://localhost:3000/expenseDelete/${id}`,{
        headers:{
            'Authorization': `Bearer ${jwtToken}`
        }
    })
    .then(re=>{
        getDataExpenses()
        console.log(re)
    })
    .catch(er=>console.log(er))
    console.log(id)
}




document.getElementById('rzp-button1').onclick = function(e){
    const jwtToken=localStorage.getItem('jwtToken');
    axios.get('http://localhost:3000/premium',{
        headers:{
            'Authorization': `Bearer ${jwtToken}`
        }
    }).then(res=>{
    const {orderId,amount,currency}=res.data;
    console.log('hi')

    var options = {
        "key": "rzp_test_P9yDvw31QolihZ", // Enter the Key ID generated from the Dashboard
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response) {
                try{
                    const d= await axios.post('http://localhost:3000/premiumUpdate', {
                        orderId: orderId,
                        paymentId: response.razorpay_payment_id
                    }, {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    }).then(res=>{
                        alert('success')
                    localStorage.setItem('primium',res.data)
                    document.getElementById('rzp-button1').style.visibility = 'hidden'; 
                    leaderboard();
                    })

                }catch(err){
                    alert('Somthing wrong')
                }
        }

    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
    
    }).catch(err=>{
        console.log("err",err)
    })
}




function leaderboard(){
   
    axios.get('http://localhost:3000/leaderboard')
    
    .then(res=>{
        let dataObj = res.data;
        console.log(res)
        // Convert the object to an array of values
        let data = Object.values(dataObj);
        data.sort((a, b) => b.amount - a.amount);
        const ele = document.getElementById('leederboard');
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = `${data[i].name} ${data[i].totalamount}`;
            ele.appendChild(li);
        }

    }).catch(er=>console.log(er))
}