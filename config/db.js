import {neon} from "@neondatabase/serverless";
import "dotenv/config";

// does the connection with the neon database using the connection string in the env file
// neon is the function which we will call and pass the connection strting inside it
export const sql = neon(process.env.DATABASE_URL)

export async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("database initillised successfully");
    }catch(err){
        console.log(err)
    }
}

