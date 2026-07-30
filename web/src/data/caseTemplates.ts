import type { ActionStep, LegalCase } from '@/types'

interface CaseTemplate {
  keywords: string[]
  category: string
  title: string
  subtitle?: string
  summary: (situation: string) => string
  steps: Omit<ActionStep, 'id' | 'status'>[]
  insights: string[]
  dueInDays: number
}

function makeSteps(steps: Omit<ActionStep, 'id' | 'status'>[]): ActionStep[] {
  return steps.map((step, index) => ({
    ...step,
    id: `step-${index + 1}`,
    status: index === 0 ? 'current' : 'pending',
  }))
}

const templates: CaseTemplate[] = [
  {
    keywords: ['ล่วงเวลา', 'โอที', 'ot', 'นายจ้าง', 'ค่าแรง', 'ไม่จ่ายเงินเดือน', 'เลิกจ้าง'],
    category: 'สิทธิแรงงาน',
    title: 'ค่าล่วงเวลาที่ค้างชำระ',
    subtitle: '(Unpaid Overtime)',
    summary: () =>
      'ลูกจ้างอาจไม่ได้รับค่าล่วงเวลาสำหรับการทำงานเกินเวลาที่กฎหมายกำหนด ควรรวบรวมหลักฐานเวลาทำงานและเงินเดือนย้อนหลัง เพื่อคำนวณยอดเงินที่เรียกร้องได้และยื่นคำร้องต่อกรมสวัสดิการและคุ้มครองแรงงาน',
    steps: [
      {
        title: 'รวบรวมหลักฐาน',
        subtitle: 'Collect Evidence',
        detail: 'รวบรวมบันทึกเวลาเข้า-ออกงาน (ไทม์ชีต) และสลิปเงินเดือนย้อนหลัง',
      },
      {
        title: 'ร่างคำร้องเรียน',
        subtitle: 'Draft Complaint',
        detail: 'ตรวจสอบเอกสารที่ AI ร่างให้ ให้แน่ใจว่าข้อมูลถูกต้องและครบถ้วนก่อนดำเนินการต่อ',
        urgent: true,
      },
      {
        title: 'ยื่นเรื่องต่อเจ้าหน้าที่',
        subtitle: 'Submit to Official',
        detail: 'ยื่นคำร้องต่อพนักงานตรวจแรงงาน หากนายจ้างไม่ตอบสนองภายในกำหนด',
      },
    ],
    insights: [
      'ตามกฎหมายแรงงานไทย (พ.ร.บ. คุ้มครองแรงงาน) อัตราค่าล่วงเวลา (OT) ในวันทำงานปกติ ต้องไม่น้อยกว่า 1.5 เท่าของอัตราค่าจ้างต่อชั่วโมง',
      'อายุความในการเรียกร้องค่าล่วงเวลาคือ 2 ปี นับแต่วันที่สิทธิเรียกร้องเกิดขึ้น',
    ],
    dueInDays: 45,
  },
  {
    keywords: ['เช่า', 'มัดจำ', 'คอนโด', 'หอพัก', 'ผู้เช่า', 'ผู้ให้เช่า', 'บ้านเช่า'],
    category: 'สิทธิผู้บริโภค / ที่อยู่อาศัย',
    title: 'เงินมัดจำค่าเช่าไม่ได้คืน',
    subtitle: '(Rental Deposit Dispute)',
    summary: () =>
      'ผู้เช่ามีสิทธิได้รับเงินมัดจำคืนเมื่อสิ้นสุดสัญญา หากไม่มีความเสียหายเกินปกติ ควรตรวจสอบสัญญาเช่าและถ่ายภาพสภาพห้องเป็นหลักฐาน ก่อนส่งหนังสือทวงถามอย่างเป็นทางการ',
    steps: [
      {
        title: 'ตรวจสอบสัญญาเช่า',
        subtitle: 'Review Contract',
        detail: 'อ่านเงื่อนไขการคืนเงินมัดจำ และรวบรวมภาพถ่ายสภาพห้องก่อน-หลังเช่า',
      },
      {
        title: 'ส่งหนังสือทวงถาม',
        subtitle: 'Send Demand Letter',
        detail: 'ตรวจสอบหนังสือทวงถามที่ AI ร่างให้ ก่อนส่งไปยังผู้ให้เช่าทางไปรษณีย์ตอบรับ',
        urgent: true,
      },
      {
        title: 'ยื่นเรื่องต่อ สคบ.',
        subtitle: 'File to Consumer Protection',
        detail: 'หากผู้ให้เช่าไม่ตอบสนองภายในกำหนด ให้ยื่นเรื่องร้องเรียนที่สำนักงานคณะกรรมการคุ้มครองผู้บริโภค',
      },
    ],
    insights: [
      'ผู้ให้เช่าต้องคืนเงินประกัน/มัดจำภายในเวลาที่เหมาะสมหลังสัญญาสิ้นสุด หากไม่มีความเสียหายที่ต้องหักชดเชย',
      'ควรเก็บหลักฐานสภาพห้องทั้งก่อนและหลังเช่าไว้เสมอ เพื่อใช้ยืนยันในกรณีมีข้อพิพาท',
    ],
    dueInDays: 30,
  },
  {
    keywords: ['รถ', 'อุบัติเหตุ', 'ประกันภัย', 'ชนท้าย', 'คู่กรณี'],
    category: 'ประกันภัย / อุบัติเหตุ',
    title: 'ค่าเสียหายจากอุบัติเหตุทางรถยนต์',
    subtitle: '(Vehicle Accident Claim)',
    summary: () =>
      'ผู้เสียหายจากอุบัติเหตุมีสิทธิเรียกร้องค่าซ่อมและค่าเสียหายอื่นจากคู่กรณีหรือบริษัทประกันภัย ควรบันทึกภาพถ่ายที่เกิดเหตุและใบแจ้งความให้ครบถ้วนก่อนเจรจาค่าสินไหม',
    steps: [
      {
        title: 'รวบรวมหลักฐานที่เกิดเหตุ',
        subtitle: 'Collect Accident Evidence',
        detail: 'ถ่ายภาพความเสียหาย บันทึกประจำวันจากตำรวจ และข้อมูลคู่กรณี',
      },
      {
        title: 'แจ้งเคลมประกันภัย',
        subtitle: 'File Insurance Claim',
        detail: 'ตรวจสอบแบบฟอร์มเรียกร้องค่าสินไหมที่ AI ร่างให้ ก่อนยื่นต่อบริษัทประกัน',
        urgent: true,
      },
      {
        title: 'เจรจาค่าสินไหมทดแทน',
        subtitle: 'Negotiate Settlement',
        detail: 'หากเจรจาไม่สำเร็จ ให้ยื่นเรื่องต่อ คปภ. เพื่อขอให้ช่วยไกล่เกลี่ย',
      },
    ],
    insights: [
      'คู่กรณีฝ่ายผิดหรือบริษัทประกันภัยของฝ่ายผิด มีหน้าที่ชดใช้ค่าเสียหายตามความเป็นจริงจากอุบัติเหตุ',
      'ควรแจ้งเคลมภายใน 3 วันหลังเกิดเหตุ เพื่อไม่ให้เสียสิทธิความคุ้มครองตามกรมธรรม์',
    ],
    dueInDays: 15,
  },
  {
    keywords: ['สัญญา', 'ผิดสัญญา', 'ธุรกิจ', 'คู่ค้า', 'ซัพพลายเออร์', 'sme'],
    category: 'ข้อพิพาททางธุรกิจ',
    title: 'ข้อพิพาทจากการผิดสัญญาทางธุรกิจ',
    subtitle: '(Contract Dispute)',
    summary: () =>
      'เมื่อคู่สัญญาไม่ปฏิบัติตามข้อตกลง ควรตรวจสอบเงื่อนไขในสัญญาและความเสียหายที่เกิดขึ้นจริง ก่อนส่งหนังสือแจ้งเตือนอย่างเป็นทางการเพื่อรักษาสิทธิของธุรกิจ',
    steps: [
      {
        title: 'ตรวจสอบสัญญาและความเสียหาย',
        subtitle: 'Review Contract & Damages',
        detail: 'รวบรวมสัญญาฉบับจริง หลักฐานการสื่อสาร และประเมินมูลค่าความเสียหาย',
      },
      {
        title: 'ส่งหนังสือแจ้งเตือน',
        subtitle: 'Send Notice of Breach',
        detail: 'ตรวจสอบหนังสือแจ้งเตือนผิดสัญญาที่ AI ร่างให้ ก่อนส่งถึงคู่สัญญา',
        urgent: true,
      },
      {
        title: 'เจรจาไกล่เกลี่ยหรือฟ้องร้อง',
        subtitle: 'Mediate or File Lawsuit',
        detail: 'หากไม่มีการแก้ไข ให้พิจารณายื่นฟ้องต่อศาลหรือขอไกล่เกลี่ยข้อพิพาททางธุรกิจ',
      },
    ],
    insights: [
      'คู่สัญญาที่ผิดข้อตกลงต้องรับผิดชดใช้ค่าเสียหายตามที่ระบุไว้ในสัญญาหรือความเสียหายตามจริง',
      'อายุความฟ้องร้องคดีผิดสัญญาทั่วไปอยู่ที่ 10 ปี เว้นแต่สัญญาจะกำหนดไว้เป็นอย่างอื่น',
    ],
    dueInDays: 60,
  },
]

