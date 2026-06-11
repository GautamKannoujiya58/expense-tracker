const Expense = require("../models/Expense");

const getDashboardData = async (req, res) => {
    try {

        const expenses = await Expense.find({
            userId: req.user._id,
        });

        const totalExpenses = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
        );

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const monthlyExpenses = expenses
            .filter((expense) => {
                const expenseDate = new Date(
                    expense.expenseDate
                );

                return (
                    expenseDate.getMonth() === currentMonth &&
                    expenseDate.getFullYear() === currentYear
                );
            })
            .reduce(
                (sum, expense) =>
                    sum + expense.amount,
                0
            );

        const recentTransactions =
            await Expense.find({
                userId: req.user._id,
            })
                .sort({
                    expenseDate: -1,
                })
                .limit(5);

        res.json({
            totalExpenses,
            monthlyExpenses,
            recentTransactions,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardData,
};