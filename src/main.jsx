import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Search,
  Download,
  PlayCircle,
  Moon,
  Sun,
  ShieldCheck,
  FileText,
  Video,
  Bookmark,
  BarChart3,
  Users,
  UploadCloud,
  Layers,
  ClipboardList,
  Laptop,
  Menu,
  X,
  ChevronRight,
  Clock3,
  Sparkles,
  Trash2,
  Pencil,
} from 'lucide-react';
import './styles.css';

const courses = [
  {
    id: 'btech',
    name: 'B.Tech',
    icon: Laptop,
    accent: 'from-blue-500 to-cyan-400',
    semesters: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'],
    subjects: ['Engineering Mathematics', 'Basic Electrical Engineering', 'Data Structures', 'Operating Systems', 'Database Management Systems'],
  },
  {
    id: 'mba',
    name: 'MBA',
    icon: BarChart3,
    accent: 'from-violet-500 to-fuchsia-400',
    semesters: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester'],
    subjects: ['Management Concepts', 'Marketing Management', 'Financial Accounting', 'Business Analytics', 'Human Resource Management'],
  },
  {
    id: 'polytechnic',
    name: 'Polytechnic',
    icon: Layers,
    accent: 'from-emerald-500 to-teal-400',
    semesters: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'],
    subjects: ['Applied Physics', 'Workshop Practice', 'Digital Electronics', 'Machine Drawing', 'Industrial Management'],
  },
  {
    id: 'bca',
    name: 'BCA',
    icon: BookOpen,
    accent: 'from-orange-500 to-amber-400',
    semesters: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'],
    subjects: ['Programming in C', 'Computer Networks', 'Web Technology', 'Software Engineering', 'Cloud Computing'],
  },
  {
    id: 'mca',
    name: 'MCA',
    icon: GraduationCap,
    accent: 'from-rose-500 to-pink-400',
    semesters: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester'],
    subjects: ['Advanced Java', 'AI & Machine Learning', 'Distributed Systems', 'Cyber Security', 'Big Data Analytics'],
  },
];

const units = [
  { name: 'Unit 1', items: ['Concept Notes PDF', 'Intro Video Lecture', 'PPT Deck', 'Practice Assignment', 'Important Questions'] },
  { name: 'Unit 2', items: ['Solved Notes', 'Topic-wise Video', 'Revision PPT', 'Numerical Assignment', 'Expected Questions'] },
  { name: 'Unit 3', items: ['Formula Sheet', 'Deep Dive Class', 'Diagrams PPT', 'Lab Assignment', 'AKTU Short Questions'] },
  { name: 'Unit 4', items: ['Exam Notes', 'Problem Solving Video', 'Summary PPT', 'Case Assignment', 'Long Questions'] },
  { name: 'Unit 5', items: ['One-shot Notes', 'Revision Lecture', 'Mind-map PPT', 'Final Assignment', 'Most Repeated Questions'] },
];

const pyqs = [
  { year: '2025', course: 'B.Tech', subject: 'Data Structures', downloads: '12.4k' },
  { year: '2024', course: 'B.Tech', subject: 'Operating Systems', downloads: '10.1k' },
  { year: '2023', course: 'MBA', subject: 'Marketing Management', downloads: '6.8k' },
  { year: '2022', course: 'Polytechnic', subject: 'Digital Electronics', downloads: '8.5k' },
];

const recent = ['DBMS Unit 3 Notes', 'Marketing PYQ 2024', 'Java Playlist', 'Applied Physics PPT'];

