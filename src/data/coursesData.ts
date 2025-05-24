
import { BookOpen, BookUser, Code, Beaker, Calculator, Globe, Palette, Music } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface VideoLecture {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  modules: number;
  videoLectures: VideoLecture[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
}

export const allCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning and AI algorithms with comprehensive video lectures.",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    icon: BookUser,
    color: "from-edu-blue to-edu-blue-light",
    modules: 15,
    category: "Technology",
    difficulty: "Intermediate",
    estimatedHours: 40,
    videoLectures: [
      {
        id: "ml-1",
        title: "Introduction to Machine Learning",
        description: "Overview of ML concepts and applications",
        videoId: "ukzFI9rgwfU",
        duration: "15:30",
        order: 1
      },
      {
        id: "ml-2",
        title: "Supervised Learning Fundamentals",
        description: "Understanding classification and regression",
        videoId: "4b5d3muPQmA",
        duration: "22:45",
        order: 2
      },
      {
        id: "ml-3",
        title: "Neural Networks Basics",
        description: "Introduction to artificial neural networks",
        videoId: "aircAruvnKk",
        duration: "18:20",
        order: 3
      },
      {
        id: "ml-4",
        title: "Deep Learning with Python",
        description: "Hands-on deep learning implementation",
        videoId: "VyWAvY2CF9c",
        duration: "25:15",
        order: 4
      },
      {
        id: "ml-5",
        title: "Model Evaluation and Validation",
        description: "Techniques for evaluating ML models",
        videoId: "fSytzGwwBVw",
        duration: "19:30",
        order: 5
      }
    ]
  },
  {
    id: "2",
    title: "Advanced Calculus",
    description: "Master calculus concepts with practical applications and comprehensive examples.",
    instructor: "Prof. Michael Chen",
    progress: 30,
    icon: Calculator,
    color: "from-edu-purple to-edu-purple-light",
    modules: 12,
    category: "Mathematics",
    difficulty: "Advanced",
    estimatedHours: 35,
    videoLectures: [
      {
        id: "calc-1",
        title: "Limits and Continuity",
        description: "Understanding the foundation of calculus",
        videoId: "WUvTyaaNkzM",
        duration: "20:15",
        order: 1
      },
      {
        id: "calc-2",
        title: "Derivatives and Applications",
        description: "Mastering differentiation techniques",
        videoId: "S0_qX4VJhMQ",
        duration: "24:30",
        order: 2
      },
      {
        id: "calc-3",
        title: "Integration Techniques",
        description: "Advanced integration methods",
        videoId: "rfG8ce4nNh0",
        duration: "26:45",
        order: 3
      },
      {
        id: "calc-4",
        title: "Multivariable Calculus",
        description: "Calculus with multiple variables",
        videoId: "TrcCbdWwCBc",
        duration: "28:20",
        order: 4
      }
    ]
  },
  {
    id: "3",
    title: "World History: Modern Era",
    description: "Explore significant events and figures from 1900 to present with detailed video content.",
    instructor: "Dr. Emily Rodriguez",
    progress: 80,
    icon: Globe,
    color: "from-edu-blue-light to-edu-purple",
    modules: 10,
    category: "History",
    difficulty: "Beginner",
    estimatedHours: 25,
    videoLectures: [
      {
        id: "hist-1",
        title: "World War I Overview",
        description: "Causes and consequences of the Great War",
        videoId: "Yocja_N5s1I",
        duration: "16:40",
        order: 1
      },
      {
        id: "hist-2",
        title: "The Interwar Period",
        description: "Global changes between the world wars",
        videoId: "Q78COTwT7nE",
        duration: "18:25",
        order: 2
      },
      {
        id: "hist-3",
        title: "World War II",
        description: "The most devastating conflict in human history",
        videoId: "fo2Rb9h788s",
        duration: "22:15",
        order: 3
      },
      {
        id: "hist-4",
        title: "Cold War Era",
        description: "Understanding the bipolar world order",
        videoId: "nn_dP9wphls",
        duration: "20:30",
        order: 4
      }
    ]
  },
  {
    id: "4",
    title: "Introduction to Computer Science",
    description: "A comprehensive introduction to computer science principles and programming fundamentals.",
    instructor: "Prof. James Wilson",
    progress: 0,
    icon: Code,
    color: "from-blue-500 to-blue-600",
    modules: 18,
    category: "Technology",
    difficulty: "Beginner",
    estimatedHours: 50,
    videoLectures: [
      {
        id: "cs-1",
        title: "Introduction to Programming",
        description: "Basic programming concepts and thinking",
        videoId: "zOjov-2OZ0E",
        duration: "25:15",
        order: 1
      },
      {
        id: "cs-2",
        title: "Data Structures Fundamentals",
        description: "Arrays, lists, and basic data organization",
        videoId: "RBSGKlAvoiM",
        duration: "30:20",
        order: 2
      },
      {
        id: "cs-3",
        title: "Algorithms and Problem Solving",
        description: "Algorithmic thinking and problem-solving strategies",
        videoId: "KEEKn7Me-ms",
        duration: "28:45",
        order: 3
      },
      {
        id: "cs-4",
        title: "Object-Oriented Programming",
        description: "Classes, objects, and OOP principles",
        videoId: "pTB0EiLXUC8",
        duration: "32:10",
        order: 4
      }
    ]
  },
  {
    id: "5",
    title: "Organic Chemistry",
    description: "Study organic compounds, reactions, and laboratory techniques with detailed explanations.",
    instructor: "Dr. Lisa Wang",
    progress: 0,
    icon: Beaker,
    color: "from-green-500 to-green-600",
    modules: 14,
    category: "Science",
    difficulty: "Intermediate",
    estimatedHours: 42,
    videoLectures: [
      {
        id: "chem-1",
        title: "Introduction to Organic Chemistry",
        description: "Basic concepts and molecular structure",
        videoId: "bSMS1t5YjGk",
        duration: "22:30",
        order: 1
      },
      {
        id: "chem-2",
        title: "Functional Groups",
        description: "Understanding different functional groups",
        videoId: "nKGOZkz6Td0",
        duration: "26:15",
        order: 2
      },
      {
        id: "chem-3",
        title: "Organic Reactions Mechanisms",
        description: "How organic reactions work",
        videoId: "uzkD5SeuwzM",
        duration: "29:45",
        order: 3
      },
      {
        id: "chem-4",
        title: "Stereochemistry",
        description: "3D structure of organic molecules",
        videoId: "qsRPBXDlTJw",
        duration: "24:20",
        order: 4
      }
    ]
  },
  {
    id: "6",
    title: "Business Economics",
    description: "Learn economic principles applied to business decision-making with real-world examples.",
    instructor: "Prof. Robert Martinez",
    progress: 0,
    icon: BookOpen,
    color: "from-purple-500 to-purple-600",
    modules: 12,
    category: "Business",
    difficulty: "Intermediate",
    estimatedHours: 30,
    videoLectures: [
      {
        id: "econ-1",
        title: "Introduction to Economics",
        description: "Basic economic principles and concepts",
        videoId: "3ez10ADR_gM",
        duration: "18:45",
        order: 1
      },
      {
        id: "econ-2",
        title: "Supply and Demand",
        description: "Market forces and price determination",
        videoId: "PNtKXWNKGN8",
        duration: "21:30",
        order: 2
      },
      {
        id: "econ-3",
        title: "Market Structures",
        description: "Competition and monopoly analysis",
        videoId: "F8DNBdmhDjY",
        duration: "23:15",
        order: 3
      },
      {
        id: "econ-4",
        title: "Macroeconomic Indicators",
        description: "GDP, inflation, and economic policy",
        videoId: "d1e7PdtV_5E",
        duration: "25:40",
        order: 4
      }
    ]
  },
  {
    id: "7",
    title: "Digital Art and Design",
    description: "Master digital art techniques and design principles using modern tools and software.",
    instructor: "Prof. Maria Garcia",
    progress: 0,
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    modules: 16,
    category: "Arts",
    difficulty: "Beginner",
    estimatedHours: 35,
    videoLectures: [
      {
        id: "art-1",
        title: "Introduction to Digital Art",
        description: "Digital art fundamentals and tools",
        videoId: "V4GB2Wj_xAE",
        duration: "20:15",
        order: 1
      },
      {
        id: "art-2",
        title: "Color Theory and Composition",
        description: "Understanding color and visual balance",
        videoId: "Qj1FK8n7WgY",
        duration: "24:30",
        order: 2
      },
      {
        id: "art-3",
        title: "Digital Painting Techniques",
        description: "Brush techniques and layering",
        videoId: "7zC4CWIhDBQ",
        duration: "28:45",
        order: 3
      },
      {
        id: "art-4",
        title: "Character Design Basics",
        description: "Creating compelling characters",
        videoId: "ZXQlVGek1vw",
        duration: "32:20",
        order: 4
      }
    ]
  },
  {
    id: "8",
    title: "Music Theory and Composition",
    description: "Learn the fundamentals of music theory and how to compose your own music.",
    instructor: "Dr. David Thompson",
    progress: 0,
    icon: Music,
    color: "from-indigo-500 to-indigo-600",
    modules: 14,
    category: "Arts",
    difficulty: "Beginner",
    estimatedHours: 28,
    videoLectures: [
      {
        id: "music-1",
        title: "Introduction to Music Theory",
        description: "Basic concepts and notation",
        videoId: "rgaTLrZGlk0",
        duration: "19:30",
        order: 1
      },
      {
        id: "music-2",
        title: "Scales and Key Signatures",
        description: "Understanding musical scales",
        videoId: "8eaW1asmlts",
        duration: "22:15",
        order: 2
      },
      {
        id: "music-3",
        title: "Chord Progressions",
        description: "Building harmonic foundations",
        videoId: "M8eItITv8QA",
        duration: "25:40",
        order: 3
      },
      {
        id: "music-4",
        title: "Melody and Rhythm",
        description: "Creating memorable melodies",
        videoId: "uC3P7jmMwXc",
        duration: "23:20",
        order: 4
      }
    ]
  }
];

export const getEnrolledCourses = (userCourseIds: string[]): Course[] => {
  return allCourses.filter(course => userCourseIds.includes(course.id));
};

export const getAvailableCourses = (userCourseIds: string[]): Course[] => {
  return allCourses.filter(course => !userCourseIds.includes(course.id));
};

export const getCourseById = (courseId: string): Course | undefined => {
  return allCourses.find(course => course.id === courseId);
};
