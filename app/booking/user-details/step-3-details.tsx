"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SuccessModal } from "./success-modal";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import {
  useCreateBookingUsingServiceIdMutation,
  useCreateBookingWithoutIdMutation
} from "@/Redux/features/booking/bookingApi";
// @ts-expect-error: countries-api has no type declarations
import countries from "countries-api";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setUser } from "@/Redux/Slice/authSlice";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import {
  getBookingSession,
  saveBookingSession,
  syncUrlParamsToSession,
  cleanBrowserUrl,
  buildSemanticBookingUrl,
  BookingSessionData,
} from "@/utils/bookingSession";

export default function UserInfo() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [bookingId, setBookingId] = useState("");
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [session, setSession] = useState<BookingSessionData>(() => {
    if (typeof window !== "undefined" && window.location.search) {
      return syncUrlParamsToSession(searchParams);
    }
    return getBookingSession();
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const updated = syncUrlParamsToSession(searchParams);
      setSession(updated);
      cleanBrowserUrl(buildSemanticBookingUrl("user-info", updated, updated.vehicleName));
    } else {
      setSession(getBookingSession());
    }
  }, [searchParams]);

  const authUser = useAppSelector((state) => state.auth.user);
  const { data: profileResponse } = useGetProfileQuery(undefined, {
    skip: !authUser,
  });
  const profile = profileResponse?.data;

  const pickupParam = searchParams.get("pickup") || session.pickup || "";
  const dropoffParam = searchParams.get("dropoff") || session.dropoff || "";
  const dateParam = searchParams.get("date") || session.date || "";
  const timeParam = searchParams.get("time") || session.time || "";
  const adults = parseInt(searchParams.get("adults") || session.adults?.toString() || "2");
  const children = parseInt(searchParams.get("children") || session.children?.toString() || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || session.extraBags?.toString() || "0");
  const vehicleId = searchParams.get("vehicleId") || session.vehicleId;
  const transferRouteParam = searchParams.get("transferRoute");
  const selectedStopsParam = searchParams.get("selectedStops");
  const serviceTypeParam = searchParams.get("serviceType") || session.serviceType || "TRANSFER";
  const tripType = searchParams.get("tripType") || session.tripType || "one-way";
  const tripId = searchParams.get("id") || session.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+353");
  const [phonePrefixOpen, setPhonePrefixOpen] = useState(false);
  const phonePrefixRef = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [childSeat, setChildSeat] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);

  // Auto-populate user info when profile or authUser is available
  useEffect(() => {
    if (profile) {
      if (!firstName && profile.fullName) {
        const parts = profile.fullName.trim().split(" ");
        setFirstName(parts[0] || "");
        if (!lastName && parts.length > 1) {
          setLastName(parts.slice(1).join(" "));
        }
      }
      if (!email && profile.email) {
        setEmail(profile.email);
      }
      if (!phone && profile.contactNumber) {
        const cleanPhone = profile.contactNumber.replace(/^\+353/, "").trim();
        setPhone(cleanPhone);
      }
    } else if (authUser) {
      if (!firstName && authUser.name) {
        const parts = authUser.name.trim().split(" ");
        setFirstName(parts[0] || "");
        if (!lastName && parts.length > 1) {
          setLastName(parts.slice(1).join(" "));
        }
      }
      if (!email && authUser.email) {
        setEmail(authUser.email);
      }
    }
  }, [profile, authUser]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (phonePrefixRef.current && !phonePrefixRef.current.contains(e.target as Node)) {
        setPhonePrefixOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const COUNTRY_CODES: { code: string; iso: string; label: string }[] = countries.findAll().data
    .filter((c: any) => c.callingCode && c.callingCode.length > 0)
    .map((c: any) => ({
      code: "+" + c.callingCode[0],
      iso: c.cca2.toLowerCase(),
      label: c.cca2,
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  const validateEmail = (val: string) => {
    if (!val) return "Email is required";
    if (!val.includes("@")) return "Please enter a valid email address (must include @)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email address";
    return "";
  };
  const validatePhone = (val: string) => {
    if (!val) return "Phone number is required";
    if (!/^\d{6,15}$/.test(val.replace(/\s/g, ""))) return "Enter a valid phone number (digits only, 6–15 digits)";
    return "";
  };
  const isFormValid = firstName && lastName && !validateEmail(email) && !validatePhone(phone);
  let transferRoute: any = session.transferRoute || null;
  if (transferRouteParam) {
    try {
      transferRoute = JSON.parse(transferRouteParam);
    } catch (e) { }
  }
  let selectedStops: any[] = session.selectedStops || [];
  if (selectedStopsParam) {
    try {
      selectedStops = JSON.parse(selectedStopsParam);
    } catch (e) { }
  }

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];
  const carPriceParam = searchParams.get("carPrice");
  let transportPrice = carPriceParam ? parseFloat(carPriceParam) : (session.carPrice || 0);
  let basePriceSum = 0;
  let pricePerKmSum = 0;
  const distanceKmParam = searchParams.get("distanceKm");
  const distanceKm = distanceKmParam ? parseFloat(distanceKmParam) : (session.distanceKm || transferRoute?.distanceKm || 0);

  if (vehicleId && vehicles.length > 0) {
    const ids = vehicleId.split("+");
    const selectedVehicles = ids
      .map((id: string) => vehicles.find((v: any) => v.id === id))
      .filter(Boolean);

    if (selectedVehicles.length > 0) {
      basePriceSum = selectedVehicles.reduce(
        (sum: number, v: any) => sum + v.basePrice,
        0,
      );
      pricePerKmSum = selectedVehicles.reduce(
        (sum: number, v: any) => sum + v.pricePerKm,
        0,
      );
    }
  }

  if (carPriceParam) {
    transportPrice = parseFloat(carPriceParam);
  } else if (session.carPrice) {
    transportPrice = session.carPrice;
  } else {
    transportPrice = Math.round(basePriceSum + pricePerKmSum * distanceKm);
  }

  const isReturn = tripType === "return";
  if (isReturn) {
    transportPrice = transportPrice * 2;
  }

  const stopsCost = selectedStops.reduce(
    (total: number, stop: any) => total + stop.price,
    0,
  );

  const totalPrice = transportPrice + stopsCost;

  let formattedDate = dateParam;
  if (dateParam) {
    try {
      const d = new Date(dateParam);
      formattedDate = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch (e) { }
  }

  const [createBookingUsingServiceId, { isLoading: isBookingWithIdLoading }] =
    useCreateBookingUsingServiceIdMutation();
  const [createBookingWithoutId, { isLoading: isBookingWithoutIdLoading }] =
    useCreateBookingWithoutIdMutation();

  const isLoading = isBookingWithIdLoading || isBookingWithoutIdLoading;

  const fromLat = searchParams.get("fromLat") || session.coords?.fromLat?.toString() || "";
  const fromLng = searchParams.get("fromLng") || session.coords?.fromLng?.toString() || "";
  const toLat = searchParams.get("toLat") || session.coords?.toLat?.toString() || "";
  const toLng = searchParams.get("toLng") || session.coords?.toLng?.toString() || "";

  const handleBooking = async () => {
    const bookingVehiclesMap: Record<string, number> = {};
    if (vehicleId) {
      vehicleId.split("+").forEach((id) => {
        bookingVehiclesMap[id] = (bookingVehiclesMap[id] || 0) + 1;
      });
    }
    const bookingVehicles = Object.entries(bookingVehiclesMap).map(
      ([id, quantity]) => ({ vehicleId: id, quantity }),
    );
    const bookingStoppages = selectedStops.map((stop) => ({
      stoppageId: stop.id,
      quantity: 1,
    }));

    let safeTravelDate = dateParam || new Date().toISOString();
    if (new Date(safeTravelDate) < new Date()) {
      safeTravelDate = new Date(Date.now() + 2 * 60000).toISOString();
    }

    const body = {
      clientName: `${firstName} ${lastName}`.trim() || "Guest User",
      from: pickupParam,
      fromLat: fromLat ? parseFloat(fromLat) : (transferRoute?.fromLat || 53.3498),
      fromLng: fromLng ? parseFloat(fromLng) : (transferRoute?.fromLng || -6.2603),
      to: dropoffParam,
      toLat: toLat ? parseFloat(toLat) : (transferRoute?.toLat || 53.2707),
      toLng: toLng ? parseFloat(toLng) : (transferRoute?.toLng || -9.0568),
      serviceType: transferRoute?.serviceType || serviceTypeParam,
      travelDate: safeTravelDate,
      timeSlot: {
        start: timeParam || "09:00 AM",
        end: timeParam || "09:00 AM",
      },
      passengers: adults + children,
      distanceKm: distanceKm,
      luggage: extraBags + adults + children,
      basePrice: basePriceSum,
      vehiclePrice: transportPrice,
      stoppagePrice: stopsCost,
      returnPrice: 0,
      totalPrice: totalPrice,
      isReturn: false,
      bookingVehicles,
      bookingStoppages,
      guestInfo: {
        firstName: firstName || "John",
        lastName: lastName || "Doe",
        email: email || "john@example.com",
        phoneNumber: phone ? `${phonePrefix}${phone}` : "+123456789",
      },
    };

    // console.log("Sending booking request with body:", body);

    try {
      let res;
      const withoutIdTypes = ["TRANSFER", "BY_THE_HOUR", "PRIVATE_TRANSFER", "AIRPORT_TRANSFER", "PRIVATE_CAR_TRANSFER"];

      if (withoutIdTypes.includes(body.serviceType) || !tripId) {
        res = await createBookingWithoutId({ body }).unwrap();
      } else {
        const serviceId = tripId || transferRoute?.id || transferRoute?._id || "60d5ec49f3b0b30015f8e500";
        res = await createBookingUsingServiceId({ serviceId, body }).unwrap();
      }
      const id = res?.data?.id || res?.data?._id || "";
      if (id) {
        setBookingId(id);
        saveBookingSession({
          bookingId: id,
          firstName,
          lastName,
          email,
          phone: `${phonePrefix}${phone}`,
          specialRequests,
          carPrice: transportPrice,
        });
      }

      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;

      // console.log("=== BOOKING RESPONSE ===", res);
      // console.log("Extracted accessToken:", accessToken);
      // console.log("Extracted user:", user);

      const existingToken =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || localStorage.getItem("accessToken")
          : null;

      if (accessToken && user && !existingToken) {
        // Only log in guest users who don't have an active session
        dispatch(setUser({ user, accessToken: accessToken, refreshToken: "" }));
        localStorage.setItem("accessToken", accessToken);
      }


      setShowModal(true);
    } catch (e: any) {
      // console.error("Booking failed. Full error:", JSON.stringify(e, null, 2));
      // console.error("Error status:", e?.status);
      // console.error("Error data (detailed):", JSON.stringify(e?.data, null, 2));
      const errorMessage = e?.data?.message || e?.message || "Unknown error";
      setErrorModalMessage(`Failed to process booking: ${errorMessage}`);
      setShowErrorModal(true);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col pt-20">
      <div className="flex-1 py-10 sm:py-12 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span className="hidden sm:inline">Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span className="hidden sm:inline">Choose Vehicle</span>
            </div>
            {serviceTypeParam !== "BY_THE_HOUR" && serviceTypeParam !== "DAY_TRIP" && (
              <>
                <div className="flex-1 h-0.5 bg-blue-600 mx-2" />
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                    3
                  </div>
                  <span className="hidden sm:inline">Add Stops</span>
                </div>
              </>
            )}
            <div className="flex-1 h-0.5 bg-blue-600 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                {serviceTypeParam === "BY_THE_HOUR" || serviceTypeParam === "DAY_TRIP" ? "3" : "4"}
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                {serviceTypeParam === "BY_THE_HOUR" || serviceTypeParam === "DAY_TRIP" ? "4" : "5"}
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
        <div className="mb-6 sm:mb-8 mt-2 sm:mt-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
              Step {serviceTypeParam === "BY_THE_HOUR" || serviceTypeParam === "DAY_TRIP" ? "3" : "4"}: Passenger Details
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
              Please provide your contact information and any special
              requirements.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {/* Passenger details card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Contact information */}
              <div className="mb-6 sm:mb-7">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(validateEmail(e.target.value));
                      }}
                      onBlur={() => setEmailError(validateEmail(email))}
                      placeholder="Enter your email address"
                      className={`h-10 sm:h-11 rounded-lg border bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${emailError
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-blue-600"
                        }`}
                    />
                    {emailError && (
                      <p className="text-xs text-red-500 mt-0.5">{emailError}</p>
                    )}
                  </div>

                  {/* Phone with country prefix */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div
                      ref={phonePrefixRef}
                      className={`flex h-10 sm:h-11 rounded-lg border bg-gray-50 overflow-visible focus-within:ring-2 focus-within:border-transparent relative ${phoneError
                        ? "border-red-400 focus-within:ring-red-400"
                        : "border-gray-200 focus-within:ring-blue-600"
                        }`}
                    >
                      {/* Custom flag prefix button */}
                      <button
                        type="button"
                        onClick={() => setPhonePrefixOpen(o => !o)}
                        className="h-full flex items-center gap-1.5 bg-gray-100 border-r border-gray-200 px-2.5 text-sm text-gray-700 shrink-0 hover:bg-gray-200 transition-colors rounded-l-lg focus:outline-none"
                      >
                        <img
                          src={`https://flagcdn.com/w20/${COUNTRY_CODES.find(c => c.code === phonePrefix)?.iso}.png`}
                          alt={phonePrefix}
                          className="w-5 h-3.5 object-cover rounded-sm"
                        />
                        <span className="font-medium tracking-tight">{phonePrefix}</span>
                        <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform ${phonePrefixOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown list */}
                      {phonePrefixOpen && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-xl overflow-y-auto max-h-56 min-w-[160px]">
                          {COUNTRY_CODES.map(c => (
                            <button
                              key={c.code + c.label}
                              type="button"
                              onClick={() => { setPhonePrefix(c.code); setPhonePrefixOpen(false); }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${phonePrefix === c.code ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700"
                                }`}
                            >
                              <img
                                src={`https://flagcdn.com/w20/${c.iso}.png`}
                                alt={c.label}
                                className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                              />
                              <span className="font-medium">{c.code}</span>
                              <span className="text-gray-400 text-xs ml-auto">{c.label}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/[^\d\s]/g, "");
                          setPhone(digits);
                          if (phoneError) setPhoneError(validatePhone(digits));
                        }}
                        onBlur={() => setPhoneError(validatePhone(phone))}
                        placeholder="Phone number"
                        className="flex-1 bg-transparent px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-r-lg"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-red-500 mt-0.5">{phoneError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Special requests */}
              <div className="mb-6 sm:mb-7">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                  Special Requests
                </h2>
                <textarea
                  id="special-requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Add special requests or additional information..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>

              {/* Additional services */}
              <div className="mb-6 sm:mb-7">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                  Additional Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-600">
                    <input
                      type="checkbox"
                      checked={childSeat}
                      onChange={(e) => setChildSeat(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span>Child Seat Required</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-600">
                    <input
                      type="checkbox"
                      checked={wheelchair}
                      onChange={(e) => setWheelchair(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span>Wheelchair Accessibility</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom navigation – inline below the form card, matching card width */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] p-4 sm:p-4 sm:px-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border border-gray-100 mt-4">
              <Button
                asChild
                variant="outline"
                size="action"
              >
<<<<<<<< HEAD:app/booking/user-info/user-info.tsx
                <Link href={`/booking/${serviceTypeParam === "BY_THE_HOUR" || serviceTypeParam === "DAY_TRIP" ? "vehicles" : "stops"}`}>
                  Back
========
                <Link href={`/booking/${serviceTypeParam === "BY_THE_HOUR" || serviceTypeParam === "DAY_TRIP" ? "choose-vehicle" : "add-stops"}?${searchParams.toString()}`}>
                  ← Back
>>>>>>>> 68619fa9f4ec3e5b4efd2fa6121bb3788b052b14:app/booking/user-details/step-3-details.tsx
                </Link>
              </Button>

              <Button
                type="button"
                onClick={handleBooking}
                disabled={isLoading || !isFormValid}
                size="action"
              >
                {isLoading ? "Processing..." : "Complete Booking"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Booking summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-24">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
                Booking Summary
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700 mb-5">
                <div>
                  <span className="text-gray-500 block mb-1">Route</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    {pickupParam} <span className="text-gray-400">→</span>{" "}
                    {dropoffParam}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Date & Time</span>
                  <span className="font-semibold text-gray-900">
                    {formattedDate} at {timeParam}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Passengers</span>
                  <span className="font-semibold text-gray-900">
                    {adults + children} Passengers ({adults} Adults, {children}{" "}
                    Children)
                  </span>
                </div>
                {selectedStops.length > 0 && (
                  <div>
                    <span className="text-gray-500 block mb-1">
                      Included Stops
                    </span>
                    <ul className="space-y-1">
                      {selectedStops.map((stop, i) => (
                        <li
                          key={i}
                          className="font-medium text-blue-600 flex justify-between"
                        >
                          <span>• {stop.name}</span>
                          <span>€{stop.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Transport {isReturn ? "(one-way)" : ""}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    €{isReturn ? Math.round(transportPrice / 2) : transportPrice}
                  </span>
                </div>
                {isReturn && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      Return trip (×2)
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      €{Math.round(transportPrice / 2)}
                    </span>
                  </div>
                )}
                {stopsCost > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Stops
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      €{stopsCost}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    €{totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  Free cancellation up to 24 hours before your pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tour status modal */}
      <SuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        bookingId={bookingId}
        totalPrice={totalPrice}
        searchParams={searchParams}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        specialRequests={specialRequests}
      />

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-md border-none shadow-2xl rounded-2xl overflow-hidden p-0">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white text-center">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/30">
              <AlertCircle className="w-7 h-7" />
            </div>
            <DialogTitle className="text-xl font-bold">Booking Failed</DialogTitle>
          </div>
          <div className="p-6 bg-white text-center">
            <p className="text-slate-600 font-medium leading-relaxed">
              {errorModalMessage}
            </p>
          </div>
          <div className="p-4 bg-slate-50 flex justify-center border-t border-slate-100">
            <Button onClick={() => setShowErrorModal(false)} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg px-8">
              Understood
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
