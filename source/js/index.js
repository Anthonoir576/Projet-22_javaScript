// constante et variable ############################

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');


virusPop();

function virusPop() {

    let virus = new Image();
    virus.src ="./source/image/zz.png";
    
    virus.classList.add('.virus');

};
