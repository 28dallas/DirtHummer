import { useState } from 'react'
import logoImage from '../../IMG/LOGO/Gemini_Generated_Image_72ctd372ctd372ct.png'

export default function Nav({ onAuthClick, user, onSignOut, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(searchVal)
    setSearchOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 relative z-40">
      <div className="flex flex-wrap items-center justify-between py-4 px-6 max-w-6xl mx-auto">
        {/* Logo */}
        <div className="w-32 md:w-40">
          <a href="#/" className="flex items-center">
            <img src={logoImage} alt="Dirthummer logo" className="h-10 w-auto object-contain" />
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a className="font-semibold text-sm uppercase hover:text-gray-600 transition" href="#/">Auctions</a>
          <span className="text-gray-300">|</span>
          <a className="font-semibold text-sm uppercase hover:text-gray-600 transition" href="#/auctions/new-listing">List Yours</a>
          <span className="text-gray-300">|</span>
          <a className="font-semibold text-sm uppercase hover:text-gray-600 transition" href="#/how-it-works">How It Works</a>
          <span className="text-gray-300">|</span>
          <a className="font-semibold text-sm uppercase hover:text-gray-600 transition" href="#/guides">Buyer's Guides</a>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search */}
          <button onClick={() => setSearchOpen(s => !s)} className="p-2 rounded-full hover:bg-gray-100 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition"
              >
                <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                  {user.email?.[0]?.toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-200 bg-white shadow-lg py-2">
                  <a href="#/dashboard" onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold hover:bg-gray-50">My Dashboard</a>
                  <a href="#/dashboard" onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50">My Bids</a>
                  <a href="#/dashboard" onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-gray-50">Watchlist</a>
                  <hr className="my-1 border-gray-100" />
                  <button onClick={() => { onSignOut(); setUserMenuOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => onAuthClick?.('login')}
              className="px-6 py-2 bg-black text-white font-bold text-sm uppercase rounded hover:bg-gray-800 transition">
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Search Bar Dropdown */}
      {searchOpen && (
        <div className="border-t border-gray-100 px-6 py-3 bg-white">
          <form onSubmit={handleSearch} className="max-w-6xl mx-auto flex gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Search auctions..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              className="flex-1 rounded-full border border-gray-300 px-5 py-2 text-sm outline-none focus:border-black"
            />
            <button type="submit" className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white hover:bg-gray-800 transition">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 space-y-3">
          <a className="block font-semibold text-sm uppercase py-2" href="#/">Auctions</a>
          <a className="block font-semibold text-sm uppercase py-2" href="#/auctions/new-listing">List Yours</a>
          <a className="block font-semibold text-sm uppercase py-2" href="#/how-it-works">How It Works</a>
          <a className="block font-semibold text-sm uppercase py-2" href="#/guides">Buyer's Guides</a>
          {user ? (
            <>
              <a className="block font-semibold text-sm uppercase py-2" href="#/dashboard">My Dashboard</a>
              <button onClick={onSignOut} className="w-full mt-2 px-6 py-2 border border-black text-black font-bold text-sm uppercase rounded hover:bg-gray-100 transition">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => onAuthClick?.('login')} className="w-full mt-4 px-6 py-2 bg-black text-white font-bold text-sm uppercase rounded hover:bg-gray-800 transition">
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
