import type { LegalCase } from '@/types'

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['ot', 'ล่วงเวลา', 'โอที'],
    answer:
      'อัตราค่าล่วงเวลาในวันทำงานปกติต้องไม่น้อยกว่า 1.5 เท่าของค่าจ้างต่อชั่วโมง และไม่น้อยกว่า 3 เท่าในวันหยุด อายุความเรียกร้องคือ 2 ปี',
  },
  {
    keywords: ['มัดจำ', 'เช่า', 'ค่าเช่า'],
    answer:
      'ผู้ให้เช่าต้องคืนเงินมัดจำภายในระยะเวลาที่เหมาะสมหลังสัญญาสิ้นสุด เว้นแต่มีความเสียหายที่ต้องหักชดเชยตามจริง',
  },
  {
    keywords: ['ระยะเวลา', 'อายุความ', 'กี่วัน', 'กี่ปี'],
    answer:
      'ระยะเวลาที่ต้องดำเนินการขึ้นอยู่กับประเภทคดี โดยทั่วไปควรยื่นเรื่องโดยเร็วที่สุดเพื่อรักษาสิทธิ และไม่ปล่อยให้เกินอายุความที่กฎหมายกำหนด',
  },
  {
    keywords: ['หลักฐาน', 'เอกสาร'],
    answer:
      'ควรเก็บหลักฐานที่เกี่ยวข้องทั้งหมด เช่น สัญญา ข้อความสนทนา ใบเสร็จ และภาพถ่าย ให้ครบถ้วนก่อนดำเนินการขั้นต่อไป',
  },
  {
    keywords: ['ติดต่อ', 'หน่วยงาน', 'ที่ไหน'],
    answer:
      'หน่วยงานที่ควรติดต่อขึ้นอยู่กับประเภทของคดี เช่น กรมสวัสดิการและคุ้มครองแรงงานสำหรับคดีแรงงาน หรือ สคบ. สำหรับคดีผู้บริโภค',
  },
]

export function getAssistantReply(question: string, legalCase: LegalCase): string {
  const lower = question.toLowerCase()

  const match = knowledgeBase.find((entry) => entry.keywords.some((keyword) => lower.includes(keyword)))
  if (match) return match.answer

  if (lower.includes('ทำไง') || lower.includes('ทำอะไร') || lower.includes('ขั้นตอน')) {
    const currentStep = legalCase.steps.find((step) => step.status === 'current')
    if (currentStep) {
      return `ขั้นตอนถัดไปของคุณคือ "${currentStep.title}" — ${currentStep.detail}`
    }
    return 'ตอนนี้คุณดำเนินการครบทุกขั้นตอนในแผนแล้ว หากมีสถานการณ์ใหม่ สามารถเริ่มการวิเคราะห์เคสใหม่ได้'
  }

  return `จากข้อมูลเคส "${legalCase.title}" แนะนำให้ตรวจสอบสิทธิของคุณกับหลักฐานที่มีอยู่ และดำเนินการตามแผนปฏิบัติการทีละขั้นตอน หากต้องการรายละเอียดเพิ่มเติม ลองถามเจาะจงมากขึ้น เช่น "มีระยะเวลากี่วัน" หรือ "ต้องติดต่อหน่วยงานไหน"`
}

export function generateDraftDocument(legalCase: LegalCase): string {
  const today = new Date().toLocaleDateString('th-TH-u-ca-buddhist', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return `วันที่ ${today}

เรื่อง: ${legalCase.title} (อ้างอิงเคส ${legalCase.referenceCode})

เรียน ผู้เกี่ยวข้อง

ข้าพเจ้าขอเรียนแจ้งเกี่ยวกับสถานการณ์ดังต่อไปนี้:

${legalCase.summary}

ทั้งนี้ ข้าพเจ้าได้รวบรวมหลักฐานที่เกี่ยวข้องเรียบร้อยแล้ว และขอให้ท่านดำเนินการแก้ไขหรือชี้แจงภายในระยะเวลาอันสมควร มิฉะนั้น ข้าพเจ้าจำเป็นต้องดำเนินการตามสิทธิที่กฎหมายกำหนดต่อไป

จึงเรียนมาเพื่อโปรดพิจารณาดำเนินการ

ขอแสดงความนับถือ
(เอกสารร่างโดย LawMate AI — โปรดตรวจสอบความถูกต้องก่อนใช้งานจริง)`
}
