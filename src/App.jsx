import React, { useState, useEffect } from "react";
import Board from "./Board";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  createInitialBoard,
  calculateGameStatus,
  makeMove,
  getAvailableMoves,
  PLAYER_X,
  PLAYER_O,
  TIE,
} from "./logic/game-api";
import { ticTacToeBotFSM } from "./logic/bot-fsm";
import "./App.css";
import "./Game.css";
import promptContent from "./md/prompt.md?raw";
import fsmContent from "./logic/bot-fsm.js?raw";

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [isXNext, setIsXNext] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  const [copyStatus, setCopyStatus] = useState("Copia");

  const gameStatus = calculateGameStatus(board);
  const winner = gameStatus !== TIE ? gameStatus : null;
  const isGameOver = !!gameStatus;

  // Esegue la FSM del bot ogni volta che la scacchiera o il turno cambiano.
  useEffect(() => {
    const isBotTurn = !isXNext && !isGameOver;

    // Definiamo l'API che la FSM userà per interagire con il nostro gioco React.
    const botApi = {
      getBoard: () => board,
      getAvailableMoves: () => getAvailableMoves(board),
      getGameStatus: () => gameStatus,
      makeMove: (moveIndex) => {
        // Simula un piccolo ritardo per dare l'impressione che il bot "pensi".
        setTimeout(() => {
          const nextBoard = makeMove(board, moveIndex, PLAYER_O);
          if (nextBoard) {
            handlePlay(nextBoard);
          }
        }, 500);
      },
      log: (message) => console.log(`[FSM]: ${message}`),
    };

    // Passiamo lo stato del turno come dato esterno.
    const externalData = { isBotTurn };

    // Eseguiamo un "tick" della macchina a stati.
    ticTacToeBotFSM.run(botApi, externalData);
  }, [board, isXNext, isGameOver, gameStatus]);

  /**
   * Gestisce l'aggiornamento della scacchiera dopo una mossa.
   * Questa funzione verrà chiamata sia dal click dell'umano che, in futuro, dall'API del bot.
   * @param {Array<string|null>} nextSquares Il nuovo stato della scacchiera.
   */
  function handlePlay(nextSquares) {
    setBoard(nextSquares);
    setIsXNext(!isXNext);
  }

  function handleNewGame() {
    setBoard(createInitialBoard());
    setIsXNext(true);
  }

  function handleCopy(content, type) {
    navigator.clipboard.writeText(content).then(
      () => {
        setCopyStatus("Copiato!");
        setTimeout(() => setCopyStatus("Copia"), 2000);
      },
      () => {
        setCopyStatus("Errore");
      }
    );
  }

  let statusText;
  if (winner) {
    statusText = "Winner: " + winner;
  } else if (gameStatus === TIE) {
    statusText = "It's a Tie!";
  } else {
    statusText = "Next player: " + (isXNext ? PLAYER_X : PLAYER_O);
  }

  return (
    <div className="game-container">
      <div className="main-layout">
        <div className="left-pane">
          <h1>Tic Tac Toe</h1>
          <div className="game-area">
            <div className="board-column">
              <Board
                squares={board}
                onPlay={handlePlay}
                isXNext={isXNext}
                isGameOver={isGameOver}
              />
            </div>
            <div className="info-column">
              <h2>Game Status</h2>
              <div className="game-info">{statusText}</div>
              <button className="new-game-button" onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="tab-panel">
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => setActiveTab("tab1")}
              >
                Prompt
              </button>
              <button
                className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => setActiveTab("tab2")}
              >
                Macchina a Stati
              </button>
            </div>
            <div className="tab-content">
              {activeTab === "tab1" && (
                <div className="tab-content-pane">
                  <div className="code-container">
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(promptContent)}
                    >
                      {copyStatus}
                    </button>
                    <pre className="prompt-content">{promptContent}</pre>
                  </div>
                </div>
              )}
              {activeTab === "tab2" && (
                <SyntaxHighlighter
                  language="javascript"
                  style={a11yDark}
                  customStyle={{ margin: 0, borderRadius: "0 0 4px 4px" }}
                >
                  {fsmContent}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
