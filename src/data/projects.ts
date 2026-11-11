export interface ProjectData {
  id: string;
  /** Film roll number, e.g. "01" */
  roll: string;
  title: string;
  year?: string;
  stack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  isPrivate?: boolean;
  isPrivateRepo?: boolean;
  /** accent color for this roll's frame border (earth tones only) */
  accentColor: 'forest' | 'soil' | 'brick' | 'sand' | 'olive';
}

const projects: ProjectData[] = [
  {
    id: 'eschool',
    roll: '01',
    title: 'ESCHOOL Official',
    year: '2024',
    stack: ['Laravel', 'MySQL Multi-Tenant', 'Blade', 'Bootstrap'],
    description:
      'SIS multi-tenant berbasis SaaS. Mengelola absensi otomatis, tagihan SPP online, dan tata kelola akademik untuk ribuan siswa di berbagai sekolah dalam satu platform.',
    liveUrl: 'https://eschool.ac.id/',
    isPrivate: false,
    isPrivateRepo: true,
    accentColor: 'forest',
  },
  {
    id: 'noctua-novel',
    roll: '02',
    title: 'NoctuaNovel',
    year: '2024',
    stack: ['Next.js 14', 'Tailwind', 'Flask', 'Supabase'],
    description:
      'Platform baca novel daring dengan scraping real-time, manajemen chapter interaktif, dan reader mode yang nyaman untuk pembaca.',
    liveUrl: 'https://noctua-novel.vercel.app/',
    githubUrl: 'https://github.com/SahrulRamadhanHardiansyah/noctua-novel',
    accentColor: 'olive',
  },
  {
    id: 'f1hub',
    roll: '03',
    title: 'F1 Hub Indonesia',
    year: '2024',
    stack: ['React', 'Vite', 'Tailwind', 'F1 Live API'],
    description:
      'Portal analitik Formula 1 dengan jadwal balapan real-time, klasemen pembalap, dan statistik sirkuit terintegrasi.',
    liveUrl: 'https://websitef1-kappa.vercel.app/',
    githubUrl: 'https://github.com/MuhammadAzzamFajro',
    accentColor: 'brick',
  },
  {
    id: 'taskman',
    roll: '04',
    title: 'Task & Internship Manager',
    year: '2024',
    stack: ['Laravel', 'Next.js', 'PostgreSQL', 'REST API'],
    description:
      'Aplikasi manajemen tugas dan pemantauan aktivitas magang dengan sistem pelaporan terstruktur dan analitik progres kerja.',
    githubUrl: 'https://github.com/MuhammadAzzamFajro',
    accentColor: 'soil',
  },
  {
    id: 'snake-java',
    roll: '05',
    title: 'Java Snake Game',
    year: '2023',
    stack: ['Java', 'Swing', 'OOP', 'Web Port'],
    description:
      'Game ular retro dengan grafis 2D, deteksi tabrakan, dan sistem skor — dibangun di Java lalu di-port ke browser.',
    demoUrl: '/snake',
    githubUrl: 'https://github.com/MuhammadAzzamFajro/snake-java',
    accentColor: 'sand',
  },
  {
    id: 'menu-makanan',
    roll: '06',
    title: 'Sistem POS Menu Makanan',
    year: '2023',
    stack: ['Java', 'CLI/GUI', 'Order System'],
    description:
      'Aplikasi kasir restoran dengan kalkulasi nota otomatis, simulasi struk, dan pencatatan menu — dijalankan di browser.',
    demoUrl: '/menu',
    githubUrl: 'https://github.com/MuhammadAzzamFajro/menu-makanan-java',
    accentColor: 'soil',
  },
];

export default projects;
