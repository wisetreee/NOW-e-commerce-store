"use client"
import Image from 'next/image';
import React from 'react'

interface IconButtonProps {
  src: string;
  theme?: "light" | "dark";
  onClick?: () => void;
  width?: number;
  height?: number;
}

const IconButton: React.FC <IconButtonProps> = ({ src, theme, onClick, width, height }) => {
  return (
    <button onClick={onClick}>
        <Image 
            className={
            theme == "dark" ?
            // TODO: сделать так, чтобы при выборе темной темы выбирались разные иконки
                    "hover:brightness-75 transition " : 
                    "hover:brightness-75 transition "}
            src={src} 
            width={width? width : 24} 
            height={height ? height : 24} 
            alt="" />
    </button>
  )
}

export default IconButton