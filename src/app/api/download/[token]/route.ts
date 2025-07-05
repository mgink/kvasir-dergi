// Digital PDF Download API
// Secure endpoint for downloading digital magazine PDFs

import { NextRequest, NextResponse } from 'next/server';
import { validateToken, incrementDownloadCount } from '@/lib/downloadUtils';

// Mock PDF files - in real app, these would be stored in cloud storage
const mockPDFs = new Map<string, string>([
    ['mag-1', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
    ['mag-2', 'https://www.africau.edu/images/default/sample.pdf'],
    ['mag-3', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
]);

// GET /api/download/[token]
export async function GET(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const token = params.token;

        if (!token) {
            return NextResponse.json(
                { error: 'Token gerekli' },
                { status: 400 }
            );
        }

        const validation = validateToken(token);

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 403 }
            );
        }

        const tokenData = validation.data!;
        const pdfUrl = mockPDFs.get(tokenData.magazineId);

        if (!pdfUrl) {
            return NextResponse.json(
                { error: 'PDF dosyası bulunamadı' },
                { status: 404 }
            );
        }

        // Increment download count
        incrementDownloadCount(token);

        // Log download activity
        console.log(`📄 PDF Download:`, {
            token,
            magazineId: tokenData.magazineId,
            customerId: tokenData.customerId,
            orderId: tokenData.orderId,
            downloadCount: tokenData.downloadCount + 1,
            timestamp: new Date().toISOString()
        });

        // In real app, you would:
        // 1. Fetch the actual PDF from cloud storage
        // 2. Stream the file to the user
        // 3. Add watermarking if needed
        // 4. Track download analytics

        // For demo, redirect to mock PDF
        return NextResponse.redirect(pdfUrl);

    } catch (error) {
        console.error('Download API error:', error);
        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}

// POST /api/download/[token] - Get download info without downloading
export async function POST(
    request: NextRequest,
    { params }: { params: { token: string } }
) {
    try {
        const token = params.token;
        const validation = validateToken(token);

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 403 }
            );
        }

        const tokenData = validation.data!;

        return NextResponse.json({
            magazineId: tokenData.magazineId,
            remainingDownloads: tokenData.maxDownloads - tokenData.downloadCount,
            expiresAt: new Date(tokenData.expiresAt).toISOString(),
            downloadCount: tokenData.downloadCount
        });

    } catch (error) {
        console.error('Download info API error:', error);
        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}
