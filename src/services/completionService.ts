import { ChapterCompletion, MedalInfo } from "@/types/completion";

const STORAGE_KEY = "chapter_completions";

function getAll(): ChapterCompletion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(completions: ChapterCompletion[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completions));
}

export function getMedalForCount(count: number): MedalInfo {
  if (count >= 6) return { level: "master", icon: "👑", color: "#9B59B6", message: "Absolute legend!" };
  if (count >= 5) return { level: "diamond", icon: "💎", color: "#4ECDC4", message: "Mastery level!" };
  if (count >= 4) return { level: "platinum", icon: "💎", color: "#E5E4E2", message: "Amazing dedication!" };
  if (count >= 3) return { level: "gold", icon: "🥇", color: "#FFD700", message: "Excellent!" };
  if (count >= 2) return { level: "silver", icon: "🥈", color: "#C0C0C0", message: "Keep going!" };
  return { level: "bronze", icon: "🥉", color: "#CD7F32", message: "Great start!" };
}

export function getChapterCompletion(bookId: string, chapterId: string): ChapterCompletion | null {
  const all = getAll();
  return all.find((c) => c.bookId === bookId && c.chapterId === chapterId) || null;
}

export function incrementCompletion(bookId: string, chapterId: string): {
  studyCount: number;
  medalLevel: string;
  isNewMedal: boolean;
} {
  const all = getAll();
  const existing = all.find((c) => c.bookId === bookId && c.chapterId === chapterId);

  if (existing) {
    const oldMedal = existing.medalLevel;
    existing.studyCount += 1;
    const medal = getMedalForCount(existing.studyCount);
    existing.medalLevel = medal.level;
    existing.lastCompletedAt = new Date().toISOString();
    saveAll(all);
    return { studyCount: existing.studyCount, medalLevel: medal.level, isNewMedal: medal.level !== oldMedal };
  }

  const medal = getMedalForCount(1);
  const newCompletion: ChapterCompletion = {
    id: `${bookId}-${chapterId}`,
    bookId,
    chapterId,
    studyCount: 1,
    medalLevel: medal.level,
    lastCompletedAt: new Date().toISOString(),
  };
  all.push(newCompletion);
  saveAll(all);
  return { studyCount: 1, medalLevel: medal.level, isNewMedal: true };
}

export function getMedalIcon(medalLevel: string): string {
  const medals: Record<string, string> = {
    bronze: "🥉",
    silver: "🥈",
    gold: "🥇",
    platinum: "💎",
    diamond: "💎",
    master: "👑",
  };
  return medals[medalLevel] || "";
}

export function getMedalColorClass(medalLevel: string): string {
  const colors: Record<string, string> = {
    bronze: "text-amber-600",
    silver: "text-gray-400",
    gold: "text-yellow-500",
    platinum: "text-gray-300",
    diamond: "text-cyan-400",
    master: "text-purple-500",
  };
  return colors[medalLevel] || "";
}
