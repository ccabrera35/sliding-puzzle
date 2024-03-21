import { useContext } from "react";
import { GameConfig } from "../context/GameContext";

export const useGame = () => {
  return useContext(GameConfig);
};
