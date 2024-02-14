import { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { updateURLParameter } from "./utils";
import { usePersistedState } from "./hooks";

export const App = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [showNumbers, setShowNumbers] = usePersistedState("showNumbers", true);

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
    <div className="grid place-items-center h-[100vh]">
      <h1 className="m-0">React sliding puzzle</h1>
      <Board showNumbers={showNumbers} imgUrl={imgUrl} />
      <label htmlFor="image">Custom image</label>
      <input
        name="image"
        className="border border-black rounded"
        value={imgUrl}
        onChange={handleImageChange}
      />
      <label htmlFor="show-numbers">Display numbers?</label>
      <input
        name="show-numbers"
        defaultChecked={showNumbers}
        onChange={(e) => {
          console.log("e", e.target.checked);
          setShowNumbers(e.target.checked);
        }}
        type="checkbox"
      />
    </div>
  );
};
