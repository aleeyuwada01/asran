import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  createInquiryReference,
  hasValidationErrors,
  validateInquiry,
} from './contactForm';

test('rejects empty required fields without substituting fallback values', () => {
  const errors = validateInquiry({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    category: 'Institutional Partnership',
    message: '',
  });
  assert.equal(hasValidationErrors(errors), true);
  assert.ok(errors.fullName);
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('flags invalid email addresses and overly brief messages', () => {
  const errors = validateInquiry({
    fullName: 'Amina Bello',
    organization: 'Katsina Civic Forum',
    email: 'invalid-email',
    phone: '08030000000',
    category: 'Volunteer Engagement',
    message: 'Too short',
  });
  assert.equal(hasValidationErrors(errors), true);
  assert.equal(errors.fullName, undefined);
  assert.ok(errors.email);
  assert.ok(errors.message);
});

test('passes validation for complete valid submissions', () => {
  const errors = validateInquiry({
    fullName: 'Dr. Musa Ibrahim',
    organization: 'Northern Health Initiative',
    email: 'musa.ibrahim@example.org',
    phone: '08031234567',
    category: 'Institutional Partnership',
    message: 'We would like to discuss collaboration on rural maternal health sensitization in Katsina.',
  });
  assert.equal(hasValidationErrors(errors), false);
});

test('formats inquiry references and mailto links cleanly', () => {
  const ref = createInquiryReference(7, new Date('2026-05-01T00:00:00Z'));
  assert.equal(ref, 'ASRAN-2026-0007');

  const href = buildMailtoHref('asrankt@gmail.com', {
    referenceId: ref,
    submittedAt: '2026-05-01T00:00:00Z',
    fullName: 'Dr. Musa Ibrahim',
    organization: 'Northern Health Initiative',
    email: 'musa.ibrahim@example.org',
    phone: '08031234567',
    category: 'Institutional Partnership',
    message: 'Requesting partnership briefing for Katsina State.',
  });
  assert.ok(href.startsWith('mailto:asrankt@gmail.com?subject='));
  assert.ok(href.includes('ASRAN-2026-0007'));
});
