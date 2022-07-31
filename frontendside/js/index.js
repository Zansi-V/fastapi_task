function redirect() {
  window.location = "login.html";
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logout").onclick = function () {
    localStorage.removeItem("users");
    window.location = "home.html";
  };
});

function onload_event() {
  var x = JSON.parse(localStorage.getItem("users"));
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let object1 = JSON.parse(xhr.response);
      let y = object1.username;
      let z = document.getElementById("pi");
      z.innerHTML = y;
      let out = document.getElementById("logout");
      if (localStorage.getItem("users") !== null) {
        let l = document.getElementById("log");
        let r = document.getElementById("regs");
        l.style.display = "none";
        r.style.display = "none";
        out.style.display = "block";
      }
    }
  };
  xhr.open("GET", "http://192.168.1.11:8000/authorize/", true);
  xhr.setRequestHeader("token", x);
  xhr.send();
}
window.onload = onload_event();
window.onload = load;

// function onload1(){
//     load();<br />
//     choose();
// }

// function load(){
//     var url= "http://192.168.1.11:8000/searchuser"
//     studentdata()
//     request.open("GET",url,true)
//     request.send()
// }

function load() {
  if (document.getElementById("sear").value == "") {
    // ?page_num=2&whichsort=desc&key1=Username
    var url = "http://192.168.1.11:8000/user/";
    request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var array1 = JSON.parse(request.response);
        let total = array1.total;
        document.getElementById("totalp").value = total;
        let page_size1 = array1.page;
        document.getElementById("page").value = page_size1;
        let page = array1.page_size;
        document.getElementById("pagesi").value = page;
        let array = array1.data;
        var html_data = "";
        for (var i = 0; i < array.length; i++) {
          html_data +=
            "<tr>" +
            "<td>" +
            array[i][0] +
            "</td>" +
            "<td class='upper'>" +
            array[i][1] +
            "</td>" +
            "<td class='upper'>" +
            array[i][2] +
            "</td>" +
            "<td class='upper'>" +
            array[i][3] +
            "</td>" +
            "<td>" +
            array[i][4] +
            "</td>" +
            "<td class='upper'>" +
            array[i][5] +
            "</td>" +
            "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>" +
            "</tr>";
        }
        table.innerHTML = html_data;
        totalpages = document.getElementById("totalp").value;
        pagesi = document.getElementById("pagesi").value;
        // let totalpages = Math.ceil(totalpages1/pagesi)
        // let totalpages=9
        let noside = document.getElementById("nside");
        let utags = document.getElementById("container");
        page1 = 1;
        if (totalpages > 1) {
          utags.style.display = "flex";
          noside.style.display = "flex";
          // element(stotal,searchpag);
          element(totalpages, page1);
        } else {
          utags.style.display = "none";
          noside.style.display = "none";
        }
        // console.log(page2)
        let totalpage = document.getElementById("totalpage");
        totalpage.innerHTML = totalpages;
        let no = document.getElementById("no");
        no.innerHTML = page1
      }

      
    };
    let tf =document.getElementById("pagesize2").value
    if(tf != ""){
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" + page1 + "&page_size=" + tf,
      true
    );
    }
    else{
    request.open("GET", url, true);
    }
    request.send();
  }
}

