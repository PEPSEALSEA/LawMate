import type { LegalCase } from '@/types'

function daysFromNow(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export function seedCases(): LegalCase[] {
  return [
    {
      id: 'seed-overtime',
      referenceCode: '#LM-2023-8492',
      category: 'สิทธิแรงงาน',
      title: 'ค่าล่วงเวลาที่ค้างชำระ',
      subtitle: '(Unpaid Overtime)',
      status: 'in_progress',
      summary:
        'ลูกจ้างอ้างว่าไม่ได้รับค่าล่วงเวลาสำหรับการทำงานเกิน 8 ชั่วโมงต่อวัน เป็นระยะเวลา 6 เดือน จำนวนเงินที่เรียกร้องเบื้องต้นคือ 45,000 บาท อ้างอิงหลักฐานการลงเวลาทำงานถูกรวบรวมแล้ว',
      dueDate: daysFromNow(15),
      createdAt: daysFromNow(-30),
      steps: [
        {
          id: 'step-1',
          title: 'รวบรวมหลักฐาน',
          subtitle: 'Collect Evidence',
          detail: 'รวบรวมบันทึกเวลาเข้า-ออกงาน (ไทม์ชีต) และสลิปเงินเดือนย้อนหลัง',
          status: 'done',
        },
        {
          id: 'step-2',
          title: 'ร่างคำร้องเรียน',
          subtitle: 'Draft Complaint',
          detail: 'ตรวจสอบเอกสารที่ AI ร่างให้ ให้แน่ใจว่าข้อมูลถูกต้องและครบถ้วนก่อนดำเนินการต่อ',
          status: 'current',
          urgent: true,
        },
        {
          id: 'step-3',
          title: 'ยื่นเรื่องต่อเจ้าหน้าที่',
          subtitle: 'Submit to Official',
          detail: 'ยื่นคำร้องต่อพนักงานตรวจแรงงาน หากนายจ้างไม่ตอบสนองภายในกำหนด',
          status: 'pending',
        },
      ],
      insights: [
        'ตามกฎหมายแรงงานไทย (พ.ร.บ. คุ้มครองแรงงาน) อัตราค่าล่วงเวลา (OT) ในวันทำงานปกติ ต้องไม่น้อยกว่า 1.5 เท่าของอัตราค่าจ้างต่อชั่วโมง',
        'อายุความในการเรียกร้องค่าล่วงเวลาคือ 2 ปี นับแต่วันที่สิทธิเรียกร้องเกิดขึ้น',
      ],
      evidence: [
        { id: 'ev-1', name: 'timesheet_ม.ค.-มิ.ย.pdf', sizeLabel: '1.2 MB', uploadedAt: daysFromNow(-20) },
        { id: 'ev-2', name: 'สลิปเงินเดือน.zip', sizeLabel: '3.4 MB', uploadedAt: daysFromNow(-18) },
      ],
      chat: [],
    },
  ]
}
