import React from "react";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";

export default function FormGroup({ children, error }) {
  return (
    <div className="px-1 py-2 w-full">
      {children}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

FormGroup.Label = ({ children }) => {
  return <Label>{children}</Label>;
};
FormGroup.Control = ({
  name,
  value,
  handleChange,
  className,
  type = "text",
  required,
  autoComplete,
  error,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={
        `border-gray-300 focus:border-indigo-300 w-full ${
          error ? "border-red-400" : ""
        } focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
        className
      }
      autoComplete={autoComplete}
      required={required}
      onChange={(e) => handleChange(name, e.target.value)}
    />
  );
};
FormGroup.Select = ({
  name,
  value,
  handleChange,
  className,
  required,
  options,
}) => {
  return (
    <select
      className={`border-gray-300 w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm
      ${className}`}
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
      required={required}
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
  );
};
FormGroup.Textarea = ({ name, value, handleChange, className, required }) => {
  return (
    <textarea
      className={`border-gray-300 w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm
      ${className}`}
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
      required={required}
      rows={5}
    ></textarea>
  );
};
FormGroup.Image = ({ name, value, handleChange, className, required }) => {
  return (
    <div className="flex item-center mt-2">
      <div
        className="px-2 py-1 text-gray-900 rounded-lg border border-gray-900 cursor-pointer flex gap-2 items-center"
        onClick={() => handleChange()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
          <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
        </svg>
        Ajoutez des images
      </div>
    </div>
  );
};
