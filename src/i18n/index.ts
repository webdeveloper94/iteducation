import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Information Technology Basics',
      description: 'Interactive learning platform for mastering the fundamentals of Information Technology',
      showTopics: 'Explore Topics',
      topics: 'Topics',
      presentation: 'Presentation',
      videoLesson: 'Video Lesson',
      test: 'Test',
      slides: 'Slides',
    },
  },
  uz: {
    translation: {
      title: 'Axborot texnologiyalari asoslari',
      description: 'Axborot texnologiyalari asoslarini o\'rganish uchun interaktiv ta\'lim platformasi',
      showTopics: 'Mavzularni ko\'rish',
      topics: 'Mavzular',
      presentation: 'Taqdimot',
      videoLesson: 'Video dars',
      test: 'Test',
      slides: 'Slaydlar',
    },
  },
  ru: {
    translation: {
      title: 'Основы информационных технологий',
      description: 'Интерактивная платформа для изучения основ информационных технологий',
      showTopics: 'Показать темы',
      topics: 'Темы',
      presentation: 'Презентация',
      videoLesson: 'Видео урок',
      test: 'Тест',
      slides: 'Слайды',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
