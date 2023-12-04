let facesOfDice = [
    'Assets/images/dice-01.png',
    'Assets/images/dice-02.png',
    'Assets/images/dice-03.png',
    'Assets/images/dice-04.png',
    'Assets/images/dice-05.png',
    'Assets/images/dice-06.png'
]
let newGame = document.getElementById('new-game');
let rollDice = document.getElementById('roll');
let hold = document.getElementById('hold');
let dote1 = document.getElementById('dot1');
let dote2 = document.getElementById('dot2');
let GLOBAL1Score = document.getElementById('globalsc1');
let GLOBAL2Score = document.getElementById('globalsc2');
let ROUND1Score = document.getElementById('score1');
let ROUND2Score = document.getElementById('score2');
let current1 = 0;
let current2 = 0;
let dice = document.querySelectorAll('img');
let diceResult = 0;
let global1 = 0;
let global2 = 0;
let round = 0;

// Evite que le joueur 1 passe son tour en début de partie.
document.querySelector('#hold').disabled = true;

function roll()  {
    // Boucle qui récupére l'élément image de notre code html
    // Puis animation "Shake" pendant une seconde
    dice.forEach(function (dic) {
        dic.classList.add("shake");
    });
    setTimeout(function() {
        dice.forEach(function (dic) {
            dic.classList.remove("shake")
        })
    }, 1000)
    // Récupération d'une valeur (aléatoire entre 1 et 6, 6 étant le nombre de face du dé possible)
    let diceValue = Math.floor(Math.random() * 6)
    console.log(diceValue + 1)
    // Attribution de la valeur(aléatoire) à l'image du dé 
    document.querySelector("#dic").setAttribute("src", facesOfDice[diceValue]);
    // Récupération de la valeur du dé
    diceResult = diceValue + 1;

    if(round == 0) {
        // Lancer du dé joueur 1
        // On récupére le résultat dans une variable et on l'ajoute l'affichage
        current1 = diceResult;
        ROUND1Score.innerHTML = current1;
        // On réactive le bouton hold par son id (pourde nouveau appuyer sur le boutton hold)
        document.querySelector('#hold').disabled = false;
    }else {
        // Lancer les dés joueur 2
        // On récupére le résultat dans une variable et on l'ajoute l'affichage
        current2 = diceResult;
        ROUND2Score.innerHTML = current2;
        // On réactive le bouton hold par son id (pourde nouveau appuyer sur le boutton hold)
        document.querySelector('#hold').disabled = false;
    }
    //Condition si le joueur fait 1, il passe son tour et on ne compte pas le point
    if(diceResult == 1 & round == 0) {
        // On réinitialise le résultat, la variable ainsi que l'affichage
        diceResult = 0;
        current1 = 0;
        ROUND1Score.innerHTML = 0;
        // Change l'affichage du joueur et passe au joueur 2
        dote1.classList.add('dot1d');
        dote2.classList.remove('dot2d');
        // On désactive le boutton hold (pour êviter un switch de joueur) 
        document.querySelector('#hold').disabled = true;
        // Et on passe le tour.
        round++;
    }else if(diceResult == 1 & round == 1){
        // On réinitialise le résultat, la variable ainsi que l'affichage
        diceResult = 0;
        current2 = 0;
        ROUND2Score.innerHTML = 0;
        // Change l'affichage du joueur et passe au joueur 1
        dote2.classList.add('dot2d');
        dote1.classList.remove('dot1d');
        // On désactive le boutton hold (pour êviter un switch de joueur) 
        document.querySelector('#hold').disabled = true;
        // Et on passe le tour.
        round--;
    }
}

//Appel de la fonction roll sur le bouton rollDice
rollDice.addEventListener('click', () =>{
    roll()
});

function keephold() {
    if(round == 0) {
        //Récupére le résultat du dé (diceResult) on l'ajoute a global puis on l'affiche dans globale1
        global1 += diceResult;
        GLOBAL1Score.innerHTML = global1;
        ROUND1Score.innerHTML = 0;
        diceResult = 0;
        //Change l'affichage du joueur et passe au joueur 2
        dote1.classList.add('dot1d');
        dote2.classList.remove('dot2d');
        //On désactive le bouton hold par son id (pour éviter de pouvoir appuyer de nouveau)
        document.querySelector('#hold').disabled = true;
        //change de tour +1
        round++
    }else {
        //Récupére le résultat du dé (diceResult) on l'ajoute a global puis on l'affiche dans globale2
        global2 += diceResult;
        GLOBAL2Score.innerHTML = global2;
        ROUND2Score.innerHTML = 0;
        diceResult = 0;
        //Change l'affichage du joueur et passe au joueur 1
        dote2.classList.add('dot2d');
        dote1.classList.remove('dot1d');
        //On désactive le bouton hold par son id (pour éviter de pouvoir appuyer de nouveau)
        document.querySelector('#hold').disabled = true;
        //change de tour -1
        round-- 
    }
    // Fin de partie limité à 100 point
    // On bloque les bouttons hold et roll 
    if(global1 >= 100) {
        alert('Le Player 1 remporte la partie !')
        document.querySelector('#hold').disabled = true;
        document.querySelector('#roll').disabled = true;
    }else if (global2 >= 100) {
        alert(' Le Player 2 remporte la partie !')
        document.querySelector('#hold').disabled = true;
        document.querySelector('#roll').disabled = true;
    }
}
//Appel de la fonction hold
hold.addEventListener('click', () =>{
    keephold()
})

function restart() {
    //On remet toutes les valeurs à 0 et l'affichage du joueur qui commence
    ROUND1Score.innerHTML = 0;
    ROUND2Score.innerHTML = 0;
    GLOBAL1Score.innerHTML = 0;
    GLOBAL2Score.innerHTML = 0;
    global1 = 0;
    global2 = 0;
    round = 0;
    // Remise de l'affichage sur le joueur 1
    dote2.classList.add('dot2d');
    dote1.classList.remove('dot1d');
    // On bloque le boutton hold pour éviter que le joueur 1 passe son tour
    document.querySelector('#hold').disabled = true;
    // Tout en débloquant le boutton roll pour qu'il puisse lancer le dé
    document.querySelector('#roll').disabled = false;
    // Remise a l'affichage de la première face du dé.
    document.querySelector("#dic").setAttribute("src", facesOfDice[0]);
}
//Appel de la fonction restart
newGame.addEventListener('click', () => {
    restart()
})
