import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import toast from "react-hot-toast";
import {
  Award,
  Check,
  Infinity as InfinityIcon,
  Loader2,
  Share2,
  Smartphone,
  Video,
} from "lucide-react";

import { BASE_URL, PAYMENT_API_ENDPOINT } from "../../Services/apiConfig";
import { apiConnector } from "../../Services/apiConnector";

const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

const INCLUDES = [
  { Icon: Video, label: "8 hours of on-demand video" },
  { Icon: InfinityIcon, label: "Full lifetime access" },
  { Icon: Smartphone, label: "Access on mobile and TV" },
  { Icon: Award, label: "Certificate of completion" },
];

function BuyCourseCard({ id, amount, courseName, thumbnail }: any) {
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const { firstName, lastName, email, contact_no }: any = user;

    try {
      setLoading(true);

      // create order id
      const orderResponse = await apiConnector({
        method: "POST",
        url: `${BASE_URL}${PAYMENT_API_ENDPOINT.CREATE_ORDER}`,
        bodyData: { courseId: id, amount, currency: "INR" },
        headers: { token: `${localStorage.getItem("token")}` },
      });

      if (orderResponse.data) {
        const options: RazorpayOrderOptions = {
          key: "rzp_test_HGacuFpexD8oZ4",
          amount: amount * 100,
          currency: "INR",
          name: "Study-Notion",
          description: courseName || "Course Purchase",
          order_id: `${orderResponse.data.razorpayOrderId}`,
          prefill: {
            name: firstName + " " + lastName,
            email: email,
            contact: contact_no,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
      }
    } catch (err) {
      console.log(err);
      toast.error("We couldn't start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareHandler = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: courseName, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Course link copied to clipboard");
      }
    } catch {
      /* the user dismissed the share sheet — nothing to report */
    }
  };

  return (
    <aside className="sn-card overflow-hidden">
      <div className="aspect-video overflow-hidden bg-ink-850">
        <img
          src={thumbnail || FALLBACK_THUMBNAIL}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-baseline gap-2">
          <p className="font-display text-3xl font-extrabold text-white">
            ₹{amount}
          </p>
          <span className="text-sm text-ink-500 line-through">
            ₹{Math.round(Number(amount) * 2.5) || ""}
          </span>
          <span className="sn-badge bg-success-500/15 text-success-400">
            60% off
          </span>
        </div>

        <p className="mt-1.5 text-xs font-medium text-danger-400">
          Limited-time price
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              "Buy now"
            )}
          </button>

          <button
            type="button"
            onClick={() => toast.success("Added to your cart")}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-ink-700 text-base font-semibold text-ink-100 transition-all duration-300 hover:border-ink-600 hover:bg-ink-850"
          >
            Add to cart
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-ink-500">
          30-day money-back guarantee
        </p>

        <div className="mt-6 border-t border-ink-800 pt-5">
          <p className="text-sm font-semibold text-white">
            This course includes
          </p>
          <ul className="mt-3 space-y-2.5">
            {INCLUDES.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-ink-300"
              >
                <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                {label}
              </li>
            ))}
            <li className="flex items-center gap-2.5 text-sm text-ink-300">
              <Check className="h-4 w-4 shrink-0 text-success-400" />
              Downloadable project files
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={shareHandler}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
        >
          <Share2 className="h-4 w-4" />
          Share this course
        </button>
      </div>
    </aside>
  );
}

export default BuyCourseCard;
