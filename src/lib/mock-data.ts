/**
 * Mock data for development when Directus is not connected
 * This data matches the static HTML content
 */

import type { ParsedReleaseNote, ArchiveItem } from '@/types/directus';

export const mockRelease: ParsedReleaseNote = {
  id: 'mock-001',
  scope: 'finance',
  period_type: 'week',
  period_key: '2025-W52',
  title: 'Ambak Weekly',
  summary: "At Ambak, we ship because you ask for it. But sometimes the team spots an opportunity for a small fix that unlocks big improvements in your workflow. Here's what we built this week.",
  status: 'published',
  published_at: new Date().toISOString(),
  sections: [
    {
      id: 'section-1',
      title: 'Raycast-Style Quick Actions',
      description: "You can now use command-bar style navigation throughout Finance and Yoddha. The first thing it unlocked is instant tab switching—open any screen from anywhere with just a few keystrokes. Think of it as saving dozens of clicks throughout your day, eliminating the small distractions that break your flow.",
      sort: 1,
      status: 'published',
      scopes: ['finance', 'yoddha'],
      contributors: [
        { directus_users_id: { first_name: 'Aniket', last_name: '', email: 'aniket@ambak.com' } },
        { directus_users_id: { first_name: 'Priya', last_name: '', email: 'priya@ambak.com' } },
      ],
      media_type: 'image',
      mediaUrl: 'https://placehold.co/600x400/667eea/ffffff?text=Quick+Actions',
    },
    {
      id: 'section-2',
      title: 'Search and Remember',
      description: "Now you can search your workspace memory directly from the Tab Overflow menu. Not sure where that meeting transcript or invoice went? Click the dropdown in the top right to search open or recently closed tabs, or let the system find it in memory for you. No more hunting through dozens of tabs or asking teammates to resend documents.",
      sort: 2,
      status: 'published',
      scopes: ['finance'],
      contributors: [
        { directus_users_id: { first_name: 'Rahul', last_name: '', email: 'rahul@ambak.com' } },
      ],
      media_type: 'image',
      mediaUrl: 'https://placehold.co/600x400/764ba2/ffffff?text=Search+Memory',
    },
    {
      id: 'section-3',
      title: 'Bookmarks Meet Search',
      description: "We've added bookmarks to Command Bar search results and ranked them just like your browsing history. Start typing in the Command Bar and watch your saved pages appear alongside everything else. Your most important resources are now always within reach, organized by how often you actually use them.",
      sort: 3,
      status: 'published',
      scopes: ['yoddha', 'sangam'],
      contributors: [
        { directus_users_id: { first_name: 'Sanjay', last_name: '', email: 'sanjay@ambak.com' } },
        { directus_users_id: { first_name: 'Meera', last_name: '', email: 'meera@ambak.com' } },
      ],
      media_type: 'image',
      mediaUrl: 'https://placehold.co/600x400/f093fb/ffffff?text=Bookmarks',
    },
    {
      id: 'section-4',
      title: 'New Payout Reconciliation View',
      description: "The payout dashboard now groups transactions by status and highlights discrepancies automatically. Finance teams can reconcile weekly payouts in minutes instead of hours. The new view surfaces exceptions first, letting you focus on what needs attention rather than scanning through perfectly matched entries.",
      sort: 4,
      status: 'published',
      scopes: ['finance'],
      contributors: [
        { directus_users_id: { first_name: 'Deepak', last_name: '', email: 'deepak@ambak.com' } },
      ],
      media_type: 'image',
      mediaUrl: 'https://placehold.co/600x400/4facfe/ffffff?text=Payout+Reconciliation',
    },
    {
      id: 'section-5',
      title: 'MIS Screen Performance Boost',
      description: "The MIS dashboard now loads 3x faster with large datasets. We optimized how we fetch and render tables with thousands of rows, added smarter pagination, and improved the search indexing. Reports that used to take 20 seconds now appear in under 7. Your morning routine just got a lot smoother.",
      sort: 5,
      status: 'published',
      scopes: ['yoddha'],
      contributors: [
        { directus_users_id: { first_name: 'Arjun', last_name: '', email: 'arjun@ambak.com' } },
        { directus_users_id: { first_name: 'Neha', last_name: '', email: 'neha@ambak.com' } },
      ],
      media_type: 'image',
      mediaUrl: 'https://placehold.co/600x400/00f2fe/ffffff?text=MIS+Performance',
    },
  ],
};

export const mockArchive: ArchiveItem[] = [
  { period_key: '2025-W52', title: 'Issue 003', published_at: '2025-12-27T10:30:00Z', status: 'published' },
  { period_key: '2025-W51', title: 'Issue 002', published_at: '2025-12-20T10:30:00Z', status: 'archived' },
  { period_key: '2025-W50', title: 'Issue 001', published_at: '2025-12-13T10:30:00Z', status: 'archived' },
  { period_key: '2025-nov', title: 'November 2025', published_at: '2025-11-30T10:30:00Z', status: 'archived' },
  { period_key: '2025-oct', title: 'October 2025', published_at: '2025-10-31T10:30:00Z', status: 'archived' },
  { period_key: '2025-sep', title: 'September 2025', published_at: '2025-09-30T10:30:00Z', status: 'archived' },
  { period_key: '2025-aug', title: 'August 2025', published_at: '2025-08-31T10:30:00Z', status: 'archived' },
];

