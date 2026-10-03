import { EventItem, ProjectItem, CommitteeMember, SponsorItem, HackathonSettings, ClubSettings } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Interdisciplinary Ideation & Prototyping Workshop',
    slug: 'interdisciplinary-ideation-workshop-2026',
    short_description: 'Learn how to transform everyday problems into working prototypes using design thinking and low-fidelity materials.',
    full_description: `Join students from all university faculties—including Computing, Business, Engineering, and Design—for an interactive hands-on workshop.\n\nIn this session, participants will form cross-disciplinary groups, identify campus and community challenges, and develop tangible concept prototypes using rapid ideation frameworks.\n\nNo prior technical knowledge or engineering background is required. Bring your curiosity and willingness to collaborate!`,
    event_type: 'Workshop',
    start_date: '2026-10-24',
    start_time: '14:00',
    end_time: '17:00',
    location: 'i-CATS Main Campus, Innovation Lab Room 3.2',
    image_url: '/src/assets/images/interdisciplinary_collab_1790998727769.jpg',
    registration_url: '',
    status: 'upcoming',
    featured: true,
    created_at: '2026-10-01T08:00:00Z',
    updated_at: '2026-10-01T08:00:00Z'
  },
  {
    id: 'evt-2',
    title: 'Student Innovation Sharing Session: From Concept to Pitch',
    slug: 'innovation-sharing-session-pitch',
    short_description: 'An informal session where student innovators share their project journey, lessons learned, and how they balanced studies with creating solutions.',
    full_description: `Curious about how student projects start? Hear candid reflections on forming multi-disciplinary teams, finding project mentors, and navigating trial and error.\n\nThis session includes open Q&A and networking time for students looking to meet potential project teammates.`,
    event_type: 'Sharing Session',
    start_date: '2026-11-07',
    start_time: '15:00',
    end_time: '16:30',
    location: 'Student Activity Hub & Hybrid Online Stream',
    image_url: '/src/assets/images/student_project_demo_1790998739311.jpg',
    registration_url: '',
    status: 'upcoming',
    featured: false,
    created_at: '2026-10-01T08:00:00Z',
    updated_at: '2026-10-01T08:00:00Z'
  },
  {
    id: 'evt-3',
    title: 'i-CATS Innovation Challenge Ideation Sprint (Proposal Stage)',
    slug: 'icats-innovation-ideation-sprint',
    short_description: 'A structured brainstorming and problem-framing sprint designed to prepare prospective teams for upcoming student competitions.',
    full_description: `A collaborative session focusing on sustainability, business viability, and human-centred design principles. Open to all students regardless of programme year.`,
    event_type: 'Innovation Challenge',
    start_date: '2026-11-21',
    start_time: '09:30',
    end_time: '13:00',
    location: 'Multipurpose Hall, i-CATS University',
    image_url: '/src/assets/images/hackathon_ideation_1790998749567.jpg',
    registration_url: '',
    status: 'upcoming',
    featured: true,
    created_at: '2026-10-01T08:00:00Z',
    updated_at: '2026-10-01T08:00:00Z'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'EcoSort: Smart Campus Waste Separation System',
    slug: 'ecosort-smart-campus-waste-separation',
    summary: 'A multi-disciplinary student project exploring sensor-assisted campus recycling bins and user-friendly visual feedback.',
    description: `Developed by a combined team of engineering, business, and multimedia students.\n\nThe project explores how combining simple optical sensors with clear behavioral signage can increase student recycling compliance on campus.\n\nThe business students designed the cost-feasibility model while engineering and design members prototyped the bin enclosure and companion web dashboard.`,
    category: 'Sustainability',
    team_name: 'Project EcoSort Team',
    team_members: [
      'Engineering & Embedded Systems',
      'Business Administration',
      'Interactive Digital Media'
    ],
    image_url: '/src/assets/images/student_project_demo_1790998739311.jpg',
    demo_url: '',
    repository_url: '',
    year: 2026,
    featured: true,
    created_at: '2026-09-15T10:00:00Z'
  },
  {
    id: 'proj-2',
    title: 'CampusPantry: Student-Run Resource Sharing Platform',
    slug: 'campuspantry-resource-sharing-platform',
    summary: 'A business and social innovation concept facilitating peer-to-peer textbook exchanges, project supply sharing, and food surplus reduction.',
    description: `A student-led initiative aiming to reduce student living expenses and encourage sustainable reuse of study materials across faculties.\n\nIncludes a simple inventory tracking system and a structured collection point workflow within the university campus.`,
    category: 'Social Innovation',
    team_name: 'CampusPantry Initiative',
    team_members: [
      'Faculty of Business & Accounting',
      'Diploma in Information Technology',
      'Communication & Media'
    ],
    image_url: '/src/assets/images/interdisciplinary_collab_1790998727769.jpg',
    demo_url: '',
    repository_url: '',
    year: 2026,
    featured: true,
    created_at: '2026-09-20T10:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'HydroSense: Low-Cost Urban Micro-Farming Monitor',
    slug: 'hydrosense-urban-micro-farming-monitor',
    summary: 'An agricultural technology prototype combining water quality telemetry with an accessible mobile dashboard for community gardens.',
    description: `Built to explore low-cost sensor integration for small-scale community hydroponic setups. The project emphasizes affordable components and solar-assisted battery power.`,
    category: 'Technology',
    team_name: 'AgriTech Builders Group',
    team_members: [
      'Electrical & Electronic Engineering',
      'Agro-Technology Studies',
      'Software Engineering'
    ],
    image_url: '/src/assets/images/hero_innovation_hub_1790998710760.jpg',
    demo_url: '',
    repository_url: '',
    year: 2026,
    featured: true,
    created_at: '2026-09-28T10:00:00Z'
  }
];

