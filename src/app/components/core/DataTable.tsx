import React, { ReactElement } from 'react';

export default function DataTable<T>(props: {
  columns: {
    name: string;
    selector?: (row: T) => any;
    children?: (row: T) => ReactElement<{ row: T }>;
  }[];
  data: T[];
}) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {props.columns.map((col, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr
            key={index}
            className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-700 border-b"
          >
            {props.columns.map((col, cIndex) => {
              if (col.children) {
                return col.children(row);
              } else if (col.selector) {
                return (
                  <td key={cIndex} className="px-6 py-4">
                    {col.selector(row)}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
