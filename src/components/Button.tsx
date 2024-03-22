

type ButtonProps = {
  onBtnClick: () => void;
  isOpen: boolean;
};

export const Button = ({onBtnClick, isOpen}: ButtonProps) => {

  return (
    <button
      onClick={() => {
        onBtnClick()
      }}
      className="flex flex-col justify-center items-center"
    >
      <span
        className={`bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                      }`}
      />
      <span
        className={`bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm my-0.5 ${
                        isOpen ? "opacity-0" : "opacity-100"
                      }`}
      />
      <span
        className={`bg-peach block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${
                        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                      }`}
      />
    </button>
  );
};
