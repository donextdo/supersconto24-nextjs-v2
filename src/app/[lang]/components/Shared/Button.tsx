import React, { MouseEventHandler } from 'react'

interface ButtonProps {
    disabled?: boolean,
    children?: React.ReactNode,
    styleClass?: string
    id?: any,
    type?: any,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({disabled, children, styleClass, id, type, onClick}) => {
  return (
    <button className={styleClass} id={id} type={type ? type : "button"} onClick={onClick}
                disabled={disabled}>
            {children}
    </button>
  )
}

export default Button