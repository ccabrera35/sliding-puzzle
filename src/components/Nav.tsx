import { FC, useState } from "react";
import { useGame } from "../hooks/useGameConfig";

export const Nav: FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNumbers, setShowNumbers, setSize, size } = useGame();

  return (
    <nav className="flex sticky top-0 z-10 p-4 h-14 text-white bg-slate-500">
      <button
        className="text-lg"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        🍔
      </button>
      {isOpen && (
        <div className="absolute left-0 top-14 w-full h-screen bg-slate-500">
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
            <li>
              <button
                onClick={() => {
                  setSize(3);
                }}
              >
                3x3
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSize(4);
                }}
              >
                4x4
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSize(5);
                }}
              >
                5x5
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
