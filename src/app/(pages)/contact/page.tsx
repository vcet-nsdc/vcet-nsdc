/**
 * Contact Page
 * Contact information and form
 */

import { Suspense } from 'react';
import { Metadata } from 'next';
import { ContactInfo } from '@/components/contact/contact-info';
import { ContactForm } from '@/components/contact/contact-form';
import { LoadingState } from '@/components/ui/loading';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with NSDC VCET team for collaborations and inquiries',
  openGraph: {
    title: 'Contact | NSDC VCET',
    description: 'Get in touch with NSDC VCET team for collaborations and inquiries',
    type: 'website',
  },
};

// ============================================================================
// CONTACT PAGE COMPONENT
// ============================================================================

export default function ContactPage() {
  return (
    <main className="min-h-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get in touch with our team for collaborations, inquiries, or to learn more about NSDC VCET
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Suspense fallback={<LoadingState message="Loading contact information..." />}>
            <ContactInfo />
          </Suspense>

          {/* Contact Form */}
          <Suspense fallback={<LoadingState message="Loading contact form..." />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
