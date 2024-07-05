

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
    console.log(i);
    const id = event.target.parentElement.id;
    axios.get(`http://localhost:3000/expenseDelete/${id}`)
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
        "amount":amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "servive", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
    
    }).catch(err=>{
        console.log("err",err)
    })
}


