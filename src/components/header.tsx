"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Menu, X, Shield, User, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  const navItems = [
    { name: "Главная", href: "/" },
    { name: "Сценарии", href: "/scenarios" },
    { name: "Аналитика", href: "/analytics" },
    { name: "Теория", href: "/theory" },
    { name: "О платформе", href: "/about" },
  ]

  return (
    <motion.header
      className="py-3 md:py-4 sticky top-0 z-40 transition-all duration-200"
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
    >
      <div className="mx-auto w-[90%] md:w-[80%] max-w-7xl flex items-center justify-between">
        <motion.div
          className="flex items-center gap-4 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-xl font-medium tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span>
              Police<span className="text-primary">Train</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>

        <div className="flex items-center gap-2 md:gap-4">
          {isSearchOpen ? (
            <motion.div
              className="relative"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "240px", opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="search"
                placeholder="Поиск..."
                className="w-full py-2 pl-8 pr-4 bg-transparent border-b border-border focus:outline-none focus:border-primary text-sm"
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
              <Search className="h-5 w-5" />
            </motion.button>
          )}

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button>Войти</Button>
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-white z-50 pt-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mx-auto w-[90%] flex flex-col">
            <nav className="flex flex-col gap-4 mb-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-5 w-5 mr-2" />
                Уведомления
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <User className="h-5 w-5 mr-2" />
                Профиль
              </Button>

              <Button className="w-full">Войти</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