export const INITIAL_COMMITTEE: CommitteeMember[] = [
  {
    id: 'comm-1',
    name: 'President (Student Lead)',
    role: 'President',
    programme: 'Faculty of Computing & Software Engineering',
    photo_url: '',
    linkedin_url: '',
    display_order: 1,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-2',
    name: 'Vice President (Interdisciplinary Collaboration)',
    role: 'Vice President',
    programme: 'Faculty of Business & Management',
    photo_url: '',
    linkedin_url: '',
    display_order: 2,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-3',
    name: 'Secretary & Documentation Lead',
    role: 'Honorary Secretary',
    programme: 'Communication & Media Studies',
    photo_url: '',
    linkedin_url: '',
    display_order: 3,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-4',
    name: 'Treasurer & Sponsorship Coordinator',
    role: 'Treasurer',
    programme: 'Accounting & Finance',
    photo_url: '',
    linkedin_url: '',
    display_order: 4,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-5',
    name: 'Head of Projects & Prototyping',
    role: 'Director of Projects',
    programme: 'Engineering & Industrial Technology',
    photo_url: '',
    linkedin_url: '',
    display_order: 5,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-6',
    name: 'Head of Creative & Multimedia',
    role: 'Director of Creative Design',
    programme: 'Digital Media & Graphic Design',
    photo_url: '',
    linkedin_url: '',
    display_order: 6,
    created_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'comm-7',
    name: 'Head of Outreach & Member Relations',
    role: 'Director of Community Outreach',
    programme: 'Hospitality & Social Innovation',
    photo_url: '',
    linkedin_url: '',
    display_order: 7,
    created_at: '2026-10-01T00:00:00Z'
  }
];

export const INITIAL_SPONSORS: SponsorItem[] = [];

