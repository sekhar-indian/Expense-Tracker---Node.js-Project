async function expenseAdd(event){
    event.preventDefault()
   
    const data={
        expense:event.target.expense.value,
        dicription:event.target.dicription.value,
        expenses:event.target.expenses.value,
        userid:localStorage.getItem('userid')
    }

try{
    const postData= await axios.post('http://localhost:3000/expense',data)
    event.target.reset()
} catch(err){
    console.log(err)
} 
}
