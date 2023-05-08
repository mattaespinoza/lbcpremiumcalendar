import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { Feed } from 'feed';
import { supabase } from '../../../utils/supbaseClient'

type Event = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('city_calendar','San Antonio')
    .order('start_time', { ascending: true });

  if (error) {
    console.error(error);
    return res.status(500).end();
  }

  const feed = new Feed({
    title: 'Upcoming Events',
    description: 'A list of upcoming events.',
    id: 'https://example.com/',
    link: 'https://example.com/',
    copyright:'',
    language: 'en',
    image: 'https://example.com/logo.png',
    favicon: 'https://example.com/favicon.ico',
    updated: new Date(),
    generator: 'Next.js',
  });

  events.forEach((event) => {
    feed.addItem({
      title: event.name,
      description: event.description,
      id: event.id.toString(),
      link: event.website,
      date: new Date(event.start_date),
      author: [{ name: 'Your Name', email: 'your-email@example.com' }],
    });
  });

  const rssFeed = feed.rss2();

  res.setHeader('Content-Type', 'application/rss+xml');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.write(rssFeed);
  res.end();
};