export const INITIAL_HACKATHON_SETTINGS: HackathonSettings = {
  title: 'i-CATS Inter-Faculty Hackathon & Innovation Challenge',
  tagline: 'Bridging ideas across faculties to create real-world solutions',
  theme: 'Cross-Disciplinary Problem Solving for Sustainable Campus & Community Impact',
  status: 'proposal',
  status_label: 'Proposed Initiative (Planning & Proposal Stage)',
  about_description: `The i-CATS Inter-Faculty Hackathon is a proposed university-wide innovation sprint designed to bring together students from every discipline—not just technology or engineering, but also business, creative media, education, and sciences.\n\nTeams will work over a designated weekend to frame real community problems, develop tangible prototypes, and present business and impact viability to a panel of academic and industry mentors.`,
  proposed_timeline: [
    {
      phase: 'Phase 1: Club Planning & University Approval',
      date_or_status: 'Under Review',
      description: 'Formalizing challenge problem statements, event guidelines, and faculty mentorship coordination.'
    },
    {
      phase: 'Phase 2: Open Registration & Team Mixer',
      date_or_status: 'To be announced',
      description: 'Multi-faculty team matching sessions and pre-hackathon ideation workshops.'
    },
    {
      phase: 'Phase 3: Hackathon Sprint Weekend',
      date_or_status: 'Proposed Academic Semester',
      description: '48-hour prototype building sprint with designated mentor check-ins.'
    },
    {
      phase: 'Phase 4: Pitch Showcase & Demo Day',
      date_or_status: 'Event Finale',
      description: 'Live demonstration of prototypes, business models, and judging evaluation.'
    }
  ],
  eligibility_rules: [
    'Open to all enrolled students at i-CATS University from any diploma, degree, or foundation programme.',
    'No previous hackathon experience or coding skills required.',
    'Cross-faculty collaboration is strongly encouraged (e.g. pairing technical and non-technical students).'
  ],
  team_guidelines: [
    'Teams of 3 to 5 students.',
    'Individual participants can join pre-event team matching sessions.',
    'Each team must propose an original concept developed during the event timeframe.'
  ],
  challenges: [
    {
      title: 'Smart Campus & Student Well-being',
      category: 'Education & Community',
      description: 'Innovations improving campus living, peer support, study resources, and university operations.'
    },
    {
      title: 'Sustainable Resources & Circular Economy',
      category: 'Sustainability',
      description: 'Practical solutions addressing waste reduction, energy efficiency, or community recycling.'
    },
    {
      title: 'Small Business & Community Enablement',
      category: 'Business & Entrepreneurship',
      description: 'Creative tools, digital experiences, or service concepts supporting local enterprises.'
    }
  ],
  prizes_note: 'Prize structure and recognition categories are subject to confirmation upon official university approval and sponsorship partnerships. Details coming soon.',
  prizes_list: [],
  judges_note: 'Judges panel and academic mentors will be announced following official event scheduling.',
  sponsors_note: 'We welcome inquiries from industry partners, alumni, and educational organizations interested in supporting student innovation.',
  registration_url: '',
  faq_list: [
    {
      question: 'Do I need to know how to code to participate?',
      answer: 'No! The hackathon values interdisciplinary collaboration. Great teams need researchers, presenters, designers, business thinkers, and problem solvers alongside technical builders.'
    },
    {
      question: 'What if I do not have a team yet?',
      answer: 'We will host a pre-hackathon team mixer and provide an online matching group to help you connect with students from other programmes.'
    },
    {
      question: 'Is the event date confirmed?',
      answer: 'The hackathon is currently in the formal planning and proposal stage. Exact dates will be announced once the university academic calendar schedule is finalized.'
    }
  ]
};

export const INITIAL_CLUB_SETTINGS: ClubSettings = {
  club_name: 'i-CATS Invention & Innovation Club',
  tagline: 'Create. Collaborate. Innovate.',
  university_name: 'i-CATS University',
  contact_email: 'innovation.club@icats.edu.my',
  whatsapp_group_url: '',
  membership_form_url: '',
  instagram_url: '',
  linkedin_url: '',
  campus_location: 'Student Innovation Studio, Level 3, i-CATS University Campus'
};
