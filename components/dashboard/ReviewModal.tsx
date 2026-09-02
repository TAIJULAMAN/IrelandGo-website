import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Star, UploadCloud, X } from "lucide-react";
import { useCreateReviewMutation } from "@/Redux/features/review/reviewApi";
import { toast } from "sonner";

export function ReviewModal({
  isOpen,
  onOpenChange,
  booking,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 10) {
        toast.error("You can upload a maximum of 10 images.");
        return;
      }
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please provide a rating.");
      return;
    }

    const formData = new FormData();
    const tripServiceId = booking?.tripServiceId?._id || booking?.tripServiceId || booking?._id;
    const bookingId = booking?.id || booking?._id;
    
    if (tripServiceId) formData.append("tripServiceId", tripServiceId);
    if (bookingId) formData.append("bookingId", bookingId);
    formData.append("rating", rating.toString());
    if (comment) formData.append("comment", comment);
    
    images.forEach((img) => {
      formData.append("image", img);
    });

    try {
      await createReview(formData).unwrap();
      toast.success("Review submitted successfully!");
      onOpenChange(false);
      setRating(0);
      setComment("");
      setImages([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-50/50 p-6 border-b border-slate-100/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              Write a Review
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium mt-1">
              Share your experience for {booking?.serviceType?.replace(/_/g, " ") || "this trip"}.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Rating */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              Your Rating
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Your Feedback (Optional)
            </label>
            <textarea
              className="w-full bg-white text-slate-800 py-3 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm min-h-[100px] resize-none"
              placeholder="What did you like or dislike?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Add Photos (Max 10)
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative h-16 w-16 rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={URL.createObjectURL(img)} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <label className="h-16 w-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors">
                  <UploadCloud className="h-5 w-5 text-slate-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 p-6 border-t border-slate-100/50 flex justify-end gap-3">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || !rating}
            onClick={handleSubmit}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
