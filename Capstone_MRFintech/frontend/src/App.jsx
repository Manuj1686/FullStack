import { useEffect, useMemo, useState } from 'react'
import {
  Wallet, TrendingUp, CreditCard, CircleAlert, LayoutDashboard, ReceiptText,
  ChartNoAxesCombined, Settings, Search, Bell, Plus, ArrowUpRight, ArrowDownRight,
  Utensils, Bus, ShoppingBag, GraduationCap, MoreHorizontal, Trash2, X,
  CalendarDays, ChevronDown, Sparkles, ShieldCheck, CircleDollarSign
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'
import { request } from './api'

const categories = ['Food', 'Travel', 'Shopping', 'College', 'Entertainment', 'Other']
const palette = ['#6d7cff', '#24c8a5', '#ffb454', '#a78bfa', '#ff7295', '#8b9bb4']
const iconMap = { Food: Utensils, Travel: Bus, Shopping: ShoppingBag, College: GraduationCap, Entertainment: Sparkles, Other: CircleDollarSign }
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)
const today = new Date().toISOString().slice(0, 10)

const initialExpenses = [
  { id: 'seed-1', date: today, description: 'Lunch at campus', category: 'Food', amount: 180 },
  { id: 'seed-2', date: today, description: 'Auto to university', category: 'Travel', amount: 90 },
  { id: 'seed-3', date: today, description: 'Notebook & pens', category: 'College', amount: 240 },
  { id: 'seed-4', date: today, description: 'Coffee with friends', category: 'Food', amount: 120 },
  { id: 'seed-5', date: today, description: 'T-shirt', category: 'Shopping', amount: 650 },
]
const defaultBudgets = { Food: 3000, Travel: 1500, Shopping: 2000, College: 1500, Entertainment: 1000, Other: 1000 }

