import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import VideoModal from './VideoModal';
import PresentationModal from './PresentationModal';
import QuizModal from './QuizModal';

// Topics data
const topics = [
  {
    id: 'kompyuter-tarixi',
    title: 'Kompyuter tarixi',
    description: 'Kompyuterning paydo bo`lishi va rivojlanish tarixi',
    icon: '🖥️',
    color: 'from-blue-500 to-blue-600',
    videoUrl: 'https://youtu.be/SC6jwsyLq-w?si=vvypbMbZz_0HSSjq',
    pdfUrl: '/presentations/kompyuter-tarixi.pdf',
    keyPoints: [
      'Kompyuterning paydo bo`lishi',
      'Birinchi kompyuterlar',
      'Kompyuter avlodlari',
      'Zamonaviy kompyuterlar'
    ]
  },
  {
    id: 'kompyuter-qurilmalari',
    title: 'Kompyuter qurilmalari',
    description: 'Kompyuterning asosiy va qo`shimcha qurilmalari',
    icon: '🔧',
    color: 'from-purple-500 to-purple-600',
    videoUrl: '/videos/kompyuter-qurilmalari.mp4',
    pdfUrl: '/presentations/kompyuter-qurilmalari.pdf',
    keyPoints: [
      'Asosiy qurilmalar',
      'Kiritish qurilmalari',
      'Chiqarish qurilmalari',
      'Saqlash qurilmalari'
    ]
  },
  {
    id: 'operatsion-tizimlar',
    title: 'Operatsion tizimlar',
    description: 'Operatsion tizimlar va ularning turlari',
    icon: '💻',
    color: 'from-green-500 to-green-600',
    videoUrl: '/videos/operatsion-tizimlar.mp4',
    pdfUrl: '/presentations/operatsion-tizimlar.pdf',
    keyPoints: [
      'Windows',
      'Linux',
      'MacOS',
      'Mobil operatsion tizimlar'
    ]
  },
  {
    id: 'dasturiy-taminot',
    title: 'Dasturiy ta`minot',
    description: 'Kompyuter dasturlari va ularning turlari',
    icon: '📊',
    color: 'from-yellow-500 to-yellow-600',
    videoUrl: '/videos/dasturiy-taminot.mp4',
    pdfUrl: '/presentations/dasturiy-taminot.pdf',
    keyPoints: [
      'Tizimli dasturlar',
      'Amaliy dasturlar',
      'Dasturlash tillari',
      'Dasturiy ta`minot litsenziyalari'
    ]
  },
  {
    id: 'internet-texnologiyalari',
    title: 'Internet texnologiyalari',
    description: 'Internet tarmog`i va uning ishlash printsiplari',
    icon: '🌐',
    color: 'from-blue-400 to-indigo-500',
    videoUrl: '/videos/internet-texnologiyalari.mp4',
    pdfUrl: '/presentations/internet-texnologiyalari.pdf',
    keyPoints: [
      'Internet tarixi',
      'TCP/IP protokoli',
      'DNS serverlari',
      'Internet xavfsizligi'
    ]
  },
  {
    id: 'axborot-xavfsizligi',
    title: 'Axborot xavfsizligi',
    description: 'Kompyuter va internet xavfsizligi asoslari',
    icon: '🔒',
    color: 'from-red-500 to-red-600',
    videoUrl: '/videos/axborot-xavfsizligi.mp4',
    pdfUrl: '/presentations/axborot-xavfsizligi.pdf',
    keyPoints: [
      'Parollar xavfsizligi',
      'Viruslar va antiviruslar',
      'Xakerlik hujumlari',
      'Ma`lumotlarni himoyalash'
    ]
  },
  {
    id: 'dasturlash-asoslari',
    title: 'Dasturlash asoslari',
    description: 'Dasturlash tillari va algoritmlash asoslari',
    icon: '👨‍💻',
    color: 'from-green-400 to-emerald-500',
    videoUrl: '/videos/dasturlash-asoslari.mp4',
    pdfUrl: '/presentations/dasturlash-asoslari.pdf',
    keyPoints: [
      'Algoritmlar',
      'Dasturlash tillari turlari',
      'Ma`lumotlar tuzilmasi',
      'Dasturlash paradigmalari'
    ]
  },
  {
    id: 'sun`iy-intellekt',
    title: 'Sun`iy intellekt',
    description: 'Sun`iy intellekt va mashinali o`rganish asoslari',
    icon: '🤖',
    color: 'from-purple-400 to-pink-500',
    videoUrl: '/videos/suniy-intellekt.mp4',
    pdfUrl: '/presentations/suniy-intellekt.pdf',
    keyPoints: [
      'Sun`iy intellekt tarixi',
      'Mashinali o`rganish',
      'Neyron tarmoqlar',
      'AI ilovalar'
    ]
  },
  {
    id: 'ma`lumotlar-bazasi',
    title: 'Ma`lumotlar bazasi',
    description: 'Ma`lumotlar bazasi va ularni boshqarish tizimlari',
    icon: '💾',
    color: 'from-orange-400 to-orange-500',
    videoUrl: '/videos/malumotlar-bazasi.mp4',
    pdfUrl: '/presentations/malumotlar-bazasi.pdf',
    keyPoints: [
      'Relyatsion bazalar',
      'SQL tili',
      'NoSQL bazalar',
      'Ma`lumotlar modellashtirish'
    ]
  },
  {
    id: 'mobil-dasturlash',
    title: 'Mobil dasturlash',
    description: 'Mobil ilovalar yaratish texnologiyalari',
    icon: '📱',
    color: 'from-cyan-400 to-cyan-500',
    videoUrl: '/videos/mobil-dasturlash.mp4',
    pdfUrl: '/presentations/mobil-dasturlash.pdf',
    keyPoints: [
      'Android dasturlash',
      'iOS dasturlash',
      'Cross-platform dasturlash',
      'Mobil UX/UI'
    ]
  }
];

