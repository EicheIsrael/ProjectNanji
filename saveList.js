//Itens do html
let btnAbrirFormCadastro = document.querySelector('#btnAbrirFormCadastro');
let btnFecharFormCadastro = document.querySelector('#btnDelTarefa');
let btnHelpTarefa = document.querySelector('#btnHelpTarefa');
let linkInformacoes = document.querySelector('.rightColumn');
let msgFlag = "";
let hoje = new Date();

let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let inputNovaData = document.querySelector('#inputNovaData');
let inputNovoHorario = document.querySelector('#inputNovoHorario');

let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let divFormCadastro = document.querySelector(".conteudo");
let frameFundo = document.querySelector("#janelaEdicaoFundo");
//let btnEdicaoFechar = document.getElementById("btnEdicaoFechar");
loadData();
campanhaMensal();
//-----------------------
inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13 ) { //tecla pressionada for code 13 (Enter)
        if (validarInputs()){
            let tarefa = {
                id: Math.floor(Math.random() * 9000),
                campoTarefa: inputNovaTarefa.value,
                campoData: inputNovaData.value,
                campoHorario: inputNovoHorario.value
            }
            adicionarTarefa(tarefa);
        }
    }
});

btnAddTarefa.addEventListener('click', (e) => {
    if (validarInputs()){
        let tarefa = {
            id: Math.floor(Math.random() * 1000),
            campoTarefa: inputNovaTarefa.value,
            campoData: inputNovaData.value,
            campoHorario: inputNovoHorario.value
        }
        adicionarTarefa(tarefa);
        divFormCadastro.classList.add('hid');
        fecharCadastroFundo();
    }
});

btnAbrirFormCadastro.addEventListener('click', (e) => {
    let conteudo = document.querySelector('.conteudo');
    let cadastroFundo = document.querySelector('#janelaCadastroFundo');
    conteudo.classList.remove('hid');
    cadastroFundo.style.display = 'block';
    //console.log(conteudo);
});

function fecharCadastroFundo(){
    let cadastroFundo = document.querySelector('#janelaCadastroFundo');
    cadastroFundo.style.display = 'none';
}

btnDelTarefa.addEventListener('click', (e) => {
    let conteudo = document.querySelector('.conteudo');
    conteudo.classList.add('hid');
    inputNovaTarefa.value = "";
    inputNovaData.value = "";
    inputNovoHorario.value = "";
    fecharCadastroFundo();
});

function ajudaAdicionar () {
    exibirNanjiPop(
        `É muito fácil e rápido adicionar um novo lembrete! Veja as informações no comprovante de atendimento que recebeu na UBS Bateas. Em <strong><span>ATENDIMENTO</span></strong>, poderá digitar algo assim: <strong>Médico - Dr. House</strong>; ou assim:<strong> Dentista Dra. Grey</strong>. Logo abaixo, poderá informar a<strong><span> data na esquerda</span></strong> e a <strong><span>hora na direita</span></strong>. Para finalizar, toque no <strong>botão verde para SALVAR</strong> ou no <strong>vermelho para CANCELAR!</strong>`
    );
}

