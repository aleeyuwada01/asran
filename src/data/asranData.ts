export type PageId = 'home' | 'about' | 'programmes' | 'projects' | 'gallery' | 'contact';

export interface OrganisationDetails {
  fullName: string;
  shortName: string;
  motto: string;
  foundedYear: number;
  establishedYear: number;
  registrationNumber: string;
  registrar: string;
  profileYear: number;
  profilePdfUrl: string;
  crestImageUrl: string;
  physicalAddress: string;
  cityState: string;
  email: string;
  emails: string[];
  phones: string[];
  banking: {
    bankName: string;
    branch: string;
    accountNumber: string;
    accountName: string;
  };
  vision: string;
  mission: string;
}

export interface PolicyFramework {
  acronym: string;
  fullTitle: string;
  description: string;
}

export interface CoreValue {
  name: string;
  index: string;
}

export interface Patron {
  name: string;
  title: string;
  role: 'Grand Patron' | 'Patron';
}

export interface TeamMember {
  name: string;
  role: string;
  isTrustee?: boolean;
}

export interface ProgrammeArea {
  id: string;
  index: string;
  title: string;
  summary: string;
  highlight?: string;
  relatedProjectIds: number[];
  galleryIds: string[];
}

export type ClientGroup =
  | 'UNICEF'
  | 'KATSACA'
  | 'SMEDAN'
  | 'Government'
  | 'DATHAM/SOLINA';

export interface ProjectRecord {
  id: number;
  serialNo: number;
  title: string;
  client: string;
  clientGroup: ClientGroup;
  destination: 'Katsina State' | 'Bauchi State';
  year: number;
  programmeId: string;
}

export type GalleryCategory =
  | 'Orphan Care & Support'
  | 'Vocational & Entrepreneurship'
  | 'Education & Sensitization';

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  year?: string;
  imageUrl: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export const ORGANISATION: OrganisationDetails = {
  fullName: 'Association for Social Reform Awareness of Nigeria',
  shortName: 'ASRAN',
  motto: 'For Better Society',
  foundedYear: 1999,
  establishedYear: 2006,
  registrationNumber: 'CAC/IT/NO21061',
  registrar: 'Corporate Affairs Commission (CAC)',
  profileYear: 2025,
  profilePdfUrl: '/assets/aistudio/ASRAN_Profile_d26c08ed.pdf',
  crestImageUrl: '/assets/asran/asran-crest.png',
  physicalAddress: 'Flat 2, Mima Plaza, Opposite CBN, G.R.A Katsina, Katsina State.',
  cityState: 'Katsina State, Nigeria',
  email: 'contact@asran.org',
  emails: ['contact@asran.org', 'asrankt@gmail.com'],
  phones: ['08039515848', '08089993998', '08035867656'],
  banking: {
    bankName: 'Eco Bank Plc.',
    branch: 'Katsina',
    accountNumber: '2672062635',
    accountName: 'Association for Social Reform Awareness',
  },
  vision:
    'A world where the less privileged and vulnerable groups have basic access to education, sustainable jobs, nutritious food and social rights.',
  mission:
    'We strive to bring lasting solution to poverty, ignorance, social vices and food insecurity.',
};

export const BACKGROUND_PARAGRAPHS: string[] = [
  'Association for Social Reform Awareness of Nigeria (ASRAN) was founded in 1999 and established in 2006 in Nigeria with Registration Number CAC/IT/NO21061 with the Corporate Affairs Commission (CAC). We are a small yet highly motivated, passionate, local-based not-for-profit, non-governmental, charity organisation that provides capacity building, research, consultancy, health, advocacy and charity for the poor, underprivileged people and communities.',
  'ASRAN is a volunteer-driven organisation based in Katsina, Nigeria. It aims to improve life and opportunities for children, adolescents and vulnerable groups through better education and training, health support, advocacy, charity, participatory development and good governance.',
  'Our work is based on a commitment to support the principles of the Sustainable Development Goals (SDGs), the National Economic Empowerment and Development Strategy (NEEDS), and the National Policy on Micro, Small and Medium Enterprises (MSMEs) in partnership with policy stakeholders to achieve the Federal Government’s Vision 20: 2030. We therefore maintain a unified approach to sustainable community development.',
];

export const DEVELOPMENT_OBJECTIVES: string[] = [
  'End hunger and malnutrition, in all its forms and magnitudes.',
  'Ensure that needs of women, children and other vulnerable populations are met.',
  'Ensure that all human beings can enjoy flourishing and satisfying lives.',
  'Ensure that economic, social and technological progress occurs in harmony with nature.',
  'Foster peaceful, fair and inclusive societies which are free from fear and violence to achieve sustainable development.',
  'Network with other agencies to implement Government policies geared towards sustainable development.',
];

