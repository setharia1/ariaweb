'use client';

import { motion } from 'framer-motion';
import { Hammer, Handshake, Banknote, LineChart, ArrowRight } from 'lucide-react';

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function PillarCard({ title, description, icon }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        stiffness: 140,
        damping: 20
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className="card card-hover p-6 glowable group glint"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
        {icon === '🛠️' && <Hammer className="w-6 h-6" />}
        {icon === '🤝' && <Handshake className="w-6 h-6" />}
        {icon === '💸' && <Banknote className="w-6 h-6" />}
        {icon === '📈' && <LineChart className="w-6 h-6" />}
      </div>
      <h3 className="font-serif text-xl font-semibold t-strong mb-3">
        {title}
      </h3>
      <p className="t-muted text-sm leading-relaxed">
        {description}
      </p>
      <a href="#our-process" className="mt-3 inline-flex items-center gap-1 text-accent-a text-sm group-hover:underline">
        Learn more <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}
