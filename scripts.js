//GLOBAIS
let usuario; 
let texto; 
let mensagens = document.querySelector(".mensagens");
let destinatario;
let privOUnao;


//FUNCTION CALL
login()
setInterval(getMsg, 3000)
getMsg()
enviarNomes()


//ADQUIRIR NOME DO USUARIO
function login(){
usuario = prompt("Qual o seu nome?")
console.log(usuario)
}


//CRIAR VARIAVEL TEXTO (COM O VALUE DO INPUT)
function send(){
    texto = document.querySelector("input").value
    console.log(texto)
    document.querySelector("input").value = ""
    postMsg();
    }

//ENVIAR COM ENTER
document.addEventListener(
  "keypress",
  function (e) {
    if (e.which == 13) {
      send();
    }
  },
  false
);

    
//ENVIAR MSG PRO SERVIDOR
function postMsg(){
    const mensagemDoInput = {
        from: usuario,
        to: "Todos",
        text: texto,
        type: "message"
    }

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemDoInput)

         promise.then(quandoSucesso);
         promise.catch(quandoErro);

             function quandoSucesso(){
                console.log("foi pro servidor?")
                }

            function quandoErro(){
                   console.log("deu ruim!")
                }
}
  

//ABRIR ABA LATERAL
function abaLateral(){
    document.querySelector(".lateral").classList.remove("hidden")
    document.querySelector(".fade").classList.remove("hidden")

}

//FECHAR ABA LATERAL
function fechaAba(){ 
    document.querySelector(".lateral").classList.add("hidden")
    document.querySelector(".fade").classList.add("hidden")

}

//ESCOLHER DESTINATARIO (BÔNUS/INCOMPLETO)
function selecUser(elemento){
    destinatario = elemento.innerHTML
    console.log(destinatario)
    fechaAba() 

}

//ESCOLHE VISIBILIDADE(BÔNUS/INCOMPLETO)
function selecVisib(elemento){
    privOUnao = elemento.innerHTML;
    console.log(privOUnao);
    fechaAba() 

}


//ENVIAR NOME DO USER PRO SERVIDOR
function enviarNomes(){                   
    const nome = {
    name: usuario
    };
    
        let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome);
    
         promise.then(quandoSucesso);
         promise.catch(quandoErro);
    
    
            function quandoSucesso(response){           
                console.log(response)
            }
            function quandoErro(error){                
                console.log(error.response)
                login();
                enviarNomes()
            }
    
        setInterval(estaOnline, 5000);
}



//ENVIAR STATUS PRO SERVIDOR
function estaOnline(){              
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
                window.location.reload()
            } 
}       


//RECEBER MENSAGENS DO SERVIDOR
function getMsg(){
        let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

             promise.then(quandoSucesso);
             promise.catch(quandoErro);


        function quandoSucesso(response){           
            let dados = response.data
                       
            mensagens.innerHTML = "";
             for (let i=0; i<dados.length; i++){

                const user = dados[i].from
                const to = dados[i].to;
                const text = dados[i].text;
                const type = dados[i].type;
                const time = dados[i].time;


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

            let last = mensagens.lastElementChild;
            last.scrollIntoView() 
        }

        function quandoErro(error){                
            console.log(error.response)
            getMsg()
         } 

     }
