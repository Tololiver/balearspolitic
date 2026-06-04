import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from '@/components/layout/Header'
import NavTabs from '@/components/layout/NavTabs'
import Footer from '@/components/layout/Footer'
import { LoadingSpinner } from '@/components/ui'

const Home        = lazy(() => import('@/pages/Home'))
const Comparativa = lazy(() => import('@/components/sections/Comparativa'))
const Partits     = lazy(() => import('@/components/sections/Partits'))
const Comparador  = lazy(() => import('@/components/sections/Comparador'))
const Programes   = lazy(() => import('@/components/sections/Programes'))
const Pobles      = lazy(() => import('@/components/sections/Pobles'))
const Elect27     = lazy(() => import('@/components/sections/Elect27'))
const Governs     = lazy(() => import('@/components/sections/Governs'))
const Fonts       = lazy(() => import('@/components/sections/Fonts'))
const Blog        = lazy(() => import('@/components/sections/Blog'))
const BlogPost    = lazy(() => import('@/components/sections/BlogPost'))
const AdminLayout = lazy(() => import('@/admin/AdminLayout'))

export default function App() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
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
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route index                  element={<Home />} />
            <Route path="pp-vs-psoe"      element={<Comparativa />} />
            <Route path="partits"         element={<Partits />} />
            <Route path="comparador"      element={<Comparador />} />
            <Route path="programes"       element={<Programes />} />
            <Route path="pobles"          element={<Pobles />} />
            <Route path="eleccions-2027"  element={<Elect27 />} />
            <Route path="governs"         element={<Governs />} />
            <Route path="fonts"           element={<Fonts />} />
            <Route path="blog"            element={<Blog />} />
            <Route path="blog/:slug"      element={<BlogPost />} />
            <Route path="*"               element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
