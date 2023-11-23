const chaveDaApi = "cd31863ae267407cb01212131232011";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) preencherDadosnaTela(dados, cidade);
});

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