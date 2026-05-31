'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { APPLICATIONS } from '@/lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(2, 'Please enter your company'),
  email: z.string().email('Enter a valid email'),
  country: z.string().min(2, 'Please enter your country'),
  phone: z.string().optional(),
  application: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10, 'Please add a few details (min. 10 characters)'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ defaultProduct = '' }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { product: defaultProduct },
  });

  async function onSubmit(values: FormValues) {
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold">Thank you — your enquiry has been received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will respond with availability, documentation, and next steps within [X]
          business days.
        </p>
        <Button className="mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input {...register('name')} error={errors.name?.message} aria-label="Name" />
        </Field>
        <Field label="Company">
          <Input {...register('company')} error={errors.company?.message} aria-label="Company" />
        </Field>
        <Field label="Email">
          <Input type="email" {...register('email')} error={errors.email?.message} aria-label="Email" />
        </Field>
        <Field label="Country">
          <Input {...register('country')} error={errors.country?.message} aria-label="Country" />
        </Field>
        <Field label="Phone (optional)">
          <Input {...register('phone')} aria-label="Phone" />
        </Field>
        <Field label="Application (optional)">
          <select
            {...register('application')}
            aria-label="Application"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select…</option>
            {APPLICATIONS.map((a) => (
              <option key={a.slug} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Product(s) of interest (optional)">
        <Input {...register('product')} aria-label="Products of interest" placeholder="e.g. Menthol Crystals, CAS 2216-51-5" />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          aria-label="Message"
          rows={5}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-destructive">
          Something went wrong sending your enquiry. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="bg-gold text-gold-foreground hover:opacity-90">
        {isSubmitting ? 'Sending…' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-destructive">{error}</span>}
    </label>
  );
}
