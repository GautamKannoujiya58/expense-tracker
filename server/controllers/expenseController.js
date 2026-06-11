const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
    try {

        const {
            title,
            amount,
            category,
            paymentMethod,
            notes,
            expenseDate,
        } = req.body;

        const expense =
            await Expense.create({
                userId: req.user._id,
                title,
                amount,
                category,
                paymentMethod,
                notes,
                expenseDate,
            });

        res.status(201).json(expense);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user._id,
        }).sort({
            expenseDate: -1,
        });

        res.json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getExpenseById = async (
    req,
    res
) => {
    try {

        const expense =
            await Expense.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.json(expense);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateExpense = async (
    req,
    res
) => {
    try {

        const expense =
            await Expense.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        const updatedExpense =
            await Expense.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        res.json(updatedExpense);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteExpense = async (
    req,
    res
) => {
    try {

        const expense =
            await Expense.findOne({
                _id: req.params.id,
                userId: req.user._id,
            });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        await expense.deleteOne();

        res.json({
            message: "Expense deleted",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};