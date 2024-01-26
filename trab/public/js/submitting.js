const textos_atividade = document.querySelectorAll(".activity_text");

textos_atividade.forEach((activyText) => {
    activyText.addEventListener("click", () =>{
        window.location.href = 'edicao.html';
    });
});