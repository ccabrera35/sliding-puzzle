import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { usePersistedState } from "../hooks";

type GameConfigType = {
  showNumbers: boolean;
  setShowNumbers: Dispatch<SetStateAction<boolean>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  possibleSizes: Array<number>;
};

export const GameConfig = createContext<GameConfigType>({
  showNumbers: true,
  setShowNumbers: () => {},
  size: 3,
  setSize: () => {},
  seconds: 0,
  setSeconds: () => {},
  possibleSizes: [3, 4, 5, 6, 7],
});

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showNumbers, setShowNumbers] = usePersistedState("showNumbers", true);
  const [size, setSize] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const possibleSizes = [3, 4, 5, 6, 7];

  return (
    <GameConfig.Provider
      value={{
        showNumbers,
        setShowNumbers,
        size,
        setSize,
        seconds,
        setSeconds,
        possibleSizes,
      }}
    >
      {children}
    </GameConfig.Provider>
  );
};
