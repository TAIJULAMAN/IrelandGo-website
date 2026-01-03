import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-[#0b1930] border-t text-white w-full ${className}`}>
      <div className="container mx-auto px-5 md:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo.png"
                alt=""
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-lg font-semibold">IrelandGo</h3>
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
                  href="/faq"
                  className="text-sm text-white hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
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
              <p>123 Dublin Street</p>
              <p>Dublin, Ireland</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@irelandgo.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@irelandgo.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+35312345678"
                  className="hover:text-blue-400 transition-colors"
                >
                  +353 1 234 5678
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} IrelandGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
