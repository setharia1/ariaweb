'use client';

import { motion } from 'framer-motion';

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
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{icon}</div>
      <h3 className="font-serif text-xl font-semibold t-strong mb-3">
        {title}
      </h3>
      <p className="t-muted text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
