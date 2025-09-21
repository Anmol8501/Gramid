import { dbFind, dbInsert } from "@/lib/dbConnect";

// Handle GET requests (fetch users)
export async function GET() {
  try {
    const users = await dbFind("users");
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// Handle POST requests (insert user)
export async function POST(req) {
  try {
    const body = await req.json();
    const result = await dbInsert("users", body);
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
