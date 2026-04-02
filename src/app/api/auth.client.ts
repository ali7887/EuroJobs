// src/lib/api/auth.client.ts

let accessToken: string | null = null  // توی memory — نه localStorage

export function setAccessToken(token: string) {
  accessToken = token
}

// هر request با access token
export async function fetchWithAuth(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  // اگه 401 گرفتیم، refresh کن و retry
  if (res.status === 401) {
    const refreshed = await refreshAccessToken()
    if (!refreshed) {
      // refresh هم fail شد → logout
      window.location.href = '/login'
      return res
    }

    // retry با token جدید
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  return res
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    // cookie خودکار فرستاده میشه (credentials: 'include')
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (!res.ok) return false

    const { accessToken: newToken } = await res.json()
    setAccessToken(newToken)
    return true
  } catch {
    return false
  }
}
