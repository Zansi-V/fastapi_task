function redirect() {
    window.location= "login.html";
}
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('logout').onclick = function(){
            localStorage.removeItem("users")
            window.location="home.html"
    };   
})
function onload_event(){
   var x = JSON.parse(localStorage.getItem("users"));
   let xhr = new XMLHttpRequest()

   xhr.onreadystatechange = () =>{
    if(xhr.readyState === 4 && xhr.status === 200){
        let object1 = JSON.parse(xhr.response)
        let y = object1.username
            let z =document.getElementById("pi")
            z.innerHTML = y
            let out=document.getElementById("logout")
            if(localStorage.getItem('users') !== null) {
                  let l =document.getElementById("log")
                  let r=document.getElementById("regs")
                  l.style.display="none"
                  r.style.display="none"
                  out.style.display="block"
            }
    }
   }
   xhr.open("GET","http://127.0.0.1:8000/authorize/",true)
   xhr.setRequestHeader('token',x)
   xhr.send()
}
window.onload = onload_event();
window.onload = load;

// function onload1(){
//     load();<br />
//     choose();
// }


// function load(){
//     var url= "http://127.0.0.1:8000/searchuser"
//     studentdata()
//     request.open("GET",url,true)
//     request.send()
// }
    
function load(){
    var url= "http://127.0.0.1:8000/user/"
    request=new XMLHttpRequest();
    console.log(request)
    request.onreadystatechange = () =>{
        if (request.readyState == 4 && request.status == 200) {
            var array1 = JSON.parse(request.response)
            let total=array1.total
            document.getElementById("totalp").value=total
            let page_size1=array1.page
            document.getElementById("page").value=page_size1
            let page=array1.page_size
            document.getElementById("pagesi").value=page
            let array=array1.data
            console.log(array1)
            var html_data ="<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
                for(var i=0;i<array.length;i++){

                          html_data+="<tr>"+
                            "<td>"+array[i][0]+"</td>"+
                            "<td>"+array[i][1]+"</td>"+
                            "<td>"+array[i][2]+"</td>"+
                            "<td>"+array[i][3]+"</td>"+
                            "<td>"+array[i][4]+"</td>"+
                            "<td>"+array[i][5]+"</td>"+
                            "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                            "</tr>";

                    }
                }
                table.innerHTML = html_data
                totalpages =  document.getElementById("totalp").value
                pagesi= document.getElementById("pagesi").value
                // let totalpages = Math.ceil(totalpages1/pagesi)
                // let totalpages=9

                page1 = 1
                // console.log(page2)
                element(totalpages,page1)
                let totalpage = document.getElementById("totalpage")
                totalpage.innerHTML = totalpages
       }
    request.open("GET",url,true)
    request.send()
}

function searchvs(){
    
    var search1=document.getElementById("sear")
    request=new XMLHttpRequest();
    request.onreadystatechange = () =>{
        if (request.readyState == 4 && request.status == 200) {
            var json_data = JSON.parse(request.response)
            // tableshow(json_data)   
            var html_data ="<tr><th onclick=sorttable2(this)>stud_id <i class='fa-thin fa-sort'></i></th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
                    for(var user of json_data){  
                            html_data+="<tr>"+
                                "<td>"+user[0]+"</td>"+
                                "<td>"+user[1]+"</td>"+
                                "<td>"+user[2]+"</td>"+
                                "<td>"+user[3]+"</td>"+
                                "<td>"+user[4]+"</td>"+
                                "<td>"+user[5]+"</td>"+
                                "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                                "</tr>";
        }
        table.innerHTML=html_data
      }
    }
    // studentdata()
    request.open("GET","http://127.0.0.1:8000/user/"+ search1.value,true)
    request.send();
    
}

