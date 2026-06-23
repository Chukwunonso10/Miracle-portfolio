'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, MessageSquare, Loader2, CheckCircle } from 'lucide-react';
import { contactFormSchema } from '@/lib/validation';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Set subject if service parameter exists in URL query string
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${decodeURIComponent(serviceParam)}`,
        message: `Hello, I would like to inquire about your ${decodeURIComponent(serviceParam)} service...`,
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate inputs with Zod
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const errMap: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errMap[err.path[0] as string] = err.message;
        }
      });
      setErrors(errMap);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Failed to send message.' });
      }
    } catch (e) {
      setErrors({ submit: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-card border border-border text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20">
            <CheckCircle size={32} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">Message Dispatched!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto font-light leading-relaxed">
            Thank you for reaching out. We have logged your request and will contact you via email within 24 business hours.
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-border hover:bg-secondary text-foreground transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-6 sm:p-8 relative">
      
      {errors.submit && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/25 text-xs text-destructive-foreground">
          {errors.submit}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full bg-background border ${
            errors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
          } px-4 py-3 rounded-lg text-sm placeholder:text-muted-foreground/50 text-foreground focus:outline-none transition-colors duration-300`}
          placeholder="e.g. John Doe"
          required
        />
        {errors.name && <p className="text-xs text-destructive-foreground font-light mt-1">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-background border ${
            errors.email ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
          } px-4 py-3 rounded-lg text-sm placeholder:text-muted-foreground/50 text-foreground focus:outline-none transition-colors duration-300`}
          placeholder="e.g. john@domain.com"
          required
        />
        {errors.email && <p className="text-xs text-destructive-foreground font-light mt-1">{errors.email}</p>}
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Subject / Project Type
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full bg-background border ${
            errors.subject ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
          } px-4 py-3 rounded-lg text-sm placeholder:text-muted-foreground/50 text-foreground focus:outline-none transition-colors duration-300`}
          placeholder="e.g. Brand Design Inquiry"
          required
        />
        {errors.subject && <p className="text-xs text-destructive-foreground font-light mt-1">{errors.subject}</p>}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          Brief Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full bg-background border ${
            errors.message ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
          } px-4 py-3 rounded-lg text-sm placeholder:text-muted-foreground/50 text-foreground focus:outline-none resize-none transition-colors duration-300`}
          placeholder="Tell us about your brand scale, timeline, and targets..."
          required
        />
        {errors.message && <p className="text-xs text-destructive-foreground font-light mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-lg bg-gold-gradient text-zinc-950 font-bold uppercase tracking-widest text-xs hover:opacity-90 active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin text-zinc-950" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Mail size={14} />
            <span>Send Enquiry</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="p-8 rounded-2xl bg-card border border-border text-center text-muted-foreground">
        Loading form...
      </div>
    }>
      <ContactFormInner />
    </Suspense>
  );
}
