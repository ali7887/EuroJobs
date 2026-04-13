import { HttpsProxyAgent } from 'https-proxy-agent';

// آدرس پروکسی خودت را اینجا بگذار (مثلاً اگر VPN روشن است و روی پورت 7890 است)
const PROXY = 'http://127.0.0.1:10808'; 
const agent = new HttpsProxyAgent(PROXY);

export async function gapgptChat(messages: any[]) {
  const response = await fetch(`${process.env.GAPGPT_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GAPGPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.GAPGPT_MODEL,
      messages,
    }),
    // @ts-ignore
    agent: agent, // این خط کل ترافیک را از پروکسی عبور می‌دهد
  });

  if (!response.ok) {
    throw new Error(`GapGPT API error: ${response.statusText}`);
  }
  
  return response.json();
}
