export interface Topic {
  id: number;
  title: {
    en: string;
    uz: string;
    ru: string;
  };
  content: {
    presentation: string;
    videoUrl: string;
    slides: string[];
    test: Test[];
  };
}

export interface Test {
  question: {
    en: string;
    uz: string;
    ru: string;
  };
  options: {
    en: string[];
    uz: string[];
    ru: string[];
  };
  correctAnswer: number;
}

export type Language = 'en' | 'uz' | 'ru';
