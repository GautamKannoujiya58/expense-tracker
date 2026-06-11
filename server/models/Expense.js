const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        paymentMethod: {
            type: String,
        },

        notes: {
            type: String,
        },

        expenseDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Expense",
    expenseSchema
);