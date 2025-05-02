// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interatividade na linha do tempo (acordeão)
document.querySelectorAll('.timeline-item').forEach(item => {
    const icon = item.querySelector('i');
    const content = item.querySelector('.timeline-content');
    
    // Adiciona evento de clique ao cabeçalho
    item.querySelector('h3').addEventListener('click', (e) => {
        // Impede que o evento se propague se clicar no ícone
        if (e.target.tagName === 'I') return;
        
        // Fecha todos os outros itens
        document.querySelectorAll('.timeline-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('i');
                if (otherIcon) {
                    otherIcon.classList.remove('fa-chevron-down');
                    otherIcon.classList.add('fa-chevron-up');
                }
            }
        });
        
        // Alterna o item clicado
        item.classList.toggle('active');
        
        // Alterna o ícone
        if (item.classList.contains('active')) {
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        } else {
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    });
    
    // Adiciona evento de clique ao ícone
    if (icon) {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Fecha os outros itens e deixa apenas um aberto
            document.querySelectorAll('.timeline-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('i');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-chevron-down');
                        otherIcon.classList.add('fa-chevron-up');
                    }
                }
            });
            
            // Alterna o item clicado
            item.classList.toggle('active');
            
            // Alterna o ícone
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
});

// Highlight na navegação
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Carregar imagens históricas
const imagens = [
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42868.jpg',
        caption: 'Praça Clementino Procópio: 1º Igreja Batista de Campina Grande'
    },
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42865.jpg',
        caption: 'Grande Hotel'
    },
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42878.jpg',
        caption: 'Calçadão da Rua Cardoso Vieira'
    },
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42860.jpg',
        caption: 'Prefeitura Municipal'
    },
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42866.jpg',
        caption: 'Avenida Mal. Floriano Peixoto : Prefeitura Municipal'
    },
    { 
        src: 'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42880.jpg',
        caption: 'Praça da Bandeira : Campina Grande'
    }
];

const imgContainer = document.querySelector('.imagens-historicas');

imagens.forEach(img => {
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.style.width = '350px';
    imageElement.style.margin = '5px';
    imageElement.style.cursor = 'pointer';

    // Legenda das imagens
    imageElement.dataset.caption = img.caption;

    imageElement.addEventListener('click', () => {
        abrirGaleria(img.src, img.caption);
    });

    imgContainer.appendChild(imageElement);
});

function abrirGaleria(imagemSrc, legendaTexto) {
    const fundo = document.createElement('div');
    fundo.style.position = 'fixed';
    fundo.style.top = 0;
    fundo.style.left = 0;
    fundo.style.width = '100%';
    fundo.style.height = '100%';
    fundo.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fundo.style.display = 'flex';
    fundo.style.flexDirection = 'column';
    fundo.style.justifyContent = 'center';
    fundo.style.alignItems = 'center';
    fundo.style.zIndex = '1000';
    fundo.style.cursor = 'pointer';

    const containerImagem = document.createElement('div');
    containerImagem.style.position = 'relative';
    containerImagem.style.textAlign = 'center';

    const imagemAmpliada = document.createElement('img');
    imagemAmpliada.src = imagemSrc;
    imagemAmpliada.style.maxWidth = '90vw';
    imagemAmpliada.style.maxHeight = '80vh';
    imagemAmpliada.style.borderRadius = '10px';
    imagemAmpliada.style.objectFit = 'contain';

    const legenda = document.createElement('div');
    legenda.textContent = legendaTexto;
    legenda.style.color = 'white';
    legenda.style.fontSize = '1.2em';
    legenda.style.marginTop = '15px';
    legenda.style.padding = '8px 15px';
    legenda.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    legenda.style.borderRadius = '5px';
    legenda.style.maxWidth = '80%';
    legenda.style.textAlign = 'center';

    containerImagem.appendChild(imagemAmpliada);
    containerImagem.appendChild(legenda);
    fundo.appendChild(containerImagem);

    fundo.addEventListener('click', () => {
        fundo.remove();
    });

    document.body.appendChild(fundo);
}