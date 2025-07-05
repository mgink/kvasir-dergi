// Mail Template Service
// Bu servis farklı durumlarda gönderilecek mail şablonlarını içerir

export interface EmailTemplate {
    subject: string;
    html: string;
    text: string;
}

export interface OrderEmailData {
    customerName: string;
    orderNumber: string;
    orderItems: Array<{
        title: string;
        issue: number;
        quantity: number;
        price: number;
    }>;
    total: number;
    orderDate: string;
    shippingAddress?: string;
    digitalItems?: Array<{
        title: string;
        issue: number;
        downloadLink: string;
    }>;
}

export interface ContactEmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string; // Changed from submittedAt to date for consistency
}

export class EmailService {
    private static baseTemplate = (content: string): string => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kvasir Dergi</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background: linear-gradient(135deg, #4299e1, #667eea); color: white; padding: 40px 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
                .header p { margin: 10px 0 0 0; opacity: 0.9; }
                .content { padding: 40px 30px; }
                .footer { background-color: #2d3748; color: white; padding: 30px; text-align: center; }
                .footer p { margin: 0; opacity: 0.8; }
                .btn { display: inline-block; background: linear-gradient(135deg, #4299e1, #63b3ed); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                .order-item { border-bottom: 1px solid #e2e8f0; padding: 15px 0; }
                .order-item:last-child { border-bottom: none; }
                .total { background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📚 Kvasir Dergi</h1>
                    <p>Edebiyat, Sanat ve Kültür</p>
                </div>
                <div class="content">
                    ${content}
                </div>
                <div class="footer">
                    <p>© 2025 Kvasir Dergi. Tüm hakları saklıdır.</p>
                    <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // 1. Sipariş Onay Maili
    static generateOrderConfirmation(data: OrderEmailData): EmailTemplate {
        const itemsHtml = data.orderItems.map(item => `
            <div class="order-item">
                <strong>${item.title} - Sayı ${item.issue}</strong><br>
                <span style="color: #718096;">Adet: ${item.quantity} × ₺${item.price} = ₺${item.quantity * item.price}</span>
            </div>
        `).join('');

        const content = `
            <h2 style="color: #2d3748;">Siparişiniz Alındı! 🎉</h2>
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Siparişiniz başarıyla alındı ve işleme konuldu. Sipariş detaylarınız aşağıdadır:</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4299e1;">Sipariş No: ${data.orderNumber}</h3>
                <p><strong>Sipariş Tarihi:</strong> ${data.orderDate}</p>
                
                <h4 style="color: #2d3748;">Sipariş Edilen Ürünler:</h4>
                ${itemsHtml}
                
                <div class="total">
                    <h4 style="margin: 0; color: #2d3748;">Toplam Tutar: ₺${data.total}</h4>
                </div>
            </div>
            
            <p>Siparişiniz 1-2 iş günü içinde hazırlanacak ve kargo firmasına teslim edilecektir. Kargo takip numaranız size ayrıca bildirilecelctir.</p>
            
            <a href="#" class="btn">Siparişimi Takip Et</a>
            
            <p>Teşekkür ederiz,<br><strong>Kvasir Dergi Ekibi</strong></p>
        `;

        return {
            subject: `Siparişiniz Alındı - ${data.orderNumber}`,
            html: this.baseTemplate(content),
            text: `Siparişiniz alındı. Sipariş No: ${data.orderNumber}. Toplam: ₺${data.total}`
        };
    }

    // 2. Kargo Bildirim Maili
    static generateShippingNotification(data: OrderEmailData & { trackingNumber: string }): EmailTemplate {
        const content = `
            <h2 style="color: #2d3748;">Siparişiniz Kargoya Verildi! 📦</h2>
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Siparişiniz kargo firmasına teslim edildi ve size doğru yola çıktı!</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4299e1;">Kargo Bilgileri</h3>
                <p><strong>Sipariş No:</strong> ${data.orderNumber}</p>
                <p><strong>Takip No:</strong> ${data.trackingNumber}</p>
                <p><strong>Tahmini Teslimat:</strong> 2-3 iş günü</p>
            </div>
            
            <p>Kargonuzu takip etmek için takip numarasını kargo firmasının web sitesinde kullanabilirsiniz.</p>
            
            <a href="#" class="btn">Kargonu Takip Et</a>
            
            <p>İyi okumalar dileriz,<br><strong>Kvasir Dergi Ekibi</strong></p>
        `;

        return {
            subject: `Siparişiniz Kargoya Verildi - ${data.orderNumber}`,
            html: this.baseTemplate(content),
            text: `Siparişiniz kargoya verildi. Takip No: ${data.trackingNumber}`
        };
    }

    // 3. Dijital İçerik Gönderim Maili
    static generateDigitalDelivery(data: OrderEmailData): EmailTemplate {
        const digitalItemsHtml = data.digitalItems?.map(item => `
            <div class="order-item">
                <strong>${item.title} - Sayı ${item.issue}</strong><br>
                <a href="${item.downloadLink}" class="btn" style="margin: 10px 0;">📄 PDF İndir</a>
            </div>
        `).join('') || '';

        const content = `
            <h2 style="color: #2d3748;">Dijital Dergileriniz Hazır! 📱</h2>
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Sipariş ettiğiniz dijital dergiler aşağıdaki linklerden indirebilirsiniz:</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4299e1;">Dijital İçerikler</h3>
                ${digitalItemsHtml}
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>⚠️ Önemli:</strong> İndirme linkleri 30 gün boyunca aktif kalacaktır. Dergilerinizi bilgisayarınıza kaydetmeyi unutmayın.</p>
            </div>
            
            <p>İyi okumalar dileriz,<br><strong>Kvasir Dergi Ekibi</strong></p>
        `;

        return {
            subject: `Dijital Dergileriniz Hazır - ${data.orderNumber}`,
            html: this.baseTemplate(content),
            text: `Dijital dergileriniz hazır. Sipariş No: ${data.orderNumber}`
        };
    }

    // 4. İletişim Formu Bildirimi
    static generateContactFormNotification(data: ContactEmailData): EmailTemplate {
        const content = `
            <h2 style="color: #2d3748;">Yeni İletişim Mesajı 📧</h2>
            <p>Web sitesinden yeni bir mesaj alındı:</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4299e1;">Mesaj Detayları</h3>
                <p><strong>Gönderen:</strong> ${data.name}</p>
                <p><strong>E-posta:</strong> ${data.email}</p>
                <p><strong>Konu:</strong> ${data.subject}</p>
                <p><strong>Tarih:</strong> ${data.date}</p>
                
                <h4 style="color: #2d3748;">Mesaj:</h4>
                <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4299e1;">
                    ${data.message.replace(/\n/g, '<br>')}
                </div>
            </div>
            
            <a href="mailto:${data.email}" class="btn">Yanıtla</a>
        `;

        return {
            subject: `Yeni İletişim Mesajı - ${data.subject}`,
            html: this.baseTemplate(content),
            text: `Yeni mesaj: ${data.name} (${data.email}) - ${data.subject}`
        };
    }

    // 5. Sipariş İptali Bildirimi
    static generateOrderCancellation(data: OrderEmailData & { reason?: string }): EmailTemplate {
        const content = `
            <h2 style="color: #e53e3e;">Sipariş İptali Bildirimi ❌</h2>
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Maalesef siparişiniz iptal edilmiştir.</p>
            
            <div style="background-color: #fed7d7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e53e3e;">
                <h3 style="margin-top: 0; color: #742a2a;">İptal Edilen Sipariş</h3>
                <p><strong>Sipariş No:</strong> ${data.orderNumber}</p>
                <p><strong>Tutar:</strong> ₺${data.total}</p>
                ${data.reason ? `<p><strong>İptal Sebebi:</strong> ${data.reason}</p>` : ''}
            </div>
            
            <p>Ödeme yaptıysanız, tutarınız 3-5 iş günü içinde hesabınıza iade edilecektir.</p>
            
            <p>Sorularınız için bizimle iletişime geçebilirsiniz.</p>
            
            <a href="/contact" class="btn">İletişime Geç</a>
            
            <p>Özür dileriz,<br><strong>Kvasir Dergi Ekibi</strong></p>
        `;

        return {
            subject: `Sipariş İptali - ${data.orderNumber}`,
            html: this.baseTemplate(content),
            text: `Siparişiniz iptal edildi. Sipariş No: ${data.orderNumber}`
        };
    }

    // 6. Yeni Sayı Duyuru Maili
    static generateNewIssueAnnouncement(issueData: { title: string; issue: number; description: string; price: number }): EmailTemplate {
        const content = `
            <h2 style="color: #2d3748;">Yeni Sayımız Çıktı! 🎉</h2>
            <p>Sevgili okuyucularımız,</p>
            <p>Kvasir Dergi'nin yeni sayısı yayınlandı!</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #4299e1;">${issueData.title} - Sayı ${issueData.issue}</h3>
                <p>${issueData.description}</p>
                <div class="total">
                    <h4 style="margin: 0; color: #2d3748;">Fiyat: ₺${issueData.price}</h4>
                </div>
            </div>
            
            <p>Yeni sayımızı hemen sipariş etmek için aşağıdaki butona tıklayın:</p>
            
            <a href="/store" class="btn">Hemen Sipariş Ver</a>
            
            <p>İyi okumalar dileriz,<br><strong>Kvasir Dergi Ekibi</strong></p>
        `;

        return {
            subject: `Yeni Sayı Yayında! - ${issueData.title} Sayı ${issueData.issue}`,
            html: this.baseTemplate(content),
            text: `Yeni sayı: ${issueData.title} - Sayı ${issueData.issue}. Fiyat: ₺${issueData.price}`
        };
    }

    // Mail gönderme simülasyonu
    static async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
        try {
            // Gerçek uygulamada burada SMTP servis (SendGrid, AWS SES, vs.) kullanılır
            console.log('📧 Mail gönderiliyor:', {
                to,
                subject: template.subject,
                html: template.html.substring(0, 100) + '...'
            });

            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulated success
            return Math.random() > 0.1; // %90 başarı oranı
        } catch (error) {
            console.error('Mail gönderme hatası:', error);
            return false;
        }
    }

    // Toplu mail gönderme
    static async sendBulkEmail(recipients: string[], template: EmailTemplate): Promise<{ success: number; failed: number }> {
        let success = 0;
        let failed = 0;

        for (const recipient of recipients) {
            const result = await this.sendEmail(recipient, template);
            if (result) {
                success++;
            } else {
                failed++;
            }

            // Rate limiting - gerçek servislerde gerekli
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return { success, failed };
    }

    // Helper method for contact form submissions
    static async sendContactNotification(contactData: ContactEmailData): Promise<boolean> {
        const template = this.generateContactFormNotification(contactData);
        // In real app, this would send to admin email
        return await this.sendEmail('admin@kvasirdergi.com', template);
    }
}
