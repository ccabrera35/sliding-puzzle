import { useState } from "react";
import { Board } from "./components/Board";
import { formatTime, updateURLParameter } from "./utils";
import { Nav } from "./components/Nav";
import { useGame } from "./hooks/useGameConfig";
import { initialUrl } from "./lib/constants";

export const App = () => {
  const [imgUrl, setImgUrl] = useState(initialUrl);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImgUrl(e.target.value);
  //   window.history.replaceState(
  //     "",
  //     "",
  //     updateURLParameter(window.location.href, "img", e.target.value)
  //   );
  // };

  return (
    <>
      <Nav />
      <div className="grid place-items-center h-screen  bg-light-yellow">
        <p className="bg-white border-cyan-500 font-mono border-4 p-2 rounded-lg mx-1 text-off-blue font-medium hover:bg-slate-50">
          Time Elapsed: {formatTime(useGame().seconds)}
        </p>
        <Board imgUrl={imgUrl} onChangeImg={setImgUrl} />

        {/* TODO: Implement random images (using 1x1 aspect ratio) */}
        {/* <div className="flex flex-col items-center gap-y-2">
          <label htmlFor="image">Random image</label>
          <input
            name="image"
            type="url"
            id="url"
            className="rounded border border-light-salmon p-1"
            placeholder="Insert image"
            value={imgUrl}
            onChange={handleImageChange}
          />
        </div> */}
      </div>
    </>
  );
};
