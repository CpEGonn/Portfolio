import { motion } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'

const contactLinks = [
  {
    label: 'Email',
    value: 'markerin.gonzalvo22@gmail.com',
    href: 'mailto:markerin.gonzalvo22@gmail.com',
    icon: SiGmail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mark-erin-gonzalvo-a7bb74366',
    href: 'https://www.linkedin.com/in/mark-erin-gonzalvo-a7bb74366/',
    icon: FaLinkedinIn,
  },
  {
    label: 'GitHub',
    value: 'github.com/CpEGonn',
    href: 'https://github.com/CpEGonn',
    icon: FaGithub,
  },
  {
    label: 'WhatsApp',
    value: '+63 910 843 3599',
    href: 'https://wa.me/639108433599',
    icon: FaWhatsapp,
  },
]

function ContactSection() {
  return (
    <section id="contact" className="border-border scroll-mt-28 border-t py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="bg-card border-border text-muted inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-sm">
            <Mail size={16} className="text-primary" />
            <span>Contact</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-primary text-3xl font-semibold tracking-tight sm:text-4xl">
              Get in touch.
            </h2>
            <p className="text-muted max-w-xl text-base leading-8">
              Email or reach out through the platforms below.
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-5xl gap-3 sm:grid-cols-2">
          {contactLinks.map((item) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="bg-card border-border hover:bg-surface group flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 transition-[background-color,border-color,color,transform] duration-150"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="bg-surface border-border text-primary group-hover:bg-card inline-flex rounded-2xl border p-3 transition-[background-color,border-color,color] duration-150">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-primary text-xs font-semibold uppercase tracking-[0.16em]">
                      {item.label}
                    </p>
                    <p className="text-primary mt-1 wrap-break-word text-sm leading-7 sm:text-base">
                      {item.value}
                    </p>
                  </div>
                </div>
                <div className="text-secondary group-hover:text-primary shrink-0 rounded-full transition-colors duration-150">
                  <ArrowUpRight size={17} />
                </div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default ContactSection
