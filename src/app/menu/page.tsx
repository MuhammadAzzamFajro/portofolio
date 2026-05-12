import MenuMakanan from '@/components/MenuMakanan/MenuMakanan';
import Link from 'next/link';
import { FaArrowLeft, FaConciergeBell } from 'react-icons/fa';

export const metadata = {
    title: 'Sistem Menu Makanan - Muhammad Azzam Fajro',
    description: 'A modern ordering system, originally built in Java and now ported to the web.',
};

export default function MenuPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
            <div className="container">
                <Link 
                    href="/#projects" 
                    style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: '#64748b', 
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        fontWeight: 600,
                        transition: 'color 0.2s'
                    }}
                >
                    <FaArrowLeft /> Kembali ke Portofolio
                </Link>
                
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        backgroundColor: '#22c55e',
                        color: 'white',
                        borderRadius: '16px',
                        fontSize: '24px',
                        marginBottom: '1.5rem',
                        boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)'
                    }}>
                        <FaConciergeBell />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                        Sistem Menu Makanan <span style={{ color: '#22c55e' }}>Digital</span>
                    </h1>
                    <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
                        Porting modern dari aplikasi CLI Java. Sistem ini menangani pemilihan menu, 
                        kalkulasi harga real-time, dan manajemen pesanan dengan antarmuka yang intuitif.
                    </p>
                </header>

                <MenuMakanan />
            </div>
        </main>
    );
}
