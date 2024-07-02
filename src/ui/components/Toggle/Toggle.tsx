import React from 'react'

/**
 * Props for the Toggle component
 */
interface ToggleProps {
  /**
   * The label for the toggle switch
   */
  label: string
  /**
   * The ID for the toggle switch
   */
  id: string
  /**
   * Whether the toggle switch is checked
   */
  checked: boolean
  /**
   * The function to call when the toggle switch changes
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * @name Toggle
 * @description A toggle switch component.
 */
const Toggle: React.FC<ToggleProps> = ({label, id, checked, onChange}) => {
  return (
    <div className="switch">
      <input
        className="switch__toggle"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className="switch__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default Toggle
