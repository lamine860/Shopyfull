import React, { useEffect, useRef } from "react";

export default function Select({
  name,
  value,
  className,
  required,
  handleChange,
  options,
}) {
  return (
    <div className="flex flex-col items-start">
      <select
        className={`border-gray-300 w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm
          ${className}`}
        value={value}
        onChange={handleChange}
      >
        <option>--choisissez--</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
