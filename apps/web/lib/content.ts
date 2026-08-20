export type LinkItem = { label: string; href: string };
export type Service = {
  slug: string;
  name: string;
  pillar: string;
  summary: string;
  bullets: string[];
};
export type Sector = { slug: string; name: string; summary: string; priorities: string[] };
export type Product = {
  slug: string;
  name: string;
  status?: string;
  category: string;
  summary: string;
  merits: string[];
  audience: string;
  screenshotUrls?: string[];
};
export type TeamMember = { name: string; role: string; initials: string; contribution: string; relevance: string; portraitUrl?: string };
export type Partner = { name: string; region: string; type: string; description: string; logoUrl?: string };
export type Resource = { slug: string; title: string; category: string; format: string; summary: string; content_body?: string; meta_title?: string; meta_description?: string; publish_date?: string; featured?: boolean; sectorNames?: string[]; coverUrl?: string };

export const nav: LinkItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Platforms', href: '/platforms-products' },
  { label: 'Why BRAINTEK', href: '/about#why-braintek' },
  { label: 'Expert Team', href: '/expert-team' },
  { label: 'Partners', href: '/partners' },
  { label: 'Resources & Insights', href: '/insights-resources' },
  { label: 'Contact', href: '/contact' }
];

export const pillars = [
  {
    eyebrow: '01 / Protect',
    title: 'Cybersecurity & Digital Protection',
    text: 'Strengthen institutional resilience across cloud, network, identity, monitoring, vulnerability management and secure operational environments.'
  },
  {
    eyebrow: '02 / Build',
    title: 'Software Solutions & Systems Development',
    text: 'Create customized systems, workflow automation, AI-enabled applications, dashboards and connected platforms designed around actual institutional work.'
  },
  {
    eyebrow: '03 / Empower',
    title: 'Manpower Development & Workforce Empowerment',
    text: 'Advance leadership readiness, psychometric-informed development, AI fluency and role-relevant capability through evidence-informed development pathways.'
  }
];

export const services: Service[] = [
  {
    slug: 'cybersecurity-monitoring-compliance-readiness',
    name: 'Cybersecurity Monitoring & Compliance Readiness',
    pillar: 'Cybersecurity & Digital Protection',
    summary: 'Improve visibility into digital risk, monitoring practices and control maturity so institutional security oversight becomes more disciplined and actionable.',
    bullets: ['Security posture visibility', 'Monitoring discipline', 'Governance and compliance readiness']
  },
  {
    slug: 'penetration-testing-vulnerability-assessment',
    name: 'Penetration Testing & Vulnerability Assessment',
    pillar: 'Cybersecurity & Digital Protection',
    summary: 'Identify technical weaknesses before they become operational liabilities and establish clearer remediation priorities.',
    bullets: ['Attack-surface review', 'Vulnerability identification', 'Prioritized remediation']
  },
  {
    slug: 'customized-system-platform-development',
    name: 'Customized System & Platform Development',
    pillar: 'Software Solutions & Systems Development',
    summary: 'Design tailored digital systems around real operational requirements rather than forcing institutions into generic software structures.',
    bullets: ['Institution-specific architecture', 'Scalable applications', 'Long-term functional fit']
  },
  {
    slug: 'workflow-automation-process-optimization',
    name: 'Workflow Automation & Process Optimization',
    pillar: 'Software Solutions & Systems Development',
    summary: 'Reduce repetitive manual effort, improve coordination and strengthen process consistency through workflow redesign and intelligent automation.',
    bullets: ['Process mapping', 'Automation logic', 'Operational visibility']
  },
  {
    slug: 'ai-integration-intelligent-assistants',
    name: 'AI Integration & Intelligent Assistants',
    pillar: 'Software Solutions & Systems Development',
    summary: 'Embed AI into actual work environments through intelligent assistants, task-support tools and practical workflow integrations.',
    bullets: ['Applied AI workflows', 'Intelligent assistance', 'Responsible operational integration']
  },
  {
    slug: 'psychometric-assessment-capability-diagnosis',
    name: 'Psychometric Assessment & Capability Diagnosis',
    pillar: 'Manpower Development & Workforce Empowerment',
    summary: 'Use structured diagnostic insight to guide workforce development, role fit, capability planning and targeted interventions.',
    bullets: ['Capability diagnosis', 'Development priorities', 'Evidence-informed workforce planning']
  },
  {
    slug: 'ai-leadership-excellence',
    name: 'AI Leadership Excellence Assessment & Training',
    pillar: 'Manpower Development & Workforce Empowerment',
    summary: 'Assess and strengthen leadership readiness for responsible, strategic and productive work in AI-enabled environments.',
    bullets: ['Leadership AI readiness', 'Decision quality', 'Responsible implementation capability']
  },
  {
    slug: 'training-capability-development',
    name: 'Training & Capability Development Programmes',
    pillar: 'Manpower Development & Workforce Empowerment',
    summary: 'Build role-relevant development pathways tied to practical application, capability growth and institutional performance.',
    bullets: ['Targeted learning pathways', 'Professional capability growth', 'Performance-oriented development']
  },
  {
    slug: 'teacher-enablement-ai-teaching-learning',
    name: 'Teacher Enablement & AI in Teaching & Learning',
    pillar: 'Manpower Development & Workforce Empowerment',
    summary: 'Support educators and academic leaders in using AI responsibly and effectively within real teaching, learning and institutional contexts.',
    bullets: ['Faculty enablement', 'Responsible AI use', 'Education workflow adoption']
  },
  {
    slug: 'ai-consultancy-governance-advisory',
    name: 'AI Consultancy & Governance Advisory',
    pillar: 'Software Solutions & Systems Development',
    summary: 'Help institutions frame practical AI adoption, governance and implementation priorities around their actual operating environment.',
    bullets: ['AI adoption roadmaps', 'Governance framing', 'Implementation prioritization']
  }
];

