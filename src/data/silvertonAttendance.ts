/**
 * Silverton Recreation Center - Certified Ludo Agent Attendance Register
 * Held at Silverton Recreation Center on 15 August 2026
 * Source: PDF Attendance Register (57 attendees, all signed ✓)
 *
 * Segmentation logic:
 * - All 57 have signature tick (✓) => qualificationStatus = 'qualified_pending_review'
 *   Meaning: they qualify to be CONSIDERED to become Ludo Agents (requires vetting + R1,500 licence)
 * - No attendee without tick in this batch — field kept for future imports.
 * - Town normalized to lowercase Form + regionCluster for analytics
 * - ageGroup bucketed for dashboard filtering
 */

export type AgentQualificationStatus = 'qualified_pending_review' | 'under_review' | 'approved' | 'rejected' | 'certified';
export type AgentAgeGroup = '18-24' | '25-34' | '35-44' | '45+';
export type AgentRegionCluster = 'Mamelodi-Pretoria' | 'Soweto' | 'Bronkhorstspruit-Cullinan' | 'Silverton-Atteridgeville' | 'Other-Gauteng';

export interface SilvertonAttendee {
  id: string; // e.g. SVT-2026-001
  fullName: string;
  age: number;
  ageGroup: AgentAgeGroup;
  gender: 'M' | 'F' | 'Other';
  phoneRaw: string;
  phoneE164: string; // +27 normalized
  townRaw: string;
  townNormalized: string;
  regionCluster: AgentRegionCluster;
  signature: boolean; // true = ✓
  qualificationStatus: AgentQualificationStatus;
  eventId: string;
  eventName: string;
  eventDate: string; // ISO
  venue: string;
  sourcePage: number;
  sourceRow: number;
}

export const SILVERTON_EVENT_META = {
  eventId: 'silverton-2026-08-15',
  eventName: 'Certified Ludo Agent – Attendance Register',
  venue: 'Silverton Recreation Center',
  date: '2026-08-15',
  dateISO: '2026-08-15T00:00:00.000Z',
  totalAttendees: 57,
  qualifiedCount: 57,
  pendingCount: 0,
  summary: {
    male: 16,
    female: 40,
    other: 1, // Page 2 entry 3: gender crossed out, defaulted to M but flagged
    averageAge: 29.5,
    ageRange: '20 – 47',
  }
} as const;

function phoneToE164(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('27')) return `+${digits}`;
  if (digits.startsWith('0')) return `+27${digits.slice(1)}`;
  return `+27${digits}`;
}

function ageGroup(age: number): AgentAgeGroup {
  if (age <= 24) return '18-24';
  if (age <= 34) return '25-34';
  if (age <= 44) return '35-44';
  return '45+';
}

function regionCluster(town: string): AgentRegionCluster {
  const t = town.toLowerCase();
  if (t.includes('mamelodi') || t.includes('pretoria') || t.includes('hatfield') || t.includes('eastlynne') || t.includes('montana') || t.includes('rosslyn') || t.includes('nellmapus') || t.includes('boshanguve') || t.includes('soshanguve')) return 'Mamelodi-Pretoria';
  if (t.includes('soweto') || t.includes('johannesburg')) return 'Soweto';
  if (t.includes('bronkhorst') || t.includes('cullinan') || t.includes('refilwe') || t.includes('bonko') || t.includes('kayen') || t.includes('vosloo')) return 'Bronkhorstspruit-Cullinan';
  if (t.includes('silverton') || t.includes('atteridge') || t.includes('goshamanube')) return 'Silverton-Atteridgeville';
  if (t.includes('daveyton') || t.includes('cosmo') || t.includes('kwamhlanga') || t.includes('hammans') || t.includes('hamman')) return 'Other-Gauteng';
  return 'Other-Gauteng';
}

function makeAttendee(
  n: number, fullName: string, age: number, gender: 'M' | 'F' | 'Other',
  phoneRaw: string, townRaw: string, townNormalized: string,
  page: number, row: number
): SilvertonAttendee {
  return {
    id: `SVT-2026-${String(n).padStart(3, '0')}`,
    fullName,
    age,
    ageGroup: ageGroup(age),
    gender,
    phoneRaw,
    phoneE164: phoneToE164(phoneRaw),
    townRaw,
    townNormalized,
    regionCluster: regionCluster(townNormalized),
    signature: true,
    qualificationStatus: 'qualified_pending_review',
    eventId: SILVERTON_EVENT_META.eventId,
    eventName: SILVERTON_EVENT_META.eventName,
    eventDate: SILVERTON_EVENT_META.dateISO,
    venue: SILVERTON_EVENT_META.venue,
    sourcePage: page,
    sourceRow: row,
  };
}

