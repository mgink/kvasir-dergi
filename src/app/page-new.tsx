import Link from 'next/link'; import { heroSlides } from '@/data/mockData'; import HeroSlider from '@/components/HeroSlider'; export default function Home() {
    return (<div style={{ background: '#fafafa', minHeight: '100vh' }}>            {/* Hero Slider */}            <HeroSlider slides={heroSlides} />            {/* About Section */}            <section style={{ padding: '6rem 0', background: 'white' }}>                <div className="container">                    <div className="row align-items-center">                        <div className="col-lg-6 mb-5 mb-lg-0">                            <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '20px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '6rem', position: 'relative', overflow: 'hidden' }}>                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}></div>                                <div style={{ position: 'relative', zIndex: 1 }}>                                    <i className="fas fa-book-open"></i>                                </div>                            </div>                        </div>                        <div className="col-lg-6">                            <div style={{ paddingLeft: '2rem' }}>                                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d3748', marginBottom: '1.5rem' }}>                                    Kvasir Dergi Nedir?                                </h2>                                <p style={{ fontSize: '1.1rem', color: '#718096', lineHeight: '1.8', marginBottom: '2rem' }}>                                    Kvasir Dergi, Türkiye'nin önde gelen edebiyat, sanat ve kültür dergisidir.                                     Her ay sizleri bekleyen dergimizde, güncel yazılar, derinlemesine analizler,                                     sanat eserleri ve kültürel değerlendirmeler bulabilirsiniz.                                </p>                                <p style={{ fontSize: '1.1rem', color: '#718096', lineHeight: '1.8', marginBottom: '2.5rem' }}>                                    Alanında uzman yazarlarımız, akademisyenlerimiz ve sanatçılarımızla birlikte                                     kültür dünyasının nabzını tutuyoruz. Geçmişten günümüze uzanan kültürel                                     mirasımızı modern bir bakış açısıyla ele alıyoruz.                                </p>                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>                                    <Link href="/about" style={{ background: 'linear-gradient(135deg, #4299e1, #63b3ed)', color: 'white', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease' }}                                    >                                        <i className="fas fa-info-circle"></i>                                        Hakkımızda                                    </Link>                                    <Link href="/contact" style={{ background: 'transparent', color: '#4299e1', border: '2px solid #4299e1', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease' }}                                    >                                        <i className="fas fa-envelope"></i>                                        İletişim                                    </Link>                                </div>                            </div>                        </div>                    </div>                </div>            </section>            {/* Features Section */}            <section style={{ background: '#fafafa', padding: '5rem 0' }}>                <div className="container">                    <div className="text-center mb-5">                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d3748', marginBottom: '1rem' }}>                            Neden Kvasir Dergi?                        </h2>                        <p style={{ color: '#718096', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>                            Edebiyat ve sanat dünyasının en kaliteli içeriklerini sunuyoruz                        </p>                    </div>                    <div className="row">                        <div className="col-md-4 mb-4 text-center">                            <div style={{
        width: '100px', height: '100px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white', fontSize: '2rem'
    }}>
        <i className="fas fa-star"></i>
    </div>
        <h5 style={{
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1rem'
        }}>
            Kaliteli İçerik
        </h5>
        <p style={{ color: '#718096', lineHeight: '1.6' }}>
            Edebiyat ve sanat dünyasından en güncel ve kaliteli yazılar
        </p>
    </div>

        <div className="col-md-4 mb-4 text-center">
            <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2rem'
            }}>
                <i className="fas fa-users"></i>
            </div>
            <h5 style={{
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1rem'
            }}>
                Uzman Yazarlar
            </h5>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
                Alanında uzman yazarlardan oluşan güçlü kadromuz
            </p>
        </div>

        <div className="col-md-4 mb-4 text-center">
            <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2rem'
            }}>
                <i className="fas fa-calendar-alt"></i>
            </div>
            <h5 style={{
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '1rem'
            }}>
                Aylık Yayın
            </h5>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
                Her ay düzenli olarak yeni sayılarımızla karşınızdayız
            </p>
        </div>
    </div>
    </div>
    </section>

        {/* CTA Section */}
        <section style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            padding: '4rem 0',
            color: 'white'
        }}>
            <div className="container text-center">
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                }}>
                    Hemen Mağazamızı Ziyaret Edin!
                </h2>
                <p style={{
                    fontSize: '1.2rem',
                    marginBottom: '2rem',
                    opacity: 0.9
                }}>
                    En güncel sayılarımızı keşfedin ve kültür yolculuğunuza başlayın
                </p>
                <Link
                    href="/store"
                    style={{
                        background: 'white',
                        color: '#4facfe',
                        padding: '1rem 2.5rem',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <i className="fas fa-shopping-cart"></i>
                    Mağazayı Keşfet
                </Link>
            </div>
        </section>
    </div>
    );
}
