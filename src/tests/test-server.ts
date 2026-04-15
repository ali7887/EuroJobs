import { createServer, type Server } from "http";
import next from "next";

let server: Server | null = null;

export async function getTestServer(): Promise<Server> {
  if (server) return server;

  const app = next({ dev: false });
  const handle = app.getRequestHandler();

  await app.prepare();

  server = createServer((req, res) => handle(req, res));
  return server;
}
