import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function ExpensePieChart({
  expenses,
}) {

  const categoryData = {};

  expenses.forEach(
    (expense) => {

      categoryData[
        expense.category
      ] =
        (categoryData[
          expense.category
        ] || 0)
        + expense.amount;
    }
  );

  const chartData =
    Object.keys(
      categoryData
    ).map(
      (category) => ({
        name: category,
        value:
          categoryData[
            category
          ],
      })
    );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <PieChart
       width={300}
  height={250}
    >

      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
      >

        {chartData.map(
          (
            entry,
            index
          ) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index %
                    COLORS.length
                ]
              }
            />
          )
        )}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>
  );
}

export default ExpensePieChart;