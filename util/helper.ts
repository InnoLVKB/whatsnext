import db from '../lib/db'

export async function getJournal() {
    const result = await db.query(`SELECT * from journal_entries LIMIT 1`)
    // const result = query()
    console.log(result)
    // const users = [{ name: "brian" }, { name: "vardan" }, { name: "lisa" }]
    return result.rows
}