export const sectors: Sector[] = [
  {
    slug: 'government-public-institutions',
    name: 'Government & Public Institutions',
    summary: 'Secure, policy-aware modernization with stronger workflows, responsible implementation and workforce capability.',
    priorities: ['Cybersecurity and digital protection', 'Workflow automation', 'Custom institutional systems', 'Leadership and staff capability', 'Responsible AI governance']
  },
  {
    slug: 'education-academic-institutions',
    name: 'Education & Academic Institutions',
    summary: 'Smarter academic operations, scheduling, student services, AI-enabled support and capability development.',
    priorities: ['Student and academic workflows', 'Scheduling and operations', 'Faculty and leadership development', 'Psychometric-informed diagnostics', 'Digital protection']
  },
  {
    slug: 'corporate-enterprise',
    name: 'Corporate & Enterprise Organizations',
    summary: 'Cybersecure environments, custom systems, process automation, AI-enabled productivity and leadership readiness.',
    priorities: ['Cloud, network and identity security', 'Process automation', 'Custom systems and assistants', 'Leadership development', 'AI enablement']
  },
  {
    slug: 'human-capital-hr-talent',
    name: 'Human Capital / HR / Talent Development',
    summary: 'Assessment-informed capability mapping, leadership development and evidence-based workforce planning.',
    priorities: ['Psychometric assessment', 'Leadership readiness', 'Capability planning', 'Training pathways', 'AI enablement for HR and L&D']
  },
  {
    slug: 'training-consulting-professional-development',
    name: 'Training / Consulting / Professional Development',
    summary: 'Assessment-informed learning design, AI enablement and stronger evidence of training value and impact.',
    priorities: ['Learning design', 'AI-enabled delivery', 'Human capital models', 'Impact evaluation', 'Platform-linked development']
  },
  {
    slug: 'institutional-service-operations',
    name: 'Institutional & Service Operations',
    summary: 'Secure workflows, service coordination, automation and dependable execution across service-driven environments.',
    priorities: ['Operational workflow improvement', 'Automation and integration', 'Staff effectiveness', 'Digital continuity', 'Sustainable service improvement']
  }
];

