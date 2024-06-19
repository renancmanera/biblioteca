
        /*function verificarHeader() {
            const numeroDigitado = document.getElementById('numeroInput').value;
            if (numeroDigitado === '1') {
                window.location.href = "adicionar.php";
            } else if (numeroDigitado === '2') {
                window.location.href = "editar.html";
            } else if (numeroDigitado === '3') {
                window.location.href = "excluir.html";
            } else if (numeroDigitado === '4') {
                window.location.href = "pesquisar.html";
            } else {
                alert('Digite um número válido.');
            }
        }

        function verificarAdicionar() {
            const numeroDigitado = document.getElementById('numeroInput').value;
            if (numeroDigitado === '1') {
                // Redireciona para outra página (substitua a URL desejada)
                window.location.href = "header.html"; 
            }
            else {
                alert('Digite um número válido.'); //PRECISO ARMAZENAR

        }
    }      

    function verificarEditar() {
        const numeroDigitado = document.getElementById('numeroInput').value;
        if (numeroDigitado === '1') {
            // Redireciona para outra página (substitua a URL desejada)
            window.location.href = "header.html"; 
        }
        else {
            alert('Digite um número válido.'); //PRECISO ARMAZENAR

    }
}   
        
        function verificarExcluir() {
        const numeroDigitado = document.getElementById('numeroInput').value;
        if (numeroDigitado === '1') {
            // Redireciona para outra página (substitua a URL desejada)
            window.location.href = "header.html"; 
        }
        else {
            alert('Digite um número válido.'); //PRECISO ARMAZENAR

    }
}

function verificarPesquisar() {
    const numeroDigitado = document.getElementById('numeroInput').value;
    if (numeroDigitado === '1') {
        // Redireciona para outra página (substitua a URL desejada)
        window.location.href = "header.html"; 
    }
    else {
        alert('Digite um número válido.'); //PRECISO ARMAZENAR

}
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('enviarButton').click();
    }
});

