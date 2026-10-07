import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const API_URL = 'http://localhost:8080/api/tasks';

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?page=${page}&size=${pageSize}&sort=id,desc`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTasks(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, completed: false }),
      });
      await response.json();
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PUT' });
      const updatedTask = await response.json();
      setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className="app-container">
      <div className="ambient ambient-violet" aria-hidden="true" />
      <div className="ambient ambient-blue" aria-hidden="true" />
      <div className="ambient ambient-coral" aria-hidden="true" />

      <nav className="topbar" aria-label="Workspace">
        <a className="brand" href="#top" aria-label="Stillday home">
          <span className="brand-mark"><span /></span>
          <span className="brand-name">stillday<span className="brand-period">.</span></span>
        </a>
        <div className="workspace-chip"><span className="live-dot" /> PERSONAL WORKSPACE</div>
        <div className="topbar-date"><span className="sun-icon">✳</span> A LITTLE MORE INTENTIONAL</div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR SPACE, AT YOUR PACE</p>
          <h1>Make room for<br /><span>what matters.</span></h1>
          <p className="hero-description">A calmer place to collect your thoughts<br className="desktop-break" /> and turn them into small, satisfying wins.</p>
        </div>
        <div className="hero-note glass-surface">
          <span className="note-orbit" aria-hidden="true">✳</span>
          <p className="note-label">A GENTLE REMINDER</p>
          <p className="note-quote">“You don’t have to<br />do it all at once.”</p>
          <span className="note-signature">— take it one thing at a time</span>
        </div>
      </section>

      <section className="workspace-grid" aria-label="Task manager">
        <div className="task-panel glass-surface">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">THE EVERYDAY LIST</p>
              <h2>Your tasks<span className="heading-period">.</span></h2>
            </div>
            <div className="date-pill"><span className="calendar-icon">▦</span> IN PROGRESS</div>
          </div>

          <div className="stats-row" aria-label="Task summary">
            <div className="stat-card stat-total"><span className="stat-label">ON THIS PAGE</span><span className="stat-value">{tasks.length.toString().padStart(2, '0')}</span></div>
            <div className="stat-card stat-done"><span className="stat-label">COMPLETED</span><span className="stat-value">{completedCount.toString().padStart(2, '0')}<span className="stat-sparkle">✳</span></span></div>
            <div className="stat-card stat-open"><span className="stat-label">STILL TO DO</span><span className="stat-value">{pendingCount.toString().padStart(2, '0')}</span></div>
          </div>

          <form onSubmit={handleAddTask} className="add-task-form">
            <label className="sr-only" htmlFor="new-task">Add a task</label>
            <span className="input-plus" aria-hidden="true">＋</span>
            <input
              id="new-task"
              type="text"
              className="task-input"
              placeholder="Add something to your day…"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <button type="submit" className="add-button"><span>Add task</span><span className="button-arrow" aria-hidden="true">↗</span></button>
          </form>

          <div className="list-heading"><span>YOUR LIST</span><span className="list-hint">Tap a task to mark it done</span></div>
          {loading ? (
            <div className="loading-container"><div className="spinner" /><p className="loading-text">Gathering your tasks…</p></div>
          ) : (
            <div className="task-list">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✳</div>
                  <p className="empty-title">A fresh page.</p>
                  <p className="empty-text">Add one small thing you’d like to get done.</p>
                </div>
              ) : tasks.map((task, index) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <button className="task-content" onClick={() => handleToggleTask(task.id)} aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.title}`}>
                    <span className="task-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className={`checkbox-wrapper ${task.completed ? 'checked' : ''}`} aria-hidden="true"><span className="checkbox-inner">{task.completed ? '✓' : ''}</span></span>
                    <span className="task-info"><span className="task-title">{task.title}</span><span className="task-meta">A little progress is still progress</span></span>
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteTask(task.id)} title="Delete task" aria-label={`Delete ${task.title}`}><span aria-hidden="true">×</span></button>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="pagination-container">
                  <span className="pagination-caption">A FEW THINGS AT A TIME</span>
                  <div className="pagination-actions">
                    <button onClick={() => setPage(page - 1)} disabled={page === 0} className="page-button" aria-label="Previous page">←</button>
                    <span className="page-indicator"><span className="current-page">{String(page + 1).padStart(2, '0')}</span><span className="page-divider">/</span><span className="total-pages">{String(totalPages).padStart(2, '0')}</span></span>
                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} className="page-button" aria-label="Next page">→</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="side-column">
          <div className="focus-card glass-surface">
            <div className="focus-topline"><span className="focus-icon">✳</span><span className="focus-label">TODAY’S RHYTHM</span></div>
            <div className="progress-copy"><span>Small steps</span><span>{completionRate}%</span></div>
            <div className="progress-track"><span style={{ width: `${completionRate}%` }} /></div>
            <p className="focus-message">Every checked box is a little promise kept to yourself.</p>
            <div className="focus-foot"><span>KEEP GOING</span><span>✧</span></div>
          </div>

          <div className="side-note glass-surface">
            <span className="side-note-mark">“</span>
            <p>Done is a beautiful place to begin again.</p>
            <span className="side-note-byline">A NOTE TO SELF</span>
          </div>

          <div className="privacy-note"><span className="lock-icon">⌑</span><span>YOUR LIST, YOUR LITTLE CORNER<br />MADE FOR FOCUS, NOT THE NOISE.</span></div>
        </aside>
      </section>

      <footer className="page-footer"><span>STILLDAY <span className="footer-dot">●</span> A SOFTER WAY TO GET THINGS DONE</span><span>ONE THING AT A TIME</span></footer>
    </main>
  );
}

export default App;
