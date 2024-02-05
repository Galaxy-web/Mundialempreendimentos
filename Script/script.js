document.addEventListener("DOMContentLoaded", function() {
    // Carregar imóveis salvos do localStorage ao carregar a página
    const imoveisSalvos = JSON.parse(localStorage.getItem('imoveis')) || [];
    imoveisSalvos.forEach(imovel => {
        exibirImovel(imovel);
    });

    // Abrir pop-up ao clicar no botão
    document.getElementById("btnAdicionarImovel").addEventListener("click", function() {
        document.getElementById("modalAdicionarImovel").style.display = "block";
        document.body.style.overflow = "hidden"; // Impede a rolagem da página
    });

    // Fechar pop-up ao clicar no botão de fechar
    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("modalAdicionarImovel").style.display = "none";
        document.body.style.overflow = ""; // Restaura a rolagem da página
    });

    // Fechar pop-up ao clicar fora dele
    window.addEventListener("click", function(event) {
        if (event.target == document.getElementById("modalAdicionarImovel")) {
            document.getElementById("modalAdicionarImovel").style.display = "none";
            document.body.style.overflow = ""; // Restaura a rolagem da página
        }
    });

    // Adicionar novo imóvel ao enviar formulário
    document.getElementById("formAdicionarImovel").addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Obter os valores do formulário
        const endereco = document.querySelector('input[name="endereco"]').value;
        const tipo = document.querySelector('input[name="tipo"]').value;
        const preco = document.querySelector('input[name="preco"]').value;
        const descricao = document.querySelector('input[name="descricao"]').value;
        const localizacao = document.querySelector('input[name="localizacao"]').value;
        const quartos = document.querySelector('input[name="quartos"]').value;
        const vagasGaragem = document.querySelector('input[name="vagas_garagem"]').value;
        const banheiros = document.querySelector('input[name="banheiros"]').value;
        const tamanhoTerreno = document.querySelector('input[name="tamanho_terreno"]').value;

        // Obter as imagens selecionadas
        const imagens = Array.from(document.querySelector('input[name="fotos"]').files);
        
        // Converter as imagens em URLs de dados (data URLs)
        const imagensDataUrls = await Promise.all(imagens.map(async (imagem) => {
            const dataUrl = await readFileAsDataURL(imagem);
            return dataUrl;
        }));

        // Criar um objeto com os dados do imóvel e as URLs de dados das imagens
        const novoImovel = {
            endereco: endereco,
            tipo: tipo,
            preco: preco,
            descricao: descricao,
            localizacao: localizacao,
            quartos: quartos,
            vagasGaragem: vagasGaragem,
            banheiros: banheiros,
            tamanhoTerreno: tamanhoTerreno,
            imagens: imagensDataUrls
        };

        // Adicionar o novo imóvel à lista
        adicionarImovel(novoImovel);

        // Fechar o modal após adicionar o imóvel
        document.getElementById("modalAdicionarImovel").style.display = "none";
        document.body.style.overflow = ""; // Restaura a rolagem da página

        // Adicionar o novo imóvel aos imóveis salvos
        imoveisSalvos.push(novoImovel);
        
        // Salvar os imóveis atualizados no localStorage
        localStorage.setItem('imoveis', JSON.stringify(imoveisSalvos));
    });

    // Função para adicionar o imóvel à lista
    function adicionarImovel(imovel) {
        // Exibir o novo imóvel na página
        exibirImovel(imovel);
    }

    // Função para exibir o imóvel na página
function exibirImovel(imovel) {
    const cardsDiv = document.querySelector('.cards');
    const novoImovelDiv = document.createElement('div');
    novoImovelDiv.classList.add('imovel');

    // Slide de fotos
    const slideshowContainer = document.createElement('div');
    slideshowContainer.classList.add('slideshow-container');
    slideshowContainer.innerHTML = getImagensHTML(imovel.imagens);
    
    // Botões de navegação do slide de fotos
    const prevButton = document.createElement('a');
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&#10094;';

    const nextButton = document.createElement('a');
    nextButton.classList.add('next');
    nextButton.innerHTML = '&#10095;';

    slideshowContainer.appendChild(prevButton);
    slideshowContainer.appendChild(nextButton);

    novoImovelDiv.appendChild(slideshowContainer);

    // Informações do imóvel
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-imovel');
    infoDiv.innerHTML = `
        <h3>${imovel.tipo} - ${imovel.endereco}</h3>
        <p>Preço: ${imovel.preco}</p>
        <p>Descrição: ${imovel.descricao}</p>
        <p>Localização: ${imovel.localizacao}</p>
        <p>Quartos: ${imovel.quartos}</p>
        <p>Vagas de Garagem: ${imovel.vagasGaragem}</p>
        <p>Banheiros: ${imovel.banheiros}</p>
        <p>Tamanho do Terreno: ${imovel.tamanhoTerreno} m²</p>
    `;

    novoImovelDiv.appendChild(infoDiv);

    // Botão de exclusão do imóvel
    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.textContent = 'Vendido';

    btnExcluir.addEventListener('click', function() {
        // Remover o imóvel da lista
        cardsDiv.removeChild(novoImovelDiv);

        // Remover o imóvel do localStorage
        const index = imoveisSalvos.indexOf(imovel);
        if (index !== -1) {
            imoveisSalvos.splice(index, 1);
            localStorage.setItem('imoveis', JSON.stringify(imoveisSalvos));
        }
    });

    novoImovelDiv.appendChild(btnExcluir);

    cardsDiv.appendChild(novoImovelDiv);

    // Inicializar o slideshow de imagens
    let slideIndex = 0;
    const slides = novoImovelDiv.querySelectorAll('.mySlides');
    const prev = novoImovelDiv.querySelector('.prev');
    const next = novoImovelDiv.querySelector('.next');

    function showSlides() {
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Altera a imagem a cada 2 segundos
    }

    prev.addEventListener("click", function() {
        slideIndex--;
        if (slideIndex < 1) { slideIndex = slides.length }
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        slides[slideIndex - 1].style.display = "block";
    });

    next.addEventListener("click", function() {
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides.forEach(slide => {
            slide.style.display = "none";
        });
        slides[slideIndex - 1].style.display = "block";
    });

    showSlides();
}

    // Função para obter o HTML das imagens
    function getImagensHTML(imagens) {
        let imagensHTML = '';
        for (let i = 0; i < imagens.length; i++) {
            imagensHTML += `
                <div class="mySlides fade">
                    <img src="${imagens[i]}" style="width:100%">
                </div>
            `;
        }
        return imagensHTML;
    }

    // Função para converter um arquivo em URL de dados (data URL)
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
});
