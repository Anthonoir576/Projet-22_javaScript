// constante et variable ############################

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const zombies = document.getElementById('zombies');
const endScreen = document.getElementById('endScreen');

// le score a atteindre, et le nombre delement qui sont afficher pour perdre la partie
zombieLeft = 60;
gameOverNumber = 20;

// FONCTION DE DEPART et ou RESTART
function start() {

    let count = 0;
    // vitesse de pop
    getFaster = 6000;
    zombieRestant = zombieLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    zombies.innerHTML = zombieRestant;

};

// GENERAL SETTING  / LOGIC GAME ##########################################################


// FONCTION QUI CREE UN ZOMBIE de taille aleatoire, et le moove aléatoirement sur 14s via CSS
function zombiePop() {

    let zombie = new Image();
    zombie.src ="./source/image/zz.png";

    // ajoute la class a limg
    zombie.classList.add('virus');
    // fait pop en haut les img en random en fonction de la taille de lecran, pareil pour la gauche
    zombie.style.top = Math.random() * 500 + 'px';
    zombie.style.left = Math.random() * 500 + 'px';

    // variable : reglage taille en random, avec valeur minimal
    let x, y;
    x = y = (Math.random() * 45) + 100;

    // on injecte cette valeur sur le css, grace au variable créer directement dans celui ci
    zombie.style.setProperty('--x', `${ x }px`);
    zombie.style.setProperty('--y', `${ y }px`);


    let plusMoins = Math.random() < .5 ? -1 : 1;
    // tr pour translate 
    let trX = Math.random() * 500 * plusMoins;
    let trY = Math.random() * 500 * plusMoins;

    zombie.style.setProperty('--trX', `${trX}%`);
    zombie.style.setProperty('--trY', `${trY}%`);

    // on dit que virus, et enfant de main/#canvas
    canvas.appendChild(zombie);

};

// kill lelement, et met +1 au compteur, puis l'affiche
document.addEventListener('click', function (e) {

    let targetElement = e.target || e.srcElement;

    if (targetElement.classList.contains('virus')) {

        targetElement.remove();
        compteur++;
        score.innerHTML = compteur;

    };   


});
