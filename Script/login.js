// Função para verificar se é o primeiro acesso do dia
function primeiroAcessoDoDia() {
    var hoje = new Date();
    var data = hoje.toDateString();
    var ultimoAcesso = localStorage.getItem('ultimoAcesso');

    if (ultimoAcesso === null || ultimoAcesso !== data) {
        localStorage.setItem('ultimoAcesso', data);
        return true;
    } else {
        return false;
    }
}

// Função para exibir o modal de login
function exibirModalLogin() {
    $('#loginModal').modal('show');
}

// Função para verificar e exibir o modal de login se for o primeiro acesso do dia
function verificarPrimeiroAcessoEExibirModalLogin() {
    if (primeiroAcessoDoDia()) {
        exibirModalLogin();
    }
}

// Função para verificar as credenciais de login
function verificarCredenciais() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Lógica de autenticação
    if ((username === "adm123" && password === "mundial123") || (username === "vendedor123" && password === "mundial123")) {
        alert("Login bem-sucedido!");
        window.location.href = "index.html"; // Redireciona para a página index após o login bem-sucedido
    } else {
        alert("Nome de usuário ou senha incorretos. Por favor, tente novamente.");
    }
}

// Evento de carregamento da página
window.onload = function() {
    verificarPrimeiroAcessoEExibirModalLogin();
};