function redirect() {
    window.location= "home.html";
}
document.addEventListener('DOMContentLoaded', function(){
document.getElementById('login_datav').onclick = function(){
    var username = document.getElementById('username12').value;
    var password = document.getElementById('password1').value;
    var url= "http://127.0.0.1:8000/login"
    var request = new XMLHttpRequest
    request.open("POST",url,true)
    request.setRequestHeader('Content-type','application/json;charset=UTF-8')
    request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
            let object1 = JSON.parse(request.response)
            localStorage.setItem("users",JSON.stringify(object1.access_token))
            window.location= "home.html";
        }
    }
    var body = JSON.stringify({username:username,password:password});
    request.send(body) 
    if(username=="" || password=="")
    {
        alert("please enter the value")
    }
    else{
        alert("succesfully login")
    }
  }
})



