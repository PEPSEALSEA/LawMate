import { Navigate, Route, Routes } from 'react-router'
import { AudienceSection } from '@/components/AudienceSection'
import { BusinessModelCanvas } from '@/components/BusinessModelCanvas'
import { ComparisonSection } from '@/components/ComparisonSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Navbar } from '@/components/Navbar'
import { ProblemSection } from '@/components/ProblemSection'
import { UseCaseSection } from '@/components/UseCaseSection'

function HomePage() {
  return (
    <div className="min-h-svh bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <ComparisonSection />
        <UseCaseSection />
        <AudienceSection />
        <BusinessModelCanvas />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
