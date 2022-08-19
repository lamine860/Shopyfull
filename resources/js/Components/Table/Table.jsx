import React from "react";

export default function Table({ children, className }) {
  return (
    <div className="overflow-x-auto relative  sm:rounded-lg mt-8">
      <table className={`w-full text-sm text-left text-gray-500 ${className} `}>
        {children}
      </table>
    </div>
  );
}
Table.Thead = ({ children }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
      {children}
    </thead>
  );
};

Table.Th = ({ className, children }) => {
  return <th className={`py-3 px-6 ${className}`}>{children}</th>;
};

Table.Tbody = ({ className, children }) => {
  return <tbody>{children}</tbody>;
};

Table.Td = ({ className, children }) => {
  return <td className={`py-4 px-6 ${className}`}>{children}</td>;
};
Table.Row = ({ className, children }) => {
  return <tr className={`bg-white ${className}`}>{children}</tr>;
};
