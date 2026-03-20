export const mockUser = {
  name: "Dr. Sarah",
  avatar: "S",
  email: "sarah@hospital.org",
  streak: 12,
  totalQuestions: 847,
  correctRate: 74,
  studyHours: 156,
  points: 2340,
  level: "Advanced",
};

export const mockSubjects = [
  { id: "1", name: "Neonatology", icon: "👶", questionCount: 245, progress: 62, color: "hsl(220 80% 64%)" },
  { id: "2", name: "Cardiology", icon: "❤️", questionCount: 189, progress: 45, color: "hsl(4 74% 55%)" },
  { id: "3", name: "Respiratory", icon: "🫁", questionCount: 156, progress: 78, color: "hsl(196 52% 50%)" },
  { id: "4", name: "Gastroenterology", icon: "🧬", questionCount: 134, progress: 30, color: "hsl(122 39% 49%)" },
  { id: "5", name: "Neurology", icon: "🧠", questionCount: 112, progress: 55, color: "hsl(280 60% 55%)" },
  { id: "6", name: "Infectious Disease", icon: "🦠", questionCount: 198, progress: 41, color: "hsl(36 100% 50%)" },
  { id: "7", name: "Hematology", icon: "🩸", questionCount: 98, progress: 20, color: "hsl(340 70% 55%)" },
  { id: "8", name: "Endocrinology", icon: "⚗️", questionCount: 87, progress: 68, color: "hsl(160 50% 45%)" },
];

export const mockBooks = [
  {
    id: "1",
    title: "Nelson Textbook of Pediatrics",
    author: "Kliegman et al.",
    edition: "22nd Ed.",
    chapters: 48,
    cover: "📘",
    progress: 35,
    rating: 4.8,
    color: "hsl(220 80% 64%)",
    chapterList: [
      { id: "1-1", name: "Growth & Development", questions: 24, priority: 3, completed: true },
      { id: "1-2", name: "Neonatal Medicine", questions: 32, priority: 3, completed: true },
      { id: "1-3", name: "Infectious Diseases", questions: 28, priority: 2, completed: false },
      { id: "1-4", name: "Cardiology", questions: 22, priority: 3, completed: false },
      { id: "1-5", name: "Respiratory Disorders", questions: 18, priority: 2, completed: false },
      { id: "1-6", name: "GI & Nutrition", questions: 20, priority: 1, completed: false },
      { id: "1-7", name: "Neurology", questions: 15, priority: 2, completed: false },
      { id: "1-8", name: "Hematology & Oncology", questions: 19, priority: 1, completed: false },
      { id: "1-9", name: "Endocrinology", questions: 14, priority: 1, completed: false },
      { id: "1-10", name: "Nephrology", questions: 12, priority: 2, completed: false },
      { id: "1-11", name: "Emergency Pediatrics", questions: 26, priority: 3, completed: false },
    ],
  },
  {
    id: "2",
    title: "Rudolph's Pediatrics",
    author: "Rudolph et al.",
    edition: "23rd Ed.",
    chapters: 42,
    cover: "📗",
    progress: 18,
    rating: 4.5,
    color: "hsl(122 39% 49%)",
    chapterList: [
      { id: "2-1", name: "General Pediatrics", questions: 20, priority: 2, completed: true },
      { id: "2-2", name: "Adolescent Medicine", questions: 15, priority: 1, completed: false },
      { id: "2-3", name: "Allergy & Immunology", questions: 18, priority: 2, completed: false },
      { id: "2-4", name: "Genetics", questions: 12, priority: 1, completed: false },
    ],
  },
  {
    id: "3",
    title: "Lange Q&A: Pediatrics",
    author: "Jackson & Palley",
    edition: "8th Ed.",
    chapters: 20,
    cover: "📙",
    progress: 52,
    rating: 4.2,
    color: "hsl(36 100% 50%)",
    chapterList: [
      { id: "3-1", name: "Preventive Pediatrics", questions: 30, priority: 3, completed: true },
      { id: "3-2", name: "Newborn Infant", questions: 25, priority: 3, completed: true },
      { id: "3-3", name: "Developmental Pediatrics", questions: 22, priority: 2, completed: false },
    ],
  },
  {
    id: "4",
    title: "Palliative Care in Pediatrics",
    author: "Palliative Care Group",
    edition: "1st Ed.",
    chapters: 15,
    cover: "📕",
    progress: 0,
    rating: 3.9,
    color: "hsl(4 74% 55%)",
    chapterList: [
      { id: "4-1", name: "Introduction to Palliative Care", questions: 10, priority: 1, completed: false },
      { id: "4-2", name: "Pain Management", questions: 14, priority: 2, completed: false },
    ],
  },
  {
    id: "5",
    title: "Palliative Care in Pediatrics",
    author: "Harper & Row",
    edition: "5th Ed.",
    chapters: 30,
    cover: "📓",
    progress: 10,
    rating: 4.0,
    color: "hsl(280 60% 55%)",
    chapterList: [
      { id: "5-1", name: "Symptom Management", questions: 16, priority: 2, completed: false },
      { id: "5-2", name: "Ethics in Pediatric Care", questions: 12, priority: 1, completed: false },
    ],
  },
];

