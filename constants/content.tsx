
import { ServiceItem, WorkItem, ProcessStep } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: '01',
    title: 'Brand Strategy & Identity Systems',
    tagline: 'Deep positioning for the high-growth era.',
    description: 'We move beyond aesthetics to engineer perception. Our identity systems are modular, scalable, and designed to resonate across every digital touchpoint.'
  },
  {
    id: '02',
    title: 'Web Redesign & Full-Stack Development',
    tagline: 'High-performance digital architectures.',
    description: 'Bespoke web experiences built with modern stacks. We prioritize performance, security, and conversion without sacrificing editorial-grade design.'
  },
  {
    id: '03',
    title: 'Mobile App Development',
    tagline: 'Native and hybrid systems built for retention.',
    description: 'Engineering mobile interfaces that feel instinctive. From utility to luxury, our apps are built to perform at scale.'
  },
  {
    id: '04',
    title: 'API & Platform Integrations',
    tagline: 'Connecting the nodes of your business.',
    description: 'We orchestrate complex ecosystems, ensuring your software stack communicates flawlessly through robust, secure API layers.'
  },
  {
    id: '05',
    title: 'Workflow & Business Automation',
    tagline: 'Replacing manual friction with technical leverage.',
    description: 'We identify systemic bottlenecks and eliminate them through custom automation pipelines, freeing your team for high-value work.'
  },
  {
    id: '06',
    title: 'Digital Upscaling & Optimization',
    tagline: 'The architecture of compound growth.',
    description: 'Performance optimization, technical SEO, and conversion systems that ensure your digital presence generates increasing leverage over time.'
  }
];

export const WORK: WorkItem[] = [
  {
    id: 'w1',
    title: 'Nexus Venture Systems',
    category: 'Full-Stack Platform',
    image: 'https://picsum.photos/seed/nexus/1200/800'
  },
  {
    id: 'w2',
    title: 'Aether Luxury Brand',
    category: 'Brand Identity',
    image: 'https://picsum.photos/seed/aether/1200/800'
  },
  {
    id: 'w3',
    title: 'Quant Fluidics',
    category: 'Industrial UI/UX',
    image: 'https://picsum.photos/seed/fluid/1200/800'
  }
];

export const PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'System Mapping',
    description: 'Deep audit of existing brand, technical, and operational assets.'
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description: 'Defining the technical blueprint and core positioning narrative.'
  },
  {
    number: '03',
    title: 'Design & Engineering',
    description: 'Crafting the interface while simultaneously building the engine.'
  },
  {
    number: '04',
    title: 'Scale & Optimize',
    description: 'Stress-testing systems and launching with automated feedback loops.'
  }
];
