import SnakeGame from '@/components/SnakeGame/SnakeGame';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata = {
    title: 'Snake Game - Muhammad Azzam Fajro',
    description: 'Play the classic Snake game, originally built in Java and now ported to the web.',
};

export default function SnakePage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#020617', padding: '2rem 0' }}>
            <div className="container">
                <Link 
                    href="/#projects" 
                    style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        color: '#94a3b8', 
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        transition: 'color 0.2s'
                    }}
                >
                    <FaArrowLeft /> Kembali ke Portofolio
                </Link>
                
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                        Java Snake Game <span style={{ color: '#22c55e' }}>Web Port</span>
                    </h1>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                        Ini adalah porting web dari proyek Java saya. Game ini menggunakan logika asli 
                        yang saya buat di Java, kini dioptimalkan untuk browser menggunakan React dan Canvas API.
                    </p>
                </header>

                <SnakeGame />
            </div>
        </main>
    );
}
