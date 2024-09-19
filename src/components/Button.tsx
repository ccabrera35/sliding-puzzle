import { cn } from "../utils";

type ButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const Button = ({ onClick, isOpen }: ButtonProps) => {
  return (
    <button onClick={onClick} className="absolute left-0 flex flex-col">
    
      <span
        className={cn(
          "bg-peach dark:bg-[#F6B17A] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
          isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
        )}
      />
      <span
        className={cn(
          "bg-peach dark:bg-[#F6B17A] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "bg-peach dark:bg-[#F6B17A] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
          isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
        )}
      />
    </button>
  );
};
