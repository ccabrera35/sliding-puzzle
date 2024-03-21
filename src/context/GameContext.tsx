import { FC, PropsWithChildren, createContext, useState } from "react";
import { usePersistedState } from "../hooks";

type GameConfigType = {
  showNumbers: boolean;
  setShowNumbers: (showNumbers: boolean) => void;
  size: number;
  setSize: (size: number) => void;
};

export const GameConfig = createContext<GameConfigType>({
  showNumbers: true,
  setShowNumbers: () => {},
  size: 4,
  setSize: () => {},
});

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showNumbers, setShowNumbers] = usePersistedState("showNumbers", true);
  const [size, setSize] = useState(4);

  return (
    <GameConfig.Provider
      value={{
        showNumbers,
        setShowNumbers,
        size,
        setSize,
      }}
    >
      {children}
    </GameConfig.Provider>
  );
};
