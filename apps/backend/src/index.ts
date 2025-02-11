import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// CORSの設定
app.use("/*", cors());

// Ping API
app.get("/ping", (c) => {
  return c.json({
    message: "pong",
    timestamp: new Date().toISOString(),
  });
});

// サーバーの起動
const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
}); 
