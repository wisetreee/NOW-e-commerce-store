"use client"

interface ButtonProps {
    width?: string,
    height?: string,
    text: string,
    onClick?: () => void;
    theme?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ width = "auto", height = "auto", onClick, text, theme = "secondary" }) => {
  return (
    <button className={
        theme == "primary" ?
            "bg-content_1 text-white py-4 font-medium outline outline-4 outline-white hover:bg-accent_1 ease-in-out duration-300" : 
            "bg-content_1 text-white py-4 font-medium"}
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