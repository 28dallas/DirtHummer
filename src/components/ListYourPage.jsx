import { useState } from 'react'

export default function ListYourPage({ onAuthClick }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="border-b border-gray-200 pb-6 mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">List your rig with DirtHammer</span>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-black">List Your Rig</h1>
        <p className="mt-4 max-w-3xl text-gray-700 leading-7">
          Follow the three steps below to get your listing live on DirtHammer. Upload photos, provide the right details, and submit your rig for auction.
        </p>
      </div>

      <div className="space-y-10">
        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-7xl font-black text-black">1</p>
            </div>
            <div className="lg:flex-1">
              <h2 className="text-3xl font-bold uppercase">The Basics</h2>
              <p className="mt-4 text-gray-700 leading-7">
                DirtHammer wants the best information about your rig before it hits the auction floor. Add a full description, include accurate specs, and choose photos that show the machine from every angle.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold">Your listing should include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The exact make, model, year, and condition of the machine.</li>
                <li>Any recent work, upgrades, or maintenance history.</li>
                <li>Accurate location, pricing expectations, and estimated fees.</li>
                <li>At least 10 clear photos so buyers can inspect every angle.</li>
              </ul>
              <p className="text-sm text-gray-500">
                Listings with the best photo sets and descriptions sell faster and get more bids.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Login required</p>
              <h3 className="mt-4 text-2xl font-bold">Sign in to submit</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                You must be logged in to submit a rig. Create an account or sign in to continue and get your listing processed immediately.
              </p>

              <button
                type="button"
                onClick={() => onAuthClick?.('signup')}
                className="mt-6 w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-white/10"
              >
                Continue with Email
              </button>

              <div className="mt-6 space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/50"
                />
              </div>

              <button
                type="button"
                onClick={() => onAuthClick?.('login')}
                className="mt-4 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-slate-100"
              >
                Log In
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-7xl font-black text-black">2</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold uppercase">Upload Photos</h2>
              <p className="mt-4 max-w-3xl text-gray-700 leading-7">
                Add 10 or more photos to show your rig’s condition and unique features. Include exterior, interior, engine, suspension, and any damage details.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-gray-300 bg-slate-50 p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-3xl font-black text-slate-900">+</span>
            </div>
            <p className="mt-6 text-lg font-semibold text-slate-900">Choose Files</p>
            <p className="mt-2 text-sm text-gray-500">Drag and drop up to 20 images, or click to select photos from your device.</p>
            <input type="file" multiple className="mt-6 hidden" id="listing-photo-upload" />
            <label htmlFor="listing-photo-upload" className="mt-4 inline-flex cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-900">
              Upload Photos
            </label>
          </div>
        </section>

        <section className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-7xl font-black text-black">3</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold uppercase">Submit Your Listing</h2>
              <p className="mt-4 max-w-3xl text-gray-700 leading-7">
                Review your listing details, agree to DirtHammer’s terms, and submit. Once approved, buyers will see your rig and can place bids right away.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Listing checklist</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <li>• Your rig details are complete and accurate.</li>
              <li>• You’ve uploaded high-quality photos.</li>
              <li>• You understand the DirtHammer auction process.</li>
            </ul>
            <button
              type="button"
              onClick={() => onAuthClick?.('login')}
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-slate-100"
            >
              Submit Listing
            </button>
            <p className="mt-6 text-xs text-slate-500">
              By submitting, you agree to the DirtHammer terms and conditions. Your listing will be reviewed and published once it meets our quality standards.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
