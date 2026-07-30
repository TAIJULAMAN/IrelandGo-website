import { Check, Clock, Shield } from "lucide-react";

export const FeatureBadges = () => {
    return (
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap mt-8 md:mt-10">
            <div className="group flex items-center justify-center gap-3 bg-white/85 hover:bg-white px-5 py-3 rounded-full backdrop-blur-md border border-slate-200/80 hover:border-blue-200 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-auto sm:w-64 flex-shrink-0 cursor-default shadow-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Flexible Cancellation</span>
            </div>
            
            <div className="group flex items-center justify-center gap-3 bg-white/85 hover:bg-white px-5 py-3 rounded-full backdrop-blur-md border border-slate-200/80 hover:border-blue-200 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-auto sm:w-64 flex-shrink-0 cursor-default shadow-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-slate-700 group-hover:text-blue-600 transition-colors duration-300">24/7 Customer Support</span>
            </div>
            
            <div className="group flex items-center justify-center gap-3 bg-white/85 hover:bg-white px-5 py-3 rounded-full backdrop-blur-md border border-slate-200/80 hover:border-blue-200 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-auto sm:w-64 flex-shrink-0 cursor-default shadow-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold tracking-wide text-slate-700 group-hover:text-blue-600 transition-colors duration-300">Secure Payment</span>
            </div>
        </div>
    );
};
