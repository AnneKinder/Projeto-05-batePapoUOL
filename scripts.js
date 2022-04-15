let usuario; //GLOBAL
let texto; //GLOBAL
let mensagens = document.querySelector(".mensagens")  //GLOBAL //ENCONTRA DIV P/INSERIR MENSAGENS

//ADQUIRIR NOME DO USUARIO
function login(){
usuario = prompt("Qual o seu nome?")
console.log(usuario)
mensagens.innerHTML += ` <div class="text-box">
    <div class="horario">(09:21:45) </div>
    <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">entrou na sala</span>
    </div> `
}
login()

//CRIA VARIAVEL TEXTO (COM O VALUE DO INPUT)
function send(){
    texto = document.querySelector("input").value
    console.log(texto)
    msgEnviada()
    document.querySelector("input").value = ""

    }
    send()
    
    




//INSERIR MSG NO FEED
function msgEnviada(){
     mensagens.innerHTML += ` <div class="text-box">
    <div class="horario">(09:21:45) </div>
    <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">para</span> Todos: </div>
    <div class="texto h1"> ${texto}</div>
    </div> `
}



//ENCONTRA DIV P/INSERIR INPUT
  //GLOBAL


//INSERIR INPUT NO FEED
//function inputar(){
 //   let digitarTexto = document.querySelector("input").value 
  //  console.log(digitarTexto)
    

inputar()



