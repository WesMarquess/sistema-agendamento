// ELEMENTOS
const formulario = document.getElementById("form");

const inputNome = document.getElementById("input-nome");
const inputTelefone = document.getElementById("input-telefone");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-senha");

const campoNome = document.getElementById("campo-nome");
const campoTelefone = document.getElementById("campo-telefone");

const toggle = document.getElementById("toggle-mode");
const textoToggle = document.getElementById("texto-toggle");
const titulo = document.getElementById("titulo-form");
const botao = document.getElementById("botao-submit");

let modoLogin = true;

toggle.addEventListener("click", () => {
    modoLogin = !modoLogin;

    if (modoLogin) {
        titulo.textContent = "Fazer Login";
        botao.textContent = "Entrar";
        textoToggle.textContent = "Não tem conta?";
        toggle.textContent = "Criar conta";

        campoNome.style.display = "none";
        campoTelefone.style.display = "none";

    } else {
        titulo.textContent = "Criar Conta";
        botao.textContent = "Cadastrar";
        textoToggle.textContent = "Já tem conta?";
        toggle.textContent = "Fazer login";

        campoNome.style.display = "block";
        campoTelefone.style.display = "block";
    }
});

function limpar() {
    inputNome.value = "";
    inputTelefone.value = "";
    inputEmail.value = "";
    inputSenha.value = "";
}

async function cadastrar() {
    try {
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: inputNome.value,
                telefone: inputTelefone.value,
                email: inputEmail.value,
                senha: inputSenha.value
            })
        });

        if (!response.ok) throw new Error();

        const data = await response.json();

        localStorage.setItem("usuario", JSON.stringify(data));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "agendamento.html";

    } catch {
        alert("Erro ao cadastrar");
    }
}

async function login() {
    try {
        const response = await fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: inputEmail.value.trim().toLowerCase(),
                senha: inputSenha.value
            })
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro);
        }

        const usuario = await response.json();

        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Login realizado!");
        window.location.href = "agendamento.html";

    } catch (error) {
        console.log(error.message);
        alert("Email ou senha inválidos");
    }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (modoLogin) {
        login();
    } else {
        cadastrar();
    }
});