function exibirNanjiPop(msgFlag){
    let divPop = document.querySelector(".divPop");
    let popItens = document.querySelector(".popItens");
    let imgNanji = document.querySelector("#imgNanji");
    let textMsg = document.querySelector("#textMsg");
    let bloqueioFundo = document.querySelector("#janelaNanjiFundo");
    bloqueioFundo.style.display = 'block';
    divPop.style.display = 'block';
    divPop.style.width = '360px';
    imgNanji.style.opacity = '0.3';
    if (!msgFlag){
        let i = Math.floor(Math.random() * 5);
        switch(i){
            case 0:
                textMsg.innerHTML = String("Olá! Sou a <strong>Assistente Nanji.</strong> A propósito,"
                + " NANJI vem de uma expressão japonesa que quer dizer 'Que Horas?', no intuito" 
                + " de ajudar você a não perder o atendimento que marcou quando foi à UBS BATEAS. Não esquece que"
                + " <strong><span> EU NÃO MARCO CONSULTAS.</span></strong> Para um agendamento, por favor, <span>vá até a UBS BATEAS e fale com o atendimento!</span>");
                break;
            case 1:
                textMsg.innerHTML = String(`Oi, Tudo bem? Sou a <strong>Assistente Nanji.</strong> Para ajudar a não perder o atendimento que você agendou na UBS BATEAS, salve lembretes aqui comigo. O ideal é informar <strong> o profissional</strong> que vai te atender, <strong>o dia</strong> que ele marcou e <strong> a hora</strong> da consulta! <span>Ainda não tem agendamento? <strong>Vá até a UBS BATEAS e fale com um dos atendentes.</span></strong>`);
                break;
            case 2:
                textMsg.innerHTML = String(`É sempre bom te ver por aqui!! <strong>Assistente Nanji</strong> a seu dispor! <strong>Foi na UBS BATEAS e marcou uma consulta?</strong> Te ajudo a fazer um lembrete! Exemplo: <strong> Dentista - Dra. Haisha > Data: 25/11/2020 > Hora: 14:00.</strong> Estas 3 informações são o que você precisa para não perder o seu atendimento! <strong><span>Precisa de atendimento mas não tem nada agendado? Por favor, vá até a UBS BATEAS!</span></strong>`);
                break;
            case 3:
                textMsg.innerHTML = `<strong><span>IMPORTANTE:</span></strong> Estou salvando estas informações no aparelho que está usando nesse momento. Estas informações <strong><span>não estão na Internet</span></strong>. Salve este site ou link na <strong>tela inicial do computador ou celular</strong> para acessá-las novamente!`;
                break;
            case 4:
                textMsg.innerHTML = `<strong><span>Dicas:</span></strong> Estarei sempre na tela inicial... Se precisar de detalhes, toque no meu laptop e estarei dando mais informações. Ao abrir a tela <span>ADICIONAR LEMBRETE</span>, o <strong>botão azul de Ajuda dará mais instruções.</strong>`;
                break;
        } 
    }
    else{
        textMsg.innerHTML = String(msgFlag);
    }
    popItens.appendChild(textMsg);
    return divPop;
}

function fecharDivPop(){
    let divPop = document.querySelector(".divPop");
    let imgNanji = document.querySelector("#imgNanji");
    let bloqueioFundo = document.querySelector("#janelaNanjiFundo");
    bloqueioFundo.style.display = 'none';
    divPop.style.display = 'none';
    imgNanji.style.opacity = '1';

}

