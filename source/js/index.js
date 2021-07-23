// constante et variable ############################

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const zombies = document.getElementById('zombies');
const endScreen = document.getElementById('endScreen');
const hand = document.querySelector('.blood');

// le score a atteindre, et le nombre delement qui sont afficher pour perdre la partie
zombieLeft = 60;
gameOverNumber = 20;
loopPlay = false;



// FONCTION DE DEPART et ou RESTART
function start() {

    count = 0;

    // vitesse de pop
    getFaster = 6000;
    zombieRestant = zombieLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    zombies.innerHTML = zombieRestant;

    loopPlay ? '' : game();
    loopPlay = true;

    // Supprime l'intro au start
    hand.classList.remove('blood');


    // GENERAL SETTING  / LOGIC GAME 
    function game() {

        let randomTime = Math.round(Math.random() * getFaster);
        // Permet de faire pop de plus en plus vite
        getFaster > 700 ? getFaster = (getFaster * 0.9) : '';

        setTimeout(() => {

            if (zombieRestant === 0) {

                youWin();

            } else if (canvas.childElementCount < gameOverNumber) {
             
                zombiePop();
                game();

            } else {

                gameOver();

            }

        }, randomTime);

    };



};






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

        count++;
        score.innerHTML = count;

    };   


});
