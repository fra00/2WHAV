export const PLAYER_X = "X";
export const PLAYER_O = "O";
export const TIE = "TIE";

/**
 * Crea una scacchiera di gioco iniziale.
 * @returns {Array<string|null>} Un array di 9 elementi nulli.
 */
export function createInitialBoard() {
  return Array(9).fill(null);
}

/**
 * Calcola lo stato della partita (vincitore, pareggio, in corso).
 * @param {Array<string|null>} squares - L'array di 9 elementi che rappresenta la scacchiera.
 * @returns {string|null} 'X', 'O', 'TIE' (pareggio), o null se la partita è in corso.
 */
export function calculateGameStatus(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Ritorna 'X' o 'O'
    }
  }

  // Se non c'è un vincitore, controlla se la scacchiera è piena (pareggio)
  if (squares.every((square) => square !== null)) {
    return TIE;
  }

  return null; // La partita è ancora in corso
}

/**
 * Restituisce un array con gli indici delle mosse disponibili (celle vuote).
 * @param {Array<string|null>} squares
 * @returns {number[]} Un array di indici.
 */
export function getAvailableMoves(squares) {
  const moves = [];
  squares.forEach((square, index) => {
    if (square === null) {
      moves.push(index);
    }
  });
  return moves;
}

/**
 * Esegue una mossa sulla scacchiera per un dato giocatore.
 * @param {Array<string|null>} squares - Lo stato attuale della scacchiera.
 * @param {number} moveIndex - L'indice della cella (0-8) dove fare la mossa.
 * @param {string} player - Il giocatore che fa la mossa (PLAYER_X o PLAYER_O).
 * @returns {Array<string|null>|null} Il nuovo stato della scacchiera se la mossa è valida, altrimenti null.
 */
export function makeMove(squares, moveIndex, player) {
  // Controlla se la mossa è valida (la cella deve essere vuota)
  if (moveIndex < 0 || moveIndex > 8 || squares[moveIndex]) {
    return null; // Mossa non valida
  }

  const newSquares = squares.slice(); // Crea una copia per non mutare lo stato originale
  newSquares[moveIndex] = player;
  return newSquares;
}
