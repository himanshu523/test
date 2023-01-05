async function saveToLocalStorage(event) {
    event.preventDefault();
    const amount= event.target.amo.value;
    const description = event.target.des.value;
    const category= event.target.cat.value;
    const obj = {
        amount,
        description,
        category
    }
    //localStorage.setItem(obj.description, JSON.stringify(obj))
    await axios.post("https://crudcrud.com/api/6eea7959a9ab48a3abe9079d8396ba95/expenseData",obj)
    .then((result)=> {
            console.log(result);
            showNewUserOnScreen(result.data);
        })
    .catch(err=>console.log(err));

    event.target.amo.value="";
    event.target.des.value="";



}

window.addEventListener("DOMContentLoaded",async ()=>
{
   // const localStorageObj = localStorage;
   //const localStoragekeys = Object.keys(localStorageObj)

   //localStoragekeys.forEach(key=>{
   //     const userDetailString = localStorageObj[key];
   //     const userDetailObj = JSON.parse(userDetailString);
   //     showNewUserOnScreen(userDetailObj)
   // })
   await axios.get("https://crudcrud.com/api/6eea7959a9ab48a3abe9079d8396ba95/expenseData")
   .then(res=>
    {
        console.log(res);
        for(var i=0;i<res.data.length;i++)
        {
            showNewUserOnScreen(res.data[i]);
        }
    })
    .catch(err=>console.log(err));
})

function showNewUserOnScreen(user)
{
  

            const parentNode = document.getElementById('list');
            const childHTML = `<li id=${user._id}> ${user.amount} - ${user.description} ${user.category}
                                        <button onclick=deleteUser('${user._id}')> Delete User </button>
                                        <button onclick=editUserDetails('${user.description}','${user.amount}','${user.category}','${user._id}')>Edit User </button>
                                     </li>`

            parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserDetails(descript, amt, ctgry,id) {

    document.getElementById('des').value = descript;
    document.getElementById('amo').value = amt;
    document.getElementById('cat').value = ctgry;

    deleteUser(id)
}



async function deleteUser(id) {
    console.log(id);
    await axios.delete(`https://crudcrud.com/api/6eea7959a9ab48a3abe9079d8396ba95/expenseData/${id}`)
    .then((res)=>console.log("successfully deleted"))
    .catch(err=>console.log(err))
    //localStorage.removeItem(descript);
    removeUserFromScreen(id);

}

function removeUserFromScreen(id) {
    const parentNode = document.getElementById('list');
    const childNodeToBeDeleted = document.getElementById(id);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
