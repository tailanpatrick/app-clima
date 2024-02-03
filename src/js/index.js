const chaveDaApi = "cd31863ae267407cb01212131232011";
const botaoDeBusca = document.querySelector(".btn-busca");
const inputCidade = document.getElementById("input-busca");
const isMobile = isMobileDevice();

botaoDeBusca.addEventListener("click", async () => {
    capturarDados();
});

inputCidade.addEventListener("keypress", async (event) => {

    event.key == 'Enter' ? capturarDados() : null;

    isMobile ? inputCidade.blur() : inputCidade.focus();
});


function isMobileDevice() {
    // Verificar se o agente do usuário corresponde a qualquer padrão de dispositivo móvel
    return (/Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

async function capturarDados() {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) preencherDadosnaTela(dados, cidade);
}



async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if (resposta.status !== 200) return;

    const dados = resposta.json();

    return dados;
}

function preencherDadosnaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const cidadeBuscada = dados.location.name;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidadeBuscada;

    document.getElementById("temperatura").textContent = `${temperatura} °C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("humidade").textContent = `${humidade}%`;

    document.getElementById("velocidade-do-vento").textContent = `${velVento}km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);


}