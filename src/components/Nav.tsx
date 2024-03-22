import { FC, useState } from "react";
import { useGame } from "../hooks/useGameConfig";
import { Button } from "./Button";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, y: "0" },
  closed: { opacity: 0, y: "-100%" },
};

export const Nav: FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNumbers, setShowNumbers, setSize, possibleSizes } = useGame();
 
  const menuStyle = {
    height: "auto",
    // marginBottom: "5px"
  }


  const handleSizeOptionClick = (dimension: number) => {
    setSize(dimension);
    // setTimeout(() => {
    setIsOpen(false);
    // }, 500);
  };

  return (
    <nav className="flex sticky top-0 z-10 p-4 h-12 text-white bg-salmon">
      <Button
        isOpen={isOpen}
        onBtnClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      {isOpen && ( 
        <motion.div
        className={`absolute left-0 top-12 w-full bg-peach`}
        animate={isOpen ? "open" : "closed"}
        initial={{ x: 0, y: -10, opacity: 0 }}
        style={menuStyle}
        transition={{ ease: "easeInOut", duration: 1, type: "spring" }}
        variants={variants}
        >
          <ul className="flex flex-col gap-4 justify-center items-center">
            <li>Custom Image</li>
            <li className="flex gap-2">
              Show Numbers
              <input
                name="show-numbers"
                defaultChecked={showNumbers}
                onChange={(e) => {
                  setShowNumbers(e.target.checked);
                }}
                type="checkbox"
              />
            </li>
                {possibleSizes.map((dimension) => (
                  <li key={dimension} onClick={() => handleSizeOptionClick(dimension)}>{dimension}x{dimension}</li>
                ))}
            {/* <li>
              <button
                onClick={() => {
                  setSize(3);
                }}
              >
                3x3
              </button>
            </li>
            <li>
              <button onClick={handleSizeOptionClick}>4x4</button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSize(5);
                }}
              >
                5x5
              </button>
            </li> */}
          </ul>
        </motion.div>
       )}
      <h1 className="m-auto">Sliding Puzzle</h1>
    </nav>
  );
};
