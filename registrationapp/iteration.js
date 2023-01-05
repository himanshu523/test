

function saveDataToLocalStorage(event)
{
    event.preventDefault();
    const name = event.target.username.value;
    const email =event.target.useremail.value;
    const number =event.target.usernumber.value;

    const obj={
        name,
        email,
        number,
    }
    localStorage.setItem(obj.email,JSON.stringify(obj));

    showUserData(obj);

}

window.addEventListener("DOMContentLoaded",()=>{
    const localstorageobj = localStorage;
    const localStoragestring = Object.keys(localstorageobj);
    localStoragestring.forEach(key=>{
        const userdetailstring = localstorageobj[key];
        const userdetailobj = JSON.parse(userdetailstring);
        showUserData(userdetailobj);

    })
})

function showUserData(user)
{
    const parentNode = document.getElementById('userlist');
    const childNode =`<li id=${user.email}> ${user.name} - ${user.email} ${user.number}
    <button onclick=deletee('${user.email}')> Delete User </button>
    <button onclick=edite('${user.name}','${user.email}','${user.number}')>Edit User </button>
 </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}

function edite(name, email, number) {

    document.getElementById('username').value = name;
    document.getElementById('useremail').value = email;
    document.getElementById('usernumber').value = number;

    deletee(email)
}



function deletee(email) {
    console.log(email)
    localStorage.removeItem(email);
    removeUserFromScreen(email);

}

function removeUserFromScreen(email) {
    const parentNode = document.getElementById('userlist');
    const childNodeToBeDeleted = document.getElementById(email);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