export const mockQuestions = [
  {
    id: "1",
    text: "A 3-year-old child presents with a barking cough, inspiratory stridor, and mild intercostal retractions. What is the most likely diagnosis?",
    options: ["Epiglottitis", "Croup (Laryngotracheobronchitis)", "Foreign body aspiration", "Bacterial tracheitis"],
    correctIndex: 1,
    explanation: "Croup is the most common cause of acute stridor in children aged 6 months to 3 years. It presents with a barking cough, inspiratory stridor, and hoarseness, often preceded by URI symptoms. Epiglottitis typically presents with drooling and high fever.",
    subject: "Respiratory",
    difficulty: "Medium",
    tags: ["Respiratory", "Emergency", "Common"],
  },
  {
    id: "2",
    text: "What is the most common congenital heart defect?",
    options: ["Tetralogy of Fallot", "Ventricular Septal Defect (VSD)", "Atrial Septal Defect (ASD)", "Patent Ductus Arteriosus"],
    correctIndex: 1,
    explanation: "VSD accounts for approximately 25-30% of all congenital heart defects, making it the most common. Many small VSDs close spontaneously during the first few years of life.",
    subject: "Cardiology",
    difficulty: "Easy",
    tags: ["Cardiology", "Congenital"],
  },
  {
    id: "3",
    text: "A newborn has bilious vomiting within the first 24 hours of life. What is the most critical diagnosis to rule out?",
    options: ["Pyloric stenosis", "Midgut volvulus", "Hirschsprung disease", "Necrotizing enterocolitis"],
    correctIndex: 1,
    explanation: "Bilious vomiting in a neonate is a surgical emergency until proven otherwise. Midgut volvulus must be ruled out immediately as it can lead to bowel necrosis. An upper GI series is the diagnostic study of choice.",
    subject: "Neonatology",
    difficulty: "Hard",
    tags: ["Neonatology", "Surgery", "Emergency"],
  },
];

export const mockSchedule = {
  totalWeeks: 13,
  currentWeek: 4,
  weeks: [
    { week: 1, topic: "Growth & Development", completed: true, sessions: 5, total: 5, dates: "Jan 6 – Jan 12", studyTime: "4h 30m" },
    { week: 2, topic: "Neonatology Basics", completed: true, sessions: 6, total: 6, dates: "Jan 13 – Jan 19", studyTime: "5h 15m" },
    { week: 3, topic: "Infectious Diseases", completed: true, sessions: 4, total: 4, dates: "Jan 20 – Jan 26", studyTime: "3h 45m" },
    { week: 4, topic: "Cardiology", completed: false, sessions: 3, total: 5, dates: "Jan 27 – Feb 2", studyTime: "2h 10m" },
    { week: 5, topic: "Respiratory Disorders", completed: false, sessions: 0, total: 5, dates: "Feb 3 – Feb 9", studyTime: "0m" },
    { week: 6, topic: "GI & Nutrition", completed: false, sessions: 0, total: 6, dates: "Feb 10 – Feb 16", studyTime: "0m" },
    { week: 7, topic: "Neurology", completed: false, sessions: 0, total: 4, dates: "Feb 17 – Feb 23", studyTime: "0m" },
    { week: 8, topic: "Hematology & Oncology", completed: false, sessions: 0, total: 5, dates: "Feb 24 – Mar 2", studyTime: "0m" },
    { week: 9, topic: "Endocrinology", completed: false, sessions: 0, total: 4, dates: "Mar 3 – Mar 9", studyTime: "0m" },
    { week: 10, topic: "Nephrology", completed: false, sessions: 0, total: 5, dates: "Mar 10 – Mar 16", studyTime: "0m" },
    { week: 11, topic: "Immunology & Allergy", completed: false, sessions: 0, total: 4, dates: "Mar 17 – Mar 23", studyTime: "0m" },
    { week: 12, topic: "Emergency Pediatrics", completed: false, sessions: 0, total: 6, dates: "Mar 24 – Mar 30", studyTime: "0m" },
    { week: 13, topic: "Comprehensive Review", completed: false, sessions: 0, total: 8, dates: "Mar 31 – Apr 6", studyTime: "0m" },
  ],
};

export const mockBookmarks = [
  { id: "1", questionId: "1", subject: "Respiratory", text: "Barking cough diagnosis...", date: "2 days ago" },
  { id: "2", questionId: "3", subject: "Neonatology", text: "Bilious vomiting in newborn...", date: "5 days ago" },
];

export const mockHistory = [
  { date: "Today", sessions: 2, questions: 24, correct: 18, time: "45 min" },
  { date: "Yesterday", sessions: 3, questions: 36, correct: 28, time: "1h 12min" },
  { date: "Mar 18", sessions: 1, questions: 15, correct: 11, time: "28 min" },
];

export const mockPerformanceData = [
  { month: "Oct", score: 58 },
  { month: "Nov", score: 62 },
  { month: "Dec", score: 65 },
  { month: "Jan", score: 70 },
  { month: "Feb", score: 74 },
  { month: "Mar", score: 78 },
];

export const mockRecentChapters = [
  { id: "1-3", bookTitle: "Nelson Textbook", chapterName: "Infectious Diseases", lastAccessed: "2 hours ago", progress: 45 },
  { id: "3-1", bookTitle: "Lange Q&A", chapterName: "Preventive Pediatrics", lastAccessed: "Yesterday", progress: 80 },
  { id: "1-1", bookTitle: "Nelson Textbook", chapterName: "Growth & Development", lastAccessed: "3 days ago", progress: 100 },
];

export const mockPearlOfDay = {
  title: "Pearl of the Day",
  content: "In neonatal jaundice, phototherapy converts unconjugated bilirubin into water-soluble photoisomers that can be excreted without hepatic conjugation. The most effective wavelength is blue-green light (460–490 nm).",
  subject: "Neonatology",
  icon: "💡",
};

export const mockReminders = [
  { id: "1", time: "08:00", repeat: "Daily", message: "Time to study! Start your morning session 📚", enabled: true },
  { id: "2", time: "14:00", repeat: "Weekdays", message: "Afternoon review — keep the streak going! 🔥", enabled: true },
  { id: "3", time: "20:00", repeat: "Daily", message: "Evening flashcards before bed 🌙", enabled: false },
];

export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};
