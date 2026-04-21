import { rateLimit } from "./rate-limit";

export const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});
