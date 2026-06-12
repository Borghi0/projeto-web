function signIn(e){
    e.preventDefault();

    var name = document.getElementById("name")
    var email = document.getElementById("email")
    var birthDate = document.getElementById("birth-date")
    var pw = document.getElementById("pwd")
    var cpwd = document.getElementById("cpwd")
    
    if(pw.value !== cpwd.value){
        alert("Senhas não correspondem")
    } else{
        localStorage.setItem("name", name.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("birthDate", birthDate.value)
        localStorage.setItem("pw", pw.value)

        alert("Conta criada")
        window.location.href = "login.html"
    }
}

function login(e){
    e.preventDefault();

    var email = document.getElementById("email")
    var pw = document.getElementById("pwd")

    if(pw.value !== localStorage.getItem("pw")
        || email.value !== localStorage.getItem("email")
    ){
        alert("Erro no login!")
    } else{
        window.location.href = "index.html"
    }
}