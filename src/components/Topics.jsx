import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const TopicCard = ({ topic }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <div className={`p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 
                    transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden`}>
        {/* Background animation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform rotate-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400">
            {t(`topics.${topic.id}.title`)}
          </h3>
          <p className="text-white/80 mb-4">{t(`topics.${topic.id}.description`)}</p>
          
          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex gap-2"
          >
            <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-300 transition-colors">
              {t('topics.learnMore')}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Topics = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a1f] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with animated gradient */}
      <div className="fixed inset-0 bg-[#0a0a1f] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-blue-900/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/"
            className="text-white/80 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>←</span>
            <span>{t('topics.back')}</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            {t('topics.title')}
          </h1>
          <p className="text-lg text-white/60">
            {t('topics.selectTopic')}
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Topics;
