export interface ChapterCompletion {
  id: string;
  bookId: string;
  chapterId: string;
  studyCount: number;
  medalLevel: string;
  lastCompletedAt: string;
}

export interface MedalInfo {
  level: string;
  icon: string;
  color: string;
  message: string;
}
