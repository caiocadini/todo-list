/* Drag and Drop Functionalities*/
const todos = document.querySelectorAll(".atividade_em_dia_container");
const vencidos = document.querySelectorAll(".atividade_atrasada_container");
const listas = document.querySelectorAll(".atividades");
let draggableTodo = null;

todos.forEach((atividade_em_dia_container) =>{
    atividade_em_dia_container.addEventListener("dragstart", dragStart);
    atividade_em_dia_container.addEventListener("dragend", dragEnd);
});

vencidos.forEach((atividade_atrasada_container) => {
    atividade_atrasada_container.addEventListener("dragstart", dragStart);
    atividade_atrasada_container.addEventListener("dragend", dragEnd);
})

function dragStart(){
    draggableTodo = this;
    console.log("dragstart");
}

function dragEnd(){
    console.log("dragend")
}

listas.forEach((lista_atividade) => {
    lista_atividade.addEventListener("dragover", dragOver);
    lista_atividade.addEventListener("dragenter", dragEnter);
    lista_atividade.addEventListener("dragleave", dragLeave);
    lista_atividade.addEventListener("drop", dragDrop);
});

function dragOver(e){
    e.preventDefault();
    console.log("dragover");
}

function dragEnter(){
    console.log("dragenter");
}

function dragLeave(){
    console.log("dragleave");
}

function dragDrop(){
    this.appendChild(draggableTodo);
    console.log("dropped");
}