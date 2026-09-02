import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-10 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/Tourenzo.webp"
                alt="Tourenzo logo"
                width={140}
                height={120}
              />
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 mt-4 max-w-sm leading-relaxed">
              Your trusted travel companion for exploring the beauty of Ireland.
            </p>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wider text-blue-400 sm:text-white sm:normal-case">
              Services
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link
                  href="/transfer"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/day-trips"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Day Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/multi-day-tours"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Multi-Day Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/airport-transfers"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wider text-blue-400 sm:text-white sm:normal-case">
              Support
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link
                  href="/settings/privacy-policy"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/settings/terms-of-service"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 mt-2 sm:mt-0">
            <h3 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 uppercase tracking-wider text-blue-400 sm:text-white sm:normal-case">
              Contact Us
            </h3>
            <address className="not-italic text-xs sm:text-sm text-gray-300 space-y-2 leading-relaxed">
              <p>225 Cratloe Village, Limerick, Ireland.</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@tourenzo.com"
                  className="hover:text-blue-400 text-white font-medium transition-colors"
                >
                  info@tourenzo.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+353858090960"
                  className="hover:text-blue-400 text-white font-medium transition-colors"
                >
                  +353 85 809 0960
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 pb-6 text-center text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tourenzo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
