import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import AuctionsGrid from './components/AuctionsGrid'
import Footer from './components/Footer'
import HowItWorks from './components/HowItWorks'
import GuidesPage from './components/GuidesPage'
import ListYourPage from './components/ListYourPage'
import { auth } from './firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import './index.css'

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const renderRoute = () => {
    if (route === '#/auctions/new-listing') return <ListYourPage onAuthClick={openAuthModal} />
    if (route === '#/how-it-works') return <HowItWorks />
    if (route === '#/guides') return <GuidesPage />
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Hero />
        <section className="mt-10">
          <div className="flex flex-col gap-2">
            <div className="h-0.5 w-24 bg-black"></div>
            <h2 className="text-3xl font-bold uppercase">Active Auctions</h2>
          </div>
          <AuctionsGrid />
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav onAuthClick={openAuthModal} user={user} onSignOut={() => signOut(auth)} />
      <main className="flex-grow">{renderRoute()}</main>
      <Footer onAuthClick={openAuthModal} />
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => setAuthModalOpen(false)}
        />
      )}
    </div>
  )
}

function AuthModal({ mode, onClose, onSuccess }) {
  const [viewMode, setViewMode] = useState(mode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { setViewMode(mode); setError('') }, [mode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (viewMode === 'signup') {
        if (password !== confirm) { setError('Passwords do not match.'); return }
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onSuccess()
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/70 p-6">
      <div className="w-full max-w-md rounded-[32px] bg-white shadow-2xl ring-1 ring-black/10">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{viewMode === 'signup' ? 'Sign Up' : 'Sign In'}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {viewMode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">×</button>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="flex rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => { setViewMode('login'); setError('') }}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-[0.15em] transition ${viewMode === 'login' ? 'bg-black text-white' : 'bg-white text-slate-700'}`}
            >Sign In</button>
            <button
              onClick={() => { setViewMode('signup'); setError('') }}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-[0.15em] transition ${viewMode === 'signup' ? 'bg-black text-white' : 'bg-white text-slate-700'}`}
            >Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            <input
              type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
            {viewMode === 'signup' && (
              <input
                type="password" placeholder="Confirm Password" value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-gray-800 transition">
              {viewMode === 'signup' ? 'Create Account' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
