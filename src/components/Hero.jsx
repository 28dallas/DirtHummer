export default function Hero() {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome to Dirthummer!</h1>
      <p className="text-base leading-7 text-gray-700 mb-6">
        We&apos;re the home of the best side-by-side and OHV auctions anywhere! Get started today by{' '}
        <a href="https://dirthummer.com/create-account" className="font-semibold text-black underline">setting up an account</a>{' '}
        to bid, or by heading to our{' '}
        <a href="#/auctions/new-listing" className="font-semibold text-black underline">LIST YOURS</a>{' '}
        page to sell with us. You can also check out our{' '}
        <a href="#/how-it-works" className="font-semibold text-black underline">How It Works</a> page for more info!
      </p>
      <p className="text-gray-700">Your next rig could be a few clicks away!</p>
    </section>
  )
}
