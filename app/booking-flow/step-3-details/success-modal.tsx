import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  bookingId: string | null;
  totalPrice: number;
  searchParams: URLSearchParams;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export function SuccessModal({
  showModal,
  setShowModal,
  bookingId,
  totalPrice,
  searchParams,
  firstName,
  lastName,
  email,
  phone,
  specialRequests,
}: SuccessModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4 sm:p-6">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-green-600 mb-2 flex items-center gap-2 pr-8">
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          Booking Confirmed!
        </h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Your transfer booking has been successfully created. You will receive
          an email confirmation shortly.
        </p>

        <div className="rounded-lg bg-gray-50 p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-3">
            <span className="text-sm text-gray-500 font-medium">
              Booking Ref
            </span>
            <span className="text-sm font-bold text-gray-900 break-all ml-4 text-right">
              #{bookingId || "IG-PENDING"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              Total Amount
            </span>
            <span className="text-lg font-bold text-blue-600">
              €{totalPrice}
            </span>
          </div>
        </div>
        <span className="text-sm text-red-500 font-medium text-center">
          If you don't complete the payment within 5 minutes, your booking will
          be automatically cancelled.
        </span>
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg h-12 sm:h-14 shadow-sm transition-all mt-2"
        >
          <Link
            href={`/booking-flow/payment?${searchParams.toString()}${bookingId ? `&bookingId=${bookingId}` : ""}&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&specialRequests=${specialRequests}`}
          >
            Proceed to Payment
          </Link>
        </Button>
      </div>
    </div>
  );
}
