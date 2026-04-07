import { NextRequest } from "next/server"

export function createPostRequest(url: string, body: any) {

  return new NextRequest(`http://localhost${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    }
  })

}
