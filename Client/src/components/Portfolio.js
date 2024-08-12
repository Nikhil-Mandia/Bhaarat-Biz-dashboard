import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Portfolio = () => {
  const [items, setItems] = useState([
    { name: "Investment A", value: 5000, performance: 15 },
    { name: "Product B", value: 3000, performance: 10 },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemValue, setNewItemValue] = useState("");

  const handleAddItem = () => {
    if (newItemName && newItemValue) {
      setItems((prevItems) => [
        ...prevItems,
        { name: newItemName, value: parseFloat(newItemValue), performance: 0 },
      ]);
      setNewItemName("");
      setNewItemValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const chartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: "Portfolio Value",
        data: items.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Performance (%)",
        data: items.map((item) => item.performance),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Portfolio</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Portfolio Value Chart</h3>
        <div className="w-full h-[300px]">
          <Bar
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Item Name"
          />
          <input
            type="number"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Value"
          />
        </div>
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Portfolio Items</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-600">
                  Value: ${item.value.toFixed(2)}
                </div>
                <div className="text-gray-600">
                  Performance: {item.performance}%
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