function searchvs() {
  let page = 1;
  search1 = document.getElementById("sear");
  if (search1.value == "") {
    load();
  } else {
    request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var array1 = JSON.parse(request.response);
        let total = array1.total;
        document.getElementById("searchtotal").value = total;
        let page_size1 = array1.page;
        document.getElementById("page").value = page_size1;
        let page = array1.page_size;
        document.getElementById("pagesi").value = page;
        let array = array1.data;
        let length1 = array1.totaldata;
        document.getElementById("length").value = length1;
        var html_data = "";
        for (var i = 0; i < array.length; i++) {
          html_data +=
            "<tr>" +
            "<td>" +
            array[i][0] +
            "</td>" +
            "<td class='upper'>" +
            array[i][1] +
            "</td>" +
            "<td class='upper'>" +
            array[i][2] +
            "</td>" +
            "<td class='upper'>" +
            array[i][3] +
            "</td>" +
            "<td>" +
            array[i][4] +
            "</td>" +
            "<td class='upper'>" +
            array[i][5] +
            "</td>" +
            "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>" +
            "</tr>";
        }
        // stotal = document.getElementById("searchtotal").value;
        // pagesi = document.getElementById("pagesi").value;
        totalpages = document.getElementById("searchtotal").value;
        pagesi = document.getElementById("pagesi").value;
        let noside = document.getElementById("nside");
        page1 = 1;
        // searchpag = 1;
        let utags = document.getElementById("container");
        // console.log(page2)
        if (totalpages > 1) {
          utags.style.display = "flex";
          noside.style.display = "flex";
          // element(stotal,searchpag);
          element(totalpages, page1);
        } else {
          utags.style.display = "none";
          noside.style.display = "none";
        }
        let totalpage = document.getElementById("totalpage");
        totalpage.innerHTML = total;
        let no = document.getElementById("no");
        no.innerHTML = page1
      }
      table.innerHTML = html_data;
    };

    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" +
        page +
        "&search=" +
        search1.value,
      true
    );
    request.send();
  }
}

function tableshow(object) {
  let array = object.data;
  var pages = object.total;
  document.getElementById("totalpage").innerHTML = pages;
  document.getElementById("total").value = pages;
  // page1=1
  // totalpages= document.getElementById("total").value
  var html_data = "";

  for (var i = 0; i < array.length; i++) {
    html_data +=
      "<tr>" +
      "<td>" +
      array[i][0] +
      "</td>" +
      "<td class='upper us'>" +
      array[i][1] +
      "</td>" +
      "<td class='upper em'>" +
      array[i][2] +
      "</td>" +
      "<td class='upper add'>" +
      array[i][3] +
      "</td>" +
      "<td>" +
      array[i][4] +
      "</td>" +
      "<td class='upper coll'>" +
      array[i][5] +
      "</td>" +
      "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>" +
      "</tr>";
  }

  table.innerHTML = html_data;
  // element(totalpages,page1)
  // clicki(this)
  // }
}
// function clicki(td){
//   // let ivalue = td
//   let nod = document.getElementById("nod")
//   console.log(nod)
//   nod.classList.add("opacity1")
// }

function xmlrequest() {
  request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var array1 = JSON.parse(request.response);
      tableshow(array1);
    }
  };
}

function run(td) {
  let selectedRow = td.parentElement.parentElement;
  let er = selectedRow.cells[0].innerHTML;
  var request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var obj = JSON.parse(request.response);
      document.querySelector("#update_id").value = obj.stud_id;
      document.querySelector("#username").value = obj.username;
      document.querySelector("#myModal #email").value = obj.email;
      document.querySelector("#myModal #address").value = obj.address;
      document.querySelector("#myModal #age").value = obj.age;
      document.querySelector("#myModal #college").value = obj.college_name;
    }
  };
  request.open("GET", "http://192.168.1.11:8000/user/" + er, true);
  request.send();
}
function deleter(td) {
  let selectedRow = td.parentElement.parentElement;
  let row_id = selectedRow.cells[0].innerHTML;
  document.getElementById("delete_id").value = row_id;
  console.log(row_id);
}

function deleteuser() {
  var token = JSON.parse(localStorage.getItem("users"));
  if (token !== null) {
    let student_id = document.getElementById("delete_id").value;
    let deleteuser = new XMLHttpRequest();
    deleteuser.onreadystatechange = () => {
      if (deleteuser.readyState == 4 && deleteuser.status == 200) {
        alert(deleteuser.response);
      }
    };
    deleteuser.open("DELETE", "http://192.168.1.11:8000/user/" + student_id, true);
    deleteuser.setRequestHeader("token", token);
    deleteuser.send();
    location.reload();
  } else {
    alert("you can not delete this users because you are not authenticate!");
    redirect();
  }
}

