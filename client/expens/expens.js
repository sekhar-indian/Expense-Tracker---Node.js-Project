

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
        
        for(let i=0;i<response.data.length;i++){
            let tempElement=document.createElement('div');
            tempElement.className='data-container'
            tempElement.innerHTML=`<div class='data-item-container'>${response.data[i].expense} => ${response.data[i].dicription} => ${response.data[i].expenses}</div>
            <button class='data-delete-button-container'>Delete</button>`;
            chElement.prepend(tempElement);
        }
     })
  //print data here
 }catch(err){
    console.log('err')
 }
}