const btnLogout = document.getElementById("logout");

if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });
}

const formulario = document.getElementById("form");

const inputNome = document.getElementById("input-nome");
const inputTelefone = document.getElementById("input-telefone");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-senha");

function limpar() {
    if (inputNome) inputNome.value = "";
    if (inputTelefone) inputTelefone.value = "";
    if (inputEmail) inputEmail.value = "";
    if (inputSenha) inputSenha.value = "";
}

async function cadastrar() {
    try {
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: inputNome.value,
                telefone: inputTelefone.value,
                email: inputEmail.value,
                senha: inputSenha.value
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar");
        }

        const data = await response.json();

        localStorage.setItem("usuario", JSON.stringify(data));

        alert("Cadastro realizado com sucesso!");
        limpar();

        window.location.href = "agendamento.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar usuário");
    }
}

async function login() {
    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: inputEmail.value,
                senha: inputSenha.value
            })
        });

        if (!response.ok) {
            throw new Error("Login inválido");
        }

        const usuario = await response.json();

        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Login realizado com sucesso!");

        window.location.href = "agendamento.html";

    } catch (error) {
        console.error(error);
        alert("Email ou senha incorretos!");
    }
}

if (formulario) {
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const isLoginPage = window.location.pathname.includes("login");

        if (isLoginPage) {
            login();
        } else {
            cadastrar();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const menuLogin = document.getElementById("menu-login");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        menuLogin.innerHTML = `
            <span>Olá, ${usuario.nome}</span>
            <button class="btn-logout">Sair</button>
        `;

        const btnLogout = menuLogin.querySelector(".btn-logout");
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }
});