function tableshow(object){

    document.getElementById("object").value=object.length
    
    var html_data ="<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
    for(var user of object){  
                    html_data+="<tr>"+
                        "<td>"+user[0]+"</td>"+
                        "<td>"+user[1]+"</td>"+
                        "<td>"+user[2]+"</td>"+
                        "<td>"+user[3]+"</td>"+
                        "<td>"+user[4]+"</td>"+
                        "<td>"+user[5]+"</td>"+
                        "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                        "</tr>";
                        // "<td>"+user["stud_id"]+"</td>"+
                        // "<td>"+user["username"]+"</td>"+
                        // "<td>"+user["email"]+"</td>"+
                        // "<td>"+user["address"]+"</td>"+
                        // "<td>"+user["age"]+"</td>"+
                        // "<td>"+user["college_name"]+"</td>"+
                        // "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                        // "</tr>";
                    }
                    table.innerHTML=html_data
                    load1()
                        // }
        }


function run(td){
    let selectedRow = td.parentElement.parentElement;
    let er = selectedRow.cells[0].innerHTML;
    var request=new XMLHttpRequest();
    request.onreadystatechange = () =>{
        if (request.readyState == 4 && request.status == 200) {
            var obj = JSON.parse(request.response)
            document.querySelector("#update_id").value = obj.stud_id
            document.querySelector("#username").value = obj.username
            document.querySelector("#myModal #email").value = obj.email
            document.querySelector("#myModal #address").value = obj.address
            document.querySelector("#myModal #age").value=obj.age
            document.querySelector("#myModal #college").value = obj.college_name   
       }
    }
    request.open("GET","http://127.0.0.1:8000/getuser/"+ er,true)
    request.send()
}
function deleter(td){
  let selectedRow = td.parentElement.parentElement
  let row_id=selectedRow.cells[0].innerHTML
  document.getElementById('delete_id').value=row_id
}

function deleteuser(){
    var token = JSON.parse(localStorage.getItem("users"))
    if(token !== null) {
     let student_id = document.getElementById('delete_id').value
     let deleteuser = new XMLHttpRequest()
     deleteuser.onreadystatechange =() =>{
     if(deleteuser.readyState == 4 && deleteuser.status == 200)
     {
     alert(deleteuser.response)

     }
    }
    deleteuser.open("DELETE","http://127.0.0.1:8000/delete/"+ student_id , true)
    deleteuser.setRequestHeader("token",token)
    deleteuser.send()
    location.reload();
   }
   else{
        alert("you can not delete this users because you are not authenticate!")
        redirect()
   }
}


function supdate(){
    var token = JSON.parse(localStorage.getItem("users"))
    if(token !== null) {
     let s_id = document.getElementById("update_id").value 
     let username1 = document.getElementById("username").value 
     let email1 = document.getElementById("email").value 
     let address1 = document.getElementById("address").value 
     let age1 = document.getElementById("age").value 
     let college1= document.getElementById("college").value 
     let updateuser1=new XMLHttpRequest()
     updateuser1.onreadystatechange =() =>{
        if(updateuser1.readyState == 4 && updateuser1.status == 200){
            alert(updateuser1.responseText)
        }
     }
     updateuser1.open("PUT","http://127.0.0.1:8000/updateuser/"+s_id,true)
     updateuser1.setRequestHeader('Content-type','application/json;charset=UTF-8')
     let body = JSON.stringify({username:username1,email:email1,address:address1,age:age1,college_name:college1})
     updateuser1.setRequestHeader("token",token)
     updateuser1.send(body)
     location.reload();
    }
    else{
        alert("you can not update this users because you are not authenticate!")
        redirect()
    }
}

function studentdata(){
    request=new XMLHttpRequest();
    console.log(request)
    request.onreadystatechange = () =>{
        if (request.readyState == 4 && request.status == 200) {
            var array = JSON.parse(request.response)
            var html_data ="<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
                for(var i=0;i<array.length;i++){
                    
                          html_data+="<tr>"+
                            "<td>"+array[i][0]+"</td>"+
                            "<td>"+array[i][1]+"</td>"+
                            "<td>"+array[i][2]+"</td>"+
                            "<td>"+array[i][3]+"</td>"+
                            "<td>"+array[i][4]+"</td>"+
                            "<td>"+array[i][5]+"</td>"+
                            "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                            "</tr>";
                    }
                }
                 table.innerHTML = html_data
       }
    }


