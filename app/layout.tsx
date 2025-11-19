"use client"

import './globals.css'
import ClientOnly from '@/components/ClientOnly'
import { AnimatedLayout } from '@/components/providers/animated-layout'
import { SmoothScroll } from '@/components/smooth-scroll'
import { motion, useScroll, useSpring } from 'framer-motion'

// Using Google Fonts via CSS import instead of next/font

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  })

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientOnly>
          <SmoothScroll>
            <motion.div
              className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-orange-400 to-amber-400"
              style={{ scaleX }}
            />
            <AnimatedLayout>
              {children}
            </AnimatedLayout>
          </SmoothScroll>
        </ClientOnly>
      </body>
    </html>
  )
}
