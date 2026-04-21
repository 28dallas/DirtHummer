export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">How It Works</p>
          <h1 className="text-5xl font-black uppercase tracking-tight text-black">Buy or sell your rig, the Dirthummer way.</h1>
          <p className="max-w-3xl text-lg leading-8 text-gray-700">
            Dirthummer makes side-by-side and OHV auctions simple. Whether you’re bidding on a new ride or listing your machine, our process guides you through account setup, photos, payment, and the final hammer drop.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-slate-950 p-6 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Listing Fee</p>
              <p className="mt-3 text-3xl font-bold">$495</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">One-time fee to get your rig live and visible to buyers nationwide.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-950 p-6 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Buyer’s Fee</p>
              <p className="mt-3 text-3xl font-bold">10%</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">A small premium applied to the winning bid to support the DirtHammer auction platform.</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-black shadow-xl">
          <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1560&q=80"
              alt="How it works video"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90">
                <span className="text-4xl font-black text-black">▶</span>
              </div>
            </div>
          </div>
          <div className="p-8 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">VIDEO WALKTHROUGH</p>
            <h2 className="mt-4 text-3xl font-bold">Everything you need to know about Dirthummer</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Watch the walkthrough to learn the full buying and selling experience, from uploading photos to closing the auction.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-16 space-y-12">
        <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-bold uppercase">What’s It Cost?</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-slate-950 p-8 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Listing Fee</p>
              <p className="mt-4 text-2xl font-bold">$495</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">Covers the cost to prepare your auction, review your photos, and get your rig live to bidders.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-950 p-8 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Photography Package</p>
              <p className="mt-4 text-2xl font-bold">$395</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">Professional photos and video help your listing stand out and win more bids.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-950 p-8 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Buyer’s Fee</p>
              <p className="mt-4 text-2xl font-bold">10%</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">Applied to the winning bid to support DirtHammer’s secure auction platform.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-bold uppercase">Buying</h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="mt-3 text-gray-700 leading-7">Create your Dirthummer account to start watching auctions, saving favorites, and bidding with confidence.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Payment Method</h3>
                <p className="mt-3 text-gray-700 leading-7">Add a payment method securely so your winning bid can be processed quickly and safely.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Drop the Hammer</h3>
                <p className="mt-3 text-gray-700 leading-7">Place your bid before the auction ends and watch the clock. If you win, Dirthummer will help you complete the sale.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
            <h2 className="text-3xl font-bold uppercase">Selling</h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="mt-3 text-gray-700 leading-7">Create your seller account and get ready to list your rig with expert guidance.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">The Basics</h3>
                <p className="mt-3 text-gray-700 leading-7">Provide make, model, year, condition, and a detailed description so buyers know exactly what they’re bidding on.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Upload Photos</h3>
                <p className="mt-3 text-gray-700 leading-7">Add multiple clear images from every angle. Great photos help listings sell faster and for more money.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Submit Your Listing</h3>
                <p className="mt-3 text-gray-700 leading-7">Review your listing, accept the terms, and submit. We’ll review it and get it live as soon as it meets our quality standards.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">It’s Auction Time</h3>
                <p className="mt-3 text-gray-700 leading-7">Your auction goes live and the market starts bidding. We’ll notify you as bids come in and help finalize the sale.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-bold uppercase">After the Auction</h2>
          <div className="mt-8 space-y-6 text-gray-700 leading-7">
            <p>The winning bidder will complete payment and DirtHammer will help coordinate pickup, shipping, or local delivery. You keep control of timing and can communicate directly through the platform.</p>
            <p>If your reserve is met, the sale closes and you’ll receive payment after fees. If the hammer doesn’t fall, you can relist the rig with updated details or pricing.</p>
            <p>Our support team is available to answer questions and make sure the auction finishes cleanly for both buyers and sellers.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
