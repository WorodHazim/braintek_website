
const PAGES = [
  ['Home','home','home','Applied AI, Cybersecurity, and Strategic Capability Development for Institutions Ready to Move Forward','BRAINTEK helps government entities, educational institutions, enterprises, and service-driven organizations strengthen digital protection, automate workflows, build practical AI solutions, and advance workforce capability through psychometric-informed development and responsible implementation.'],
  ['About','about','about','Where AI Powers Work, Innovation, and Growth.','BRAINTEK helps institutions protect, modernize, and strengthen the way they operate through cybersecurity and digital protection, software solutions and systems development, and manpower development and workforce empowerment.'],
  ['Services','services','services','Services Designed to Protect, Transform, and Empower Organizations','BRAINTEK provides cybersecurity and digital protection, customized software solutions and systems development, and psychometric-informed manpower development programs that help organizations strengthen security, improve operations, and build future-ready capability.'],
  ['Sectors','sectors','sectors','Sector-Specific Solutions for Smarter, Safer, and More Capable Institutions','BRAINTEK adapts cybersecurity, software solutions, AI-enabled operations and workforce empowerment to the operational, human and strategic realities of each environment.'],
  ['Platforms & Products','platforms-products','products','Structured Platforms for Security, Capability, and Institutional Performance','BRAINTEK platforms translate strategy into recognizable solution assets for assessment intelligence, leadership readiness, academic operations, student services, workflow automation and cybersecurity visibility.'],
  ['Why BRAINTEK','why-braintek','why_braintek','Why leading institutions choose BRAINTEK','We do not treat transformation as a software purchase, a security control, or a training event in isolation. BRAINTEK aligns digital protection, intelligent systems, workflows and workforce capability so improvement is practical, measurable and sustainable.'],
  ['Expert Team','expert-team','team','One institutional challenge. Multiple disciplines working together.','BRAINTEK delivery capability is backed by specialists across strategy, human capital, AI integration, software engineering, analytics and cybersecurity.'],
  ['Partners','partners','partners','Institutional relationships built around complementary capability and shared relevance.','BRAINTEK works within a broader ecosystem of institutional, academic, technology and research relationships.'],
  ['Insights & Resources','insights-resources','insights','Insights That Clarify Transformation. Resources That Strengthen Implementation.','Expert perspectives, actionable guidance and institutionally relevant resources on AI, automation, workforce capability, responsible implementation and sustainable performance.'],
  ['Contact','contact','contact','Book a Consultation with BRAINTEK','Connect with BRAINTEK to discuss cybersecurity, intelligent systems, AI integration, workflow automation and psychometric-informed capability development designed around real institutional needs.']
];

