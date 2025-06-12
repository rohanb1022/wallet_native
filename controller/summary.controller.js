import { sql } from "../config/db.js"

export const  getSummary = async (req , res) => {
    try {
        const {userId} = req.params;

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount) , 0) as balance FROM transactions WHERE user_id = ${userId} 
        `
        
        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount) , 0) as income FROM transactions
         WHERE user_id = ${userId} AND amount > 0
        `

        const expenseResult = await sql`
        SELECT  COALESCE(SUM(amount) , 0) as expense FROM transactions
         WHERE user_id = ${userId} AND amount < 0
        `

        return res.status(200).json({
            balance : balanceResult[0].balance,
            income :  incomeResult[0].income,
            expense : expenseResult[0].expense,
        })

    } catch (error) {
        return res.status(500).json({message : "Internal Server error" + error})
    }
}
