// SalesTable.js
import React from 'react';

const SalesTable = ({ salesData }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Month</th>
            <th className="border-b-2 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td className="border-b p-2">{item.month}</td>
              <td className="border-b p-2">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
