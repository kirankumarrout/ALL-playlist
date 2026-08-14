import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Plus, Radio, X, Send, LoaderCircle } from 'lucide-react'
import { categories, playlists, type Category, type Playlist } from './data/playlists'

function SceneArt({ playlist, large = false }: { playlist: Playlist; large?: boolean }) {
  return (
    <div className={`scene scene-${playlist.scene} ${large ? 'scene-large' : ''}`} style={{ '--accent': playlist.accent } as React.CSSProperties}>
      <div className="scanlines" />
      <div className="scene-title">{playlist.title}</div>
      <div className="scene-subtitle">{playlist.description}</div>
      {playlist.scene === 'mountains' && <><span className="mountain m1"/><span className="mountain m2"/><span className="sun"/></>}
      {playlist.scene === 'station' && <div className="station"><span/><span/><span/></div>}
      {playlist.scene === 'cassette' && <div className="cassette"><i/><i/><b/></div>}
      {playlist.scene === 'portrait' && <div className="portrait"><i/><b/></div>}
      {playlist.scene === 'village' && <div className="hut"><i/><b/></div>}
      {playlist.scene === 'retro' && <div className="boombox"><i/><i/><b/></div>}
      {playlist.scene === 'minimal' && <div className="minimal-line"/>}
      {playlist.scene === 'coast' && <div className="coast"><i/><b/></div>}
      {playlist.scene === 'market' && <div className="market"><i/><i/><i/></div>}
      {playlist.scene === 'temple' && <div className="temple"><i/><b/></div>}
      {playlist.scene === 'heritage' && <div className="heritage"><i/><i/><i/></div>}
      {playlist.scene === 'busmountain' && <><span className="road-mountain"/><div className="bus">● ●</div></>}
      {playlist.scene === 'signal' && <div className="no-signal">NO SIGNAL</div>}
      {playlist.scene === 'truck' && <div className="truck">HORN OK PLEASE</div>}
      {playlist.scene === 'highway' && <div className="car"><i/><b/></div>}
      {playlist.scene === 'road' && <div className="road"><i/></div>}
      {playlist.scene === 'citynight' && <div className="city"><i/><i/><i/></div>}
      {playlist.scene === 'silhouette' && <div className="silhouettes"><i/><i/><i/></div>}
      {playlist.scene === 'truckart' && <div className="truckart">♪</div>}
      {playlist.scene === 'film' && <div className="film"><i/><b/></div>}
      {playlist.scene === 'paper' && <div className="paper"><i/><i/><i/></div>}
      {playlist.scene === 'palace' && <div className="palace"><i/><i/><i/></div>}
      {playlist.scene === 'kitchen' && <div className="kitchen"><i/><b/></div>}
      {playlist.scene === 'clinic' && <div className="clinic"><i/></div>}
      {playlist.scene === 'home' && <div className="home"><i/><b/></div>}
      <div className="player"><span className="avatar"/><span className="player-line"/><span className="play">▶</span></div>
    </div>
  )
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <article className="playlist-card">
      <a className="art-link" href={playlist.url || `https://${playlist.domain}`} target="_blank" rel="noreferrer" aria-label={`Open ${playlist.title}`}>
        <SceneArt playlist={playlist} />
      </a>
      <div className="card-title-row">
        <h3>{playlist.title}</h3>
        <a className="external" href={playlist.url || `https://${playlist.domain}`} target="_blank" rel="noreferrer" aria-label={`Open ${playlist.title}`}><ExternalLink size={15}/></a>
      </div>
      <p>{playlist.description}</p>
      <a className="creator" href={`https://x.com/${playlist.creator.replace('@','')}`} target="_blank" rel="noreferrer">{playlist.creator}</a>
    </article>
  )
}

