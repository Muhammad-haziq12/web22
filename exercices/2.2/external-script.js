let btn2 = document.querySelector("#myBtn2");
let msg = document.querySelector(".message");
let msg2 = document.querySelector(".messagedelafin");
let compteur = 0;


btn2.addEventListener('click', zbi2);

function zbi2(){
    compteur ++;
    msg.innerHTML = compteur;

    if (compteur >= 5 && compteur <= 9){
        msg2.innerHTML = "Bravo, bel échauffement !";
    }

    if (compteur >= 10){
        msg2.innerHTML = "Vous êtes passé maître en l'art du clic !";
    }

    }
