export interface GalleryFrame {
  src: string;
  alt: string;
  /** frame code shown on perforation strip, e.g. "01-1A" */
  code: string;
  blur?: boolean;   // sensitive content – show blurred
  hidden?: boolean; // completely omit from public gallery
  caption?: string;
  /** frame size variant for rhythmic layout */
  size?: 'wide' | 'tall' | 'standard';
}

export interface ProjectGallery {
  projectId: string;
  frames: GalleryFrame[];
}

const gallery: ProjectGallery[] = [
  {
    projectId: 'eschool',
    frames: [
      {
        src: '/eschool_official.png',
        alt: 'ESCHOOL Official – tampilan dashboard utama',
        code: '01-1A',
        size: 'wide',
        caption: 'Dashboard utama multi-tenant ESCHOOL',
        // Contains school admin UI – no student data visible
      },
      {
        src: '/eschool.png',
        alt: 'ESCHOOL – halaman alternatif',
        code: '01-2A',
        size: 'standard',
        caption: 'Halaman manajemen sekolah',
        blur: false,
      },
    ],
  },
  {
    projectId: 'noctua-novel',
    frames: [
      {
        src: '/noctua_novel.png',
        alt: 'NoctuaNovel – platform baca novel',
        code: '02-1A',
        size: 'wide',
        caption: 'Platform baca novel dengan scraping real-time',
      },
    ],
  },
  {
    projectId: 'f1hub',
    frames: [
      {
        src: '/f1hub.png',
        alt: 'F1 Hub Indonesia – portal analitik Formula 1',
        code: '03-1A',
        size: 'wide',
        caption: 'Portal F1 dengan jadwal balapan & klasemen real-time',
      },
    ],
  },
  {
    projectId: 'taskman',
    frames: [
      {
        src: '/taskman.png',
        alt: 'Task & Internship Manager – tampilan utama',
        code: '04-1A',
        size: 'wide',
        caption: 'Manajemen tugas dan pemantauan magang',
        // Internal school data may be visible – flag for review
        blur: false,
      },
    ],
  },
  {
    projectId: 'snake-java',
    frames: [
      {
        src: '/snake_game.png',
        alt: 'Java Snake Game – game arcade ular',
        code: '05-1A',
        size: 'standard',
        caption: 'Java Snake ported ke web dengan Canvas API',
      },
    ],
  },
  {
    projectId: 'menu-makanan',
    frames: [
      {
        src: '/menu_makanan.png',
        alt: 'Sistem POS Menu Makanan – tampilan kasir',
        code: '06-1A',
        size: 'wide',
        caption: 'Sistem kasir restoran Java di browser',
      },
    ],
  },
];

export default gallery;

/** Helper: get frames for a specific project */
export function getProjectFrames(projectId: string): GalleryFrame[] {
  const project = gallery.find((g) => g.projectId === projectId);
  return project?.frames.filter((f) => !f.hidden) ?? [];
}
