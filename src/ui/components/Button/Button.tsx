import React from 'react'

/**
 * Props for the Button component
 */
interface ButtonProps {
  /**
   * The content of the button
   */
  children: React.ReactNode
  /**
   * The function to call when the button is clicked
   */
  onClick: () => void
  /**
   * Whether the button is a secondary button
   */
  isSecondary?: boolean
  /**
   * Whether the button is a destructive button
   */
  isDestructive?: boolean
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean
}

/**
 * @name Button
 * @description Displays a button element.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isSecondary,
  isDestructive,
  isDisabled
}) => {
  return (
    <button
      className={`button !transition-all ${
        isSecondary
          ? `button--secondary${isDestructive ? '-destructive' : ''}`
          : `button--primary${isDestructive ? '-destructive' : ''}`
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
