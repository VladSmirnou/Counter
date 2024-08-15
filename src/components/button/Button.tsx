import React, { ButtonHTMLAttributes } from 'react';


type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  callBack: () => void
}

export const Button: React.FC<ButtonPropsType> = ({
  callBack,
  children: title,
  disabled,
  className
}) => {
  return (
    <button disabled={disabled} onClick={callBack} className={className}>
      {title}
    </button>
  )
}
