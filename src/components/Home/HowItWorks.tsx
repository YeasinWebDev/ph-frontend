import { PlusCircle, Users, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Timeline, TimelineContent, TimelineHeader, TimelineTitle, TimelineIndicator, TimelineItem, TimelineSeparator } from "../ui/timeline";
import Tour from "@/assets/images/tour.png";


const steps = [
  {
    id: 1,
    title: "Create Tour",
    description: "Add destinations, dates, and pricing in just a few clicks.",
    icon: PlusCircle,
  },
  {
    id: 2,
    title: "Manage Bookings",
    description: "Handle customers, guides, and resources seamlessly.",
    icon: Users,
  },
  {
    id: 3,
    title: "Track & Optimize",
    description: "Monitor tours in real-time and generate insightful reports.",
    icon: LineChart,
  },
];

export default function HowItWorksTimeline() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left flex items-center justify-center"
        >
          How TripTrack Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mb-12 text-center text-gray-700 dark:text-gray-300 max-w-xl mx-auto font-semibold"
        >
          TripTrack simplifies tour management from start to finish. Plan, organize, and track your tours effortlessly.
        </motion.p>

        <div className="lg:flex lg:items-center lg:gap-12">
          {/* Timeline */}
          <div className="lg:w-1/2">
            <Timeline defaultValue={3}>
              {steps.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: item.id * 0.2 }}
                  viewport={{ once: true }}
                >
                  <TimelineItem step={item.id} className="group-data-[orientation=vertical]/timeline:ms-10 mb-8">
                    <TimelineHeader>
                      <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                      <TimelineTitle className="mt-0.5 text-2xl font-semibold">{item.title}</TimelineTitle>
                      <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-10 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7 mt-2">
                        <item.icon size={24} />
                      </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent className="text-lg text-gray-700 dark:text-gray-300">{item.description}</TimelineContent>
                  </TimelineItem>
                </motion.div>
              ))}
            </Timeline>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <motion.img
              src={Tour}
              alt="Tour illustration"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
