let boutonLancerJeu = document.getElementById("start");
let conteneur = document.querySelector(".conteneur");
let conteneurDiv = document.querySelectorAll(".conteneur div");
let tourJoueur = document.querySelector(".zoneTourResultat");
let endgame = false;
let morpion = null;

conteneur.classList.add("hideDiv");

boutonLancerJeu.addEventListener("click", () => {
  conteneur.classList.remove("hideDiv");
  boutonLancerJeu.classList.add("hide");
  morpion = new Morpion("1");
  console.log(morpion);

  //informe le tour du Joueur initial
  tourJoueur.innerHTML = "Joueur " + morpion.nextPlayer;
  console.log(morpion.squares);

  for (let div = 0; div < 9; div++) {
    const divCase = conteneurDiv[div];
    //reinitialisation des valeurs
    if (endgame) {
      divCase.textContent = "";
      tourJoueur.classList.remove("joueur1");
      tourJoueur.classList.remove("joueur2");
      tourJoueur.classList.remove("egalite");
      divCase.classList.remove("joueur1");
      divCase.classList.remove("joueur2");
      divCase.classList.remove("clicked");
    }
    let column = div % 3;
    let row = Math.floor(div / 3);

    function handleClick(column, row) {
      if (endgame) {
        return;
      }

      //Permet de désactiver l'hover et l'event lié a la div dans le fichier css
      divCase.classList.add("clicked");
      //Enregistre la case coché dans le tableau de la classe morpion
      let result = morpion.checkSquare(column, row);
      //cycle l'information du tour du Joueur
      tourJoueur.innerHTML = "Joueur " + morpion.nextPlayer;
      switch (tourJoueur.innerHTML) {
        case "Joueur 1":
          tourJoueur.classList.add("joueur1");
          tourJoueur.classList.remove("joueur2");
          break;
        case "Joueur 2":
          tourJoueur.classList.add("joueur2");
          tourJoueur.classList.remove("joueur1");
          break;
        default:
          tourJoueur.classList.add("egalite");
      }

      //Affiche les symboles sur la case div correspondant aux valeurs du tableau Morpion
      divCase.number = morpion.squares[column][row];
      switch (divCase.number) {
        case "1":
          divCase.textContent = "X";
          divCase.classList.add("joueur1");
          break;
        case "2":
          divCase.textContent = "O";
          divCase.classList.add("joueur2");
          break;
        default:
          divCase.textContent = "";
      }

      //Condition déterminant si le jeu est fini
      if (result !== undefined) {
        endgame = true;
        boutonLancerJeu.innerHTML = "REJOUER";
        boutonLancerJeu.classList.remove("hide");
        //affiche les résultat
        tourJoueur.innerHTML = result;
        switch (result) {
          case "Joueur 1 a gagné":
            tourJoueur.classList.add("joueur1");
            tourJoueur.classList.remove("joueur2");
            break;
          case "Joueur 2 a gagné":
            tourJoueur.classList.add("joueur2");
            tourJoueur.classList.remove("joueur1");
            break;
          default:
            tourJoueur.classList.add("egalite");
            tourJoueur.classList.remove("joueur1");
            tourJoueur.classList.remove("joueur2");
        }

        //Fonction supprimant les EventListener et Hover des cases si le jeu est fini
        for (let i = 0; i < conteneurDiv.length; i++) {
          conteneurDiv[i].removeEventListener("click", handleClick);
          conteneurDiv[i].classList.add("clicked");
        }
      }
    }

    divCase.addEventListener("click", () => handleClick(column, row));
  }
  endgame = false;
});
