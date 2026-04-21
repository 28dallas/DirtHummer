import { useState } from 'react'
import logoImage from '../../IMG/LOGO/Gemini_Generated_Image_72ctd372ctd372ct.png'

export default function Nav({ onAuthClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between py-5 px-6 text-lg max-w-6xl mx-auto">
        {/* Logo */}
        <div className="w-32 md:w-40">
          <a href="/" className="flex items-center">
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

        {/* Sign In Button */}
        <div className="hidden md:block">
          <button onClick={() => onAuthClick?.('login')} className="px-6 py-2 bg-black text-white font-bold text-sm uppercase rounded hover:bg-gray-800 transition">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 space-y-3">
          <a className="block font-semibold text-sm uppercase hover:text-gray-600 transition py-2" href="#/">Auctions</a>
          <a className="block font-semibold text-sm uppercase hover:text-gray-600 transition py-2" href="#/auctions/new-listing">List Yours</a>
          <a className="block font-semibold text-sm uppercase hover:text-gray-600 transition py-2" href="#/how-it-works">How It Works</a>
          <a className="block font-semibold text-sm uppercase hover:text-gray-600 transition py-2" href="#/guides">Buyer's Guides</a>
          <button onClick={() => onAuthClick?.('login')} className="w-full mt-4 px-6 py-2 bg-black text-white font-bold text-sm uppercase rounded hover:bg-gray-800 transition">
            Sign In
          </button>
        </div>
      )}
    </nav>
  )
}
