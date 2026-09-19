const usersSeedData = [
  {
    name: 'Daksh Admin',
    email: 'admin@cse.edu',
    password: 'AdminPassword@123',
    role: 'admin',
    isActive: true,
  },
  {
    name: 'Alex Student',
    email: 'student@cse.edu',
    password: 'StudentPassword@123',
    role: 'student',
    isActive: true,
    profile: {
      college: 'National Institute of Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      branch: 'Computer Science and Engineering',
      semester: 3,
      graduationYear: 2026,
      bio: 'Pre-final year CSE student passionate about Distributed Systems, DSA, and High-Concurrency Backend Architecture.',
      location: 'India',
      linkedin: 'https://linkedin.com/in/alex-cse',
      github: 'https://github.com/alex-cse',
      careerGoal: 'Backend / Distributed Systems Engineer at a Tier-1 Product Company',
      specialization: 'Full Stack / Software Engineering',
    },
  },
  {
    name: 'Priya AI Student',
    email: 'priya.ai@cse.edu',
    password: 'PriyaPassword@123',
    role: 'student',
    isActive: true,
    profile: {
      college: 'Indian Institute of Technology',
      degree: 'B.Tech in Computer Science',
      branch: 'Computer Science and Engineering',
      semester: 5,
      graduationYear: 2025,
      bio: 'Specializing in Generative AI, PyTorch, and Vector Search systems.',
      location: 'India',
      specialization: 'AI / ML',
    },
  },
];

module.exports = usersSeedData;
