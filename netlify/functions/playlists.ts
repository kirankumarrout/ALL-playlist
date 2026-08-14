import { getStore } from '@netlify/blobs'

const STORE_NAME = 'playlist-submissions'
const KEY = 'playlists.json'

export type Submission = {
  id: string
  url: string
  post: string
  title: string
  description: string
  creator: string
  domain: string
  category: string
  scene: string
  accent: string
  status: 'pending'
  createdAt: string
}

const store = () => getStore(STORE_NAME)

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function readAll(): Promise<Submission[]> {
  return (await store().get(KEY, { type: 'json' })) || []
}

export default async (request: Request) => {
  if (request.method === 'GET') return json(await readAll())
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await request.json()
    const url = String(body.url || '').trim()
    const post = String(body.post || '').trim()
    if (!/^https?:\/\//i.test(url) || !/^https?:\/\//i.test(post)) {
      return json({ error: 'Please provide valid website and X post URLs.' }, 400)
    }

    const parsed = new URL(url)
    const hostname = parsed.hostname.replace(/^www\./, '')
    const existing = await readAll()
    if (existing.some(item => item.url.toLowerCase() === url.toLowerCase())) {
      return json({ error: 'This playlist site has already been submitted.' }, 409)
    }

    const submission: Submission = {
      id: crypto.randomUUID(),
      url,
      post,
      title: String(body.title || hostname),
      description: String(body.description || 'Community-submitted playlist site'),
      creator: String(body.creator || '@community'),
      domain: hostname,
      category: String(body.category || 'everyday'),
      scene: String(body.scene || 'minimal'),
      accent: String(body.accent || '#3b86c8'),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    await store().setJSON(KEY, [...existing, submission])
    return json({ ok: true, submission })
  } catch {
    return json({ error: 'Unable to save this submission right now.' }, 500)
  }
}
