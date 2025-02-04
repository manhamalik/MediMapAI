import { Client } from "pg";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false, // Required for Render-hosted databases
        },
    });   

    try {
        await client.connect();

        const query = `
            SELECT r.*, 
                   COALESCE(json_agg(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL), '[]'::json) AS categories,
                   COALESCE(json_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL), '[]'::json) AS types
            FROM resources r
            LEFT JOIN resource_category rc ON r.id = rc.resource_id
            LEFT JOIN categories c ON rc.category_id = c.id
            LEFT JOIN resource_type_map rt ON r.id = rt.resource_id
            LEFT JOIN resource_types t ON rt.type_id = t.id
            GROUP BY r.id
        `;

        const result = await client.query(query);

        // Ensure JSON fields are properly formatted
        const formattedRows = result.rows.map((row) => ({
            ...row,
            categories: Array.isArray(row.categories) ? row.categories : JSON.parse(row.categories),
            types: Array.isArray(row.types) ? row.types : JSON.parse(row.types),
        }));

        res.status(200).json(formattedRows);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await client.end();
    }
}
