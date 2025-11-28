import { Slide } from '../types';

export const slides: Slide[] = [
  {
    id: 1,
    type: 'title',
    title: 'Ludonarrative Dissonance',
    subtitle: 'A critique of VR Games',
    content: ['Press START or A to begin'],
  },
  {
    id: 2,
    type: 'list',
    title: 'Overview',
    content: [
      '01. Interaction Design Problems',
      '02. Narrative Design Problems',
      '03. Engagement Design Problems'
    ]
  },
  {
    id: 3,
    type: 'content',
    title: 'Thesis Statement',
    content: [
      'Ludonarrative Dissonance:',
      'The conflict between a video game\'s narrative told through the story and the narrative told through the gameplay.',
    ],
    citations: ['Hocking, Clint. "Ludonarrative dissonance in Bioshock" (2009)']
  },
  {
    id: 4,
    type: 'section',
    title: '01',
    subtitle: 'Interaction Design Problems'
  },
  {
    id: 5,
    type: 'image-text',
    title: 'Hyper-Simulation',
    subtitle: 'Abstraction of actions',
    content: [
      '• Traditional: Press R to reload, F to open door.',
      '• VR: Forces manual magazine interaction and bolt pulling in pursuit of "immersion".',
      '• Skips tedious processes vs retaining necessary results.'
    ],
    imageUrl: 'https://picsum.photos/400/300?grayscale', 
    citations: ['Abdlkarim, Diar et al. (2024)']
  },
  {
    id: 6,
    type: 'image-text',
    title: 'Lack of Haptics',
    content: [
      '• Forcing realistic simulation without haptic feedback creates a disconnect.',
      '• Players perform complex physical actions but feel nothing.',
      '• Breaks the illusion of interaction.',
      '• Missing physical resistance and weight.'
    ],
    imageUrl: 'https://picsum.photos/400/301?grayscale'
  },
  {
    id: 7,
    type: 'list',
    title: 'Lack of Haptics',
    subtitle: 'Literature Review',
    content: [
      '• Virtualization reduces embodiment',
      '• Lack of tactile feedback',
      '• Extension of the uncanny valley effect'
    ],
    citations: ['D’Alonzo, M., et al. (2019)']
  },
  {
    id: 8,
    type: 'image-text',
    title: 'Case Study: Beat Saber',
    content: [
      '• Utilizes Gross Motor Skills (arm sweeping).',
      '• Bypasses need for precision button inputs.',
      '• Stationary player + moving environment reduces motion sickness.',
      '• Audio-visual sync provides instant dopamine.'
    ],
    imageUrl: 'https://picsum.photos/400/302?grayscale'
  },
  {
    id: 9,
    type: 'section',
    title: '02',
    subtitle: 'Narrative Design Problems'
  },
  {
    id: 10,
    type: 'content',
    title: 'Motion Sickness',
    content: [
      'EYES: See you moving.',
      'VESTIBULAR: Says you are stationary.',
      'RESULT: Discomfort & Motion Sickness.'
    ]
  },
  {
    id: 11,
    type: 'image-text',
    title: 'Compromise on Storytelling',
    content: [
      '• Forced Cameras guide players in traditional games.',
      '• In VR, camera control triggers vestibular rejection.',
      '• Designers sacrifice storytelling direction to prevent nausea.'
    ],
    imageUrl: 'https://picsum.photos/400/303?grayscale'
  },
  {
    id: 12,
    type: 'image-text',
    title: 'Teleportation',
    content: [
      '• A "cheating" method.',
      '• Brain interprets as "scene switch" not movement, avoiding conflict.',
      '• BUT: Conflicts with the "Premise of Action" (narrative foundation).'
    ],
    imageUrl: 'https://picsum.photos/400/304?grayscale',
    citations: ['Fullerton (2018)', 'Crawford (1984)']
  },
  {
    id: 13,
    type: 'image-text',
    title: 'Case Study: Moss',
    content: [
      '• Third person VR game with hand interactions.',
      '• Solution: Shift from Immersion-first to Comfort-first.'
    ],
    imageUrl: 'https://picsum.photos/400/305?grayscale'
  },
  {
    id: 14,
    type: 'section',
    title: '03',
    subtitle: 'Engagement Design Problems'
  },
  {
    id: 15,
    type: 'content',
    title: 'Ergonomic Fatigue',
    content: [
      '• "Gorilla Arm Syndrome": Fatigue from extended arm elevation.',
      '• VR is high physical energy consumption.',
      '• Hard to sustain long-form engagement loops (Grind/Loot).'
    ],
    citations: ['Palmeira et al. (2023)', 'Hansberger et al. (2017)']
  },
  {
    id: 16,
    type: 'content',
    title: 'Visual Fatigue',
    subtitle: 'Vergence-Accommodation Conflict',
    content: [
      '• Accommodation: Eye lens focuses on screen (near).',
      '• Vergence: Eyes rotate to look at virtual object (far).',
      '• Mismatch leads to eye strain and headaches.'
    ]
  },
  {
    id: 17,
    type: 'list',
    title: 'Works Cited',
    content: [
      'Abdlkarim, Diar et al. (2024)',
      'D’Alonzo, M., et al. (2019)',
      'Fullerton, Tracy (2018)',
      'Crawford, Chris (1984)',
      'Palmeira, Eduardo GQ, et al. (2023)',
      'Hocking, Clint (2009)'
    ]
  },
  {
    id: 18,
    type: 'end',
    title: 'THANKS!',
    subtitle: 'Do you have any questions?',
    content: ['Press SELECT to Chat with AI']
  }
];
