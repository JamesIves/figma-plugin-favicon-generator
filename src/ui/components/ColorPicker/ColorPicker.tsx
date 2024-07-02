import React from 'react'

/**
 * Props for the ColorPicker component
 */
interface ColorPickerProps {
  /**
   * The label for the color picker
   */
  label: string
  /**
   * The ID for the color picker
   */
  id: string
  /**
   * The value for the color picker
   */
  value: string
  /**
   * The function to call when the color picker changes
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * @name ColorPicker
 * @description Displays a color picker input field with a label.
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  onChange,
  value,
  id
}) => {
  return (
    <div className="input flex">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        type="color"
        className="p-1 h-full w-full block cursor-pointer rounded-lg"
        id={id}
        value={value}
        title={label}
        onChange={onChange}
      />
    </div>
  )
}

export default ColorPicker
