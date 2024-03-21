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
};

export const GameConfig = createContext<GameConfigType>({
  showNumbers: true,
  setShowNumbers: () => {},
  size: 4,
  setSize: () => {},
  seconds: 0,
  setSeconds: () => {},
});

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showNumbers, setShowNumbers] = usePersistedState("showNumbers", true);
  const [size, setSize] = useState(4);
  const [seconds, setSeconds] = useState(0);

  return (
    <GameConfig.Provider
      value={{
        showNumbers,
        setShowNumbers,
        size,
        setSize,
        seconds,
        setSeconds,
      }}
    >
      {children}
    </GameConfig.Provider>
  );
};
