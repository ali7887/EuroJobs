export function GET() {
  return Response.json({
    openai: process.env.OPENAI_API_KEY ? "loaded" : "missing",
  });
}
