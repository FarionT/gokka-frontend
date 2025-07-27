import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import './Button.scss';

type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className?: string
  children?: ReactNode
  onClick?: (event: React.MouseEvent) => void
}

const Button: React.FC<TButton> = ({
  className,
  children,
  onClick
}) => {
  return (
    <button className={`${className ?? ''} button`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;