export const POLICY_FRAMEWORKS: PolicyFramework[] = [
  {
    acronym: 'SDGs',
    fullTitle: 'Sustainable Development Goals',
    description:
      'Aligning grassroots community reform with global benchmarks for poverty eradication, nutrition, health, education, and inclusive societies.',
  },
  {
    acronym: 'NEEDS',
    fullTitle: 'National Economic Empowerment & Development Strategy',
    description:
      'Supporting national socio-economic reform through participatory community development and good governance.',
  },
  {
    acronym: 'MSMEs',
    fullTitle: 'National Policy on Micro, Small & Medium Enterprises',
    description:
      'Equipping women, youth, and vulnerable groups with vocational and entrepreneurship skills for sustainable self-reliance.',
  },
  {
    acronym: 'Vision 20: 2030',
    fullTitle: 'Federal Government’s Vision 20: 2030',
    description:
      'Networking with government institutions and development partners to implement policies geared towards sustainable national development.',
  },
];

export const CORE_VALUES: CoreValue[] = [
  { index: '01', name: 'Honesty' },
  { index: '02', name: 'Trust' },
  { index: '03', name: 'Commitment to Quality & Safety' },
  { index: '04', name: 'Enthusiasm' },
  { index: '05', name: 'Teamwork' },
  { index: '06', name: 'Esteem' },
  { index: '07', name: 'Benevolence' },
];

export const GOVERNANCE_MANDATE =
  'ASRAN’s governing body is made up of voluntary trustees who delegate management of the organisation to the Managing Director, while remaining ultimately responsible for the activities of the organisation—ensuring that it is solvent, well-run, and delivering appropriate outcomes in terms of public benefit.';

export const BOARD_OF_TRUSTEES: string[] = [
  'Hajiya Amina Muhammad Lawal',
  'Hajiya Aysha Usman Lawal',
  'Hajiya Shamsiyya Hamza',
  'Alhaji Mu’ammar Lawal Dauda',
];

export const GRAND_PATRON: Patron = {
  name: 'His Royal Highness Alh. (Dr.) Abdulmumini Kabir Usman (CFR)',
  title: 'Emir of Katsina',
  role: 'Grand Patron',
};

export const PATRONS: Patron[] = [
  {
    name: 'Alhaji Umar Babani Isa',
    title: 'Durbin Katsina',
    role: 'Patron',
  },
  {
    name: 'Alhaji Usman Bello',
    title: 'Kanwan Katsina',
    role: 'Patron',
  },
  {
    name: 'Hon. Mariya Abdullahi',
    title: 'Garkuwar Makaman Katsina',
    role: 'Patron',
  },
];

export const PROJECT_TEAM: TeamMember[] = [
  { name: 'Hajiya Amina Muhammad Lawal', role: 'Executive Director', isTrustee: true },
  { name: 'Mu’ammar Lawal Dauda', role: 'Head of Programmes', isTrustee: true },
  { name: 'Shamsiyya Hamza', role: 'Program Officer, Women Development', isTrustee: true },
  { name: 'Khadija Lawal', role: 'Policy & Campaign Officer' },
  { name: 'Aisha Mukhtar Muhammad', role: 'Project Monitoring & Evaluation Officer' },
  { name: 'Jawad Lawal', role: 'Project Procurement Officer' },
  { name: 'Abubakar Bello Yandaki', role: 'Project Accountant' },
  { name: 'Abubakar Dahiru', role: 'Admin Officer' },
];

