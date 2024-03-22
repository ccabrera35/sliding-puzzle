import { FC, useState } from "react";
import { useGame } from "../hooks/useGameConfig";
import { Button } from "./Button";
import { motion } from "framer-motion";

const containerVariants = {
  open: { opacity: 1, y: "0", maxHeight: "250px" },
  closed: { opacity: 0, y: "-100%", maxHeight: "0" },
};

export const Nav: FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNumbers, setShowNumbers, setSize, possibleSizes } = useGame();

  const menuStyle = {
    height: "auto",
    borderBottom: "2px solid #f8c6a0",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  };

  const handleSizeOptionClick = (dimension: number) => {
    setSize(dimension);
    setIsOpen(false);
  };

  return (
    <nav
      className={`flex items-center sticky top-0 z-10 p-4 h-12 text-white bg-salmon ${
        isOpen
          ? "border-transparent"
          : " border-dark-salmon border-b-2 shadow-md"
      }`}
    >
      <div className="relative flex items-center justify-center w-full">
        <Button
          isOpen={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <h1 className="font-mono">Sliding Puzzle</h1>
      </div>
      {isOpen && (
        <motion.div
          className={`absolute left-0 top-12 w-full bg-peach`}
          animate={isOpen ? "open" : "closed"}
          initial={{ x: 0, y: -5, opacity: 0 }}
          style={menuStyle}
          transition={{ ease: "easeInOut", duration: 1, type: "spring" }}
          variants={containerVariants}
        >
          <motion.ul className="flex flex-col gap-4 justify-center items-center w-full py-3">
            <motion.li className="hover:bg-dark-peach text-off-blue font-mono w-full flex justify-center">
              Show Numbers&nbsp;
              <input
                name="show-numbers"
                defaultChecked={showNumbers}
                onChange={(e) => {
                  setShowNumbers(e.target.checked);
                }}
                type="checkbox"
              />
            </motion.li>
            {possibleSizes.map((dimension) => (
              <motion.li
                key={dimension}
                className="hover:bg-dark-peach text-off-blue font-mono w-full flex justify-center "
                onClick={() => handleSizeOptionClick(dimension)}
              >
                {dimension}x{dimension}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
};
