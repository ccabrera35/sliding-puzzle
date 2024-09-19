import { FC, useEffect, useState } from "react";
import { Tile } from "./Tile";
import { BOARD_SIZE } from "../constants";
import { canSwap, shuffle, swap, isSolved, getRandomImage, cn } from "../utils";
import { useGame } from "../hooks/useGameConfig";

type BoardProps = {
  imgUrl: string;
  onChangeImg: (imgUrl: string) => void;
};

export const Board: FC<BoardProps> = ({ imgUrl, onChangeImg }) => {
  const { showNumbers, size, setSeconds } = useGame();
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

  const handleGenerateImgClick = () => {
    const randomImgUrl = getRandomImage(imgUrl);
    onChangeImg(randomImgUrl);
    setSeconds(0);
    setTiles([...Array(size * size).keys()]);
    setIsStarted(false);
    setIsPaused(false);
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
      <div className="border-4 border-salmon shadow-md shadow-light-salmon dark:border-[#f29345] dark:shadow-[#ffc698]">
        <ul style={style} className="relative p-0 bg-cover bg-light-salmon dark:bg-[#ffd3b0]">
          {tiles.map((tile, index) => (
            <Tile
              className={cn(
                isStarted && !isPaused ? "cursor-pointer" : "cursor-not-allowed"
              )}
              onClick={handleTileClick}
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
      {hasWon && isStarted && <div className="text-[#6aa4f4] dark:text-[#d7e6fa]">Puzzle solved 🧠 🎉</div>}
      <div className="flex self-start justify-center gap-x-4">
        <button
          className="bg-white border-[#6aa4f4] text-[#6aa4f4] hover:bg-slate-50 dark:border-[#f29345]  dark:bg-[#424769] font-mono border-2 p-1 rounded-lg dark:text-[#d7e6fa] font-small dark:hover:bg-[#585e80]"
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
          <button
            className="bg-white border-[#6aa4f4] text-[#6aa4f4] hover:bg-slate-50 dark:border-[#f29345] dark:bg-[#424769] font-mono border-2 py-1 px-2 rounded-lg dark:text-[#d7e6fa] font-small dark:hover:bg-[#585e80]"
            onClick={handlePausedClick}
          >
            {startBtnText}
          </button>
        )}
      </div>
      <button
        className="bg-red-100 self-start border-salmon text-[#6aa4f4] hover:bg-slate-50 font-mono border-2 py-1 px-2 rounded-lg dark:bg-red-400 dark:hover:bg-red-400 dark:text-[#d7e6fa] font-small hover:scale-105 duration-300"
        onClick={handleGenerateImgClick}
      >
        Generate Image
      </button>
    </>
  );
};

