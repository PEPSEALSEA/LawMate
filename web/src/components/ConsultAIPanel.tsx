import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { Modal } from '@/components/Modal'
import { getAssistantReply } from '@/lib/ai-assistant'
import { useCases } from '@/state/CasesContext'
import { cn } from '@/lib/cn'
import type { LegalCase } from '@/types'

const suggestions = ['ต้องทำอะไรต่อ', 'มีเวลากี่วัน', 'ต้องติดต่อหน่วยงานไหน', 'ต้องเก็บหลักฐานอะไรบ้าง']

export function ConsultAIPanel({
  legalCase,
  open,
  onClose,
}: {
  legalCase: LegalCase
  open: boolean
  onClose: () => void
}) {
  const { addChatMessage } = useCases()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [legalCase.chat.length, isTyping])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    addChatMessage(legalCase.id, { id: crypto.randomUUID(), role: 'user', text: trimmed })
    setInput('')
    setIsTyping(true)

    const reply = getAssistantReply(trimmed, legalCase)
    setTimeout(() => {
      setIsTyping(false)
      addChatMessage(legalCase.id, { id: crypto.randomUUID(), role: 'assistant', text: reply })
    }, 700)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ปรึกษา AI"
      subtitle="ถามอะไรก็ได้เกี่ยวกับเคสนี้ ตอบให้ได้ตลอด 24 ชั่วโมง"
      icon={<Sparkles className="size-5" aria-hidden />}
      widthClassName="sm:max-w-lg"
    >
      <div className="flex h-[50svh] flex-col">
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
          {legalCase.chat.length === 0 ? (
            <div className="rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-ink/80">
              สวัสดีครับ ผมคือผู้ช่วย AI ของ LawMate มีอะไรอยากถามเกี่ยวกับเคส
              <span className="font-semibold"> {legalCase.title}</span> ถามได้เลยครับ
            </div>
          ) : null}

          <AnimatePresence initial={false}>
            {legalCase.chat.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <p
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    message.role === 'user'
                      ? 'rounded-br-sm bg-brand-700 text-white'
                      : 'rounded-bl-sm bg-surface text-ink',
                  )}
                >
                  {message.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface px-4 py-3">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="size-1.5 rounded-full bg-muted"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => send(suggestion)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์คำถามของคุณ..."
            className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:opacity-40"
            disabled={!input.trim()}
            aria-label="ส่งข้อความ"
          >
            <Send className="size-4" aria-hidden />
          </motion.button>
        </form>
      </div>
    </Modal>
  )
}
