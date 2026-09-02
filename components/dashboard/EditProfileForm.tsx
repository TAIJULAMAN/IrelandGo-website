import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
}

interface EditProfileFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
}

export function EditProfileForm({
  formData,
  setFormData,
  onSubmit,
  isUpdating,
}: EditProfileFormProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Personal Information
        </h2>
        <p className="text-slate-500 mt-1 font-medium">
          Update your personal details and public profile.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your full name"
              className="h-12 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              placeholder="Enter email"
              className="h-12 border-slate-200 bg-slate-100 cursor-not-allowed rounded-xl font-bold text-slate-500 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Contact Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              className="h-12 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              placeholder="Enter your country"
              className="h-12 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100/50 mt-8">
          <Button
            type="submit"
            disabled={isUpdating}
            size="action"
          >
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
