import { FC, useState } from "react";
import { useGame } from "../hooks/useGameConfig";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../hooks/useThemeConfig";

const containerVariants = {
  open: { opacity: 1, y: "0" },
  closed: { opacity: 0, y: "-100%", maxHeight: "0" },
};

export const Nav: FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNumbers, setShowNumbers, setSize, possibleSizes } = useGame();
  const { theme } = useTheme();

  const menuStyle = {
    height: "calc(100vh - 3rem)",
    boxShadow: theme === "dark" ?
      "10px 0 15px -3px rgba(45, 50, 80, 0.9)" : "3px 0 10px -1px rgba(50, 100, 200, 0.9)"
  };

  const handleSizeOptionClick = (dimension: number) => {
    setSize(dimension);
    setIsOpen(false);
  };

  return (
    <nav
      className={`flex items-center sticky top-0 z-10 p-4 h-12 text-white bg-salmon dark:bg-[#2D3250] ${
        isOpen
          ? "border-transparent"
          : "border-dark-salmon dark:border-[#2f3452] border-b-2 shadow-md"
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
          className={`flex flex-col items-center absolute text-lg left-0 top-12 w-72 h-screen border-r-2 border-r-[#6aa4f4] bg-[#6aa4f4]/90 dark:border-r-[#2D3250] dark:bg-[#2D3250]/90`}
          animate={isOpen ? "open" : "closed"}
          initial={{ x: 0, y: -5, opacity: 0 }}
          style={menuStyle}
          transition={{ ease: "easeInOut", duration: 2, type: "spring" }}
          variants={containerVariants}
        >
          <a href={import.meta.env.VITE_CANONICAL_URL} className="mb-6 mt-4 flex items-center justify-center gap-4 leading-none h-12 text-xl hover:bg-[#e8e8e8]/10 rounded-lg w-11/12 cursor-pointer">
          <FontAwesomeIcon icon={faHouse}/>
            <span className="text-3xl font-medium font-mono">Home</span>
            </a>
          <motion.ul className="flex flex-col gap-4 mt-4 justify-center items-center w-11/12 center py-3 bg-[#e8e8e8]/20 rounded-lg">
            <motion.li 
            className="hover:bg-[#6aa4f4] text-peach dark:hover:bg-peach/90 dark:hover:text-white dark:text-[#d7e6fa] w-60 h-12 rounded-md font-mono flex items-center justify-center cursor-pointer">
              Show Numbers&nbsp;
              <input
                name="show-numbers"
                defaultChecked={showNumbers}
                onChange={(e) => {
                  setShowNumbers(e.target.checked);
                }}
                type="checkbox"
                className="cursor-pointer"
              />
            </motion.li>
            {possibleSizes.map((dimension) => (
              <motion.li
                key={dimension}
                className="hover:bg-[#6aa4f4] hover:text-white text-peach dark:hover:bg-peach/90 dark:hover:text-white dark:text-peach font-mono w-60 rounded-md h-12 flex items-center justify-center tracking-widest cursor-pointer"
                onClick={() => handleSizeOptionClick(dimension)}
              >
                {dimension}x{dimension}
              </motion.li>
            ))}
          </motion.ul>
          <ThemeSwitch />
        </motion.div>
      )}
    </nav>
  );
};
