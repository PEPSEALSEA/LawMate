import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'lawmate.profile.v1'

export interface ProfileData {
  name: string
  email: string
  phone: string
  notifyEmail: boolean
  notifySms: boolean
}

const defaultProfile: ProfileData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '08X-XXX-XXXX',
  notifyEmail: true,
  notifySms: false,
}

function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultProfile, ...(JSON.parse(raw) as ProfileData) } : defaultProfile
  } catch {
    return defaultProfile
  }
}

interface ProfileContextValue {
  profile: ProfileData
  updateProfile: (patch: Partial<ProfileData>) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => loadProfile())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateProfile = (patch: Partial<ProfileData>) =>
    setProfile((prev) => ({ ...prev, ...patch }))

  const value = useMemo(() => ({ profile, updateProfile }), [profile])

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
