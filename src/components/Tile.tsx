import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "../utils";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "../constants";
import { FC } from "react";

export const Tile: FC<any> = ({
  handleTileClick,
  height,
  imgUrl,
  index,
  showNumbers,
  tile,
  width,
}) => {
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);
  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${
      (100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)
    }%`,
  };
  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="absolute list-none bg-teal-400 grid place-items-center text-xl"
          onClick={() => handleTileClick(index)}
        >
          {showNumbers && tile + 1}
        </li>
      )}
    </Motion>
  );
};
