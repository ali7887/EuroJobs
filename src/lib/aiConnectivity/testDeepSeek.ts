// src/lib/aiConnectivity/testDeepSeek.ts

import { ConnectivityResult } from "./types";

export async function testDeepSeek(apiKey?: string): Promise<ConnectivityResult> {
  const result: ConnectivityResult = {
    service: "DeepSeek API",
    ok: false,
    reachable: false,
    dnsResolved: false,
  };

  if (!apiKey) {
    result.networkError = "DEEPSEEK_API_KEY not provided";
    return result;
  }

  try {
    const url = "https://api.deepseek.com/models";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
