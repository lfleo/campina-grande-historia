// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interatividade na linha do tempo
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        const details = item.querySelector('p');
        details.classList.toggle('hidden');
    });
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
    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42868.jpg',

    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42865.jpg',
    
    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/PB11120.jpg',

    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42860.jpg',

    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/pb42866.jpg',

    'https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/PB11116.jpg'
];

const imgContainer = document.querySelector('.imagens-historicas');

imagens.forEach(img => {
    const imageElement = document.createElement('img');
    imageElement.src = img;
    imageElement.style.width = '350px';
    imageElement.style.margin = '5px';
    imageElement.style.cursor = 'pointer';

    imageElement.addEventListener('click', () => {
        abrirGaleria(img);
    });

    imgContainer.appendChild(imageElement);
});

// Função para abrir a "galeria"
function abrirGaleria(imagemSrc) {
    // Cria o fundo escuro
    const fundo = document.createElement('div');
    fundo.style.position = 'fixed';
    fundo.style.top = 0;
    fundo.style.left = 0;
    fundo.style.width = '100%';
    fundo.style.height = '100%';
    fundo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    fundo.style.display = 'flex';
    fundo.style.justifyContent = 'center';
    fundo.style.alignItems = 'center';
    fundo.style.zIndex = '1000';
    fundo.style.cursor = 'pointer';

    // Amplia a imagem
    const imagemAmpliada = document.createElement('img');
    imagemAmpliada.src = imagemSrc;
    imagemAmpliada.style.maxWidth = '90%';
    imagemAmpliada.style.maxHeight = '90%';
    imagemAmpliada.style.borderRadius = '10px';
    imagemAmpliada.style.boxShadow = '0 0 20px white';

    fundo.appendChild(imagemAmpliada);

    // Clicar no fundo fecha
    fundo.addEventListener('click', () => {
        fundo.remove();
    });

    document.body.appendChild(fundo);
}
