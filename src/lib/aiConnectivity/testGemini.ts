// src/lib/aiConnectivity/testGemini.ts

import { ConnectivityResult } from "./types";

export async function testGemini(apiKey?: string): Promise<ConnectivityResult> {
  const result: ConnectivityResult = {
    service: "Google Gemini",
    ok: false,
    reachable: false,
    dnsResolved: false,
  };

  if (!apiKey) {
    result.networkError = "GEMINI_API_KEY not provided";
    return result;
  }

  try {
    const url = "https://generativelanguage.googleapis.com/v1/models";

    const response = await fetch(url, {
      headers: {
        "x-goog-api-key": apiKey,
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
    // If DNS fails
    if (err.code === "ENOTFOUND") result.dnsResolved = false;
    else result.dnsResolved = true;

    result.networkError = err.message;
    return result;
  }
}
