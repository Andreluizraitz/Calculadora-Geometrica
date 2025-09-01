const tipoSelect = document.getElementById('tipo');
const formaSelect = document.getElementById('forma');
const camposDiv = document.getElementById('campos');
const result = document.getElementById('result');
const botao = document.getElementById('buttonCalc');
const imgForma = document.getElementById('img-forma');

// Pega parâmetros da URL
const params = new URLSearchParams(window.location.search);
const tipoParam = params.get("tipo");

// Se existir um tipo na URL, já seleciona no <select>
if (tipoParam) {
    tipoSelect.value = tipoParam;
    tipoSelect.dispatchEvent(new Event("change")); // força atualizar as opções
        atualizarCampos(); // 🔥 garante que já limita as formas corretas
}

//dynamic field
const opcoes = {
    area: ["quadrado", "retangulo", "triangulo", "circulo", "cilindro", "esfera", "prisma", "cone"],
    perimetro: ["quadrado", "retangulo", "triangulo", "circulo"],
    volume: ["cilindro", "esfera", "prisma", "cone"]
}

const nomes = {
    quadrado: "Quadrado",
    retangulo: "Retângulo",
    triangulo: "Triângulo",
    circulo: "Círculo",
    cilindro: "Cilindro",
    esfera: "Esfera",
    prisma: "Prisma",
    cone: "Cone"
};

tipoSelect.addEventListener('change', () => {
    const tipo = tipoSelect.value;

    // limpa opções anteriores
    formaSelect.innerHTML = "<option value=''>-- Selecione --</option>";

    // adiciona novas opções dependendo do tipo
    if (opcoes[tipo]) {
        opcoes[tipo].forEach(f => {
            let opt = document.createElement("option");
            opt.value = f;
            opt.textContent = nomes[f];
            formaSelect.appendChild(opt);
        });
    }
});

//Funçao para colocar a imagem da forma no HTML
function atualizarImagem(forma) {
    if (!forma) {
        imgForma.style.display = "none";
        return;
    }
    imgForma.src = "components/img/" + forma + ".png"; // ex: img/quadrado.png
    imgForma.style.display = "block";
}

//função para atualizar os inputs
function atualizarCampos() {
    const tipo = tipoSelect.value;
    const forma = formaSelect.value;
    camposDiv.innerHTML = '';

    if (forma === 'quadrado') {
        camposDiv.innerHTML = `
            <label>Lado:</label>
            <input type="number" id="l" placeholder="Digite o lado">
        `;
    }
    else if (forma === 'retangulo') {
        camposDiv.innerHTML = `
            <label>Base:</label>
            <input type="number" id="b" placeholder="Digite a base">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
        `;
    }
    else if (forma === 'triangulo') {
        if (tipo === 'area') {
            camposDiv.innerHTML = `
                <label>Base:</label>
                <input type="number" id="b" placeholder="Digite a base">
                <label>Altura:</label>
                <input type="number" id="h" placeholder="Digite a altura">
            `;
        } else if (tipo === 'perimetro') {
            camposDiv.innerHTML = `
                <label>Lado A:</label>
                <input type="number" id="a" placeholder="Digite o lado A">
                <label>Lado B:</label>
                <input type="number" id="b" placeholder="Digite o lado B">
                <label>Lado C:</label>
                <input type="number" id="c" placeholder="Digite o lado C">
            `;
        }
    }
    else if (forma === 'circulo') {
        camposDiv.innerHTML = `
            <label>Raio:</label>
            <input type="number" id="r" placeholder="Digite o raio">
        `;
    }
    else if (forma === 'cilindro') {
        camposDiv.innerHTML = `
            <label>Raio:</label>
            <input type="number" id="r" placeholder="Digite o raio">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
        `;
    }
    else if (forma === 'esfera') {
        camposDiv.innerHTML = `
            <label>Raio:</label>
            <input type="number" id="r" placeholder="Digite o raio">
        `;
    }
    else if (forma === 'prisma') {
        if (tipo === 'area') {
            camposDiv.innerHTML = `
            <label>Área da Base:</label>
            <input type="number" id="Ab" placeholder="Digite a área da base">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
            <label>Perímetro da base:</label>
            <input type="number" id="Pb" placeholder="Digite o perimetro da base">
            `;
        } else if (tipo === 'volume') {
            camposDiv.innerHTML = `
            <label>Área da Base:</label>
            <input type="number" id="Ab" placeholder="Digite a área da base">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
            `;
        }
    }

    else if (forma === 'cone') {
        if (tipo === 'area') {
            camposDiv.innerHTML = `
            <label>Raio:</label>
            <input type="number" id="r" placeholder="Digite o raio">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
            `;
        } else if (tipo === 'volume') {
            camposDiv.innerHTML = `
            <label>Raio:</label>
            <input type="number" id="r" placeholder="Digite o raio">
            <label>Altura:</label>
            <input type="number" id="h" placeholder="Digite a altura">
            `;
        }
    }
};

