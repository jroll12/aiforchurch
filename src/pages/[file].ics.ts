/*
 * Add to calendar (07 Confirmation): /workshop.ics, built only once
 * EVENT.start and EVENT.end are set in src/config.ts. While the date is a
 * placeholder no file is built and Confirmation shows no link.
 */
import type { APIRoute } from 'astro';
import { EVENT, PH, SITE_NAME } from '../config';

export function getStaticPaths() {
  return EVENT.start && EVENT.end ? [{ params: { file: 'workshop' } }] : [];
}

const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escape = (s: string) => s.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

export const GET: APIRoute = () => {
  const start = EVENT.start as string;
  const end = EVENT.end as string;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Roloff AI//Workshop//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:workshop-${utc(start)}@roloff-ai`,
    `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(start)}`,
    `DTEND:${utc(end)}`,
    `SUMMARY:${escape(SITE_NAME)}`,
    `LOCATION:${escape(PH.venue)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Response(`${lines.join('\r\n')}\r\n`, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