export const products: Product[] = [
  {
    slug: 'psytest',
    name: 'PSYTEST',
    category: 'Assessment & Human Capability',
    summary: 'Psychometric-informed assessment platform for structured human analysis, capability diagnosis, talent visibility and development planning.',
    merits: ['Structured psychometric intelligence', 'Evidence-informed development planning', 'Role and capability visibility', 'Can support broader transformation workflows'],
    audience: 'Government, enterprise, HR, education and leadership-development environments.'
  },
  {
    slug: 'ailex',
    name: 'AILEX',
    category: 'Leadership & AI Readiness',
    summary: 'AI Leadership Excellence Assessment platform focused on executive readiness, decision quality, policy awareness, AI risk understanding and responsible implementation.',
    merits: ['Leadership-level AI readiness', 'Executive development insight', 'Governance-oriented capability building', 'Structured readiness mapping'],
    audience: 'Senior management, executive teams, public-sector leaders and institutions building AI-aware leadership cultures.'
  },
  {
    slug: 'scheduler',
    name: 'Scheduler',
    category: 'Academic Operations',
    summary: 'Higher-education scheduling platform for timetables, examination planning, session coordination and resource alignment.',
    merits: ['Reduced scheduling conflicts', 'Improved visibility', 'Stronger academic planning discipline', 'Operational coordination'],
    audience: 'Universities, colleges, academies and structured training environments.'
  },
  {
    slug: 'skoolee',
    name: 'Skoolee',
    category: 'Student Institutional Services',
    summary: 'Student Institutional Services platform connecting requests, approvals, records, communication and service visibility into one operational environment.',
    merits: ['Organized student workflows', 'Improved responsiveness', 'Connected service processes', 'Stronger institutional visibility'],
    audience: 'Schools, colleges, universities and student-service departments.'
  },
  {
    slug: 'opspilot',
    name: 'OpsPilot',
    status: 'Strategic platform direction',
    category: 'Workflow Automation',
    summary: 'Configurable and scalable workflow automation platform direction for routing, approvals, process control, task flow, dashboards and operational visibility.',
    merits: ['Configurable workflow architecture', 'Cross-sector process orchestration', 'Audit and routing capability', 'Scalable operational model'],
    audience: 'Government, education, HR, enterprise, training and service-driven institutions.'
  },
  {
    slug: 'sentinelshield',
    name: 'SentinelShield',
    status: 'Proposed solution concept',
    category: 'Cybersecurity & Digital Protection',
    summary: 'Proposed cybersecurity governance and monitoring concept for security posture visibility, compliance support, risk detection and institutional readiness.',
    merits: ['Executive-readable cyber visibility', 'Readiness and posture framing', 'Potential modular rollout', 'Operational governance orientation'],
    audience: 'Public entities, enterprises and regulated institutional environments.'
  }
];

export const team: TeamMember[] = [
  { name: 'Prof. Fawzi Alghazali', role: 'CEO and Founder', initials: 'FG', contribution: 'Human Capital Enablement, Psychometric-Informed Training, and Agentic AI Integration', relevance: 'Strategic leadership, workforce capability, psychometric-informed development, AI integration and institutional transformation.' },
  { name: 'Eng. Ahmed Ali Anwar', role: 'Software Engineer & AI Trainer', initials: 'AA', contribution: 'AI-Enabled Systems, Product Development, and Technical Training', relevance: 'Software solutions, AI-enabled systems, product delivery, technical training and operational enablement.' },
  { name: 'MOIZ HASSAN', role: 'Full-stack and Cybersecurity Expert', initials: 'MH', contribution: 'Full-Stack Platforms, Security Hardening, and Secure Deployment', relevance: 'Cybersecurity, secure platform delivery, software engineering and risk-aware implementation.' },
  { name: 'Cetin Erdem', role: 'Software Engineer and Data Analyst Expert', initials: 'CE', contribution: 'Software Engineering, Data Analysis, and Decision Support', relevance: 'Analytics, dashboards, data-informed systems and decision-support environments.' },
  { name: 'Nisreen Khambaty', role: 'Cyber Security and Penetration Testing Expert', initials: 'NK', contribution: 'Threat Exposure Analysis, Penetration Testing, and Security Assurance', relevance: 'Penetration testing, cybersecurity assurance, technical risk review and digital protection.' },
  { name: 'Princess Clark Tabar', role: 'Application Security and Software Engineer', initials: 'PT', contribution: 'Secure Software Development and Application Protection', relevance: 'Application security, secure coding, software engineering and product reliability.' },
  { name: 'LAUD ZION C. CASCALLA', role: 'API Optimization, Automation, and Cloud Security Expert', initials: 'LC', contribution: 'APIs, Process Automation, and Cloud Security', relevance: 'API optimization, connected systems, automation logic and secure cloud-oriented environments.' },
  { name: 'Akmal Xudayberdiyev', role: 'Full-stack Engineer & Web Traffic Security Expert', initials: 'AX', contribution: 'Full-Stack Engineering and Web Traffic Security', relevance: 'Secure full-stack delivery, application traffic protection and resilient web environments.' },
  { name: 'Maduranga Senadheera', role: 'Full-stack Engineer & Data Encryption and Protection Expert', initials: 'MS', contribution: 'Full-Stack Engineering, Encryption, and Data Protection', relevance: 'Secure application development, data protection and encryption-oriented implementation.' },
  { name: 'DILSHAN MUNASINGHE', role: 'Full-stack Engineer & Database Protection Expert', initials: 'DM', contribution: 'Full-Stack Engineering and Database Protection', relevance: 'Application engineering, database security and protected data environments.' }
];

