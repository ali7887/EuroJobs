// Ultra‑Fast In‑Memory Rate Limiter (Edge‑Compatible)
// Ali — حرفه‌ای ترین نسخه برای Next.js 15

type RateLimitOptions = {
  windowMs: number;   // Example: 60000 = 1 minute
  max: number;        // Example: 10 requests
  keyGenerator?: (req: Request) => string;
};

const store = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(options: RateLimitOptions) {
  return (req: Request) => {
    const key =
      options.keyGenerator?.(req) ||
      req.headers.get("x-forwarded-for") ||
      "anonymous";

    const now = Date.now();

    const entry = store.get(key);

    if (!entry) {
      store.set(key, {
        count: 1,
        expiresAt: now + options.windowMs,
      });
      return;
    }

    if (entry.expiresAt < now) {
      // Reset window
      store.set(key, {
        count: 1,
        expiresAt: now + options.windowMs,
      });
      return;
    }

    entry.count++;

    if (entry.count > options.max) {
      throw new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
        }),
        { status: 429 }
      );
    }
  };
}
