import { Client } from "pg";

export default async function handler(req, res) {
  const { slug } = req.query;

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
            SELECT 
                v.*, 
                json_agg(DISTINCT c.name) AS categories,
                json_agg(DISTINCT t.name) AS types
            FROM volunteering v
            LEFT JOIN volunteer_category vc ON v.id = vc.volunteer_id
            LEFT JOIN categories c ON vc.category_id = c.id
            LEFT JOIN volunteer_type_map vtm ON v.id = vtm.volunteer_id
            LEFT JOIN volunteer_types t ON vtm.type_id = t.id
            WHERE v.slug = $1
            GROUP BY v.id;
        `;
    const values = [slug];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Volunteer opportunity not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
}