const unchecked = document.querySelectorAll('.unchecked');
const atividades_containers = document.querySelectorAll('.atividade_em_dia_container');


unchecked.forEach((uncheck)=> {
    uncheck.addEventListener('click', () => CheckNRemove(uncheck));
});

function CheckNRemove(uncheck){
    uncheck.style.backgroundImage = "url('../todolist/assets/check.png')";
    setTimeout( () => uncheck.parentNode.remove(),200)
   
}

