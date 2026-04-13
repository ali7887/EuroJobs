// src/lib/aiConnectivity/types.ts

export interface ConnectivityResult {
  service: string;
  ok: boolean;
  status?: number;
  reachable: boolean;
  dnsResolved: boolean;
  networkError?: string;
  bodySnippet?: string;
}