const fallbackTemplate: CaseTemplate = {
  keywords: [],
  category: 'ปรึกษาทั่วไป',
  title: 'คำปรึกษาทางกฎหมายเบื้องต้น',
  summary: (situation) =>
    `LawMate ได้วิเคราะห์สถานการณ์เบื้องต้นจากข้อความของคุณ: "${situation.slice(0, 120)}${
      situation.length > 120 ? '…' : ''
    }" แนะนำให้เริ่มจากรวบรวมข้อมูลและหลักฐานที่เกี่ยวข้องทั้งหมดก่อนดำเนินการขั้นต่อไป`,
  steps: [
    {
      title: 'รวบรวมข้อมูลและหลักฐาน',
      subtitle: 'Gather Information',
      detail: 'รวบรวมเอกสาร ข้อความ หรือหลักฐานที่เกี่ยวข้องกับสถานการณ์ของคุณให้ครบถ้วน',
    },
    {
      title: 'วิเคราะห์สิทธิเบื้องต้น',
      subtitle: 'Review Your Rights',
      detail: 'ตรวจสอบสิทธิที่ AI วิเคราะห์ให้ และเตรียมคำถามที่ต้องการความชัดเจนเพิ่มเติม',
      urgent: true,
    },
    {
      title: 'ปรึกษาผู้เชี่ยวชาญ',
      subtitle: 'Consult a Specialist',
      detail: 'หากสถานการณ์ซับซ้อน ควรปรึกษานักกฎหมายหรือหน่วยงานที่เกี่ยวข้องเพิ่มเติม',
    },
  ],
  insights: [
    'การเก็บหลักฐานให้ครบถ้วนตั้งแต่เนิ่นๆ จะช่วยให้การเรียกร้องสิทธิของคุณมีน้ำหนักมากขึ้น',
    'หากไม่แน่ใจในสิทธิของตัวเอง สามารถถามเพิ่มเติมได้ที่เมนู "ปรึกษา AI" ได้ตลอด 24 ชั่วโมง',
  ],
  dueInDays: 30,
}

let caseCounter = 1000

export function generateCaseFromSituation(situation: string): LegalCase {
  const lower = situation.toLowerCase()
  const matched = templates.find((template) =>
    template.keywords.some((keyword) => lower.includes(keyword)),
  )
  const template = matched ?? fallbackTemplate

  caseCounter += 1
  const now = new Date()
  const due = new Date(now)
  due.setDate(due.getDate() + template.dueInDays)

  return {
    id: crypto.randomUUID(),
    referenceCode: `#LM-${now.getFullYear()}-${caseCounter}`,
    category: template.category,
    title: template.title,
    subtitle: template.subtitle,
    status: 'in_progress',
    summary: template.summary(situation),
    dueDate: due.toISOString(),
    createdAt: now.toISOString(),
    steps: makeSteps(template.steps),
    insights: template.insights,
    evidence: [],
    chat: [],
  }
}
