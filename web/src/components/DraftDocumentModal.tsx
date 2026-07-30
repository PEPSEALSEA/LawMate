import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Download, FileEdit } from 'lucide-react'
import { Modal } from '@/components/Modal'
import { generateDraftDocument } from '@/lib/ai-assistant'
import type { LegalCase } from '@/types'

export function DraftDocumentModal({
  legalCase,
  open,
  onClose,
}: {
  legalCase: LegalCase
  open: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const draft = generateDraftDocument(legalCase)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleDownload = () => {
    const blob = new Blob([draft], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${legalCase.referenceCode.replace('#', '')}-draft.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ร่างเอกสาร"
      subtitle={`AI ร่างให้อัตโนมัติจากเคส ${legalCase.referenceCode} — ตรวจสอบก่อนใช้งานจริง`}
      icon={<FileEdit className="size-5" aria-hidden />}
      widthClassName="sm:max-w-xl"
    >
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="whitespace-pre-wrap rounded-xl bg-surface p-4 font-sans text-sm leading-relaxed text-ink"
      >
        {draft}
      </motion.pre>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink/12 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
        >
          {copied ? <Check className="size-4 text-success-ink" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copied ? 'คัดลอกแล้ว' : 'คัดลอกข้อความ'}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <Download className="size-4" aria-hidden />
          ดาวน์โหลดไฟล์ (.txt)
        </motion.button>
      </div>
    </Modal>
  )
}