function sorttable2(th){
    let thvalue = th.innerHTML
    request=new XMLHttpRequest();
    request.onreadystatechange = () =>{
        if (request.readyState == 4 && request.status == 200) {
            var json_data = JSON.parse(request.response)
            // tableshow(json_data)   
            var html_data ="<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
                    for(var user of json_data){  
                            html_data+="<tr>"+
                                "<td>"+user[0]+"</td>"+
                                "<td>"+user[1]+"</td>"+
                                "<td>"+user[2]+"</td>"+
                                "<td>"+user[3]+"</td>"+
                                "<td>"+user[4]+"</td>"+
                                "<td>"+user[5]+"</td>"+
                                "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                                "</tr>";
        }
        table.innerHTML=html_data
    }
}
request.open("GET","http://127.0.0.1:8000/sorting/"+thvalue,true)
request.send()
}
 
function r1(td){
        er = td
        let no = document.getElementById("no")
        no.innerHTML = td
        
        request=new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                var array1 = JSON.parse(request.response)
                let array=array1.data
                var html_data ="<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
                for(var i=0;i<array.length;i++){
                    
                          html_data+="<tr>"+
                            "<td>"+array[i][0]+"</td>"+
                            "<td>"+array[i][1]+"</td>"+
                            "<td>"+array[i][2]+"</td>"+
                            "<td>"+array[i][3]+"</td>"+
                            "<td>"+array[i][4]+"</td>"+
                            "<td>"+array[i][5]+"</td>"+
                            "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>"+
                            "</tr>";
                    }
                }
                 table.innerHTML = html_data
        }
        request.open("GET","http://127.0.0.1:8000/user/?page_num="+er,true)
        request.send()
}

const utag = document.querySelector("#ul1");
function element(totalpages,page1)
{
let litag = "";
let active1;
let beforepage = page1 - 1;
let afterpagee = page1 + 1;
if(page1 > 1){
   litag += `<li class ='btn btn-primary prev me-1' onclick="element(totalpages,${page1-1});r1(${page1-1})"><< prev</li>`
}
if(page1 > 2){
  litag += `<li class="btn btn-primary numb me-1 " onclick="element(totalpages,1);r1(1)">1</li>`
  if(page1 > 3){
    litag += `<li class="dots me-1 ms-1">...</li>`
  }
}

if(page1 == totalpages){
   beforepage = beforepage - 2;
}
else if(page1 == totalpages -1){
   beforepage = beforepage -1
}

if(page1 == 1){
     afterpagee = afterpagee + 2;
}
else if(page1 == totalpages -1){
   afterpagee = afterpagee + 1
}

for(let pagelength =beforepage;pagelength <= afterpagee;pagelength++){
  if(pagelength > totalpages){
     continue;
   }
  if(pagelength == 0){
     pagelength = pagelength + 1
    }
  if(page1 == pagelength){
     active1 = "active"
    }
  else{
     active1 = ""
    }
  litag += `<li class ='btn btn-primary numb me-1 ms-1 ${active1}' onclick="element(totalpages,${pagelength}); r1(${pagelength});">${pagelength}</li>` 
}
if(page1 < totalpages - 1){
  if(page1 < totalpages - 2){
     litag += `<li class="dots me-1">...</li>`
    }
  litag += `<li class="btn btn-primary numb me-1" onclick="element(totalpages,${totalpages});r1(${totalpages})">${totalpages}</li>`

}
if(page1 < totalpages){
  litag += `<li class ='btn btn-primary next me-1' onclick="element(totalpages,${page1+1}),r1(${page1+1})">next>></li>`
}
utag.innerHTML=litag
}


