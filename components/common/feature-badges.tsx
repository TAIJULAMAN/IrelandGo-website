import { Check, Clock, Shield } from "lucide-react";

export const FeatureBadges = () => {
    return (
        <div className="flex justify-center items-center gap-6 flex-wrap mt-10 text-white">
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
            </div>
        </div>
    );
};
