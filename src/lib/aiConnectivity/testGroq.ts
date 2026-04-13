// src/lib/aiConnectivity/testGroq.ts

import { ConnectivityResult } from "./types";

export async function testGroq(apiKey?: string): Promise<ConnectivityResult> {
  const result: ConnectivityResult = {
    service: "Groq API",
    ok: false,
    reachable: false,
    dnsResolved: false,
  };

  if (!apiKey) {
    result.networkError = "GROQ_API_KEY not provided";
    return result;
  }

  try {
    const url = "https://api.groq.com/openai/v1/models";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    result.status = response.status;
    result.reachable = true;
    result.dnsResolved = true;
    result.ok = response.ok;

    const text = await response.text();
    result.bodySnippet = text.slice(0, 500);

    return result;
  } catch (err: any) {
    if (err.code === "ENOTFOUND") result.dnsResolved = false;
    else result.dnsResolved = true;

    result.networkError = err.message;
    return result;
  }
}
