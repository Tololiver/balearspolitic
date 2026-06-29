// src/admin/AdminLayout.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, Home, PenLine, Users, MapPin,
  Calendar, FileText, Vote, BarChart2, LogOut, Radio, Settings
} from 'lucide-react'
import AdminPartits      from './AdminPartits'
import AdminPobles       from './AdminPobles'
import AdminGoverns      from './AdminGoverns'
import AdminProgrames    from './AdminProgrames'
import AdminBlog         from './AdminBlog'
import AdminHome         from './AdminHome'
import AdminCandidatures from './AdminCandidatures'
import AdminSondejos        from './AdminSondejos'
import AdminClipping        from './AdminClipping'
import AdminClippingConfig  from './AdminClippingConfig'
import { LoadingSpinner } from '@/components/ui'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

const NAV = [
  { to:'/admin',              label:'Dashboard',      icon:LayoutDashboard, end:true },
  { to:'/admin/home',         label:'Home',           icon:Home },
  { to:'/admin/blog',         label:'Blog',           icon:PenLine },
  { to:'/admin/partits',      label:'Partits',        icon:Users },
  { to:'/admin/pobles',       label:'Ajuntaments',    icon:MapPin },
  { to:'/admin/governs',      label:'Governs',        icon:Calendar },
  { to:'/admin/programes',    label:'Programes',      icon:FileText },
  { to:'/admin/candidatures', label:'Candidatures 27',icon:Vote },
  { to:'/admin/sondejos',      label:'Sondejos 2027',   icon:BarChart2 },
  { to:'/admin/clipping',       label:'Clipping',        icon:Radio },
  { to:'/admin/clipping-config',label:'Config Clipping', icon:Settings },
]

export default function AdminLayout() {
  const [session, setSession] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return <div className="min-h-screen bg-ink flex items-center justify-center"><LoadingSpinner /></div>
  if (!session) return <AdminLogin loading={loading} setLoading={setLoading} />
  if (session.user.email !== ADMIN_EMAIL) return <AdminUnauthorized />

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="w-56 bg-ink text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="font-display text-lg font-black leading-none">
            Balears<em className="not-italic" style={{color:'#43F8CC'}}>Politic</em>
          </div>
          <div className="font-mono text-[9px] tracking-widest uppercase text-white/30 mt-1">CMS Admin</div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-colors
                 ${isActive ? 'bg-white/10 text-white' : 'text-white/45 hover:text-white/70 hover:bg-white/5'}`
              }>
              <Icon size={14} strokeWidth={1.5}/>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-[10px] text-white/25 font-mono mb-2 truncate">{session.user.email}</div>
          <button onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
            <LogOut size={12} strokeWidth={1.5}/> Tancar sessió
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index              element={<AdminDashboard />} />
          <Route path="home"        element={<AdminHome />} />
          <Route path="blog"        element={<AdminBlog />} />
          <Route path="partits"     element={<AdminPartits />} />
          <Route path="pobles"      element={<AdminPobles />} />
          <Route path="governs"     element={<AdminGoverns />} />
          <Route path="programes"   element={<AdminProgrames />} />
          <Route path="candidatures" element={<AdminCandidatures />} />
          <Route path="sondejos"       element={<AdminSondejos />} />
        <Route path="clipping"       element={<AdminClipping />} />
        <Route path="clipping-config" element={<AdminClippingConfig />} />
        </Routes>
      </main>
    </div>
  )
}

function AdminLogin({ loading, setLoading }) {
  const handleGoogle = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    })
  }
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="bg-white rounded-card p-8 w-80 shadow-lg text-center">
        <div className="font-display text-2xl font-black mb-1">
          Balears<em className="not-italic text-accent">Politic</em>
        </div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-mid mb-6">CMS Admin</div>
        <button onClick={handleGoogle} disabled={loading}
          className="w-full bg-ink text-white rounded-lg py-3 text-sm font-semibold hover:bg-ink/90 disabled:opacity-50">
          {loading ? 'Entrant...' : 'Accedir amb Google'}
        </button>
      </div>
    </div>
  )
}

function AdminUnauthorized() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center text-center">
      <div>
        <div className="font-display text-2xl font-black text-white mb-2">Accés no autoritzat</div>
        <button onClick={() => supabase.auth.signOut()} className="text-accent text-sm underline">Tancar sessió</button>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const items = [
    { label:'Home',            icon:Home,         to:'/admin/home' },
    { label:'Blog',            icon:PenLine,      to:'/admin/blog' },
    { label:'Partits',         icon:Users,        to:'/admin/partits' },
    { label:'Ajuntaments',     icon:MapPin,       to:'/admin/pobles' },
    { label:'Governs',         icon:Calendar,     to:'/admin/governs' },
    { label:'Programes',       icon:FileText,     to:'/admin/programes' },
    { label:'Candidatures 27', icon:Vote,         to:'/admin/candidatures' },
    { label:'Sondejos 2027',   icon:BarChart2,    to:'/admin/sondejos' },
  ]
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-black mb-1">Dashboard</h1>
      <p className="text-mid text-sm mb-8">Benvingut al CMS de BalearsPolitic.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ label, icon: Icon, to }) => (
          <NavLink key={label} to={to}
            className="bg-white rounded-card p-5 shadow-card border border-border hover:shadow-lg hover:border-mid transition-all text-center group">
            <div className="flex justify-center mb-3 text-mid group-hover:text-accent transition-colors">
              <Icon size={24} strokeWidth={1.5}/>
            </div>
            <div className="font-semibold text-sm">{label}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
