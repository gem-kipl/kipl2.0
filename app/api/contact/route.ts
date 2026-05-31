import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * RFQ / contact endpoint.
 *
 * Delivers enquiries by email via the Resend REST API (no SDK dependency).
 * If RESEND_API_KEY is not configured, the enquiry is validated and logged
 * server-side so local development works without credentials.
 *
 * Required env to actually send mail:
 *   RESEND_API_KEY      — from https://resend.com
 *   CONTACT_TO_EMAIL    — where enquiries are delivered
 *   CONTACT_FROM_EMAIL  — a verified sender, e.g. "Krystal <noreply@krystalingredients.com>"
 */

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  phone: z.string().optional(),
  application: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10),
});

type Enquiry = z.infer<typeof schema>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderEmail(data: Enquiry): string {
  const rows = (
    [
      ['Name', data.name],
      ['Company', data.company],
      ['Email', data.email],
      ['Country', data.country],
      ['Phone', data.phone],
      ['Application', data.application],
      ['Product(s)', data.product],
    ] as const
  )
    .filter(([, v]) => v)
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b">${label}</td><td style="padding:6px 12px;font-weight:600">${escapeHtml(String(v))}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#0e1726">New RFQ — Krystal Ingredients</h2>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
      <p style="margin-top:16px;color:#64748b">Message</p>
      <p style="white-space:pre-wrap;border-left:3px solid #c8a24b;padding-left:12px">${escapeHtml(
        data.message
      )}</p>
    </div>`;
}

async function sendViaResend(data: Enquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.info('[contact] email not configured — logging enquiry instead:', {
      ...data,
      receivedAt: new Date().toISOString(),
    });
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `RFQ from ${data.company} (${data.country})`,
      html: renderEmail(data),
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend failed: ${res.status} ${detail}`);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    await sendViaResend(parsed.data);
  } catch (err) {
    console.error('[contact] delivery error:', err);
    return NextResponse.json({ error: 'Failed to deliver enquiry' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
