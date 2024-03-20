/* eslint-disable react/prop-types */
function Input({ label, type, name, value, span, placeholder, onChange, required }) {
  return (
    <div className={`sm:col-span-${span}`}>
      
      <label htmlFor={name} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default Input