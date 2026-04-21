import { useState } from 'react'
import { auth } from '../firebase'

export default function ListYourPage({ onAuthClick }) {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    year: '', make: '', model: '', condition: 'Used', mileage: '',
    color: '', location: '', description: '', price: ''
  })

  const user = auth.currentUser

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files)
    const previews = files.map(f => URL.createObjectURL(f))
    setPhotos(prev => [...prev, ...previews])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-black uppercase">Listing Submitted!</h1>
        <p className="mt-4 text-gray-600">Your rig has been submitted for review. We'll get it live within 24 hours.</p>
        <a href="#/" className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-sm font-bold uppercase text-white hover:bg-gray-800 transition">
          Back to Auctions
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="border-b border-gray-200 pb-6 mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">List your rig with DirtHammer</span>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-black">List Your Rig</h1>
        <p className="mt-4 max-w-3xl text-gray-700 leading-7">
          Follow the three steps below to get your listing live on DirtHammer.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-4 mb-10">
        {[1, 2, 3].map(s => (
          <button key={s} onClick={() => user && setStep(s)}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold uppercase transition ${
              step === s ? 'bg-black text-white' : 'border border-gray-300 text-gray-500'
            }`}>
            <span>{s}</span>
            <span>{s === 1 ? 'Details' : s === 2 ? 'Photos' : 'Submit'}</span>
          </button>
        ))}
      </div>

      {/* Step 1: Vehicle Details */}
      {step === 1 && (
        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold uppercase mb-6">Vehicle Details</h2>
          {!user ? (
            <div className="rounded-3xl bg-slate-950 p-8 text-white max-w-md">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Login required</p>
              <h3 className="mt-4 text-2xl font-bold">Sign in to list your rig</h3>
              <button onClick={() => onAuthClick?.('login')}
                className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-bold uppercase text-black hover:bg-slate-100 transition">
                Sign In / Sign Up
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Year', key: 'year', placeholder: '2023' },
                { label: 'Make', key: 'make', placeholder: 'Can-Am' },
                { label: 'Model', key: 'model', placeholder: 'Maverick X3' },
                { label: 'Mileage', key: 'mileage', placeholder: '1,200 miles' },
                { label: 'Color', key: 'color', placeholder: 'Black' },
                { label: 'Location', key: 'location', placeholder: 'City, State' },
                { label: 'Asking Price ($)', key: 'price', placeholder: '25000' },
              ].map(({ label, key, placeholder }) => (
                <label key={key} className="block text-sm font-medium text-slate-700">
                  {label}
                  <input
                    type="text" placeholder={placeholder} value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </label>
              ))}
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Condition
                <select value={form.condition} onChange={e => setForm(p => ({ ...p, condition: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black">
                  {['Excellent', 'Good', 'Used', 'Fair', 'Parts Only'].map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                Description
                <textarea rows={4} placeholder="Describe your rig in detail — upgrades, history, condition..."
                  value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-black resize-none"
                />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="rounded-full bg-black px-8 py-3 text-sm font-bold uppercase text-white hover:bg-gray-800 transition">
                  Next: Upload Photos →
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* Step 2: Photos */}
      {step === 2 && (
        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold uppercase mb-6">Upload Photos</h2>
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-slate-50 p-8 text-center">
            <p className="text-lg font-semibold text-slate-900">Choose Files</p>
            <p className="mt-2 text-sm text-gray-500">Drag and drop up to 20 images, or click to select.</p>
            <input type="file" multiple accept="image/*" onChange={handlePhotos} className="hidden" id="photo-upload" />
            <label htmlFor="photo-upload" className="mt-4 inline-flex cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase text-white hover:bg-gray-900 transition">
              Upload Photos
            </label>
          </div>
          {photos.length > 0 && (
            <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button onClick={() => setPhotos(p => p.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 rounded-full bg-black/70 text-white text-xs px-2 py-0.5">✕</button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold uppercase hover:bg-gray-50 transition">← Back</button>
            <button onClick={() => setStep(3)} className="rounded-full bg-black px-8 py-3 text-sm font-bold uppercase text-white hover:bg-gray-800 transition">Next: Review & Submit →</button>
          </div>
        </section>
      )}

      {/* Step 3: Submit */}
      {step === 3 && (
        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold uppercase mb-6">Review & Submit</h2>
          <div className="rounded-3xl bg-slate-950 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Listing Summary</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {Object.entries(form).filter(([,v]) => v).map(([k, v]) => (
                <div key={k}>
                  <span className="text-slate-400 capitalize">{k}: </span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
              <div><span className="text-slate-400">Photos: </span><span className="font-semibold">{photos.length}</span></div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>✓ Vehicle details complete</li>
              <li>✓ {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded</li>
              <li>✓ Listing fee of $495 applies</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <label className="mt-6 flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm text-slate-300">I agree to the DirtHammer terms and conditions.</span>
              </label>
              <button type="submit" className="mt-6 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase text-black hover:bg-slate-100 transition">
                Submit Listing
              </button>
            </form>
          </div>
          <button onClick={() => setStep(2)} className="mt-4 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold uppercase hover:bg-gray-50 transition">← Back</button>
        </section>
      )}
    </div>
  )
}