const TopicContent = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false);
  const { t } = useTranslation();
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#0a0a1f] flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">{t('notFound.title')}</h2>
          <Link 
            to="/topics"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('notFound.backToTopics')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      {/* Background with animated gradient */}
      <div className="fixed inset-0 bg-[#0a0a1f] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-blue-900/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/topics"
                className="text-white/80 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span>←</span>
                <span>{t('buttons.back')}</span>
              </Link>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {t(`topics.${topic.id}.title`)}
              </h1>
              <div className="w-24" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Topic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl">{topic.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{t(`topics.${topic.id}.title`)}</h2>
                <p className="text-lg text-white/80 mb-6">{t(`topics.${topic.id}.description`)}</p>
                <div className="flex flex-wrap gap-4">
                  {topic.keyPoints.map((point, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/10 text-blue-200/80"
                    >
                      {point}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t('buttons.watchVideo'),
                description: t('buttons.watchVideoDescription'),
                icon: "🎥",
                action: () => setActiveModal('video'),
                color: "from-blue-600 to-blue-400"
              },
              {
                title: t('buttons.viewPresentation'),
                description: t('buttons.viewPresentationDescription'),
                icon: "📑",
                action: () => setIsPresentationModalOpen(true),
                color: "from-purple-600 to-purple-400"
              },
              {
                title: t('buttons.takeQuiz'),
                description: t('buttons.takeQuizDescription'),
                icon: "✅",
                action: () => setActiveModal('quiz'),
                color: "from-green-600 to-green-400"
              }
            ].map((button, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={button.action}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {button.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white mb-1">{button.title}</h3>
                    <p className="text-white/60">{button.description}</p>
                  </div>
                </div>
                <div className={`mt-4 h-1 bg-gradient-to-r ${button.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full`} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <VideoModal
        isOpen={activeModal === 'video'}
        onClose={() => setActiveModal(null)}
        videoUrl={topic.videoUrl}
      />
      <PresentationModal
        isOpen={isPresentationModalOpen}
        onClose={() => setIsPresentationModalOpen(false)}
        pdfUrl={`${window.location.origin}${topic.pdfUrl}`}
      />
      <QuizModal
        isOpen={activeModal === 'quiz'}
        onClose={() => setActiveModal(null)}
        topicId={topic.id}
      />
    </div>
  );
};

export default TopicContent;
