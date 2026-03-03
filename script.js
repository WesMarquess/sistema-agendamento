const formulario = document.getElementById("form");
const inputNome = document.getElementById("input-nome");
const inputTelefone = document.getElementById("input-telefone");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-senha");


function limpar() {
    inputNome.value = "";
    inputTelefone.value = "";
    inputEmail.value = "";
    inputSenha.value = "";
}

function cadastrar() {
    fetch("http://localhost:8080/cadastrar",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: inputNome.value,
                telefone: inputTelefone.value,
                email: inputEmail.value,
                senha: inputSenha.value
            })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
};


formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar();

});