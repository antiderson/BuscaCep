'use strict';

const span = document.getElementById("ucep")
const cep = document.getElementById("cep")

function mostrarErro() {
    span.style.color = "red"
    span.innerText = "Cep não encontrado"
}
function mudarBorda(cor) {
    cep.style.borderColor = cor
}
function funcaoLimparSpan(){
    span.innerText = " "
}

$(document).ready(function () {
    $("#cep").mask("00000-000");
});

const preencherFormulario = ({ logradouro, bairro, localidade, ibge, ddd, uf }) => {

    //Preenche os campos
    document.getElementById("bairro").value = bairro;   
    document.getElementById("rua").value = logradouro;   
    document.getElementById("cidade").value = localidade;  
    document.getElementById("ibge").value = ibge;  
    document.getElementById("UF").value = uf;  
    document.getElementById("ddd").value = ddd;
}

const pesquisarCep = async () => {

    const cep = document.getElementById("cep").value  // Pegar o CEP digitado

    const url = `https://viacep.com.br/ws/${cep}/json/`;  
    const response = await fetch(url);  
    const dados = await response.json();  


    if (dados.hasOwnProperty('erro')) {
        mostrarErro()
        mudarBorda('red')
    } else {
        preencherFormulario(dados);  // Função que irá preencher os campos
        mudarBorda('green')

    }
}

cep
    .addEventListener("focusout", pesquisarCep); // Evento que quando sair do campo ele automaticamente chamará a função sem a necessidade de um botão

cep.addEventListener("focus", funcaoLimparSpan)

