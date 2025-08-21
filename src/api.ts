type ApiParams = {
  aborter?: AbortController;
}

type SendApiParams = {
  body?: Record<string, unknown>;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
} & ApiParams
type Error = { status: number; errors: string[] }
const deserialize_response = async<T>(
  response: Response
) => {

  const json = response.status === 204
    ? {}
    : (await response.json())

  return response.ok
    ? json as T
    : {
      status: response.status,
      errors: json.errors ?? 'Unsuccesful result without errors field'
    } as Error
}

const DEFAULT_OPTIONS = {
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const

export const get_json = async <T>(
  url: string,
  params: ApiParams = {}
) => {
  const { aborter = undefined } = params
  const response = await fetch(
    url,
    {
      signal: aborter?.signal,
      ...DEFAULT_OPTIONS,
    },
  )

  return deserialize_response<T>(response)
}


export const send_json = async <T>(
  url: string,
  params: SendApiParams = {},
) => {
  const { method = 'POST', body = {}, aborter = undefined } = params

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}${url}`,
    {
      method,
      body: JSON.stringify(body),
      signal: aborter?.signal,
      ...DEFAULT_OPTIONS,
    })

  return deserialize_response<T>(response)
}

