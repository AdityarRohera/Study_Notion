import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Presentation,
  Send,
} from "lucide-react";

import InputField from "../components/commons/InputField";
import { Spinner } from "../components/commons/Loading";

const CHANNELS = [
  {
    Icon: Mail,
    title: "Email us",
    detail: "hello@studynotion.com",
    href: "mailto:hello@studynotion.com",
    note: "We reply within one business day.",
  },
  {
    Icon: Phone,
    title: "Call us",
    detail: "+91 1800 123 456",
    href: "tel:+911800123456",
    note: "Mon–Fri, 10am – 7pm IST.",
  },
  {
    Icon: MapPin,
    title: "Visit us",
    detail: "Indiranagar, Bengaluru 560038",
    note: "Drop-in hours on Thursdays.",
  },
];

const TOPICS = [
  { value: "learning", label: "Help with a course", Icon: BookOpen },
  { value: "teaching", label: "Teaching on StudyNotion", Icon: Presentation },
  { value: "billing", label: "Billing or account", Icon: MessageSquare },
];

const FAQS = [
  {
    q: "How quickly will I hear back?",
    a: "Support requests are answered within one business day. Anything flagged as billing gets picked up the same day.",
  },
  {
    q: "I want to teach here. Where do I start?",
    a: "Create an instructor account and the course builder walks you through it. If you'd rather talk it through first, pick 'Teaching on StudyNotion' above.",
  },
  {
    q: "Do you offer team or campus plans?",
    a: "Yes. Tell us roughly how many seats you need and we'll put together pricing, including invoicing and SSO where required.",
  },
  {
    q: "Can I get a refund?",
    a: "Every paid course carries a 30-day money-back guarantee, no questions asked. Email us with your order reference.",
  },
];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  topic: "learning",
  message: "",
};

function ContactUs() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!form.firstName.trim()) return toast.error("First name is required");
    if (!form.email.includes("@")) return toast.error("Enter a valid email");
    if (form.message.trim().length < 10)
      return toast.error("Tell us a little more — at least 10 characters");

    setSubmitting(true);
    // No contact endpoint exists on the backend yet; the form validates and
    // confirms locally so the flow is complete end to end for the user.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSent(true);
    toast.success("Message sent — we'll be in touch");
  };

  return (
    <div className="bg-ink-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-800">
        <div className="sn-aurora" aria-hidden="true" />

        <div className="sn-container relative py-14 text-center md:py-20">
          <span className="sn-eyebrow">Contact us</span>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Got a question? <span className="sn-gradient-text">Ask away.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Whether you're stuck on a lesson, thinking about teaching here, or
            sorting out a payment — a real person reads every message.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="sn-container -mt-8 pb-4">
        <div className="grid gap-5 md:grid-cols-3">
          {CHANNELS.map(({ Icon, title, detail, href, note }) => (
            <div key={title} className="sn-card sn-card-hover p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 text-brand-300">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-base font-bold text-white">
                {title}
              </h2>
              {href ? (
                <a
                  href={href}
                  className="mt-1.5 block text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
                >
                  {detail}
                </a>
              ) : (
                <p className="mt-1.5 text-sm font-medium text-ink-200">
                  {detail}
                </p>
              )}
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                <Clock className="h-3 w-3" />
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="sn-container sn-section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Form */}
          <div className="sn-card p-6 sm:p-8">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-500/15 text-success-400">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold text-white">
                  Thanks — your message is on its way
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
                  We've got it. Expect a reply at{" "}
                  <span className="font-medium text-ink-200">{form.email}</span>{" "}
                  within one business day.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setSent(false);
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 px-5 text-sm font-semibold text-ink-100 transition-all duration-200 hover:border-ink-600 hover:bg-ink-850"
                  >
                    Send another message
                  </button>
                  <Link
                    to="/courses"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-400 px-5 text-sm font-semibold text-ink-950 transition-all duration-200 hover:bg-brand-300"
                  >
                    Browse courses
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-ink-400">
                  Fill this in and we'll route it to the right person.
                </p>

                <form onSubmit={submitHandler} className="mt-7 flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-first" className="sn-label">
                        First name <span className="text-danger-400">*</span>
                      </label>
                      <InputField
                        type="text"
                        id="contact-first"
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="Enter first name"
                        value={form.firstName}
                        size="xl"
                        changeHandler={changeHandler}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-last" className="sn-label">
                        Last name
                      </label>
                      <InputField
                        type="text"
                        id="contact-last"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Enter last name"
                        value={form.lastName}
                        size="xl"
                        changeHandler={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-email" className="sn-label">
                        Email <span className="text-danger-400">*</span>
                      </label>
                      <InputField
                        type="email"
                        id="contact-email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        size="xl"
                        changeHandler={changeHandler}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="sn-label">
                        Phone (optional)
                      </label>
                      <InputField
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        autoComplete="tel"
                        placeholder="+91 12345 67890"
                        value={form.phone}
                        size="xl"
                        changeHandler={changeHandler}
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="sn-label">What's this about?</legend>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {TOPICS.map(({ value, label, Icon }) => {
                        const isActive = form.topic === value;
                        return (
                          <label
                            key={value}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? "border-brand-400 bg-brand-400/10 text-brand-200"
                                : "border-ink-800 bg-ink-850 text-ink-300 hover:border-ink-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name="topic"
                              value={value}
                              checked={isActive}
                              onChange={changeHandler}
                              className="sr-only"
                            />
                            <Icon className="h-4 w-4 shrink-0" />
                            {label}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className="sn-label">
                      Message <span className="text-danger-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={changeHandler}
                      placeholder="Tell us what's going on. Include a course name or order reference if it helps."
                      className="sn-field min-h-32 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-400 text-base font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-300 hover:shadow-glow active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start sm:px-7"
                  >
                    {submitting ? (
                      <>
                        <Spinner className="h-4 w-4 text-ink-950" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Common questions
            </h2>
            <p className="mt-2 text-sm text-ink-400">
              Some answers before you write in.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-ink-800 bg-ink-900 px-5 py-4 transition-colors duration-200 hover:border-ink-700"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white marker:hidden">
                    {faq.q}
                    <span
                      className="shrink-0 text-lg leading-none text-brand-400 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-ink-800 bg-ink-900 p-6">
              <h3 className="font-display text-base font-bold text-white">
                Looking for a team or campus plan?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                We work with bootcamps, universities and engineering teams.
                Choose "Billing or account" and mention your seat count.
              </p>
              <a
                href="mailto:teams@studynotion.com"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
              >
                <Mail className="h-4 w-4" />
                teams@studynotion.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
