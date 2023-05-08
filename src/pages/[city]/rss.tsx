
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GetServerSideProps, NextPage } from 'next';
import { Feed } from 'feed';
import { supabase } from '../../../utils/supbaseClient'

type Event = {
  id: any;
  title: any;
  description: any;
  start_time: any;
  end_time: any;
  location: any;
};

type Props = {
  events: any[];
};


const RssFeedPage: NextPage<Props> = ({ events}) => {
  const feed = new Feed({
    title: 'Upcoming Events',
    description: 'A list of upcoming events.',
    id: 'https://example.com/',
    link: 'https://example.com/',
    language: 'en',
    copyright:'',
    image: 'https://example.com/logo.png',
    favicon: 'https://example.com/favicon.ico',
    updated: new Date(),
    generator: 'Next.js',
    feedLinks: {
      rss2: 'https://example.com/rss.xml',
    },
  });

  events.forEach((event) => {
    feed.addItem({
      title: event.name,
      description: event.description,
      id: event.id.toString(),
      link: event.website,
      date: new Date(event.start_time),
      author: [{ name: 'Your Name', email: 'your-email@example.com' }],
    });
  });

  const rssXML  =feed.rss2();
  return <div dangerouslySetInnerHTML={{ __html: rssXML }} />;

};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data: events, error } = await supabase.from('events').select('*').eq('city_calendar','San Antonio').order('start_time', { ascending: true });

  if (error) {
    console.error(error);
    return { notFound: true };
  }

  return { props: { events } };
};

export default RssFeedPage;