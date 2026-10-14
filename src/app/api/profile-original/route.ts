import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const publicPath = path.join(process.cwd(), 'public', 'profile-original.jpg');
    const brainPath = '/home/azzamfajro/.gemini/antigravity-ide/brain/709e1c9e-5806-41ea-8cdf-556d0bfdf42a/media__1789233403404.jpg';

    let targetPath = '';
    if (fs.existsSync(publicPath)) {
        targetPath = publicPath;
    } else if (fs.existsSync(brainPath)) {
        targetPath = brainPath;
    }

    if (targetPath) {
        const fileBuffer = fs.readFileSync(targetPath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    }

    return new NextResponse('Profile original image not found', { status: 404 });
}