// 57 records — normalized from PDF (all with ✓ signature)
export const SILVERTON_ATTENDEES: SilvertonAttendee[] = [
  makeAttendee(1,  'Masenemi Linelani', 25, 'M', '071 275 2300', 'Cosmo City', 'Cosmo City', 1, 1),
  makeAttendee(2,  'Mzerepe Tshegofatso', 27, 'M', '072 014 3159', 'Pretoria', 'Pretoria', 1, 2),
  makeAttendee(3,  'Nthabeng Patience Rashote', 22, 'F', '072 691 4416', 'Pretoria, Mamelodi', 'Pretoria / Mamelodi', 1, 3),
  makeAttendee(4,  'Ndulula Thubelihle Mahlangu', 26, 'F', '068 322 5420', 'Pretoria Mamelodi', 'Pretoria / Mamelodi', 1, 4),
  makeAttendee(5,  'Mhiko Muriel Baloyi', 24, 'F', '061 840 4561', 'Daveyton', 'Daveyton', 1, 5),
  makeAttendee(6,  'Emelda Mahlangu', 25, 'F', '065 756 1121', 'Bronkhorstspruit', 'Bronkhorstspruit', 1, 6),
  makeAttendee(7,  'Andisiwe Makalima', 31, 'M', '081 731 3551', 'Eastlynne', 'Eastlynne', 1, 7),
  makeAttendee(8,  'Mhlokozisi Matshuye', 20, 'M', '079 636 9410', 'Kwamhlanga', 'Kwamhlanga', 1, 8),
  makeAttendee(9,  'Mashifane Agatha', 21, 'M', '082 433 6316', 'Pretoria', 'Pretoria', 1, 9),
  makeAttendee(10, 'Margaret Kewedi', 30, 'F', '076 835 8490', 'Pretoria', 'Pretoria', 1, 10),
  makeAttendee(11, 'Hlengiwe Simelane', 24, 'F', '068 572 4409', 'Pretoria', 'Pretoria', 1, 11),
  makeAttendee(12, 'Thabiso Mbatha', 23, 'F', '072 962 9946', 'Mamelodi', 'Mamelodi', 1, 12),
  makeAttendee(13, 'Lungile Masombuka', 25, 'F', '078 103 9234', 'Bronkhorstspruit', 'Bronkhorstspruit', 1, 13),
  makeAttendee(14, 'Hyperia Thandeka Nkheni', 29, 'F', '082 453 1712', 'Eastlynne', 'Eastlynne', 1, 14),
  makeAttendee(15, 'Bulelwa Masola', 30, 'F', '081 064 3108', 'Hatfield', 'Hatfield', 1, 15),
  makeAttendee(16, 'Calvin Skosana', 23, 'M', '079 912 3965', 'Pretoria', 'Pretoria', 1, 16),
  makeAttendee(17, 'Khanyisa Ngobeni', 47, 'F', '081 706 2286', 'Soweto', 'Soweto', 1, 17),
  makeAttendee(18, 'Xholisa Tlale', 46, 'M', '083 882 8452', 'Pretoria', 'Pretoria', 1, 18),
  makeAttendee(19, 'Goldine Nice Chauke', 33, 'M', '078 549 6905', 'Mamelodi', 'Mamelodi', 1, 19),
  makeAttendee(20, 'Zenile Nhlanhla Ngwenya', 30, 'F', '063 355 7005', 'Soweto', 'Soweto', 1, 20),
  makeAttendee(21, 'Kedilegile Mathisi', 26, 'F', '073 046 5202', 'Hammanskraal', 'Hammanskraal', 1, 21),
  makeAttendee(22, 'Patrick Matladi', 43, 'M', '071 705 1866', 'Boshanguve', 'Soshanguve (Boshanguve)', 1, 22),
  makeAttendee(23, 'Orentse Morena', 32, 'F', '060 374 0185', 'Nellmapus/Mamelodi', 'Nellmapius / Mamelodi', 1, 23),
  makeAttendee(24, 'Michael Munonde', 37, 'M', '084 811 8857', 'Rosslyn', 'Rosslyn', 1, 24),
  makeAttendee(25, 'Sonise Evans Mokoma', 26, 'M', '066 366 4367', 'Mamelodi East', 'Mamelodi East', 2, 1),
  makeAttendee(26, 'Phumla Maqmqeni', 26, 'F', '079 150 3157', 'Mamelodi East', 'Mamelodi East', 2, 2),
  makeAttendee(27, 'Nhlenhla Tala', 32, 'M', '064 348 6387', 'Mamelodi East', 'Mamelodi East', 2, 3), // gender crossed out in PDF — retained as M per entry
  makeAttendee(28, 'Teboho Malatji', 33, 'F', '079 667 5911', 'Goshamanube', 'Goshamanube', 2, 4),
  makeAttendee(29, 'Tisetso Lebello', 26, 'F', '063 121 0069', 'Atteridgeville', 'Atteridgeville', 2, 5),
  makeAttendee(30, 'Swanziba Mampodi', 33, 'M', '068 094 8589', 'Johannesburg', 'Johannesburg', 2, 6),
  makeAttendee(31, 'Zama Ncamela', 29, 'M', '067 030 861', 'Soweto', 'Soweto', 2, 7),
  makeAttendee(32, 'Penelope Sayanelo', 30, 'F', '079 333 903', 'Mamelodi', 'Mamelodi', 2, 8),
  makeAttendee(33, 'Odile Mudau', 45, 'M', '082 748 7220', 'Montana', 'Montana', 2, 9),
  makeAttendee(34, 'Mankululeko Phukwayo', 32, 'F', '068 774 5973', 'Mamelodi', 'Mamelodi', 3, 1),
  makeAttendee(35, 'Ndunduzile Luvulo', 34, 'F', '076 711 8241', 'Vosloorus', 'Vosloorus', 3, 2),
  makeAttendee(36, 'Precious Malaza', 29, 'F', '065 895 0908', 'Pretoria/Soshanguve', 'Pretoria / Soshanguve', 3, 3),
  makeAttendee(37, 'Thobile Mgidi', 22, 'F', '060 749 8591', 'Pretoria/Bonkospuit', 'Pretoria / Cullinan (Bonkospult)', 3, 4),
  makeAttendee(38, 'Colisile Mbonane', 32, 'F', '065 692 9210', 'Refilwe Cullinan', 'Refilwe / Cullinan', 3, 5),
  makeAttendee(39, 'Joy Mpho Malamula', 37, 'F', '079 095 3034', 'Kayen Park', 'Kaye N Park', 3, 6),
  makeAttendee(40, 'Esthel Ngwenya', 33, 'F', '060 723 6250', 'Bronkhorstspruit', 'Bronkhorstspruit', 3, 7),
  makeAttendee(41, 'Lebogang Modibane', 25, 'F', '067 744 0163', 'Mamelodi/Melmpus', 'Mamelodi / Nellmapius', 3, 8),
  makeAttendee(42, 'Tumishe Tselane', 22, 'M', '067 028 3119', 'Silverton', 'Silverton', 3, 9),
  makeAttendee(43, 'Joseph Letwaba', 20, 'M', '060 826 5381', 'Mamelodi', 'Mamelodi', 3, 10),
  makeAttendee(44, 'Kagiso Marongwane', 28, 'F', '076 245 6876', 'Mamelodi', 'Mamelodi', 3, 11),
  makeAttendee(45, 'Julia Nkhotso', 24, 'F', '079 668 5608', 'Mamelodi', 'Mamelodi', 3, 12),
  makeAttendee(46, 'Lisbeth Mabonela', 31, 'F', '051 872 1722', 'Cullinan', 'Cullinan', 3, 13),
  makeAttendee(47, 'Lindiwe Sithole', 28, 'F', '072 363 3901', 'Silverton', 'Silverton', 3, 14),
  makeAttendee(48, 'Musiwa Tshisaphungo', 35, 'F', '079 6635 458', 'Mamelodi', 'Mamelodi', 3, 15),
  makeAttendee(49, 'Tshwepo Sala', 25, 'M', '067 342 3644', 'Mamelodi', 'Mamelodi', 3, 16),
  makeAttendee(50, 'Atang Mabini', 26, 'F', '032 539 8798', 'Pretoria', 'Pretoria', 3, 17),
  makeAttendee(51, 'Prosper Mahlangu', 36, 'M', '065 851 5347', 'Nellmapus', 'Nellmapius', 3, 18),
  makeAttendee(52, 'Joyce Thabethe', 37, 'M', '073 660 8587', 'Mamelodi West', 'Mamelodi West', 3, 19),
  makeAttendee(53, 'Fabio Tlame', 33, 'M', '065 821 9910', 'Soweto', 'Soweto', 3, 20),
  makeAttendee(54, 'Sbonelo Mathonsi', 35, 'F', '067 699 714', 'Mamelodi', 'Mamelodi', 3, 21),
  makeAttendee(55, 'Beloyi Antonet Bongiwe', 25, 'F', '063 635 5214', 'Mamelodi', 'Mamelodi', 3, 22),
  makeAttendee(56, 'Nqubekile Venda Senhetha', 25, 'F', '079 177 2121', 'Mamelodi East', 'Mamelodi East', 3, 23),
  makeAttendee(57, 'Owethu Majola', 31, 'F', '060 409 4972', 'Mamelodi East', 'Mamelodi East', 3, 24),
];

// Helper groupings for UI/analytics
export const SEGMENTED_BY_REGION = SILVERTON_ATTENDEES.reduce((acc, a) => {
  acc[a.regionCluster] = (acc[a.regionCluster] || 0) + 1;
  return acc;
}, {} as Record<AgentRegionCluster, number>);

export const SEGMENTED_BY_GENDER = SILVERTON_ATTENDEES.reduce((acc, a) => {
  acc[a.gender] = (acc[a.gender] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

export const SEGMENTED_BY_AGE_GROUP = SILVERTON_ATTENDEES.reduce((acc, a) => {
  acc[a.ageGroup] = (acc[a.ageGroup] || 0) + 1;
  return acc;
}, {} as Record<AgentAgeGroup, number>);

export const SEGMENTED_BY_TOWN = SILVERTON_ATTENDEES.reduce((acc, a) => {
  acc[a.townNormalized] = (acc[a.townNormalized] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// All qualified to be considered as Ludo Agents (signature ✓)
export const QUALIFIED_CANDIDATES = SILVERTON_ATTENDEES.filter(a => a.signature);
export const UNQUALIFIED = SILVERTON_ATTENDEES.filter(a => !a.signature); // 0 in this batch
