import { FC, useEffect, useState } from "react";
import { Tile } from "./Tile";
import { BOARD_SIZE } from "../constants";
import { canSwap, shuffle, swap, isSolved } from "../utils";
import { useGame } from "../hooks/useGameConfig";

type BoardProps = {
  imgUrl: string;
};

export const Board: FC<BoardProps> = ({ imgUrl }) => {
  const { showNumbers, size, setSeconds, seconds } = useGame();
  const [tiles, setTiles] = useState([...Array(size * size).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hasWon = isSolved(tiles);

  useEffect(() => {
    setTiles([...Array(size * size).keys()]);
    setIsStarted(false);
    setSeconds(0);
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStarted && !hasWon && !isPaused) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isStarted, hasWon, isPaused]);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex: number) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1), size)) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index: number) => {
    if (isStarted && !isPaused) {
      swapTiles(index);
    }
  };

  const handleShuffleClick = () => {
    shuffleTiles();
    setSeconds(0);
    setIsPaused(false);
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const handlePausedClick = () => {
    setIsPaused(!isPaused);
  };

  const pieceWidth = Math.round(BOARD_SIZE / size);
  const pieceHeight = Math.round(BOARD_SIZE / size);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  const buttonText = isStarted ? "Restart Game" : "Start Game";
  const startBtnText = isStarted && isPaused ? "Unpause" : "Pause";

  return (
    <>
      <div className="border-4 border-salmon shadow-md shadow-salmon-light">
        <ul style={style} className="relative p-0 bg-salmon-light">
          {tiles.map((tile, index) => (
            <Tile
              className={`${
                isStarted && !isPaused ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              handleTileClick={handleTileClick}
              height={pieceHeight}
              imgUrl={imgUrl}
              index={index}
              key={tile}
              showNumbers={showNumbers}
              tile={tile}
              width={pieceWidth}
            />
          ))}
        </ul>
      </div>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      <div className="flex items-center justify-center gap-x-4">
        <button
          onClick={() => {
            if (isStarted) {
              handleShuffleClick();
            } else {
              handleStartClick();
            }
          }}
        >
          {buttonText}
        </button>
        {isStarted && (
          <button value={isPaused} onClick={handlePausedClick}>
            {startBtnText}
          </button>
        )}
      </div>
    </>
  );
};
