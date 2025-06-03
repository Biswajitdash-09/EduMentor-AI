
export interface NewCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  progress?: number;
  isEnrolled?: boolean;
  category: string;
  modules: string[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  points: number;
  earnedPoints?: number;
  course: string;
}

export const newCoursesData: NewCourse[] = [
  {
    id: 'course-1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning, including supervised and unsupervised learning techniques.',
    instructor: 'Dr. Sarah Chen',
    duration: '8 weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    enrolledCount: 2340,
    category: 'AI/ML',
    modules: ['Introduction to ML', 'Linear Regression', 'Classification', 'Clustering', 'Neural Networks']
  },
  {
    id: 'course-2',
    title: 'Advanced Python Programming',
    description: 'Master advanced Python concepts including decorators, generators, metaclasses, and async programming.',
    instructor: 'Prof. Michael Rodriguez',
    duration: '6 weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    enrolledCount: 1890,
    progress: 45,
    isEnrolled: true,
    category: 'Programming',
    modules: ['Decorators', 'Generators', 'Context Managers', 'Metaclasses', 'Async Programming']
  },
  {
    id: 'course-3',
    title: 'Data Structures and Algorithms',
    description: 'Comprehensive course covering essential data structures and algorithmic problem-solving techniques.',
    instructor: 'Dr. Emily Watson',
    duration: '10 weeks',
    difficulty: 'Intermediate',
    rating: 4.7,
    enrolledCount: 3200,
    category: 'Computer Science',
    modules: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching']
  },
  {
    id: 'course-4',
    title: 'React Development Mastery',
    description: 'Build modern web applications with React, including hooks, context, and advanced patterns.',
    instructor: 'Alex Johnson',
    duration: '7 weeks',
    difficulty: 'Intermediate',
    rating: 4.6,
    enrolledCount: 2100,
    progress: 78,
    isEnrolled: true,
    category: 'Web Development',
    modules: ['React Basics', 'Hooks', 'Context API', 'State Management', 'Testing']
  },
  {
    id: 'course-5',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn digital marketing strategies including SEO, social media marketing, and content marketing.',
    instructor: 'Lisa Park',
    duration: '5 weeks',
    difficulty: 'Beginner',
    rating: 4.5,
    enrolledCount: 1750,
    category: 'Marketing',
    modules: ['SEO Basics', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics']
  },
  {
    id: 'course-6',
    title: 'Cybersecurity Essentials',
    description: 'Understanding cybersecurity principles, threat assessment, and protection strategies.',
    instructor: 'Dr. Robert Kim',
    duration: '9 weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    enrolledCount: 1420,
    category: 'Security',
    modules: ['Security Fundamentals', 'Network Security', 'Cryptography', 'Ethical Hacking', 'Incident Response']
  }
];

export const assignmentsData: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Linear Regression Project',
    description: 'Implement a linear regression model to predict house prices using Python and scikit-learn.',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'pending',
    points: 100,
    course: 'Introduction to Machine Learning'
  },
  {
    id: 'assign-2',
    title: 'Advanced Python Quiz',
    description: 'Test your knowledge of decorators, generators, and metaclasses in this comprehensive quiz.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'submitted',
    points: 50,
    course: 'Advanced Python Programming'
  },
  {
    id: 'assign-3',
    title: 'Binary Tree Implementation',
    description: 'Create a complete binary tree class with insertion, deletion, and traversal methods.',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending',
    points: 80,
    course: 'Data Structures and Algorithms'
  },
  {
    id: 'assign-4',
    title: 'React Todo App',
    description: 'Build a fully functional todo application using React hooks and context API.',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (overdue)
    status: 'overdue',
    points: 120,
    course: 'React Development Mastery'
  },
  {
    id: 'assign-5',
    title: 'SEO Analysis Report',
    description: 'Analyze a website\'s SEO performance and provide recommendations for improvement.',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: 'graded',
    points: 75,
    earnedPoints: 68,
    course: 'Digital Marketing Fundamentals'
  }
];
