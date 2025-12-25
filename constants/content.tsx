import { EngagementLayer, WorkItem, ProcessStep } from '../types';

/**
 * The Brand & Systems Rebuild is a single, integrated engagement.
 * These are the three inseparable layers of that work.
 */
export const REBUILD_LAYERS: EngagementLayer[] = [
  {
    id: '01',
    title: 'The Visual Layer',
    tagline: 'Modernizing your identity.',
    description: 'We realign your brand identity and core message to ensure how the world sees you matches the actual quality and authority of your business.'
  },
  {
    id: '02',
    title: 'The Technical Layer',
    tagline: 'Building a stable foundation.',
    description: 'We replace fragmented or outdated tools with a single, high-fidelity digital home. Fast, dependable, and built to scale without friction.'
  },
  {
    id: '03',
    title: 'The Operational Layer',
    tagline: 'Simplifying the daily work.',
    description: 'We find and resolve the manual tasks that slow your team down, replacing clutter with clear, automated paths for growth.'
  }
];

export const WORK: WorkItem[] = [
  {
    id: 'w1',
    title: 'Nexus Venture',
    category: 'Brand & Systems Rebuild',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'w2',
    title: 'Aether Group',
    category: 'Brand & Systems Rebuild',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
  }
];

export const PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnostic',
    description: 'A deep assessment of where your brand and your operations have fallen out of sync with your goals.'
  },
  {
    number: '02',
    title: 'Implementation',
    description: 'Building your new identity and your business tools in parallel as one integrated system.'
  },
  {
    number: '03',
    title: 'Transference',
    description: 'Launching the foundations and ensuring your team is trained to take full ownership.'
  }
];