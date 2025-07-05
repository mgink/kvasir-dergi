# Kvasir Dergi - E-commerce Website

Modern bir Next.js uygulaması olarak geliştirilmiş Kvasir Dergi e-ticaret websitesi. Edebiyat, sanat ve kültür dergisi satışı için tasarlanmış kapsamlı bir platform.

## 🚀 Özellikler

### Kullanıcı Tarafı
- **Anasayfa**: Hero section, son sayılar ve özellikler
- **Mağaza**: Dergi listesi, filtreleme ve sepete ekleme
- **Sepet**: Ürün yönetimi ve checkout süreci
- **Hakkımızda**: Şirket bilgileri ve ekip tanıtımı
- **İletişim**: İletişim formu ve sık sorulan sorular

### Admin Paneli
- **Dergi Yönetimi**: Dergi ekleme, düzenleme ve stok yönetimi
- **Mesaj Yönetimi**: İletişim formundan gelen mesajları görüntüleme
- **Sipariş Takibi**: Müşteri siparişlerini yönetme
- **Basit Authentication**: Admin girişi

### Teknik Özellikler
- **Next.js 15** - App Router ile
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern ve responsive tasarım
- **React Context** - State yönetimi (sepet, kullanıcı)
- **Heroicons** - İkonlar
- **Responsive Design** - Mobil uyumlu

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
