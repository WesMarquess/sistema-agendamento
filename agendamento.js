if (!usuario) {
    alert("Você precisa estar logado para acessar o agendamento.");
    window.location.href = "login.html";
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

document.addEventListener("DOMContentLoaded", () => {

    const inputData = document.getElementById("data");
    const selectServico = document.getElementById("servico");
    const inputValor = document.getElementById("valor");
    const selectProfissional = document.getElementById("profissional");
    const selectHorario = document.getElementById("hora");
    const form = document.getElementById("form-agendamento");

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');

    const hojeFormatado = `${yyyy}-${mm}-${dd}`;
    inputData.setAttribute("min", hojeFormatado);

    const params = new URLSearchParams(window.location.search);
    const servicoParam = params.get("servico");
    const valorParam = params.get("valor");

    if (servicoParam && valorParam) {
        selectServico.value = servicoParam;
        inputValor.value = `R$ ${valorParam}`;
    }

    function atualizarValorServico() {
        const selectedOption = selectServico.options[selectServico.selectedIndex];
        const valor = selectedOption?.getAttribute("data-valor");

        if (valor) {
            inputValor.value = `R$ ${valor}`;
        } else {
            inputValor.value = "";
        }
    }

    selectServico.addEventListener("change", atualizarValorServico);

    async function carregarProfissionais() {
        try {
            const response = await fetch("http://localhost:8080/profissionais");
            const lista = await response.json();

            selectProfissional.innerHTML = `<option value="">Selecione</option>`;

            lista.forEach(p => {
                const option = document.createElement("option");
                option.value = p.id;
                option.textContent = p.nome;
                selectProfissional.appendChild(option);
            });

        } catch (err) {
            console.error("Erro ao carregar profissionais:", err);
        }
    }

    carregarProfissionais();

    async function carregarHorariosDisponiveis() {
        const profissionalId = selectProfissional.value;
        const data = inputData.value;

        if (!profissionalId || !data) return;

        try {
            const response = await fetch(
                `http://localhost:8080/agendamentos/horarios?profissionalId=${profissionalId}&data=${data}`
            );

            const dados = await response.json();

            if (!Array.isArray(dados)) {
                throw new Error("Resposta inválida do servidor");
            }

            selectHorario.innerHTML = `<option value="">Selecione o horário</option>`;

            dados.forEach(h => {
                const option = document.createElement("option");
                option.value = h;
                option.textContent = h;
                selectHorario.appendChild(option);
            });

        } catch (err) {
            console.error("Erro ao carregar horários:", err);
            alert("Erro ao carregar horários disponíveis.");
        }
    }

    selectProfissional.addEventListener("change", carregarHorariosDisponiveis);
    inputData.addEventListener("change", carregarHorariosDisponiveis);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dataSelecionadaStr = inputData.value;
        const horaSelecionada = selectHorario.value;

        if (!dataSelecionadaStr || !horaSelecionada) {
            alert("Preencha data e horário.");
            return;
        }

        const agora = new Date();

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);


        let dataSelecionada;
        if (dataSelecionadaStr.includes("/")) {

            const [dia, mes, ano] = dataSelecionadaStr.split("/");
            dataSelecionada = new Date(ano, mes - 1, dia);
        } else {

            const [ano, mes, dia] = dataSelecionadaStr.split("-");
            dataSelecionada = new Date(ano, mes - 1, dia);
        }
        dataSelecionada.setHours(0, 0, 0, 0);

        if (dataSelecionada < hoje) {
            alert("Não é permitido agendar em datas passadas.");
            return;
        }

        if (dataSelecionada.getTime() === hoje.getTime()) {
            const [hora, minuto] = horaSelecionada.split(":");

            const dataHoraSelecionada = new Date();
            dataHoraSelecionada.setHours(parseInt(hora), parseInt(minuto), 0, 0);

            if (dataHoraSelecionada < agora) {
                alert("Não é permitido agendar horários passados para hoje.");
                return;
            }
        }

        const agendamento = {
            profissional: {
                id: selectProfissional.value
            },
            data: dataSelecionadaStr,
            hora: horaSelecionada,
            servico: selectServico.value,
            valor: inputValor.value,
            usuario: {
                id: usuario.id
            }
        };

        try {
            const response = await fetch("http://localhost:8080/agendamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agendamento)
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(erro);
            }

            alert("Agendamento realizado com sucesso!");

            form.reset();
            selectHorario.innerHTML = `<option value="">Selecione o horário</option>`;
            inputValor.value = "";

        } catch (error) {
            alert(error.message);
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.role === "profissional") {
        fetch(`http://localhost:8080/profissionais/meus-agendamentos?usuarioId=${usuario.id}`)
            .then(res => res.json())
            .then(data => {
                mostrarAgendamentos(data);
            })
            .catch(err => console.error("Erro ao carregar agendamentos:", err));
    }
});