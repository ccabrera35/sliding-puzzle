import { useState } from "react";
import { Board } from "./components/Board";
import { formatTime, updateURLParameter } from "./utils";
import { Nav } from "./components/Nav";
import { useGame } from "./hooks/useGameConfig";
import { initialUrl } from "./lib/constants";

export const App = () => {
  const [imgUrl, setImgUrl] = useState(initialUrl);
  // console.log('initialUrl', initialUrl);
  // console.log('imgUrl', imgUrl);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   if (urlParams.has("img")) {
  //     console.log('urlParams', urlParams);
  //     console.log("has img")
  //     setImgUrl(urlParams.get("img") as string);
  //   }
  // }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target.value);
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", e.target.value)
    );
  };

  //  <h1 className="m-0">Sliding puzzle</h1>

  return (
    <>
      <Nav />
      <div className="grid place-items-center h-screen bg-yellow-light">
        <p className="m-0">Time Elapsed - {formatTime(useGame().seconds)}</p>
        {/* <div className="flex flex-col justify-center items-center gap-y-10 border-2"> */}
        <Board imgUrl={imgUrl} />
        {/* </div> */}
        <div className="flex flex-col items-center gap-y-2">
          <label htmlFor="image">Custom image</label>
          <input
            name="image"
            type="url"
            id="url"
            className="rounded border border-salmon-light p-1"
            placeholder="Insert image"
            value={imgUrl}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
};
