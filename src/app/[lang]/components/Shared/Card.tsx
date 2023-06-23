import React from 'react'

interface CardProps {
    children?: React.ReactNode,
    bgColor?: string,
    padding?: string,
    shadow?: string,
    styleClass?: string
}

const Card: React.FC<CardProps> = ({children, bgColor, padding, shadow, styleClass}) => {
  return (
    <div className={`${bgColor ? bgColor : 'bg-white'} ${padding ? padding : 'px-4 py-6'} ${shadow ? shadow : 'shadow-md'} ${styleClass}`}>
        {children}
    </div>
  )
}

export default Card