const SERVICES = [
  ['Cybersecurity Monitoring & Compliance Readiness','cybersecurity-monitoring-compliance-readiness','Cybersecurity & Digital Protection','Improve visibility into digital risk, monitoring practices and control maturity so institutional security oversight becomes more disciplined and actionable.'],
  ['Penetration Testing & Vulnerability Assessment','penetration-testing-vulnerability-assessment','Cybersecurity & Digital Protection','Identify technical weaknesses before they become operational liabilities and establish clearer remediation priorities.'],
  ['Customized System & Platform Development','customized-system-platform-development','Software Solutions & Systems Development','Design tailored digital systems around real operational requirements rather than forcing institutions into generic software structures.'],
  ['Workflow Automation & Process Optimization','workflow-automation-process-optimization','Software Solutions & Systems Development','Reduce repetitive manual effort, improve coordination and strengthen process consistency through workflow redesign and intelligent automation.'],
  ['AI Integration & Intelligent Assistants','ai-integration-intelligent-assistants','Software Solutions & Systems Development','Embed AI into actual work environments through intelligent assistants, task-support tools and practical workflow integrations.'],
  ['Psychometric Assessment & Capability Diagnosis','psychometric-assessment-capability-diagnosis','Manpower Development & Workforce Empowerment','Use structured diagnostic insight to guide workforce development, role fit, capability planning and targeted interventions.'],
  ['AI Leadership Excellence Assessment & Training','ai-leadership-excellence','Manpower Development & Workforce Empowerment','Assess and strengthen leadership readiness for responsible, strategic and productive work in AI-enabled environments.'],
  ['Training & Capability Development Programmes','training-capability-development','Manpower Development & Workforce Empowerment','Build role-relevant development pathways tied to practical application, capability growth and institutional performance.'],
  ['Teacher Enablement & AI in Teaching & Learning','teacher-enablement-ai-teaching-learning','Manpower Development & Workforce Empowerment','Support educators and academic leaders in using AI responsibly and effectively within teaching, learning and institutional contexts.'],
  ['AI Consultancy & Governance Advisory','ai-consultancy-governance-advisory','Software Solutions & Systems Development','Help institutions frame practical AI adoption, governance and implementation priorities around their actual operating environment.']
];
const SECTORS = [
  ['Government & Public Institutions','government-public-institutions','Secure, policy-aware modernization with stronger workflows, responsible implementation and workforce capability.'],
  ['Education & Academic Institutions','education-academic-institutions','Smarter academic operations, scheduling, student services, AI-enabled support and capability development.'],
  ['Corporate & Enterprise Organizations','corporate-enterprise','Cybersecure environments, custom systems, process automation, AI-enabled productivity and leadership readiness.'],
  ['Human Capital / HR / Talent Development','human-capital-hr-talent','Assessment-informed capability mapping, leadership development and evidence-based workforce planning.'],
  ['Training / Consulting / Professional Development','training-consulting-professional-development','Assessment-informed learning design, AI enablement and stronger evidence of training value and impact.'],
  ['Institutional & Service Operations','institutional-service-operations','Secure workflows, service coordination, automation and dependable execution across service-driven environments.']
];
const PRODUCTS = [
  ['PSYTEST','psytest','Assessment & Human Capability','', 'Psychometric-informed assessment platform for structured human analysis, capability diagnosis, talent visibility and development planning.'],
  ['AILEX','ailex','Leadership & AI Readiness','', 'AI Leadership Excellence Assessment platform focused on executive readiness, decision quality, policy awareness and responsible implementation.'],
  ['Scheduler','scheduler','Academic Operations','', 'Higher-education scheduling platform for timetables, examination planning, session coordination and resource alignment.'],
  ['Skoolee','skoolee','Student Institutional Services','', 'Student Institutional Services platform connecting requests, approvals, records, communication and service visibility.'],
  ['OpsPilot','opspilot','Workflow Automation','Strategic platform direction','Configurable and scalable workflow automation platform direction for routing, approvals, process control, task flow and operational visibility.'],
  ['SentinelShield','sentinelshield','Cybersecurity & Digital Protection','Proposed solution concept','Proposed cybersecurity governance and monitoring concept for security posture visibility, compliance support, risk detection and institutional readiness.']
];
const TEAM = [
  ['Prof. Fawzi Alghazali','CEO and Founder','FG','Human Capital Enablement, Psychometric-Informed Training, and Agentic AI Integration'],
  ['Eng. Ahmed Ali Anwar','Software Engineer & AI Trainer','AA','AI-Enabled Systems, Product Development, and Technical Training'],
  ['MOIZ HASSAN','Full-stack and Cybersecurity Expert','MH','Full-Stack Platforms, Security Hardening, and Secure Deployment'],
  ['Cetin Erdem','Software Engineer and Data Analyst Expert','CE','Software Engineering, Data Analysis, and Decision Support'],
  ['Nisreen Khambaty','Cyber Security and Penetration Testing Expert','NK','Threat Exposure Analysis, Penetration Testing, and Security Assurance'],
  ['Princess Clark Tabar','Application Security and Software Engineer','PT','Secure Software Development and Application Protection'],
  ['LAUD ZION C. CASCALLA','API Optimization, Automation, and Cloud Security Expert','LC','APIs, Process Automation, and Cloud Security'],
  ['Akmal Xudayberdiyev','Full-stack Engineer & Web Traffic Security Expert','AX','Full-Stack Engineering and Web Traffic Security'],
  ['Maduranga Senadheera','Full-stack Engineer & Data Encryption and Protection Expert','MS','Full-Stack Engineering, Encryption, and Data Protection'],
  ['DILSHAN MUNASINGHE','Full-stack Engineer & Database Protection Expert','DM','Full-Stack Engineering and Database Protection']
];
const SERVICE_BULLETS: Record<string,string[]> = {
  'cybersecurity-monitoring-compliance-readiness':['Security posture visibility','Monitoring discipline','Governance and compliance readiness'],
  'penetration-testing-vulnerability-assessment':['Attack-surface review','Vulnerability identification','Prioritized remediation'],
  'customized-system-platform-development':['Institution-specific architecture','Scalable applications','Long-term functional fit'],
  'workflow-automation-process-optimization':['Process mapping','Automation logic','Operational visibility'],
  'ai-integration-intelligent-assistants':['Applied AI workflows','Intelligent assistance','Responsible operational integration'],
  'psychometric-assessment-capability-diagnosis':['Capability diagnosis','Development priorities','Evidence-informed workforce planning'],
  'ai-leadership-excellence':['Leadership AI readiness','Decision quality','Responsible implementation capability'],
  'training-capability-development':['Targeted learning pathways','Professional capability growth','Performance-oriented development'],
  'teacher-enablement-ai-teaching-learning':['Faculty enablement','Responsible AI use','Education workflow adoption'],
  'ai-consultancy-governance-advisory':['AI adoption roadmaps','Governance framing','Implementation prioritization']
};
const SECTOR_PRIORITIES: Record<string,string[]> = {
  'government-public-institutions':['Cybersecurity and digital protection','Workflow automation','Custom institutional systems','Leadership and staff capability','Responsible AI governance'],
  'education-academic-institutions':['Student and academic workflows','Scheduling and operations','Faculty and leadership development','Psychometric-informed diagnostics','Digital protection'],
  'corporate-enterprise':['Cloud, network and identity security','Process automation','Custom systems and assistants','Leadership development','AI enablement'],
  'human-capital-hr-talent':['Psychometric assessment','Leadership readiness','Capability planning','Training pathways','AI enablement for HR and L&D'],
  'training-consulting-professional-development':['Learning design','AI-enabled delivery','Human capital models','Impact evaluation','Platform-linked development'],
  'institutional-service-operations':['Operational workflow improvement','Automation and integration','Staff effectiveness','Digital continuity','Sustainable service improvement']
};
const PRODUCT_DETAILS: Record<string,{merits:string[];audience:string}> = {
  psytest:{merits:['Structured psychometric intelligence','Evidence-informed development planning','Role and capability visibility','Can support broader transformation workflows'],audience:'Government, enterprise, HR, education and leadership-development environments.'},
  ailex:{merits:['Leadership-level AI readiness','Executive development insight','Governance-oriented capability building','Structured readiness mapping'],audience:'Senior management, executive teams, public-sector leaders and institutions building AI-aware leadership cultures.'},
  scheduler:{merits:['Reduced scheduling conflicts','Improved visibility','Stronger academic planning discipline','Operational coordination'],audience:'Universities, colleges, academies and structured training environments.'},
  skoolee:{merits:['Organized student workflows','Improved responsiveness','Connected service processes','Stronger institutional visibility'],audience:'Schools, colleges, universities and student-service departments.'},
  opspilot:{merits:['Configurable workflow architecture','Cross-sector process orchestration','Audit and routing capability','Scalable operational model'],audience:'Government, education, HR, enterprise, training and service-driven institutions.'},
  sentinelshield:{merits:['Executive-readable cyber visibility','Readiness and posture framing','Potential modular rollout','Operational governance orientation'],audience:'Public entities, enterprises and regulated institutional environments.'}
};

