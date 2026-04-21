import logoImage from '../../IMG/LOGO/Gemini_Generated_Image_72ctd372ctd372ct.png'

export default function Footer({ onAuthClick }) {
  return (
    <footer className="mt-12 bg-gray-100 text-black">
      {/* Email Signup Section */}
      <div className="border-b border-gray-300 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Dirthummer logo" className="h-12 w-auto object-contain" />
            <div>
              <h3 className="text-3xl font-bold mb-2">Get the Dirthummer Email</h3>
              <p className="text-gray-600 italic">All the best listings before they hit the site.</p>
            </div>
          </div>
          <button onClick={() => onAuthClick?.('signup')} className="px-8 py-3 bg-black text-white font-bold uppercase rounded hover:bg-gray-800 transition whitespace-nowrap">
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4">About Dirthummer</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              We&apos;re the home of the best side-by-side and OHV auctions anywhere.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <a href="/about" className="text-sm uppercase font-semibold hover:text-gray-600 transition">About Us</a>
              <a href="#/how-it-works" className="text-sm uppercase font-semibold hover:text-gray-600 transition">Auction FAQ</a>
              <a href="/privacy-policy" className="text-sm uppercase font-semibold hover:text-gray-600 transition">Privacy Policy</a>
              <a href="/contact-us" className="text-sm uppercase font-semibold hover:text-gray-600 transition">Contact Us</a>
              <a href="https://merch.dirthummer.com" target="_blank" rel="noopener noreferrer" className="text-sm uppercase font-semibold hover:text-gray-600 transition">Buy Merch!</a>
            </div>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61571565538828" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:opacity-80 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:opacity-80 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5zm0 1.5c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm3.5-1c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-xs text-gray-600">
          <p>© 2026 Dirthummer, Inc. Work bad, side-by-sides good. All rights reserved.</p>
          <p className="mt-2">By continuing to use this website, you agree that Dirthummer can store cookies on your device in accordance with our <a href="/privacy-policy" className="underline hover:text-gray-800">Privacy Policy</a>.</p>
        </div>
      </div>
    </footer>
  )
}
