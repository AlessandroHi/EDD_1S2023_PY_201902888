

function login(){
    var user, pass;

    user  = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    if(user == "admin" && pass == "admin"){
      window.location = "admin.html"
    }

}