function DashboardApp({ auth, onLogout }) {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [budgets, setBudgets] = useState(defaultBudgets)
  const [monthlyBudget, setMonthlyBudget] = useState(10000)
  const [activeNav, setActiveNav] = useState('Overview')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState('')
  const [apiConnected, setApiConnected] = useState(false)
  const [form, setForm] = useState({ description: '', amount: '', category: 'Food', date: today })
  const [budgetEdit, setBudgetEdit] = useState(false)
  const [budgetDraft, setBudgetDraft] = useState(defaultBudgets)
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem(`mr-fintech-goals-${auth.id || auth.email}`) || '[]'))
  const [goalDraft, setGoalDraft] = useState({ name: '', target: '', saved: '' })
  const [darkMode, setDarkMode] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [chartRange, setChartRange] = useState('7')

  useEffect(() => {
    function handleQuickAdd(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') {
        event.preventDefault()
        setShowModal(true)
      }
    }
    window.addEventListener('keydown', handleQuickAdd)
    return () => window.removeEventListener('keydown', handleQuickAdd)
  }, [])

  useEffect(() => {
    let alive = true
    Promise.all([request('/expenses'), request('/budgets')]).then(([e, b]) => {
      if (!alive) return
      if (Array.isArray(e)) setExpenses(e.length ? e : [])
      if (b && b.categories) {
        setBudgets(b.categories)
        setBudgetDraft(b.categories)
        setMonthlyBudget(b.monthlyBudget || Object.values(b.categories).reduce((a, n) => a + n, 0))
      }
      setApiConnected(true)
    }).catch(() => { if (alive) setApiConnected(false) })
    return () => { alive = false }
  }, [])

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  const remaining = monthlyBudget - totalSpent
  const usedPct = monthlyBudget ? Math.min(100, Math.round(totalSpent / monthlyBudget * 100)) : 0
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  const dayOfMonth = new Date().getDate()
  const forecast = dayOfMonth ? Math.round(totalSpent / dayOfMonth * daysInMonth) : totalSpent
  const overBudget = forecast > monthlyBudget
  const categoryData = categories.map((name, i) => ({
    name, value: expenses.filter(e => e.category === name).reduce((s, e) => s + Number(e.amount || 0), 0),
    budget: Number(budgets[name] || 0), color: palette[i]
  }))
  const trendData = useMemo(() => {
    const map = {}
    expenses.forEach(e => {
      const d = new Date(`${e.date}T00:00:00`)
      const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
      map[label] = (map[label] || 0) + Number(e.amount || 0)
    })
    const entries = Object.entries(map).map(([day, amount]) => ({ day, amount }))
    if (!entries.length) return [{ day: 'No data', amount: 0 }]
    return entries.slice(-Number(chartRange))
  }, [expenses, chartRange])
  const filteredExpenses = expenses.filter(e => `${e.description} ${e.category}`.toLowerCase().includes(search.toLowerCase()) && (categoryFilter === 'All' || e.category === categoryFilter))
  const savingsTotal = goals.reduce((sum, g) => sum + Number(g.saved || 0), 0)
  const disciplineScore = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, usedPct - (dayOfMonth / daysInMonth * 100)) * 1.5 - (overBudget ? 20 : 0))))
  const unusualSpend = categoryData.filter(d => d.value > 0 && d.value > d.budget * 0.75).sort((a,b) => b.value/a.budget - a.value/b.budget)[0]
  useEffect(() => { localStorage.setItem(`mr-fintech-goals-${auth.id || auth.email}`, JSON.stringify(goals)) }, [goals, auth.id, auth.email])
  function exportCsv() { const rows = [['Date','Description','Category','Amount'], ...expenses.map(e => [e.date, e.description, e.category, e.amount])]; const csv = rows.map(r => r.map(v => `"${String(v ?? '').replaceAll('\"','\"\"')}"`).join(',')).join('\n'); const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'})); const a=document.createElement('a'); a.href=url; a.download='mr-fintech-transactions.csv'; a.click(); URL.revokeObjectURL(url) }
  function addGoal(ev) { ev.preventDefault(); if (!goalDraft.name.trim() || Number(goalDraft.target) <= 0) return; setGoals(prev => [...prev, {id:Date.now(), name:goalDraft.name.trim(), target:Number(goalDraft.target), saved:Number(goalDraft.saved)||0}]); setGoalDraft({name:'',target:'',saved:''}) }
  function updateGoal(id, saved) { setGoals(prev => prev.map(g => g.id === id ? {...g, saved:Math.max(0,Number(saved)||0)} : g)) }
  const dailyAverage = dayOfMonth ? Math.round(totalSpent / dayOfMonth) : 0
  const health = overBudget ? 'Needs attention' : usedPct > (dayOfMonth / daysInMonth * 100 + 15) ? 'Watch spending' : 'On track'

  async function addExpense(ev) {
    ev.preventDefault()
    const item = { ...form, amount: Number(form.amount), description: form.description.trim() }
    if (!item.description || !item.amount || item.amount <= 0) return
    try {
      const saved = await request('/expenses', { method: 'POST', body: JSON.stringify(item) })
      setExpenses(prev => [saved, ...prev])
      setApiConnected(true)
    } catch {
      setExpenses(prev => [{ ...item, id: `local-${Date.now()}` }, ...prev])
      setNotice('Saved in this browser session. Start the Spring Boot backend and MongoDB for persistent storage.')
    }
    setForm({ description: '', amount: '', category: 'Food', date: today })
    setShowModal(false)
  }

  async function deleteExpense(id) {
    if (!window.confirm('Delete this expense? This action cannot be undone.')) return
    try { if (!String(id).startsWith('seed-') && !String(id).startsWith('local-')) await request(`/expenses/${id}`, { method: 'DELETE' }) }
    catch { setNotice('Backend could not delete this item; it was removed from the current view only.') }
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  async function saveBudgets() {
    const total = Object.values(budgetDraft).reduce((s, v) => s + Number(v || 0), 0)
    try {
      await request('/budgets', { method: 'PUT', body: JSON.stringify({ monthlyBudget: total, categories: budgetDraft }) })
      setApiConnected(true)
    } catch { setNotice('Budget changes are currently local. Connect the Spring Boot backend to persist them.') }
    setBudgets(budgetDraft)
    setMonthlyBudget(total)
    setBudgetEdit(false)
  }

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Transactions', icon: ReceiptText },
    { label: 'Analytics', icon: ChartNoAxesCombined },
    { label: 'Budgets', icon: Wallet },
    { label: 'Savings goals', icon: TrendingUp },
    { label: 'User controls', icon: Settings },
    ...(auth.role === 'ADMIN' ? [{ label: 'Admin Control Center', icon: ShieldCheck }] : []),
  ]

  return <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark mr-mark">MR</div><div><strong>MR Fintech</strong><span>SMART MONEY. SMARTER DECISIONS.</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="sidebar-nav">{navItems.slice(0, 5).map(({label, icon: Icon}) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label)}><Icon size={18}/><span>{label}</span>{label === 'Transactions' && <span className="nav-count">{expenses.length}</span>}</button>)}</nav>
      <div className="workspace-label sidebar-section-label">ACCOUNT</div>
      <nav className="sidebar-nav account-nav">{navItems.slice(5).map(({label, icon: Icon}) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label)}><Icon size={18}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom">
        <div className="team-credit"><span>Developed by</span><strong>Manuj &amp; Rudransh</strong></div>
        <div className="profile"><div className="avatar">{(auth.name||'U').slice(0,1).toUpperCase()}</div><div className="profile-info"><strong>{auth.name}</strong><span>{auth.role === 'ADMIN' ? 'Administrator' : 'User account'}</span></div><button className="logout-mini" onClick={onLogout}>Log out</button></div>
      </div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <label className="global-search"><Search size={19}/><input aria-label="Search transactions" placeholder="Search transactions..." value={search} onChange={e=>{setSearch(e.target.value); if(e.target.value) setActiveNav('Transactions')}} /></label>
        <div className="top-actions"><button className="mac-icon-button notification-button" aria-label="Notifications" title="Notifications"><Bell size={19}/><i/></button><div className="top-profile"><div className="top-avatar">{(auth.name||'U').slice(0,1).toUpperCase()}</div><strong>{auth.name || 'User'}</strong><ChevronDown size={15}/></div></div>
      </header>

      <div className="page-wrap">
        <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot"/> YOUR MONEY, IN FOCUS</div><h1>{activeNav === 'Overview' ? `Hi, ${auth.role === 'ADMIN' ? 'Admin' : (auth.name || 'there').trim()}` : activeNav}</h1><p className="subtitle">A clearer picture of your money starts here.</p></div><div className="welcome-actions"><button className="date-button"><CalendarDays size={16}/> {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}<ChevronDown size={15}/></button><button className="primary-button" onClick={() => setShowModal(true)}><Plus size={18}/> Add expense</button></div></section>

        {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice('')}><X size={15}/></button></div>}

        {activeNav === 'Admin Control Center' && auth.role === 'ADMIN' && <AdminPanel />}
        {activeNav === 'User controls' && <section className="panel user-controls-panel"><div className="section-heading"><div><h2>User controls</h2><p>Manage your personal workspace preferences.</p></div><span className="role-tag user-tag">{auth.role === 'ADMIN' ? 'Administrator' : 'Personal account'}</span></div><div className="user-control-grid"><article className="user-control-card"><div><strong>Appearance</strong><span>Switch between light glass and dark appearance.</span></div><button className="secondary-button" onClick={()=>setDarkMode(v=>!v)}>{darkMode ? 'Use light mode' : 'Use dark mode'}</button></article><article className="user-control-card"><div><strong>Export your data</strong><span>Download your recorded transactions as a CSV file.</span></div><button className="secondary-button" onClick={exportCsv}>Export CSV ↓</button></article><article className="user-control-card"><div><strong>Signed-in account</strong><span>{auth.name} · {auth.email}</span></div><span className="role-tag">{auth.role}</span></article></div></section>}
        {activeNav === 'Transactions' && <div className="toolbar-panel panel"><div className="section-heading"><div><h2>Transaction history</h2><p>Search, filter and export your expense records.</p></div><button className="secondary-button" onClick={exportCsv}>Export CSV ↓</button></div><div className="filter-row"><label className="search-box"><Search size={15}/><input placeholder="Search transactions" value={search} onChange={e=>setSearch(e.target.value)}/></label><select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div></div>}
        {activeNav === 'Savings goals' && <section className="panel goals-panel"><div className="section-heading"><div><h2>Your savings goals</h2><p>Build a buffer for the things that matter.</p></div><span className="role-tag user-tag">{goals.length} goals</span></div><form className="goal-form" onSubmit={addGoal}><input required placeholder="Goal name (e.g. New laptop)" value={goalDraft.name} onChange={e=>setGoalDraft({...goalDraft,name:e.target.value})}/><input required type="number" min="1" placeholder="Target ₹" value={goalDraft.target} onChange={e=>setGoalDraft({...goalDraft,target:e.target.value})}/><input type="number" min="0" placeholder="Already saved ₹" value={goalDraft.saved} onChange={e=>setGoalDraft({...goalDraft,saved:e.target.value})}/><button className="primary-button">Add goal</button></form><div className="goal-grid">{goals.map(g=>{const pct=Math.min(100,Math.round(g.saved/g.target*100));return <article className="goal-card" key={g.id}><div className="goal-top"><strong>{g.name}</strong><button onClick={()=>setGoals(prev=>prev.filter(x=>x.id!==g.id))}>×</button></div><div className="goal-amount">{money(g.saved)} <small>of {money(g.target)}</small></div><div className="budget-track"><span style={{width:`${pct}%`}}/></div><div className="budget-foot"><span>{pct}% complete</span><span>{money(Math.max(0,g.target-g.saved))} to go</span></div><label className="goal-update">Update saved amount<input type="number" min="0" value={g.saved} onChange={e=>updateGoal(g.id,e.target.value)}/></label></article>})}{!goals.length&&<div className="empty-state">No goals yet. Create your first savings goal above.</div>}</div></section>}
        {activeNav === 'Budgets' && <section className="budget-edit-panel panel"><div className="section-heading"><div><h2>Monthly category budgets</h2><p>Adjust limits to match your monthly allowance.</p></div><button className="secondary-button" onClick={() => budgetEdit ? saveBudgets() : setBudgetEdit(true)}>{budgetEdit ? 'Save budgets' : 'Edit budgets'}</button></div><div className="budget-edit-grid">{categories.map((c, i) => <label key={c}><span>{c}</span><div className="budget-input-wrap"><span>₹</span><input type="number" disabled={!budgetEdit} value={budgetDraft[c]} onChange={e => setBudgetDraft(p => ({...p, [c]: Number(e.target.value)}))}/></div></label>)}</div></section>}

        {activeNav === 'Analytics' && <section className="analytics-insights"><div className="panel insight-tile"><span className="eyebrow">SPENDING INTELLIGENCE</span><h2>{money(forecast)}</h2><p>Projected month-end spending using your current average daily spend. This is a baseline forecast, not a trained ML prediction.</p></div><div className="panel insight-tile"><span className="eyebrow">BUDGET DISCIPLINE SCORE</span><h2>{disciplineScore}/100</h2><p>{disciplineScore >= 80 ? 'Great pace. You are keeping spending aligned with the calendar.' : 'Review category limits and slow discretionary spending.'}</p></div><div className="panel insight-tile"><span className="eyebrow">SMART SPENDING ALERT</span><h2>{unusualSpend ? unusualSpend.name : 'All clear'}</h2><p>{unusualSpend ? `${unusualSpend.name} has used ${Math.round(unusualSpend.value/(unusualSpend.budget||1)*100)}% of its category budget.` : 'No category has crossed 75% of its budget yet.'}</p></div><div className="panel insight-tile"><span className="eyebrow">ACHIEVEMENT</span><h2>{totalSpent > 0 ? 'First steps unlocked' : 'Ready to begin?'}</h2><p>{totalSpent > 0 ? 'You have started tracking your money. Keep your streak alive by recording expenses regularly.' : 'Add your first expense to unlock your tracking milestone.'}</p></div></section>}
        {!['Savings goals','Analytics','User controls','Admin Control Center'].includes(activeNav) && <section className="stat-grid">
          <div className="stat-card"><div className="stat-top"><span>Total monthly budget</span><div className="stat-icon purple"><Wallet size={19}/></div></div><div className="stat-value">{money(monthlyBudget)}</div><div className="stat-foot"><span className="neutral-pill"><CalendarDays size={13}/> Monthly plan</span><span className="muted">Your spending limit</span></div><div className="mini-track"><span style={{width:`${usedPct}%`}}/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Total spent</span><div className="stat-icon teal"><CreditCard size={19}/></div></div><div className="stat-value">{money(totalSpent)}</div><div className="stat-foot"><span className="positive"><ArrowUpRight size={14}/>{usedPct}%</span><span className="muted">of total budget used</span></div><div className="mini-track teal-track"><span style={{width:`${usedPct}%`}}/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Remaining balance</span><div className="stat-icon blue"><CircleDollarSign size={19}/></div></div><div className="stat-value">{money(remaining)}</div><div className="stat-foot"><span className={remaining >= 0 ? 'positive' : 'negative'}>{remaining >= 0 ? 'Available' : 'Over budget'}</span><span className="muted">to use this month</span></div><div className="mini-track blue-track"><span style={{width:`${Math.max(0,100-usedPct)}%`}}/></div></div>

        </section>}


        {!['Overview','User controls','Admin Control Center'].includes(activeNav) && <section className="insight-banner"><div className="insight-symbol"><Sparkles size={20}/></div><div className="insight-copy"><strong>{overBudget ? 'Your spending may need attention' : 'You’re building good money habits'}</strong><p>{overBudget ? `At your current pace, you may spend ${money(forecast-monthlyBudget)} more than your budget this month. Review non-essential expenses.` : `Your budget health is looking ${health.toLowerCase()}. Keep tracking your expenses to stay in control.`}</p></div><div className={`health-badge ${overBudget ? 'warning' : ''}`}><ShieldCheck size={15}/>{health}</div></section>}

        {!['Savings goals','Analytics','User controls','Admin Control Center'].includes(activeNav) && <section className="charts-grid">
          <div className="panel trend-panel"><div className="section-heading"><div><h2>Spending overview</h2><p>Recent recorded spending</p></div><label className="period-select"><span className="sr-only">Chart range</span><select value={chartRange} onChange={e=>setChartRange(e.target.value)}><option value="7">Last 7 entries</option><option value="30">Last 30 entries</option></select><ChevronDown size={14}/></label></div><div className="chart-legend"><span><i className="legend-dot purple-dot"/> Daily expenses</span><span className="chart-total">{money(totalSpent)} <small>total recorded</small></span></div><div className="trend-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{top:12,right:8,left:-18,bottom:0}}><defs><linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#287cf0" stopOpacity={0.25}/><stop offset="95%" stopColor="#287cf0" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#34415e" strokeDasharray="4 5" vertical={false}/><XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill:'#7b8da9',fontSize:11}} dy={10}/><YAxis tickLine={false} axisLine={false} tick={{fill:'#7b8da9',fontSize:11}} tickFormatter={v=>v===0?'₹0':`₹${v}`} /><Tooltip formatter={v=>money(v)} contentStyle={{border:'1px solid #dce7f5',borderRadius:12,fontSize:12,background:'#ffffff',color:'#19345f'}}/><Area type="monotone" dataKey="amount" stroke="#7779f8" strokeWidth={2.5} fill="url(#spendGradient)" activeDot={{r:5,strokeWidth:0}}/></AreaChart></ResponsiveContainer></div></div>
          <div className="panel category-panel"><div className="section-heading"><div><h2>Spending by category</h2><p>Where your money goes</p></div><button className="dots-button"><MoreHorizontal size={20}/></button></div><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData.filter(d=>d.value>0)} dataKey="value" nameKey="name" innerRadius={67} outerRadius={91} paddingAngle={4} stroke="none">{categoryData.filter(d=>d.value>0).map(d=><Cell key={d.name} fill={d.color}/>)}</Pie><Tooltip formatter={v=>money(v)}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{money(totalSpent)}</strong><span>Total spent</span></div></div><div className="category-legend">{categoryData.filter(d=>d.value>0).sort((a,b)=>b.value-a.value).slice(0,4).map(d=><div key={d.name}><span><i style={{background:d.color}}/>{d.name}</span><strong>{money(d.value)}</strong></div>)}</div></div>
        </section>}

        {!['Overview','Savings goals','Analytics','User controls','Admin Control Center'].includes(activeNav) && <section className="lower-grid">
          <div className="panel transactions-panel"><div className="section-heading"><div><h2>Recent transactions</h2><p>Your latest expense activity</p></div><div className="transaction-actions"><button className="text-button" onClick={exportCsv}>Export CSV ↓</button><label className="search-box"><Search size={15}/><input placeholder="Search expenses" value={search} onChange={e=>setSearch(e.target.value)}/></label><button className="text-button" onClick={()=>setActiveNav('Transactions')}>View all <ArrowUpRight size={14}/></button></div></div><div className="transaction-table"><div className="table-head"><span>TRANSACTION</span><span>CATEGORY</span><span>DATE</span><span className="align-right">AMOUNT</span><span/></div>{(activeNav === 'Transactions' ? filteredExpenses : filteredExpenses.slice(0,3)).map(e=>{const Icon=iconMap[e.category]||CircleDollarSign;return <div className="transaction-row" key={e.id}><div className="transaction-name"><div className={`transaction-icon cat-${(e.category||'other').toLowerCase()}`}><Icon size={17}/></div><div><strong>{e.description}</strong><span>Personal expense</span></div></div><div><span className="category-chip">{e.category}</span></div><div className="date-cell">{e.date}</div><div className="amount-cell">−{money(e.amount)}</div><button className="delete-button" aria-label="Delete expense" onClick={()=>deleteExpense(e.id)}><Trash2 size={15}/></button></div>})}{filteredExpenses.length===0&&<div className="empty-state">No transactions found. Add an expense to get started.</div>}</div></div>
          <div className="panel category-budget-panel"><div className="section-heading"><div><h2>Budget by category</h2><p>Spending against your limits</p></div><button className="dots-button" onClick={()=>setActiveNav('Budgets')}><ArrowUpRight size={17}/></button></div><div className="budget-list">{categoryData.map(d=>{const pct=d.budget?Math.round(d.value/d.budget*100):0;return <div className="budget-item" key={d.name}><div className="budget-line"><span><i style={{background:d.color}}/>{d.name}</span><strong>{money(d.value)} <small>/ {money(d.budget)}</small></strong></div><div className="budget-track"><span style={{width:`${Math.min(pct,100)}%`,background:d.color}}/></div><div className="budget-foot"><span>{pct}% used</span><span className={pct>100?'negative':''}>{pct>100?'Limit exceeded':`${money(Math.max(0,d.budget-d.value))} left`}</span></div></div>})}</div></div>
        </section>}
        {!['Overview','Savings goals','Analytics','User controls','Admin Control Center'].includes(activeNav) && <footer className="footer"><span>© 2026 MR Fintech · Personal Finance Manager</span><span><span className="footer-dot"/> Designed for mindful spending</span></footer>}
      </div>
    </main>

    {showModal && <div className="modal-backdrop" onClick={()=>setShowModal(false)}><section className="modal mac-window" role="dialog" aria-modal="true" aria-labelledby="add-transaction-title" onClick={e=>e.stopPropagation()}><div className="mac-titlebar"><div className="traffic-lights"><button className="traffic red" aria-label="Close" onClick={()=>setShowModal(false)}/><span className="traffic yellow"/><span className="traffic green"/></div><strong id="add-transaction-title">Add Transaction</strong><span className="titlebar-spacer"/></div><div className="mac-modal-content"><div className="transaction-type"><span className="type-active"><ArrowUpRight size={18}/> Expense</span><span className="type-disabled" title="Income tracking is not enabled in this version"><ArrowDownRight size={18}/> Income</span></div><form onSubmit={addExpense}><label>Amount<input className="amount-input" required type="number" min="1" step="1" placeholder="₹ 0.00" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></label><div className="form-row"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label>Date<input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label></div><label>Description <span className="optional-label">(Optional)</span><input maxLength="100" placeholder="e.g. Lunch at cafe" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><div className="mac-modal-actions"><button type="button" className="mac-cancel" onClick={()=>setShowModal(false)}>Cancel</button><button className="primary-button submit-button" type="submit"><Plus size={16}/> Add Transaction</button></div></form></div></section></div>}
  </div>
}


