//ADQUIRIR NOME DO USUARIO
function login(){
let usuario = prompt("Qual o seu nome?")
console.log(usuario)
}
login()

//ENCONTRA DIV P/INSERIR MENSAGENS
let feed = document.querySelector(".feed")




function msgEnviada(){
    feed.innerHTML = ` <div class="text-box">
        <div class="horario">(09:21:45) </div>
        <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">para</span> Todos: </div>
        <div class="texto h1">Bom dia, caras!</div>
        </div> `

}
msgEnviada()

