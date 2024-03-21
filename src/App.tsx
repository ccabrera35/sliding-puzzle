import { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { formatTime, updateURLParameter } from "./utils";
import { Nav } from "./components/Nav";
import { useGame } from "./hooks/useGameConfig";

export const App = () => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img") as string);
    }
  }, []);

  const handleImageChange = (e) => {
    setImgUrl(e.target.value);
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", e.target.value)
    );
  };

  return (
    <>
      <Nav />
      <div className="grid place-items-center h-screen">
        <h1 className="m-0">Sliding puzzle</h1>
        <p className="m-0">Time Elapsed - {formatTime(useGame().seconds)}</p>
        <Board imgUrl={imgUrl} />
        <label htmlFor="image">Custom image</label>
        <input
          name="image"
          className="rounded border border-black"
          value={imgUrl}
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};
