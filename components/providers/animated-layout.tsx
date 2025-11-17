'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../ui/page-transition'

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // After first load, we can show the page transition
      if (isFirstLoad) {
        const timer2 = setTimeout(() => {
          setIsFirstLoad(false)
        }, 500)
        return () => clearTimeout(timer2)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isFirstLoad])

  // Loading animation
  if (isLoading) {
    return (
      <div className="bg-background flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-foreground font-medium"
          >
            Carregando...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {isFirstLoad ? (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      )}
    </>
  )
}
