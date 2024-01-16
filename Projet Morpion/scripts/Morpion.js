/**
 * Classe de jeu de morpion
 */
class Morpion {
  /**
   *
   * @param {number} startPlayer 1 ou 2
   */
  constructor(startPlayer) {
    if (startPlayer !== "1" && startPlayer !== "2") {
      throw new Error("Choisir entre 1 et 2");
    }
    this.nextPlayer = startPlayer;

    this.squares = [];
    for (let column = 0; column < 3; column++) {
      this.squares[column] = [];
      for (let row = 0; row < 3; row++) {
        this.squares[column][row] = 0;
      }
    }
  }
  /**
   * Méthode s'assurant du comportement des cases et du cycle des joueurs
   * @param {*} column
   * @param {*} row
   * @returns // Renvoi le resultat de fin de partie de la fonction "winCondition"
   */
  checkSquare(column, row) {
    if (column !== 0 && column !== 1 && column !== 2) {
      throw new Error("Case inexistante");
    }
    if (row !== 0 && row !== 1 && row !== 2) {
      throw new Error("Case inexistante");
    }
    if (
      this.squares[column][row] === "1" ||
      this.squares[column][row] === "2"
    ) {
      throw new Error("Case déjà coché");
    }

    this.squares[column][row] = this.nextPlayer;
    if (this.nextPlayer == "1") {
      this.nextPlayer = "2";
    } else {
      this.nextPlayer = "1";
    }
    return this.winCondition();
  }

  /**
   * Methode vérifiant les condition de victoire ou d'égalité
   * @returns
   */
  winCondition() {
    /**
     * liste des colonnes
     */

    for (let column = 0; column < 3; column++) {
      let columnPlayerA = true;
      let columnPlayerB = true;
      for (let row = 0; row < 3; row++) {
        const currentSquare = this.squares[column][row];
        switch (currentSquare) {
          case "1":
            columnPlayerB = false;
            break;
          case "2":
            columnPlayerA = false;
            break;
          default:
            columnPlayerA = false;
            columnPlayerB = false;
        }
      }
      if (columnPlayerA) return "Joueur 1 a gagné";
      if (columnPlayerB) return "Joueur 2 a gagné";
    }

    /**
     * liste des lignes
     */
    for (let row = 0; row < 3; row++) {
      let rowPlayerA = true;
      let rowPlayerB = true;
      for (let column = 0; column < 3; column++) {
        const currentSquare = this.squares[column][row];
        switch (currentSquare) {
          case "1":
            rowPlayerB = false;
            break;
          case "2":
            rowPlayerA = false;
            break;
          default:
            rowPlayerA = false;
            rowPlayerB = false;
        }
      }
      if (rowPlayerA) return "Joueur 1 a gagné";
      if (rowPlayerB) return "Joueur 2 a gagné";
    }

    /**
     * liste des diagonales
     */

    let diag1PlayerA = true;
    let diag1PlayerB = true;
    let diag2PlayerA = true;
    let diag2PlayerB = true;
    let decrement = 2;

    for (let increment = 0; increment < 3; increment++) {
      const currentSquareDiag1 = this.squares[increment][increment];
      switch (currentSquareDiag1) {
        case "1":
          diag1PlayerB = false;
          break;
        case "2":
          diag1PlayerA = false;
          break;
        default:
          diag1PlayerA = false;
          diag1PlayerB = false;
      }
      const currentSquareDiag2 = this.squares[decrement][increment];
      switch (currentSquareDiag2) {
        case "1":
          diag2PlayerB = false;
          break;
        case "2":
          diag2PlayerA = false;
          break;
        default:
          diag2PlayerA = false;
          diag2PlayerB = false;
      }
      decrement--;
    }
    if (diag1PlayerA) return "Joueur 1 a gagné";
    if (diag1PlayerB) return "Joueur 2 a gagné";
    if (diag2PlayerA) return "Joueur 1 a gagné";
    if (diag2PlayerB) return "Joueur 2 a gagné";

    /**
     * toute cases coché
     */

    let squareNumber = false;
    for (let column = 0; column < 3; column++) {
      for (let row = 0; row < 3; row++) {
        const checkSquares = this.squares[column][row];
        if (checkSquares === 0) {
          squareNumber = true;
        }
      }
    }
    if (!squareNumber) return "Egalité";
  }
}
