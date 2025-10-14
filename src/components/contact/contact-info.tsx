/**
 * Contact Information Component
 * Display contact details and map
 */

import { CONTACT_INFO } from '@/lib/constants';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Address Location (Google Map) */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">ADDRESS LOCATION</h2>
        <div className="w-full h-[380px] md:h-[460px] overflow-hidden rounded-xl border border-gray-800">
          <iframe
            title="VCET Location Map"
            src="https://www.google.com/maps?q=Vidyavardhini's%20College%20of%20Engineering%20and%20Technology%2C%20Vasai-Virar%20401202&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="pt-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-center">Contact Information</h3>
        <div className="mx-auto mt-6 h-px w-11/12 md:w-8/12 bg-gray-700" />

        <div className="mt-8 space-y-4 text-center text-base md:text-lg">
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Chairperson</span>:&nbsp;
            <a 
              className="underline hover:text-primary-light transition-colors" 
              href={`mailto:${CONTACT_INFO.chairperson}`}
            >
              {CONTACT_INFO.chairperson}
            </a>
          </p>
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">Secretary</span>:&nbsp;
            <a 
              className="underline hover:text-primary-light transition-colors" 
              href={`mailto:${CONTACT_INFO.secretary}`}
            >
              {CONTACT_INFO.secretary}
            </a>
          </p>
          <p>
            <span className="mr-2">📧</span>
            <span className="font-medium">NSDC</span>:&nbsp;
            <a 
              className="underline hover:text-primary-light transition-colors" 
              href={`mailto:${CONTACT_INFO.email}`}
            >
              {CONTACT_INFO.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
