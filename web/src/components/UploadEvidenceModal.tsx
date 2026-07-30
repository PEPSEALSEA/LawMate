import { useRef } from 'react'
import { File, Trash2, UploadCloud } from 'lucide-react'
import { Modal } from '@/components/Modal'
import { useCases } from '@/state/CasesContext'
import type { LegalCase } from '@/types'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadEvidenceModal({
  legalCase,
  open,
  onClose,
}: {
  legalCase: LegalCase
  open: boolean
  onClose: () => void
}) {
  const { addEvidence, removeEvidence } = useCases()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      uploadedAt: new Date().toISOString(),
    }))
    addEvidence(legalCase.id, files)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upload Evidence"
      subtitle={`เพิ่มเอกสารหลักฐานสำหรับเคส ${legalCase.referenceCode}`}
      icon={<UploadCloud className="size-5" aria-hidden />}
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-4 py-8 text-center transition-colors hover:bg-brand-50"
      >
        <UploadCloud className="size-7 text-brand-700" aria-hidden />
        <span className="text-sm font-semibold text-brand-700">คลิกเพื่อเลือกไฟล์</span>
        <span className="text-xs text-muted">รองรับ PDF, รูปภาพ, เอกสาร Word</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          ไฟล์ที่แนบแล้ว ({legalCase.evidence.length})
        </p>
        {legalCase.evidence.length === 0 ? (
          <p className="mt-3 text-sm text-muted">ยังไม่มีไฟล์แนบ</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {legalCase.evidence.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-surface px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-700/10 text-brand-700">
                    <File className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{file.name}</p>
                    <p className="text-xs text-muted">{file.sizeLabel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeEvidence(legalCase.id, file.id)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-urgent/10 hover:text-urgent"
                  aria-label={`ลบ ${file.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}
