import { useState, useEffect } from 'react'
import { auth } from '../firebase'

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    const calc = () => {
      const dist = new Date(endDate).getTime() - Date.now()
      if (dist <= 0) { setTimeLeft('ENDED'); return }
      const d = Math.floor(dist / 86400000)
      const h = Math.floor((dist % 86400000) / 3600000)
      const m = Math.floor((dist % 3600000) / 60000)
      const s = Math.floor((dist % 60000) / 1000)
      setTimeLeft(`${d}D ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`)
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [endDate])
  return <span>{timeLeft}</span>
}

export default function AuctionDetailPage({ auction, onBack, onBid }) {
  const [activeImg, setActiveImg] = useState(0)
  const [bidAmount, setBidAmount] = useState('')
  const [comment, setComment] = useState('')
  const [question, setQuestion] = useState('')
  const [comments, setComments] = useState([
    { user: 'RiderJoe', text: 'This thing looks mint! Any rust underneath?', time: '2h ago' },
    { user: 'DesertKing', text: 'Drove one of these last summer — absolute beast.', time: '5h ago' },
  ])
  const [questions, setQuestions] = useState([
    { user: 'BidderMike', q: 'Does it come with a spare tire?', a: 'Yes, full-size spare included.', time: '1d ago' },
  ])
  const [bidHistory] = useState([
    { user: 'b***r', amount: auction.currentBid, time: '1h ago' },
    { user: 'r***9', amount: auction.currentBid - 500, time: '3h ago' },
    { user: 'd***x', amount: auction.currentBid - 1200, time: '6h ago' },
  ])

  const minBid = (auction.currentBid || 0) + 100

  const handleBid = () => {
    if (!auth.currentUser) { onBid(auction); return }
    if (!bidAmount || Number(bidAmount) < minBid) {
      alert(`Minimum bid is $${minBid.toLocaleString()}`)
      return
    }
    onBid(auction)
  }

  const submitComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setComments(prev => [{ user: auth.currentUser?.email?.split('@')[0] || 'You', text: comment, time: 'Just now' }, ...prev])
    setComment('')
  }

  const submitQuestion = (e) => {
    e.preventDefault()
    if (!question.trim()) return
    setQuestions(prev => [{ user: auth.currentUser?.email?.split('@')[0] || 'You', q: question, a: null, time: 'Just now' }, ...prev])
    setQuestion('')
  }

  const specs = [
    { label: 'Year', value: auction.title.match(/^\d{4}/)?.[0] || '—' },
    { label: 'Condition', value: 'Used' },
    { label: 'Location', value: 'United States' },
    { label: 'Drivetrain', value: '4WD' },
    { label: 'Engine', value: 'Gas' },
    { label: 'Transmission', value: 'Automatic' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-500 hover:text-black transition">
        ← Back to Auctions
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 aspect-video">
            <img
              src={auction.images[activeImg]}
              alt={auction.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
              {activeImg + 1} / {auction.images.length} photos
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {auction.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 h-16 w-24 overflow-hidden rounded-xl border-2 transition ${i === activeImg ? 'border-black' : 'border-transparent'}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Bid Panel */}
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active Auction</p>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-tight">{auction.title}</h1>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-semibold uppercase text-slate-500">Current Bid</span>
              <span className="text-xl font-black text-black">${auction.currentBid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold uppercase text-slate-500">Time Left</span>
              <span className="font-mono font-bold text-black"><CountdownTimer endDate={auction.endDate} /></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold uppercase text-slate-500">Bids</span>
              <span className="font-bold">{bidHistory.length}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder={`Min $${minBid.toLocaleString()}`}
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
            <button onClick={handleBid}
              className="rounded-xl bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition">
              Bid
            </button>
          </div>
          <p className="text-xs text-slate-400">Buyer's fee of 10% applies to winning bid.</p>

          {/* Specs */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Vehicle Specs</p>
            <div className="grid grid-cols-2 gap-2">
              {specs.map(s => (
                <div key={s.label} className="text-sm">
                  <span className="text-slate-500">{s.label}: </span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="mt-10">
        <h2 className="text-xl font-bold uppercase mb-4">Bid History</h2>
        <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {bidHistory.map((b, i) => (
            <div key={i} className="flex justify-between px-5 py-3 text-sm">
              <span className="font-semibold">{b.user}</span>
              <span className="text-slate-500">{b.time}</span>
              <span className="font-bold">${b.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h2 className="text-xl font-bold uppercase mb-4">Comments</h2>
        <form onSubmit={submitComment} className="flex gap-2 mb-4">
          <input
            value={comment} onChange={e => setComment(e.target.value)}
            placeholder="Leave a comment..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black"
          />
          <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 transition">Post</button>
        </form>
        <div className="space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold text-black">{c.user}</span>
                <span>{c.time}</span>
              </div>
              <p className="text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A */}
      <div className="mt-10">
        <h2 className="text-xl font-bold uppercase mb-4">Q&A</h2>
        <form onSubmit={submitQuestion} className="flex gap-2 mb-4">
          <input
            value={question} onChange={e => setQuestion(e.target.value)}
            placeholder="Ask the seller a question..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black"
          />
          <button className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-gray-800 transition">Ask</button>
        </form>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold text-black">{q.user}</span>
                <span>{q.time}</span>
              </div>
              <p className="text-sm font-semibold">Q: {q.q}</p>
              {q.a && <p className="text-sm text-slate-600 mt-1">A: {q.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
