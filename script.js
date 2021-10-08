let header = () => {
    document.getElementsByTagName('header')[0].innerHTML = 
    `
    <img src="./images/Logo.png" alt="logo-la-padarie">
    `;
}
let cardsPrincipais = () => {
    document.querySelector(".cards-principais").innerHTML = 
    `
    <div class="cards" id="pessoas-fila">
        <article>    
            <p>Pessoas na fila</p>
            <img src="./images/little-people.png" alt="siluete-person-img">
        </article>
        <p id="numero-pessoas-fila"></p>
    </div>
    <div class="cards" id="paes-vendidos">
        <article>    
            <p>Pães vendidos</p>
            <img src="./images/shop-cart.png" alt="shop-cart-img">
        </article>
        <p id="numero-paes-vendidos"></p>
    </div>
    <div class="cards" id="total-entrada">
        <article>    
            <p>Entrada</p>
            <img src="./images/money-s.png" alt="money-symbol-img">
        </article>
        <p id="numero-total-entrada"></p>
    </div>
    `;
}
let precoPao = 0.50;
let listaPessoasAtual = 
[
    {
        id: 0,
        nome: 'Adrius',
        paes: 20
    },
    {
        id: 1,
        nome: 'Darrow',
        paes: 35
    },
    {
        id: 2,
        nome: 'Virginia',
        paes: 15
    },
    {
        id: 3, 
        nome: 'Victra',
        paes: 40
    }
];
let listaPessoasTotal = 
[
    {
        id: 0,
        nome: 'Adrius',
        paes: 20
    },
    {
        id: 1,
        nome: 'Darrow',
        paes: 35
    },
    {
        id: 2,
        nome: 'Virginia',
        paes: 15
    },
    {
        id: 3, 
        nome: 'Victra',
        paes: 40
    }
];
let atualizaCardsPrincipais = () => {
    let totalPagar = 0, totalPaes = 0;
    let totalPessoas = listaPessoasAtual.length;
    listaPessoasTotal.forEach( pessoa => {
        totalPagar += pessoa.paes * precoPao;
        totalPaes += pessoa.paes;
    });
    document.querySelector("#numero-pessoas-fila").innerHTML = totalPessoas;
    document.querySelector("#numero-paes-vendidos").innerHTML = totalPaes;
    totalPagar = totalPagar.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    document.querySelector("#numero-total-entrada").innerHTML = totalPagar;
}

let renderCompradores = () => {
    let cardsCompradores = document.querySelector("#cards-compradores");
    cardsCompradores.innerHTML = 
    `
    <a id="btn-add" onclick="iniciaModal('modal-add-cliente')">+ Adicionar pessoas a fila</a>
    `;
    listaPessoasAtual.forEach( pessoa => {
        let idPessoa = Number(pessoa.id);
        let nomePessoa = String(pessoa.nome);
        let totalPagarPessoa = Number(pessoa.paes * precoPao);
        let totalPaes = Number(pessoa.paes);
        totalPagarPessoa = totalPagarPessoa.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        cardsCompradores.innerHTML += 
        `
        <div class="card-compra">
            <article>
                <h1 class="titles"> ${nomePessoa}</h1>
                <div class="totais">
                    <p>Total de pães:<span class="quantias"> ${totalPaes} pães</span></p>
                    <p>Total a pagar:<span class="quantias"> ${totalPagarPessoa}</span></p>
                </div>
            </article>
            <a id="delete-cliente" onclick="removeComprador(${idPessoa})"><img src="./images/trashcan.svg" alt="trashcan-img"></a>
        </div>
        `
    });
    atualizaCardsPrincipais();
}

let footer = () => {
    let year = new Date().getFullYear()
    document.getElementsByTagName("footer")[0].innerHTML =
    `
    <p>Com 💛 Info Jr UFBA ${year}<br></p>
    <a href="https://github.com/LucasDSL/La-Padarie-website">Meu código para este site</a>
    `
}
let modal = () => {
    document.getElementsByTagName('body')[0].innerHTML += 
    `
    <div id="modal-add-cliente" class="modal-container">
        <div class="modal">
            <h1 class="titles">Adicionar pessoas na fila</h1>
            <form>
                <input id="nomeCliente" type="text" placeholder="Nome completo do cliente">
                <input id="paesCliente" type="number" placeholder="Total de pães:">
            </form>
            <div class="btns-modal">
                <a id="btn-enviar" onclick="addComprador()">Enviar</a>
                <a id="btn-cancelar">Cancelar</a>
            </div>
        </div>
    </div>
    `
}
function renderPage(){
    header();
    cardsPrincipais();
    renderCompradores();
    footer();
    modal();
}

renderPage();

let fechaModal = (modal) => {
    modal.classList.remove("mostrar")
}
let iniciaModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.add("mostrar");
    modal.addEventListener('click', (evento) => {
        if(evento.target.id === 'modal-add-cliente'
        || evento.target.id === 'btn-cancelar'){
            fechaModal(modal);
        };
    })
}

let addComprador = () => {
    let nomePessoa = document.querySelector("#nomeCliente").value;
    let paesPessoa = document.querySelector("#paesCliente").value;
    if(nomePessoa === '' || paesPessoa === ''){
        window.alert("Campos 'Nome completo do cliente' e 'Total de pães' são obrigatórios!");
        return;
    };
    if(paesPessoa <= 0){
        window.alert("Por favor digite um número positivo de pães!");
        return;
    }
    nomePessoa = String(nomePessoa);
    paesPessoa = Number(paesPessoa);
    let tamanhoAtualLista = listaPessoasAtual.length;
    let tamanhoAtualListaTotal = listaPessoasTotal.length
    listaPessoasAtual.push({
        id: tamanhoAtualLista,
        nome: nomePessoa,
        paes: paesPessoa
    });
    listaPessoasTotal.push({
        id: tamanhoAtualListaTotal,
        nome: nomePessoa,
        paes: paesPessoa
    });
    renderCompradores();
    const modal = document.querySelector("#modal-add-cliente");
    document.querySelector("#nomeCliente").value = '';
    document.querySelector("#paesCliente").value = '';
    fechaModal(modal);
}
let removeComprador = (id) => {
    listaPessoasAtual.splice(id, 1);
    listaPessoasAtual.forEach( pessoa => {
        pessoa.id = listaPessoasAtual.indexOf(pessoa);
    });
    renderCompradores();
}