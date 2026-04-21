const guides = [
  {
    title: '2023 Yamaha Viking VI Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    caption: 'Everything you need to know before the next bid.',
  },
  {
    title: '2023 Can-Am Commander Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1d0?auto=format&fit=crop&w=800&q=80',
    caption: 'Learn the best features for trail, work, and weekend play.',
  },
  {
    title: '2023 Polaris RZR Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    caption: 'Performance, fit, and the right package for your riding style.',
  },
  {
    title: '2023 Kawasaki Mule Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80',
    caption: 'Utility and comfort tips for the toughest jobs.',
  },
  {
    title: '2022 Honda Talon Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1541446654331-27aa9a8ff02d?auto=format&fit=crop&w=800&q=80',
    caption: 'Why the Talon is a great choice for desert and trail riders.',
  },
  {
    title: '2021 Can-Am Maverick Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=80',
    caption: 'What to inspect, what to upgrade, and what to avoid.',
  },
  {
    title: '2020 Polaris General Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    caption: 'A complete breakdown of power, suspension, and comfort.',
  },
  {
    title: '2020 Kawasaki Teryx Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=800&q=80',
    caption: 'Know what matters when buying a used Teryx.',
  },
  {
    title: '2022 Polaris Ranger Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1498307836649-f930dccc2f24?auto=format&fit=crop&w=800&q=80',
    caption: 'Utility, comfort, and the best trim levels to bid on.',
  },
  {
    title: '2023 Can-Am Ryker Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    caption: 'A buyer’s guide for sport-oriented riders and weekend warriors.',
  },
  {
    title: '2022 Honda Pioneer Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    caption: 'Find the right balance of utility and trail performance.',
  },
  {
    title: '2021 Arctic Cat Wildcat Buyer’s Guide',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    caption: 'Top buying tips for a reliable performance rig.',
  },
]

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500">DIRTHAMMER SXS BUYER’S GUIDES</p>
        <h1 className="mt-4 text-4xl font-black uppercase">Buyer’s Guides</h1>
        <p className="mt-4 max-w-3xl text-gray-700 leading-8">
          Don’t know if a Can-Am is the right fit? We’ve got the full guide for the most popular side-by-sides and utility rigs on the market. Browse the latest buyer guides for features, common issues, bidding advice, and the best use cases for every machine.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide.title} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-56 overflow-hidden">
              <img
                src={guide.image}
                alt={guide.title}
                className="h-full w-full object-cover transition duration-300 ease-out hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{guide.caption}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Guide</span>
                <button className="rounded-full bg-black px-4 py-2 text-xs font-bold uppercase text-white hover:bg-slate-800 transition">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
