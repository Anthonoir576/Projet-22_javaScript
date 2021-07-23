// constante et variable ############################

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const zombies = document.getElementById('zombies');
const endScreen = document.getElementById('endScreen');
const hand = document.querySelector('.blood');

// le score a atteindre, et le nombre delement qui sont afficher pour perdre la partie
zombieLeft = 60;
gameOverNumber = 30;
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

            // le jeu est gagner lorsque le nombre de zombie restant est a zero
            if (zombieRestant === 0) {

                youWin();
            
            // le jeu continue, tant que le nombre de zombie pop et inférieur a une valeur defini en haut    
            } else if (canvas.childElementCount < gameOverNumber) {
             
                zombiePop();
                game();

            // le jeu est perdu, si aucune de ces conditions est remplissent.    
            } else {

                gameOver();

            }

        }, randomTime);
    };

    // fonction utiliser lorsque l'utilisateur perds la partie
    const gameOver = () => {

        endScreen.innerHTML = `<div class="gameOver"> GAME OVER <br /> Votre score : ${count}</div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;

    };

    // fonction utiliser lorsque l'utilisateur gagne la partie
    const youWin = () => {

        // calcule la précision, rapport click / img supprimé 
        let precision = Math.round(count / zombieLeft * 100);

        endScreen.innerHTML = `<div class="youWin"> Vous avez GAGNÉ ! <br />  Votre précision :<span> ${precision} </span>%</div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;

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

// decompte zombie restant
canvas.addEventListener('click', () => {

    if (zombieRestant > 0) {

        zombieRestant--;
        zombies.innerHTML = zombieRestant;

    };

});


// delai pour enlever le win ou loose
endScreen.addEventListener('click', () => {

    setTimeout(() => {
        
        start();

        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';

    }, 3500);

});