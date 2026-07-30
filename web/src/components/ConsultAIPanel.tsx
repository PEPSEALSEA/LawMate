import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { Modal } from '@/components/Modal'
import { getAssistantReply } from '@/lib/ai-assistant'
import { useCases } from '@/state/CasesContext'
import { cn } from '@/lib/cn'
import type { LegalCase } from '@/types'

const suggestions = ['ต้องทำอะไรต่อ', 'มีระยะเวลากี่วัน', 'ต้องติดต่อหน่วยงานไหน', 'ต้องเก็บหลักฐานอะไรบ้าง']

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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [legalCase.chat.length])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    addChatMessage(legalCase.id, { id: crypto.randomUUID(), role: 'user', text: trimmed })
    setInput('')

    const reply = getAssistantReply(trimmed, legalCase)
    setTimeout(() => {
      addChatMessage(legalCase.id, { id: crypto.randomUUID(), role: 'assistant', text: reply })
    }, 400)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Consult AI Assistant"
      subtitle="วิเคราะห์ความเสี่ยงและตอบข้อกฎหมายสำหรับเคสนี้"
      icon={<Sparkles className="size-5" aria-hidden />}
      widthClassName="sm:max-w-lg"
    >
      <div className="flex h-[50svh] flex-col">
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
          {legalCase.chat.length === 0 ? (
            <div className="rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-ink/80">
              สวัสดีครับ ผมคือ LawMate AI Assistant มีอะไรอยากถามเกี่ยวกับเคส
              <span className="font-semibold"> {legalCase.title}</span> บอกผมได้เลยครับ
            </div>
          ) : null}

          {legalCase.chat.map((message) => (
            <div
              key={message.id}
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
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => send(suggestion)}
              className="rounded-full border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              {suggestion}
            </button>
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
          <button
            type="submit"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:opacity-40"
            disabled={!input.trim()}
            aria-label="ส่งข้อความ"
          >
            <Send className="size-4" aria-hidden />
          </button>
        </form>
      </div>
    </Modal>
  )
}
