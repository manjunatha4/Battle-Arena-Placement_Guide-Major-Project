import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Layout from './Layout'
import Dashboard from '@/pages/Dashboard'
import JobRecommendations from '@/pages/JobRecommendations'
import GoogleAuthSuccess from '@/pages/GoogleAuthSuccess'

// Normal eager imports
import DSAContent from '@/pages/DSAcontent'
import MockInterview from '@/pages/MockInterview'
import Contests from '@/pages/Contests'
import AptitudeTest from '@/pages/AptitudeTest'
import AlumniConnect from '@/pages/AlumniConnect'
import ProfilePage from '@/pages/ProfilePage'
import SettingsPage from '@/pages/SettingsPage'

function Routings() {
  return (
    <div>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
            <Route path="/app" element={<Layout />} >
                <Route index element={<Dashboard />} />
                <Route path="dsa" element={<DSAContent />} />
                <Route path="interview" element={<MockInterview />} />
                <Route path="contests" element={<Contests />} />
                <Route path="aptitude" element={<AptitudeTest />} />
                <Route path="job" element={<JobRecommendations />} />
                <Route path="alumni" element={<AlumniConnect />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            </Routes>
    </div>
  )
}

export default Routings