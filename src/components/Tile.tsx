import { FC } from "react";
import { motion } from "framer-motion";
import { getMatrixPosition, getVisualPosition } from "../utils";
import { BOARD_SIZE } from "../constants";
import clsx from "clsx";
import { useGame } from "../hooks/useGameConfig";

type TileProps = {
  className?: string;
  handleTileClick: (index: number) => void;
  height: number;
  imgUrl: string;
  index: number;
  showNumbers?: boolean;
  tile: number;
  width: number;
};

export const Tile: FC<TileProps> = ({
  className,
  handleTileClick,
  height,
  imgUrl,
  index,
  showNumbers,
  tile,
  width,
}) => {
  const { size } = useGame();
  const tileCount = size * size;
  const { row, col } = getMatrixPosition(index, size);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${size})`,
    height: `calc(100% / ${size})`,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (size - 1)) * (tile % size)}% ${
      (100 / (size - 1)) * Math.floor(tile / size)
    }%`,
  };

  return (
    <motion.li
      className={clsx(
        "grid absolute place-items-center text-xl list-none bg-teal-400",
        className
      )}
      style={tileStyle}
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: visualPos.x,
        y: visualPos.y,
        opacity: tile === tileCount - 1 ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
      onClick={() => handleTileClick(index)}
    >
      {showNumbers && tile + 1}
    </motion.li>
  );
};
