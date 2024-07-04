import React from 'react'

/**
 * Props for the TextInput component
 */
interface TextInputProps {
  /**
   * The label for the input field
   */
  label: string
  /**
   * The ID for the input field
   */
  id: string
  /**
   * The value for the input field
   */
  value: string
  /**
   * The placeholder for the input field
   */
  placeholder: string
  /**
   * The function to call when the input field changes
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * @name TextInput
 * @description A text input field with a label.
 */
const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  value,
  placeholder,
  onChange
}) => {
  return (
    <div className="input flex">
      <label className="label !text-black-8" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="input__field transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextInput
