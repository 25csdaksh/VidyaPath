const announcementsSeedData = [
  {
    title: 'Microsoft India Campus Placement Drive 2026 Registration Open',
    description: 'Microsoft is conducting campus hiring for Software Engineering (SDE-1) and Cloud Solution Architect roles. Eligible: B.Tech CSE/IT graduating in 2026 with CGPA >= 7.5.',
    category: 'Placements',
    priority: 'urgent',
    actionUrl: 'https://careers.microsoft.com',
    actionLabel: 'Apply on Portal',
    authorName: 'University Training & Placement Cell',
    deadline: new Date('2026-10-05T23:59:59.000Z'),
    isBroadcast: true,
  },
  {
    title: 'Smart India Hackathon (SIH) Internal College Scrutiny Round',
    description: 'All 6-member student teams must submit their 3-slide PPT problem solution abstract to the department faculty coordinator before September 25.',
    category: 'Hackathons',
    priority: 'urgent',
    actionUrl: 'https://sih.gov.in',
    actionLabel: 'View Submission Form',
    authorName: 'CSE Department Innovation Council',
    deadline: new Date('2026-09-25T17:00:00.000Z'),
    isBroadcast: true,
  },
  {
    title: 'Free Workshop: Distributed Systems & Kubernetes in Production',
    description: 'Hands-on 3-hour weekend masterclass conducted by Senior Staff SREs on containerizing microservices and managing production clusters.',
    category: 'Workshops',
    priority: 'normal',
    actionUrl: 'https://meet.google.com',
    actionLabel: 'RSVP Workshop',
    authorName: 'CSE Student Technical Chapter',
    deadline: new Date('2026-10-12T10:00:00.000Z'),
    isBroadcast: true,
  },
];

module.exports = announcementsSeedData;
