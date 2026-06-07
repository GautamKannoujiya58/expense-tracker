function ExpenseTable({
  expenses,
  onDelete,
  onEdit,
}) {
  return (
    <div>

      <h2 className="text-xl font-semibold mb-4">
        All Expenses
      </h2>

      <div className="overflow-x-auto w-full">

        <table className="min-w-[700px] border-collapse">

          <thead>

            <tr className="bg-gray-200 text-gray-900">

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses?.map(
              (expense) => (
                <tr
                  key={expense._id}
                  className="border-b"
                >

                  <td className="p-3 text-gray-900 font-medium">
                    {expense.title}
                  </td>

                  <td className="p-3 text-gray-900 font-medium">
                    ₹{expense.amount}
                  </td>

                  <td className="p-3 text-gray-900 font-medium">
                    {expense.category}
                  </td>

                  <td className="p-3 text-gray-900 font-medium">

                    <button
                      onClick={() =>
                        onEdit(expense)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 cursor-pointer transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          expense._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer transition"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ExpenseTable;