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

const sections = ["Startseite", "Unsere Leistungen", "Uber uns", "Kontakt"]

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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
    { name: "Haushaltsreinigung", image: service1 },
    { name: "Gewerbereinigung", image: service2 },
    { name: "Grundreinigung", image: service3 },
    { name: "Ein-/Auszugsreinigung", image: service4 },
    { name: "Baureinigung", image: service5 },
    { name: "Spezialreinigung", image: service6 },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c729b91e-896e-449b-bde0-6ab100072ffb",
          ...formData,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", message: "" }) // Reset form
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed w-[90%] md:w-[40%] flex justify-center items-center top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-full shadow-md">
        <ul className="flex p-1">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className={`px-2 sm:px-4 py-2 rounded-full line-clamp-2 text-center text-xs sm:text-sm font-medium transition-colors ${
                  activeSection === section ? "text-black" : "text-gray-600 hover:text-primary"
                }`}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="startseite"
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Sauberkeit ist ein Lebensstil</h1>
          <p className="text-lg sm:text-xl">Erleben Sie den Unterschied mit unseren professionellen Reinigungsdienstleistungen</p>
        </motion.div>
      </section>

      <section
        id="unsere%20leistungen"
        ref={(el: any) => (sectionRefs.current[1] = el)}
        className="min-h-screen flex items-center justify-center bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Unsere Leistungen</h2>
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
                    <p className="text-gray-600">Professionelle {service.name.toLowerCase()} auf Ihre Bedürfnisse zugeschnitten.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="uber%20uns"
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
            <h2 className="text-3xl font-bold mb-8 text-center">Über uns</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg mb-4">
              Bei CleanLife Services glauben wir, dass eine saubere Umgebung für ein glückliches und gesundes Leben unerlässlich ist. Unser Team engagierter Fachleute ist bestrebt, erstklassige Reinigungsdienstleistungen zu erbringen, die Ihre Erwartungen übertreffen.
              </p>
              <p className="text-lg mb-4">
              Mit jahrelanger Erfahrung in der Branche haben wir uns einen Ruf für Zuverlässigkeit, Liebe zum Detail und Kundenzufriedenheit erworben. Wir verwenden umweltfreundliche Reinigungsprodukte und modernste Ausrüstung, um die besten Ergebnisse für Ihr Zuhause oder Unternehmen zu gewährleisten.
              </p>
              <p className="text-lg">
              Wählen Sie CleanLife Services für einen saubereren, gesünderen und komfortableren Wohn- oder Arbeitsbereich. Erleben Sie den Unterschied, den professionelle Reinigung in Ihrem Leben machen kann!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="kontakt"
        ref={(el: any) => (sectionRefs.current[3] = el)}
        className="min-h-screen relative flex items-center justify-center bg-white py-16"
        >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Angebot anfordern</h2>
          {submitSuccess ? (
            <div className="max-w-md mx-auto text-center p-4 bg-green-100 text-green-700 rounded-md">
              Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze bei Ihnen melden.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    name="name"
                    type="text"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    required
                    name="email"
                    type="email"
                    placeholder="Ihre E-mail Adresse"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Erzählen Sie uns von Ihren Reinigungsbedürfnissen"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Angebot anfordern"}
                </Button>
              </div>
            </form>
          )}
        </div>
          <p className="text-black absolute left-[50%] translate-x-[-50%] bottom-5">&#169; 2025 Created by B.A</p>
      </section>
    </div>
  )
}

