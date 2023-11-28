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
let dot1 = document.getElementById('dot1');
let dot2 = document.getElementById('dot2');
let global1 = document.getElementById('global1');
let global2 = document.getElementById('global2');
let round1 = document.getElementById('round1');
let round2 = document.getElementById('round2');
let dice = document.querySelectorAll('img');

// function dotActive {

// }

function roll()  {
    //boucle qui récupére l'élément image de notre
    dice.forEach(function (dic) {
        dic.classList.add("shake");
    });
    setTimeout(function() {
        dice.forEach(function (dic) {
            dic.classList.remove("shake")
        })
    }, 1000) 
    let dicvalue = Math.floor(Math.random() * 6) 
    console.log(dicvalue + 1)
    document.querySelector("#dic").setAttribute("src", facesOfDice[dicvalue]); 
    let diceResult = dicvalue + 1;
    round1.innerHTML = diceResult
}

rollDice.addEventListener('click', () =>{
    roll()
});
console.log(dice)