function adicionarTarefa(tarefa){
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLI(tarefa){
    let tagLi = document.createElement('li');
    let span = document.createElement('span');
    let divButtons = document.createElement('div');
    let divInputs = document.createElement('div');
    let divSpan = document.createElement('div');
    let txtData = document.createElement('input');
    let txtHora = document.createElement('input');
    //let btnAlterar = document.createElement('button');
    let btnAlterar = document.createElement('img');
    let btnExcluir = document.createElement('img');
    console.log('tagLi ID > ', tarefa.id);
    
    span.classList.add('textoTarefas');
    span.innerHTML = tarefa.campoTarefa;
    txtData.value = tarefa.campoData;
    txtHora.value = tarefa.campoHorario;
    txtData.setAttribute('class', 'inputList');
    txtHora.setAttribute('class', 'inputList');
    txtData.setAttribute('id', 'data' + tarefa.id);
    txtHora.setAttribute('id', 'hora' + tarefa.id);
    //console.log("Data Formato: " + txtData.value);
    btnAlterar.classList.add('btnAcao');
    btnAlterar.setAttribute('src', 'images/editIcon.png');
    //btnAlterar.innerHTML = '<i class="fa fa-pencil"></i>';
    //btnAlterar.innerHTML = 'Alt';
    btnAlterar.setAttribute
            ('onclick', `alterar('${tarefa.id}','${tarefa.campoData}','${tarefa.campoHorario}');`);

    btnExcluir.classList.add('btnAcaoD');
    btnExcluir.setAttribute('src', "images/trashed.png");
    //btnExcluir.innerHTML = 'Exc';//<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir(' + tarefa.id + ');');
    txtData.value = formatarData(tarefa.campoData);

    divSpan.setAttribute('class', 'spanList');
    divSpan.appendChild(span);

    divInputs.setAttribute('class', 'divInpList');
    divInputs.appendChild(txtData);
    divInputs.appendChild(txtHora);

    divButtons.setAttribute('class', 'buttonsList');
    divButtons.appendChild(btnAlterar);
    divButtons.appendChild(btnExcluir);

    tagLi.appendChild(divSpan);
    tagLi.appendChild(divInputs);
    tagLi.appendChild(divButtons);
    tagLi.setAttribute('id', tarefa.id);
    
    //insertReg(tarefa);
    sendData(tarefa);
    return tagLi;
}

function alterar(idTarefa, dataTarefa, horaTarefa){
    let idLi = document.getElementById(''+ idTarefa +''); //idTarefa
    //console.log(idLi.);
    if (idLi){
        let labelFrame = document.querySelector("#labelNome");
        let abrirFrame = document.querySelector("#janelaEdicao");
        //let fundo = document.querySelector('#janelaCadastroFundo');
        //let abrirFrameFundo = document.querySelector("#janelaEdicaoFundo");
        
        abrirFrame.style.display = 'block';
        frameFundo.style.display = 'block';
        //fundo.style.display = 'block';
        labelFrame.innerHTML = ('#' + idTarefa);
        inputTxtEdicao.value = idLi.firstChild.textContent;
        inputDataEdicao.value = dataTarefa; //idLi.nextSibling.textContent;
        //inputDataEdicao.value = dataFormatoOriginal(dataTarefa); //idLi.nextSibling.textContent;
        inputHoraEdicao.value = horaTarefa; //idLi.nextSibling.textContent;

        contexto = {
            tarefa: inputTxtEdicao.value,
            data: inputDataEdicao.value,
            hora: inputHoraEdicao.value,
            id: idTarefa
        }
    }
    else{
        alert('Erro ao identificar elemento...');
    }

    //console.log(contexto);
    return contexto;
}

function excluir(idTarefa){
    let confirma = window.confirm('Excluir esse item?');
    if (confirma){
        let idLi = document.getElementById(''+ idTarefa +'');
        if (idLi){
            listaTarefas.removeChild(idLi);
            deleteData(idTarefa);
        }
        else{
            alert('Erro ao identificar elemento...');
        }
    }
}

function editar(){
    let inputEditar = document.querySelector('#inputDataEdicao');
    if (futureDate(inputEditar.value) == 1){
        exibirNanjiPop(`Acho que essa data já passou...`);
        return false;
    }
    if (futureDate(inputEditar.value) == 2){
        exibirNanjiPop(`Se está agendado para hoje eu não preciso registrar, mas sugiro que <span>fique atento ao horário marcado.</span>`);
        return false;
    }
    //else {
        let confirma = window.confirm('Salvar Alterações?');
        if (confirma){
            let idLi = document.getElementById(''+ contexto.id +'');
            if (idLi){
                let auxData = "data" + contexto.id;
                let auxHora = "hora" + contexto.id;
                //let outTxt = document.getElementById('inputTxtEdicao');
                let outData = document.getElementById(auxData);
                let outHora = document.getElementById(auxHora);
                console.log('Antes: Data ' + inputDataEdicao.value);
                console.log('Post: Hora ' + inputHoraEdicao.value);
                
                idLi.firstChild.textContent = inputTxtEdicao.value;
                outData.value = formatarData(inputDataEdicao.value);
                outHora.value = inputHoraEdicao.value;
                
                registro = {
                    id: contexto.id,
                    tarefa: inputTxtEdicao.value,
                    data: outData.value,
                    hora: outHora.value
                }
                console.log('Antes: Data ' + outData.value);
                console.log('Post: Hora ' + outHora.value);
                ocultarModalEdicao();
                updateData(registro);
            }
            else{
                alert('Erro ao identificar registro...');
            }
        }
    //}
}

function exibirModalEdicao(){
    let divEdicao = document.getElementById('janelaEdicao');
    divEdicao.style.display = 'block';
    frameFundo.style.display = 'block';
}

function ocultarModalEdicao(){
    let divEdicao = document.getElementById('janelaEdicao');
    divEdicao.style.display = 'none';
    frameFundo.style.display = 'none';
}

/*
function ocultarCampanha(){
    let lcTxt1 = document.querySelector("#lcTxt1");
    let lcTxt2 = document.querySelector("#lcTxt2");
    let lcImg = document.querySelector("#logoCampanha");
    let rcP = document.querySelector("#rcP");

    lcTxt1.setAttribute("class", "hid");
    lcTxt2.setAttribute("class", "hid");
    lcImg.setAttribute("class", "hid");
    rcP.setAttribute("class", "hid");
}*/

function formatarData(strData){
    let novaData = String(strData);
    let ano = novaData.substring(0, 4);
    let mes = novaData.substring(5, 7);
    let dia = novaData.substring(8, 10);
    
    let dataFormatada = dia + "/" + mes + "/" + ano;
    return dataFormatada;
}

function dataFormatoOriginal(strData){
    let novaData = String(strData);
    let dia = novaData.substring(0, 2);
    let mes = novaData.substring(3, 5);
    let ano = novaData.substring(6, 10);
    
    let dataOriginal = ano + "-" + mes + "-" + dia;
    return dataOriginal;
}

function sendData(idTarefa){
    let dadosNanji = [];
    if(!localStorage.dadosNanji){
        localStorage.setItem("dadosNanji", []);
        exibirNanjiPop(`IMPORTANTE: Gravarei essas informações no aparelho que está usando nesse momento.
            Essas informações <strong>não estão na Internet</strong>. Guarde bem esse link
            que aparece no navegador (Google Chrome, Firefox, Edge, Safari, Opera...) que estás usando para acessá-las
            novamente!`);
    }
    else{
        dadosNanji = JSON.parse(localStorage.getItem("dadosNanji"));
    }

    let id = idTarefa.id; //document.getElementById;
    let tarefa = idTarefa.campoTarefa; //document.getElementById('inputEvento').value;
    //let data = idTarefa.campoData; //new String(document.getElementById('inputData').value);
    let data = formatarData(idTarefa.campoData); //new String(document.getElementById('inputData').value);
    let hora = idTarefa.campoHorario; //new String(document.getElementById('inputHora').value);
 
    registro = {
        id: id,
        tarefa: tarefa.toString(),
        data: data.toString(),
        hora: hora.toString()
    }

    dadosNanji.push(registro);
    localStorage.setItem("dadosNanji", JSON.stringify(dadosNanji));
    exibirNanjiPop("Já anotei tudo!!!");
    
}

function loadData(){
    let flag = false;
    if(!localStorage.dadosNanji){
        exibirNanjiPop(`Separei um espacinho da memória para os seus lembretes aqui no Project Nanji. Caso necessite, <span>posso lhe dar algumas informações</span>, bastando <span>tocar no meu notebook</span> na tela inicial.`);
        localStorage.setItem("dadosNanji", []);
    }
    else{
        dadosNanjiJSON = JSON.parse(localStorage.getItem("dadosNanji"));

        for(i= 0; i<dadosNanjiJSON.length; i++){
            console.log(i + " - " + dadosNanjiJSON[i].id);
            registro = {
                id: dadosNanjiJSON[i].id,
                tarefa: dadosNanjiJSON[i].tarefa,
                data: dadosNanjiJSON[i].data,
                hora: dadosNanjiJSON[i].hora,
            }
            let tagLi = document.createElement('li');
            let span = document.createElement('span');
            let divButtons = document.createElement('div');
            let divInputs = document.createElement('div');
            let divSpan = document.createElement('div');
            let txtData = document.createElement('input');
            let txtHora = document.createElement('input');
            let btnAlterar = document.createElement('img');
            let btnExcluir = document.createElement('img');

            span.classList.add('textoTarefas');
            span.innerHTML = dadosNanjiJSON[i].tarefa;
            txtData.value = dadosNanjiJSON[i].data;
            txtHora.value = dadosNanjiJSON[i].hora;
            txtData.setAttribute('class', 'inputList');
            txtHora.setAttribute('class', 'inputList');
            txtData.setAttribute('id', 'data' + dadosNanjiJSON[i].id);
            txtHora.setAttribute('id', 'hora' + dadosNanjiJSON[i].id);
            //let newDataF = String(txtData.value);
            //txtData.value = formatarData(newDataF);

            btnAlterar.classList.add('btnAcao');
            btnAlterar.setAttribute('src', 'images/editIcon.png');
            //btnAlterar.innerHTML = 'ALT'//'<i class="fa fa-pencil"></i>';
            btnAlterar.setAttribute
            ('onclick', `alterar('${dadosNanjiJSON[i].id}','${String(dataFormatoOriginal(dadosNanjiJSON[i].data))}','${String(dadosNanjiJSON[i].hora)}');`); //String(dadosNanjiJSON[i].data)

            btnExcluir.classList.add('btnAcaoD');
            //btnExcluir.innerHTML = 'EXC'//'<i class="fa fa-trash"></i>';
            btnExcluir.setAttribute('src', 'images/trashed.png');
            btnExcluir.setAttribute('onclick', 'excluir(' + dadosNanjiJSON[i].id + ');');

            divSpan.setAttribute('class', 'spanList');
            divSpan.appendChild(span);

            divInputs.setAttribute('class', 'divInpList');
            //txtData.value = dataFormatoOriginal(dadosNanjiJSON[i].data);
            divInputs.appendChild(txtData);
            divInputs.appendChild(txtHora);

            divButtons.setAttribute('class', 'buttonsList');
            divButtons.appendChild(btnAlterar);
            divButtons.appendChild(btnExcluir);

            tagLi.appendChild(divSpan);
            tagLi.appendChild(divInputs);
            tagLi.appendChild(divButtons);
            tagLi.setAttribute('id', dadosNanjiJSON[i].id);
            
            listaTarefas.appendChild(tagLi);

            flag = informLog(txtData.value);
        };
    }    
    if (flag) {
        exibirNanjiPop(`Oieee! Vi aqui que você tem um <strong>agendamento para hoje!</strong> <span> Verifique que horas será</span>, por gentileza, e vá até a UBS Bateas!`);
    }
}

function deleteData(id){
    let dadosNanjiJSON = JSON.parse(localStorage.getItem('dadosNanji'));
    
    for(i= 0; i<dadosNanjiJSON.length; i++){
        let targetID = dadosNanjiJSON[i].id;
        if(targetID == id){
            dadosNanjiJSON.splice(i, 1);
        }
    }
    localStorage.setItem("dadosNanji", JSON.stringify(dadosNanjiJSON));
    exibirNanjiPop(`Apaguei como você pediu... Se algum imprevisto te impede de ir na data agendada,
        por favor, <strong><span>ligue para 47 3350-9193 e informe a UBS.</span></strong> Essa vaga é valiosa 
        e outras pessoas também estão precisando de atendimento médico. Fazendo isso todos saem ganhando!`);
}

function updateData(registro){
    let dadosNanjiJSON = JSON.parse(localStorage.getItem('dadosNanji'));
    
    for(i= 0; i<dadosNanjiJSON.length; i++){
        let targetID = dadosNanjiJSON[i].id;
        if(targetID == registro.id){
                dadosNanjiJSON[i].data = registro.data;
                dadosNanjiJSON[i].tarefa = registro.tarefa;
                dadosNanjiJSON[i].hora = registro.hora;
        }
    }
    
    localStorage.setItem("dadosNanji", JSON.stringify(dadosNanjiJSON));
    exibirNanjiPop("Certinho, informações atualizadas! Você pode alterar quantas vezes precisar!");
}

function validarInputs(){
    if (inputNovaTarefa.value.length <= 1){
        msgFlag = 'Fica melhor se você informar <strong>qual o atendimento</strong> quer lembrar...';
        exibirNanjiPop(msgFlag);
        inputNovaTarefa.value = '';
        return false;
    }
    if(inputNovaData.value <= 1){
        msgFlag = 'Faltou você informar <strong>a data</strong> da consulta...';
        exibirNanjiPop(msgFlag);
        inputNovaData.value = '';
        return false;
    }
    //} else if(futureDate(inputNovaData.value) < hoje){
    let future = futureDate(inputNovaData.value);

    if(future == 1){
        msgFlag = 'Verifique se a data selecionada é uma <strong>data futura.</strong>';
        exibirNanjiPop(msgFlag);
        inputNovaData.value = '';
        return false;
    }
    if(future == 2) {
        msgFlag = `Se o atendendimento é para hoje mesmo, <span>use o despertador do celular</span>, assim é mais fácil de controlar a hora!`;
        exibirNanjiPop(msgFlag);
        inputNovaData.value = '';
        return false;
    }
    if(inputNovoHorario.value <= 1){
        msgFlag = '<strong>Qual será o horário</strong> de sua consulta?';
        exibirNanjiPop(msgFlag);
        inputNovoHorario.value = '';
        return false;
    }

    return true;
}

//--------  Função de Exibição de Camapanha de Saude - Mês Corrente-----------------

function campanhaMensal (){
    let rightColumn = document.querySelector(".rightColumn");
    let leftColumn = document.querySelector(".leftColumn");
    let linkRC = document.querySelector("#rcP");
    let logo = document.querySelector("#logoCampanha");
    let titleMes = document.querySelector("#titleMes");
    let lcRightT1 = document.querySelector("#lcRightT1");
    let lcRightT2 = document.querySelector("#lcRightT2");
    let mes = new Date().getMonth(); //valor do mês vai de 0 a 11
    //let mes = ...; //valor para mês vai de 0 a 11

    switch (mes) {
        case 0: // janeiro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('janeiro');
            rightColumn.style.background = 'gray';
            leftColumn.classList.add("janeiro");
            logo.setAttribute('src', 'images/logoJaneiroBranco.png');
            titleMes.innerHTML = `JANEIRO`;
            lcRightT1.innerHTML = `CUIDADOS COM`;
            lcRightT2.innerHTML = `A SAÚDE MENTAL`;
            linkRC.innerHTML =
                `Janeiro Branco é o mês da conscientização sobre a Saúde Mental, um alerta para a importância da 
                prevenção de doenças decorrentes do estresse, como ansiedade, depressão e pânico.  
                <a href="https://www.gov.br/inss/pt-br/assuntos/janeiro-branco-mes-de-conscientizacao-pela-saude-mental-e-emocional">
                <strong>Saiba mais!</strong></a>`
                break;
        case 1: // fevereiro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('fevereiro');
            rightColumn.style.background = 'rgb(42, 9, 43)';
            leftColumn.classList.add("fevereiro");
            logo.setAttribute('src', 'images/logoFevereiroRoxoLaranja2.png');
            titleMes.innerHTML = `FEVEREIRO`;
            lcRightT1.innerHTML = `DOAÇÃO DE`;
            lcRightT2.innerHTML = `MEDULA ÓSSEA`;
            linkRC.innerHTML =
                `O campanha tem como objetivo conscientizar a população sobre a leucemia e a
                 importância da doação de medula óssea. A leucemia é uma doença maligna dos 
                 glóbulos brancos, de origem desconhecida.  
                <a href="https://www.saude.sc.gov.br/index.php/noticias-geral/14729-campanha-fevereiro-roxo-e-laranja-conscientizacao-sobre-doencas-cronicas-em-destaque#:~:text=Fevereiro%20Laranja,%2C%20geralmente%2C%20de%20origem%20desconhecida.">
                <strong>Saiba mais!</strong></a>`
                break;
        case 2: // março
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('marco');
            rightColumn.style.background = '#c8a2c8';
            leftColumn.classList.add("marco");
            logo.setAttribute('src', 'images/logoMarcoLilasAmarelo.png');
            titleMes.innerHTML = `MARÇO`;
            lcRightT1.innerHTML = `SAÚDE FEMININA`;
            lcRightT2.innerHTML = `ENDOMETRIOSE`;
            linkRC.innerHTML =
                `Março é marcado por duas importantes campanhas de conscientização sobre 
                a saúde da mulher: Amarelo, focado na endometriose, e Lilás, que 
                aborda uma variedade de questões de saúde feminina.  
                <a href="https://www.gov.br/fundacentro/pt-br/comunicacao/noticias/noticias/2023/marco/marco-amarelo-e-lilas-alerta-sobre-os-cuidados-da-saude-da-mulher">
                <strong>Saiba mais!</strong></a>`
                break;
        case 3: // abril
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('abril');
            rightColumn.style.background = 'lightcyan';
            leftColumn.classList.add("abril");
            logo.setAttribute('src', 'images/logoAbrilVerdeAzul.png');
            titleMes.innerHTML = `AUTISMO`;
            lcRightT1.innerHTML = `SEGURANÇA`;
            lcRightT2.innerHTML = `NO TRABALHO`;
            linkRC.innerHTML =
                `O Abril vem com a união de duas campanhas vitais: 
                o Verde e o Azul. Ambas têm o propósito de nos educar e motivar a promover um 
                ambiente de trabalho mais seguro e uma sociedade mais inclusiva.  
                <a href="https://www.trf5.jus.br/index.php/noticias/leitura-de-noticias?/id=325396#:~:text=Abril%20%C3%A9%20um%20m%C3%AAs%20de,seguran%C3%A7a%20no%20ambiente%20de%20trabalho.">
                <strong>Saiba mais!</strong></a>`
                break;
        case 4: // maio
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('maio');
            rightColumn.style.background = 'yellow';
            leftColumn.classList.add("maio");
            logo.setAttribute('src', 'images/logoMaioAmarelo.png');
            titleMes.innerHTML = `MAIO`;
            lcRightT1.innerHTML = `PAZ NO`;
            lcRightT2.innerHTML = `TRÂNSITO`;
            linkRC.innerHTML =
                `O Maio Amarelo nasce com uma só proposta: chamar a atenção da sociedade para o 
                alto índice de mortes e feridos no trânsito em todo o mundo. 
                <a href="https://bvsms.saude.gov.br/paz-no-transito-comeca-por-voce-campanha-maio-amarelo/">
                <strong>Saiba mais!</strong></a>`
                break;
        case 5: // junho
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('junho');
            rightColumn.style.background = '#fa8232b9';

            leftColumn.classList.add('junho');
            logo.setAttribute('src', 'images/logoJunhoLaranja2.png');
            titleMes.innerHTML = `JUNHO`;
            lcRightT1.innerHTML = `ANEMIA`;
            lcRightT2.innerHTML = `LEUCEMIA`;
            linkRC.innerHTML =
                `A campanha do mês de junho dirige-se à informação e prevenção 
                sobre a saúde do sangue com destaque a duas das condições
                mais frequentes relacionadas ao sistema sanguíneo: a anemia e a leucemia. 
                <a href="https://www.programafazbem.com.br/blog/post/relacao-entre-anemia-e-leucemia-uma-pode-causar-a-outra">
                <strong>Saiba mais!</strong></a>`
                break;
        case 6: // julho
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('julho');
            rightColumn.style.background = 'forestgreen';

            leftColumn.classList.add('julho');
            logo.setAttribute('src', 'images/logoJulhoAmareloVerde.png');
            titleMes.innerHTML = `JULHO`;
            lcRightT1.innerHTML = `HEPATITES`;
            lcRightT2.innerHTML = `CÂNCER CABEÇA e PESCOÇO`;
            linkRC.innerHTML =
                `A campanha Julho Verde e Amarelo tem como objetivo promover atividades de conscientização e informação para prevenir 
                o Câncer de Cabeça e Pescoço e as Hepatites Virais.. 
                <a href="https://www.camaranovooriente.ce.gov.br/informa/51#:~:text=A%20campanha%20Julho%20Verde%20e,Virais%20em%2028%20de%20julho.">
                <strong>Saiba mais!</strong></a>`
                break;
        case 7: // agosto
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('agosto');
            rightColumn.style.background = 'lightyellow';

            leftColumn.classList.add('agosto');
            logo.setAttribute('src', 'images/logoJulhoAmareloVerde.png');
            titleMes.innerHTML = `AGOSTO`;
            lcRightT1.innerHTML = `ALEITAMENTO`;
            lcRightT2.innerHTML = `MATERNO`;
            linkRC.innerHTML =
                `Em celebração ao Agosto Dourado, a campanha do mês traz a conscientização sobre a importância da amamentação e aleitamento materno. 
                <a href="https://www.gov.br/ans/pt-br/assuntos/noticias/beneficiario/agosto-dourado-campanha-incentiva-o-aleitamento-materno#:~:text=Em%20celebra%C3%A7%C3%A3o%20ao%20Agosto%20Dourado,das%20Na%C3%A7%C3%B5es%20Unidas%20(ONU).">
                <strong>Saiba mais!</strong></a>`
                break;
        case 8: // setembro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('setembro');
            rightColumn.style.background = 'rgb(41,41,41)';

            leftColumn.classList.add('setembro');
            logo.setAttribute('src', 'images/logoSetembroAmareloVerdeVermelho.png');
            titleMes.innerHTML = `SUICÍDIO`;
            lcRightT1.innerHTML = `CORAÇÃO`;
            lcRightT2.innerHTML = `INCLUSÃO SOCIAL`;
            linkRC.innerHTML =
                `Temos múltiplos temas (três cores) que identificam a campanha de setembro:
                Prevenção ao Suicídio, Inclusão Social de Pessoas com Deficiência e Tratamento de Doenças do Coração. 
                <a href="https://ipmu.com.br/site/campanha-das-cores-setembro-amarelo-verde-e-vermelho/">
                <strong>Saiba mais!</strong></a>`
                break;
        case 9: // outubro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('outubro');
            rightColumn.style.background = 'lightpink';

            leftColumn.classList.add('outubro');
            logo.setAttribute('src', 'images/logoOutubroRosa.png');
            titleMes.innerHTML = `OUTUBRO`;
            lcRightT1.innerHTML = `CÂNCER DE MAMA`;
            lcRightT2.innerHTML = `E COLO DO ÚTERO`;
            linkRC.innerHTML =
                `O mês de outubro traz duas importantes campanhas da Atenção Básica voltadas, principalmente, para a saúde da mulher.
                 No Outubro Rosa é a vez da Prevenção do Câncer de Mama e do Colo do Útero.
                <a href="https://bvsms.saude.gov.br/outubro-rosa-mes-de-conscientizacao-sobre-o-cancer-de-mama-2/">
                <strong>Saiba mais!</strong></a>`
                break;
        case 10: // novembro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('novembro');
            rightColumn.style.background = 'azure';

            leftColumn.classList.add('novembro');
            logo.setAttribute('src', 'images/logoNovembroAzul.png');
            titleMes.innerHTML = `NOVEMBRO`;
            lcRightT1.innerHTML = `CÂNCER DE`;
            lcRightT2.innerHTML = `PRÓSTATA`;
            linkRC.innerHTML =
                `O Novembro Azul é dedicado à conscientização e prevenção do câncer de próstata, que é 
                o segundo tipo de câncer mais comum entre os homens (atrás apenas do câncer de pele não melanoma).
                <a href="https://www10.trf2.jus.br/portal/novembro-azul-mes-de-conscientizacao-sobre-saude-do-homem/#:~:text=A%20campanha%20Novembro%20Azul%20%C3%A9,chegou%20ao%20Brasil%20em%202008.">
                <strong>Saiba mais!</strong></a>`
                break;
        case 11: // dezembro
            rightColumn.setAttribute('class', 'rightColumn');
            rightColumn.classList.add('dezembro');
            rightColumn.style.background = 'firebrick';

            leftColumn.classList.add('dezembro');
            logo.setAttribute('src', 'images/logoDezembroVermelhoLaranja.png');
            titleMes.innerHTML = `DEZEMBRO`;
            lcRightT1.innerHTML = `AIDS`;
            lcRightT2.innerHTML = `/ ISTs`;
            linkRC.innerHTML =
                `A campanha do Dezembro Vermelho e Laranja tem o intuito de alertar e conscientizar sobre formas de contágio 
                e tratamento da AIDS e de outras Infecções Sexualmente Transmissíveis (ISTs).
                <a href="https://www.tre-se.jus.br/comunicacao/noticias/2023/Dezembro/dezembro-vermelho-e-laranja-conscientizacao-sobre-a-aids-e-o-cancer-de-pele#:~:text=A%20campanha%20do%20dezembro%20vermelho,doen%C3%A7a%20e%20de%20seu%20portador.">
                <strong>Saiba mais!</strong></a>`
                break;
        default:
            break;
    }
}

function futureDate(agendado) {
    let marcando = new Date(agendado);
    let diaAtual = hoje.getDate();
    let mesAtual = hoje.getMonth();
    let anoAtual = hoje.getFullYear();
    let diaMarcado = marcando.getDate();
    let mesMarcado = marcando.getMonth();
    let anoMarcado = marcando.getFullYear();

    if (anoMarcado < anoAtual) {
        console.log("Somente dia marcado: " + marcando.getDate() + " | Somente dia agendado: " + hoje.getDate());
        console.log("Agendando data passada.");
        return 1;
    }
    if (mesMarcado < mesAtual) {
        return 1;
    }

    if (diaMarcado + 1 < diaAtual) {
        console.log("Data futura e diferente de hoje.");
        return 1;
    }

    if ((diaMarcado + 1 == diaAtual) && (mesMarcado == mesAtual) && (anoMarcado == anoAtual)) {
        return 2;
    }
}

function informLog(agendado) {
    let marcado = new Date(dataFormatoOriginal(agendado));
    let diaAtual = hoje.getDate();
    let mesAtual = hoje.getMonth();
    let anoAtual = hoje.getFullYear();
    let diaMarcado = marcado.getDate();
    let mesMarcado = marcado.getMonth();
    let anoMarcado = marcado.getFullYear();

    if ((diaMarcado + 1 == diaAtual) && (mesMarcado == mesAtual) && (anoMarcado == anoAtual)) {
        return true;
    }
}
