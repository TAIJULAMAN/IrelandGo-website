import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt=""
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-lg font-semibold">Tourenzo</h3>
            </div>
            <p className="text-sm text-gray-300">
              Your trusted travel companion for exploring the beauty of Ireland.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/transfer"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/day-trips"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Day Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/multi-day-tours"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Multi-Day Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/airport-transfers"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/settings/privacy-policy"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/terms-of-service"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-gray-300 space-y-2">
              <p>225 Cratloe Village,</p>
              <p> Limerick, Ireland.</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@tourenzo.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@tourenzo.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+353858090960"
                  className="hover:text-blue-400 transition-colors"
                >
                  +353 85 809 0960
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 md:mt-12 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tourenzo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
