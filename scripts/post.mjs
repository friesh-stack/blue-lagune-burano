// scripts/post.mjs – veröffentlicht fällige Beiträge aus social/queue.json
// Aufruf durch .github/workflows/social-post.yml. Zugangsdaten nur als GitHub Secrets.
// Kanäle ohne Secrets werden übersprungen. Node 20+ (fetch eingebaut).
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

const QUEUE = process.env.QUEUE_PATH || 'social/queue.json';
// Werte säubern: Leerzeichen, Tabs, Zeilenumbrüche und Anführungszeichen (z. B. aus Excel kopiert) entfernen
const env = Object.fromEntries(Object.entries(process.env).map(([k, v]) =>
  [k, typeof v === 'string' ? v.replace(/[\s\u00a0\u200b\ufeff]+/g, ' ').trim().replace(/^["'„“”]+|["'„“”,;]+$/g, '').trim() : v]));
const GRAPH = env.GRAPH_VERSION || 'v23.0';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const DRY = env.DRY_RUN === '1';

const fullText = (it, withLink = false) =>
  [it.text, withLink && it.link && !String(it.text).includes(it.link) ? it.link : '', it.hashtags]
    .filter(Boolean).join('\n\n').trim();

async function j(r) {
  const t = await r.text();
  let d; try { d = JSON.parse(t); } catch { d = t; }
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${typeof d === 'string' ? d.slice(0, 300) : JSON.stringify(d).slice(0, 300)}`);
  return d;
}
const form = o => new URLSearchParams(Object.entries(o).filter(([, v]) => v !== undefined && v !== ''));

/* ---------- X (OAuth 1.0a, Tokens laufen nicht ab) ---------- */
const pe = s => encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
function oauth1(method, url) {
  const p = {
    oauth_consumer_key: env.X_API_KEY, oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1', oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: env.X_ACCESS_TOKEN, oauth_version: '1.0'
  };
  const params = Object.keys(p).sort().map(k => pe(k) + '=' + pe(p[k])).join('&');
  const base = [method, pe(url), pe(params)].join('&');
  p.oauth_signature = crypto.createHmac('sha1', pe(env.X_API_SECRET) + '&' + pe(env.X_ACCESS_SECRET)).update(base).digest('base64');
  return 'OAuth ' + Object.keys(p).sort().map(k => `${pe(k)}="${pe(p[k])}"`).join(', ');
}
async function postX(it) {
  if (!env.X_API_KEY || !env.X_ACCESS_TOKEN) return null;
  let text = [it.text, it.hashtags].filter(Boolean).join(' ').trim();
  if (text.length > 280) text = text.slice(0, 279) + '…';
  const url = 'https://api.twitter.com/2/tweets';
  const d = await j(await fetch(url, { method: 'POST', headers: { Authorization: oauth1('POST', url), 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }));
  return `https://x.com/i/web/status/${d.data.id}`;
}

/* ---------- LinkedIn (Posts API) ---------- */
const liEscape = s => String(s).replace(/[\\|{}@\[\]()<>#*_~]/g, c => '\\' + c);
async function postLinkedIn(it) {
  if (!env.LI_ACCESS_TOKEN || !env.LI_AUTHOR_URN) return null;
  const body = {
    author: env.LI_AUTHOR_URN, commentary: liEscape(fullText(it)), visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false
  };
  if (it.link) body.content = { article: { source: it.link, title: it.title || it.product || it.link } };
  const r = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.LI_ACCESS_TOKEN, 'Content-Type': 'application/json', 'LinkedIn-Version': env.LI_VERSION || '202510', 'X-Restli-Protocol-Version': '2.0.0' },
    body: JSON.stringify(body)
  });
  if (!r.ok) await j(r);
  const id = r.headers.get('x-restli-id') || '';
  return id ? `https://www.linkedin.com/feed/update/${id}` : 'LinkedIn: veröffentlicht';
}

/* ---------- Facebook-Seite ---------- */
async function postFacebook(it) {
  if (!env.FB_PAGE_ID || !env.FB_PAGE_TOKEN) return null;
  const d = await j(await fetch(`https://graph.facebook.com/${GRAPH}/${env.FB_PAGE_ID}/feed`, { method: 'POST', body: form({ message: fullText(it), link: it.link, access_token: env.FB_PAGE_TOKEN }) }));
  return `https://www.facebook.com/${d.id}`;
}

/* ---------- Threads ---------- */
async function postThreads(it) {
  if (!env.THREADS_USER_ID || !env.THREADS_TOKEN) return null;
  let text = fullText(it, true); if (text.length > 500) text = text.slice(0, 499) + '…';
  const c = await j(await fetch(`https://graph.threads.net/v1.0/${env.THREADS_USER_ID}/threads`, { method: 'POST', body: form({ media_type: 'TEXT', text, access_token: env.THREADS_TOKEN }) }));
  await sleep(5000);
  const p = await j(await fetch(`https://graph.threads.net/v1.0/${env.THREADS_USER_ID}/threads_publish`, { method: 'POST', body: form({ creation_id: c.id, access_token: env.THREADS_TOKEN }) }));
  return `Threads: ${p.id}`;
}

/* ---------- Instagram Reels ---------- */
async function postInstagram(it) {
  if (!env.IG_USER_ID || !env.IG_ACCESS_TOKEN) return null;
  if (!it.videoUrl) throw new Error('Video-URL fehlt (Instagram braucht ein Video)');
  const base = `https://graph.facebook.com/${GRAPH}`;
  const c = await j(await fetch(`${base}/${env.IG_USER_ID}/media`, { method: 'POST', body: form({ media_type: 'REELS', video_url: it.videoUrl, caption: fullText(it), share_to_feed: 'true', access_token: env.IG_ACCESS_TOKEN }) }));
  for (let i = 0; i < 40; i++) {
    await sleep(10000);
    const s = await j(await fetch(`${base}/${c.id}?fields=status_code,status&access_token=${env.IG_ACCESS_TOKEN}`));
    if (s.status_code === 'FINISHED') break;
    if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error('Instagram-Verarbeitung: ' + (s.status || s.status_code));
    if (i === 39) throw new Error('Instagram-Verarbeitung dauert zu lange');
  }
  const p = await j(await fetch(`${base}/${env.IG_USER_ID}/media_publish`, { method: 'POST', body: form({ creation_id: c.id, access_token: env.IG_ACCESS_TOKEN }) }));
  try { const m = await j(await fetch(`${base}/${p.id}?fields=permalink&access_token=${env.IG_ACCESS_TOKEN}`)); return m.permalink; } catch { return `Instagram: ${p.id}`; }
}

/* ---------- YouTube Shorts ---------- */
async function postYouTube(it) {
  if (!env.YT_CLIENT_ID || !env.YT_REFRESH_TOKEN) return null;
  if (!it.videoUrl) throw new Error('Video-URL fehlt (YouTube braucht ein Video)');
  // Falls die ganze Playground-Antwort (HTTP/1.1 200 OK … "refresh_token": "1//…") eingefügt wurde: Token herausziehen
  const rtm = String(env.YT_REFRESH_TOKEN).match(/1\/\/[A-Za-z0-9_\-]+/);
  if (rtm) env.YT_REFRESH_TOKEN = rtm[0];
  const idOk = /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/.test(env.YT_CLIENT_ID);
  const secOk = /^GOCSPX-/.test(env.YT_CLIENT_SECRET || '');
  const rtOk = /^1\/\//.test(env.YT_REFRESH_TOKEN);
  console.log(`YouTube-Prüfung: Client-ID ${idOk ? 'Format ok' : 'FORMAT FALSCH (Länge ' + env.YT_CLIENT_ID.length + ')'}, Clientschlüssel ${secOk ? 'ok' : 'FORMAT FALSCH'}, Refresh-Token ${rtOk ? 'ok' : 'FORMAT FALSCH'}`);
  const tok = await j(await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: form({ client_id: env.YT_CLIENT_ID, client_secret: env.YT_CLIENT_SECRET, refresh_token: env.YT_REFRESH_TOKEN, grant_type: 'refresh_token' }) }));
  const vr = await fetch(it.videoUrl); if (!vr.ok) throw new Error('Video nicht abrufbar: HTTP ' + vr.status);
  const buf = Buffer.from(await vr.arrayBuffer());
  let title = (it.title || it.product || 'Video').trim(); if (!/#shorts/i.test(title) && title.length < 90) title += ' #Shorts'; title = title.slice(0, 100);
  const tags = (it.hashtags || '').split(/\s+/).map(t => t.replace(/^#/, '')).filter(Boolean).slice(0, 15);
  const meta = {
    snippet: { title, description: fullText(it, true).slice(0, 4900), tags, categoryId: it.brand === 'apps' ? '28' : '19', defaultLanguage: 'de' },
    status: { privacyStatus: it.privacy || env.YT_PRIVACY || 'public', selfDeclaredMadeForKids: false }
  };
  const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + tok.access_token, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': vr.headers.get('content-type') || 'video/mp4', 'X-Upload-Content-Length': String(buf.length) },
    body: JSON.stringify(meta)
  });
  if (!init.ok) await j(init);
  const loc = init.headers.get('location');
  const d = await j(await fetch(loc, { method: 'PUT', headers: { 'Content-Type': vr.headers.get('content-type') || 'video/mp4' }, body: buf }));
  return `https://youtube.com/shorts/${d.id}`;
}

/* ---------- TikTok (Inbox-Entwurf, ohne App-Prüfung) ---------- */
async function postTikTok(it) {
  if (!env.TIKTOK_CLIENT_KEY || !env.TIKTOK_REFRESH_TOKEN) return null;
  if (!it.videoUrl) throw new Error('Video-URL fehlt (TikTok braucht ein Video)');
  const tok = await j(await fetch('https://open.tiktokapis.com/v2/oauth/token/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form({ client_key: env.TIKTOK_CLIENT_KEY, client_secret: env.TIKTOK_CLIENT_SECRET, grant_type: 'refresh_token', refresh_token: env.TIKTOK_REFRESH_TOKEN }) }));
  const d = await j(await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
    method: 'POST', headers: { Authorization: 'Bearer ' + tok.access_token, 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ source_info: { source: 'PULL_FROM_URL', video_url: it.videoUrl } })
  }));
  if (d.error && d.error.code && d.error.code !== 'ok') throw new Error('TikTok: ' + d.error.message);
  return `TikTok-Inbox (Entwurf, in der App veröffentlichen) – ${d.data?.publish_id || ''}`;
}

const HANDLERS = { x: postX, linkedin: postLinkedIn, facebook: postFacebook, threads: postThreads, instagram: postInstagram, youtube: postYouTube, tiktok: postTikTok };

/* ---------- Ablauf ---------- */
const q = JSON.parse(await fs.readFile(QUEUE, 'utf8'));
const now = new Date();
let changed = false, done = 0;
for (const it of q.items || []) {
  if (it.status !== 'freigegeben' || !it.date || new Date(it.date) > now) continue;
  const h = HANDLERS[it.channel];
  if (!h) { const m = `${it.channel} wird nicht automatisch gepostet – bitte manuell`; if (it.error !== m) { it.error = m; changed = true; } continue; }
  try {
    if (DRY) { console.log('[DRY]', it.channel, it.id, fullText(it).slice(0, 80)); continue; }
    const url = await h(it);
    if (url === null) { if (it.error !== 'Kanal nicht eingerichtet (Secrets fehlen)') { it.error = 'Kanal nicht eingerichtet (Secrets fehlen)'; changed = true; } continue; }
    it.status = 'gepostet'; it.postedAt = new Date().toISOString(); it.resultUrl = url || ''; it.error = '';
    done++; console.log('✓', it.channel, it.product, url);
  } catch (e) {
    it.error = String(e.message || e).slice(0, 500);
    console.error('✗', it.channel, it.product, it.error);
  }
  changed = true;
}
if (changed) { q.updated = new Date().toISOString(); await fs.writeFile(QUEUE, JSON.stringify(q, null, 2)); }
console.log(`Fertig: ${done} veröffentlicht.`);