function supdate() {
  var token = JSON.parse(localStorage.getItem("users"));
  if (token !== null) {
    let s_id = document.getElementById("update_id").value;
    let username1 = document.getElementById("username").value;
    let email1 = document.getElementById("email").value;
    let address1 = document.getElementById("address").value;
    let age1 = document.getElementById("age").value;
    let college1 = document.getElementById("college").value;
    let updateuser1 = new XMLHttpRequest();
    updateuser1.onreadystatechange = () => {
      if (updateuser1.readyState == 4 && updateuser1.status == 200) {
        alert(updateuser1.responseText);
      }
    };
    updateuser1.open("PUT", "http://192.168.1.11:8000/user/" + s_id, true);
    updateuser1.setRequestHeader(
      "Content-type",
      "application/json;charset=UTF-8"
    );
    let body = JSON.stringify({
      username: username1,
      email: email1,
      address: address1,
      age: age1,
      college_name: college1,
    });
    updateuser1.setRequestHeader("token", token);
    updateuser1.send(body);
    location.reload();
  } else {
    alert("you can not update this users because you are not authenticate!");
    redirect();
  }
}

function studentdata() {
  request = new XMLHttpRequest();
  console.log(request);
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var array = JSON.parse(request.response);
      var html_data =
        "<tr><th onclick=sorttable2(this)>stud_id</th><th onclick=sorttable2(this)>username</th><th onclick=sorttable2(this)>email</th><th onclick=sorttable2(this)>address</th><th onclick=sorttable2(this)>age</th><th onclick=sorttable2(this)>college_name</th><th>Action</th></tr>";
      for (var i = 0; i < array.length; i++) {
        html_data +=
          "<tr>" +
          "<td>" +
          array[i][0] +
          "</td>" +
          "<td>" +
          array[i][1] +
          "</td>" +
          "<td>" +
          array[i][2] +
          "</td>" +
          "<td>" +
          array[i][3] +
          "</td>" +
          "<td>" +
          array[i][4] +
          "</td>" +
          "<td>" +
          array[i][5] +
          "</td>" +
          "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>" +
          "</tr>";
      }
    }
    table.innerHTML = html_data;
  };
}

function r1(td) {
  er = td;
  let no = document.getElementById("no");
  search1 = document.getElementById("sear");
  no.innerHTML = td;
  var page_size = document.getElementById("pagesize2").value;
  console.log(page_size);
  var key = document.getElementById("keyname");
  xmlrequest();
  let wsort = document.getElementById("sort");
  if (document.getElementById("sear").value == "") {
    if (page_size == "" && wsort.value == "") {
      request.open(
        "GET",
        "http://192.168.1.11:8000/user/?page_num=" + er + "&key1=" + key.value,
        true
      );
    } else if (page_size != "") {
      // let totalpages=document.getElementById("total").value
      // page1=1
      // element(totalpages,page1)
      if (wsort.value == "") {
        request.open(
          "GET",
          "http://192.168.1.11:8000/user/?page_num=" +
            er +
            "&page_size=" +
            page_size +
            "&key1=" +
            key.value,
          true
        );
      } else {
        request.open(
          "GET",
          "http://192.168.1.11:8000/user/?page_num=" +
            er +
            "&page_size=" +
            page_size +
            "&whichsort=" +
            wsort.value +
            "&key1=" +
            key.value,
          true
        );
      }
    } else {
      request.open(
        "GET",
        "http://192.168.1.11:8000/user/?page_num=" +
          er +
          "&whichsort=" +
          wsort.value +
          "&key1=" +
          key.value,
        true
      );
    }
  } else {
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" + er + "&search=" + search1.value,
      true
    );
  }

  request.send();
}

