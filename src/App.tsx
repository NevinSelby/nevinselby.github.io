
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Experience from '@/pages/Experience';
import ExperienceDetail from '@/pages/ExperienceDetail';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Publications from '@/pages/Publications';
import Newsletter from '@/pages/Newsletter';
import Media from '@/pages/Media';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/experience/:slug" element={<ExperienceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <ScrollToTop />
          <AnimatedRoutes />
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