export const partners: Partner[] = [
  { name: 'ADNOC', region: 'UAE', type: 'Strategic institutional and sector-aligned collaboration', description: 'Potential areas include AI-enabled workforce capability, governance awareness, executive and technical training, workflow automation advisory and specialized digital-protection initiatives.' },
  { name: 'White Mountain Technologies', region: 'Lebanon', type: 'Technology collaboration and solution complementarity', description: 'Potential collaboration in educational platforms, SIS and scheduling environments, custom systems, implementation support and regional solution expansion.' },
  { name: 'MBZUAI', region: 'UAE', type: 'Academic, AI, and research-oriented collaboration', description: 'Possible collaboration in AI capability development, executive and workforce AI fluency, research-informed training, applied AI enablement and responsible adoption.' },
  { name: 'Abu Dhabi University', region: 'UAE', type: 'Academic and institutional capability partnership', description: 'Potential collaboration across psychometric-informed development, AI in education, staff and leadership training, scheduling and student-services systems.' },
  { name: 'Liwa University', region: 'UAE', type: 'Education-sector operational and capability partnership', description: 'Potential collaboration in student institutional services, scheduling, workforce and faculty development, AI-enabled academic operations and training.' },
  { name: 'TRENDS Research & Advisory', region: 'UAE', type: 'Research, advisory, and knowledge collaboration', description: 'Possible collaboration in policy and advisory support, AI and future-of-work dialogue, knowledge systems, executive learning and capability-development initiatives.' }
];

export const resources: Resource[] = [
  { slug: 'ai-integration-consistency', title: 'How AI Integration Improves Consistency in Work Environments', category: 'AI Strategy & Transformation', format: 'Article', summary: 'How institutions can move from fragmented digital activity to integrated, reliable and workflow-embedded AI use.' },
  { slug: 'psychometric-informed-training', title: 'Why Psychometric-Informed Training Creates Better Workforce Outcomes', category: 'Workforce Capability', format: 'Article', summary: 'Why capability development becomes more precise when informed by diagnostic insight rather than generic assumptions.' },
  { slug: 'sustainable-productivity-automation', title: 'Building Sustainable Productivity Through Intelligent Automation', category: 'Workflow Automation', format: 'Article', summary: 'How automation can improve speed, quality and coordination without weakening institutional discipline.' },
  { slug: 'human-capability-digital-transformation', title: 'Connecting Human Capability and Digital Transformation', category: 'Institutional Excellence', format: 'Article', summary: 'Why systems and people must be developed together rather than treated as separate transformation agendas.' },
  { slug: 'responsible-ai-implementation', title: 'Responsible and Practical AI Implementation for Organizations', category: 'Responsible AI', format: 'Article', summary: 'Guidance on responsible adoption, governance clarity and alignment with operational priorities.' },
  { slug: 'training-for-performance', title: 'Training for Performance, Not for Formality', category: 'Learning & Development', format: 'Article', summary: 'How professional development can be redesigned around measurable workplace improvement rather than attendance alone.' },
  { slug: 'ai-readiness-checklist', title: 'AI Readiness Checklist for Institutions', category: 'AI Strategy & Transformation', format: 'Checklist', summary: 'A practical diagnostic resource for evaluating systems, workflows, people and priorities before structured AI adoption.' },
  { slug: 'workflow-opportunity-map', title: 'Workflow Automation Opportunity Map', category: 'Workflow Automation', format: 'Guide', summary: 'A practical guide for identifying repetitive effort, delays, inconsistency and fragmented processes that may benefit from automation.' }
];

export const processSteps = ['Diagnose', 'Secure', 'Design', 'Implement', 'Enable', 'Evaluate'];

export const whyPoints = [
  ['Integrated model', 'Protection, systems development and capability growth are designed as one institutional framework.'],
  ['Operational trust', 'Cybersecurity is positioned as a foundation for continuity, resilience and dependable digital operations.'],
  ['Workflow-led systems', 'Technology is designed around actual institutional processes rather than isolated coding exercises.'],
  ['Evidence-informed capability', 'Psychometric insight and role relevance shape development priorities and workforce interventions.'],
  ['Implementation discipline', 'BRAINTEK connects diagnosis, design, implementation, enablement and review.'],
  ['Sector-sensitive customization', 'Interventions adapt to institutional context, maturity and sector realities.'],
  ['Long-term value', 'Integrated services support enhancement, support and capability growth beyond one-off interventions.'],
  ['Measurable relevance', 'The model connects directly to stronger protection, better workflows, leadership readiness and workforce capability.']
] as const;
