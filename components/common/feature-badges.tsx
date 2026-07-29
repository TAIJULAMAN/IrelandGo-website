import { Check, Clock, Shield } from "lucide-react";

export const FeatureBadges = () => {
    return (
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap mt-8 md:mt-10 text-white">
            <div className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-auto sm:w-64 flex-shrink-0 cursor-default">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-blue-50 group-hover:text-white transition-colors">Flexible Cancellation</span>
            </div>
            
            <div className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-auto sm:w-64 flex-shrink-0 cursor-default">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-blue-50 group-hover:text-white transition-colors">24/7 Customer Support</span>
            </div>
            
            <div className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-auto sm:w-64 flex-shrink-0 cursor-default">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-blue-50 group-hover:text-white transition-colors">Secure Payment</span>
            </div>
        </div>
    );
};