const PARTNERS = [
  ['ADNOC','UAE','Strategic institutional and sector-aligned collaboration','Potential areas include AI-enabled workforce capability development, AI governance awareness, executive and technical training pathways, workflow automation advisory, and specialized digital-protection or operational enablement initiatives relevant to energy and industrial environments.'],
  ['White Mountain Technologies','Lebanon','Technology collaboration and solution complementarity','Potential collaboration in educational platforms, SIS and scheduling environments, custom systems design, implementation support, product enhancement, and regional solution expansion where complementary strengths create added value.'],
  ['MBZUAI','UAE','Academic, AI, and research-oriented collaboration','Possible collaboration in AI capability development, executive and workforce AI fluency, research-informed training pathways, applied AI enablement, and institutional engagement around responsible AI adoption and innovation culture.'],
  ['Abu Dhabi University','UAE','Academic and institutional capability partnership','Potential collaboration across psychometric-informed development, AI-in-education enablement, staff and leadership training, scheduling and student-services systems, and broader institutional modernization initiatives.'],
  ['Liwa University','UAE','Education-sector operational and capability partnership','Potential collaboration in student institutional services, scheduling, workforce and faculty development, AI-enabled academic operations, and training programs aligned with employability, capability, and institutional responsiveness.'],
  ['TRENDS Research & Advisory','UAE','Research, advisory, and knowledge collaboration','Possible collaboration in policy and advisory writing support, AI and future-of-work dialogue, research productivity tools, knowledge systems, executive learning, and jointly aligned analytical or capability-development initiatives.']
];

