import { useState } from "react";
import { Board } from "./components/Board";
import { formatTime } from "./utils";
import { Nav } from "./components/Nav";
import { useGame } from "./hooks/useGameConfig";
import { initialUrl } from "./lib/constants";

export const App = () => {
  const [imgUrl, setImgUrl] = useState(initialUrl);

  return (
    <div className="min-h-screen bg-light-yellow">
      <Nav />
      <div className="grid place-items-center py-4 gap-4 h-full">
        <p className="bg-white border-cyan-500 font-mono border-4 p-2 rounded-lg mx-1 text-off-blue font-medium hover:bg-slate-50">
          Time Elapsed: {formatTime(useGame().seconds)}
        </p>
        <Board imgUrl={imgUrl} onChangeImg={setImgUrl} />
      </div>
    </div>
  );
};
