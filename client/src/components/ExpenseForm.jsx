import { useState } from "react";
import api from "../services/api";

function ExpenseForm({ onExpenseAdded }) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post(
        "/expenses",
        {
          title,
          amount,
          category,
        }
      );

      setTitle("");
      setAmount("");
      setCategory("");

      onExpenseAdded();

    } catch (error) {

      console.log(error);
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >

    <h2 className="text-xl font-semibold">
      Add Expense
    </h2>

    <input
      className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Title"
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
    />

    <input
      type="number"
      className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Amount"
      value={amount}
      onChange={(e) =>
        setAmount(e.target.value)
      }
    />

    <input
      className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Category"
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    />

    <button
      type="submit"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition"
    >
      Add Expense
    </button>

  </form>
);
}

export default ExpenseForm;