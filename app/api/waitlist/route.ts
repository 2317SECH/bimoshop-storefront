import { NextResponse } from "next/server";

/** Relay server-side hacia el Core (VPS) -- evita CORS desde el browser y
 * mantiene CORE_API_URL fuera del bundle del cliente. Reusa el endpoint
 * POST /waitlist que ya existe en el backend (tabla waitlist_signups). */
export async function POST(request: Request) {
  let email: string;
  try {
    const body = await request.json();
    email = String(body.email ?? "");
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const coreApiUrl = process.env.CORE_API_URL;
  if (!coreApiUrl) {
    return NextResponse.json({ error: "Todavía no está disponible -- probá de nuevo más tarde." }, { status: 503 });
  }

  try {
    const res = await fetch(`${coreApiUrl}/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "No pudimos guardar tu correo. Probá de nuevo." }, { status: 502 });
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "No pudimos conectar con el servidor." }, { status: 502 });
  }
}
