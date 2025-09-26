import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CalendarCheck2, MapPin, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Itinerary Management",
    description: "Plan trips with ease using our intuitive itinerary tools.",
    icon: ClipboardList,
  },
  {
    title: "Booking & Reservation System",
    description: "Manage flights, hotels, and transport all in one place.",
    icon: CalendarCheck2,
  },
  {
    title: "Real-Time Tracking",
    description: "Track tours, schedules, and guides on the go.",
    icon: MapPin,
  },
  {
    title: "Reports & Analytics",
    description: "Get powerful insights designed for travel agencies.",
    icon: BarChart3,
  },
];

export default function WhatWeOffer() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl lg:text-4xl font-bold mb-4">
          What We Offer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg mb-12 max-w-lg mx-auto text-gray-500 dark:text-gray-300 font-semibold"
        >
          Everything you need to streamline your tour operations and provide the best experience.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-md hover:shadow-xl border-0 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-300 font-semibold">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
