export async function GET() {
  return Response.json({
    ok: true,
    status: "online",
    timestamp: new Date().toISOString(),
  });
}
