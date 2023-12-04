
function passwordToggle(){
    var x = document.getElementById("password")
    if (x.type === "password"){
        x.type = "text";
    }else{
        x.type = "password";
    }
}

const button = document.querySelector(".button")

button.addEventListener("click", ()=>{
    window.location.href = "../Todolist/todolist.html"
})