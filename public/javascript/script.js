const marcas = []
const modelos = [];
const anos = [];
const tipos = {
    "Carro": "carros",
    "Moto": "motos",
    "Caminhão": "caminhoes"
}

var input_datalistTipos = document.getElementById("input-datalist-tipos")
input_datalistTipos.onchange = (e) => {
    buscaMarcas(e.target.value)
}

var input_datalistMarcas = document.getElementById("input-datalist-marcas")
input_datalistMarcas.onchange = (e) => {
    buscaModelos(input_datalistTipos.value ,marcas[0][e.target.value])
}
        
var input_datalistModelos = document.getElementById("input-datalist-modelos")
input_datalistModelos.onchange = (e) => {
    buscaAnos(input_datalistTipos.value ,marcas[0][input_datalistMarcas.value], modelos[0][e.target.value])
}

var input_datalistAnos = document.getElementById("input-datalist-anos")
var form_fipe = document.getElementById("form-fipe")
form_fipe.onsubmit = () => {
    buscaFipe(input_datalistTipos.value ,marcas[0][input_datalistMarcas.value],
                modelos[0][input_datalistModelos.value], anos[0][input_datalistAnos.value])
}

function buscaMarcas(tipo){

    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipos[tipo]}/marcas`)
        .then((json) => {
            preencheMarcas(json.data)
        })
        .catch((error) => {
            alert(error)
        })
    event.preventDefault()
}

function preencheMarcas(data){
    input_datalistMarcas.value = ""
    input_datalistModelos.value = ""
    input_datalistAnos.value = ""

    var datalistMarcas = document.getElementById("datalist-marcas")
    datalistMarcas.innerHTML = "";
    marcas.pop()
    marcas.push({})

    data.forEach(function(item){
        var option = document.createElement("option")
        option.value = item["nome"]
        datalistMarcas.appendChild(option)

        marcas[0][item["nome"]] = item["codigo"]
    });
}

function buscaModelos(tipo, codigoMarca){
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipos[tipo]}/marcas/${codigoMarca}/modelos`)
        .then((json) => {
            preencheModelos(json.data)
        })
        .catch((error) => {
            alert("Entre com uma marca válida")
        })
    event.preventDefault()
}

function preencheModelos(data){
    input_datalistModelos.value = ""
    input_datalistAnos.value = ""

    var datalistModelos = document.getElementById("datalist-modelos")
    datalistModelos.innerHTML = "";
    modelos.pop()
    modelos.push({})

    data["modelos"].forEach(function(item){
        var option = document.createElement("option")
        option.value = item["nome"]
        datalistModelos.appendChild(option)

        modelos[0][item["nome"]] = item["codigo"]
    });
}

function buscaAnos(tipo, codigoMarca, codigoModelo){
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipos[tipo]}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`)
        .then((json) => {
            preencheAnos(json.data)
        })
        .catch((error) => {
            alert("Entre com um modelo válido")
        })
    event.preventDefault()
}

function preencheAnos(data){
    input_datalistAnos.value = ""

    var datalistAnos = document.getElementById("datalist-anos")
    datalistAnos.innerHTML = "";
    anos.pop()
    anos.push({})

    data.forEach(function(item){
        var option = document.createElement("option")
        option.value = item["nome"]
        datalistAnos.appendChild(option)

        anos[0][item["nome"]] = item["codigo"]
    });
}

function buscaFipe(tipo, codigoMarca, codigoModelo, codigoAno){
    axios.get(`https://parallelum.com.br/fipe/api/v1/${tipos[tipo]}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAno}`)
        .then((json) => {
            preencheResultados(json.data)
        })
        .catch((error) => {
            alert("Entre com um ano válido")
        })
    event.preventDefault()
}

function preencheResultados(data){
    var tabela_resultados = document.getElementById("result-fipe")
    tabela_resultados.innerHTML = `<tr>\
                                        <td>Modelo:</td>\
                                        <td>${data["Modelo"]}</td>\
                                    </tr>\
                                    <tr>\
                                        <td>Ano:</td>\
                                        <td>${data["AnoModelo"]}</td>\
                                    </tr>\
                                    <tr>\
                                        <td>Código Fipe:</td>\
                                        <td>${data["CodigoFipe"]}</td>\
                                    </tr>\
                                    <tr>\
                                        <td>Mês de Referência:</td>\
                                        <td>${data["MesReferencia"]}</td>\
                                    </tr>\
                                    <tr>\
                                        <td>Valor médio:</td>\
                                        <td>${data["Valor"]}</td>\
                                    </tr>`
}