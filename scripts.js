let usuario; //GLOBAL
let texto; //GLOBAL
let mensagens = document.querySelector(".mensagens") //ENCONTRA DIV P/INSERIR MENSAGENS
let destinatario;
let privOUnao;



//ADQUIRIR NOME DO USUARIO
function login(){
usuario = prompt("Qual o seu nome?")
console.log(usuario)
mensagens.innerHTML += ` <div class="text-box entrasai">
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
    
  

//INSERIR MSG NO FEED
function msgEnviada(){
    
    if (destinatario== undefined ){  
        mensagens.innerHTML += ` <div class="text-box public">
       <div class="horario">(09:21:45) </div>
       <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">para</span> Todos: </div>
       <div class="texto h1"> ${texto}</div>
       </div> `
}


    else if (privOUnao== "Reservadamente"){
             mensagens.innerHTML += ` <div class="text-box rosinha">
            <div class="horario">(09:21:45) </div>
            <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">para</span> ${destinatario}: </div>
            <div class="texto h1"> ${texto}</div>
            </div> `
    }

    else if (privOUnao== "Público" || privOUnao== undefined ){  
            mensagens.innerHTML += ` <div class="text-box public">
            <div class="horario">(09:21:45) </div>
            <div class="user-acao-destinatario bold"> ${usuario} <span class="h1">para</span> ${destinatario}: </div>
            <div class="texto h1"> ${texto}</div>
            </div> `
    }

    scrollIntoView();
}

//ABRE ABA LATERAL
function abaLateral(){
    document.querySelector(".lateral").classList.remove("hidden")
    document.querySelector(".fade").classList.remove("hidden")
}

//SÓ SABE FECHAR ABA LATERAL
function fechaAba(){ 
    document.querySelector(".lateral").classList.add("hidden")
    document.querySelector(".fade").classList.add("hidden")
}

//ESCOLHE DESTINATARIO
function selecUser(elemento){
    destinatario = elemento.innerHTML
    console.log(destinatario)
    fechaAba() 

}

//ESCOLHE VISIBILIDADE
function selecVisib(elemento){
    privOUnao = elemento.innerHTML;
    console.log(privOUnao);
    fechaAba() 
 
   
}

function enviarNomes(){
    const mandaAi = {
        name: "KARLA TIAMUUUU"
      };
    
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', mandaAi);
    
    promise.then(quandoSucesso);
    }
    enviarNomes()
    
    function quandoSucesso(){
        alert ("taaa")
    }

// MUDAR HORARIO:
    //let today = new Date();
    //let time = today.getHours() + ":" + today.getMinutes() /+ ":" + today.getSeconds();