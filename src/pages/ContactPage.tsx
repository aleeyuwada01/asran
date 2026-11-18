import { useState, type FormEvent } from 'react';
import { Check, Copy, Landmark, Mail, MapPin, Phone, Send } from 'lucide-react';
import { ORGANISATION } from '../data/asranData';
import {
  buildMailtoHref,
  createInquiryReference,
  hasValidationErrors,
  validateInquiry,
  type InquiryCategory,
  type InquiryFormInput,
  type InquiryValidationErrors,
  type SubmittedInquiry,
} from '../utils/contactForm';

const INQUIRY_CATEGORIES: InquiryCategory[] = [
  'Institutional Partnership',
  'Programme & Consultancy',
  'Volunteer Engagement',
  'Donation & Support',
  'General Inquiry',
];

const INITIAL_FORM: InquiryFormInput = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  category: 'Institutional Partnership',
  message: '',
};

export function ContactPage() {
  const [form, setForm] = useState<InquiryFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleCopyAccount = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(ORGANISATION.banking.accountNumber);
      }
      setCopiedAccount(true);
      window.setTimeout(() => setCopiedAccount(false), 3000);
    } catch {
      setCopiedAccount(true);
      window.setTimeout(() => setCopiedAccount(false), 3000);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateInquiry(form);
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const nextSeq = submittedInquiries.length + 1;
    const record: SubmittedInquiry = {
      fullName: form.fullName.trim(),
      organization: form.organization.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      category: form.category,
      message: form.message.trim(),
      referenceId: createInquiryReference(nextSeq),
      submittedAt: new Date().toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setSubmittedInquiries((prev) => [record, ...prev]);
    setErrors({});
    setForm(INITIAL_FORM);
  };

  return (
    <div className="bg-white">
      {/* Curved Deep Pine Masthead (Matches Attached Contact Reference) */}
      <section className="bg-[#234740] text-white rounded-b-[2rem] sm:rounded-b-[3.25rem] px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-[960px] mx-auto text-center space-y-3.5">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Contact
          </h1>
          <p className="text-sm sm:text-base text-[#D3E2DE] leading-relaxed max-w-xl mx-auto">
            Get in touch with ASRAN to partner on programmes, support vulnerable communities, or
            inquire about our work across Nigeria.
          </p>
        </div>
      </section>

      {/* "Let's hear from you" Form Section (Directly Adapted from Contact Reference) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
              Let’s hear from you
            </h2>
            <p className="text-sm text-[#556B66] pt-1">
              Complete the form below to record your inquiry reference and prepare direct
              correspondence to{' '}
              <span className="font-semibold text-[#17302B]">{ORGANISATION.email}</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-fullName"
                  className="block text-xs font-semibold text-[#17302B]"
                >
                  Full Name <span className="text-[#B45309]">*</span>
                </label>
                <input
                  id="contact-fullName"
                  name="fullName"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                  placeholder="Enter your full name"
                  className={`w-full min-h-[46px] px-4 py-2.5 text-sm rounded-lg border bg-[#FAFBFB] focus:bg-white transition-colors ${
                    errors.fullName ? 'border-[#B45309]' : 'border-[#D4DFDC] focus:border-[#234740]'
                  }`}
                />
                {errors.fullName && (
                  <p id="error-fullName" role="alert" className="text-xs text-[#B45309]">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-[#17302B]"
                >
                  Email Address <span className="text-[#B45309]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  placeholder="Enter your email address"
                  className={`w-full min-h-[46px] px-4 py-2.5 text-sm rounded-lg border bg-[#FAFBFB] focus:bg-white transition-colors ${
                    errors.email ? 'border-[#B45309]' : 'border-[#D4DFDC] focus:border-[#234740]'
                  }`}
                />
                {errors.email && (
                  <p id="error-email" role="alert" className="text-xs text-[#B45309]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-semibold text-[#17302B]"
                >
                  Phone No. (Optional)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g. 0803 000 0000"
                  className="w-full min-h-[46px] px-4 py-2.5 text-sm rounded-lg border border-[#D4DFDC] bg-[#FAFBFB] focus:bg-white focus:border-[#234740] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-organization"
                  className="block text-xs font-semibold text-[#17302B]"
                >
                  Organisation (Optional)
                </label>
                <input
                  id="contact-organization"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))}
                  placeholder="Agency, NGO, or Group"
                  className="w-full min-h-[46px] px-4 py-2.5 text-sm rounded-lg border border-[#D4DFDC] bg-[#FAFBFB] focus:bg-white focus:border-[#234740] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-category"
                  className="block text-xs font-semibold text-[#17302B]"
                >
                  Category
                </label>
                <select
                  id="contact-category"
                  name="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value as InquiryCategory,
                    }))
                  }
                  className="w-full min-h-[46px] px-4 py-2.5 text-sm rounded-lg border border-[#D4DFDC] bg-[#FAFBFB] focus:bg-white focus:border-[#234740] transition-colors"
                >
                  {INQUIRY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-[#17302B]"
              >
                Message <span className="text-[#B45309]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, message: e.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'error-message' : undefined}
                placeholder="Write your message here..."
                className={`w-full px-4 py-3 text-sm rounded-lg border bg-[#FAFBFB] focus:bg-white transition-colors resize-y ${
                  errors.message ? 'border-[#B45309]' : 'border-[#D4DFDC] focus:border-[#234740]'
                }`}
              />
              {errors.message && (
                <p id="error-message" role="alert" className="text-xs text-[#B45309]">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold tracking-wide text-white bg-[#234740] hover:bg-[#17302B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#F5A623]" aria-hidden="true" />
                <span>Submit Inquiry</span>
              </button>
              <p className="text-xs text-[#556B66]">
                Fields marked with <span className="text-[#B45309]">*</span> are required.
              </p>
            </div>
          </form>

          {/* Recorded Inquiry Receipts */}
          {submittedInquiries.length > 0 && (
            <div
              aria-live="polite"
              className="bg-[#F4F7F6] border border-[#234740]/30 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wide text-[#D68910]">
                  INQUIRY RECORDED ({submittedInquiries.length})
                </p>
                <h3 className="text-xl font-bold text-[#17302B]">Your correspondence summary</h3>
              </div>

              <div className="divide-y divide-[#DCE5E2]">
                {submittedInquiries.map((item) => (
                  <div key={item.referenceId} className="py-4 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-[#234740] tabular-nums">
                        {item.referenceId}
                      </span>
                      <span className="text-[#556B66]">
                        {item.category} · {item.submittedAt}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#17302B]">
                      {item.fullName}
                      {item.organization ? ` (${item.organization})` : ''} · {item.email}
                    </p>
                    <p className="text-sm text-[#556B66] leading-relaxed">{item.message}</p>
                    <div className="pt-1">
                      <a
                        href={buildMailtoHref(ORGANISATION.email, item)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#234740] hover:text-[#D68910] underline underline-offset-4"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Open pre-filled email to {ORGANISATION.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* "You can directly meet us here" + 3 Crisp Cards + Official Banking Support */}
      <section className="py-12 sm:py-16 bg-[#F4F7F6] border-t border-[#E2EAE7]">
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17302B] heading-amber-underline">
              You can directly meet us here
            </h2>
          </div>

          {/* 3 Horizontal Contact Cards (Mirrors Contact Reference) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white border border-[#E2EAE7] rounded-xl p-5 flex items-start gap-3.5 shadow-[0_4px_16px_rgba(35,71,64,0.04)]">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-bold text-[#D68910]">Telephone</p>
                <div className="flex flex-col gap-0.5 font-mono text-xs text-[#17302B] tabular-nums">
                  {ORGANISATION.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+234${phone.replace(/^0/, '')}`}
                      className="hover:text-[#234740] hover:underline underline-offset-4"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2EAE7] rounded-xl p-5 flex items-start gap-3.5 shadow-[0_4px_16px_rgba(35,71,64,0.04)]">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-bold text-[#D68910]">Katsina Headquarters</p>
                <p className="text-xs text-[#17302B] leading-relaxed">
                  {ORGANISATION.physicalAddress}
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E2EAE7] rounded-xl p-5 flex items-start gap-3.5 shadow-[0_4px_16px_rgba(35,71,64,0.04)]">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7F6] text-[#234740] inline-flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-bold text-[#D68910]">Email Address</p>
                <div className="flex flex-col gap-1">
                  {ORGANISATION.emails.map((emailAddress, idx) => (
                    <a
                      key={emailAddress}
                      href={`mailto:${emailAddress}`}
                      className={`block text-xs hover:text-[#234740] hover:underline underline-offset-4 break-all ${
                        idx === 0 ? 'font-bold text-[#17302B]' : 'font-medium text-[#556B66]'
                      }`}
                    >
                      {emailAddress}
                    </a>
                  ))}
                </div>
                <p className="font-mono text-[11px] text-[#556B66] tabular-nums pt-0.5">
                  {ORGANISATION.registrationNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Official Support & Banking Card */}
          <div
            id="support-banking"
            className="bg-[#234740] text-white rounded-2xl p-6 sm:p-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-center scroll-mt-24"
          >
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5A623]">
                <Landmark className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>OFFICIAL ORGANISATIONAL ACCOUNT</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Support ASRAN’s Charitable Work</h3>
              <p className="text-xs sm:text-sm text-[#D3E2DE] leading-relaxed">
                Donations, grants, and charitable contributions supporting ASRAN’s community
                education, orphan care, and empowerment initiatives may be remitted directly to our
                official Eco Bank account.
              </p>
            </div>

            <div className="md:col-span-5 bg-white/[0.08] border border-white/12 rounded-xl p-5 space-y-3.5">
              <dl className="space-y-2 text-xs">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[#B8CCC7]">Account Name</dt>
                  <dd className="font-semibold text-white text-right">
                    {ORGANISATION.banking.accountName}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[#B8CCC7]">Bank &amp; Branch</dt>
                  <dd className="font-semibold text-white text-right">
                    {ORGANISATION.banking.bankName} ({ORGANISATION.banking.branch})
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pt-2 border-t border-white/12">
                  <dt className="text-[#B8CCC7]">Account No.</dt>
                  <dd className="font-mono text-lg font-bold text-[#F5A623] tracking-wider tabular-nums">
                    {ORGANISATION.banking.accountNumber}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={handleCopyAccount}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#17302B] bg-[#F5A623] hover:bg-[#E09214] rounded-lg transition-colors cursor-pointer"
              >
                {copiedAccount ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Copied ({ORGANISATION.banking.accountNumber})</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copy Account Number</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
