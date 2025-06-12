import { sql } from "../config/db.js";

export const addTransaction = async (req, res) => {
    try {
        
        const {title , amount ,category , user_id } = req.body;
        if(!title || !category || !user_id || amount == 'undefined'){
            return res.status(400).json({message:"pura information dal bhai"})
        }

        const transaction = await sql`
        INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `
        return res.status(201).json({message : "done hogaya bhai yakeen karrrr hogaya!!!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server error"})
    }
}

export const getAllTransaction = async (req, res) => {
    try {
        const {userId} = req.params;

        const transaction = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`

        res.status(200).json(transaction)
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error" + error})
    }
}

export const deleteTransation = async (req, res) => {
    try {
        const {id} = req.params;
        
        const result = await sql`
        DELETE FROM transactions WHERE id = ${id} RETURNING *`

        if(result.length === 0){
            return res.status(204).json({message:"Nothing to return no id found in db"})
        }

        return res.status(201).json(result)

    } catch (error) {
        return res.status(500).json({message:"Internal Server error" + error})
    }
}