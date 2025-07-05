import { Magazine, ContactMessage } from '@/types';

// Hero Slider Data
export interface SlideData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    buttonText?: string;
    buttonLink?: string;
    isActive: boolean;
}

export const heroSlides: SlideData[] = [
    {
        id: '1',
        title: 'Kvasir Dergi ile Kültür Yolculuğu',
        description: 'Edebiyat, sanat ve kültür dünyasının kapılarını aralayın. Her sayıda yeni keşifler sizi bekliyor.',
        imageUrl: '', // Admin panelinden güncellenecek
        buttonText: 'Mağazayı Keşfet',
        buttonLink: '/store',
        isActive: true
    },
    {
        id: '2',
        title: 'Son Sayımız Çıktı!',
        description: 'Modern Türk şiiri özel dosyası ile 25. sayımız raflarda. Hemen sipariş verin!',
        imageUrl: '', // Admin panelinden güncellenecek
        buttonText: 'Hemen Al',
        buttonLink: '/store',
        isActive: true
    },
    {
        id: '3',
        title: 'Abonelik Avantajları',
        description: 'Yıllık abonelik ile tüm sayılarımızı %20 indirimle alın ve kapınıza kadar ücretsiz kargo.',
        imageUrl: '', // Admin panelinden güncellenecek
        buttonText: 'Abone Ol',
        buttonLink: '/store',
        isActive: true
    }
];

export const magazines: Magazine[] = [
    {
        id: '1',
        title: 'Kvasir Dergi',
        issue: 25,
        coverImage: '/images/magazines/issue-25.jpg',
        price: 45,
        description: 'Edebiyat, sanat ve kültür dergisi. Bu sayıda modern Türk şiiri özel dosyası.',
        publishDate: '2024-12-01',
        isAvailable: true,
        digitalVersion: '/digital/issue-25.pdf',
        category: 'Edebiyat'
    },
    {
        id: '2',
        title: 'Kvasir Dergi',
        issue: 24,
        coverImage: '/images/magazines/issue-24.jpg',
        price: 45,
        description: 'Çağdaş sanat ve eleştiri özel sayısı. Türkiyeli sanatçıların güncel çalışmaları.',
        publishDate: '2024-11-01',
        isAvailable: true,
        digitalVersion: '/digital/issue-24.pdf',
        category: 'Sanat'
    },
    {
        id: '3',
        title: 'Kvasir Dergi',
        issue: 23,
        coverImage: '/images/magazines/issue-23.jpg',
        price: 40,
        description: 'Felsefe ve düşünce tarihi dosyası. Antik çağdan modern döneme felsefi akımlar.',
        publishDate: '2024-10-01',
        isAvailable: true,
        category: 'Felsefe'
    },
    {
        id: '4',
        title: 'Kvasir Dergi',
        issue: 22,
        coverImage: '/images/magazines/issue-22.jpg',
        price: 40,
        description: 'Sinema ve televizyon kültürü özel sayısı. Türk sinemasının yeni dönemi.',
        publishDate: '2024-09-01',
        isAvailable: false,
        category: 'Sinema'
    }
];

export const contactMessages: ContactMessage[] = [
    {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        subject: 'Dergi Aboneliği',
        message: 'Merhaba, yıllık abonelik hakkında bilgi alabilir miyim?',
        date: '2024-12-25',
        isRead: false
    },
    {
        id: '2',
        name: 'Elif Kaya',
        email: 'elif@example.com',
        subject: 'Eski Sayılar',
        message: 'Geçmiş sayılardan 15. sayıyı temin etmek mümkün mü?',
        date: '2024-12-24',
        isRead: true
    }
];

// About Data
export interface AboutData {
    id: string;
    title: string;
    content: string;
    mission: string;
    vision: string;
    values: string[];
    history: string;
    team: {
        name: string;
        position: string;
        description: string;
    }[];
    lastUpdated: string;
}

export const aboutData: AboutData = {
    id: '1',
    title: 'Kvasir Dergi Hakkında',
    content: 'Kvasir Dergi, edebiyat, sanat ve kültür alanında Türkiye\'nin öncü dergilerinden biridir. 2020 yılında kurulan dergimiz, çağdaş Türk edebiyatına ve sanatına katkıda bulunmayı misyon edinmiştir.',
    mission: 'Türk edebiyatı ve sanatını desteklemek, genç yetenekleri keşfetmek ve okuyucularımızla buluşturmak.',
    vision: 'Türkiye\'nin en saygın kültür dergisi olmak ve uluslararası arenada Türk kültürünü temsil etmek.',
    values: [
        'Kaliteli İçerik Üretimi',
        'Sanatsal Özgünlük',
        'Kültürel Çeşitlilik',
        'Akademik Titizlik',
        'Toplumsal Sorumluluk'
    ],
    history: 'Dergimiz, bir grup edebiyat severin hayali ile başladı. İlk sayımızı 2020 yılının Mart ayında yayınladık ve bugüne kadar 25 sayı çıkardık. Her sayımızda ünlü yazarlardan genç kalemlerimize kadar geniş bir yazar kadrosu yer almaktadır.',
    team: [
        {
            name: 'Dr. Mehmet Yılmaz',
            position: 'Genel Yayın Yönetmeni',
            description: 'Türk Dili ve Edebiyatı alanında doktora. 15 yıllık akademik deneyim.'
        },
        {
            name: 'Ayşe Kaya',
            position: 'Editör',
            description: 'Gazetecilik mezunu. Modern edebiyat ve eleştiri alanında uzman.'
        },
        {
            name: 'Can Özdemir',
            position: 'Sanat Yönetmeni',
            description: 'Güzel Sanatlar Fakültesi mezunu. Grafik tasarım ve görsel sanatlar uzmanı.'
        }
    ],
    lastUpdated: new Date().toISOString()
};
