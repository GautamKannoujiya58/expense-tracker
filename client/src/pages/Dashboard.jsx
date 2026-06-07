import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpensePieChart
from "../components/ExpensePieChart";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [dashboardData,
    setDashboardData] =
    useState(null);

  const [expenses,
    setExpenses] =
    useState([]);

    const [searchTerm,
  setSearchTerm] =
  useState("");

  const [selectedCategory,
  setSelectedCategory] =
  useState("All");

  const fetchDashboard =
    async () => {

      try {

        const response =
          await api.get(
            "/dashboard"
          );

        setDashboardData(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const fetchExpenses =
    async () => {

      try {

        const response =
          await api.get(
            "/expenses"
          );

        setExpenses(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchDashboard();
    fetchExpenses();
  }, []);

  const deleteExpense =
    async (id) => {

      try {

        await api.delete(
          `/expenses/${id}`
        );

        fetchDashboard();

        fetchExpenses();

      } catch (error) {

        console.log(error);
      }
    };

  const editExpense =
    async (expense) => {

      const newTitle =
        prompt(
          "Enter title",
          expense.title
        );

      const newAmount =
        prompt(
          "Enter amount",
          expense.amount
        );

      if (
        !newTitle ||
        !newAmount
      ) {
        return;
      }

      try {

        await api.put(
          `/expenses/${expense._id}`,
          {
            title: newTitle,
            amount: Number(
              newAmount
            ),
            category:
              expense.category,
          }
        );

        fetchDashboard();

        fetchExpenses();

      } catch (error) {

        console.log(error);
      }
    };

  const filteredExpenses =
  expenses.filter(
    (expense) => {

      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory ===
          "All" ||
        expense.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">

        <h1 className="text-4xl text-gray-800">
          Expense Tracker
        </h1>

        <p className="text-gray-700 mt-2 text-lg">
          Welcome {user?.name}
        </p>
        
        <button
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 cursor-pointer transition  "
>
  Logout
</button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">

         <h3 className="text-gray-700 font-medium">
            Total Expenses
          </h3>

          <p className="text-4xl font-bold mt-2 text-blue-600">
            ₹{
              dashboardData
                ?.totalExpenses || 0
            }
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-gray-700 font-medium">
            Monthly Expenses
          </h3>

          <p className="text-4xl font-bold mt-2 text-blue-600">
            ₹{
              dashboardData
                ?.monthlyExpenses || 0
            }
          </p>

        </div>


      </div>
      <div className="bg-white p-6 rounded-xl shadow mb-6">

  <h2 className="text-xl font-semibold mb-4">
    Expense Categories
  </h2>

  <ExpensePieChart
    expenses={expenses}
  />

</div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <ExpenseForm
          onExpenseAdded={() => {
            fetchDashboard();
            fetchExpenses();
          }}
        />

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <div className="flex flex-col md:flex-row gap-4 mb-4">

          <input
            type="text"
            placeholder="Search Expense"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="border border-gray-400 rounded-lg px-3 py-2 text-gray-900 cursor-pointer"
          >
            <option value="All">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Bills">
              Bills
            </option>
          </select>

        </div>

        <ExpenseTable
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={editExpense}
        />

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h3>

        <ul className="space-y-2">

          {dashboardData
            ?.recentTransactions
            ?.map(
              (expense) => (
                <li
                  key={expense._id}
                  className="border-b pb-2"
                >
                  {expense.title}
                  {" - ₹"}
                  {expense.amount}
                </li>
              )
            )}

        </ul>

      </div>

    </div>

  </div>
);
}

export default Dashboard;