function element(totalpages, page1) {
  const utag = document.querySelector("#ul1");
  let litag = "";
  let active1;
  let beforepage = page1 - 1;
  let afterpagee = page1 + 1;
  if (page1 > 1) {
    litag += `<li class ='btn btn-primary prev me-1' onclick="element(totalpages,${
      page1 - 1
    });r1(${page1 - 1})"><< prev</li>`;
  }
  if (page1 > 2) {
    litag += `<li class="btn btn-primary numb me-1 " onclick="element(totalpages,1);r1(1);">1</li>`;
    if (page1 > 3) {
      litag += `<li class="dots me-1 ms-1">...</li>`;
    }
  }

  if (totalpages > 4) {
    if (page1 == totalpages) {
      beforepage = beforepage - 2;
    } else if (page1 == totalpages - 1) {
      beforepage = beforepage - 1;
    }
  }

  if (totalpages > 4) {
    if (page1 == 1) {
      afterpagee = afterpagee + 2;
    } else if (page1 == totalpages - 1) {
      afterpagee = afterpagee + 1;
    }
  }

  for (let pagelength = beforepage; pagelength <= afterpagee; pagelength++) {
    if (pagelength > totalpages) {
      continue;
    }
    // if (pagelength == -1) {
    //   pagelength = pagelength + 2;
    // }
    if (pagelength == 0) {
      pagelength = pagelength + 1;
    }
    if (page1 == pagelength) {
      active1 = "active";
    } else {
      active1 = "";
    }
    litag += `<li class ='btn btn-primary numb me-1 ms-1 ${active1}' onclick="element(totalpages,${pagelength}); r1(${pagelength});">${pagelength}</li>`;
  }
  if (page1 < totalpages - 1) {
    if (page1 < totalpages - 2) {
      litag += `<li class="dots me-1">...</li>`;
    }
    litag += `<li class="btn btn-primary numb me-1" onclick="element(totalpages,${totalpages});r1(${totalpages})">${totalpages}</li>`;
  }
  if (page1 < totalpages) {
    litag += `<li class ='btn btn-primary next me-1' onclick="element(totalpages,${
      page1 + 1
    }),r1(${page1 + 1})">next>></li>`;
  }
  utag.innerHTML = litag;
}

function descending(td) {
  const boxes = document.querySelectorAll(".fa");
  boxes.forEach((fa) => {
    fa.classList.remove("opacity1");
  });
  let ur = td;
  console.log(td.parentElement.parentElement.firstElementChild.innerHTML);
  ur.classList.add("opacity1");
  let descorder = "desc";
  document.getElementById("sort").value = descorder;
  // let thvalue = td.parentElement.parentElement.childNodes[0].innerHTML;
  thvalue = td.parentElement.parentElement.firstElementChild.innerHTML;
  console.log(thvalue);
  var page1 = 1;
  var key = document.getElementById("keyname");
  key.value = thvalue;
  // var h1 = document.querySelector('h1');
  let pagelimit = document.getElementById("pagesize2").value;
  element(totalpages, page1);
  document.getElementById("no").value = page1;
  xmlrequest();
  if (pagelimit == "") {
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" +
        page1 +
        "&whichsort=" +
        descorder +
        "&key1=" +
        thvalue,
      true
    );
  } else {
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" +
        page1 +
        "&page_size=" +
        pagelimit +
        "&whichsort=" +
        descorder +
        "&key1=" +
        thvalue,
      true
    );
  }

  request.send();
}

// function des(){

//   xmlrequest();
//   request.open(
//     "GET",
//     "http://192.168.1.11:8000/user/?page_num=" +
//       page1 +
//       "&whichsort=" +
//       descorder +
//       "&key1=" +
//       thvalue,
//     true
//   );
//   request.send();
// }

function ascending(td) {
  document.getElementById("sort").value = "";
  const boxes = document.querySelectorAll(".fa");
  boxes.forEach((fa) => {
    fa.classList.remove("opacity1");
  });
  let ur = td;
  ur.classList.add("opacity1");
  let thvalue = td.parentElement.parentElement.firstElementChild.innerHTML;
  var key = document.getElementById("keyname");
  key.value = thvalue;
  var page = 1;
  let pagelimit = document.getElementById("pagesize2").value;
  xmlrequest();
  element(totalpages, page1);
  if (pagelimit == "") {
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" + page + "&key1=" + thvalue,
      true
    );
  } else {
    request.open(
      "GET",
      "http://192.168.1.11:8000/user/?page_num=" +
        page +
        "&page_size=" +
        pagelimit +
        "&key1=" +
        thvalue,
      true
    );
  }
  request.send();
}