function App() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(courses[0]);
  const [activeSemester, setActiveSemester] = useState('3rd Semester');
  const [activeSubject, setActiveSubject] = useState('Data Structures');
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredSubjects = useMemo(() => {
    const all = courses.flatMap((course) => course.subjects.map((subject) => ({ subject, course: course.name })));
    return all.filter((item) => `${item.subject} ${item.course}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredPyqs = pyqs.filter((paper) => selectedYear === 'All' || paper.year === selectedYear);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <Header dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main>
          <Hero query={query} setQuery={setQuery} filteredSubjects={filteredSubjects} />
          <Courses activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
          <LearningExplorer
            activeCourse={activeCourse}
            activeSemester={activeSemester}
            setActiveSemester={setActiveSemester}
            activeSubject={activeSubject}
            setActiveSubject={setActiveSubject}
          />
          <UnitContent activeSubject={activeSubject} />
          <OnlineClasses />
          <QuestionPapers selectedYear={selectedYear} setSelectedYear={setSelectedYear} filteredPyqs={filteredPyqs} />
          <StudentDashboard />
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Header({ dark, setDark, mobileOpen, setMobileOpen }) {
  const nav = ['Courses', 'Subjects', 'PYQs', 'Classes', 'Admin'];
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 font-black tracking-tight">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
            <GraduationCap />
          </span>
          <span className="text-xl">AKTU Study Hub</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
          {nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-blue-600 dark:hover:text-cyan-300">
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold dark:border-slate-700">Login</button>
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-slate-950">Sign up</button>
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
        <button className="rounded-xl border border-slate-200 p-2 dark:border-slate-700 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
            <div className="grid gap-3 px-4 py-4">
              {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded-xl px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900">{item}</a>)}
              <ThemeToggle dark={dark} setDark={setDark} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle({ dark, setDark }) {
  return <button onClick={() => setDark(!dark)} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 dark:border-slate-700" aria-label="Toggle dark mode">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>;
}

function Hero({ query, setQuery, filteredSubjects }) {
  return (
    <section id="home" className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.24),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-cyan-200">
            <Sparkles size={16} /> Professional AKTU learning platform
          </span>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">AKTU Study Hub</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Notes, Classes, PYQs & Study Materials for AKTU Students. Learn course-wise, semester-wise, subject-wise, and unit-wise from a single fast dashboard.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#courses" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-1 hover:bg-blue-700">Start Learning <ChevronRight size={19} /></a>
            <a href="#pyqs" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-black shadow-sm transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900">Download Notes <Download size={19} /></a>
          </div>
          <div className="relative mt-8 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={21} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search any subject, notes, class, or PYQ..." className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 font-medium shadow-sm outline-none ring-blue-500/20 transition focus:ring-4 dark:border-slate-700 dark:bg-slate-900" />
            {query && (
              <div className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                {filteredSubjects.slice(0, 5).map((item) => <div key={`${item.course}-${item.subject}`} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"><span>{item.subject}</span><small className="text-slate-500">{item.course}</small></div>)}
              </div>
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
          <div className="rounded-[2rem] border border-white/40 bg-white/75 p-4 shadow-2xl shadow-blue-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/75">
            <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
              <div className="mb-4 flex items-center justify-between">
                <div><p className="text-sm text-slate-400">Continue watching</p><h3 className="text-xl font-black">Data Structures - Unit 3</h3></div>
                <PlayCircle className="text-cyan-300" size={38} />
              </div>
              <div className="grid aspect-video place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur"><PlayCircle size={48} /></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {['PDF Notes', 'PYQ 2025', 'Unit Test'].map((label) => <div key={label} className="rounded-2xl bg-white/10 p-3 text-center text-sm font-bold">{label}</div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Courses({ activeCourse, setActiveCourse }) {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Courses" title="Choose your AKTU program" description="Support for B.Tech, MBA, Polytechnic, BCA, MCA and additional AKTU courses." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {courses.map((course, index) => {
          const Icon = course.icon;
          const active = activeCourse.id === course.id;
          return (
            <motion.button key={course.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} onClick={() => setActiveCourse(course)} className={`rounded-3xl border p-5 text-left shadow-sm transition hover:-translate-y-1 ${active ? 'border-blue-400 bg-blue-50 dark:border-cyan-400 dark:bg-cyan-400/10' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'}`}>
              <span className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${course.accent} text-white`}><Icon /></span>
              <h3 className="text-xl font-black">{course.name}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{course.semesters.length} semesters • {course.subjects.length}+ subjects</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function LearningExplorer({ activeCourse, activeSemester, setActiveSemester, activeSubject, setActiveSubject }) {
  return (
    <section id="subjects" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SectionTitle eyebrow="Semesters" title={`${activeCourse.name} semester map`} compact />
          <div className="grid gap-3 sm:grid-cols-2">
            {activeCourse.semesters.map((semester) => <button key={semester} onClick={() => setActiveSemester(semester)} className={`rounded-2xl px-4 py-3 text-left font-bold transition ${activeSemester === semester ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'}`}>{semester}</button>)}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <SectionTitle eyebrow="Subjects" title={`${activeSemester} subjects`} compact />
          <div className="grid gap-4 sm:grid-cols-2">
            {activeCourse.subjects.map((subject) => <button key={subject} onClick={() => setActiveSubject(subject)} className={`group rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${activeSubject === subject ? 'border-blue-400 bg-blue-50 dark:bg-blue-500/10' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-cyan-300"><BookOpen size={20} /></span><div><h3 className="font-black">{subject}</h3><p className="text-sm text-slate-500">5 units • notes • videos • PYQs</p></div></div>
            </button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function UnitContent({ activeSubject }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Unit-wise learning" title={`${activeSubject} content structure`} description="Each unit supports notes PDFs, video lectures, PPTs, assignments, and important questions." />
      <div className="grid gap-5 lg:grid-cols-5">
        {units.map((unit) => <motion.div key={unit.name} whileHover={{ y: -6 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-black">{unit.name}</h3>
          <div className="mt-4 grid gap-3">
            {unit.items.map((item, index) => <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800"><span>{item}</span>{index < 3 ? <Download size={16} className="text-blue-600" /> : <FileText size={16} />}</div>)}
          </div>
        </motion.div>)}
      </div>
    </section>
  );
}

function OnlineClasses() {
  return (
    <section id="classes" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Online classes" title="Embedded classes with playlists" description="Support YouTube, private video URLs, playlists, and continue-watching progress." />
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl dark:border-slate-800">
          <div className="grid aspect-video place-items-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
            <button className="grid h-24 w-24 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105"><PlayCircle size={58} /></button>
          </div>
          <div className="p-5 text-white"><h3 className="text-2xl font-black">Operating Systems: Process Scheduling</h3><p className="mt-2 text-slate-300">Continue from 32:18 • 68% completed</p></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-black">Playlist</h3>
          <div className="mt-4 grid gap-3">
            {['Introduction to OS', 'CPU Scheduling', 'Deadlocks', 'Memory Management'].map((item, index) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800"><Video className="text-blue-600" /><div><p className="font-bold">{item}</p><small className="text-slate-500">Lecture {index + 1} • {24 + index * 8} min</small></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionPapers({ selectedYear, setSelectedYear, filteredPyqs }) {
  return (
    <section id="pyqs" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionTitle eyebrow="PYQs" title="Previous year question papers" description="Filter year-wise and subject-wise, then download PDFs instantly." compact />
        <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold dark:border-slate-700 dark:bg-slate-900">
          {['All', '2025', '2024', '2023', '2022'].map((year) => <option key={year}>{year}</option>)}
        </select>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {filteredPyqs.map((paper) => <div key={`${paper.year}-${paper.subject}`} className="grid gap-4 border-b border-slate-100 p-5 last:border-b-0 dark:border-slate-800 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
          <div><p className="text-sm text-slate-500">Year</p><p className="font-black">{paper.year}</p></div>
          <div><p className="text-sm text-slate-500">Course</p><p className="font-black">{paper.course}</p></div>
          <div><p className="text-sm text-slate-500">Subject</p><p className="font-black">{paper.subject}</p></div>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-black text-white"><Download size={18} /> PDF</button>
        </div>)}
      </div>
    </section>
  );
}

function StudentDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Student dashboard" title="Personalized study workspace" description="Login/signup, bookmarks, downloads, search, and recently viewed content for every student." />
      <div className="grid gap-5 md:grid-cols-3">
        <FeatureCard icon={ShieldCheck} title="Student login/signup" text="Secure access for notes, classes, bookmarks, and download history." />
        <FeatureCard icon={Bookmark} title="Bookmarks & downloads" text="Save important PDFs, lectures, assignments, and PYQs for later." />
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="font-black">Recently viewed</h3><div className="mt-4 grid gap-3">{recent.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800"><Clock3 size={17} className="text-blue-600" /><span className="font-semibold">{item}</span></div>)}</div></div>
      </div>
    </section>
  );
}

function AdminDashboard() {
  const actions = [
    ['Add course', GraduationCap], ['Add semester', Layers], ['Add subject', BookOpen], ['Add units', ClipboardList], ['Upload PDFs/videos', UploadCloud], ['Edit content', Pencil], ['Delete content', Trash2], ['Manage users', Users], ['Analytics', BarChart3],
  ];
  return (
    <section id="admin" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Admin panel" title="Organize AKTU content at scale" description="Course-wise, semester-wise, subject-wise, and unit-wise content management with analytics." />
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white shadow-2xl">
          <h3 className="text-2xl font-black">Admin Upload Center</h3>
          <p className="mt-2 text-slate-300">Upload notes PDFs, video lectures, PPTs, assignments, and previous year question papers.</p>
          <div className="mt-6 rounded-3xl border-2 border-dashed border-white/25 p-8 text-center"><UploadCloud className="mx-auto text-cyan-300" size={48} /><p className="mt-3 font-black">Drag & drop files here</p><p className="text-sm text-slate-400">PDF, PPT, MP4, YouTube/private video links</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(([label, Icon]) => <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><Icon className="text-blue-600 dark:text-cyan-300" /><p className="mt-4 font-black">{label}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><Icon className="text-blue-600 dark:text-cyan-300" size={30} /><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-slate-500 dark:text-slate-400">{text}</p></div>;
}

function SectionTitle({ eyebrow, title, description, compact = false }) {
  return <div className={compact ? '' : 'mb-8'}><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-300">{eyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>{description && <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{description}</p>}</div>;
}

function Footer() {
  return <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800">© 2026 AKTU Study Hub. Built for fast, mobile-friendly AKTU learning.</footer>;
}

createRoot(document.getElementById('root')).render(<App />);
