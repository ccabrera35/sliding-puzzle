import { FC, useState } from "react";
import { Tile } from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "../constants";
import { canSwap, shuffle, swap, isSolved } from "../utils";

type BoardProps = {
  imgUrl: string;
  showNumbers?: boolean;
};

export const Board: FC<BoardProps> = ({ imgUrl, showNumbers }) => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex: number) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index: number) => {
    if (isStarted) {
      swapTiles(index);
    }
  };

  const handleShuffleClick = () => {
    shuffleTiles();
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  const hasWon = isSolved(tiles);

  const buttonText = isStarted ? "Restart Game" : "Start Game";

  return (
    <>
      <ul style={style} className="relative p-0">
        {tiles.map((tile, index) => (
          <Tile
            className={isStarted ? "cursor-pointer" : "cursor-not-allowed"}
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
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
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
    </>
  );
};
