// Download token utilities
// Separate from API route to allow imports

interface DownloadToken {
    magazineId: string;
    customerId: string;
    orderId: string;
    expiresAt: number;
    downloadCount: number;
    maxDownloads: number;
}

// Mock token database - in real app, use database or Redis
const tokenDatabase = new Map<string, DownloadToken>();

// Generate download token
export function generateDownloadToken(magazineId: string, customerId: string, orderId: string): string {
    const token = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days

    tokenDatabase.set(token, {
        magazineId,
        customerId,
        orderId,
        expiresAt,
        downloadCount: 0,
        maxDownloads: 5 // Allow 5 downloads per token
    });

    return token;
}

// Validate download token
export function validateToken(token: string): { valid: boolean; data?: DownloadToken; error?: string } {
    const tokenData = tokenDatabase.get(token);

    if (!tokenData) {
        return { valid: false, error: 'Geçersiz indirme bağlantısı' };
    }

    if (Date.now() > tokenData.expiresAt) {
        tokenDatabase.delete(token);
        return { valid: false, error: 'İndirme bağlantısının süresi dolmuş' };
    }

    if (tokenData.downloadCount >= tokenData.maxDownloads) {
        return { valid: false, error: 'İndirme limiti aşıldı' };
    }

    return { valid: true, data: tokenData };
}

// Update download count
export function incrementDownloadCount(token: string): boolean {
    const tokenData = tokenDatabase.get(token);
    if (tokenData) {
        tokenData.downloadCount++;
        tokenDatabase.set(token, tokenData);
        return true;
    }
    return false;
}

// Get token database (for API use)
export function getTokenDatabase(): Map<string, DownloadToken> {
    return tokenDatabase;
}
