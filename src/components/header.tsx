"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Search, Menu, X, Shield, User, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const router = useRouter()
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"])
  const headerShadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.05)"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Сценарии", href: "/scenarios" },
    { name: "Аналитика", href: "/analytics" },
    { name: "Теория", href: "/theory" },
    { name: "О платформе", href: "/about" },
  ]

  return (
    <motion.header
      className="py-2 sm:py-3 md:py-4 sticky top-0 z-40 transition-all duration-200"
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
    >
      <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 sm:gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-base sm:text-lg md:text-xl font-medium tracking-tight flex items-center gap-1 sm:gap-2">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span>
              Police<span className="text-primary">Train</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {isSearchOpen ? (
            <motion.div
              className="relative"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "180px", opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="search"
                placeholder="Поиск..."
                className="w-full py-1.5 sm:py-2 pl-8 pr-4 bg-transparent border-b border-border focus:outline-none focus:border-primary text-sm"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          )}

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <AnimatePresence>
                {isNotificationsOpen && 
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="w-fit shadow-lg absolute top-12 sm:top-14 right-0">
                      <CardHeader className="p-3 sm:p-4 flex items-center gap-2 flex-row">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 rounded-md" />
                        <CardTitle className="text-center text-sm sm:text-base">Уведомления</CardTitle>
                      </div>
                      <button onClick={() => setIsNotificationsOpen(false)}>
                        <X className="w-4 h-4 font-bold hover:bg-gray-100 rounded-md mb-1 transition-all duration-500" />
                      </button>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4">
                        <p className="text-center text-xs sm:text-sm text-muted-foreground">Уведомлений нет</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <Button className="relative h-8 w-8 sm:h-9 sm:w-9" variant="ghost" size="icon" onClick={() => router.push("/profile")}>
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button className="text-xs h-8 sm:h-9 px-3 sm:px-4" onClick={() => router.push("/login")}>Войти</Button>
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white z-50 pt-16 sm:pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto w-[90%] flex flex-col">
              <nav className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base sm:text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-10 sm:h-11">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Уведомления
                </Button>

                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-10 sm:h-11" onClick={() => router.push("/profile")}>
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Профиль
                </Button>

                <Button className="w-full text-xs sm:text-sm h-10 sm:h-11" onClick={() => router.push("/login")}>Войти</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

