function getTarefas() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    if (!input.value) return;

    const tarefas = getTarefas();
    tarefas.push({ texto: input.value, feita: false });
    salvarTarefas(tarefas);
    input.value = "";
    renderizarTarefas();
}

function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    if (!lista) return;

    lista.innerHTML = "";
    const tarefas = getTarefas();

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${tarefa.feita ? "checked" : ""} 
            onclick="concluirTarefa(${index})">
            ${tarefa.texto}
            ${localStorage.getItem("admin_logado") === "true" 
                ? `<button onclick="removerTarefa(${index})">X</button>` 
                : ""}
        `;
        lista.appendChild(li);
    });
}

function concluirTarefa(index) {
    const tarefas = getTarefas();
    tarefas[index].feita = !tarefas[index].feita;
    salvarTarefas(tarefas);
    renderizarTarefas();
}

function removerTarefa(index) {
    const tarefas = getTarefas();
    tarefas.splice(index, 1);
    salvarTarefas(tarefas);
    renderizarTarefas();
}

function limparTarefas() {
    if (confirm("Tem certeza?")) {
        localStorage.removeItem("tarefas");
        renderizarTarefas();
    }
}

function irUsuario() {
    window.location.href = "user.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

renderizarTarefas();
