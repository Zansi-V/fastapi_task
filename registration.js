function redirect() {
    window.location= "login.html";
 }
function register(){
   
    let username1 = document.getElementById("username1").value
    let email1 = document.getElementById("email1").value
    let password1 = document.getElementById("password1").value
    let address1 = document.getElementById("address1").value
    let age1 = document.getElementById("age1").value
    let college1 = document.getElementById("college1").value
    let registeruser = new XMLHttpRequest()
    registeruser.onreadystatechange =() =>{
        if(registeruser.readyState == 4 && registeruser.status == 200){
            redirect()
        }
    }
    registeruser.open("POST","http://127.0.0.1:8000/sign_up",true)
    let body = JSON.stringify({username:username1,email:email1,password:password1,address:address1,age:age1,college_name:college1})
    registeruser.setRequestHeader('Content-type','application/json;charset=UTF-8')
    registeruser.send(body)
    alert("successfully registered")
}