function AddSiteModal({ close, onAdded }: { close: () => void; onAdded: (playlist: Playlist) => void }) {
  const [url, setUrl] = useState('')
  const [post, setPost] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [creator, setCreator] = useState('')
  const [category, setCategory] = useState<Exclude<Category, 'all'>>('everyday')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!/^https?:\/\//i.test(url) || !/^https?:\/\//i.test(post)) { setError('कृपया दोनों में valid URL डालें।'); return }
    setBusy(true)
    try {
      const response = await fetch('/.netlify/functions/playlists', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url, post, title, description, creator, category }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Submission failed')
      onAdded({ title: data.submission.title, description: data.submission.description, creator: data.submission.creator, domain: data.submission.domain, url: data.submission.url, category: data.submission.category, scene: data.submission.scene, accent: data.submission.accent })
      setSent(true)
    } catch (err) { setError(err instanceof Error ? err.message : 'कुछ गलत हो गया।') }
    finally { setBusy(false) }
  }

  return <div className="modal-backdrop" onMouseDown={close}>
    <div className="modal" onMouseDown={e => e.stopPropagation()}>
      <button className="modal-close" onClick={close}><X size={20}/></button>
      <h2>अपनी साइट जोड़ें</h2>
      <p>अपनी प्लेलिस्ट साइट का लिंक और उसके बारे में किया गया X पोस्ट भेजें।</p>
      {sent ? <div className="success"><Send size={26}/><strong>धन्यवाद!</strong><span>आपकी साइट लाइव सूची में जोड़ दी गई है।</span><button onClick={close}>ठीक है</button></div> : <form onSubmit={submit}>
        <label>साइट का URL<input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://meri-playlist.vercel.app" required /></label>
        <label>X (TWITTER) पोस्ट का लिंक<input value={post} onChange={e => setPost(e.target.value)} placeholder="https://x.com/aapka_handle/status/..." required /></label>
        <label>प्लेलिस्ट का नाम<input value={title} onChange={e => setTitle(e.target.value)} placeholder="मेरी प्लेलिस्ट" /></label>
        <label>छोटा विवरण<input value={description} onChange={e => setDescription(e.target.value)} placeholder="90s Bollywood songs..." /></label>
        <label>आपका X handle<input value={creator} onChange={e => setCreator(e.target.value)} placeholder="@yourhandle" /></label>
        <label>श्रेणी<select value={category} onChange={e => setCategory(e.target.value as Exclude<Category, 'all'>)}>{categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.hi} · {c.en}</option>)}</select></label>
        {error && <div className="form-error">{error}</div>}
        <button className="submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle size={17} className="spin"/> भेजा जा रहा है...</> : 'भेज दीजिए'}</button>
      </form>}
    </div>
  </div>
}

const featured: Playlist = { title: 'डीलक्स सैलून', description: '90s Bollywood bangers that play at Indian barber shops. The site that started it all.', creator: '@ybhrdwj', domain: 'saloon.wtf', url: 'https://saloon.wtf', category: 'shops', scene: 'market', accent: '#a23c31' }

export default function App() {
  const [active, setActive] = useState<Category>('all')
  const [modal, setModal] = useState(false)
  const [submitted, setSubmitted] = useState<Playlist[]>([])
  const [visible, setVisible] = useState(16)

  useEffect(() => { fetch('/.netlify/functions/playlists').then(r => r.ok ? r.json() : []).then(items => setSubmitted(items.map((p: Playlist) => ({ ...p, url: p.url || `https://${p.domain}` })))).catch(() => {}) }, [])
  const allPlaylists = useMemo(() => [...submitted, ...playlists], [submitted])
  const filtered = useMemo(() => active === 'all' ? allPlaylists : allPlaylists.filter(p => p.category === active), [active, allPlaylists])
  useEffect(() => setVisible(16), [active])

  return <div className="app">
    <section className="hero">
      <div className="hero-sky"><div className="cloud cloud-a"/><div className="cloud cloud-b"/><div className="radio-person"><div className="turban"/><div className="head"/><div className="body"/><div className="radio"><i/><b/></div></div></div>
      <div className="hero-fade"/>
      <div className="hero-content">
        <h1>ओ जी प्लेलिस्ट</h1><p>पुरानी यादों की हर प्लेलिस्ट, एक जगह।</p>
        <div className="start-label"><span/>जहाँ से शुरुआत हुई<span/></div>
        <div className="featured-wrap"><SceneArt playlist={featured} large /></div><h2>{featured.title}</h2><p className="featured-description">{featured.description}</p><a className="creator" href="https://x.com/ybhrdwj" target="_blank" rel="noreferrer">@ybhrdwj</a>
      </div>
    </section>
    <main className="catalog">
      <header className="catalog-head"><div className="catalog-title"><Radio size={17}/><h2>सारी प्लेलिस्ट साइट्स</h2><span>{filtered.length}/68</span></div><button className="add-site" onClick={() => setModal(true)}><Plus size={16}/> अपनी साइट जोड़ें <small>Submit yours</small></button></header>
      <nav className="filters" aria-label="Playlist categories">{categories.map(c => <button key={c.id} className={active === c.id ? 'active' : ''} onClick={() => setActive(c.id)}>{c.hi} <span>{c.en}</span></button>)}</nav>
      <section className="grid">{filtered.slice(0, visible).map((playlist, i) => <PlaylistCard playlist={playlist} key={`${playlist.domain}-${i}`} />)}</section>
      {visible < filtered.length && <button className="load-more" onClick={() => setVisible(v => v + 12)}>और प्लेलिस्ट दिखाएँ</button>}
    </main>
    <footer><h2>एक आइडिया, अनेक कहानियाँ</h2><p>हर नई प्लेलिस्ट साइट यहाँ समुदाय के साथ जुड़ सकती है। साइट के creator को ऊपर credit दिया गया है।</p><div className="footer-mark">CREATED WITH LOVE, LATE AT NIGHT</div></footer>
    {modal && <AddSiteModal close={() => setModal(false)} onAdded={p => setSubmitted(items => [p, ...items])} />}
  </div>
}
