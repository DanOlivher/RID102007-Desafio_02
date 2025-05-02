async function getAddressByCep() {
    const cep = document.getElementById('cep').value;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        console.log(data);

        if (data.erro) {
            alert('CEP não encontrado. Verifique e tente novamente.');
            return;
        }

        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('localidade').value = data.localidade;

    } catch (erro) {
        alert("Erro ao buscar o CEP: " + erro.message);
    }
}

async function getPrevisao() {
    const lat = document.getElementById('latitude').value;
    const lon = document.getElementById('longitude').value;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();

        console.log(data);

        if (!data.current_weather) {
            alert('Previsão do tempo não encontrada.');
            return;
        }

        const temperatura = data.current_weather.temperature;

        // Atualiza o input com a frase e a temperatura
        document.getElementById('prev').value = `Previsão de tempo de acordo com a região: ${temperatura} °C`;

    } catch (erro) {
        alert("Erro ao buscar a previsão do tempo: " + erro.message);
    }
}

async function buscarInformacoes() {
    await getAddressByCep();
    await getPrevisao();
}
