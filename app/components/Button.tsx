"use client"

interface ButtonProps {
    width?: string,
    height?: string,
    text: string,
    onClick?: () => void;
    theme?: "primary" | "secondary";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ width = "auto", height = "auto", onClick, text, theme = "secondary", disabled = false }) => {
  return (
    <button disabled={disabled} className={
      disabled ? "bg-content_2 text-content_4 py-4 px-4 font-medium ease-in-out duration-300" :
        theme == "primary" ?
            "bg-content_1 text-white py-4 px-4 font-medium outline outline-4 outline-white hover:bg-accent_1 ease-in-out duration-300" : 
            "bg-content_1 text-white py-4 px-4 hover:bg-accent_1 font-medium ease-in-out duration-300"}
            onClick={onClick}
            style={{
                width: width,
                height: height,
              }}
            >
        {text}
    </button>
  );
};

export default Button;