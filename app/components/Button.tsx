
interface ButtonProps {
    width?: string,
    height?: string,
    text: string,
    onPress?: () => void;
    theme?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ width = "auto", height = "auto", onPress, text, theme = "secondary" }) => {
  return (
    <button className={
        theme == "primary" ?
            "bg-content_1 py-4 font-medium outline outline-4 outline-white hover:bg-accent_1 ease-in-out duration-300" : 
            "bg-content_1 py-4 font-medium"}
            onClick={onPress}
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