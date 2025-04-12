function Footer() {
  return (
    <>
      <div className="bg-pink-50 mb-16">
        <div className="max-w-7xl mx-auto text-gray-800 py-8 px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/ecommerce.png" alt="Swirls Coco" className="h-8 w-8" />
                <h2 className="text-xl font-bold text-pink-600">Swirls Coco</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Discover the perfect blend of style and comfort with our curated collection.
              </p>
            </div>

            {/* Quick Links
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-600">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <a href="/" className="hover:text-pink-600 transition-colors">Home</a>
                <a href="/products" className="hover:text-pink-600 transition-colors">Products</a>
                <a href="/about" className="hover:text-pink-600 transition-colors">About Us</a>
                <a href="/contact" className="hover:text-pink-600 transition-colors">Contact</a>
              </div>
            </div> */}

            {/* Connect Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-600">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/8168287781" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/swirlscoco" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tagline Section */}
          <div className="text-center mt-8 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
              Elevate Your Style
            </h1>
            <p className="text-lg text-pink-400">
              Find Your Perfect Piece
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-4 border-t border-pink-100">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
              <p>© {new Date().getFullYear()} Swirls Coco. All rights reserved.</p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <a href="/privacy" className="hover:text-pink-600 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-pink-600 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;