const RESOURCES = [
  ['How AI Integration Improves Consistency in Work Environments','ai-integration-consistency','AI Strategy & Transformation','Article','How institutions can move from fragmented digital activity to integrated, reliable and workflow-embedded AI use.'],
  ['Why Psychometric-Informed Training Creates Better Workforce Outcomes','psychometric-informed-training','Workforce Capability','Article','Why capability development becomes more precise when informed by diagnostic insight rather than generic assumptions.'],
  ['Building Sustainable Productivity Through Intelligent Automation','sustainable-productivity-automation','Workflow Automation','Article','How automation can improve speed, quality and coordination without weakening institutional discipline.'],
  ['Connecting Human Capability and Digital Transformation','human-capability-digital-transformation','Institutional Excellence','Article','Why systems and people must be developed together rather than treated as separate transformation agendas.'],
  ['Responsible and Practical AI Implementation for Organizations','responsible-ai-implementation','Responsible AI','Article','Guidance on responsible adoption, governance clarity and alignment with operational priorities.'],
  ['Training for Performance, Not for Formality','training-for-performance','Learning & Development','Article','How professional development can be redesigned around measurable workplace improvement rather than attendance alone.'],
  ['AI Readiness Checklist for Institutions','ai-readiness-checklist','AI Strategy & Transformation','Checklist','A practical diagnostic resource for evaluating systems, workflows, people and priorities before structured AI adoption.'],
  ['Workflow Automation Opportunity Map','workflow-opportunity-map','Workflow Automation','Guide','A practical guide for identifying repetitive effort, delays, inconsistency and fragmented processes that may benefit from automation.']
];