export const PROGRAMMES: ProgrammeArea[] = [
  {
    id: 'community-development',
    index: '01',
    title: 'Community Development Programmes',
    summary:
      'We work in partnership with poor and marginalized communities in Nigeria to help them improve their health, education and social activities through sensitization and awareness creation.',
    relatedProjectIds: [3, 14, 15],
    galleryIds: ['sensitization-awareness', 'education-support'],
  },
  {
    id: 'policy-and-practice',
    index: '02',
    title: 'Influencing Policy and Practice',
    summary:
      'We are driven by our conviction that the denial of health, education and wealth creation rights is not acceptable. We know that it is possible for poverty to be eradicated and health to be improved, requiring paradigm shifts in social, economic and environmental policy. We actively campaign for change.',
    relatedProjectIds: [13, 14],
    galleryIds: ['sensitization-awareness'],
  },
  {
    id: 'emergency-response',
    index: '03',
    title: 'Responding to Emergencies',
    summary:
      'When emergencies occur, we work directly with those affected to mobilize all possible resources for urgent, coordinated humanitarian response.',
    relatedProjectIds: [4, 15],
    galleryIds: ['orphan-support-1', 'orphan-support-2'],
  },
  {
    id: 'advocacy-sensitization',
    index: '04',
    title: 'Advocacy, Sensitization & Awareness Creation',
    summary:
      'ASRAN offers targeted advocacy, sensitization and awareness creation in the areas of health, education, child protection, poverty alleviation and wealth creation.',
    relatedProjectIds: [3, 7, 9, 12, 13, 14, 15],
    galleryIds: ['sensitization-awareness', 'education-support'],
  },
  {
    id: 'capacity-building',
    index: '05',
    title: 'Capacity Building & Empowerment',
    summary:
      'We collaborate with Governments, MDAs, NGOs and other donors to provide practical skills to poor and vulnerable groups so they can achieve lasting self-reliance.',
    highlight:
      'ASRAN has built the capacity of more than 4,000 women, youth and children in vocational and entrepreneurship disciplines.',
    relatedProjectIds: [5, 6, 8, 10, 11],
    galleryIds: [
      'vocational-training-1',
      'vocational-training-2',
      'ruwedp-beneficiaries-2013',
      'ruwedp-training-2013',
      'gedp-beneficiaries-2014',
      'gedp-training-2014',
    ],
  },
  {
    id: 'care-giving',
    index: '06',
    title: 'Care-Giving and Support',
    summary:
      'We provide assistance and support to family members or acquaintances who have physical, psychological, or developmental needs—instrumentally, emotionally, and through information dissemination.',
    relatedProjectIds: [4, 13],
    galleryIds: ['orphan-support-1', 'orphan-support-2'],
  },
  {
    id: 'monitoring-evaluation',
    index: '07',
    title: 'Monitoring and Evaluation',
    summary:
      'ASRAN participates in the independent monitoring and evaluation of projects, research studies, community surveys and social services to ensure measurable public benefit.',
    relatedProjectIds: [13, 14, 15],
    galleryIds: ['gedp-training-2014', 'ruwedp-training-2013'],
  },
];

export const PROJECTS: ProjectRecord[] = [
  {
    id: 3,
    serialNo: 3,
    title:
      'Community Mobilization for the Prevention of HIV/AIDS and Reduction for Mothers of Child-Bearing Age in Katsina',
    client: 'KATSACA',
    clientGroup: 'KATSACA',
    destination: 'Katsina State',
    year: 2007,
    programmeId: 'advocacy-sensitization',
  },
  {
    id: 4,
    serialNo: 4,
    title: 'Care & Support for Infected HIV Victims',
    client: 'KATSACA',
    clientGroup: 'KATSACA',
    destination: 'Katsina State',
    year: 2008,
    programmeId: 'care-giving',
  },
  {
    id: 5,
    serialNo: 5,
    title: 'Women Empowerment Programme',
    client: 'Katsina State Government',
    clientGroup: 'Government',
    destination: 'Katsina State',
    year: 2008,
    programmeId: 'capacity-building',
  },
  {
    id: 6,
    serialNo: 6,
    title: 'Women Empowerment Programme',
    client: 'Bauchi State Government',
    clientGroup: 'Government',
    destination: 'Bauchi State',
    year: 2008,
    programmeId: 'capacity-building',
  },
  {
    id: 7,
    serialNo: 7,
    title: 'Awareness on HIV/AIDS',
    client: 'KATSACA',
    clientGroup: 'KATSACA',
    destination: 'Katsina State',
    year: 2011,
    programmeId: 'advocacy-sensitization',
  },
  {
    id: 8,
    serialNo: 8,
    title: 'Women Empowerment Programme',
    client: 'Kafur LGA, Katsina State',
    clientGroup: 'Government',
    destination: 'Katsina State',
    year: 2011,
    programmeId: 'capacity-building',
  },
  {
    id: 9,
    serialNo: 9,
    title: 'Awareness on HIV/AIDS',
    client: 'KATSACA',
    clientGroup: 'KATSACA',
    destination: 'Katsina State',
    year: 2013,
    programmeId: 'advocacy-sensitization',
  },
  {
    id: 10,
    serialNo: 10,
    title: 'Rural Women Entrepreneurship Development Programme (RUWEDP)',
    client: 'Small & Medium Enterprises Development Agency of Nigeria (SMEDAN)',
    clientGroup: 'SMEDAN',
    destination: 'Katsina State',
    year: 2013,
    programmeId: 'capacity-building',
  },
  {
    id: 11,
    serialNo: 11,
    title: 'General Entrepreneurship Development Programme (GEDP)',
    client: 'SMEDAN',
    clientGroup: 'SMEDAN',
    destination: 'Katsina State',
    year: 2014,
    programmeId: 'capacity-building',
  },
  {
    id: 12,
    serialNo: 12,
    title: 'Awareness on HIV/AIDS',
    client: 'KATSACA',
    clientGroup: 'KATSACA',
    destination: 'Katsina State',
    year: 2014,
    programmeId: 'advocacy-sensitization',
  },
  {
    id: 13,
    serialNo: 13,
    title: 'Child Protection',
    client: 'UNICEF',
    clientGroup: 'UNICEF',
    destination: 'Katsina State',
    year: 2021,
    programmeId: 'policy-and-practice',
  },
  {
    id: 14,
    serialNo: 14,
    title: 'Social Behavior Change Communication',
    client: 'UNICEF',
    clientGroup: 'UNICEF',
    destination: 'Katsina State',
    year: 2024,
    programmeId: 'community-development',
  },
  {
    id: 15,
    serialNo: 15,
    title: 'ACSM Polio Campaign',
    client: 'DATHAM/SOLINA',
    clientGroup: 'DATHAM/SOLINA',
    destination: 'Katsina State',
    year: 2025,
    programmeId: 'advocacy-sensitization',
  },
];

