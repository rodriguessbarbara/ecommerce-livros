/* eslint-disable react/prop-types */
function Input({ label, type, name, value, span, placeholder, onChange, required, minLength, maxLength, min, max, step }) {
  return (
    <div className={`sm:col-span-${span}`}>
      
      <label htmlFor={name} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
      className={`w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 ${
        type === 'date' ? 'bg-gray-300 border-gray-400' : ''
      }`}        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default Input