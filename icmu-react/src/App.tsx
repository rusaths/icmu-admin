import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import HomePage from '@/pages/HomePage';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import MembersPage from '@/pages/admin/MembersPage';
import AccessDashboard from '@/pages/access/AccessDashboard';
import ScannerPage from '@/pages/scanner/ScannerPage';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Preloader from '@/components/Preloader';
import DevNav from '@/pages/DevNav';

// Wrapper to enable route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <PageWrapper>
            <HomePage />
          </PageWrapper>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <PageWrapper>
            <AdminLogin />
          </PageWrapper>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <PageWrapper>
              <AdminDashboard />
            </PageWrapper>
          </ProtectedRoute>
        } />
        <Route path="/admin/members" element={
          <ProtectedRoute>
            <PageWrapper>
              <MembersPage />
            </PageWrapper>
          </ProtectedRoute>
        } />
        
        {/* Access and Scanning */}
        <Route path="/access" element={
          <PageWrapper>
            <AccessDashboard />
          </PageWrapper>
        } />
        <Route path="/scanner" element={
          <PageWrapper>
            <ScannerPage />
          </PageWrapper>
        } />

        {/* Development Helper */}
        <Route path="/dev" element={
          <PageWrapper>
            <DevNav />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <BrowserRouter>
          <AnimatedRoutes />
          <Toaster position="top-center" expand={true} richColors />
        </BrowserRouter>
      )}
    </AuthProvider>
  );
}

export default App;
