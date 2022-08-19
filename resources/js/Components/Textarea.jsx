import React, { useEffect, useRef } from "react";

export default function Textarea({
  name,
  value,
  className,
  required,
  handleChange,
  options,
}) {
  return (
    <div className="flex flex-col items-start">
      <textarea
        name={name}
        onChange={handleChange}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 w-full h-32 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
      ></textarea>
    </div>
  );
}
