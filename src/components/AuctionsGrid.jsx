import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const placeholderImage = 'https://images.unsplash.com/photo-1504198458649-3128b932f49f?auto=format&fit=crop&w=960&q=80'

const localImageFiles = import.meta.glob('../../IMG/**/*.{jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' })
const imageMap = Object.fromEntries(
  Object.entries(localImageFiles).map(([key, value]) => [
    key.replace(/\\/g, '/').replace(/^([.][.][\/]*)+IMG\//, ''),
    value
  ])
)

const localImage = (relativePath) => {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^([.][.][\/]*)+IMG\//, '')
  return imageMap[normalized] || placeholderImage
}

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const formatNumber = (value) => String(value).padStart(2, '0')

    const calculateTime = () => {
      const now = Date.now()
      const end = new Date(endDate).getTime()
      const distance = end - now

      if (distance <= 0) {
        setTimeLeft('ENDED')
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(
        `${days}D ${formatNumber(hours)}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`
      )
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return <span>{timeLeft}</span>
}

function BidModal({ auction, onClose, isLoggedIn, onLoginSuccess }) {
  const [viewMode, setViewMode] = useState(isLoggedIn ? 'payment' : 'signup')
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ email: '', password: '', confirm: '' })

  useEffect(() => {
    if (auction) {
      setViewMode(isLoggedIn ? 'payment' : 'signup')
      setError('')
      setLoginData({ email: '', password: '' })
      setSignupData({ email: '', password: '', confirm: '' })
    }
  }, [auction, isLoggedIn])

  if (!auction) return null

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!loginData.email || !loginData.password) { setError('Please enter email and password.'); return }
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      onLoginSuccess()
      setViewMode('payment')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (!signupData.email || !signupData.password || !signupData.confirm) { setError('Please fill in all fields.'); return }
    if (signupData.password !== signupData.confirm) { setError('Passwords do not match.'); return }
    try {
      await createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      onLoginSuccess()
      setViewMode('payment')
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/70 p-6">
      <div className="w-full max-w-4xl rounded-[32px] bg-white shadow-2xl ring-1 ring-black/10">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Place a bid</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{auction.title}</h2>
            {auction.currentBid !== undefined && (
              <p className="mt-1 text-sm font-semibold text-slate-600">Current Bid: ${auction.currentBid.toLocaleString()}</p>
            )}
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">×</button>
        </div>

        <div className="px-6 py-6">
          {viewMode === 'payment' ? (
            <Elements stripe={stripePromise}>
              <StripePaymentForm auction={auction} />
            </Elements>
          ) : (
            <div className="mx-auto max-w-md space-y-4">
              <div className="flex rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => { setViewMode('signup'); setError('') }}
                  className={`flex-1 py-3 text-sm font-bold uppercase tracking-[0.15em] transition ${
                    viewMode === 'signup' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >Sign Up</button>
                <button
                  onClick={() => { setViewMode('login'); setError('') }}
                  className={`flex-1 py-3 text-sm font-bold uppercase tracking-[0.15em] transition ${
                    viewMode === 'login' ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >Log In</button>
              </div>

              <form onSubmit={viewMode === 'signup' ? handleSignupSubmit : handleLoginSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={viewMode === 'signup' ? signupData.email : loginData.email}
                  onChange={(e) => viewMode === 'signup'
                    ? setSignupData(p => ({ ...p, email: e.target.value }))
                    : setLoginData(p => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={viewMode === 'signup' ? signupData.password : loginData.password}
                  onChange={(e) => viewMode === 'signup'
                    ? setSignupData(p => ({ ...p, password: e.target.value }))
                    : setLoginData(p => ({ ...p, password: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                />
                {viewMode === 'signup' && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.confirm}
                    onChange={(e) => setSignupData(p => ({ ...p, confirm: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
                  />
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button className="w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-gray-800 transition">
                  {viewMode === 'signup' ? 'Create Account & Continue' : 'Log In & Continue'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StripePaymentForm({ auction }) {
  const stripe = useStripe()
  const elements = useElements()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState('US')

  const inputStyle = {
    style: { base: { fontSize: '15px', color: '#111827', '::placeholder': { color: '#9ca3af' } } }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('http://localhost:4242/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: auction.currentBid || 0 }),
      })
      const { clientSecret, error: serverError } = await res.json()
      if (serverError) { setResult(serverError); setLoading(false); return }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardNumberElement) },
      })
      if (error) {
        setResult(error.message)
      } else if (paymentIntent.status === 'succeeded') {
        setResult(`Payment of $${auction.currentBid?.toLocaleString()} succeeded!`)
      }
    } catch (err) {
      setResult('Server error. Is the backend running?')
    }
    setLoading(false)
  }

  const countries = [
    'United States', 'Kenya', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'South Africa', 'Nigeria', 'India'
  ]

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Add Payment Method</h3>
      <p className="text-sm text-slate-500 mb-5">Your payment method will be used to authorize holds when you place bids, make offers, or submit listings.</p>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600">💳</span>
          <span className="font-semibold text-slate-800">Card</span>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Card number</label>
          <div className="rounded-xl border border-slate-300 bg-white px-4 py-3">
            <CardNumberElement options={inputStyle} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Expiration date</label>
            <div className="rounded-xl border border-slate-300 bg-white px-4 py-3">
              <CardExpiryElement options={inputStyle} />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Security code</label>
            <div className="rounded-xl border border-slate-300 bg-white px-4 py-3">
              <CardCvcElement options={inputStyle} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none"
          >
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <p className="text-xs text-slate-400">By providing your card information, you allow DirtHammer to charge your card for future payments in accordance with their terms.</p>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Processing…' : `Save Payment Method`}
        </button>
      </form>
      {result && (
        <div className={`mt-4 rounded-2xl border p-4 text-sm ${
          result.includes('succeeded') ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-900'
        }`}>{result}</div>
      )}
    </div>
  )
}

function AuctionCard({ auction, actionLabel = 'Bid', onActionClick }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [auction.id])

  const imageCount = auction.images.length

  const prevImage = () => setActiveIndex((current) => (current - 1 + imageCount) % imageCount)
  const nextImage = () => setActiveIndex((current) => (current + 1) % imageCount)

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition">
      <div className="relative h-56 overflow-hidden bg-slate-900">
        <img
          src={auction.images[activeIndex]}
          alt={auction.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = placeholderImage
          }}
        />
        <div className="absolute inset-y-0 left-0 flex items-center px-2">
          <button
            type="button"
            onClick={prevImage}
            className="rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button
            type="button"
            onClick={nextImage}
            className="rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
          >
            ›
          </button>
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-black/70 text-white text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1">
          {activeIndex + 1} / {imageCount} photos
        </div>
        {auction.status && (
          <div className="absolute right-4 top-4 rounded-full bg-red-600 text-white text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1">
            {auction.status}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.08em] leading-5 text-gray-900 mb-3 min-h-[3rem]">
          {auction.title}
        </h3>

        <div className="space-y-3 text-xs text-gray-600">
          {auction.currentBid !== undefined && (
            <div className="flex justify-between items-center">
              <span className="uppercase font-semibold">Current Bid</span>
              <span className="font-bold text-black">${auction.currentBid.toLocaleString()}</span>
            </div>
          )}

          {auction.endDate && (
            <div className="flex justify-between items-center">
              <span className="uppercase font-semibold">Time Left</span>
              <span className="font-mono text-gray-900 font-semibold">
                <CountdownTimer endDate={auction.endDate} />
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onActionClick}
          className="mt-4 w-full rounded-full bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export default function AuctionsGrid() {
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setIsLoggedIn(!!user))
    return unsub
  }, [])

  const activeAuctions = [
    {
      id: 1,
      title: '2024 CAN-AM MAVERICK X3 RACE CAR BUILT BY KYLE CHANEY',
      currentBid: 45000,
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-filhos-do-vento-599960230-17244207.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-joaquin-delgado-497073239-23325251.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-mohammed-shaheen-1748548104-31722979.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-shootsaga-30707648.jpg')
      ]
    },
    {
      id: 2,
      title: '2023 HONDA TALON 1000R-4 FOX LIVE VALVE',
      currentBid: 2000,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-cacito-13038487.jpg'),
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-chicalidemicorazon-28517519.jpg'),
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-nattipat-vesvarute-2233071-34920801.jpg')
      ]
    },
    {
      id: 3,
      title: '1986 HONDA ATC 250ES BIG RED',
      currentBid: 1200,
      endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-emir-anik-45418356-19297047.jpg'),
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-frentescuphotography-8654635.jpg'),
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-introspectivedsgn-9182761.jpg'),
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-jomon-kollannoor-337112572-28843064.jpg'),
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-raymond-petrik-1448389535-27405038.jpg')
      ]
    },
    {
      id: 4,
      title: '2025 HONDA TALON 1000X FOX LIVE VALVE',
      currentBid: 1000,
      endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-cacito-13038487.jpg'),
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-chicalidemicorazon-28517519.jpg'),
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-nattipat-vesvarute-2233071-34920801.jpg')
      ]
    },
    {
      id: 5,
      title: '2023 MASSIMO T-BOSS 1100D',
      currentBid: 1000,
      endDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-amar-13039735.jpg'),
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-dursun-yildirim-154216567-22626504.jpg'),
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-merakshot-4480898.jpg')
      ]
    },
    {
      id: 6,
      title: '2026 HONDA PIONEER 520',
      currentBid: 1000,
      endDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-filhos-do-vento-599960230-17244207.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-joaquin-delgado-497073239-23325251.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-mohammed-shaheen-1748548104-31722979.jpg')
      ]
    }
  ]

  const upcomingAuctions = [
    {
      id: 7,
      title: '2023 CAN-AM MAVERICK X3 MAX XRST TURBO RR',
      status: 'Coming 04/25',
      images: [
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-filhos-do-vento-599960230-17244207.jpg'),
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-joaquin-delgado-497073239-23325251.jpg')
      ]
    }
  ]

  const completedAuctions = [
    {
      id: 8,
      title: '1985 KAWASAKI KLF250',
      currentBid: 2780,
      endDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/Honda Talon 1000R-4 Fox Live/pexels-cacito-13038487.jpg')
      ]
    },
    {
      id: 9,
      title: '2020 E-Z GO RXV',
      currentBid: 10000,
      endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-amar-13039735.jpg')
      ]
    },
    {
      id: 10,
      title: '1982 HONDA ATC 250R',
      currentBid: 5400,
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/1986 Honda ATC 250ES Big Red/pexels-frentescuphotography-8654635.jpg')
      ]
    },
    {
      id: 11,
      title: '2020 E-Z GO RXV',
      currentBid: 10000,
      endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-dursun-yildirim-154216567-22626504.jpg')
      ]
    },
    {
      id: 12,
      title: '2021 SPEER UTV 4X4 JET',
      currentBid: 21000,
      endDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2024 Can-Am Maverick X3 Race Car Built By Kyle Chaney/pexels-mohammed-shaheen-1748548104-31722979.jpg')
      ]
    },
    {
      id: 13,
      title: '2013 ARGO XTW 750 HDI',
      currentBid: 12100,
      endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        localImage('../../IMG/2023 Massimo T-Boss 1100D/pexels-merakshot-4480898.jpg')
      ]
    }
  ]

  const partnerLogos = [
    { name: 'Jalopnik', src: 'https://dirthammer.com/partner-logos/jalopnik-logo.svg' },
    { name: 'Gear Junkie', src: 'https://dirthammer.com/partner-logos/gearjunkie.svg' },
    { name: 'DirtWheels', src: 'https://dirthammer.com/partner-logos/Dirt_wheels_logo.png' },
    { name: 'MSN', src: 'https://dirthammer.com/partner-logos/msn.svg' }
  ]

  return (
    <>
      <BidModal
        auction={selectedAuction}
        onClose={() => setSelectedAuction(null)}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
      <div id="main-page" className="mt-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} onActionClick={() => setSelectedAuction(auction)} />
          ))}
        </section>

      <section className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} actionLabel="Notify" />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-2 mb-6">
          <div className="h-0.5 w-24 bg-black"></div>
          <h2 className="text-3xl font-bold uppercase">Completed Auctions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} actionLabel="View Offer" />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800 transition">
            View All Results
          </button>
        </div>
      </section>

      <section className="mt-16 mb-12">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h3 className="text-center text-2xl font-bold uppercase mb-8 text-gray-900">AS SEEN ON</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partnerLogos.map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center h-16 p-3">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = placeholderImage
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </>
  )
}
