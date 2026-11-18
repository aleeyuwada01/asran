export type InquiryCategory =
  | 'Institutional Partnership'
  | 'Programme & Consultancy'
  | 'Volunteer Engagement'
  | 'Donation & Support'
  | 'General Inquiry';

export interface InquiryFormInput {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  category: InquiryCategory;
  message: string;
}

export interface InquiryValidationErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export interface SubmittedInquiry extends InquiryFormInput {
  referenceId: string;
  submittedAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: InquiryFormInput): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  if (input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address so ASRAN can respond.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (for example, name@organisation.org).';
  }

  if (input.message.trim().length < 15) {
    errors.message = 'Please include a clear message of at least 15 characters.';
  }

  return errors;
}

export function hasValidationErrors(errors: InquiryValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function createInquiryReference(sequenceNumber: number, date = new Date()): string {
  const year = date.getUTCFullYear();
  const padded = String(sequenceNumber).padStart(4, '0');
  return `ASRAN-${year}-${padded}`;
}

export function buildMailtoHref(recipientEmail: string, inquiry: SubmittedInquiry): string {
  const subject = `[${inquiry.referenceId}] ${inquiry.category} — ${inquiry.fullName}`;
  const bodyLines = [
    `Reference: ${inquiry.referenceId}`,
    `Name: ${inquiry.fullName}`,
    inquiry.organization.trim() ? `Organisation: ${inquiry.organization.trim()}` : null,
    `Email: ${inquiry.email.trim()}`,
    inquiry.phone.trim() ? `Phone: ${inquiry.phone.trim()}` : null,
    `Category: ${inquiry.category}`,
    '',
    'Message:',
    inquiry.message.trim(),
  ].filter((line): line is string => line !== null);

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join('\n')
  )}`;
}
