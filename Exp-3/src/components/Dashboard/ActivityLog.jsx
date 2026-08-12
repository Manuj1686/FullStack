import { motion } from "framer-motion";
import {
  LogIn,
  LogOut,
  FilePlus,
  Trash2,
  Activity,
} from "lucide-react";

import GlassCard from "./GlassCard";

export default function ActivityLog({ activity }) {

  function getIcon(message) {

    if (message.toLowerCase().includes("logged in")) {
      return <LogIn size={18} className="text-green-400" />;
    }

    if (message.toLowerCase().includes("logged out")) {
      return <LogOut size={18} className="text-red-400" />;
    }

    if (message.toLowerCase().includes("created")) {
      return <FilePlus size={18} className="text-yellow-500" />;
    }

    if (message.toLowerCase().includes("deleted")) {
      return <Trash2 size={18} className="text-red-500" />;
    }

    return <Activity size={18} className="text-blue-400" />;
  }

  return (
    <GlassCard className="p-7 h-fit">

      <h2 className="mb-8 text-2xl font-bold">
        Activity Timeline
      </h2>

      {activity.length === 0 ? (

        <div className="py-10 text-center">

          <Activity
            size={42}
            className="mx-auto text-zinc-600"
          />

          <p className="mt-5 text-zinc-500">

            No activity yet.

          </p>

        </div>

      ) : (

        <div className="relative">

          {/* Timeline */}

          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-white/10"></div>

          <div className="space-y-8">

            {activity.map((item, index) => (

              <motion.div

                key={item.id}

                initial={{
                  opacity: 0,
                  x: 20,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  delay: index * .05,
                }}

                className="relative flex gap-5"

              >

                {/* Icon */}

                <div
                  className="
                  relative
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#1a1a1a]
                  "
                >

                  {getIcon(item.message)}

                </div>

                {/* Text */}

                <div className="flex-1">

                  <p className="font-medium text-white">

                    {item.message}

                  </p>

                  <p className="mt-1 text-sm text-zinc-500">

                    {item.time}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      )}

    </GlassCard>
  );
}