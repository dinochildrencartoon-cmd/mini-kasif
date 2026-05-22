/**
 * Mini Kâşif MVP - Ana Uygulama Mantığı (Vanilla JS)
 */

const DEMO_HTML = `<!-- 2. ÇOCUK ANA EKRANI (KIDS DASHBOARD) -->
    <section id="kids-dashboard" class="screen">
        <!-- Uyarı Bannerı -->
        <div class="demo-warning-banner">
            <span class="warning-text">⚠️ Şu anda gerçek ödeme işlemi yapılmamaktadır. Premium özellikler lansman sonrası aktif edilecektir.</span>
            <button class="btn btn-secondary btn-sm btn-exit-demo">Ana Sayfaya Dön 🚪</button>
        </div>
        <header class="kids-header">
            <button class="btn-back-circle" id="btn-back-to-landing">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20,11H7.83L13.41,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z"/></svg>
            </button>
            <div class="kids-header-title">
                <h2>Merhaba Küçük Kâşif! 🌟</h2>
                <p>Bugün hangi maceraya katılmak istersin?</p>
            </div>
            <button class="btn-parent-gate" id="btn-parent-gate-dashboard">
                <span>Ebeveyn Alanı 🔒</span>
            </button>
        </header>

        <main class="kids-categories">
            <div class="categories-grid" id="categories-container">
                <!-- Dinamik olarak app.js tarafından doldurulacak -->
            </div>
        </main>

        <div class="kids-footer">
            <div class="stars-counter">
                <span class="star-icon">⭐</span>
                <span id="total-stars-count">0</span> Yıldız Topladın!
            </div>
            <button class="btn-badges-view" id="btn-view-badges">
                🏆 Rozetlerim
            </button>
        </div>
    </section>

    <!-- 3. ÇOCUK ETKİNLİK / OYUN EKRANI (KIDS ACTIVITY SCREEN) -->
    <section id="kids-activity-screen" class="screen">
        <!-- Uyarı Bannerı -->
        <div class="demo-warning-banner">
            <span class="warning-text">⚠️ Şu anda gerçek ödeme işlemi yapılmamaktadır. Premium özellikler lansman sonrası aktif edilecektir.</span>
            <button class="btn btn-secondary btn-sm btn-exit-demo">Ana Sayfaya Dön 🚪</button>
        </div>
        <header class="activity-header">
            <button class="btn-back-circle" id="btn-exit-activity">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20,11H7.83L13.41,5.41L12,4L4,12L12,20L13.41,18.59L7.83,13H20V11Z"/></svg>
            </button>
            <div class="activity-category-title" id="activity-title">Renkler</div>
            <div class="activity-progress-bar">
                <div class="progress-fill" id="activity-progress-fill" style="width: 0%"></div>
            </div>
        </header>

        <main class="activity-content">
            <!-- TAB SEÇİMİ (VİDEO / QUIZ) -->
            <div class="activity-tabs">
                <button class="tab-btn active" id="tab-video">📺 İzle & Keşfet</button>
                <button class="tab-btn" id="tab-quiz">🎮 Oyna & Pekiştir</button>
            </div>

            <!-- VİDEO / KEŞİF MODU -->
            <div id="mode-video" class="activity-tab-content active">
                <div class="video-container">
                    <div class="interactive-video-sim" id="video-sim-canvas">
                        <!-- Buraya CSS animasyonlu görsel öğretim kartı gelecek -->
                    </div>
                    <button class="btn-play-voice" id="btn-play-voice">
                        🔊 Sesli Anlatımı Dinle
                    </button>
                </div>
                <div class="video-instruction">
                    <h3>Yukarıdaki sevimli şekilleri izle ve dinle!</h3>
                    <p>Hazır olduğunda yukarıdaki <strong>"Oyna & Pekiştir"</strong> sekmesine geçerek ödül yıldızını kazan!</p>
                </div>
            </div>

            <!-- QUIZ MODU -->
            <div id="mode-quiz" class="activity-tab-content">
                <div class="quiz-question-box">
                    <button class="btn-sound-replay" id="btn-replay-question" title="Soruyu Tekrar Dinle">🔊</button>
                    <h2 id="quiz-question-text">Hangisi mavi renklidir?</h2>
                </div>

                <div class="quiz-options-grid" id="quiz-options-container">
                    <!-- Dinamik şıklar -->
                </div>

                <div class="quiz-feedback-banner" id="quiz-feedback">
                    Soruyu cevaplayıp yıldızları topla! 🌟
                </div>
            </div>
        </main>
    </section>

    <!-- ROZETLERİM MODALI (KIDS BADGES MODAL) -->
    <div id="badges-modal" class="modal-overlay">
        <div class="modal-card kids-modal">
            <button class="modal-close" id="btn-close-badges">×</button>
            <h2>Kâşif Rozetlerin 🏆</h2>
            <p>Görevleri ve quizleri tamamlayarak kazandığın süper rozetler!</p>
            <div class="badges-grid" id="badges-container">
                <!-- Rozet kartları -->
            </div>
            <button class="btn btn-primary" id="btn-badges-confirm">Harika, Devam Et! 🚀</button>
        </div>
    </div>

    <!-- EKRAN DIŞI GÖREV MODALI (OFFLINE MISSION MODAL) -->
    <div id="mission-modal" class="modal-overlay">
        <div class="modal-card kids-modal mission-card">
            <div class="mission-icon">🏃✨</div>
            <h2>Sıradaki Macera Ekran Dışında!</h2>
            <div class="mission-text-container">
                <p id="mission-description">Odandaki 3 tane mavi renkli nesneyi bulup anne veya babana göster!</p>
            </div>
            <div class="alert alert-info">
                💡 <strong>Ebeveynlere Not:</strong> Ekran süresini dengelemek için bu görevi çocuğunuzla birlikte yapın.
            </div>
            <div class="mission-actions">
                <button class="btn btn-primary btn-block" id="btn-claim-mission">
                    Görevi Tamamladım! (Ebeveyn Onayı)
                </button>
                <button class="btn btn-text btn-block" id="btn-close-mission">
                    Daha Sonra Yapacağım
                </button>
            </div>
        </div>
    </div>

    <!-- EBEVEYN KİLİDİ MODALI (PARENT GATE MODAL) -->
    <div id="parent-gate-modal" class="modal-overlay">
        <div class="modal-card">
            <button class="modal-close" id="btn-close-parent-gate">×</button>
            <div class="lock-header">
                <span class="lock-icon">🔒</span>
                <h2>Sadece Anne & Babalar İçin</h2>
                <p>Ebeveyn alanına geçmek için lütfen basit doğrulamayı tamamlayın.</p>
            </div>
            
            <div class="gate-math-box">
                <span id="gate-question">5 + 3 = ?</span>
            </div>

            <div class="gate-keypad">
                <button class="key-btn" data-key="1">1</button>
                <button class="key-btn" data-key="2">2</button>
                <button class="key-btn" data-key="3">3</button>
                <button class="key-btn" data-key="4">4</button>
                <button class="key-btn" data-key="5">5</button>
                <button class="key-btn" data-key="6">6</button>
                <button class="key-btn" data-key="7">7</button>
                <button class="key-btn" data-key="8">8</button>
                <button class="key-btn" data-key="9">9</button>
                <button class="key-btn" data-key="0">0</button>
                <button class="key-btn" data-key="10" class="btn-clear" id="btn-clear-gate">Temizle</button>
            </div>

            <div class="gate-input-display">
                Cevabınız: <strong id="gate-input-val">-</strong>
            </div>

            <div id="gate-error" class="gate-error-msg">Yanlış cevap, lütfen tekrar deneyin.</div>

            <div class="gate-actions">
                <button class="btn btn-secondary btn-block" id="btn-submit-gate">Giriş Yap</button>
            </div>
        </div>
    </div>

    <!-- 4. EBEVEYN PANELİ (PARENT PORTAL) -->
    <section id="parent-portal" class="screen">
        <!-- Uyarı Bannerı -->
        <div class="demo-warning-banner">
            <span class="warning-text">⚠️ Şu anda gerçek ödeme işlemi yapılmamaktadır. Premium özellikler lansman sonrası aktif edilecektir.</span>
            <button class="btn btn-secondary btn-sm btn-exit-demo">Ana Sayfaya Dön 🚪</button>
        </div>

        <header class="parent-header">
            <div class="logo">
                <span class="logo-icon">🚀</span>
                <span class="logo-text">Ebeveyn Paneli</span>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-exit-parent-portal">Çocuk Moduna Dön 🧒</button>
        </header>

        <div class="parent-layout">
            <!-- Yan Menü -->
            <aside class="parent-sidebar">
                <button class="sidebar-btn active" id="side-dashboard">
                    📊 Gelişim Raporu
                </button>
                <button class="sidebar-btn" id="side-limit">
                    ⏱️ Ekran Süresi Kontrolü
                </button>
                <button class="sidebar-btn" id="side-billing">
                    💳 Üyelik & Abonelik
                </button>
                <button class="sidebar-btn" id="side-early-access">
                    📋 Erken Erişim Başvurusu
                </button>
            </aside>

            <!-- İçerik Alanı -->
            <main class="parent-main">
                <!-- A. GELİŞİM RAPORU SEKMESİ -->
                <div id="parent-tab-dashboard" class="parent-tab-content active">
                    <!-- FREE VIEW -->
                    <div id="parent-dashboard-free-view" class="parent-dashboard-subview active">
                        <div class="parent-welcome-banner">
                            <h2>Ebeveyn Paneli (Ücretsiz Sürüm) 👋</h2>
                            <p>Premium plan ile çocuğunuzun tüm gelişim raporlarını ve akıllı süre sınırlama ayarlarını görebilirsiniz.</p>
                        </div>
                        
                        <!-- Özet Kartları (Free Sürüm) -->
                        <div class="stats-row">
                            <div class="stat-card">
                                <span class="stat-icon">⏱️</span>
                                <div class="stat-info">
                                    <h4>Bugünkü Kullanım Süresi</h4>
                                    <p id="parent-free-stat-time">12 Dakika</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🎬</span>
                                <div class="stat-info">
                                    <h4>Tamamlanan Ücretsiz İçerik</h4>
                                    <p id="parent-free-stat-adventure">Tamamlandı ✅</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🏆</span>
                                <div class="stat-info">
                                    <h4>Kazanılan Rozet</h4>
                                    <p id="parent-free-stat-badge">Mavi Kâşifi</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Sınırlı Gelişim Özeti -->
                        <div class="panel-box development-summary-limited" style="margin-top: 20px; padding: 20px; border-radius: var(--radius-sm); background: #f8fafc; border-left: 4px solid var(--color-primary-light);">
                            <h3>📈 Sınırlı Gelişim Özeti</h3>
                            <p style="margin: 8px 0 0 0; color: var(--color-text-muted);">Daha detaylı haftalık raporlar ve tüm kategoriler için Premium’u inceleyin.</p>
                        </div>

                        <!-- Premium Upsell Box -->
                        <div class="parent-premium-upsell-box">
                            <h4>💎 Premium ile Sınırsız Keşif Yolculuğu</h4>
                            <p>Tüm kategorilere (Sayılar, Şekiller, Hayvanlar...), detaylı gelişim grafiklerine ve özelleştirilebilir ekran süresi sınırlamasına erişmek için Premium'a geçin.</p>
                            <button class="btn btn-primary btn-go-to-billing">Premium'u İncele 🚀</button>
                        </div>
                    </div>

                    <!-- PREMIUM VIEW -->
                    <div id="parent-dashboard-premium-view" class="parent-dashboard-subview">
                        <div class="parent-welcome-banner">
                            <h2>Ebeveyn Paneli (Premium Sürüm) 👋</h2>
                            <p>Bu panel, ebeveynlerin ileride görebileceği örnek kullanım ve gelişim özetini temsil eder.</p>
                        </div>

                        <!-- Özet Kartları -->
                        <div class="stats-row">
                            <div class="stat-card">
                                <span class="stat-icon">⏱️</span>
                                <div class="stat-info">
                                    <h4>Toplam Süre</h4>
                                    <p id="parent-stat-time">0 Dakika</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">⭐</span>
                                <div class="stat-info">
                                    <h4>Kazanılan Yıldız</h4>
                                    <p id="parent-stat-stars">0 Yıldız</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🏆</span>
                                <div class="stat-info">
                                    <h4>Kazanılan Rozet</h4>
                                    <p id="parent-stat-badges">0 / 8 Rozet</p>
                                </div>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🏃</span>
                                <div class="stat-info">
                                    <h4>Ekran Dışı Görev</h4>
                                    <p id="parent-stat-missions">0 Görev</p>
                                </div>
                            </div>
                        </div>

                        <!-- Grafikler & İlerlemeler -->
                        <div class="dashboard-details">
                            <!-- Kategori İlerlemeleri -->
                            <div class="panel-box flex-2">
                                <h3>📚 Kategori Bazlı İlerleme Durumu</h3>
                                <p class="subtitle">Çocuğunuzun tamamladığı quizlerin kategorilere göre dağılımı.</p>
                                <div class="progress-list" id="parent-progress-list">
                                    <!-- Dinamik kategori ilerleme çubukları -->
                                </div>
                            </div>

                            <!-- Gelişim Grafiği (Simüle Edilmiş SVG Grafik) -->
                            <div class="panel-box flex-1">
                                <h3>📊 Günlük Aktivite Dağılımı</h3>
                                <p class="subtitle">Bu hafta kullanılan ortalama süre (dakika).</p>
                                <div class="chart-container">
                                    <svg class="bar-chart" viewBox="0 0 100 80">
                                        <rect x="5" y="50" width="8" height="30" fill="var(--color-primary-light)" rx="2"/>
                                        <rect x="18" y="40" width="8" height="40" fill="var(--color-primary-light)" rx="2"/>
                                        <rect x="31" y="60" width="8" height="20" fill="var(--color-primary-light)" rx="2"/>
                                        <rect x="44" y="30" width="8" height="50" fill="var(--color-primary-light)" rx="2"/>
                                        <rect x="57" y="20" width="8" height="60" fill="var(--color-primary)" rx="2"/>
                                        <rect x="70" y="45" width="8" height="35" fill="var(--color-primary)" rx="2"/>
                                        <rect x="83" y="10" width="8" height="70" fill="var(--color-secondary)" rx="2"/>
                                        
                                        <text x="9" y="78" font-size="4" text-anchor="middle" fill="#888">Pzt</text>
                                        <text x="22" y="78" font-size="4" text-anchor="middle" fill="#888">Sal</text>
                                        <text x="35" y="78" font-size="4" text-anchor="middle" fill="#888">Çar</text>
                                        <text x="48" y="78" font-size="4" text-anchor="middle" fill="#888">Per</text>
                                        <text x="61" y="78" font-size="4" text-anchor="middle" fill="#888">Cum</text>
                                        <text x="74" y="78" font-size="4" text-anchor="middle" fill="#888">Cmt</text>
                                        <text x="87" y="78" font-size="4" text-anchor="middle" fill="#888">Paz</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Pedagojik Özet & Detaylar (Yeni Bölüm) -->
                        <div class="dashboard-details" style="margin-top: 30px;">
                            <!-- Bugünkü Aktivite Detayları -->
                            <div class="panel-box flex-1">
                                <h3>🔍 Bugünkü Aktivite Detayları</h3>
                                <p class="subtitle">Bugün gerçekleştirilen etkinliklerin detaylı dökümü.</p>
                                <ul class="demo-activity-details-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">⏱️ Bugünkü Kullanım Süresi:</span>
                                        <strong style="color: var(--color-text); font-weight: 600;">12 dakika</strong>
                                    </li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">🎬 Tamamlanan İçerik:</span>
                                        <strong style="color: var(--color-text); font-weight: 600;">Mavi Rengi Keşfedelim</strong>
                                    </li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">🏆 Kazanılan Rozet:</span>
                                        <strong style="color: var(--color-text); font-weight: 600;">Mavi Kâşifi</strong>
                                    </li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">🎮 Quiz Sonucu:</span>
                                        <strong style="color: var(--color-text); font-weight: 600;">3 sorudan 2 doğru</strong>
                                    </li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">🏃 Ekran Dışı Görev:</span>
                                        <strong style="color: #22c55e; font-weight: 600;">Tamamlandı ✅</strong>
                                    </li>
                                    <li style="display: flex; justify-content: space-between; padding-bottom: 8px;">
                                        <span style="color: var(--color-text-muted); font-weight: 500;">💡 Öne Çıkan Beceri:</span>
                                        <strong style="color: var(--color-secondary); font-weight: 600;">Renk tanıma ve dikkat</strong>
                                    </li>
                                </ul>
                            </div>

                            <!-- Pedagojik Haftalık Gelişim Özeti -->
                            <div class="panel-box flex-1" style="background: linear-gradient(135deg, #fefefe 0%, #f0f7ff 100%); border: 1px solid var(--color-primary-light);">
                                <h3 style="color: var(--color-primary);">🌱 Pedagojik Haftalık Gelişim Özeti</h3>
                                <p class="subtitle">Uzman pedagoglarımızın çocuğunuzun bu haftaki gelişim analizi.</p>
                                <div style="background-color: white; padding: 20px; border-radius: var(--radius-sm); border-left: 4px solid var(--color-primary); box-shadow: var(--shadow-sm); line-height: 1.6; color: var(--color-text);">
                                    “Bu hafta çocuğunuz renkler kategorisinde ilerleme gösterdi. Özellikle mavi ve kırmızı renkleri ayırt etme, dikkatini kısa süreli etkinliklerde toplama ve ekran dışı görevleri tamamlama alanlarında gelişim gözlemlendi.”
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- B. EKRAN SÜRESİ KONTROLÜ SEKMESİ -->
                <div id="parent-tab-limit" class="parent-tab-content">
                    <div class="panel-box limit-box">
                        <h2>⏱️ Akıllı Süre Sınırlayıcı</h2>
                        <p class="subtitle">Çocuğunuzun göz sağlığı ve ekran dengesini korumak için günlük kullanım limiti belirleyebilirsiniz. Belirlediğiniz süre dolduğunda uygulama otomatik olarak kilitlenecektir.</p>
                        
                        <div class="limit-status">
                            <span class="status-indicator-badge" id="limit-status-badge">Aktif</span>
                            <p>Kalan Süre: <strong id="limit-remaining-display">15:00</strong></p>
                        </div>

                        <div class="limit-selector-group">
                            <span class="limit-select-label">Günlük Ekran Limiti Seçin:</span>
                            <div class="limit-buttons">
                                <button class="limit-preset-btn active" data-minutes="15">15 Dakika</button>
                                <button class="limit-preset-btn" data-minutes="30">30 Dakika</button>
                                <button class="limit-preset-btn" data-minutes="45">45 Dakika</button>
                                <button class="limit-preset-btn" data-minutes="0">Sınırsız (Kapat)</button>
                            </div>
                        </div>

                        <div class="alert alert-warning">
                            💡 <strong>Öneri:</strong> 3-6 yaş arası çocuklar için uzmanlar günlük ekran süresinin maksimum 45 dakika olmasını ve bunun 15'er dakikalık seanslara bölünmesini tavsiye eder.
                        </div>
                    </div>
                </div>

                <!-- C. ABONELİK & ÖDEME SEKMESİ -->
                <div id="parent-tab-billing" class="parent-tab-content">
                    <div class="panel-box billing-box">
                        <h2>💳 Üyelik ve Paket Yönetimi</h2>
                        
                        <div class="current-subscription-status" id="billing-status-box">
                            <div class="billing-status-info">
                                <h3>Üyelik Tipi: <span id="current-membership-label" class="badge-free">Ücretsiz Paket</span></h3>
                                <p id="membership-details-text">Ücretsiz planda Renkler kategorisinden sınırlı içerikler sunulmaktadır. Tüm özellikler için Premium plana geçiş planlanmaktadır.</p>
                            </div>
                        </div>

                        <!-- Üyelik İlgi Alanları -->
                        <div id="premium-checkout-container" class="checkout-form-wrapper">
                            <h3>Mini Kâşif Premium Deneyimi</h3>
                            <p class="subtitle">Mini Kâşif şu an lansman öncesi aşamadadır. Ürünün gelişimine katkıda bulunmak ve lansman fırsatlarından yararlanmak için ilgi durumunuzu belirtebilirsiniz:</p>
                            
                            <div class="demo-interest-actions">
                                <button class="btn btn-primary btn-block" id="btn-demo-interest-premium">
                                    ⭐ Premium ile İlgileniyorum (Premium Özellikleri Aç)
                                </button>
                                <button class="btn btn-secondary btn-block" id="btn-demo-go-early">
                                    🚀 Erken Erişime Katıl
                                </button>
                                <button class="btn btn-text btn-block" id="btn-demo-notify-launch">
                                    📧 Lansmanda Haber Ver
                                </button>
                            </div>
                        </div>

                        <div id="premium-active-actions" class="premium-active-box" style="display:none;">
                            <div class="alert alert-success">
                                🎉 <strong>Harika!</strong> Mini Kâşif Premium özellikleri aktif edildi! Tüm kilitler açıldı.
                            </div>
                            <button class="btn btn-danger btn-sm" id="btn-cancel-premium">Premium Özellikleri Kapat (Ücretsiz Pakete Dön)</button>
                        </div>
                    </div>
                </div>

                <!-- D. ERKEN ERİŞİM BAŞVURUSU SEKMESİ -->
                <div id="parent-tab-early-access" class="parent-tab-content">
                    <div class="panel-box early-access-summary-box">
                        <h2>📋 Erken Erişim Başvuru Bilgileriniz</h2>
                        <p class="subtitle">Mini Kâşif lansmanı öncesinde doldurduğunuz başvuru formu detayları ve özel durumunuz.</p>
                        
                        <div id="early-access-portal-view">
                            <!-- Javascript ile dinamik olarak doldurulacak -->
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section>

    <!-- UYKU EKRANI (SLEEP / TIME LIMIT EXPIRED SCREEN) -->
    <section id="sleep-screen" class="screen">
        <!-- Uyarı Bannerı -->
        <div class="demo-warning-banner">
            <span class="warning-text">⚠️ Şu anda gerçek ödeme işlemi yapılmamaktadır. Premium özellikler lansman sonrası aktif edilecektir.</span>
            <button class="btn btn-secondary btn-sm btn-exit-demo">Ana Sayfaya Dön 🚪</button>
        </div>
        <div class="sleep-content">
            <div class="sleeping-mascot-animation">
                <!-- Uykulu CSS Maskot -->
                <div class="sleep-eyes">😴</div>
                <div class="z-letters">
                    <span class="z1">Z</span>
                    <span class="z2">z</span>
                    <span class="z3">z</span>
                </div>
            </div>
            <h2>Mini Kâşif Dinleniyor... 💤</h2>
            <p>Bugünlük bu kadar öğrenme macerası yeterli! Gözlerimizi dinlendirelim ve yarın yepyeni maceralara yelken açalım.</p>
            
            <div class="sleep-actions">
                <button class="btn btn-secondary" id="btn-bypass-sleep">Ebeveyn Kilidini Aç (Süreyi Uzat)</button>
            </div>
        </div>
    </section>

    <!-- PREMIUM UPSELL MODAL -->
    <div id="premium-upsell-modal" class="modal-overlay">
        <div class="modal-card premium-upsell-card">
            <span class="premium-upsell-icon">💎</span>
            <h3>Premium Maceralar Seni Bekliyor!</h3>
            <p>Bu kategori Premium plan ile açılır. Çocuğunuzun tüm öğrenme alanlarına erişmesi için Premium’a geçebilirsiniz.</p>
            <div class="premium-upsell-actions">
                <button class="btn btn-primary" id="btn-upsell-review-premium">Premium'u İncele 🚀</button>
                <button class="btn btn-secondary" id="btn-upsell-continue-free">Şimdilik Renkler ile Devam Et 🧒</button>
            </div>
        </div>
    </div>

    <!-- Bildirim Balonu (Toast) -->
    <div id="toast-notification" class="toast">
        Harika! Bir yıldız kazandın. ⭐
    </div>

    <!-- Confetti Canvas (Oyun Başarılarında Patlayacak) -->
    <canvas id="confetti-canvas"></canvas>
`;
class MiniKasifApp {
    constructor() {
        // 1. Varsayılan Durum (State) Yönetimi ve localStorage Yükleme
        if (!localStorage.getItem('mk_initialized')) {
            localStorage.setItem('mk_initialized', 'true');
            localStorage.setItem('mk_stars', '25');
            localStorage.setItem('mk_badges', JSON.stringify(["🔵 Mavi Kâşifi"]));
            localStorage.setItem('mk_missions', '1');
            localStorage.setItem('mk_time_spent', '12');
            localStorage.setItem('mk_completed_adventures', JSON.stringify(["colors_Mavi Rengi Keşfedelim"]));
            localStorage.setItem('mk_progress', JSON.stringify({
                colors: 20, numbers: 0, shapes: 0, animals: 0,
                emotions: 0, manners: 0, english: 0, attention: 0
            }));
        }

        this.state = {
            starsCount: parseInt(localStorage.getItem('mk_stars')) || 0,
            unlockedBadges: JSON.parse(localStorage.getItem('mk_badges')) || [],
            completedMissions: parseInt(localStorage.getItem('mk_missions')) || 0,
            timeSpent: parseInt(localStorage.getItem('mk_time_spent')) || 0, // Toplam kullanılan dakika
            screenTimeLimit: parseInt(localStorage.getItem('mk_time_limit')) !== null ? parseInt(localStorage.getItem('mk_time_limit')) : 15, // varsayılan 15 dk
            isPremium: localStorage.getItem('mk_is_premium') === 'true',
            isMuted: localStorage.getItem('mk_is_muted') === 'true',
            completedAdventures: JSON.parse(localStorage.getItem('mk_completed_adventures')) || [],
            progress: JSON.parse(localStorage.getItem('mk_progress')) || {
                colors: 0, numbers: 0, shapes: 0, animals: 0,
                emotions: 0, manners: 0, english: 0, attention: 0
            }
        };

        // Oturum süresi kontrol değişkenleri
        this.sessionTimeRemaining = this.state.screenTimeLimit * 60; // saniye cinsinden
        this.timerInterval = null;
        this.activeScreen = 'landing-screen';
        this.currentView = 'categories'; // 'categories' veya 'adventures'
        this.currentAdventure = null;

        // Ebeveyn Kilidi Değişkenleri
        this.gatePendingAction = null; // Kilit açıldığında yapılacak işlem
        this.gateAnswer = 0;
        this.gateInput = '';

        // Quiz Durumu
        this.currentCategory = null;
        this.currentQuizIndex = 0;
        this.correctAnswersInSession = 0;

        // Erken Erişim Formu Durumu
        this.currentFormStep = 0;
        this.formAnswers = {};

        // Ses Sentezleyicisi (Text-to-Speech)
        this.speechSynth = window.speechSynthesis;
        this.ttsVoice = null;
        this.toastTimeout = null;

        // Kategori Veritabanı (8 Kategori)
        this.categoriesData = {
    "colors": {
        "id": "colors",
        "title": "Renkler",
        "emoji": "🎨",
        "color": "var(--color-primary)",
        "isFree": true,
        "adventures": [
            {
                "title": "Kırmızı Elma Nerede?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Ağaçtaki tatlı elmaların yardımıyla kırmızı rengini öğreniyoruz. Kırmızının canlılığını ve hayatımızdaki yerini keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Ağaçtaki kırmızı elma hangi renktir?",
                        "options": [
                            {
                                "emoji": "🔵",
                                "text": "Mavi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🔴",
                                "text": "Kırmızı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🟡",
                                "text": "Sarı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım, elmanın rengi güneş gibi sarı mı yoksa ateş gibi kırmızı mı?"
                    },
                    {
                        "question": "Hangisi kırmızı renkli bir meyvedir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Muz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Çilek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Erik",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Çilek reçeli yaparken tenceremiz hangi renge boyanır?"
                    },
                    {
                        "question": "İtfaiye araçları yolda giderken hangi renkle dikkat çeker?",
                        "options": [
                            {
                                "emoji": "🔴",
                                "text": "Kırmızı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🟢",
                                "text": "Yeşil",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟣",
                                "text": "Mor",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: İtfaiyenin rengi ormandaki ağaçlar gibi yeşil miydi yoksa kırmızı mı?"
                    }
                ],
                "mission": "Şimdi odandaki kırmızı renkli 3 oyuncağı bul ve anne veya babana göster!",
                "badge": "🍎 Kırmızı Elma Rozeti",
                "emoji": "🍎",
                "videoItems": [
                    {
                        "emoji": "🍎",
                        "label": "Kırmızı Elma Nerede?",
                        "color": "var(--color-primary)"
                    }
                ],
                "videoVoice": "Ağaçtaki tatlı elmaların yardımıyla kırmızı rengini öğreniyoruz. Kırmızının canlılığını ve hayatımızdaki yerini keşfediyoruz."
            },
            {
                "title": "Mavi Rengi Keşfedelim",
                "ageRecommendation": "3-4 Yaş",
                "description": "Derin ve huzurlu gökyüzü ile denizlerin mavi dünyasını sevimli mavi balıklar eşliğinde keşfe çıkıyoruz.",
                "quizzes": [
                    {
                        "question": "Hangisi mavi renklidir?",
                        "options": [
                            {
                                "emoji": "🔵",
                                "text": "Gökyüzü",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🍌",
                                "text": "Muz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🍅",
                                "text": "Domates",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım. Mavi rengi gökyüzünde görebiliriz."
                    }
                ],
                "mission": "Odandaki 3 mavi nesneyi bulup anne veya babana göster.",
                "badge": "🔵 Mavi Kâşifi",
                "emoji": "🔵",
                "videoItems": [
                    {
                        "emoji": "🔵",
                        "label": "Mavi Rengi Keşfedelim",
                        "color": "var(--color-primary)"
                    }
                ],
                "videoVoice": "Derin ve huzurlu gökyüzü ile denizlerin mavi dünyasını sevimli mavi balıklar eşliğinde keşfe çıkıyoruz."
            },
            {
                "title": "Sarı Güneş ve Parlak Yıldızlar",
                "ageRecommendation": "3-4 Yaş",
                "description": "Dünyamızı ısıtan sarı güneşi ve geceleri gökyüzünde parıldayan sarı yıldızları öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Sabahları gökyüzünde parlayan sıcacık güneş hangi renktir?",
                        "options": [
                            {
                                "emoji": "🟡",
                                "text": "Sarı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Gri",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Kahverengi",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Güneş limon gibi ekşi sarı bir renkte parıldar."
                    },
                    {
                        "question": "Hangisi sarı renkli lezzetli bir meyvedir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Kiraz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Muz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Karpuz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Maymunların en sevdiği, kabuğunu soyduğumuz meyve hangisi?"
                    },
                    {
                        "question": "Sonbaharda ağaçlardan dökülen yapraklar hangi renge dönüşür?",
                        "options": [
                            {
                                "emoji": "🔵",
                                "text": "Mavi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟡",
                                "text": "Sarı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Pembe",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kuruyan yapraklar altın gibi sararır."
                    }
                ],
                "mission": "Evdeki sarı renkli bir nesneyi bul (limon, oyuncak araba vb.) ve ona dokunarak sıcaklığını hisset!",
                "badge": "☀️ Sarı Güneş Rozeti",
                "emoji": "☀",
                "videoItems": [
                    {
                        "emoji": "☀",
                        "label": "Sarı Güneş ve Parlak Yıldızlar",
                        "color": "var(--color-primary)"
                    }
                ],
                "videoVoice": "Dünyamızı ısıtan sarı güneşi ve geceleri gökyüzünde parıldayan sarı yıldızları öğreniyoruz."
            },
            {
                "title": "Yeşil Yaprakların Sırrı",
                "ageRecommendation": "4-5 Yaş",
                "description": "Doğadaki ağaçları, çimenleri ve ormanları süsleyen yeşil rengini keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Parktaki taze çimenler ve ağaç yaprakları hangi renktir?",
                        "options": [
                            {
                                "emoji": "🔴",
                                "text": "Kırmızı",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟢",
                                "text": "Yeşil",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🔵",
                                "text": "Mavi",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Doğanın en dinlendirici yeşil rengini arıyoruz."
                    },
                    {
                        "question": "Hangisi yeşil renkli, kabuğu sert bir meyvedir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Karpuz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Muz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Çilek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Dışı yeşil çizgili, içi ise kıpkırmızı olan büyük meyve hangisidir?"
                    },
                    {
                        "question": "Gölde zıplayan sevimli kurbağa hangi renktedir?",
                        "options": [
                            {
                                "emoji": "🟠",
                                "text": "Turuncu",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟢",
                                "text": "Yeşil",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Pembe",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kurbağalar yaprakların üstünde saklanırken yeşil renkleri sayesinde görünmez olurlar."
                    }
                ],
                "mission": "Balkondan veya pencereden dışarı bakıp görebildiğin en büyük yeşil yapraklı ağacı anne-babana göster!",
                "badge": "🍃 Yeşil Yaprak Rozeti",
                "emoji": "🍃",
                "videoItems": [
                    {
                        "emoji": "🍃",
                        "label": "Yeşil Yaprakların Sırrı",
                        "color": "var(--color-primary)"
                    }
                ],
                "videoVoice": "Doğadaki ağaçları, çimenleri ve ormanları süsleyen yeşil rengini keşfediyoruz."
            },
            {
                "title": "Renkleri Karıştırıyoruz!",
                "ageRecommendation": "5-6 Yaş",
                "description": "İki farklı rengin birleştiğinde nasıl yepyeni bir renge dönüştüğünü sihirli boya karıştırma oyunuyla öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Sarı ve mavi boyayı karıştırırsak hangi renk oluşur?",
                        "options": [
                            {
                                "emoji": "🟢",
                                "text": "Yeşil",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🟠",
                                "text": "Turuncu",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟣",
                                "text": "Mor",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Mavi deniz ile sarı güneş birleştiğinde çimenlerin rengi ortaya çıkar!"
                    },
                    {
                        "question": "Kırmızı ve sarı boyayı birleştirirsek hangi renk doğar?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Pembe",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🟠",
                                "text": "Turuncu",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Kahverengi",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Havuç veya mandalina rengini elde ediyoruz!"
                    },
                    {
                        "question": "Mavi ve kırmızı boyayı kavanozda sallarsak hangi renk ortaya çıkar?",
                        "options": [
                            {
                                "emoji": "🟣",
                                "text": "Mor",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🟢",
                                "text": "Yeşil",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Siyah",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Patlıcanın veya menekşe çiçeğinin o güzel rengini arıyoruz."
                    }
                ],
                "mission": "Eğer evde sulu boyan varsa sarı ve mavi boyayı parmağınla karıştırıp yeşili kendin yap! (Boyan yoksa iki renkli oyuncağı yan yana koyup izle).",
                "badge": "🎨 Sihirli Simyacı Rozeti",
                "emoji": "🎨",
                "videoItems": [
                    {
                        "emoji": "🎨",
                        "label": "Renkleri Karıştırıyoruz!",
                        "color": "var(--color-primary)"
                    }
                ],
                "videoVoice": "İki farklı rengin birleştiğinde nasıl yepyeni bir renge dönüştüğünü sihirli boya karıştırma oyunuyla öğreniyoruz."
            }
        ]
    },
    "numbers": {
        "id": "numbers",
        "title": "Sayılar",
        "emoji": "🔢",
        "color": "var(--color-secondary)",
        "isFree": false,
        "adventures": [
            {
                "title": "Parmaklarımızla Sayalım: 1, 2, 3",
                "ageRecommendation": "3-4 Yaş",
                "description": "Kendi ellerimizdeki parmakları kullanarak en kolay sayma adımlarını (1, 2, 3) sevimli bir ritimle öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Elimizde sadece başparmağımızı kaldırırsak kaç parmağımız açık olur?",
                        "options": [
                            {
                                "emoji": "1",
                                "text": "Bir (1)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "2",
                                "text": "İki (2)",
                                "isCorrect": false
                            },
                            {
                                "emoji": "3",
                                "text": "Üç (3)",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Tek bir parmak havada duruyor."
                    },
                    {
                        "question": "Bir tavşanın kaç tane uzun kulağı vardır?",
                        "options": [
                            {
                                "emoji": "1",
                                "text": "1",
                                "isCorrect": false
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": true
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Sağda bir kulak, solda bir kulak. Toplam kaç eder?"
                    },
                    {
                        "question": "Resimdeki sevimli kuşların sayısını bulabilir misin? (Ekranda 3 kuş var)",
                        "options": [
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": true
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kuşları tek tek sayalım: Bir, iki ve..."
                    }
                ],
                "mission": "Evdeki 3 adet yumuşak yastığı üst üste koyarak küçük bir kule yap!",
                "badge": "☝️ Parmak Sayıcı Rozeti",
                "emoji": "☝",
                "videoItems": [
                    {
                        "emoji": "☝",
                        "label": "Parmaklarımızla Sayalım: 1, 2, 3",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Kendi ellerimizdeki parmakları kullanarak en kolay sayma adımlarını (1, 2, 3) sevimli bir ritimle öğreniyoruz."
            },
            {
                "title": "Ormanda Kaç Hayvan Var?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Ormandaki sevimli sincapları ve kuşları sayarak nesne miktarı ile sayılar arasındaki bağı güçlendiriyoruz.",
                "quizzes": [
                    {
                        "question": "Ağaç dalında duran sincapları sayalım: 1, 2, 3, 4. Toplam kaç sincap var?",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": true
                            },
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: En son söylediğimiz sayıyı hatırlayalım."
                    },
                    {
                        "question": "Uçan 2 kelebeğe 1 kelebek daha katılırsa kaç kelebek olur?",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": true
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İki parmağımıza bir parmak daha ekleyelim."
                    },
                    {
                        "question": "Resimdeki sevimli tırtılın kaç adet ayağı var? (Görselde 4 ayak gösterilir)",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": true
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Tırtılın minik ayaklarını teker teker sayalım."
                    }
                ],
                "mission": "Mutfaktan 4 adet plastik kaşık al ve masanın üzerine yan yana diz!",
                "badge": "🐿️ Orman Sayıcısı Rozeti",
                "emoji": "🐿",
                "videoItems": [
                    {
                        "emoji": "🐿",
                        "label": "Ormanda Kaç Hayvan Var?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Ormandaki sevimli sincapları ve kuşları sayarak nesne miktarı ile sayılar arasındaki bağı güçlendiriyoruz."
            },
            {
                "title": "5 Sevimli Balon Uçuyor",
                "ageRecommendation": "4-5 Yaş",
                "description": "Gökyüzüne doğru süzülen renkli balonları izliyor ve 5'e kadar saymayı eğlenceli animasyonlarla öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Elimizdeki tüm parmakları açarsak toplam kaç parmağımız açık olur?",
                        "options": [
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            },
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": true
                            },
                            {
                                "emoji": "6",
                                "text": "6",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Bir elimizdeki parmakların tamamını sayalım."
                    },
                    {
                        "question": "3 mavi balon ile 2 sarı balon yan yana gelirse toplam kaç balon eder?",
                        "options": [
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": true
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            },
                            {
                                "emoji": "6",
                                "text": "6",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: 3'ten sonra iki kere ileriye doğru sayalım: 4 ve..."
                    },
                    {
                        "question": "Gökyüzündeki sevimli uçurtmanın kuyruğunda kaç tane kurdele var? (Görselde 5 kurdele vardır)",
                        "options": [
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": true
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kurdeleleri baştan sona doğru yavaşça sayalım."
                    }
                ],
                "mission": "Evde bulduğun 5 adet küçük oyuncağı yan yana dizip üzerlerinden zıplama taklidi yap!",
                "badge": "🎈 Balon Kâşifi Rozeti",
                "emoji": "🎈",
                "videoItems": [
                    {
                        "emoji": "🎈",
                        "label": "5 Sevimli Balon Uçuyor",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Gökyüzüne doğru süzülen renkli balonları izliyor ve 5'e kadar saymayı eğlenceli animasyonlarla öğreniyoruz."
            },
            {
                "title": "Sıfır (0) Sayısının Gücü",
                "ageRecommendation": "5-6 Yaş",
                "description": "Sıfır sayısının \"yokluk\" ve \"boş sepet\" anlamına geldiğini, ancak diğer sayıların yanına geldiğinde onları nasıl büyüttüğünü keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Tamamen boş olan bir kurabiye tabağında kaç tane kurabiye vardır?",
                        "options": [
                            {
                                "emoji": "1",
                                "text": "1",
                                "isCorrect": false
                            },
                            {
                                "emoji": "0",
                                "text": "0 (Sıfır)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Tabak kupkuru ve tamamen boşsa orada kurabiye kalmamış demektir."
                    },
                    {
                        "question": "1 sayısının yanına 0 koyarsak hangi yeni sayıyı elde ederiz?",
                        "options": [
                            {
                                "emoji": "1",
                                "text": "10 (On)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "1",
                                "text": "1",
                                "isCorrect": false
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İki basamaklı, iki elinin parmakları toplamı kadar olan sayı hangisidir?"
                    },
                    {
                        "question": "Sepetteki 3 elmanın 3'ünü de yersek sepette kaç elma kalır?",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "0",
                                "text": "0",
                                "isCorrect": true
                            },
                            {
                                "emoji": "1",
                                "text": "1",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Elmaların hepsini bitirdiğimize göre sepette ne kalmıştır?"
                    }
                ],
                "mission": "Boş bir kase bul. Kaseye \"sıfır\" tane nesne koy (yani tamamen boş bırak) ve anne-babana \"Bak içinde sıfır oyuncak var!\" de.",
                "badge": "🕳️ Boş Sepet Sihirbazı Rozeti",
                "emoji": "🕳",
                "videoItems": [
                    {
                        "emoji": "🕳",
                        "label": "Sıfır (0) Sayısının Gücü",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Sıfır sayısının \"yokluk\" ve \"boş sepet\" anlamına geldiğini, ancak diğer sayıların yanına geldiğinde onları nasıl büyüttüğünü keşfediyoruz."
            },
            {
                "title": "Çiftlikteki Yumurtaları Paylaşalım",
                "ageRecommendation": "5-6 Yaş",
                "description": "Çiftlikten topladığımız 6 adet yumurtayı iki sevimli sepete eşit olarak bölüştürmeyi ve paylaşmayı öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "4 adet elmayı iki arkadaşa eşit paylaştırırsak her birine kaçar elma düşer?",
                        "options": [
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": true
                            },
                            {
                                "emoji": "1",
                                "text": "1",
                                "isCorrect": false
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: İkişer ikişer dağıtırsak adil bir paylaşım olur mu?"
                    },
                    {
                        "question": "6 adet yumurtayı iki sepete eşit koyarsak her sepette kaç yumurta olur?",
                        "options": [
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": true
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Hangi sayıyı kendisiyle toplarsak 6 eder?"
                    },
                    {
                        "question": "Paylaşmak bize hangi duyguyu hissettirir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Üzüntü",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Mutluluk",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Korku",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Arkadaşımızla oyuncağımızı paylaştığımızda kalbimizde ne hissederiz?"
                    }
                ],
                "mission": "Evdeki 6 adet küçük lego veya oyuncağı iki eşit gruba ayırıp (3 ve 3) masaya yerleştir!",
                "badge": "🥚 Adil Paylaşımcı Rozeti",
                "emoji": "🥚",
                "videoItems": [
                    {
                        "emoji": "🥚",
                        "label": "Çiftlikteki Yumurtaları Paylaşalım",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Çiftlikten topladığımız 6 adet yumurtayı iki sevimli sepete eşit olarak bölüştürmeyi ve paylaşmayı öğreniyoruz."
            }
        ]
    },
    "shapes": {
        "id": "shapes",
        "title": "Şekiller",
        "emoji": "🔺",
        "color": "var(--color-accent)",
        "isFree": false,
        "adventures": [
            {
                "title": "Yuvarlak Top Yuvarlanıyor",
                "ageRecommendation": "3-4 Yaş",
                "description": "Köşesi olmayan, tabak gibi yuvarlak olan daire (çember) şeklini ve nesneleri tanıyoruz.",
                "quizzes": [
                    {
                        "question": "Hangisi tamamen yuvarlak bir şekle sahiptir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Kitap",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Top",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Çatı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Yuvarlandığında durmadan giden oyuncak hangisidir?"
                    },
                    {
                        "question": "Gökyüzündeki dolunay hangi geometrik şekle benzer?",
                        "options": [
                            {
                                "emoji": "🔺",
                                "text": "Üçgen",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭕",
                                "text": "Daire (Yuvarlak)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🟥",
                                "text": "Kare",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Gece parlayan dolunay bir tabak gibi yuvarlaktır."
                    },
                    {
                        "question": "Daire şeklinin kaç tane köşesi veya sivri ucu vardır?",
                        "options": [
                            {
                                "emoji": "0",
                                "text": "0 (Köşesi yoktur)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Daireye dokunduğumuzda elimize batan sivri bir yer var mıdır?"
                    }
                ],
                "mission": "Evde yuvarlak olan bir eşya bul (tabak, kapak, tekerlek vb.) ve parmağınla onun etrafında tam bir tur dön!",
                "badge": "🟣 Yuvarlak Daire Rozeti",
                "emoji": "🟣",
                "videoItems": [
                    {
                        "emoji": "🟣",
                        "label": "Yuvarlak Top Yuvarlanıyor",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Köşesi olmayan, tabak gibi yuvarlak olan daire (çember) şeklini ve nesneleri tanıyoruz."
            },
            {
                "title": "Üç Köşeli Üçgen Çatı",
                "ageRecommendation": "3-4 Yaş",
                "description": "Üç tane köşesi ve üç tane kenarı olan sevimli üçgen şeklini, evlerin çatılarından yola çıkarak keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Üçgen şeklinin toplam kaç tane sivri köşesi vardır?",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": true
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            },
                            {
                                "emoji": "2",
                                "text": "2",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Adını söylerken bile ipucu alıyoruz: Üç-gen!"
                    },
                    {
                        "question": "Dilimlenmiş bir pizza veya karpuz dilimi hangi şekle benzer?",
                        "options": [
                            {
                                "emoji": "🟥",
                                "text": "Kare",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🔺",
                                "text": "Üçgen",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭕",
                                "text": "Daire",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Dilimin ucu sivridir ve toplam 3 kenarı vardır."
                    },
                    {
                        "question": "Resimdeki yelkenli teknenin yelkeni hangi şekildedir?",
                        "options": [
                            {
                                "emoji": "🔺",
                                "text": "Üçgen",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭕",
                                "text": "Daire",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgen",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Rüzgarla dolan sivri uçlu yelkeni inceleyelim."
                    }
                ],
                "mission": "İki elinin işaret ve başparmaklarını uç uca birleştirerek kendine küçük bir üçgen yap ve içinden etrafa bak!",
                "badge": "🔺 Üçgen Çatı Rozeti",
                "emoji": "🔺",
                "videoItems": [
                    {
                        "emoji": "🔺",
                        "label": "Üç Köşeli Üçgen Çatı",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Üç tane köşesi ve üç tane kenarı olan sevimli üçgen şeklini, evlerin çatılarından yola çıkarak keşfediyoruz."
            },
            {
                "title": "Kutunun Sırrı: Kare",
                "ageRecommendation": "4-5 Yaş",
                "description": "Dört kenarı da birbirine tamamen eşit olan, hediye kutusu gibi dengeli duran kare şeklini tanıyoruz.",
                "quizzes": [
                    {
                        "question": "Karenin kaç tane kenarı vardır?",
                        "options": [
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": true
                            },
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Masanın veya kutunun kenarlarını teker teker sayalım."
                    },
                    {
                        "question": "Karenin en önemli sırrı nedir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Tüm kenar uzunlukları eşittir.",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Hiç köşesi yoktur.",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Üç köşelidir.",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kareye nereden bakarsak bakalım tüm çizgileri aynı boydadır."
                    },
                    {
                        "question": "Hangisi kare şeklinde bir eşyadır?",
                        "options": [
                            {
                                "emoji": "🟥",
                                "text": "Kare şeklinde bir duvar saati veya çerçeve",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Yuvarlak top",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Sivri uçlu flama",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kenarları birbirine tamamen eşit olan düz köşeli eşyayı arıyoruz."
                    }
                ],
                "mission": "Evdeki kare bir yastığı veya kutuyu bulup üzerine elinle hafifçe vurarak dört kenarını göster!",
                "badge": "🟩 Eşit Kare Rozeti",
                "emoji": "🟩",
                "videoItems": [
                    {
                        "emoji": "🟩",
                        "label": "Kutunun Sırrı: Kare",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Dört kenarı da birbirine tamamen eşit olan, hediye kutusu gibi dengeli duran kare şeklini tanıyoruz."
            },
            {
                "title": "Penceremiz Dikdörtgen",
                "ageRecommendation": "4-5 Yaş",
                "description": "İki uzun ve iki kısa kenarı olan, odamızdaki pencerelere veya kapılara benzeyen dikdörtgen şeklini öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Dikdörtgen ile kare arasındaki en büyük fark nedir?",
                        "options": [
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgenin iki uzun, iki kısa kenarı vardır.",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgenin köşesi yoktur.",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgen üç köşelidir.",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Dikdörtgen sanki kenarlarından çekilip uzatılmış bir kare gibidir."
                    },
                    {
                        "question": "Evimizdeki giriş kapısı hangi şekle benzer?",
                        "options": [
                            {
                                "emoji": "⭕",
                                "text": "Daire",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgen",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🔺",
                                "text": "Üçgen",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kapının boyu eninden daha uzundur."
                    },
                    {
                        "question": "Çizgi filmi izlediğimiz televizyon ekranı genellikle hangi şekildedir?",
                        "options": [
                            {
                                "emoji": "🔺",
                                "text": "Üçgen",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🚪",
                                "text": "Dikdörtgen",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Çember",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Ekranın sağa ve sola doğru uzayan çizgilerini görebiliyor musun?"
                    }
                ],
                "mission": "Evde dikdörtgen bir kitap veya kutu bulup kısa kenarı ile uzun kenarını parmağınla ölç!",
                "badge": "🚪 Dikdörtgen Pencere Rozeti",
                "emoji": "🚪",
                "videoItems": [
                    {
                        "emoji": "🚪",
                        "label": "Penceremiz Dikdörtgen",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "İki uzun ve iki kısa kenarı olan, odamızdaki pencerelere veya kapılara benzeyen dikdörtgen şeklini öğreniyoruz."
            },
            {
                "title": "Gökyüzündeki Yıldız Şekli",
                "ageRecommendation": "5-6 Yaş",
                "description": "Birçok sivri ucu bulunan ve gökyüzünü süsleyen parlak yıldız şeklini çizerek ve eşleştirerek öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Klasik bir yıldız şeklinin kaç tane sivri ucu/köşesi vardır?",
                        "options": [
                            {
                                "emoji": "5",
                                "text": "5",
                                "isCorrect": true
                            },
                            {
                                "emoji": "3",
                                "text": "3",
                                "isCorrect": false
                            },
                            {
                                "emoji": "4",
                                "text": "4",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Gökyüzündeki parlayan yıldızın kollarını sayalım."
                    },
                    {
                        "question": "Denizlerde yaşayan ve yıldıza benzeyen canlı hangisidir?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Denizyıldızı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Yunus",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Balina",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İsmi de gökyüzündeki parlak yıldız dostumuzla aynı!"
                    },
                    {
                        "question": "Yıldız şekli bize neyi hatırlatır?",
                        "options": [
                            {
                                "emoji": "⭐️",
                                "text": "Geceyi ve gökyüzünü",
                                "isCorrect": true
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Çamurlu yolları",
                                "isCorrect": false
                            },
                            {
                                "emoji": "⭐️",
                                "text": "Yağmurlu günleri",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Yıldızlar güneş battıktan sonra gökyüzünde ne zaman ortaya çıkarlar?"
                    }
                ],
                "mission": "Boş bir kağıda kurşun kalemle veya parmağınla havada bir yıldız şekli çizmeye çalış!",
                "badge": "⭐ Parlak Yıldız Rozeti",
                "emoji": "⭐",
                "videoItems": [
                    {
                        "emoji": "⭐",
                        "label": "Gökyüzündeki Yıldız Şekli",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Birçok sivri ucu bulunan ve gökyüzünü süsleyen parlak yıldız şeklini çizerek ve eşleştirerek öğreniyoruz."
            }
        ]
    },
    "animals": {
        "id": "animals",
        "title": "Hayvanlar",
        "emoji": "🦁",
        "color": "var(--color-success)",
        "isFree": false,
        "adventures": [
            {
                "title": "Çiftlikteki Dostlarımız",
                "ageRecommendation": "3-4 Yaş",
                "description": "İnekler, koyunlar ve horozların tatlı seslerini dinleyerek çiftlik yaşamını ve oradaki sevimli dostlarımızı keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Hangi çiftlik dostumuz \"Mööö\" diye seslenir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Tavuk",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "İnek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "At",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Sütünü afiyetle içtiğimiz büyük dostumuz hangisidir?"
                    },
                    {
                        "question": "Sabahları \"Ürüürüüü\" diye ötüp bizi uyandıran kimdir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Ördek",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Horoz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Köpek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kafasında kırmızı ibiği olan süslü kuş hangisidir?"
                    },
                    {
                        "question": "Bize yumuşacık yünler veren sevimli çiftlik hayvanı hangisidir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Kedi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Koyun",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Eşek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: 'Me-ee' diye seslenen beyaz kıvırcık tüylü dostumuzu hatırla."
                    }
                ],
                "mission": "Bir kedi gibi \"Miyav\" diyerek veya köpek gibi \"Hav\" diyerek taklit yap ve evdekileri güldür!",
                "badge": "🚜 Çiftlik Dostu Rozeti",
                "emoji": "🚜",
                "videoItems": [
                    {
                        "emoji": "🚜",
                        "label": "Çiftlikteki Dostlarımız",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "İnekler, koyunlar ve horozların tatlı seslerini dinleyerek çiftlik yaşamını ve oradaki sevimli dostlarımızı keşfediyoruz."
            },
            {
                "title": "Ormanın Kralı ve Yavruları",
                "ageRecommendation": "3-4 Yaş",
                "description": "Yelesiyle ünlü sevimli aslanları ve onların minik yavrularını ormandaki tatlı yaşam alanlarında gözlemliyoruz.",
                "quizzes": [
                    {
                        "question": "Ormanın kralı olarak bilinen, gür yeleli sevimli hayvan hangisidir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Ayı",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Aslan",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Zürafa",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Kocaman kükreyen sarı tüylü kedigili arıyoruz."
                    },
                    {
                        "question": "Aslan yavrularına ne ad verilir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Enik",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Malik / Yavru aslan",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Civciv",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Aslanın minik bir kopyası olan sevimli bebeğe ne deriz?"
                    },
                    {
                        "question": "Aslanlar nerede yaşar?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Deniz altında",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Doğada / Savanlarda ve Ormanlarda",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Kutuplardaki buzullarda",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Ağaçların ve yeşilliklerin bol olduğu sıcak alanları düşünelim."
                    }
                ],
                "mission": "Ellerini aslan pençesi gibi yapıp tatlıca \"Kükre\" ve yavaş adımlarla odada yürü!",
                "badge": "🦁 Cesur Aslan Rozeti",
                "emoji": "🦁",
                "videoItems": [
                    {
                        "emoji": "🦁",
                        "label": "Ormanın Kralı ve Yavruları",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Yelesiyle ünlü sevimli aslanları ve onların minik yavrularını ormandaki tatlı yaşam alanlarında gözlemliyoruz."
            },
            {
                "title": "Sevimli Kuşlar Nasıl Uçar?",
                "ageRecommendation": "4-5 Yaş",
                "description": "Gökyüzünde süzülen renkli kuşların kanat çırpışlarını izliyor, uçmanın ve hafifliğin heyecanını paylaşıyoruz.",
                "quizzes": [
                    {
                        "question": "Kuşların gökyüzünde uçmasını sağlayan organları hangisidir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Kanatları",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Gagaları",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Kuyrukları",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Kuşlar sağa ve sola açıp çırptıkları ne sayesinde havada dururlar?"
                    },
                    {
                        "question": "Hangisi uçabilen sevimli bir kuş türüdür?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Balık",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Güvercin",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Tavşan",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Parklarda buğday yerken gördüğümüz kanatlı dostumuz hangisidir?"
                    },
                    {
                        "question": "Kuşlar yuvalarını genellikle nereye kurarlar?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Ağaç dallarına",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Suyun en dibine",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Toprağın altına",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kuşlar kedilerden korunmak için yükseklerdeki dalları tercih ederler."
                    }
                ],
                "mission": "Kollarını iki yana açıp tıpkı bir kuş gibi yavaşça çırparak odanın içinde daireler çizerek uç!",
                "badge": "🐦 Özgür Kanat Rozeti",
                "emoji": "🐦",
                "videoItems": [
                    {
                        "emoji": "🐦",
                        "label": "Sevimli Kuşlar Nasıl Uçar?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Gökyüzünde süzülen renkli kuşların kanat çırpışlarını izliyor, uçmanın ve hafifliğin heyecanını paylaşıyoruz."
            },
            {
                "title": "Denizin Altındaki Renkli Balıklar",
                "ageRecommendation": "4-5 Yaş",
                "description": "Okyanusların akvaryum gibi parıldayan derinliklerindeki rengarenk balıkların dünyasını ve nasıl nefes aldıklarını öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Balıklar karada mı yoksa suyun altında mı yaşarlar?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Karada, ağaçlarda",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Suyun altında",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Kumsalda kumların içinde",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Balıklar yüzgeçlerini sallayarak nerede yüzerler?"
                    },
                    {
                        "question": "Balıkların suda yönlerini bulmalarını ve yüzmelerini sağlayan nedir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Yüzgeçleri ve kuyrukları",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Kanatları",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Ayakları",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Balıkların sağa sola kıvrılmasını sağlayan ince yapılar hangileridir?"
                    },
                    {
                        "question": "Sevimli turuncu renkli \"Palyaço Balığı\" nerede saklanarak yaşar?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Deniz şakayığı (anemon) veya mercanların arasında",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Karadaki yuvalarda",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Bulutların üstünde",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kayaların altındaki yumuşak deniz bitkilerini düşünelim."
                    }
                ],
                "mission": "Ağzını tıpkı bir balık gibi açıp kapatarak (o sesini yapar gibi yanaklarını içeri çekip) balık taklidi yap!",
                "badge": "🐠 Renkli Balık Rüyası Rozeti",
                "emoji": "🐠",
                "videoItems": [
                    {
                        "emoji": "🐠",
                        "label": "Denizin Altındaki Renkli Balıklar",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Okyanusların akvaryum gibi parıldayan derinliklerindeki rengarenk balıkların dünyasını ve nasıl nefes aldıklarını öğreniyoruz."
            },
            {
                "title": "Küçük Karıncanın Büyük Evi",
                "ageRecommendation": "5-6 Yaş",
                "description": "Toprağın altında devasa tüneller açarak yardımlaşma içinde yaşayan çalışkan karıncaların yuva hayatını keşfediyoruz.",
                "quizzes": [
                    {
                        "question": "Karıncalar yiyecek taşırken nasıl davranırlar?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Tek başlarına kavga ederler",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Arkadaşlarıyla yardımlaşarak taşırlar",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Hiç çalışmazlar",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Karıncalar çok sosyaldir ve yükleri birlikte sırtlanırlar."
                    },
                    {
                        "question": "Karıncaların yuvası genellikle nerededir?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Toprağın altında (tünellerde)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Gökyüzündeki yuvalarda",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Denizlerin ortasında",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Yürürken bastığımız toprağın altındaki küçük delikleri hatırla."
                    },
                    {
                        "question": "Karıncalar kendi ağırlıklarından çok daha ağır yaprakları nasıl kaldırabilirler?",
                        "options": [
                            {
                                "emoji": "🦁",
                                "text": "Çok güçlü ve çalışkan oldukları için",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🦁",
                                "text": "Sihir yaptıkları için",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🦁",
                                "text": "Kanatları olduğu için",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Karıncaların o minik gövdelerinde kocaman bir kas gücü ve kararlılık gizlidir!"
                    }
                ],
                "mission": "Evdeki ufak bir oyuncağını iki elinle sıkıca tutup sanki ağır bir yük taşıyan çalışkan bir karıncaymış gibi sırtında taşı!",
                "badge": "🐜 Çalışkan Karınca Rozeti",
                "emoji": "🐜",
                "videoItems": [
                    {
                        "emoji": "🐜",
                        "label": "Küçük Karıncanın Büyük Evi",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Toprağın altında devasa tüneller açarak yardımlaşma içinde yaşayan çalışkan karıncaların yuva hayatını keşfediyoruz."
            }
        ]
    },
    "emotions": {
        "id": "emotions",
        "title": "Duygular",
        "emoji": "😊",
        "color": "var(--color-kids-pink)",
        "isFree": false,
        "adventures": [
            {
                "title": "Gülen Yüzler: Mutluluk Nedir?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Bizi mutlu eden şeyleri, gülümsemenin yüzümüze getirdiği güzelliği ve içimizi ısıtan mutluluk hissini öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Çok mutlu olduğumuzda yüzümüzde nasıl bir değişiklik olur?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Ağlarız",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Kocaman gülümseriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Kaşlarımızı çatarız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: İçimiz neşeyle dolduğunda dişlerimizi göstererek ne yaparız?"
                    },
                    {
                        "question": "Hangisi bizi genellikle mutlu eden sevimli bir olaydır?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "En sevdiğimiz oyunu oynamak",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Oyuncağımızın kaybolması",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Yere düşmek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kalbimizi heyecanla dolduran güzel etkinliği arıyoruz."
                    },
                    {
                        "question": "Mutlu bir yüz ifadesini kiminle paylaşmak onu da mutlu eder?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Hiç kimseyle",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Annemiz, babamız veya arkadaşlarımızla",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Cansız duvarlarla",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Gülümseme bulaşıcıdır, en sevdiklerimize gülümsediğimizde onlar ne hisseder?"
                    }
                ],
                "mission": "Hemen şimdi yanındaki anne veya babana en tatlı gülümsemeni göster ve onlara sarıl!",
                "badge": "😊 Mutluluk Güneşi Rozeti",
                "emoji": "😊",
                "videoItems": [
                    {
                        "emoji": "😊",
                        "label": "Gülen Yüzler: Mutluluk Nedir?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Bizi mutlu eden şeyleri, gülümsemenin yüzümüze getirdiği güzelliği ve içimizi ısıtan mutluluk hissini öğreniyoruz."
            },
            {
                "title": "Ağlayan Bulut: Üzüntü Nedir?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Bazen üzülmenin çok doğal bir duygu olduğunu, ağlayarak veya anlatarak bu üzüntüyü nasıl hafifletebileceğimizi öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Üzgün olduğumuzda kalbimizdeki yükü hafifletmek için ne yapabiliriz?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Duygularımızı anne-babamıza anlatabiliriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Odamıza kaçıp kapıyı kilitleyebiliriz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Herkese bağırabiliriz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Konuşmak ve sarılmak üzüntümüzü bir bulut gibi dağıtır."
                    },
                    {
                        "question": "Üzgün hisseden bir arkadaşımızı gördüğümüzde ona nasıl yardımcı olabiliriz?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Onunla dalga geçebiliriz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Yanına gidip \"Neden üzgünsün, sana sarılabilir miyim?\" diye sorabiliriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Arkamızı dönüp gidebiliriz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Arkadaşımızın kendini yalnız hissetmemesi için yapabileceğimiz en tatlı hareketi arıyoruz."
                    },
                    {
                        "question": "Üzüntü geçici bir duygu mudur?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Evet, tıpki yağmur yağdıktan sonra güneşin açması gibi geçicidir",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Hayır, sonsuza kadar sürer",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Sadece geceleri sürer",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Gökyüzündeki kara bulutlar hep kalır mı yoksa dağılıp giderler mi?"
                    }
                ],
                "mission": "Evdeki birine üzgün olduğunda ona iyi gelecek sevimli bir resim çizip hediye et!",
                "badge": "☁️ Şefkatli Bulut Rozeti",
                "emoji": "☁",
                "videoItems": [
                    {
                        "emoji": "☁",
                        "label": "Ağlayan Bulut: Üzüntü Nedir?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Bazen üzülmenin çok doğal bir duygu olduğunu, ağlayarak veya anlatarak bu üzüntüyü nasıl hafifletebileceğimizi öğreniyoruz."
            },
            {
                "title": "Fırtınalı Gün: Öfkeyi Sakinleştirelim",
                "ageRecommendation": "4-5 Yaş",
                "description": "Öfkelendiğimiz anlarda içimizdeki o sıcak \"fırtınayı\" derin nefes egzersizleri ve sevimli sakinleşme yöntemleriyle yatıştırmayı öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "İçimizde öfke hissettiğimizde kendimizi sakinleştirmek için ne yapabiliriz?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Burnumuzdan derin nefes alıp ağzımızdan yavaşça üfleyebiliriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Eşyaları fırlatabiliriz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Çığlık atabiliriz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Tıpkı bir çiçeği koklayıp, doğum günü mumunu üfler gibi sakin nefes almayı dene."
                    },
                    {
                        "question": "Öfke fırtınasını dindirmek için uyguladığımız balon nefesi nasıldır?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Karnımızı şişirip havayı yavaşça bırakmak",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Hızlı hızlı nefes alıp vermek",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Nefesimizi uzun süre tutmak",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Karnımızda renkli bir balon olduğunu hayal edip onu yavaşça şişirip söndürüyoruz."
                    },
                    {
                        "question": "Öfkeliyken konuşmak yerine ne zaman konuşmalıyız?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Sakinleştikten sonra",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "En sinirli anımızda bağırarak",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Hiçbir zaman konuşmamalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Dalgalı deniz dindikten sonra gemiler daha rahat yol alır, değil mi?"
                    }
                ],
                "mission": "Burnundan derin bir nefes alarak kokulu bir gülü kokluyormuş gibi yap, ardından ağzından üfleyerek hayali bir mumu söndür! Bunu 3 kez tekrarla.",
                "badge": "🌬️ Sakin Rüzgar Rozeti",
                "emoji": "🌬",
                "videoItems": [
                    {
                        "emoji": "🌬",
                        "label": "Fırtınalı Gün: Öfkeyi Sakinleştirelim",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Öfkelendiğimiz anlarda içimizdeki o sıcak \"fırtınayı\" derin nefes egzersizleri ve sevimli sakinleşme yöntemleriyle yatıştırmayı öğreniyoruz."
            },
            {
                "title": "Karanlıktan Korkan Minik Ayı",
                "ageRecommendation": "4-5 Yaş",
                "description": "Karanlıktan veya bilmediği seslerden korkan minik ayıya yardım ederek korkunun normal olduğunu ve güvende olduğumuzu anlıyoruz.",
                "quizzes": [
                    {
                        "question": "Gece odamız karardığında aslında eşyalarımıza ne olur?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Canavara dönüşürler",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Aynı yerlerinde dururlar, sadece ışık olmadığı için görünmezler",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Uçup giderler",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Lambayı açtığımızda yatağımız ve oyuncaklarımız tam bıraktığımız yerde değil midir?"
                    },
                    {
                        "question": "Korktuğumuzda kendimizi güvende hissetmek için kimden yardım isteyebiliriz?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Oyuncak ayımızdan",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Anne, baba veya yanımızdaki yetişkinlerden",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Hiç kimseden",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Bize sarıldığında tüm korkularımızı eriten sevdiklerimizi hatırla."
                    },
                    {
                        "question": "Minik Ayı karanlıkta rahat uyumak için ne kullanabilir?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Küçük sevimli bir gece lambası",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Güneş gözlüğü",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Kulaklık",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Odayı tatlı ve loş bir ışıkla aydınlatacak şirin lambayı düşün."
                    }
                ],
                "mission": "Evdeki koridorda veya odanda ışığı kapatıp ebeveyninin elini tutarak karanlıkta 5 saniye boyunca gözlerini kapatıp bekle ve güvende olduğunu hisset!",
                "badge": "🐻 Cesur Ayıcık Rozeti",
                "emoji": "🐻",
                "videoItems": [
                    {
                        "emoji": "🐻",
                        "label": "Karanlıktan Korkan Minik Ayı",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Karanlıktan veya bilmediği seslerden korkan minik ayıya yardım ederek korkunun normal olduğunu ve güvende olduğumuzu anlıyoruz."
            },
            {
                "title": "Paylaşınca Gelen Şaşkınlık",
                "ageRecommendation": "5-6 Yaş",
                "description": "Arkadaşımıza hiç beklemediği bir anda oyuncağımızı veya yiyeceğimizi uzattığımızda onun yüzünde oluşan tatlı şaşkınlığı ve mutluluğu inceliyoruz.",
                "quizzes": [
                    {
                        "question": "Birine sürpriz bir hediye verdiğimizde yüzündeki şaşkınlık ifadesi nasıldır?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Gözleri ve ağzı şirin bir şekilde kocaman açılır",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Kaşlarını çatar ve sinirlenir",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Uykuya dalar",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Beklemediğimiz güzel bir şey olduğunda yüzümüz nasıl bir hal alır?"
                    },
                    {
                        "question": "Arkadaşımız bizimle elmasını paylaştığında ne hissederiz?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Şaşkınlık ve minnettarlık (mutluluk)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Öfke",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Kıskançlık",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Birinin bize kibar davranması içimizi ısıtır."
                    },
                    {
                        "question": "Paylaşmak neden arkadaşlığımızı güçlendirir?",
                        "options": [
                            {
                                "emoji": "😊",
                                "text": "Birbirimize değer verdiğimizi gösterdiği için",
                                "isCorrect": true
                            },
                            {
                                "emoji": "😊",
                                "text": "Oyuncaklarımızı eskittiği için",
                                "isCorrect": false
                            },
                            {
                                "emoji": "😊",
                                "text": "Bizi yorduğu için",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Arkadaşlarımızla paylaştığımızda bağlarımız daha da güzelleşir."
                    }
                ],
                "mission": "Evde en sevdiğin boya kalemlerinden birini seç ve bugün onu resim yaparken anne-babanla veya kardeşinle paylaş!",
                "badge": "🎁 Sürpriz Kalpler Rozeti",
                "emoji": "🎁",
                "videoItems": [
                    {
                        "emoji": "🎁",
                        "label": "Paylaşınca Gelen Şaşkınlık",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Arkadaşımıza hiç beklemediği bir anda oyuncağımızı veya yiyeceğimizi uzattığımızda onun yüzünde oluşan tatlı şaşkınlığı ve mutluluğu inceliyoruz."
            }
        ]
    },
    "manners": {
        "id": "manners",
        "title": "Görgü Kuralları",
        "emoji": "🤝",
        "color": "var(--color-kids-purple)",
        "isFree": false,
        "adventures": [
            {
                "title": "Sihirli Kelimeler: Lütfen & Teşekkür Ederim",
                "ageRecommendation": "3-4 Yaş",
                "description": "Bir şey isterken \"Lütfen\", aldığımızda ise \"Teşekkür ederim\" demenin insanları nasıl mutlu ettiğini sihirli bir ormanda öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Arkadaşımızdan oyuncağını ödünç isterken hangi sihirli kelimeyi kullanmalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "\"Ver bana!\"",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "\"Lütfen verebilir misin?\"",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "\"Hemen alıyorum.\"",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Karşımızdakini kırmayacak en kibar kelimeyi seçelim."
                    },
                    {
                        "question": "Annemiz bize lezzetli bir çorba getirdiğinde ne demeliyiz?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "\"Teşekkür ederim, ellerine sağlık\"",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "\"Masaya koy\"",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "\"Dökmeden getirseydin\"",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Bize emek veren kişiye sevgimizi gösteren kelimeyi arıyoruz."
                    },
                    {
                        "question": "Sihirli kibar kelimeleri kullandığımızda çevremizdeki insanlar bize nasıl bakar?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Sevgiyle ve gülümseyerek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Kızgınlıkla",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Korkarak",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kibar çocuklar çevrelerine hep neşe ve tatlılık saçarlar."
                    }
                ],
                "mission": "Bugün evde bir şey isterken mutlaka \"Lütfen\" de ve aldığında kocaman bir \"Teşekkür ederim\" kelimesini fısılda!",
                "badge": "🪄 Sihirli Kelime Ustası Rozeti",
                "emoji": "🪄",
                "videoItems": [
                    {
                        "emoji": "🪄",
                        "label": "Sihirli Kelimeler: Lütfen & Teşekkür Ederim",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Bir şey isterken \"Lütfen\", aldığımızda ise \"Teşekkür ederim\" demenin insanları nasıl mutlu ettiğini sihirli bir ormanda öğreniyoruz."
            },
            {
                "title": "Oyuncaklarımızı Paylaşalım",
                "ageRecommendation": "3-4 Yaş",
                "description": "Parkta veya evde oyun oynarken arkadaşlarımızla oyuncaklarımızı sırayla paylaşarak oynamanın oyunu daha eğlenceli kıldığını öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Arkadaşımızla aynı oyuncakla oynamak istiyorsak ne yapabiliriz?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Oyuncağı elinden zorla çekebiliriz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "\"Bunu sırayla oynamaya ne dersin?\" diyebiliriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Ağlayarak şikayet edebiliriz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: İkimizin de eğlenmesi için en adil ve tatlı çözüm hangisidir?"
                    },
                    {
                        "question": "Paylaşarak oynadığımızda ne kazanırız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Daha çok arkadaş ve daha neşeli anılar",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Daha çok yorulma",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Oyuncak kaybı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Yalnız oynamak mı daha eğlencelidir yoksa gülüşerek beraber oynamak mı?"
                    },
                    {
                        "question": "Oyuncak sıramızı beklerken ne yapmalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Sabırla beklemeli veya başka bir oyuncakla ilgilenmeliyiz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Sürekli arkadaşımızı dürtmeliyiz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Oyunu tamamen bozmalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Sıra beklemek sabırlı kâşiflerin en önemli özelliğidir."
                    }
                ],
                "mission": "En sevdiğin iki oyuncağı yan yana koy ve hayali bir arkadaşına birini ödünç veriyormuş gibi yaparak \"Al bu senin için\" de!",
                "badge": "🤝 Paylaşımcı Dost Rozeti",
                "emoji": "🤝",
                "videoItems": [
                    {
                        "emoji": "🤝",
                        "label": "Oyuncaklarımızı Paylaşalım",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Parkta veya evde oyun oynarken arkadaşlarımızla oyuncaklarımızı sırayla paylaşarak oynamanın oyunu daha eğlenceli kıldığını öğreniyoruz."
            },
            {
                "title": "Sofra Kuralları: Hep Birlikte Masaya!",
                "ageRecommendation": "4-5 Yaş",
                "description": "Yemek saatinde masaya otururken nelere dikkat etmemiz gerektiğini, çatal-kaşık kullanımını ve ailece yemek yemenin güzelliğini öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Yemeğe oturmadan önce ellerimizi ne ile yıkamalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Sadece suyla",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Bol sabun ve suyla",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Havluyla silmek yeterlidir",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Mikropları tamamen kovmak için köpüklü sabunları kullanmalıyız."
                    },
                    {
                        "question": "Yemek yerken ağzımızda lokma varken ne yapmamalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Konuşmamalıyız",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Çiğnememeliyiz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Yutmamalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Lokma varken konuşursak ağzımızdaki yiyecekler dışarı kaçabilir, değil mi?"
                    },
                    {
                        "question": "Sofra kurulurken ailemize nasıl yardım edebiliriz?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Kendi plastik bardağımızı veya peçeteleri masaya taşıyarak",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Ağır tabakları koşarak taşıyarak",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Televizyon izleyerek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Taşıyabileceğimiz hafif ve güvenli şeyleri düşünelim."
                    }
                ],
                "mission": "Bir sonraki yemek saatinde kendi peçeteni katlayıp tabağının yanına güzelce yerleştir!",
                "badge": "🍽️ Sofra Centilmeni Rozeti",
                "emoji": "🍽",
                "videoItems": [
                    {
                        "emoji": "🍽",
                        "label": "Sofra Kuralları: Hep Birlikte Masaya!",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Yemek saatinde masaya otururken nelere dikkat etmemiz gerektiğini, çatal-kaşık kullanımını ve ailece yemek yemenin güzelliğini öğreniyoruz."
            },
            {
                "title": "Çevremizi Temiz Tutalım",
                "ageRecommendation": "4-5 Yaş",
                "description": "Parklarda, evde veya okulda çöplerimizi yerlere değil çöp kutusuna atarak dünyamızı nasıl koruyacağımızı öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Yediğimiz muzun kabuğunu nereye atmalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Parktaki çimenlerin üstüne",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Çöp kutusuna",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Koltuğun arkasına",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Çöplerin evi neresidir?"
                    },
                    {
                        "question": "Yerlere çöp atıldığında doğadaki hayvan dostlarımız ne hisseder?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Çok üzülürler ve evleri kirlenir",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Çok mutlu olurlar",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Hiç fark etmezler",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kendi odamızın çöplerle dolduğunu hayal edelim, hoşumuza gider miydi?"
                    },
                    {
                        "question": "Yerde duran plastik bir şişeyi geri dönüşüm kutusuna atarsak ne olur?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Şişe sihirli bir şekilde yeni bir oyuncağa dönüşebilir (geri dönüştürülür)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Kutunun içi kirlenir",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Şişe kaybolur",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Plastikler fabrikalarda temizlenip yeniden kullanılabilir hale gelirler."
                    }
                ],
                "mission": "Odandaki veya salondaki yere düşmüş küçük kağıt parçalarını veya ipleri toplayıp çöp kutusuna at!",
                "badge": "♻️ Doğa Koruyucusu Rozeti",
                "emoji": "♻",
                "videoItems": [
                    {
                        "emoji": "♻",
                        "label": "Çevremizi Temiz Tutalım",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Parklarda, evde veya okulda çöplerimizi yerlere değil çöp kutusuna atarak dünyamızı nasıl koruyacağımızı öğreniyoruz."
            },
            {
                "title": "Dinlemeyi Öğreniyoruz: Sıra Bende!",
                "ageRecommendation": "5-6 Yaş",
                "description": "Biri konuşurken onu gözlerimizle takip etmeyi, sözünü kesmeden sabırla dinlemeyi ve konuşma sıramızı beklemeyi öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Öğretmenimiz veya annemiz bize bir şey anlatırken ne yapmalıyız?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Sözünü kesip şarkı söylemeliyiz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Sessizce durup gözlerimizle onu dinlemeliyiz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Arkamızı dönüp oynamalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Karşımızdaki konuşurken kulaklarımızı ve dikkatimizi ona vermeliyiz."
                    },
                    {
                        "question": "Konuşmak için sıramızı beklerken ne yapabiliriz?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Parmak kaldırıp veya tatlıca \"Söz alabilir miyim?\" diyebiliriz",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Bağırarak araya girmeliyiz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Küsüp ağlamalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Sınıfta veya evde saygılı bir şekilde söz istemenin şık yolunu arıyoruz."
                    },
                    {
                        "question": "İyi bir dinleyici olmak arkadaşlarımızın bize karşı ne hissetmesini sağlar?",
                        "options": [
                            {
                                "emoji": "🤝",
                                "text": "Bizi çok sevmelerini ve saygı duymalarını",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🤝",
                                "text": "Bizden sıkılmalarını",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🤝",
                                "text": "Bizi unutmalarını",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kendinizi anlatırken arkadaşınızın sizi dikkatle dinlemesi hoşunuza gider mi?"
                    }
                ],
                "mission": "Bugün anne veya babana \"Bana çocukluğundan bir anı anlatır mısın?\" de ve o anlatırken sözünü hiç kesmeden sonuna kadar dinle!",
                "badge": "👂 Altın Kulak Rozeti",
                "emoji": "👂",
                "videoItems": [
                    {
                        "emoji": "👂",
                        "label": "Dinlemeyi Öğreniyoruz: Sıra Bende!",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Biri konuşurken onu gözlerimizle takip etmeyi, sözünü kesmeden sabırla dinlemeyi ve konuşma sıramızı beklemeyi öğreniyoruz."
            }
        ]
    },
    "english": {
        "id": "english",
        "title": "Temel İngilizce",
        "emoji": "🇬🇧",
        "color": "var(--color-kids-orange)",
        "isFree": false,
        "adventures": [
            {
                "title": "İngilizce Selamlaşalım (Hello - Goodbye)",
                "ageRecommendation": "3-4 Yaş",
                "description": "İngilizce konuşan sevimli maskotumuzla tanışıyor, \"Hello\" diyerek el sallamayı ve ayrılırken \"Goodbye\" demeyi öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "İngilizce'de birine merhaba demek için hangi kelimeyi kullanırız?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Goodbye",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Hello",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Thank you",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Maskotumuz el sallarken sevimli bir sesle 'He-llo!' diyordu."
                    },
                    {
                        "question": "Arkadaşımızın yanından ayrılırken ona İngilizce nasıl veda ederiz?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Hello",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Goodbye",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Please",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Kapıdan çıkarken el sallayıp 'Gud-bay' diye sesleniriz."
                    },
                    {
                        "question": "\"Hello\" derken ellerimizle hangi hareketi yaparız?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "El sallarız",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Gözlerimizi kapatırız",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Alkışlarız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Selam verirken karşımızdakine dostça ne yaparız?"
                    }
                ],
                "mission": "Aynanın karşısına geç, kendine el salla ve yüksek sesle \"Hello!\" de, ardından arkana dönüp \"Goodbye!\" diye fısılda.",
                "badge": "👋 İngilizce İlk Adım Rozeti",
                "emoji": "👋",
                "videoItems": [
                    {
                        "emoji": "👋",
                        "label": "İngilizce Selamlaşalım (Hello - Goodbye)",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "İngilizce konuşan sevimli maskotumuzla tanışıyor, \"Hello\" diyerek el sallamayı ve ayrılırken \"Goodbye\" demeyi öğreniyoruz."
            },
            {
                "title": "Vücudumuzun İngilizce İsimleri",
                "ageRecommendation": "3-4 Yaş",
                "description": "Baş (Head), Omuz (Shoulders), Diz (Knees) ve Ayak parmaklarımızı (Toes) sevimli bir İngilizce şarkı eşliğinde dans ederek öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "İngilizce'de başımıza / kafamıza ne ad verilir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Head",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Hand",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Foot",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Şarkının ilk kelimesini hatırla: 'Hed, şoldırs, niz end toz...'"
                    },
                    {
                        "question": "\"Shoulders\" dediğimizde vücudumuzun neresine dokunuruz?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Gözlerimize",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Omuzlarımıza",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Ayaklarımıza",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Başımızın hemen altındaki sağ ve sol çıkıntılı bölgeler."
                    },
                    {
                        "question": "İngilizce'de gözlerimize ne ad verilir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Eyes",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Ears",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Nose",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Etrafı görmemizi sağlayan 'Ays' kelimesini arıyoruz."
                    }
                ],
                "mission": "Ebeveynin \"Head!\" dediğinde kafana, \"Shoulders!\" dediğinde omuzlarına dokunarak şirin bir hız yarışması yap!",
                "badge": "🕺 İngilizce Dansçı Rozeti",
                "emoji": "🕺",
                "videoItems": [
                    {
                        "emoji": "🕺",
                        "label": "Vücudumuzun İngilizce İsimleri",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Baş (Head), Omuz (Shoulders), Diz (Knees) ve Ayak parmaklarımızı (Toes) sevimli bir İngilizce şarkı eşliğinde dans ederek öğreniyoruz."
            },
            {
                "title": "İngilizce Renkli Boyalar (Red, Blue, Yellow)",
                "ageRecommendation": "4-5 Yaş",
                "description": "En sevdiğimiz üç temel rengin İngilizce isimlerini (Red: Kırmızı, Blue: Mavi, Yellow: Sarı) renk tüpleriyle oynayarak hafızamıza yazıyoruz.",
                "quizzes": [
                    {
                        "question": "İngilizce'de \"Red\" hangi renktir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Mavi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Kırmızı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Sarı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Tatlı bir elmanın veya çileğin rengi olan 'Red' hangisidir?"
                    },
                    {
                        "question": "Gökyüzünün o güzel mavi rengine İngilizce ne ad verilir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Yellow",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Blue",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Red",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İngilizce 'Blu' şeklinde okunan renk hangisidir?"
                    },
                    {
                        "question": "Parlayan sevimli sarı güneşin rengi İngilizce'de hangisidir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Yellow",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Green",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Pink",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Limonun o tatlı sarısına 'Yel-lov' deriz."
                    }
                ],
                "mission": "Evdeki mavi bir oyuncağı bulup havaya kaldır ve yüksek sesle \"Blue!\" diye bağır!",
                "badge": "🎨 İngilizce Renk Ustası Rozeti",
                "emoji": "🎨",
                "videoItems": [
                    {
                        "emoji": "🎨",
                        "label": "İngilizce Renkli Boyalar (Red, Blue, Yellow)",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "En sevdiğimiz üç temel rengin İngilizce isimlerini (Red: Kırmızı, Blue: Mavi, Yellow: Sarı) renk tüpleriyle oynayarak hafızamıza yazıyoruz."
            },
            {
                "title": "Benim Sevimli Ailem (Family Members)",
                "ageRecommendation": "4-5 Yaş",
                "description": "Bizi çok seven ailemizi tanıtıyoruz. İngilizce Anne (Mother) ve Baba (Father) kelimelerini aile albümümüzü inceleyerek öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "Bizi kucağına alıp seven annemize İngilizce ne deriz?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Father",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Mother",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Brother",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: İngilizce 'Madır' veya kısaca 'Mom' dediğimiz değerli kişiyi düşün."
                    },
                    {
                        "question": "Babamıza İngilizce nasıl sesleniriz?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Father",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Sister",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Mother",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İngilizce 'Fadır' veya kısaca 'Dad' kelimesini arıyoruz."
                    },
                    {
                        "question": "\"Baby\" kelimesi ailemizin hangi üyesini temsil eder?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Dedemizi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Evin en küçük bebek üyesini",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Babamızı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Beşikte uyuyan minik ve sevimli aile üyesini düşün."
                    }
                ],
                "mission": "Annene gidip \"You are my mother (Sen benim annemsin)\" de veya babana sarılıp \"Father!\" diye seslen!",
                "badge": "👨‍👩‍👦 Sevimli Aile Rozeti",
                "emoji": "👨",
                "videoItems": [
                    {
                        "emoji": "👨",
                        "label": "Benim Sevimli Ailem (Family Members)",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Bizi çok seven ailemizi tanıtıyoruz. İngilizce Anne (Mother) ve Baba (Father) kelimelerini aile albümümüzü inceleyerek öğreniyoruz."
            },
            {
                "title": "Çiftlik Hayvanları (Animals)",
                "ageRecommendation": "5-6 Yaş",
                "description": "Evimizdeki ve çiftlikteki sevimli dostlarımızın İngilizce isimlerini (Cat: Kedi, Dog: Köpek, Bird: Kuş) öğreniyoruz.",
                "quizzes": [
                    {
                        "question": "\"Miyav\" diyen sevimli dostumuza İngilizce ne ad verilir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Dog",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Cat",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Cow",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: İngilizce okunuşu 'Ket' olan yumuşak tüylü dostumuz kimdir?"
                    },
                    {
                        "question": "Bahçede kulübesinde durup havlayan sadık dostumuzun İngilizce ismi nedir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Cat",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Dog",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Pig",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: İngilizce 'Dog' (Dok) olarak yazılan sevimli dostumuzu arıyoruz."
                    },
                    {
                        "question": "Gökyüzünde cik cik öterek uçan minik hayvana İngilizce ne denir?",
                        "options": [
                            {
                                "emoji": "🇬🇧",
                                "text": "Bird",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Fish",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🇬🇧",
                                "text": "Lion",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: İngilizce 'Börd' olarak telaffuz edilen kanatlı dostumuzu düşün."
                    }
                ],
                "mission": "Havaya doğru bakıp sanki orada uçan bir kuş varmış gibi el salla ve \"Look at the bird! (Kuşa bak!)\" de.",
                "badge": "🐾 İngilizce Hayvan Dostu Rozeti",
                "emoji": "🐾",
                "videoItems": [
                    {
                        "emoji": "🐾",
                        "label": "Çiftlik Hayvanları (Animals)",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Evimizdeki ve çiftlikteki sevimli dostlarımızın İngilizce isimlerini (Cat: Kedi, Dog: Köpek, Bird: Kuş) öğreniyoruz."
            }
        ]
    },
    "attention": {
        "id": "attention",
        "title": "Dikkat ve Hafıza",
        "emoji": "🧠",
        "color": "var(--color-kids-mint)",
        "isFree": false,
        "adventures": [
            {
                "title": "Gölgesini Bulabilir Misin?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Ekranda gösterilen renkli oyuncakların siyah gölgelerini inceleyerek doğru eşleştirmeyi buluyor, görsel dikkatimizi geliştiriyoruz.",
                "quizzes": [
                    {
                        "question": "Uzun kulaklı bir tavşanın gölgesinde kafasının üstünde ne görünür?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "İki adet dik ve uzun kulak şekli",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Yuvarlak bir top",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Balık yüzgeci",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Tavşanın en belirgin özelliği olan kulakları gölgesinde de aynı durur."
                    },
                    {
                        "question": "Yuvarlak bir topun gölgesi hangi şekildedir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Üçgen",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Daire (Yuvarlak)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kare",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Eşyaların gölgeleri kendi şekillerinin tamamen aynısıdır."
                    },
                    {
                        "question": "Gölge nasıl oluşur?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Işık bir eşyaya çarpıp arkasına geçemediğinde",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Eşyalar uyuduğunda",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Yağmur yağdığında",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Karanlık gölgemizin arkamızda belirmesi için önümüzde ne yanmalıdır?"
                    }
                ],
                "mission": "Evde bir el feneri veya telefon ışığı yardımıyla duvara elinin gölgesini yansıtıp kuş uçurtma taklidi yap!",
                "badge": "👥 Gölge Avcısı Rozeti",
                "emoji": "👥",
                "videoItems": [
                    {
                        "emoji": "👥",
                        "label": "Gölgesini Bulabilir Misin?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Ekranda gösterilen renkli oyuncakların siyah gölgelerini inceleyerek doğru eşleştirmeyi buluyor, görsel dikkatimizi geliştiriyoruz."
            },
            {
                "title": "Oyuncak Kutusunda Hangisi Kayboldu?",
                "ageRecommendation": "3-4 Yaş",
                "description": "Kutudaki 3 oyuncağa dikkatlice bakıyoruz. Gözlerimizi kapatıp açtığımızda kaybolan oyuncağı hafızamızdan buluyoruz.",
                "quizzes": [
                    {
                        "question": "Kutuda duran tren, araba ve bebekten araba kutudan çıkarsa geriye ne kalır?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Tren ve bebek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Sadece tren",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Hepsi kalır",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Arabayı aldık, geriye kalan diğer iki oyuncağı hatırla."
                    },
                    {
                        "question": "Hafızamızı güçlendirmek için ne yapmalıyız?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Eşyalara dikkatlice bakıp özelliklerini aklımızda tutmalıyız",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Hızlıca arkamızı dönmeliyiz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Gözlerimizi hiç açmamalıyız",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Detayları beynimizde küçük bir fotoğraf gibi çekmeye çalışalım."
                    },
                    {
                        "question": "Resimde önce gösterilen sarı ördek az önce neredeydi?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Mavi havuzun içinde",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Ağacın tepesinde",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Bulutun üstünde",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Ördekler yüzmeyi çok sever, nerede yüzüyorlardı?"
                    }
                ],
                "mission": "Masanın üzerine 3 küçük oyuncak koy. Gözlerini kapat, ebeveynin birini saklasın. Gözünü açtığında hangisinin kaybolduğunu tahmin et!",
                "badge": "🔍 Hafıza Dedektifi Rozeti",
                "emoji": "🔍",
                "videoItems": [
                    {
                        "emoji": "🔍",
                        "label": "Oyuncak Kutusunda Hangisi Kayboldu?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Kutudaki 3 oyuncağa dikkatlice bakıyoruz. Gözlerimizi kapatıp açtığımızda kaybolan oyuncağı hafızamızdan buluyoruz."
            },
            {
                "title": "Farklı Olanı Göster!",
                "ageRecommendation": "4-5 Yaş",
                "description": "Yan yana dizilmiş 4 adet sevimli görselin (Örn: 3 elma, 1 muz) içinden farklı olanı bularak ayırt etme yetimizi güçlendiriyoruz.",
                "quizzes": [
                    {
                        "question": "Yan yana duran 3 adet kırmızı kamyon ve 1 adet sarı bisiklet arasından hangisi farklıdır?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Sarı bisiklet",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kırmızı kamyonlar",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Hepsi aynı",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Kamyon olmayan, iki tekerlekli şirin taşıt hangisidir?"
                    },
                    {
                        "question": "Hangisi gruptaki diğerlerinden farklı bir türdür? (Seçenekler: Kedi, Köpek, Kuş, Elma)",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Elma (Yiyecek)",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kedi (Hayvan)",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Köpek (Hayvan)",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Seçeneklerden üçü sevimli birer canlı hayvan, hangisini ise afiyetle yeriz?"
                    },
                    {
                        "question": "Resimdeki 4 çiçekten hangisinin rengi diğerlerinden farklıdır? (Görselde 3 pembe, 1 mavi çiçek vardır)",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Mavi çiçek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Pembe çiçekler",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Hepsi yeşil",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Çiçeklerin renklerine tek tek bakıp aradaki tek farklı rengi bul."
                    }
                ],
                "mission": "Evdeki 3 adet aynı renkteki mandalın yanına 1 adet farklı renkte mandal koy ve farklı olanı ebeveynine göster!",
                "badge": "👁️ Keskin Göz Rozeti",
                "emoji": "👁",
                "videoItems": [
                    {
                        "emoji": "👁",
                        "label": "Farklı Olanı Göster!",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Yan yana dizilmiş 4 adet sevimli görselin (Örn: 3 elma, 1 muz) içinden farklı olanı bularak ayırt etme yetimizi güçlendiriyoruz."
            },
            {
                "title": "Örüntüyü Tamamla: Sırada Ne Var?",
                "ageRecommendation": "4-5 Yaş",
                "description": "Belirli bir sırayla dizilen nesnelerin (Örn: Kırmızı, Mavi, Kırmızı, Mavi...) devamında hangi nesnenin gelmesi gerektiğini mantıksal tahminle buluyoruz.",
                "quizzes": [
                    {
                        "question": "\"Elma, Muz, Elma, Muz...\" örüntüsünde muzdan sonra hangi meyve gelmelidir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Elma",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Portakal",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Muz",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Örüntüyü baştan ritmik oku: Elma-Muz, Elma-Muz, sıra kimde?"
                    },
                    {
                        "question": "\"Daire, Kare, Daire, Kare...\" sırasında kareden sonra hangi şekil gelmelidir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Daire",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Üçgen",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kare",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Köşesi olmayan yuvarlak şekil sırasını bekliyor."
                    },
                    {
                        "question": "Örüntü kuralları neyi takip eder?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Belli bir düzeni ve sırayı",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Rastgele dizilimleri",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Sadece renkleri",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Örüntülerin içinde gizli ve düzenli bir kural vardır."
                    }
                ],
                "mission": "Renkli iki çeşit nesneyle (Örn: 2 çatal, 2 kaşık) masada \"Çatal, Kaşık, Çatal, Kaşık\" sırası oluştur!",
                "badge": "🧩 Örüntü Mimarı Rozeti",
                "emoji": "🧩",
                "videoItems": [
                    {
                        "emoji": "🧩",
                        "label": "Örüntüyü Tamamla: Sırada Ne Var?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Belirli bir sırayla dizilen nesnelerin (Örn: Kırmızı, Mavi, Kırmızı, Mavi...) devamında hangi nesnenin gelmesi gerektiğini mantıksal tahminle buluyoruz."
            },
            {
                "title": "Sesleri Eşleştir: Kim Konuşuyor?",
                "ageRecommendation": "5-6 Yaş",
                "description": "Arkada gizlenen hayvanların çıkardığı sesleri dinliyor, hangi sesin hangi hayvana ait olduğunu işitsel dikkatimizle buluyoruz.",
                "quizzes": [
                    {
                        "question": "\"Vak vak\" diye seslenen sevimli dostumuz hangisidir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Ördek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Tavuk",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kedi",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Bir daha bakalım: Gölde yüzmeyi çok seven sarı gagalı dostumuzu düşün."
                    },
                    {
                        "question": "Çiftlikte duyduğumuz \"Gıdak gıdak\" sesi kime aittir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Tavuk",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Horoz",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "İnek",
                                "isCorrect": false
                            }
                        ],
                        "hint": "İpucunu düşünelim: Bize her sabah taze yumurtalar hazırlayan dostumuz hangisidir?"
                    },
                    {
                        "question": "\"Hav hav\" diye ses duyar duymaz aklımıza hangi sadık dostumuz gelir?",
                        "options": [
                            {
                                "emoji": "🧠",
                                "text": "Köpek",
                                "isCorrect": true
                            },
                            {
                                "emoji": "🧠",
                                "text": "Keçi",
                                "isCorrect": false
                            },
                            {
                                "emoji": "🧠",
                                "text": "Kuş",
                                "isCorrect": false
                            }
                        ],
                        "hint": "Tekrar deneyelim: Kulübesinde kuyruğunu sallayan koruyucu dostumuzu hatırla."
                    }
                ],
                "mission": "Gözlerini kapat, ebeveynin evdeki bir nesneyle ses çıkarsın (Örn: anahtar sallamak, bardağa vurmak). Sesi dinleyerek ne olduğunu tahmin et!",
                "badge": "🔔 Akıllı Kulaklar Rozeti",
                "emoji": "🔔",
                "videoItems": [
                    {
                        "emoji": "🔔",
                        "label": "Sesleri Eşleştir: Kim Konuşuyor?",
                        "color": "var(--color-secondary)"
                    }
                ],
                "videoVoice": "Arkada gizlenen hayvanların çıkardığı sesleri dinliyor, hangi sesin hangi hayvana ait olduğunu işitsel dikkatimizle buluyoruz."
            }
        ]
    }
};
    }

    // 2. Uygulama Başlatma
    init() {
        this.loadTTSVoice();
        this.setupAudioIndicator();
        
        // Landing Page dynamic content & logic (run once)
        this.renderLandingCategories();
        this.initEarlyAccessWizard();
        this.setupFaqAccordion();
        this.setupEventListeners();

        // Listen to URL changes (back/forward browser buttons)
        window.addEventListener('popstate', () => this.handleRouting(false));
        
        // Setup initial routing based on current URL path
        this.handleRouting(true);
        
        // Simülasyon veri artışını tetikle (aktif hissettirmek için)
        this.startDummyActivityTimer();
    }

    setupEventListeners() {
        // Ses Açma/Kapama
        const audioIndicator = document.getElementById('audio-indicator');
        if (audioIndicator) {
            audioIndicator.addEventListener('click', () => this.toggleMute());
        }

        // Ücretsiz Başla/Premium İncele Tetikleyicileri (SPA navigasyon)
        document.querySelectorAll('.btn-demo-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPath = btn.getAttribute('href') || '/free-trial';
                history.pushState(null, '', targetPath);
                this.handleRouting();
            });
        });
    }

    setupDemoEventListeners() {
        // Premium Upsell Modalı Butonları
        const btnUpsellReviewPremium = document.getElementById('btn-upsell-review-premium');
        if (btnUpsellReviewPremium) {
            btnUpsellReviewPremium.addEventListener('click', () => {
                this.closeModal('premium-upsell-modal');
                history.pushState(null, '', '/');
                this.handleRouting();
                setTimeout(() => {
                    const section = document.getElementById('early-access-section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        }

        const btnUpsellContinueFree = document.getElementById('btn-upsell-continue-free');
        if (btnUpsellContinueFree) {
            btnUpsellContinueFree.addEventListener('click', () => {
                this.closeModal('premium-upsell-modal');
            });
        }

        // Parent paneli içindeki Premium İncele butonu yönlendirmesi
        document.querySelectorAll('.btn-go-to-billing').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchParentTab('billing');
            });
        });

        // Ücretsiz Kullanımdan Çıkış (Warning Banner Butonları)
        document.querySelectorAll('.btn-exit-demo').forEach(btn => {
            btn.addEventListener('click', () => {
                history.pushState(null, '', '/');
                this.handleRouting();
                setTimeout(() => {
                    const section = document.getElementById('early-access-section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        });

        // Çocuk Dashboard Geri Dön Butonu
        const btnBackToLanding = document.getElementById('btn-back-to-landing');
        if (btnBackToLanding) {
            btnBackToLanding.addEventListener('click', () => {
                if (this.currentView === 'adventures') {
                    this.currentView = 'categories';
                    this.renderCategories();
                } else {
                    history.pushState(null, '', '/');
                    this.handleRouting();
                }
            });
        }

        // Çocuk Dashboard Ebeveyn Butonu
        const btnParentGateDashboard = document.getElementById('btn-parent-gate-dashboard');
        if (btnParentGateDashboard) {
            btnParentGateDashboard.addEventListener('click', () => this.openParentGate('dashboard'));
        }

        // Rozetlerim Butonu
        const btnViewBadges = document.getElementById('btn-view-badges');
        if (btnViewBadges) {
            btnViewBadges.addEventListener('click', () => this.showMyBadges());
        }

        // Aktiviteden Çıkış Butonu
        const btnExitActivity = document.getElementById('btn-exit-activity');
        if (btnExitActivity) {
            btnExitActivity.addEventListener('click', () => this.exitActivity());
        }

        // Aktivite Sekmeleri (Video ve Quiz)
        const tabVideo = document.getElementById('tab-video');
        if (tabVideo) {
            tabVideo.addEventListener('click', () => this.switchActivityTab('video'));
        }
        const tabQuiz = document.getElementById('tab-quiz');
        if (tabQuiz) {
            tabQuiz.addEventListener('click', () => this.switchActivityTab('quiz'));
        }

        // Sesli Anlatım Dinle Butonu
        const btnPlayVoice = document.getElementById('btn-play-voice');
        if (btnPlayVoice) {
            btnPlayVoice.addEventListener('click', () => this.playVideoVoiceover());
        }

        // Soruyu Tekrar Dinle Butonu
        const btnReplayQuestion = document.getElementById('btn-replay-question');
        if (btnReplayQuestion) {
            btnReplayQuestion.addEventListener('click', () => this.replayQuizQuestion());
        }

        // Modalları Kapat Butonları
        const btnCloseBadges = document.getElementById('btn-close-badges');
        if (btnCloseBadges) {
            btnCloseBadges.addEventListener('click', () => this.closeModal('badges-modal'));
        }
        const btnBadgesConfirm = document.getElementById('btn-badges-confirm');
        if (btnBadgesConfirm) {
            btnBadgesConfirm.addEventListener('click', () => this.closeModal('badges-modal'));
        }
        const btnClaimMissions = document.getElementById('btn-claim-mission');
        if (btnClaimMissions) {
            btnClaimMissions.addEventListener('click', () => this.claimMissionPoints());
        }
        const btnCloseMission = document.getElementById('btn-close-mission');
        if (btnCloseMission) {
            btnCloseMission.addEventListener('click', () => this.closeModal('mission-modal'));
        }
        const btnCloseParentGate = document.getElementById('btn-close-parent-gate');
        if (btnCloseParentGate) {
            btnCloseParentGate.addEventListener('click', () => this.closeModal('parent-gate-modal'));
        }

        // Ebeveyn Kilidi Tuş Takımı (Event Delegation)
        const gateKeypad = document.querySelector('.gate-keypad');
        if (gateKeypad) {
            gateKeypad.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                if (!btn) return;
                
                const key = btn.getAttribute('data-key');
                if (key !== null) {
                    this.pressGateKey(key);
                }
            });
        }

        // Temizle ve Giriş Yap Butonları
        const btnClearGate = document.getElementById('btn-clear-gate');
        if (btnClearGate) {
            btnClearGate.addEventListener('click', () => this.clearGateInput());
        }
        const btnSubmitGate = document.getElementById('btn-submit-gate');
        if (btnSubmitGate) {
            btnSubmitGate.addEventListener('click', () => this.submitGateAnswer());
        }

        // Ebeveyn Panelinden Çıkış
        const btnExitParentPortal = document.getElementById('btn-exit-parent-portal');
        if (btnExitParentPortal) {
            btnExitParentPortal.addEventListener('click', () => this.exitParentPortal());
        }

        // Ebeveyn Paneli Yan Menü Sekmeleri
        document.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.id.replace('side-', '');
                this.switchParentTab(tabName);
            });
        });

        // Ekran Limiti Seçim Butonları
        document.querySelectorAll('.limit-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.getAttribute('data-minutes'));
                this.setLimitPreset(minutes);
            });
        });

        // Premium Üyelik Sekmesi Butonları
        const btnDemoInterestPremium = document.getElementById('btn-demo-interest-premium');
        if (btnDemoInterestPremium) {
            btnDemoInterestPremium.addEventListener('click', () => this.activatePremiumDemo());
        }

        const btnDemoGoEarly = document.getElementById('btn-demo-go-early');
        if (btnDemoGoEarly) {
            btnDemoGoEarly.addEventListener('click', () => {
                history.pushState(null, '', '/');
                this.handleRouting();
                setTimeout(() => {
                    const section = document.getElementById('early-access-section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        }

        const btnDemoNotifyLaunch = document.getElementById('btn-demo-notify-launch');
        if (btnDemoNotifyLaunch) {
            btnDemoNotifyLaunch.addEventListener('click', () => {
                this.showToast("İlginiz için teşekkürler! Lansman listesine eklendiniz. 🚀");
            });
        }
        const btnCancelPremium = document.getElementById('btn-cancel-premium');
        if (btnCancelPremium) {
            btnCancelPremium.addEventListener('click', () => this.cancelPremiumSim());
        }

        // Ekran Süresi Bypass Butonu
        const btnBypassSleep = document.getElementById('btn-bypass-sleep');
        if (btnBypassSleep) {
            btnBypassSleep.addEventListener('click', () => this.openParentGate('bypass-sleep'));
        }
    }

    handleRouting(isInitialLoad = false) {
        const path = window.location.pathname;
        if (path === '/demo' || path === '/demo/' || path === '/demo/parent' || path === '/demo/parent/') {
            const newPath = path.replace('/demo', '/free-trial');
            history.replaceState(null, '', newPath);
            this.handleRouting(isInitialLoad);
            return;
        }
        const container = document.getElementById('demo-container');

        if (path === '/free-trial' || path === '/free-trial/' || path === '/free-trial/parent' || path === '/free-trial/parent/') {
            // Inject DEMO_HTML if not already present
            if (container && !container.querySelector('#kids-dashboard')) {
                container.innerHTML = DEMO_HTML;
                this.setupDemoEventListeners();
                
                // Initialize variables & UI state
                this.updateStarUI();
                this.renderCategories();
                this.startSessionTimer();
                this.setupAudioIndicator();
                this.generateParentGateQuestion();
            }

            // Hide landing screen
            const landingScreen = document.getElementById('landing-screen');
            if (landingScreen) {
                landingScreen.classList.remove('active');
                landingScreen.style.display = 'none';
            }

            if (path.includes('/parent')) {
                // Navigate directly to parent-portal
                document.title = "Mini Kâşif Ebeveyn Paneli";
                const descMeta = document.querySelector('meta[name="description"]');
                if (descMeta) descMeta.setAttribute('content', 'Mini Kâşif ebeveyn gelişim takip paneli.');
                
                // If there's billing tab requested from executeGateAction
                const state = history.state;
                if (state && state.tab === 'billing') {
                    this.navigateTo('parent-portal');
                    this.switchParentTab('billing');
                } else {
                    this.navigateTo('parent-portal');
                }
            } else {
                // Navigate to kids-dashboard
                document.title = "Mini Kâşif Çocuk Dünyası";
                const descMeta = document.querySelector('meta[name="description"]');
                if (descMeta) descMeta.setAttribute('content', 'Mini Kâşif çocuk gelişim ve oyun dünyası.');
                
                this.navigateTo('kids-dashboard');
                if (isInitialLoad) {
                    this.showToast("Ücretsiz kullanım başladı.");
                }
            }
        } else {
            // Landing page (path is '/' or anything else)
            // Empty the demo container
            if (container) {
                container.innerHTML = '';
            }

            // Clear timer if running
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }

            // Cancel any pending speech
            this.speechSynth.cancel();

            // Set document meta
            document.title = "Mini Kâşif - Eğlenceli ve Güvenli Öğrenme Dünyası";
            const descMeta = document.querySelector('meta[name="description"]');
            if (descMeta) descMeta.setAttribute('content', 'Mini Kâşif; reklamsız, yaşa özel hazırlanan mini oyunlar ve ekrandan uzaklaştıran fiziksel görevlerle çocuklarınızın dijital süresini aktif ve güvenli bir gelişim macerasına dönüştürür.');

            // Show landing page
            const landingScreen = document.getElementById('landing-screen');
            if (landingScreen) {
                landingScreen.style.display = 'block';
                setTimeout(() => {
                    landingScreen.classList.add('active');
                }, 50);
                this.activeScreen = 'landing-screen';
            }
        }
    }
    // TTS Türkçe Sesi Yükleme
    loadTTSVoice() {
        const voices = this.speechSynth.getVoices();
        // Türkçe sesleri filtrele
        const trVoices = voices.filter(v => v.lang.includes('tr-TR') || v.lang.includes('tr_TR') || v.lang.startsWith('tr'));
        
        if (trVoices.length > 0) {
            // Konsolda mevcut sesleri görelim (Hata ayıklama için)
            console.log("Mevcut Türkçe Sesler:", trVoices.map(v => v.name));

            // Sevimli/Kadın seslerini tercih et (Windows'ta Tolga erkek sesidir, Hazel/Emel/Seda kadın sesleridir)
            this.ttsVoice = trVoices.find(v => {
                const name = v.name.toLowerCase();
                return name.includes('emel') || 
                       name.includes('hazel') || 
                       name.includes('yelda') || 
                       name.includes('seda') || 
                       name.includes('google') || 
                       name.includes('türkçe') || 
                       name.includes('turkce') || 
                       name.includes('female');
            });

            // Bulunamazsa, Tolga (erkek sesi) olmayan ilk Türkçe sesi tercih et
            if (!this.ttsVoice) {
                this.ttsVoice = trVoices.find(v => !v.name.toLowerCase().includes('tolga'));
            }

            // O da yoksa ilk Türkçe sesi seç (Tolga'ya düşebilir)
            if (!this.ttsVoice) {
                this.ttsVoice = trVoices[0];
            }
        }
    }

    // Metni Seslendir (Text-to-Speech)
    speak(text) {
        if (this.state.isMuted) return;

        // Devam eden seslendirmeleri kes
        this.speechSynth.cancel();

        // Seslerin asenkron yüklenmesine karşı her seslendirmede listeyi yenile
        this.loadTTSVoice();

        const utterance = new SpeechSynthesisUtterance(text);
        let pitchVal = 1.35; // Sevimli kadın sesleri için neşeli, çocuksu perde ayarı

        if (this.ttsVoice) {
            utterance.voice = this.ttsVoice;
            console.log("Kullanılan Ses:", this.ttsVoice.name);

            // Eğer sistemde SADECE Tolga (erkek) sesi yüklüyse ve başka seçenek yoksa
            // Ses perdesini (pitch) 1.55 yaparak sesi incecik, sevimli bir çizgi film kahramanına dönüştürüyoruz
            if (this.ttsVoice.name.toLowerCase().includes('tolga')) {
                pitchVal = 1.55;
            }
        }
        
        utterance.lang = 'tr-TR';
        
        // Çocukların tane tane ve çok rahatça anlayabilmesi için hızı 0.70 seviyesine ayarladık (ideal yavaşlıkta)
        utterance.rate = 0.70; 
        utterance.pitch = pitchVal; 
        
        this.speechSynth.speak(utterance);
    }

    // Ses Efekti Üretimi (Web Audio API - Dosyasız Sentez)
    playEffect(type) {
        if (this.state.isMuted) return;

        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            
            if (type === 'correct') {
                // Doğru cevap: Neşeli iki ton (C5 -> E5 -> G5)
                const playNote = (freq, delay, duration) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
                    osc.type = 'triangle';
                    gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
                    osc.start(ctx.currentTime + delay);
                    osc.stop(ctx.currentTime + delay + duration);
                };
                playNote(523.25, 0, 0.15); // C5
                playNote(659.25, 0.1, 0.15); // E5
                playNote(783.99, 0.2, 0.3); // G5
            } else if (type === 'wrong') {
                // Yanlış cevap: Düşük, kalın ve azalan ton
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'victory') {
                // Rozet kazanma: Hızlı arpej ve fanfare
                const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.3);
                    osc.start(ctx.currentTime + idx * 0.08);
                    osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
                });
            } else if (type === 'sleep') {
                // Uyku ekranına geçiş ses efekti
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(392, ctx.currentTime); // G4
                osc.frequency.linearRampToValueAtTime(196, ctx.currentTime + 0.8); // G3
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
                osc.start();
                osc.stop(ctx.currentTime + 0.8);
            }
        } catch (e) {
            console.warn("AudioContext başlatılamadı:", e);
        }
    }

    // 3. EKRANLAR ARASI NAVİGASYON (SPA)
    navigateTo(screenId) {
        // Ekranları sakla
        document.querySelectorAll('.screen').forEach(scr => {
            scr.classList.remove('active');
            scr.style.display = 'none';
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = (screenId === 'parent-portal') ? 'grid' : 'flex';
            // Animasyon sıfırlama için gecikmeli active class ekleme
            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 50);
            this.activeScreen = screenId;
        }



        // Ekran bazlı özel işlemler
        if (screenId === 'kids-dashboard') {
            this.renderCategories(); // Premium durumuna göre kilitleri güncelle
            this.speak("Merhaba Küçük Kâşif! Bugün hangi maceraya çıkmak istersin?");
        } else if (screenId === 'parent-portal') {
            this.renderParentDashboard();
        } else if (screenId === 'landing-screen') {
            this.speechSynth.cancel();
        }
    }

    // Çocuk Kategorilerini Oluşturma ve Ekrana Ekleme
    renderCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        container.innerHTML = '';

        if (this.currentView === 'categories') {
            Object.values(this.categoriesData).forEach(cat => {
                const isLocked = !cat.isFree && !this.state.isPremium;
                const card = document.createElement('div');
                card.className = `category-card ${cat.id} ${isLocked ? 'locked' : ''}`;
                card.addEventListener('click', () => this.selectCategory(cat.id));

                card.innerHTML = `
                    ${isLocked ? `<div class="lock-ribbon">🔒 Premium</div>` : ''}
                    <span class="card-emoji">${cat.emoji}</span>
                    <h3>${cat.title}</h3>
                `;
                container.appendChild(card);
            });
        } else if (this.currentView === 'adventures' && this.currentCategory) {
            // "Geri Dön" Kartı
            const backCard = document.createElement('div');
            backCard.className = 'category-card back-card';
            backCard.addEventListener('click', () => {
                this.currentView = 'categories';
                this.renderCategories();
            });
            backCard.innerHTML = `
                <span class="card-emoji">⬅️</span>
                <h3>Geri Dön</h3>
            `;
            container.appendChild(backCard);

            // Macera Kartları
            this.currentCategory.adventures.forEach((adv) => {
                const advKey = `${this.currentCategory.id}_${adv.title}`;
                const isCompleted = this.state.completedAdventures && this.state.completedAdventures.includes(advKey);
                
                // Ücretsiz planda sadece Renkler kategorisinden "Mavi Rengi Keşfedelim" içeriği açık
                const isLocked = !this.state.isPremium && 
                                 (this.currentCategory.id !== 'colors' || adv.title !== 'Mavi Rengi Keşfedelim');
                
                const card = document.createElement('div');
                card.className = `category-card adventure-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
                card.style.borderColor = this.currentCategory.color;
                
                if (isLocked) {
                    card.addEventListener('click', () => {
                        const upsellMsg = document.querySelector('#premium-upsell-modal p');
                        if (upsellMsg) {
                            upsellMsg.innerText = "Bu macera Premium plan ile açılır. Çocuğunuzun tüm öğrenme alanlarına erişmesi için Premium’a geçebilirsiniz.";
                        }
                        this.speak("Bu macera Premium plan ile açılır.");
                        this.openModal('premium-upsell-modal');
                    });
                } else {
                    card.addEventListener('click', () => this.selectAdventure(adv));
                }

                card.innerHTML = `
                    ${isLocked ? `<div class="lock-ribbon">🔒 Premium</div>` : (isCompleted ? `<div class="lock-ribbon" style="background-color: var(--color-success)">🌟 Tamamlandı</div>` : '')}
                    <span class="card-emoji">${adv.emoji || '🚀'}</span>
                    <h3>${adv.title}</h3>
                    <div class="adventure-age-tag">${adv.ageRecommendation}</div>
                `;
                container.appendChild(card);
            });
        }
    }

    // Kategori Seçildiğinde
    selectCategory(categoryId) {
        const cat = this.categoriesData[categoryId];
        if (!cat) return;

        const isLocked = !cat.isFree && !this.state.isPremium;
        if (isLocked) {
            const upsellMsg = document.querySelector('#premium-upsell-modal p');
            if (upsellMsg) {
                upsellMsg.innerText = "Bu kategori Premium plan ile açılır. Çocuğunuzun tüm öğrenme alanlarına erişmesi için Premium’a geçebilirsiniz.";
            }
            this.speak("Bu kategori Premium plan ile açılır.");
            this.openModal('premium-upsell-modal');
            return;
        }

        this.currentCategory = cat;
        this.currentView = 'adventures';
        this.renderCategories();
        this.speak(`${cat.title} macerasından bir oyun seçelim!`);
    }

    // Macera Seçildiğinde
    selectAdventure(adventure) {
        this.currentAdventure = adventure;
        this.currentQuizIndex = 0;
        this.correctAnswersInSession = 0;

        // Aktivite ekranını doldur
        document.getElementById('activity-title').innerText = `${adventure.emoji || '🚀'} ${adventure.title}`;
        document.getElementById('activity-progress-fill').style.width = '0%';
        
        // Varsayılan olarak video sekmesine geç
        this.switchActivityTab('video');
        this.navigateTo('kids-activity-screen');
    }

    exitActivity() {
        this.speechSynth.cancel();
        this.renderCategories();
        this.navigateTo('kids-dashboard');
    }

    // 4. ÇOCUK ETKİNLİK ALANI (VİDEO VE QUIZ AKIŞI)
    switchActivityTab(tabName) {
        document.getElementById('tab-video').classList.remove('active');
        document.getElementById('tab-quiz').classList.remove('active');
        document.getElementById('mode-video').classList.remove('active');
        document.getElementById('mode-quiz').classList.remove('active');

        if (tabName === 'video') {
            document.getElementById('tab-video').classList.add('active');
            document.getElementById('mode-video').classList.add('active');
            this.renderVideoSimulation();
            this.playVideoVoiceover();
        } else {
            document.getElementById('tab-quiz').classList.add('active');
            document.getElementById('mode-quiz').classList.add('active');
            this.loadQuizQuestion();
        }
    }

    // Video Simülasyonunu Oluştur (SVG / CSS Animasyonlu Grafik Kartı)
    renderVideoSimulation() {
        const canvas = document.getElementById('video-sim-canvas');
        if (!canvas || !this.currentAdventure) return;

        canvas.innerHTML = '';
        const items = this.currentAdventure.videoItems || [];
        
        const wrapper = document.createElement('div');
        wrapper.className = 'learning-card-anim';
        
        // Kategoriye özel görsel animasyonu
        let itemIndex = 0;
        const renderItem = () => {
            if (this.activeScreen !== 'kids-activity-screen') return;
            const item = items[itemIndex];
            if (!item) {
                // Döngüye sok
                itemIndex = 0;
                renderItem();
                return;
            }

            wrapper.innerHTML = `
                <div class="learning-visual" style="text-shadow: 0 4px 15px rgba(255,255,255,0.2)">${item.emoji}</div>
                <div class="learning-text" style="color: ${item.color || 'white'}">${item.label}</div>
            `;
            
            // Konuşma
            if (document.getElementById('tab-video').classList.contains('active')) {
                this.speak(item.label);
            }

            itemIndex++;
            // Her 4 saniyede bir şekli/rengi değiştir
            this.videoTimer = setTimeout(renderItem, 3500);
        };

        canvas.appendChild(wrapper);
        clearTimeout(this.videoTimer);
        renderItem();
    }

    playVideoVoiceover() {
        if (!this.currentAdventure) return;
        this.speak(this.currentAdventure.videoVoice);
    }

    // Quiz Sorusu Yükle
    loadQuizQuestion() {
        if (!this.currentAdventure) return;
        clearTimeout(this.videoTimer);

        const quizList = this.currentAdventure.quizzes;
        if (this.currentQuizIndex >= quizList.length) {
            // Quiz bitti! Tebrikler ve Rozet modalını aç
            this.completeCategoryQuiz();
            return;
        }

        const quiz = quizList[this.currentQuizIndex];
        
        // Progress güncelleme
        const progressPct = (this.currentQuizIndex / quizList.length) * 100;
        document.getElementById('activity-progress-fill').style.width = `${progressPct}%`;

        // Soru metni
        document.getElementById('quiz-question-text').innerText = quiz.question;
        
        // Şıkları oluştur
        const optionsContainer = document.getElementById('quiz-options-container');
        optionsContainer.innerHTML = '';

        quiz.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.addEventListener('click', (e) => this.selectQuizOption(e.currentTarget, opt.isCorrect));

            // Eğer özel renk varsa kenarlık rengi yap
            if (opt.color) {
                btn.style.borderColor = opt.color;
            }

            btn.innerHTML = `
                <div class="quiz-opt-visual">${opt.emoji}</div>
                <div class="quiz-opt-text">${opt.text}</div>
            `;
            optionsContainer.appendChild(btn);
        });

        // Geri bildirim afişini sakla
        const feedback = document.getElementById('quiz-feedback');
        feedback.style.display = 'none';
        feedback.className = 'quiz-feedback-banner';

        // Soruyu seslendir
        setTimeout(() => {
            this.speak(quiz.question);
        }, 300);
    }

    replayQuizQuestion() {
        if (!this.currentAdventure) return;
        const quiz = this.currentAdventure.quizzes[this.currentQuizIndex];
        if (quiz) {
            this.speak(quiz.question);
        }
    }

    // Şık Seçildiğinde
    selectQuizOption(btnElement, isCorrect) {
        // Birden fazla tıklamayı engelle
        const btns = document.querySelectorAll('.quiz-opt-btn');
        btns.forEach(b => {
            b.disabled = true;
            b.style.pointerEvents = 'none';
        });

        const feedback = document.getElementById('quiz-feedback');

        if (isCorrect) {
            btnElement.classList.add('correct');
            if (this.currentAdventure && this.currentAdventure.title === "Mavi Rengi Keşfedelim") {
                feedback.innerText = "Harika! Bir yıldız kazandın.";
                this.showToast("Harika! Bir yıldız kazandın.");
            } else {
                feedback.innerText = "🌟 Harika! Doğru cevap! 🎉";
            }
            feedback.classList.add('correct');
            feedback.style.display = 'block';
            this.playEffect('correct');
            
            // Yıldız kazanma
            this.state.starsCount += 10;
            this.updateStarUI();
            
            this.correctAnswersInSession++;

            // Konuş
            let speechMsg = "Aferin sana!";
            if (this.currentAdventure && this.currentAdventure.title === "Mavi Rengi Keşfedelim") {
                speechMsg = "Harika! Bir yıldız kazandın.";
            } else {
                const successMessages = ["Aferin sana!", "Harika gidiyorsun!", "Çok doğru!", "Süper bir kâşifsin!"];
                speechMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
            }
            this.speak(speechMsg);

            // Konfeti patlat
            this.triggerConfetti();

            // Sonraki soruya geç
            setTimeout(() => {
                this.currentQuizIndex++;
                this.loadQuizQuestion();
            }, 2500);

        } else {
            btnElement.classList.add('wrong');
            const quiz = this.currentAdventure.quizzes[this.currentQuizIndex];
            const hintText = quiz.hint || "Tekrar deneyelim, başarabilirsin! 💪";

            feedback.innerText = hintText;
            feedback.classList.add('wrong');
            feedback.style.display = 'block';
            this.playEffect('wrong');

            this.speak(hintText);

            // 3.5 saniye sonra şıkları sıfırla ve yeniden seçmeye izin ver
            setTimeout(() => {
                this.loadQuizQuestion();
            }, 3500);
        }
    }

    // Quiz Tamamlama ve Rozet Kazanma
    completeCategoryQuiz() {
        this.playEffect('victory');
        this.triggerConfetti();

        // Macera anahtarını tamamlananlara ekle
        const advKey = `${this.currentCategory.id}_${this.currentAdventure.title}`;
        if (!this.state.completedAdventures.includes(advKey)) {
            this.state.completedAdventures.push(advKey);
        }

        // Kategori ilerlemesini güncelle (her macera %20 katkı sağlar)
        const completedInCat = this.currentCategory.adventures.filter(adv => 
            this.state.completedAdventures.includes(`${this.currentCategory.id}_${adv.title}`)
        ).length;
        this.state.progress[this.currentCategory.id] = Math.min(100, completedInCat * 20);
        this.saveState();

        // Rozet kazan
        const badgeName = this.currentAdventure.badge || `${this.currentAdventure.title} Rozeti`;
        let isNewBadge = false;
        if (!this.state.unlockedBadges.includes(badgeName)) {
            this.state.unlockedBadges.push(badgeName);
            isNewBadge = true;
        }

        // Yıldız ödülü
        this.state.starsCount += 50;
        this.updateStarUI();
        this.saveState();

        // Sıralı Toast Mesajları gösterimi
        let toasts = [
            "Harika! Macerayı tamamladın! 🏆",
            "+50 Yıldız Kazandın! 🌟",
            `${badgeName} Kazanıldı! 🎉`
        ];
        let speechMsg = `Tebrikler! ${this.currentAdventure.title} macerasını tamamladın ve ${badgeName} kazandın!`;

        if (this.currentAdventure && this.currentAdventure.title === "Mavi Rengi Keşfedelim") {
            toasts = [
                "Mavi Kâşifi rozeti kazanıldı.",
                "Ebeveyn panelinde ilerleme güncellendi."
            ];
            speechMsg = "Tebrikler Mini Kâşif! Mavi Kâşifi rozetini kazandın.";
        }

        this.showToastSequence(toasts);

        this.speak(speechMsg);

        // Ekran dışı görev modalını tetikle
        setTimeout(() => {
            this.openOfflineMissionModal();
        }, 1500);
    }

    // Ekran Dışı Görev Modalı Açma
    openOfflineMissionModal() {
        if (!this.currentAdventure) return;
        const description = this.currentAdventure.mission;
        document.getElementById('mission-description').innerText = description;
        this.openModal('mission-modal');
    }

    // Ekran Dışı Görev Tamamlama (Ebeveyn Onayı ile)
    claimMissionPoints() {
        // Ebeveyn onayını kontrol etmek için ebeveyn kilidini aç
        this.closeModal('mission-modal');
        this.openParentGate('approve-mission');
    }

    // 5. MODAL KONTROLLERİ
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        if (modalId === 'mission-modal') {
            // Ana ekrana dön
            this.exitActivity();
        }
    }

    // 6. EBEVEYN KİLİDİ (PARENT GATE) MANTIĞI
    openParentGate(pendingAction = 'dashboard') {
        this.gatePendingAction = pendingAction;
        this.generateParentGateQuestion();
        this.clearGateInput();
        document.getElementById('gate-error').style.display = 'none';
        this.openModal('parent-gate-modal');
    }

    generateParentGateQuestion() {
        const num1 = Math.floor(Math.random() * 5) + 5; // 5-9 arası
        const num2 = Math.floor(Math.random() * 4) + 2; // 2-5 arası
        this.gateAnswer = num1 + num2;
        
        // Türkçe kelimelerle de okumayı zorlaştıralım (çocukların tıklamasını önlemek için)
        // Örn: "Dokuz artı dört kaç eder?"
        const words = ["Sıfır", "Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz"];
        document.getElementById('gate-question').innerText = `${words[num1]} + ${words[num2]} = ?`;
    }

    pressGateKey(num) {
        if (this.gateInput.length < 3) {
            this.gateInput += num;
            document.getElementById('gate-input-val').innerText = this.gateInput;
        }
    }

    clearGateInput() {
        this.gateInput = '';
        document.getElementById('gate-input-val').innerText = '-';
    }

    submitGateAnswer() {
        const answerVal = parseInt(this.gateInput);
        if (answerVal === this.gateAnswer) {
            // Başarılı kilit açma
            this.closeModal('parent-gate-modal');
            this.executeGateAction();
        } else {
            // Başarısız
            this.playEffect('wrong');
            document.getElementById('gate-error').style.display = 'block';
            this.clearGateInput();
            this.generateParentGateQuestion(); // yeni soru sor
        }
    }

    // Kilit başarıyla aşıldığında yapılacak işlemler
    executeGateAction() {
        this.showToast("Ebeveyn doğrulaması başarılı! Giriş yapıldı.");
        
        switch (this.gatePendingAction) {
            case 'dashboard':
                history.pushState(null, '', '/free-trial/parent');
                this.handleRouting();
                break;
            case 'premium':
                history.pushState({ tab: 'billing' }, '', '/free-trial/parent');
                this.handleRouting();
                break;
            case 'bypass-sleep':
                // Süreyi uzat (+15 dk)
                this.state.screenTimeLimit = Math.max(15, this.state.screenTimeLimit + 15);
                this.sessionTimeRemaining = 15 * 60; // 15 dk daha ver
                this.saveState();
                history.pushState(null, '', '/free-trial');
                this.handleRouting();
                this.showToast("Ekran süresi 15 dakika uzatıldı!");
                break;
            case 'approve-mission':
                // Ekran dışı görev onaylandı
                this.state.completedMissions += 1;
                this.state.starsCount += 100; // Ekran dışı görevlerin yıldız ödülü yüksektir!
                this.updateStarUI();
                this.saveState();
                this.playEffect('victory');
                this.triggerConfetti();
                
                // Özel bir Süper Kâşif rozeti ekle
                const superBadge = "🏃 Süper Kâşif";
                if (!this.state.unlockedBadges.includes(superBadge)) {
                    this.state.unlockedBadges.push(superBadge);
                    this.saveState();
                }

                if (this.currentAdventure && this.currentAdventure.title === "Mavi Rengi Keşfedelim") {
                    this.showToastSequence([
                        "Görev tamamlandı.",
                        "Ebeveyn panelinde ilerleme güncellendi."
                    ]);
                } else {
                    this.showToastSequence([
                        "Görev onaylandı! 100 Ekstra Yıldız eklendi! 🌟",
                        "Süper Kâşif rozeti kazanıldı! 🏃"
                    ]);
                }
                this.exitActivity();
                break;
        }
    }

    switchParentTab(tabName) {
        document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.parent-tab-content').forEach(cont => cont.classList.remove('active'));

        document.getElementById(`side-${tabName}`).classList.add('active');
        document.getElementById(`parent-tab-${tabName}`).classList.add('active');

        if (tabName === 'dashboard') {
            this.renderParentDashboard();
        } else if (tabName === 'early-access') {
            this.renderEarlyAccessPortalView();
        }
    }

    exitParentPortal() {
        history.pushState(null, '', '/free-trial');
        this.handleRouting();
    }

    renderParentDashboard() {
        const freeView = document.getElementById('parent-dashboard-free-view');
        const premiumView = document.getElementById('parent-dashboard-premium-view');
        
        if (this.state.isPremium) {
            if (freeView) freeView.classList.remove('active');
            if (premiumView) premiumView.classList.add('active');
            
            // İstatistik kartlarını doldur
            document.getElementById('parent-stat-time').innerText = `${this.state.timeSpent} Dakika`;
            document.getElementById('parent-stat-stars').innerText = `${this.state.starsCount} Yıldız`;
            document.getElementById('parent-stat-badges').innerText = `${this.state.unlockedBadges.length} / 8 Rozet`;
            document.getElementById('parent-stat-missions').innerText = `${this.state.completedMissions} Görev`;

            // Kategori ilerlemelerini listele
            const listContainer = document.getElementById('parent-progress-list');
            listContainer.innerHTML = '';

            Object.values(this.categoriesData).forEach(cat => {
                const prog = this.state.progress[cat.id] || 0;
                const item = document.createElement('div');
                item.className = 'progress-item';
                item.innerHTML = `
                    <div class="progress-item-label">
                        <span>${cat.emoji} ${cat.title}</span>
                        <span>%${prog}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${prog}%; background-color: ${cat.color}"></div>
                    </div>
                `;
                listContainer.appendChild(item);
            });
        } else {
            if (freeView) freeView.classList.add('active');
            if (premiumView) premiumView.classList.remove('active');
            
            // Ücretsiz görünüm istatistiklerini doldur
            const timeEl = document.getElementById('parent-free-stat-time');
            if (timeEl) {
                timeEl.innerText = `${this.state.timeSpent || 0} Dakika`;
            }
            
            const advEl = document.getElementById('parent-free-stat-adventure');
            if (advEl) {
                const isCompleted = this.state.completedAdventures && this.state.completedAdventures.includes("colors_Mavi Rengi Keşfedelim");
                advEl.innerText = isCompleted ? "Tamamlandı ✅" : "Başlanmadı ❌";
            }
            
            const badgeEl = document.getElementById('parent-free-stat-badge');
            if (badgeEl) {
                const hasBadge = this.state.unlockedBadges && 
                                 (this.state.unlockedBadges.includes("🔵 Mavi Kâşifi") || this.state.unlockedBadges.includes("Mavi Kâşifi"));
                badgeEl.innerText = hasBadge ? "Mavi Kâşifi 🏆" : "Kazanılmadı 🔒";
            }
        }

        // Süre sınırlayıcı sekmelerini de güncelle
        this.updateLimitUI();

        // Abonelik durumunu güncelle
        this.updateSubscriptionBillingUI();
    }

    updateLimitUI() {
        const limit = this.state.screenTimeLimit;
        
        // Buton durumlarını güncelle
        document.querySelectorAll('.limit-preset-btn').forEach(btn => {
            const min = parseInt(btn.getAttribute('data-minutes'));
            if (min === limit) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const badge = document.getElementById('limit-status-badge');
        if (limit > 0) {
            badge.innerText = 'Aktif';
            badge.style.backgroundColor = 'var(--color-success)';
        } else {
            badge.innerText = 'Pasif (Devre Dışı)';
            badge.style.backgroundColor = 'var(--color-text-muted)';
        }
    }

    setLimitPreset(minutes) {
        this.state.screenTimeLimit = minutes;
        this.sessionTimeRemaining = minutes * 60;
        this.saveState();
        this.updateLimitUI();
        this.showToast(`Günlük limit ${minutes > 0 ? minutes + ' dakika' : 'sınırsız'} olarak güncellendi!`);
    }

    // 8. ABONELİK SİMÜLASYONU
    updateSubscriptionBillingUI() {
        const label = document.getElementById('current-membership-label');
        const desc = document.getElementById('membership-details-text');
        const checkoutForm = document.getElementById('premium-checkout-container');
        const activeActions = document.getElementById('premium-active-actions');
        const billingBox = document.getElementById('billing-status-box');

        if (this.state.isPremium) {
            label.innerText = 'Premium Üye';
            label.className = 'badge-premium';
            desc.innerText = 'Mini Kâşif Premium özellikleri aktif edildi! Tüm kilitler açıldı.';
            checkoutForm.style.display = 'none';
            activeActions.style.display = 'block';
            billingBox.style.borderColor = 'var(--color-accent)';
        } else {
            label.innerText = 'Ücretsiz Paket';
            label.className = 'badge-free';
            desc.innerText = 'Ücretsiz planda Renkler kategorisinden sınırlı içerikler sunulmaktadır. Gelişmiş ebeveyn özellikleri ve tüm içerikler için Premium plana geçiş planlanmaktadır.';
            checkoutForm.style.display = 'block';
            activeActions.style.display = 'none';
            billingBox.style.borderColor = '#cbd5e1';
        }
    }

    activatePremiumDemo() {
        this.state.isPremium = true;
        this.saveState();
        this.updateSubscriptionBillingUI();
        this.renderCategories(); // Çocuk ekranındaki kilitleri kaldır
        this.playEffect('victory');
        this.triggerConfetti();
        this.showToast("Mini Kâşif Premium özellikleri aktif edildi! Tüm kilitler açıldı. 🚀");
    }

    cancelPremiumSim() {
        this.state.isPremium = false;
        this.saveState();
        this.updateSubscriptionBillingUI();
        this.renderCategories();
        this.showToast("Premium özellikleri kapatıldı (Ücretsiz pakete dönüldü).");
    }

    // 9. SÜRE SAYAÇ MOTORU (GÜNLÜK LİMİT KONTROLÜ)
    startSessionTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            // Eğer süre sınırı varsa ve aktif ekran çocuk ekranı ise veya quiz yapılıyorsa
            const isLimitActive = this.state.screenTimeLimit > 0;
            const isChildPlaying = (this.activeScreen === 'kids-dashboard' || this.activeScreen === 'kids-activity-screen');

            if (isLimitActive && isChildPlaying) {
                this.sessionTimeRemaining--;
                
                // Ebeveyn panelindeki kalan süreyi güncelle
                const display = document.getElementById('limit-remaining-display');
                if (display) {
                    const min = Math.floor(this.sessionTimeRemaining / 60);
                    const sec = this.sessionTimeRemaining % 60;
                    display.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
                }

                if (this.sessionTimeRemaining <= 0) {
                    // Süre bitti! Uyku modunu aktif et
                    this.triggerSleepMode();
                }
            }
        }, 1000);
    }

    triggerSleepMode() {
        this.speechSynth.cancel();
        this.playEffect('sleep');
        this.navigateTo('sleep-screen');
        this.speak("Mini Kâşif şimdi dinleniyor. Gözlerimizi biraz dinlendirelim, sonra yine oynarız!");
    }

    // Ebeveyn istatistiklerinde "Toplam Süre"nin yapay olarak artması (Simülasyon)
    startDummyActivityTimer() {
        setInterval(() => {
            const isChildPlaying = (this.activeScreen === 'kids-dashboard' || this.activeScreen === 'kids-activity-screen');
            if (isChildPlaying) {
                this.state.timeSpent += 1;
                this.saveState();
            }
        }, 60000); // her 1 dakikada bir toplam süreyi arttır
    }

    // 10. ROZETLERİM MODALINI GÖSTER
    showMyBadges() {
        const container = document.getElementById('badges-container');
        if (!container) return;

        container.innerHTML = '';
        
        // Rozetleri tüm kategoriler altındaki maceralardan toplayalım
        const allBadges = [];
        Object.values(this.categoriesData).forEach(cat => {
            if (cat.adventures) {
                cat.adventures.forEach(adv => {
                    if (adv.badge && !allBadges.includes(adv.badge)) {
                        allBadges.push(adv.badge);
                    }
                });
            }
        });
        
        // Ebeveyn tarafından verilen ekstra rozet
        const superBadge = "🏃 Süper Kâşif";
        if (!allBadges.includes(superBadge)) {
            allBadges.push(superBadge);
        }

        allBadges.forEach(b => {
            const isUnlocked = this.state.unlockedBadges.includes(b);
            const badgeCard = document.createElement('div');
            badgeCard.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
            
            // Emoji ayır
            const parts = b.split(' ');
            const emoji = parts[0];
            const name = parts.slice(1).join(' ');

            badgeCard.innerHTML = `
                <div class="badge-emoji">${emoji}</div>
                <h4>${name}</h4>
                <p style="font-size:0.65rem; color:#888;">${isUnlocked ? 'Kazanıldı!' : 'Kilitli'}</p>
            `;
            container.appendChild(badgeCard);
        });

        this.openModal('badges-modal');
        this.speak("Rozetlerine bir bak! Harika işler başardın!");
    }

    // 11. SES AÇMA / KAPATMA (MUTE)
    setupAudioIndicator() {
        const ind = document.getElementById('audio-indicator');
        if (!ind) return;

        if (this.state.isMuted) {
            ind.classList.add('muted');
            ind.querySelector('span').innerText = 'Ses Kapalı';
        } else {
            ind.classList.remove('muted');
            ind.querySelector('span').innerText = 'Ses Açık';
        }
    }

    toggleMute() {
        this.state.isMuted = !this.state.isMuted;
        this.saveState();
        this.setupAudioIndicator();
        if (this.state.isMuted) {
            this.speechSynth.cancel();
        } else {
            this.speak("Ses açıldı! Merhaba!");
        }
    }

    // 12. UTILITY / YARDIMCI METOTLAR
    updateStarUI() {
        const display = document.getElementById('total-stars-count');
        if (display) display.innerText = this.state.starsCount;
    }

    saveState() {
        localStorage.setItem('mk_stars', this.state.starsCount);
        localStorage.setItem('mk_badges', JSON.stringify(this.state.unlockedBadges));
        localStorage.setItem('mk_missions', this.state.completedMissions);
        localStorage.setItem('mk_time_spent', this.state.timeSpent);
        localStorage.setItem('mk_time_limit', this.state.screenTimeLimit);
        localStorage.setItem('mk_is_premium', this.state.isPremium);
        localStorage.setItem('mk_is_muted', this.state.isMuted);
        localStorage.setItem('mk_progress', JSON.stringify(this.state.progress));
    }

    showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;

        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
            toast.classList.remove('show');
        }

        toast.innerText = message;
        toast.classList.add('show');

        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            this.toastTimeout = null;
        }, 3000);
    }

    showToastSequence(messages) {
        if (!messages || messages.length === 0) return;
        
        let index = 0;
        const displayNext = () => {
            if (index >= messages.length) return;
            const msg = messages[index];
            this.showToast(msg);
            index++;
            setTimeout(displayNext, 3500); // 3 saniye görünüm + 0.5 saniye kaybolma geçişi
        };
        displayNext();
    }

    // Konfeti Efekti (Canvas bazlı ve hafif)
    triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const colors = ['#ff6f61', '#4ea8de', '#ffb703', '#2ec4b6', '#9b5de5', '#f15bb5'];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 4,
                d: Math.random() * canvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.07 + 0.02,
                tiltAngle: 0
            });
        }

        let animationFrame;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, idx) => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(p.tiltAngle);
                p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            });

            // Ekranda kalanları filtrele
            particles = particles.filter(p => p.y < canvas.height);

            if (particles.length > 0) {
                animationFrame = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        };

        draw();
    }

    // Landing Page Kategorilerini Dinamik Olarak Listele
    renderLandingCategories() {
        const grid = document.getElementById('landing-categories-grid');
        if (!grid) return;
        grid.innerHTML = '';
        Object.values(this.categoriesData).forEach(cat => {
            const card = document.createElement('div');
            card.className = 'landing-category-card';
            card.style.borderBottomColor = cat.color || 'var(--color-primary)';
            
            const isFree = cat.isFree;
            const badgeHTML = isFree 
                ? `<span class="badge free-badge">Ücretsiz</span>` 
                : `<span class="badge premium-badge">🔒 Premium</span>`;
            
            const descriptionHTML = isFree 
                ? `"Mavi Rengi Keşfedelim" içeriği açık` 
                : `Premium ile açılır`;
            
            card.innerHTML = `
                ${badgeHTML}
                <span class="landing-category-emoji">${cat.emoji}</span>
                <h3>${cat.title}</h3>
                <p>${descriptionHTML}</p>
            `;
            grid.appendChild(card);
        });
    }

    // FAQ Accordion İşleyicileri
    setupFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            const content = item.querySelector('.faq-content');
            
            if (trigger && content) {
                trigger.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Diğer tüm FAQ öğelerini kapat
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherContent = otherItem.querySelector('.faq-content');
                            if (otherContent) {
                                otherContent.style.maxHeight = null;
                            }
                            const otherTrigger = otherItem.querySelector('.faq-trigger');
                            if (otherTrigger) {
                                otherTrigger.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });

                    // Tıklanan FAQ öğesini aç/kapat
                    if (isActive) {
                        item.classList.remove('active');
                        content.style.maxHeight = null;
                        trigger.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }

    // Erken Erişim Sihirbazını Başlat
    initEarlyAccessWizard() {
        const card = document.getElementById('early-access-wizard-container');
        if (!card) return;

        const savedAnswers = localStorage.getItem('mk_early_access_answers');
        if (savedAnswers) {
            // Zaten kayıtlı ise direkt kupon ekranını göster
            card.innerHTML = `
                <div class="wizard-success-screen">
                    <span class="wizard-success-icon">🎉</span>
                    <h3>Zaten Kayıt Oldunuz!</h3>
                    <p>Mini Kâşif Erken Erişim listesindesiniz. Lansmana özel %20 indirim kuponunuz:</p>
                    <div class="wizard-coupon-box">
                        <span class="wizard-coupon-code">KASIF20</span>
                    </div>
                    <p>Başvuru detaylarınızı ve gelişim raporlarını görmek için Ebeveyn Paneli'ni ziyaret edebilirsiniz.</p>
                    <button class="btn btn-primary btn-block" id="btn-wizard-go-portal-already" style="margin-top: 15px;">Ebeveyn Paneline Git 📊</button>
                </div>
            `;
            const goPortalBtn = document.getElementById('btn-wizard-go-portal-already');
            if (goPortalBtn) {
                goPortalBtn.addEventListener('click', () => {
                    this.openParentGate('dashboard');
                });
            }
            return;
        }

        // Soru Veri Yapısını Hazırla
        this.formQuestions = [
            {
                key: 'parentName',
                title: 'Adınız Soyadınız',
                desc: 'Sizinle nasıl iletişim kuracağımızı bilmek isteriz.',
                type: 'text',
                placeholder: 'Örn: Ayşe Yılmaz',
                required: true
            },
            {
                key: 'email',
                title: 'E-posta Adresiniz',
                desc: 'Erken erişim davetiniz ve bilgilendirmeler bu adrese gönderilecektir.',
                type: 'email',
                placeholder: 'Örn: name@example.com',
                required: true
            },
            {
                key: 'childAge',
                title: 'Çocuğunuz Kaç Yaşında?',
                desc: 'İçerik seviyelerini yaş grubuna uygun optimize etmek için.',
                type: 'radio',
                options: ['3 Yaş', '4 Yaş', '5 Yaş', '6 Yaş', 'Diğer (3 yaş altı veya 6 yaş üstü)'],
                required: true
            },
            {
                key: 'screenTime',
                title: 'Çocuğunuzun Günlük Ortalama Ekran Süresi Ne Kadar?',
                desc: 'Zaman sınırlayıcı özelliklerimizi tasarlamak için.',
                type: 'radio',
                options: ['30 dakikadan az', '30 - 60 dakika arası', '1 - 2 saat arası', '2 saatten fazla'],
                required: true
            },
            {
                key: 'primaryDevice',
                title: 'Çocuğunuz Dijital İçerikleri En Çok Hangi Cihazda Tüketiyor?',
                desc: 'Uygulama arayüzünü en çok kullanılan ekranlara göre iyileştirmek için.',
                type: 'radio-other',
                options: ['Tablet', 'Akıllı Telefon (Mobil)', 'Akıllı TV (Televizyon)', 'Bilgisayar', 'Diğer'],
                required: true
            },
            {
                key: 'primaryPlatform',
                title: 'Çocuğunuz En Çok Hangi Platformu veya Uygulamayı Kullanıyor?',
                desc: 'Alışkanlıkları analiz etmek için.',
                type: 'radio-other',
                options: ['YouTube / YouTube Kids', 'Dijital Yayın Platformları (Netflix, Disney+ vb.)', 'Mobil Oyunlar (Boyama, Yapboz vb.)', 'Eğitici / Çocuk Uygulamaları', 'Diğer'],
                required: true
            },
            {
                key: 'biggestConcern',
                title: 'Çocuğunuzun Ekran Süresiyle İlgili En Büyük Endişeniz Nedir?',
                desc: 'Lütfen en fazla 2 seçenek seçin.',
                type: 'checkbox',
                options: [
                    'Kontrolsüz reklamlar ve uygunsuz sponsorlu içerikler',
                    'Otomatik akış ve yönlendirmeler nedeniyle ekran başından ayrılmakta zorlanması',
                    'İçeriklerin pedagojik açıdan yaşına uygun olmaması (şiddet, argolu dil vb.)',
                    'Ekran başında tamamen pasif kalması ve fiziksel hareketten uzaklaşması',
                    'Herhangi bir endişem bulunmuyor.'
                ],
                required: true,
                maxSelect: 2
            },
            {
                key: 'willUse',
                title: 'Çocuğunuzu ekrandan uzaklaştıran fiziksel görevler de sunan, reklamsız ve güvenli "Mini Kâşif" platformunu kullanmak ister misiniz?',
                desc: 'Ekran dışı döngümüze duyulan ilgiyi ölçmek için.',
                type: 'radio',
                options: ['Evet, kesinlikle kullanmak isterim.', 'Belki, önce deneme sürümünü incelemek isterim.', 'Hayır, ilgimi çekmedi.'],
                required: true
            },
            {
                key: 'priceRange',
                title: 'Böyle bir güvenli dijital platform için aylık ödemeyi makul bulduğunuz ücret aralığı nedir?',
                desc: 'Abonelik planlarımızı adil fiyatlandırmak için.',
                type: 'radio',
                options: [
                    '49 ₺ - 69 ₺ / Ay (Temel Eğitici İçerikler)',
                    '79 ₺ - 109 ₺ / Ay (Sınırsız Kategori + Akıllı Limitör + Gelişim Raporları)',
                    '119 ₺ ve üzeri / Ay (Premium İçerikler + Adrese Kargolanan Fiziksel Görev Defterleri)',
                    'Ücretli hiçbir eğitim platformunu tercih etmem / Sadece tamamen ücretsiz ise kullanırım.'
                ],
                required: true
            },
            {
                key: 'earlyAccessInterest',
                title: 'Mini Kâşif yayına girdiğinde Erken Erişim sürümüne öncelikli katılmak ve indirimlerden haberdar olmak ister misiniz?',
                desc: 'Sizi erken erişim listemize ekleyelim.',
                type: 'radio',
                options: [
                    'Evet, Erken Erişim listesine katılmak ve indirim kodumu almak istiyorum.',
                    'Sadece ürün resmi olarak çıktığında e-posta almak istiyorum.',
                    'Hayır, ankete katıldığım için teşekkürler.'
                ],
                required: true
            }
        ];

        // Sihirbaz Kabuğunu Oluştur
        card.innerHTML = `
            <div class="wizard-title-box">
                <h3>Erken Erişim Başvurusu</h3>
                <p>Mini Kâşif lansman öncesi indirim ve avantajlarından yararlanın.</p>
            </div>
            <div class="wizard-progress-container">
                <div class="wizard-progress-text">
                    <span id="wizard-progress-step-text">Soru 1 / 10</span>
                    <span id="wizard-progress-percent">0%</span>
                </div>
                <div class="wizard-progress-bar">
                    <div class="wizard-progress-fill" id="wizard-progress-fill" style="width: 0%"></div>
                </div>
            </div>
            <div class="wizard-step active" id="wizard-step-container">
                <!-- Soru içeriği buraya gelecek -->
            </div>
            <div class="wizard-error-banner" id="wizard-error-banner"></div>
            <div class="wizard-actions">
                <button class="btn btn-secondary" id="btn-wizard-prev" style="visibility: hidden;">⬅️ Geri</button>
                <button class="btn btn-primary" id="btn-wizard-next">İleri ➡️</button>
            </div>
        `;

        // Navigasyon Olaylarını Bağla
        const prevBtn = document.getElementById('btn-wizard-prev');
        const nextBtn = document.getElementById('btn-wizard-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.handleWizardPrev());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.handleWizardNext());
        }

        this.currentFormStep = 0;
        this.formAnswers = {};
        this.renderFormStep(this.currentFormStep);
    }

    // Sihirbaz Adımını Render Et
    renderFormStep(stepIndex) {
        const q = this.formQuestions[stepIndex];
        const container = document.getElementById('wizard-step-container');
        const prevBtn = document.getElementById('btn-wizard-prev');
        const nextBtn = document.getElementById('btn-wizard-next');
        const progressStepText = document.getElementById('wizard-progress-step-text');
        const progressPercent = document.getElementById('wizard-progress-percent');
        const progressFill = document.getElementById('wizard-progress-fill');
        const errorBanner = document.getElementById('wizard-error-banner');

        if (!container) return;

        // Hatayı temizle
        errorBanner.style.display = 'none';

        // İlerlemeyi Güncelle
        const totalSteps = this.formQuestions.length;
        const progressVal = Math.round((stepIndex / totalSteps) * 100);
        if (progressStepText) progressStepText.innerText = `Soru ${stepIndex + 1} / ${totalSteps}`;
        if (progressPercent) progressPercent.innerText = `${progressVal}%`;
        if (progressFill) progressFill.style.width = `${progressVal}%`;

        // Geri/İleri buton görünürlüğü
        if (prevBtn) {
            prevBtn.style.visibility = stepIndex === 0 ? 'hidden' : 'visible';
        }
        if (nextBtn) {
            nextBtn.innerText = stepIndex === totalSteps - 1 ? 'Tamamla 🏁' : 'İleri ➡️';
        }

        // Soru HTML'ini Oluştur
        let html = `
            <h4 class="wizard-question-title">${q.title}</h4>
            ${q.desc ? `<p class="wizard-question-desc">${q.desc}</p>` : ''}
            <div class="wizard-input-group">
        `;

        const currentValue = this.formAnswers[q.key] || '';

        if (q.type === 'text' || q.type === 'email') {
            const inputId = `wizard-input-${q.key}`;
            html += `
                <input type="${q.type}" id="${inputId}" class="wizard-text-input" placeholder="${q.placeholder || ''}" value="${currentValue}">
            `;
        } else if (q.type === 'radio' || q.type === 'radio-other') {
            html += `<div class="wizard-options-grid">`;
            q.options.forEach((opt, idx) => {
                const isSelected = currentValue === opt || (q.type === 'radio-other' && opt === 'Diğer' && currentValue !== '' && !q.options.includes(currentValue));
                const optId = `q-${stepIndex}-opt-${idx}`;
                html += `
                    <label class="wizard-option-label ${isSelected ? 'selected' : ''}" for="${optId}">
                        <input type="radio" id="${optId}" name="wizard-q-${stepIndex}" value="${opt}" ${isSelected ? 'checked' : ''}>
                        <span>${opt}</span>
                    </label>
                `;
            });
            html += `</div>`;

            // Diğer seçeneği seçildiğinde çıkacak ek kutu
            const isCustomSelected = currentValue !== '' && !q.options.includes(currentValue) && currentValue !== 'Diğer';
            const otherInputValue = isCustomSelected ? currentValue : '';
            const showOtherInput = (currentValue === 'Diğer' || isCustomSelected);
            
            if (q.type === 'radio-other') {
                html += `
                    <input type="text" id="wizard-other-${q.key}" class="wizard-other-text-input" placeholder="Lütfen belirtin..." value="${otherInputValue}" style="display: ${showOtherInput ? 'block' : 'none'};">
                `;
            }
        } else if (q.type === 'checkbox') {
            html += `<div class="wizard-options-grid">`;
            const checkedValues = Array.isArray(currentValue) ? currentValue : [];
            q.options.forEach((opt, idx) => {
                const isSelected = checkedValues.includes(opt);
                const optId = `q-${stepIndex}-opt-${idx}`;
                html += `
                    <label class="wizard-option-label ${isSelected ? 'selected' : ''}" for="${optId}">
                        <input type="checkbox" id="${optId}" name="wizard-q-${stepIndex}" value="${opt}" ${isSelected ? 'checked' : ''}>
                        <span>${opt}</span>
                    </label>
                `;
            });
            html += `</div>`;
        }

        html += `</div>`;
        container.innerHTML = html;

        // Olayları Bağla
        this.attachWizardStepEvents(stepIndex);
    }

    // Sihirbaz Adım Olaylarını Yönet (Seçim renklendirme vb.)
    attachWizardStepEvents(stepIndex) {
        const q = this.formQuestions[stepIndex];
        const container = document.getElementById('wizard-step-container');
        if (!container) return;

        // Metin veya e-posta alanı için
        if (q.type === 'text' || q.type === 'email') {
            const input = document.getElementById(`wizard-input-${q.key}`);
            if (input) {
                input.addEventListener('input', (e) => {
                    this.formAnswers[q.key] = e.target.value.trim();
                });
            }
        } else if (q.type === 'radio' || q.type === 'radio-other') {
            const labels = container.querySelectorAll('.wizard-option-label');
            labels.forEach(label => {
                const radio = label.querySelector('input[type="radio"]');
                
                radio.addEventListener('change', () => {
                    // Diğer şıklardan seçimi kaldır
                    labels.forEach(l => l.classList.remove('selected'));
                    
                    if (radio.checked) {
                        label.classList.add('selected');
                        
                        const value = radio.value;
                        const otherInput = document.getElementById(`wizard-other-${q.key}`);
                        
                        if (value === 'Diğer') {
                            if (otherInput) {
                                otherInput.style.display = 'block';
                                otherInput.focus();
                                this.formAnswers[q.key] = otherInput.value.trim() || 'Diğer';
                            }
                        } else {
                            if (otherInput) {
                                otherInput.style.display = 'none';
                            }
                            this.formAnswers[q.key] = value;
                        }
                    }
                });
            });

            // Diğer girdisi için olay dinleyici
            if (q.type === 'radio-other') {
                const otherInput = document.getElementById(`wizard-other-${q.key}`);
                if (otherInput) {
                    otherInput.addEventListener('input', (e) => {
                        this.formAnswers[q.key] = e.target.value.trim();
                    });
                }
            }
        } else if (q.type === 'checkbox') {
            const labels = container.querySelectorAll('.wizard-option-label');
            labels.forEach(label => {
                const cb = label.querySelector('input[type="checkbox"]');
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        label.classList.add('selected');
                    } else {
                        label.classList.remove('selected');
                    }

                    // Seçili olanları tara
                    const checked = [];
                    labels.forEach(l => {
                        const c = l.querySelector('input[type="checkbox"]');
                        if (c.checked) {
                            checked.push(c.value);
                        }
                    });

                    // Sınır aşımı kontrolü (Max 2)
                    if (q.maxSelect && checked.length > q.maxSelect) {
                        cb.checked = false;
                        label.classList.remove('selected');
                        
                        // Hata uyarısı göster
                        const errorBanner = document.getElementById('wizard-error-banner');
                        if (errorBanner) {
                            errorBanner.innerText = `Lütfen en fazla ${q.maxSelect} seçenek seçin.`;
                            errorBanner.style.display = 'block';
                        }
                        return;
                    } else {
                        const errorBanner = document.getElementById('wizard-error-banner');
                        if (errorBanner) {
                            errorBanner.style.display = 'none';
                        }
                    }

                    this.formAnswers[q.key] = checked;
                });
            });
        }
    }

    // Sihirbaz Giriş Verilerini Doğrula
    validateFormStep(stepIndex) {
        const q = this.formQuestions[stepIndex];
        const value = this.formAnswers[q.key];

        // Zorunlu alan kontrolü
        if (q.required) {
            if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
                return 'Lütfen bu alanı doldurun.';
            }
            if (q.type === 'radio-other' && value === 'Diğer') {
                return 'Lütfen "Diğer" seçeneği için açıklama girin.';
            }
        }

        // E-posta format doğrulaması
        if (q.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Lütfen geçerli bir e-posta adresi girin.';
            }
        }

        // Checkbox çoklu seçim ve limit kontrolü
        if (q.type === 'checkbox' && Array.isArray(value)) {
            if (q.required && value.length === 0) {
                return 'Lütfen en az bir seçenek seçin.';
            }
            if (q.maxSelect && value.length > q.maxSelect) {
                return `Lütfen en fazla ${q.maxSelect} seçenek seçin.`;
            }
        }

        return null; // Başarılı
    }

    // Sihirbaz İleri / Tamamla Buton Tıklaması
    handleWizardNext() {
        const errorBanner = document.getElementById('wizard-error-banner');
        const error = this.validateFormStep(this.currentFormStep);
        
        if (error) {
            if (errorBanner) {
                errorBanner.innerText = error;
                errorBanner.style.display = 'block';
            }
            this.playEffect('wrong');
            return;
        }

        if (errorBanner) errorBanner.style.display = 'none';

        // Sonraki adıma geç veya formu bitir
        if (this.currentFormStep < this.formQuestions.length - 1) {
            this.currentFormStep++;
            this.renderFormStep(this.currentFormStep);
        } else {
            this.completeEarlyAccessForm();
        }
    }

    // Sihirbaz Geri Buton Tıklaması
    handleWizardPrev() {
        if (this.currentFormStep > 0) {
            this.currentFormStep--;
            this.renderFormStep(this.currentFormStep);
        }
    }

    // Sihirbaz Tamamlama İşlemleri
    completeEarlyAccessForm() {
        localStorage.setItem('mk_early_access_answers', JSON.stringify(this.formAnswers));
        localStorage.setItem('mk_coupon_code', 'KASIF20');
        
        const card = document.getElementById('early-access-wizard-container');
        if (card) {
            card.innerHTML = `
                <div class="wizard-success-screen">
                    <span class="wizard-success-icon">🎉</span>
                    <h3>Teşekkür Ederiz! 🌟</h3>
                    <p>Görüşlerinizi bizimle paylaştığınız için çok teşekkür ederiz. Vermiş olduğunuz yanıtlar, Mini Kâşif'in geliştirilmesinde ebeveynlerin ve çocukların sesini duymamız için bize ışık tutacak.</p>
                    <div class="wizard-coupon-box">
                        <span class="wizard-coupon-code">KASIF20</span>
                    </div>
                    <p>Erken Erişim indirim kuponunuz yukarıdadır. Ayrıca bu kupona Ebeveyn Paneli'nden her zaman ulaşabilirsiniz.</p>
                    <button class="btn btn-primary btn-block" id="btn-wizard-go-portal" style="margin-top: 15px;">Ebeveyn Paneline Git 📊</button>
                </div>
            `;
            
            const goPortalBtn = document.getElementById('btn-wizard-go-portal');
            if (goPortalBtn) {
                goPortalBtn.addEventListener('click', () => {
                    this.openParentGate('dashboard');
                });
            }
        }
        
        this.playEffect('victory');
        this.triggerConfetti();
        
        // Ebeveyn Paneli görünümünü de hemen güncelle
        this.renderEarlyAccessPortalView();
    }

    // Ebeveyn Paneli Sekmesinde Erken Erişim Bilgilerini Render Et
    renderEarlyAccessPortalView() {
        const viewContainer = document.getElementById('early-access-portal-view');
        if (!viewContainer) return;

        const savedAnswersStr = localStorage.getItem('mk_early_access_answers');
        if (!savedAnswersStr) {
            // Başvuru henüz yoksa uyarı metni ve form yönlendirme butonu
            viewContainer.innerHTML = `
                <div class="early-access-not-completed">
                    <p>Henüz Erken Erişim Başvuru Formu'nu doldurmadınız. Hemen formu doldurarak lansmana özel indirim kuponunuzu alabilirsiniz!</p>
                    <button class="btn btn-primary" id="btn-go-to-early-access-form">Formu Doldur ve İndirim Kazan 🚀</button>
                </div>
            `;
            
            const btnGo = document.getElementById('btn-go-to-early-access-form');
            if (btnGo) {
                btnGo.addEventListener('click', () => {
                    history.pushState(null, '', '/');
                    this.handleRouting();
                    setTimeout(() => {
                        const element = document.getElementById('early-access-wizard-container');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 300);
                });
            }
            return;
        }

        const answers = JSON.parse(savedAnswersStr);
        const coupon = localStorage.getItem('mk_coupon_code') || 'KASIF20';
        
        // Çoklu seçim (Checkbox) endişe listesini birleştir
        const concernText = Array.isArray(answers.biggestConcern) 
            ? answers.biggestConcern.join(', ') 
            : (answers.biggestConcern || '-');

        viewContainer.innerHTML = `
            <div class="early-access-coupon-portal">
                <div class="early-access-coupon-portal-text">
                    <h4>Erken Erişim Kuponunuz Aktif! 🎉</h4>
                    <p>Lansmanda bu kupon ile %20 indirim kazanacaksınız.</p>
                </div>
                <div class="wizard-coupon-box" style="margin: 0;">
                    <span class="wizard-coupon-code">${coupon}</span>
                </div>
            </div>
            
            <div class="early-access-data-card">
                <h3>Başvuru Detaylarınız</h3>
                <div class="early-access-data-grid">
                    <div class="early-access-data-item">
                        <label>Ebeveyn Adı Soyadı</label>
                        <p>${answers.parentName || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>E-posta Adresi</label>
                        <p>${answers.email || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>Çocuk Yaşı</label>
                        <p>${answers.childAge || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>Günlük Ortalama Ekran Süresi</label>
                        <p>${answers.screenTime || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>En Çok Kullanılan Cihaz</label>
                        <p>${answers.primaryDevice || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>En Çok Kullanılan Platform/Uygulama</label>
                        <p>${answers.primaryPlatform || '-'}</p>
                    </div>
                    <div class="early-access-data-item" style="grid-column: span 2;">
                        <label>Ekran Süresiyle İlgili En Büyük Endişeler</label>
                        <p>${concernText}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>Platformu Kullanma İsteği</label>
                        <p>${answers.willUse || '-'}</p>
                    </div>
                    <div class="early-access-data-item">
                        <label>Makul Aylık Ücret Aralığı</label>
                        <p>${answers.priceRange || '-'}</p>
                    </div>
                    <div class="early-access-data-item" style="grid-column: span 2;">
                        <label>Bildirim ve Erken Erişim Tercihi</label>
                        <p>${answers.earlyAccessInterest || '-'}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Uygulamayı Başlat
const app = new MiniKasifApp();
window.onload = () => {
    app.init();
};
window.app = app;