function myFunction() {
  var x = document.getElementById("mySelect").selectedIndex;
  var y = document.getElementById("mySelect").options;
  var z = y[x].text;
  document.getElementById("pagesize2").value = z;
  console.log(z);
  let totalpages = document.getElementById("total").value;
  xmlrequest();
  let page1 = 1;

  // console.log(totalpages)
  // let totalpages=total1
  // element(totalpages, page1)
  //   request.open(
  //     "GET",
  //     "http://192.168.1.11:8000/user/?page_num=" +
  //       page1 +
  //       "&page_size=" +
  //       z,
  //     true
  //   );
  //   request.send();
}

function selectedo(tf) {
  console.log(tf);

  document.getElementById("pagesize2").value = tf;
  request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      var array1 = JSON.parse(request.response);
      let total = array1.total;
      document.getElementById("searchtotal").value = total;
      let page_size1 = array1.page;
      document.getElementById("page").value = page_size1;
      let page = array1.page_size;
      document.getElementById("pagesi").value = page;
      let array = array1.data;
      let length1 = array1.totaldata;
      document.getElementById("length").value = length1;
      var html_data = "";
      for (var i = 0; i < array.length; i++) {
        html_data +=
          "<tr>" +
          "<td>" +
          array[i][0] +
          "</td>" +
          "<td class='upper'>" +
          array[i][1] +
          "</td>" +
          "<td class='upper'>" +
          array[i][2] +
          "</td>" +
          "<td class='upper'>" +
          array[i][3] +
          "</td>" +
          "<td>" +
          array[i][4] +
          "</td>" +
          "<td class='upper'>" +
          array[i][5] +
          "</td>" +
          "<td><button class='btn btn-primary' id='editi' onclick='run(this)' data-bs-toggle='modal' data-bs-target='#myModal'>Edit</button><button id='deleteu' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' onclick='deleter(this)'>Delete</button></td>" +
          "</tr>";
      }
      // stotal = document.getElementById("searchtotal").value;
      // pagesi = document.getElementById("pagesi").value;
      // let utag =
      totalpages = document.getElementById("searchtotal").value;
      console.log(totalpages);
      pagesi = document.getElementById("pagesi").value;
      page1 = 1;
      let utags = document.getElementById("container");
      let noside = document.getElementById("nside");
      // searchpag = 1;
      // console.log(page2)
      // element(stotal,searchpag);
      if (totalpages > 1) {
        utags.style.display = "flex";
        noside.style.display = "flex";
        // element(stotal,searchpag);
        element(totalpages, page1);
      } else {
        utags.style.display = "none";
        noside.style.display = "none";
      }
      let no = document.getElementById("no");
      no.innerHTML = page1
      let totalpage = document.getElementById("totalpage");
      totalpage.innerHTML = total;
    }
    table.innerHTML = html_data;
  };

  request.open(
    "GET",
    "http://192.168.1.11:8000/user/?page_num=" + page1 + "&page_size=" + tf,
    true
  );
  request.send();
}

// se.style.display="block"

// "<tr>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>No</h6>"+
// "<div>"+
// "<i class='fa fa-angle-up' onclick='ascending(this)'></i>"+
// "<i class='fa fa-angle-down' id='no' onclick='descending(this);'></i>"+
// "</div>"+
// "</div>"+
// "</th>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>Username</h6>"+
// "<div>"+
// "<i class='fa fa-angle-up opacity1' id='user' onclick='ascending(this)'></i>"+
// "<i class='fa fa-angle-down' onclick='descending(this)'></i>"+
// "</div>"+
// "</div>"+
// "</th>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>Email</h6>"+
// "</div>"+
// "</th>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>Address</h6>"+
// "</div>"+
// "</th>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>Age</h6>"+
// "<div>"+
// "<i class='fa fa-angle-up' onclick='ascending(this)'></i>"+
// "<i class='fa fa-angle-down' onclick='descending(this)'></i>"+
// "</div>"+
// "</div>"+
// "</th>"+
// "<th>"+
// "<div class='d-flex'>"+
// "<h6 class='heading'>College Name</h6>"+
// "<div>"+
// "<i class='fa fa-angle-up' onclick='ascending(this)'></i>"+
// "<i class='fa fa-angle-down' onclick='descending(this)'></i>"+
// "</div>"+
// "</div>"+
// "</th>"+
// "<th>Action</th>"+
// "</tr>";