async function seedCollection(strapi: any, uid: string, rows: any[]) {
  const count = await strapi.documents(uid).count();
  if (count > 0) return;
  for (const data of rows) await strapi.documents(uid).create({ data, status: 'published' });
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: any }) {
    if (process.env.SEED_DEMO_CONTENT !== 'true') return;
    await seedCollection(strapi,'api::page.page',PAGES.map(([title,slug,page_type,hero_title,hero_subtitle])=>({title,slug,page_type,hero_title,hero_subtitle,workflow_status:'published'})));
    await seedCollection(strapi,'api::service.service',SERVICES.map(([name,slug,pillar,summary])=>({name,slug,pillar,summary,bullets:SERVICE_BULLETS[String(slug)]||[],workflow_status:'published'})));
    await seedCollection(strapi,'api::sector.sector',SECTORS.map(([name,slug,summary])=>({name,slug,summary,priorities:SECTOR_PRIORITIES[String(slug)]||[],workflow_status:'published'})));
    await seedCollection(strapi,'api::product.product',PRODUCTS.map(([name,slug,category,maturity_status,summary])=>({name,slug,category,maturity_status,summary,merits:PRODUCT_DETAILS[String(slug)]?.merits||[],audience:PRODUCT_DETAILS[String(slug)]?.audience||'',workflow_status:'published'})));
    await seedCollection(strapi,'api::team-member.team-member',TEAM.map(([name,role,initials,contribution],i)=>({name,role,initials,contribution,relevance:contribution,sort_order:i+1,workflow_status:'published'})));
    await seedCollection(strapi,'api::partner.partner',PARTNERS.map(([name,region,partnership_type,description])=>({name,region,partnership_type,description,approval_confirmed:false,workflow_status:'published'})));
    await seedCollection(strapi,'api::resource.resource',RESOURCES.map(([title,slug,category,format,summary],i)=>({title,slug,category,format,summary,content_body:`${summary}\n\nBRAINTEK publishes this resource as part of its applied authority programme, connecting practical implementation, institutional context, intelligent systems, human capability and sustainable performance.`,featured:i<6,workflow_status:'published'})));

    const leadCount = await strapi.documents('api::form-submission.form-submission').count();
    if (leadCount === 0) {
      const demos = [
        { form_type:'consultation', full_name:'[DEMO] Mariam A.', organization:'[DEMO] Government Transformation Office', role_title:'Programme Director', email:'demo.gov@example.com', sector_interest:'Government & Public Institutions', service_interest:'Workflow Automation & Process Optimization', preferred_followup:'online-meeting', message:'Demo record: exploring a cross-department workflow modernization discussion.', status:'NEW', source_url:'demo-seed' },
        { form_type:'platform', full_name:'[DEMO] Dr. Omar K.', organization:'[DEMO] Academic Institution', role_title:'Director of Institutional Effectiveness', email:'demo.edu@example.com', sector_interest:'Education & Academic Institutions', product_interest:'Scheduler', preferred_followup:'email', message:'Demo record: evaluating scheduling and operational coordination capabilities.', status:'IN_REVIEW', assignee:'Demo Reviewer', source_url:'demo-seed' },
        { form_type:'consultation', full_name:'[DEMO] Sara H.', organization:'[DEMO] Enterprise Group', role_title:'Head of Digital Operations', email:'demo.enterprise@example.com', sector_interest:'Corporate & Enterprise Organizations', service_interest:'AI Integration & Intelligent Assistants', preferred_followup:'phone', message:'Demo record: interested in applied AI integration across service operations.', status:'CONTACTED', assignee:'Demo Reviewer', source_url:'demo-seed' },
        { form_type:'consultation', full_name:'[DEMO] Khalid N.', organization:'[DEMO] Talent Development Entity', role_title:'Learning Strategy Lead', email:'demo.hr@example.com', sector_interest:'Human Capital / HR / Talent Development', product_interest:'AILEX', service_interest:'AI Leadership Excellence Assessment & Training', preferred_followup:'online-meeting', message:'Demo record: leadership AI readiness and executive capability development.', status:'QUALIFIED', assignee:'Demo Reviewer', source_url:'demo-seed' },
        { form_type:'partnership', full_name:'[DEMO] Lina R.', organization:'[DEMO] Professional Development Provider', role_title:'Managing Partner', email:'demo.partner@example.com', sector_interest:'Training / Consulting / Professional Development', preferred_followup:'email', message:'Demo record: exploring a structured capability-development collaboration.', status:'CLOSED', assignee:'Demo Reviewer', source_url:'demo-seed' }
      ];
      for (const lead of demos) {
        const created = await strapi.documents('api::form-submission.form-submission').create({ data: lead });
        await strapi.documents('api::submission-status-log.submission-status-log').create({ data: { submission_document_id: created.documentId, submission:{connect:[created.documentId]}, previous_status:'', new_status:lead.status, changed_by:'demo-seed', note:'Clearly labeled demo operational record.', changed_at:new Date().toISOString() } });
      }
    }

    const settings = await strapi.documents('api::site-setting.site-setting').findFirst();
    if (!settings) await strapi.documents('api::site-setting.site-setting').create({ data: {
      site_name:'BRAINTEK AI Solutions & Consultancies',primary_domain:'https://braintek.ae',primary_email:'info@braintek.ae',location:'Abu Dhabi, UAE',
      default_meta_title:'BRAINTEK AI Solutions & Consultancies | Cybersecurity, AI Systems, and Workforce Development UAE',
      default_meta_description:'BRAINTEK delivers cybersecurity, software systems development, workflow automation, AI integration, psychometric-informed training, and workforce capability solutions for institutions in the UAE.'
    }});
    const config = await strapi.documents('api::form-configuration.form-configuration').findFirst();
    if (!config) await strapi.documents('api::form-configuration.form-configuration').create({ data: {
      inquiry_types:[{label:'Consultation',value:'consultation'},{label:'General Inquiry',value:'general'},{label:'Partnership',value:'partnership'},{label:'Platform / Product',value:'platform'}],
      sector_options:SECTORS.map(x=>x[0]),service_options:SERVICES.map(x=>x[0]),product_options:PRODUCTS.map(x=>x[0]),
      followup_options:[{label:'Email',value:'email'},{label:'Phone call',value:'phone'},{label:'Online meeting',value:'online-meeting'},{label:'In-person discussion',value:'in-person'}],notification_emails:['info@braintek.ae']
    }});
  }
};
