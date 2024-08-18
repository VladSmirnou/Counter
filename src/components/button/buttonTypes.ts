import { ButtonHTMLAttributes } from 'react';

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  callBack: () => void
}
