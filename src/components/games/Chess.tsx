import { Chess, ChessInstance, Square } from "chess.js";
import { useState, useRef, useEffect, useContext } from "react";
import ChessBoard from "chessboardjsx";
import { GarrisonContext } from "../../App";

let capturedWhitePieces: string[] = [];
let capturedBlackPieces: string[] = [];

export const ChessPage = () => {
  const {
    walletConnected,
    connectWallet,
    staked,
    setStaked,
    stakeGame,
    stakeAmount,
    setStakeAmount,
    winBal,
    setWinBal,
    winner,
    setWinner,
    win,
    setWin,
    category,
  } = useContext(GarrisonContext);
  console.log(category);
  const [chessStarted, setChessStarted] = useState(false);
  const [fen, setFen] = useState("start");

  let game = useRef<ChessInstance>();

  useEffect(() => {
    game.current = new Chess();
  }, []);

  const onDrop = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
  }) => {
    let move = game.current?.move({
      from: sourceSquare,
      to: targetSquare,
    });

    if (move === null) return;
    if (game.current?.game_over()) {
      if (move?.color == "w") {
        setWinner("White");
        setWin(true);
        redeemWin();
      } else {
        setWinner("Black");
      }
    }
    if (move?.captured) {
      if (move.color == "w") {
        capturedBlackPieces.push(move.captured.toUpperCase());
        console.log(capturedBlackPieces);
      } else {
        capturedWhitePieces.push(move.captured.toUpperCase());
        console.log(capturedWhitePieces);
      }
    }
    setFen(game.current?.fen() as string);
  };
  const resetChess = () => {
    game.current?.clear();
    game.current?.reset();
    setFen("start");
  };

  const redeemWin = () => {
    resetChess();
    setStaked(false);
    setChessStarted(false);
    setWinBal((Number(winBal) + Number(stakeAmount) * 5).toString());
    setStakeAmount("0");
    window.alert("Congratulations! You just won the game!!");
  };

  return (
    <div className="flex flex-col bg-fixed bg-no-repeat bg-cover bg-gradient-to-b from-gray-500 via-orange-500 to-yellow-600 w-full min-h-screen p-3 justify-center text-white">
      <div className="flex flex-col items-center mb-3">
        {walletConnected ? (
          staked ? (
            chessStarted ? (
              <div className="flex justify-center items-center">
                <button
                  className="bg-red-500 rounded-lg p-2 text-white font-bold mr-3"
                  onClick={() => {
                    resetChess();
                    setWin(false);
                    setStakeAmount("0");
                    setStaked(false);
                    setChessStarted(false);
                    window.alert("You have quited the game.");
                  }}
                >
                  <h1>QUIT</h1>
                </button>
                <button
                  disabled
                  className="border-[3px] border-black bg-green-500 rounded-lg p-2 text-white font-bold"
                >
                  Stake: ${stakeAmount}
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  className="bg-green-500 rounded-lg p-2 font-bold text-5xl"
                  onClick={() => {
                    setChessStarted(!chessStarted);
                  }}
                >
                  PLAY
                </button>
              </div>
            )
          ) : (
            <>
              <div className="bg-red-200 justify-center content-center rounded-lg items-center mt-2 mb-5">
                <h1 className="text-center text-yellow-800 sm:text-xl pt-1 pb-3 p-2">
                  Please make a stake to play
                </h1>
              </div>
              <div>
                <form>
                  <input
                    id="stake"
                    type="number"
                    placeholder="USDT"
                    className="pl-2 pr-2 rounded-md bg-gray-500"
                  />
                  <button
                    className="bg-yellow-500 rounded-lg ml-2 p-2 font-semibold"
                    onClick={stakeGame}
                  >
                    Stake
                  </button>
                </form>
              </div>
            </>
          )
        ) : (
          <div className="justify-center items-center text-center flex flex-col w-48 ">
            <h3>please connect wallet to start</h3>
            <button
              className="bg-yellow-500 rounded-lg p-2 font-semibold border-[0.5px] border-yellow-800"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mb-3">
        {game.current && game.current.game_over() ? (
          <div className="flex flex-col items-center mb-3">
            <h1 className="font-bold">Game Over, {`${winner} wins!`}</h1>
            <button
              onClick={resetChess}
              className="bg-yellow-500 w-32 rounded-lg ml-3"
            >
              Try Again
            </button>
          </div>
        ) : (
          <span></span>
        )}

        {chessStarted && (
          <>
            <div>
              <h1>capturedWhitePieces:</h1>
              <p>{capturedWhitePieces}</p>
            </div>
            <div className="flex w-full justify-center ">
              <ChessBoard width={300} position={fen} onDrop={onDrop} />
            </div>
            <div>
              <h1>capturedBlackPieces:</h1>
              <p>{capturedBlackPieces}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