//função Calcular
function calcular() {
    const tipo = tipoSelect.value;
    const forma = formaSelect.value;
    let res = null;
    let formulaTxt = "";
    let resultadoTxt = "";

    if (forma === 'quadrado') {
        let l = parseFloat(document.getElementById('l').value);
        if (tipo === 'area') {
            res = l ** 2

            formulaTxt = '\\( A = l ^ {2}\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'perimetro') {
            res = 4 * l

            formulaTxt = '\\( P = 4 \\times l\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m \\)';
        }
    }

    if (forma === 'retangulo') {
        let b = parseFloat(document.getElementById('b').value);
        let h = parseFloat(document.getElementById('h').value);
        if (tipo === 'area') {
            res = b * h

            formulaTxt = '\\( A = b \\times h\\)'
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'perimetro') {
            res = 2 * (b + h)

            formulaTxt = '\\( P = 2 \\times (b + h)\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m \\)';
        }
    }

    if (forma === 'triangulo') {
        if (tipo === 'area') {
            let b = parseFloat(document.getElementById('b').value);
            let h = parseFloat(document.getElementById('h').value);
            res = b * h / 2

            formulaTxt = '\\( A = \\frac{b \\times h}{2} \\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'perimetro') {
            let a = parseFloat(document.getElementById('a').value);
            let b = parseFloat(document.getElementById('b').value);
            let c = parseFloat(document.getElementById('c').value);
            res = a + b + c

            formulaTxt = '\\( P = a + b + c \\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m \\)';
        }
    }

    if (forma === 'circulo') {
        let r = parseFloat(document.getElementById('r').value);
        if (tipo === 'area') {
            res = Math.PI * (r ** 2)

            formulaTxt = '\\( A = \\pi \\times r^{2}\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'perimetro') {
            res = 2 * Math.PI * r

            formulaTxt = '\\( P = 2 \\pi \\times r\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m \\)';
        }
    }

    if (forma === 'cilindro') {
        let r = parseFloat(document.getElementById('r').value);
        let h = parseFloat(document.getElementById('h').value);
        if (tipo === 'area') {
            res = 2 * Math.PI * r * (r + h)

            formulaTxt = '\\( A = 2 \\pi r (r + h)\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'volume') {
            res = Math.PI * (r ** 2) * h

            formulaTxt = '\\( V = \\pi \\times r^{2} \\times h\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {3} \\)';
        }
    }

    if (forma === 'esfera') {
        let r = parseFloat(document.getElementById('r').value);
        if (tipo === 'area') {
            res = (4 * Math.PI) * (r ** 2)

            formulaTxt = '\\( A = 4 \\pi r^{2}\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'volume') {
            res = 4 / 3 * Math.PI * (r ** 3)

            formulaTxt = '\\( V = \\frac{4}{3} \\pi r^{3}\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {3} \\)';
        }

    }

    if (forma === 'prisma') {
        if (tipo === 'area') {
            let Ab = parseFloat(document.getElementById('Ab').value);
            let h = parseFloat(document.getElementById('h').value);
            let Pb = parseFloat(document.getElementById('Pb').value);
            res = 2 * Ab + Pb * h

            formulaTxt = '\\( A = 2 \\times \\text{Ab} + \\text{Pb} \\times h\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {2} \\)';
        } else if (tipo === 'volume') {
            let Ab = parseFloat(document.getElementById('Ab').value);
            let h = parseFloat(document.getElementById('h').value);
            res = Ab * h

            formulaTxt = '\\( V = \\text{Ab} \\times h\\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {3} \\)';
        }
    }

    if (forma === 'cone') {
        let r = parseFloat(document.getElementById('r').value); // raio
        let h = parseFloat(document.getElementById('h').value); // altura

        if (tipo === 'area') {
            let g = Math.sqrt((r ** 2) + (h ** 2)); // geratriz

            res = Math.PI * r * (r + g);

            formulaTxt = '\\( A = \\pi r (r + g) \\)';
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m^{2} \\)';
        } else if (tipo === 'volume') {
            res = (1 / 3) * Math.PI * (r ** 2) * h

            formulaTxt = '\\( V = \\frac{1}{3} \\pi r^{2} h\\)'
            resultadoTxt = '\\( ' + res.toFixed(2) + '\\; m ^ {3} \\)';
        }
    }

    if (res !== null && !isNaN(res)) {
        // Atualiza os textos no HTML
        document.getElementById("formula").textContent = "Fórmula: ";
        document.getElementById("valor").textContent = "Resultado: " + res.toFixed(2);

        // Renderiza a fórmula bonita com MathJax
        document.getElementById("formula").innerHTML = "Fórmula: " + formulaTxt;
        document.getElementById("valor").innerHTML = "Resultado: " + resultadoTxt;

        MathJax.typesetPromise(); // Garante que o MathJax re-renderize a fórmula
    } else {
        document.getElementById("formula").textContent = "";
        document.getElementById("valor").textContent = "Selecione a forma e preencha os valores.";
    }
}


tipoSelect.addEventListener('change', atualizarCampos);
formaSelect.addEventListener('change', atualizarCampos);
formaSelect.addEventListener('change', () => {
    atualizarCampos();
    atualizarImagem(formaSelect.value);
});
botao.addEventListener('click', calcular);
// Captura o Enter apenas quando estiver em um input numérico
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.activeElement.tagName === "INPUT" && document.activeElement.type === "number") {
        event.preventDefault(); // não deixa o enter recarregar a página
        calcular(); // chama a função de cálculo
    }
});