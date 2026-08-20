import { motion } from "framer-motion";
import {
  PenSquare,
  ShieldCheck,
  FileText,
  Activity,
} from "lucide-react";

import GlassCard from "./GlassCard";

const actions = [
  {
    title: "Create Post",
    description: "Publish a new update",
    icon: <PenSquare size={28} />,
  },
  {
    title: "Authentication",
    description: "JWT Session Active",
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "Posts",
    description: "Manage your content",
    icon: <FileText size={28} />,
  },
  {
    title: "Activity",
    description: "View timeline",
    icon: <Activity size={28} />,
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {actions.map((action, index) => (

        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >

          <GlassCard
            className="
            p-6
            cursor-pointer
            transition-all
            duration-300
            hover:scale-[1.02]
            "
          >

            <div className="text-yellow-500">

              {action.icon}

            </div>

            <h3 className="mt-6 text-xl font-semibold">

              {action.title}

            </h3>

            <p className="mt-2 text-zinc-500">

              {action.description}

            </p>

          </GlassCard>

        </motion.div>

      ))}

    </div>
  );
}