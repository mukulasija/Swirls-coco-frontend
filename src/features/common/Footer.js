function Footer() {
  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h1 className="text-6xl mb-3"> Elevate Your Style.</h1>
            <h1 className="text-3xl mb-3 mt-8"> Find Your Perfect Piece.</h1>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {' '}
              © GokulGoyal, 2025{' '}
            </p>
            <div className="order-1 md:order-2 flex space-x-4">
              <a href="https://wa.me/8168776115" target="_blank" rel="noopener noreferrer" className="px-2 border-l">
                WhatsApp
              </a>
              <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="px-2 border-l">
                Instagram
              </a>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
