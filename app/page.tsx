"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import service1 from "../public/service1.jpg"
import service2 from "../public/service2.jpg"
import service3 from "../public/service3.jpg"
import service4 from "../public/service4.jpeg"
import service5 from "../public/service5.jpg"
import service6 from "../public/service6.jpg"
import banner from "../public/banner.jpg"
import aboutus from "../public/aboutus.jpeg"

const sections = ["Home", "Services", "About", "Contact"]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
}

export default function CleaningServices() {
  const [activeSection, setActiveSection] = useState("Home")
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    { name: "Residential Cleaning", image: service1 },
    { name: "Commercial Cleaning", image: service2 },
    { name: "Deep Cleaning", image: service3 },
    { name: "Move-in/Move-out Cleaning", image: service4 },
    { name: "Post-Construction Cleaning", image: service5 },
    { name: "Specialized Cleaning", image: service6 },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-md">
        <ul className="flex p-1">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className={`px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  activeSection === section ? "bg-primary text-primary-foreground" : "text-gray-600 hover:text-primary"
                }`}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="home"
        ref={(el: any) => (sectionRefs.current[0] = el)}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <Image
          src={banner}
          alt="Cleaning service background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cleanliness is a Lifestyle</h1>
          <p className="text-lg sm:text-xl">Experience the difference with our professional cleaning services</p>
        </motion.div>
      </section>

      <section
        id="services"
        ref={(el: any) => (sectionRefs.current[1] = el)}
        className="min-h-screen flex items-center justify-center bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={hoverScale}
              >
                <Card className="overflow-hidden h-full">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600">Professional {service.name.toLowerCase()} tailored to your needs.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el: any) => (sectionRefs.current[2] = el)}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={aboutus}
            alt="About us background"
            layout="fill"
            objectFit="cover"
            className="parallax-bg"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg mb-4">
                At CleanLife Services, we believe that a clean environment is essential for a happy and healthy life.
                Our team of dedicated professionals is committed to delivering top-notch cleaning services that exceed
                your expectations.
              </p>
              <p className="text-lg mb-4">
                With years of experience in the industry, we have developed a reputation for reliability, attention to
                detail, and customer satisfaction. We use eco-friendly cleaning products and state-of-the-art equipment
                to ensure the best results for your home or business.
              </p>
              <p className="text-lg">
                Choose CleanLife Services for a cleaner, healthier, and more comfortable living or working space.
                Experience the difference that professional cleaning can make in your life!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={(el: any) => (sectionRefs.current[3] = el)}
        className="min-h-screen flex items-center justify-center bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Get a Quote</h2>
          <form className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <select id="service" className="w-full p-2 border rounded">
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name.toLowerCase().replace(/\s+/g, "-")}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your cleaning needs" />
              </div>
              <Button type="submit" className="w-full">
                Request Quote
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