export const INSTITUTIONAL_PARTNERS: string[] = [
  'UNICEF',
  'SMEDAN',
  'KATSACA',
  'Katsina State Government',
  'Bauchi State Government',
  'Kafur LGA, Katsina State',
  'DATHAM / SOLINA',
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'orphan-support-2',
    title: 'Care-Giving & Support to Orphans',
    caption:
      'ASRAN team members and community volunteers delivering essential food staples and household supplies to orphaned and vulnerable children in Katsina.',
    category: 'Orphan Care & Support',
    imageUrl: '/assets/asran/orphan-support-2.jpg',
    aspect: 'portrait',
  },
  {
    id: 'sensitization-awareness',
    title: 'Sensitization & Awareness Creation',
    caption:
      'Community health and awareness outreach session featuring practical demonstration and distribution of household relief items.',
    category: 'Education & Sensitization',
    imageUrl: '/assets/asran/sensitization-awareness.jpg',
    aspect: 'square',
  },
  {
    id: 'orphan-support-1',
    title: 'Orphan Household Assistance',
    caption:
      'Direct charitable provision of food grains and household provisions supporting vulnerable children and their guardians.',
    category: 'Orphan Care & Support',
    imageUrl: '/assets/asran/orphan-support-1.jpg',
    aspect: 'square',
  },
  {
    id: 'education-support',
    title: 'Education Support Services',
    caption:
      'Presentation of educational learning materials to school pupils under ASRAN’s community education support initiative.',
    category: 'Education & Sensitization',
    imageUrl: '/assets/asran/education-support.jpg',
    aspect: 'square',
  },
  {
    id: 'ruwedp-beneficiaries-2013',
    title: 'RUWEDP Beneficiaries (2013)',
    caption:
      'Group portrait of Rural Women Entrepreneurship Development Programme (RUWEDP) participants implemented in Katsina State with SMEDAN.',
    category: 'Vocational & Entrepreneurship',
    year: '2013',
    imageUrl: '/assets/asran/ruwedp-beneficiaries-2013.jpg',
    aspect: 'landscape',
  },
  {
    id: 'ruwedp-training-2013',
    title: 'RUWEDP Training Session (2013)',
    caption:
      'Facilitators presenting starter materials during the 2013 Rural Women Entrepreneurship Development Programme training session.',
    category: 'Vocational & Entrepreneurship',
    year: '2013',
    imageUrl: '/assets/asran/ruwedp-training-2013.jpg',
    aspect: 'landscape',
  },
  {
    id: 'vocational-training-1',
    title: 'Vocational Training Services',
    caption:
      'Hands-on practical skill acquisition workshop for women and youth participants building self-reliant livelihoods.',
    category: 'Vocational & Entrepreneurship',
    imageUrl: '/assets/asran/vocational-training-1.jpg',
    aspect: 'landscape',
  },
  {
    id: 'vocational-training-2',
    title: 'Practical Skills Workshop',
    caption:
      'Supervised craft and small-enterprise production practice as part of ASRAN’s vocational capacity building services.',
    category: 'Vocational & Entrepreneurship',
    imageUrl: '/assets/asran/vocational-training-2.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gedp-beneficiaries-2014',
    title: 'GEDP Beneficiaries (2014)',
    caption:
      'Participants of the 2014 General Entrepreneurship Development Programme (GEDP) executed in partnership with SMEDAN in Katsina State.',
    category: 'Vocational & Entrepreneurship',
    year: '2014',
    imageUrl: '/assets/asran/gedp-beneficiaries-2014.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gedp-training-2014',
    title: 'GEDP Beneficiaries Training Session (2014)',
    caption:
      'Classroom entrepreneurship and enterprise management instruction during the 2014 GEDP training cohort.',
    category: 'Vocational & Entrepreneurship',
    year: '2014',
    imageUrl: '/assets/asran/gedp-training-2014.jpg',
    aspect: 'landscape',
  },
];
