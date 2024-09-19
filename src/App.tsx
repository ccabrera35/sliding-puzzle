import { useState } from "react";
import { Board } from "./components/Board";
import { formatTime } from "./utils";
import { Nav } from "./components/Nav";
import { useGame } from "./hooks/useGameConfig";
import { initialUrl } from "./lib/constants";

export const App = () => {
  const [imgUrl, setImgUrl] = useState(initialUrl);

  return (
    <div className="min-h-screen bg-light-yellow dark:bg-[#424769]" >
      <Nav />
      <div className="grid place-items-center py-4 gap-4 h-full">
        <p className="bg-white border-[#6aa4f4] text-[#6aa4f4] hover:bg-slate-50 dark:border-[#f29345]  dark:bg-[#424769] font-mono border-2 p-2 rounded-lg mx-1 dark:text-[#d7e6fa] font-medium dark:hover:bg-[#585e80]">
          Time Elapsed: {formatTime(useGame().seconds)}
        </p>
        <Board imgUrl={imgUrl} onChangeImg={setImgUrl} />
      </div>
    </div>
  );
};
