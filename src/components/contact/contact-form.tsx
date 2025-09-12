/**
 * Contact Form Component
 * Form for sending messages to the team
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading';
import { VALIDATION, SUCCESS_MESSAGES } from '@/lib/constants';
import type { ContactFormData } from '@/types';

// ============================================================================
// FORM VALIDATION SCHEMA
// ============================================================================

const contactSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.name.minLength, 'Name must be at least 2 characters')
    .max(VALIDATION.name.maxLength, 'Name must be less than 50 characters')
    .regex(VALIDATION.name.pattern, VALIDATION.name.message),
  email: z
    .string()
    .email(VALIDATION.email.message),
  contact: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),
  message: z
    .string()
    .min(VALIDATION.message.minLength, `Message must be at least ${VALIDATION.message.minLength} characters`)
    .max(VALIDATION.message.maxLength, `Message must be less than ${VALIDATION.message.maxLength} characters`),
});

// ============================================================================
// CONTACT FORM COMPONENT
// ============================================================================

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Contact Field */}
        <div className="space-y-2">
          <Label htmlFor="contact" className="text-white">
            Phone Number *
          </Label>
          <Input
            id="contact"
            type="tel"
            placeholder="+91 98765 43210"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
            {...register('contact')}
          />
          {errors.contact && (
            <p className="text-red-400 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">
            Message *
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your inquiry, collaboration idea, or any questions you have..."
            rows={5}
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 resize-none"
            {...register('message')}
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
            <p className="text-green-300 text-sm">{SUCCESS_MESSAGES.contactSent}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <p className="text-red-300 text-sm">
              Failed to send message. Please try again or contact us directly.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
