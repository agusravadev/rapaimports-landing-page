'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FAQ_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function FAQItem({
  item,
  index,
}: {
  item: (typeof FAQ_ITEMS)[number]
  index: number
}) {
  return (
    <ScrollReveal delay={index * 0.05}>
      <Accordion.Item
        value={item.id}
        className="border border-rapa-border rounded-lg overflow-hidden mb-2 transition-all duration-300 data-[state=open]:border-rapa-red/40"
      >
        <Accordion.Header>
          <Accordion.Trigger
            className={cn(
              'w-full flex items-center justify-between gap-4 p-5 text-left group',
              'font-body font-semibold text-white bg-rapa-elevated',
              'hover:bg-rapa-subtle transition-colors duration-200',
              'data-[state=open]:bg-rapa-red/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rapa-red focus-visible:ring-inset'
            )}
          >
            <span className="flex items-center gap-3 flex-1">
              <span className="font-mono text-xs text-rapa-red/50 shrink-0 w-6">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base">{item.question}</span>
            </span>
            <Plus
              size={18}
              className="shrink-0 text-rapa-red transition-transform duration-300 group-data-[state=open]:rotate-45"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
          <div className="px-5 py-4 bg-rapa-black border-t border-rapa-border">
            <p className="font-body text-rapa-muted text-sm leading-relaxed">{item.answer}</p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </ScrollReveal>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="bg-rapa-black section-border-top py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="font-body text-rapa-red text-sm uppercase tracking-[0.2em] mb-3">
            Dudas frecuentes
          </p>
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl uppercase text-white">
            Preguntas Frecuentes
          </h2>
        </ScrollReveal>

        <Accordion.Root type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={item.id} item={item} index={i} />
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
