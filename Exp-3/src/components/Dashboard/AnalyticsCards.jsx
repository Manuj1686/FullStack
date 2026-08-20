import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import GlassCard from "./GlassCard";

export default function AnalyticsCards({
  posts,
  activity,
}) {
  const cards = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: <FileText size={28} />,
      color: "text-yellow-500",
    },
    {
      title: "Activity Events",
      value: activity.length,
      icon: <Activity size={28} />,
      color: "text-blue-400",
    },
    {
      title: "Security",
      value: "Secure",
      icon: <ShieldCheck size={28} />,
      color: "text-green-400",
    },
    {
      title: "Performance",
      value: "99%",
      icon: <TrendingUp size={28} />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-4">

      {cards.map((card, index) => (

        <motion.div
          key={card.title}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
          }}
        >

          <GlassCard className="p-7">

            <div className={card.color}>

              {card.icon}

            </div>

            <h3 className="mt-7 text-lg font-medium text-zinc-400">

              {card.title}

            </h3>

            <p className="mt-2 text-4xl font-bold">

              {card.value}

            </p>

          </GlassCard>

        </motion.div>

      ))}

    </div>
  );
}