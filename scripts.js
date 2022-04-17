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


//API <-

function enviarNomes(){                   //ENVIANDO NOME DO USER PRO API

    const nome = {
    name: usuario
    };
    
        let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome);
    
         promise.then(quandoSucesso);
         promise.catch(quandoErro);
    
    

    function quandoSucesso(response){           // USER OK
        console.log(response)
    }
    function quandoErro(error){                //JÁ TEM USER COM ESSE NOME
        console.log(error.response)
        login();
        enviarNomes()
    }
    setInterval(estaOnline, 5000);
}
    enviarNomes()



function estaOnline(){              //ENVIANDO STATUS PRO API

    const nome = {
        name: usuario
        };

             let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome )

             promise.then(quandoSucesso);
             promise.catch(quandoErro);

        function quandoSucesso(response){           // USER ON
            console.log(response)
        }

        function quandoErro(error){                //OFF
            console.log(error.response)
            estaOnline()
   } 

}       



function getMsg(){

            let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

             promise.then(quandoSucesso);
             promise.catch(quandoErro);


        function quandoSucesso(response){           // MSG VEM
            let dados = response.data
            console.log(dados)
            console.log(dados[0].type)

            const user = dados[0].from
            const to = dados[0].to;
            const text = dados[0].text;
            const type = dados[0].type;
            const time = dados[0].time;

        

            if (type=="message"){
                mensagens.innerHTML += ` <div class="text-box public">
                <div class="horario">${time} </div>
                <div class="user-acao-destinatario bold"> ${user} <span class="h1">para</span> ${to}: </div>
                <div class="texto h1"> ${text}</div>
                </div> `
            }

            if (type=="private_message"){
                mensagens.innerHTML += ` <div class="text-box rosinha">
                <div class="horario">${time} </div>
                <div class="user-acao-destinatario bold"> ${user} <span class="h1">para</span> ${to}: </div>
                <div class="texto h1"> ${text}</div>
                </div> `

            }

            if (type=="status" && text== "entra na sala..."){
                mensagens.innerHTML += ` <div class="text-box entrasai">
                <div class="horario">${time} </div>
                <div class="user-acao-destinatario bold"> ${user} <span class="h1">entrou na sala...</span>
                </div> `
            }

            if (type=="status" && text== "sai da sala..."){
                mensagens.innerHTML += ` <div class="text-box entrasai">
                <div class="horario">${time} </div>
                <div class="user-acao-destinatario bold"> ${user} <span class="h1">saiu da sala...</span>
                </div> `

            }      

        }
        

        function quandoErro(error){                //ERROR
            console.log(error.response)
            getMsg()
         } 

     }


getMsg()

{


}