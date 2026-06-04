import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from '@/components/layout/Header'
import NavTabs from '@/components/layout/NavTabs'
import Footer from '@/components/layout/Footer'
import { LoadingSpinner } from '@/components/ui'

const Comparativa = lazy(() => import('@/components/sections/Comparativa'))
const Partits     = lazy(() => import('@/components/sections/Partits'))
const Comparador  = lazy(() => import('@/components/sections/Comparador'))
const Programes   = lazy(() => import('@/components/sections/Programes'))
const Pobles      = lazy(() => import('@/components/sections/Pobles'))
const Elect27     = lazy(() => import('@/components/sections/Elect27'))
const Governs     = lazy(() => import('@/components/sections/Governs'))
const Fonts       = lazy(() => import('@/components/sections/Fonts'))
const AdminLayout = lazy(() => import('@/admin/AdminLayout'))

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Routes>
        <Route path="/admin/*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLayout />
          </Suspense>
        } />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </div>
  )
}

function PublicLayout() {
  return (
    <>
      <Header />
      <NavTabs />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route index                 element={<Comparativa />} />
            <Route path="partits"        element={<Partits />} />
            <Route path="comparador"     element={<Comparador />} />
            <Route path="programes"      element={<Programes />} />
            <Route path="pobles"         element={<Pobles />} />
            <Route path="eleccions-2027" element={<Elect27 />} />
            <Route path="governs"        element={<Governs />} />
            <Route path="fonts"          element={<Fonts />} />
            <Route path="*"              element={<Comparativa />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
