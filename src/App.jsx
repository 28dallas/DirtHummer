import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import AuctionsGrid from './components/AuctionsGrid'
import Footer from './components/Footer'
import HowItWorks from './components/HowItWorks'
import GuidesPage from './components/GuidesPage'
import ListYourPage from './components/ListYourPage'
import './index.css'

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setAuthModalOpen(false)
  }

  const renderRoute = () => {
    if (route === '#/auctions/new-listing') {
      return <ListYourPage onAuthClick={openAuthModal} />
    }

    if (route === '#/how-it-works') {
      return <HowItWorks />
    }

    if (route === '#/guides') {
      return <GuidesPage />
    }

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
      <Nav onAuthClick={openAuthModal} />
      <main className="flex-grow">{renderRoute()}</main>
      <Footer onAuthClick={openAuthModal} />
      {authModalOpen && <AuthModal mode={authMode} onClose={closeAuthModal} />}
    </div>
  )
}

function AuthModal({ mode, onClose }) {
  const [viewMode, setViewMode] = useState(mode)
  const [statusMessage, setStatusMessage] = useState('')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ email: '', password: '', confirm: '' })

  useEffect(() => {
    setViewMode(mode)
    setStatusMessage('')
    setLoginData({ email: '', password: '' })
    setSignupData({ email: '', password: '', confirm: '' })
  }, [mode])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    if (!loginData.email || !loginData.password) {
      setStatusMessage('Please enter both email and password.')
      return
    }
    setStatusMessage('Signed in successfully. Welcome back!')
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault()
    if (!signupData.email || !signupData.password || !signupData.confirm) {
      setStatusMessage('Please fill in all signup fields.')
      return
    }
    if (signupData.password !== signupData.confirm) {
      setStatusMessage('Passwords do not match.')
      return
    }
    setStatusMessage('Account created successfully. Welcome to Dirthummer!')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/70 p-6">
      <div className="w-full max-w-xl rounded-[32px] bg-white shadow-2xl ring-1 ring-black/10">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{viewMode === 'signup' ? 'Sign Up' : 'Sign In'}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{viewMode === 'signup' ? 'Create your Dirthummer account' : 'Welcome back'}</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => setViewMode('login')}
                className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold uppercase transition ${viewMode === 'login' ? 'bg-black text-white' : 'bg-white text-slate-900 border border-slate-300'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setViewMode('signup')}
                className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold uppercase transition ${viewMode === 'signup' ? 'bg-black text-white' : 'bg-white text-slate-900 border border-slate-300'}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
            <form onSubmit={viewMode === 'signup' ? handleSignupSubmit : handleLoginSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  value={viewMode === 'signup' ? signupData.email : loginData.email}
                  onChange={(event) => {
                    const value = event.target.value
                    if (viewMode === 'signup') {
                      setSignupData((prev) => ({ ...prev, email: value }))
                    } else {
                      setLoginData((prev) => ({ ...prev, email: value }))
                    }
                  }}
                  placeholder="Email"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  value={viewMode === 'signup' ? signupData.password : loginData.password}
                  onChange={(event) => {
                    const value = event.target.value
                    if (viewMode === 'signup') {
                      setSignupData((prev) => ({ ...prev, password: value }))
                    } else {
                      setLoginData((prev) => ({ ...prev, password: value }))
                    }
                  }}
                  placeholder="Password"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </label>
              {viewMode === 'signup' && (
                <label className="block text-sm font-medium text-slate-700">
                  Confirm Password
                  <input
                    type="password"
                    value={signupData.confirm}
                    onChange={(event) => setSignupData((prev) => ({ ...prev, confirm: event.target.value }))}
                    placeholder="Confirm Password"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                  />
                </label>
              )}
              <button className="w-full rounded-full bg-black px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-gray-800">
                {viewMode === 'signup' ? 'Create Account' : 'Log In'}
              </button>
            </form>
            {statusMessage && (
              <div className="mt-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
