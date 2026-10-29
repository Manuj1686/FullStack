import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8080/api/posts';

function formatDate(value) {
  if (!value) return 'Time not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(date);
}

function relativeTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const diff = date.getTime() - Date.now();
  const abs = Math.abs(diff);
  if (abs < 60_000) return diff >= 0 ? 'In less than a minute' : 'Just now';
  const minutes = Math.round(abs / 60_000);
  if (minutes < 60) return diff >= 0 ? `In ${minutes} min` : `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return diff >= 0 ? `In ${hours} hr` : `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return diff >= 0 ? `In ${days} day${days === 1 ? '' : 's'}` : `${days} day${days === 1 ? '' : 's'} ago`;
}

function statusClass(status = 'pending') {
  return String(status).toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchPosts = useCallback(async (quiet = false) => {
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
      setConnectionError('');
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching posts:', error);
      setConnectionError('Can’t reach the backend. Make sure Spring Boot is running on port 8080.');
    } finally {
      if (!quiet) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => fetchPosts(true), 3000);
    return () => clearInterval(interval);
  }, [fetchPosts]);

  const counts = useMemo(() => {
    const result = { ALL: posts.length, PENDING: 0, PUBLISHING: 0, PUBLISHED: 0, FAILED: 0 };
    posts.forEach((post) => {
      const status = String(post.status || 'PENDING').toUpperCase();
      if (Object.prototype.hasOwnProperty.call(result, status)) result[status] += 1;
    });
    return result;
  }, [posts]);

  const visiblePosts = useMemo(() => posts
    .filter((post) => filter === 'ALL' || String(post.status || 'PENDING').toUpperCase() === filter)
    .filter((post) => `${post.content || ''} ${post.id ?? ''} ${post.status || ''}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(a.scheduledTime || 0) - new Date(b.scheduledTime || 0)), [posts, filter, query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice('');
    if (!content.trim() || !scheduleTime) {
      setNotice('Add your post text and choose a schedule time first.');
      return;
    }
    const scheduledDate = new Date(scheduleTime);
    if (Number.isNaN(scheduledDate.getTime())) {
      setNotice('Please choose a valid schedule time.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), scheduledTime: scheduledDate.toISOString() }),
      });
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      setContent('');
      setScheduleTime('');
      setNotice('Your post has been added to the queue.');
      await fetchPosts(true);
    } catch (error) {
      console.error('Error scheduling post:', error);
      setNotice('Couldn’t schedule this post. Check the backend and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Postflow home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>postflow<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-right">
          <span className={`connection-pill ${connectionError ? 'is-offline' : 'is-online'}`}>
            <span className="connection-dot" />{connectionError ? 'Backend offline' : 'System operational'}
          </span>
          <button className="icon-button" type="button" onClick={() => fetchPosts()} aria-label="Refresh posts" title="Refresh posts">↻</button>
          <div className="avatar" title="Workspace profile">M</div>
        </div>
      </header>

      <main id="top" className="workspace">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> EVENT-DRIVEN WORKSPACE</div>
            <h1>Your ideas,<br /><span>right on schedule.</span></h1>
            <p>Compose a post, set the moment, and let the Kafka-powered pipeline take it from here.</p>
            <div className="hero-meta"><span className="live-pulse" /> Live queue monitoring <span className="meta-divider">·</span> Auto-refresh every 3 sec</div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-outer" /><div className="orbit orbit-inner" />
            <div className="glass-orb"><div className="orb-core">↗</div><span className="orb-spark spark-one" /><span className="orb-spark spark-two" /></div>
            <div className="floating-chip chip-top"><span className="chip-icon purple">✦</span><span><b>Event stream</b><small>Kafka connected</small></span><i /></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon mint">✓</span><span><b>On your timeline</b><small>Queue stays in sync</small></span></div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Post statistics">
          <div className="stat-card stat-total"><div className="stat-top"><span className="stat-label">TOTAL POSTS</span><span className="stat-symbol">▤</span></div><div className="stat-value">{counts.ALL.toString().padStart(2, '0')}</div><div className="stat-foot">Across your workspace</div><div className="stat-track"><span style={{ width: `${counts.ALL ? 100 : 4}%` }} /></div></div>
          <div className="stat-card"><div className="stat-top"><span className="stat-label">PENDING</span><span className="status-dot pending-dot" /></div><div className="stat-value">{counts.PENDING.toString().padStart(2, '0')}</div><div className="stat-foot">Waiting in the queue</div></div>
          <div className="stat-card"><div className="stat-top"><span className="stat-label">PUBLISHED</span><span className="status-dot published-dot" /></div><div className="stat-value">{counts.PUBLISHED.toString().padStart(2, '0')}</div><div className="stat-foot">Successfully processed</div></div>
          <div className="stat-card"><div className="stat-top"><span className="stat-label">NEEDS ATTENTION</span><span className="status-dot failed-dot" /></div><div className="stat-value">{counts.FAILED.toString().padStart(2, '0')}</div><div className="stat-foot">Failed events to review</div></div>
        </section>

        {connectionError && <div className="error-banner"><span className="error-icon">!</span><div><b>Connection interrupted</b><p>{connectionError}</p></div><button type="button" onClick={() => fetchPosts()} className="retry-button">Try again ↗</button></div>}

        <div className="content-grid">
          <section className="glass-panel composer-panel">
            <div className="panel-heading"><div><div className="section-kicker">MAKE IT HAPPEN</div><h2>Compose a post<span className="heading-period">.</span></h2></div><span className="panel-step">01 <span>/ 02</span></span></div>
            <p className="panel-description">A little thought, delivered at exactly the right time.</p>
            <form onSubmit={handleSubmit} className="post-form">
              <div className="field-heading"><label htmlFor="post-content">Your message</label><span className="character-count">{content.length} <span>/ 500</span></span></div>
              <div className="textarea-wrap"><textarea id="post-content" maxLength={500} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Write something worth sharing…" required /><span className="textarea-corner">↘</span></div>
              <div className="field-heading schedule-label"><label htmlFor="schedule-time">Publish date &amp; time</label><span className="timezone-label">LOCAL TIME</span></div>
              <div className="date-input-wrap"><span className="calendar-icon">▦</span><input id="schedule-time" type="datetime-local" value={scheduleTime} onChange={(event) => setScheduleTime(event.target.value)} required /></div>
              <div className="composer-hint"><span>✧</span> Your post will enter the event queue immediately.</div>
              {notice && <div className={`notice ${notice.includes('couldn’t') || notice.includes('Couldn’t') || notice.includes('valid') || notice.includes('Add your') ? 'notice-error' : 'notice-success'}`} role="status">{notice}</div>}
              <button type="submit" className="submit-btn" disabled={submitting || !content.trim() || !scheduleTime}><span>{submitting ? 'Adding to queue…' : 'Schedule post'}</span><span className="button-arrow">↗</span></button>
            </form>
            <div className="secure-note"><span className="lock-icon">◈</span> Powered by Spring Boot <span className="note-separator">·</span> Streamed with Kafka</div>
          </section>

          <section className="glass-panel queue-panel">
            <div className="panel-heading queue-heading"><div><div className="section-kicker">THE PIPELINE</div><h2>Your post queue<span className="heading-period">.</span></h2></div><span className="queue-count">{posts.length} <span>items</span></span></div>
            <div className="queue-toolbar"><div className="search-box"><span>⌕</span><input aria-label="Search posts" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your posts…" /><kbd>⌘ K</kbd></div><button className="refresh-button" type="button" onClick={() => fetchPosts()} title="Refresh queue">↻</button></div>
            <div className="filter-tabs" role="tablist" aria-label="Filter posts by status">{[['ALL', 'All'], ['PENDING', 'Pending'], ['PUBLISHED', 'Published'], ['FAILED', 'Failed']].map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={filter === key} className={filter === key ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter(key)}>{label}<span>{counts[key] ?? 0}</span></button>)}</div>
            <div className="queue-list">
              {loading ? <div className="empty-state"><div className="empty-illustration loading-illustration"><span /><span /><span /></div><h3>Getting your queue ready</h3><p>Syncing the latest posts…</p></div> : visiblePosts.length === 0 ? <div className="empty-state"><div className="empty-illustration"><span className="empty-paper">✧</span><span className="empty-star">✦</span></div><h3>{query ? 'Nothing matches that search' : filter !== 'ALL' ? `No ${filter.toLowerCase()} posts` : 'A fresh start.'}</h3><p>{query ? 'Try another keyword or clear your search.' : filter !== 'ALL' ? 'Posts with this status will appear here.' : 'Your next great post is one thought away.'}</p>{(query || filter !== 'ALL') && <button type="button" className="clear-filter" onClick={() => { setQuery(''); setFilter('ALL'); }}>Clear filters ↗</button>}</div> : visiblePosts.map((post) => {
                const status = String(post.status || 'PENDING').toUpperCase();
                const cls = statusClass(status);
                return <article key={post.id} className={`post-item status-${cls}`}><div className="post-item-top"><span className="post-reference"><span className="reference-mark">#</span> POST-{String(post.id ?? '—').padStart(3, '0')}</span><span className={`status-badge badge-${cls}`}><span className="badge-dot" />{status}</span></div><p className="post-item-content">{post.content || 'No message content'}</p><div className="post-item-bottom"><div className="post-date"><span>◷</span><span>{formatDate(post.scheduledTime)}</span></div><span className="relative-time">{relativeTime(post.scheduledTime)}</span></div></article>;
              })}
            </div>
            <div className="queue-footer"><span><span className="footer-live-dot" /> Live updates enabled</span><span>{lastUpdated ? `Synced ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Waiting to sync'}</span></div>
          </section>
        </div>
        <footer className="page-footer"><span>POSTFLOW <span className="footer-dot">●</span> EVENT-DRIVEN PUBLISHER</span><span>Designed for ideas in motion <span className="footer-spark">✳</span></span></footer>
      </main>
    </div>
  );
}

export default App;
