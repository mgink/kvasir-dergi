# 📚 Kvasir Dergi - Premium E-commerce Platform

Modern, responsive ve kullanıcı dostu bir dergi e-ticaret platformu. Next.js 15 ve TypeScript ile geliştirilmiş, tam özellikli bir online mağaza ve yönetim sistemi.

## 🌟 Öne Çıkan Özellikler

### 🛍️ **E-ticaret Özellikleri**
- **İnteraktif Mağaza**: Pop-up modal dergi önizlemeleri
- **Akıllı Sıralama**: En yeni/eski önce filtreleme
- **Responsive Sepet**: Animasyonlu ürün ekleme sistemi
- **Güvenli Checkout**: Müşteri bilgileri ve ödeme simülasyonu
- **Dijital Teslimat**: Secure token-based PDF download sistemi

### ⚡ **Admin Panel**
- **Real-time Dashboard**: 30 saniye otomatik güncelleme
- **Content Management**: Tüm site içeriğini yönetme
- **Order Management**: Sipariş durumu takibi ve güncelleme
- **Email Templates**: 6 çeşit profesyonel email şablonu
- **Analytics**: Satış ve kullanıcı istatistikleri

### 📧 **İletişim Sistemi**
- **EmailService**: Otomatik email bildirimleri
- **Contact Form**: Admin bildirimli iletişim formu
- **Order Notifications**: Sipariş durumu güncellemeleri
- **Digital Delivery**: PDF indirme linkleri

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobil-first yaklaşım
- **Smooth Animations**: Butik kullanıcı deneyimi
- **Bootstrap 5**: Professional component library
- **Custom 404**: Site temasına uygun hata sayfaları

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+ 
- npm, yarn, pnpm veya bun

### Projeyi Çalıştırma

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
src/
├── app/                 # Next.js App Router sayfaları
│   ├── about/          # Hakkımızda sayfası
│   ├── admin/          # Admin paneli
│   ├── cart/           # Sepet sayfası
│   ├── contact/        # İletişim sayfası
│   ├── store/          # Mağaza sayfası
│   ├── layout.tsx      # Ana layout
│   └── page.tsx        # Anasayfa
├── components/         # React bileşenleri
│   ├── Footer.tsx      # Footer bileşeni
│   └── Navbar.tsx      # Navigation bileşeni
├── data/              # Mock veri
│   └── mockData.ts    # Örnek dergi ve mesaj verileri
├── lib/               # Utility fonksiyonları
│   └── CartContext.tsx # Sepet context'i
└── types/             # TypeScript tip tanımları
    └── index.ts       # Ana tip tanımları
```

## 🎯 Temel Bileşenler

### Magazine Interface
```typescript
interface Magazine {
  id: string;
  title: string;
  issue: number;
  coverImage: string;
  price: number;
  description: string;
  publishDate: string;
  isAvailable: boolean;
  digitalVersion?: string;
  category?: string;
}
```

### Cart Context
- `addToCart()` - Sepete ürün ekleme
- `removeFromCart()` - Sepetten ürün çıkarma
- `updateQuantity()` - Miktar güncelleme
- `getTotalPrice()` - Toplam fiyat hesaplama

## 🔧 Admin Paneli

**Giriş Bilgileri:**
- Kullanıcı adı: `admin`
- Şifre: `admin123`

Admin panelinde yapılabilecekler:
- Dergi stok durumu değiştirme
- İletişim mesajlarını okuma ve işaretleme
- Sipariş yönetimi (gelecek özellik)

## 🎨 Tasarım Sistemi

- **Renk Paleti**: Indigo ve Purple gradient
- **Typography**: Modern, okunabilir fontlar
- **Layout**: Responsive grid system
- **Components**: Yeniden kullanılabilir UI bileşenleri

## 📱 Responsive Tasarım

- **Mobile First**: Mobil cihazlar öncelikli tasarım
- **Breakpoints**: sm, md, lg, xl için optimize edilmiş
- **Touch Friendly**: Dokunmatik cihazlar için uygun boyutlar

## 🚧 Gelecek Özellikler

- [ ] Kullanıcı kayıt/giriş sistemi
- [ ] Ödeme entegrasyonu
- [ ] E-posta bildirimleri
- [ ] Gelişmiş admin paneli
- [ ] Arama ve filtreleme iyileştirmeleri
- [ ] Blog sistemi
- [ ] Newsletter aboneliği

## 📄 Lisans

Bu proje eğitim amaçlı olarak geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için [iletişim sayfası](/contact) üzerinden bizimle iletişime geçebilirsiniz.