function AdminPanel(){const [data,setData]=useState(null);const [error,setError]=useState('');useEffect(()=>{request('/admin/users').then(setData).catch(e=>setError(e.message))},[]);return <section className="admin-panel panel"><div className="section-heading"><div><div className="eyebrow">ADMIN CONTROL CENTER</div><h2 style={{marginTop:7}}>Platform users</h2><p>Accounts registered on MR Fintech. User expenses remain private to each account.</p></div><div className="admin-total"><strong>{data?.totalUsers ?? '—'}</strong><span>registered accounts</span></div></div>{error?<p className="admin-error">{error}</p>:<div className="admin-users">{(data?.users||[]).map(u=><div className="admin-user" key={u.id}><div className="admin-user-avatar">{u.name?.slice(0,1).toUpperCase()}</div><div className="admin-user-info"><strong>{u.name}</strong><span>{u.email}</span></div><span className={`role-tag ${u.role==='ADMIN'?'admin-tag':'user-tag'}`}>{u.role}</span></div>)}</div>}</section>}

function AuthScreen({onAuth}){const [mode,setMode]=useState('login');const [form,setForm]=useState({name:'',email:'',password:''});const [error,setError]=useState('');const [busy,setBusy]=useState(false);async function submit(e){e.preventDefault();setBusy(true);setError('');try{const user=await request(`/auth/${mode}`,{method:'POST',body:JSON.stringify(form)});if(mode==='register'){setMode('login');setError('Account created. Please sign in.');}else onAuth(user)}catch(err){setError(err.message)}finally{setBusy(false)}}return <div className="auth-screen"><div className="auth-card"><div className="auth-brand"><div className="brand-mark mr-mark">MR</div><div><strong>MR Fintech</strong><span>SMART MONEY. SMARTER DECISIONS.</span></div></div><div className="auth-eyebrow">YOUR MONEY, IN FOCUS</div><h1>{mode==='login'?'Welcome back':'Create your account'}</h1><p className="auth-sub">{mode==='login'?'Sign in to manage your personal budget.':'Start tracking your expenses and building better habits.'}</p><form onSubmit={submit}>{mode==='register'&&<label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>}<label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label>Password<input required minLength="8" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="At least 8 characters"/></label>{error&&<div className="auth-error">{error}</div>}<button className="primary-button auth-submit" disabled={busy}>{busy?'Please wait…':mode==='login'?'Sign in':'Create account'}</button></form><div className="auth-switch">{mode==='login'?"New to MR Fintech?":"Already have an account?"}<button onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}}>{mode==='login'?'Create an account':'Sign in'}</button></div><div className="auth-foot"><ShieldCheck size={14}/> Your expenses are private to your account.</div></div></div>}

export default function App(){const [auth,setAuth]=useState(null);const [checking,setChecking]=useState(true);useEffect(()=>{request('/auth/me').then(setAuth).catch(()=>setAuth(null)).finally(()=>setChecking(false))},[]);async function logout(){try{await request('/auth/logout',{method:'POST'})}finally{setAuth(null)}}if(checking)return <div className="auth-loading">Loading MR Fintech…</div>;return auth?<DashboardApp auth={auth} onLogout={logout}/>:<AuthScreen onAuth={setAuth}/> }
