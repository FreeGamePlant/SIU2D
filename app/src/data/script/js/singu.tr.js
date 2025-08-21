function displayMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    let className = sender === 'bot' ? 'bot-message' : 'user-message';
    const msgElem = createMessage(text, className);
    chatBox.appendChild(msgElem);
    chatBox.scrollTop = chatBox.scrollHeight;
}
const responseHistory = new Map();
const MAX_HISTORY_PER_TERM = 100;
const STAR_EMOJI = 'T Singularity ';

const responseDatabase = {
    "kuyruklu yıldız": [
        "☄️ Kuyruklu yıldızlar, yıldızlara yaklaştıklarında kuyruk geliştiren buzlu cisimlerdir! SIU 2D'de bunları 'Gök Cisimleri Oluştur' menüsünden oluşturabilirsiniz",
        "💫 Tipik kuyruklu yıldız kütlesi 0.1-10 birim arasındadır. 300 kütlenin üzerinde otomatik olarak buzlu gezegenimsilere dönüşürler",
        "🌠 Kuyruk her zaman hareketin ters yönünü gösterir - bu oyunun yıldız rüzgarını fiziksel hassasiyetle simgeler",
        "🚀 İpucu: Bir kuyruklu yıldız oluştururken, başlangıç hızını ayarlamak için fareyi sürükleyin ve tahmini yörüngeyi görün",
        "❄️ Kuyruklu yıldızlar çok sıcak yıldızlara çok yaklaştıklarında erirler - oyunda bu, 50 geçiş sonrasında onları asteroide dönüştürür",
        "⏱️ Hızlı zaman modunda (100000x), bir kuyruklu yıldızın yörüngesini gerçek saniyeler içinde tamamladığını gözlemleyebilirsiniz",
        "🎯 Birden fazla kuyruklu yıldızın bir yıldızın yörüngesinde döndüğü bir sistem oluşturmayı deneyin - oluşturma menüsüne erişmek için 'C' tuşuna basın",
        "📏 Çekirdek yarıçapı R = 0.1 * ∛(kütle) ile hesaplanır. Örn: kütle 8 = yarıçap ~0.2 birim (düzenleme panelinde görülebilir)",
        "🔥 5 birim/s'den yüksek hıza sahip kuyruklu yıldızlar daha uzun kuyruklar geliştirir - dramatik görsel efektler için mükemmel",
        "🌌 Yüksek kalite modunda (Seçenekler > Grafikler), kuyruklar üç katman gösterir: toz (sarı), iyonize gaz (mavi) ve sodyum (turuncu)",
        "🔄 Gezegenleri 'yerçekimi sapanı' olarak kullanın - bir kuyruklu yıldızı yakın yörüngeye yerleştirerek yönünü değiştirin",
        "⛰️ Aşınmış kuyruklu yıldızlar sınıf 2 asteroitlere (buzlu) dönüşür - bu geçişi gök cismi geçmişinde görebilirsiniz",
        "💧 Kuyruğun oluşmaya başladığı noktayı, düzenleme panelindeki temel sıcaklığı ayarlayarak kontrol edin (-50°C üzeri)",
        "📊 Oyundaki fiziksel veriler: Yoğunluk = 0.5 g/cm³, Albedo = 0.04 - gelişmiş istatistikler modunda görünür (Shift+E)",
        "✨ Yeni oluşturulan kuyruklu yıldızlar oyun zamanında ~1 milyon yıl boyunca aktiftir - evrensel zaman çizelgesinde gözlemleyin",
        "🎯 Mükemmel bir yörünge için başlangıç hızı yerçekimi çizgisine dik olmalıdır - oklar size rehberlik eder",
        "🌡️ Kuyruk sıcaklığı değişir: çekirdeğe yakın (1500°C), orta (500°C), uç (100°C) - aktif termal bölgelerle görünür",
        "🔄 Kuyruklu yıldızlar gezegenler tarafından yakalanabilir - kuyruklu yıldız uyduları görmek için sanal bir Jüpiter sistemi oluşturmayı deneyin",
        "⏳ Gök cismi zaman panelinde (düzenleme açıkken T), etkisiz hale gelmeden önce kaç yıldız geçişi kaldığını görün",
        "📈 İleri ipucu: Yüksek dışmerkezlik (>0.9) olan kuyruklu yıldızlar daha ilginç yörüngelere sahiptir - hız vektöründe ayarlayın",
        "🌠 İlginç bilgi: Oyun kodu süblimasyonla kütle kaybını simgeler - yıldız geçişi başına yaklaşık %0.01",
        "🔭 İkili sistemlerde kuyruklu yıldızlar kaotik yörüngelere sahip olabilir - yakın iki yıldıza sahip ve çevresinde kuyruklu yıldızlar dönen bir sistem oluşturmayı deneyin",
        "⚠️ Dikkat: Gezegenlerle çarpışma rotasındaki kuyruklu yıldızlar çoğu durumda çarpışmadan önce buharlaşır",
        "💧 Kuyruklu yıldızların suyu, buharlaştıklarında gezegen kaynak sistemi sayılır - gezegen panelinde görün",
        "🌟 En iyi sonuçlar için kuyruklu yıldızları 'Küçük Cisimler' menüsünden -100°C ile -50°C arasında başlangıç sıcaklığıyla oluşturun"
    ],
    
    "kara delik": [
        "🕳️ Kara deliklerin minimum kütlesi 1 trilyon (1e12) birimdir - 'Egzotik Cisimler' menüsünden oluşturun",
        "🌀 Oyundaki yarıçap R = ∛(kütle)/1000 olarak hesaplanır - bu gameplay için Schwarzschild yarıçapını basitleştirir",
        "💥 Kara delikleri maddeyle besleyerek büyümelerini izleyin - yakındaki bulutsuları veya yıldızları deneyin",
        "⏳ Hawking radyasyonuyla kütle kaybederler - 10^67 yılda buharlaşırlar (oyunda hızlandırılmış şekilde simgelenir)",
        "📡 Birikim diski yoğun ısı yayar - 5000°C+ görmek için 'Termal Bölgeler' düğmesini (T) kullanın",
        "⚡ Yakındaki gelgit kuvveti F = (G * M * m) / r³ * Δr - yakın nesneler gerilir (Yüksek Kalite'de görülebilir)",
        "🌌 500 sekstilyonun üzerindeki kara delikler kuasar olur - enerji jetleri görmek için bu işarete ulaşın",
        "🔭 Güvenli mesafeyi yarıçapın 10 katı olarak koruyun - bunun içindeki nesneler anında yutulur",
        "🔄 'Yerçekimi sapanları' olarak kullanın - ekonomik şekilde yüksek enerjili yörüngelere nesneler fırlatın",
        "💫 İkili sistemlerde yerçekimi dalgaları üretirler - Seçenekler > Fizik > Göreli Etkiler'de etkinleştirin",
        "⏱️ Ufukta 1 saniye ≈100 dış yıla eşittir - hızlandırılmış zaman kontrolüyle gözlemleyin",
        "📈 Buharlaşma süresi gök cismi zaman panelinde gösterilir (düzenleme sırasında T ile erişin)",
        "🌠 Kara delikleri birleştirmek için: İki yakın tane oluşturun ve zamanı hızlandırın - çarpışma yoğun bir flaş yayar",
        "⚠️ Yarıçapın 5x içindeki nesneler spagettileşmeye uğrar - Seçenekler > Grafikler > Yüksek Kalite'de etkin",
        "🔢 1 milyon güneş kütlesi için yarıçap hesaplayın: R ≈ 2.95 * (M/1e6) km - oyun basitleştirilmiş birimler kullanır",
        "💥 1e60 kütleye ulaştığında beyaz deliğe dönüşürler - geçişi görmek için beslemeye devam edin",
        "🌡️ Birikim diski sıcaklığı düzenleme panelinde kontrol edilebilir - varsayılan 1.000.000°C",
        "🌀 Dönüş, gelişmiş panelde ('Göreli Özellikler') ayarlanabilir - birikim diskini etkiler",
        "📏 Hassas ölçüm için: Olay ufkunun çapı oyunda gösterilen yarıçapın her zaman 2 katıdır",
        "⚠️ Dikkat: Yoğun sistemlerdeki kara delikler yıldızları hızla yutabilir - zaman çizelgesiyle izleyin",
        "🔭 Gözlem modunu (O) kullanarak arkalarındaki yıldızların ışığını büken yerçekimi merceklerini görün",
        "💫 Kuasarlar (evrim aşaması) enerji jetleri yayar - yönünü düzenleme panelinde kontrol edin",
        "⏳ Süper kütleli kara deliklerde buharlaşma süresi oyun evreninin mevcut yaşını aşar",
        "🌌 İpucu: Madde transferini gerçek zamanlı görmek için kara delik ve yıldızdan oluşan ikili sistem oluşturun",
        "✨ Tam deneyim için Seçenekler > Ses'te 'Tekillik' ortam müziğini etkinleştirin"
    ],
    
    "yerçekimi": [
        "⚖️ Genel ayar: Menü > Fizik > Yerçekimi Sabiti'nde %0 ila %500",
        "📏 Standart G sabiti: 6.67430e-11 N·m²/kg² - alternatif evrenleri simüle etmek için değiştirilebilir",
        "🌀 Kara deliklerde göreli etkiler için sabit 1000x yerçekimi çarpanı vardır",
        "🪐 Gelgit kuvveti Δg = (2GM/R³) * Δr olarak hesaplanır - yakın uydularda deformasyonlara neden olur (Yüksek Kalite'de görünür)",
        "📈 Yerçekiminde her %100 fazlalık sistemleri ~%15 hızlandırır - hızlı simülasyonlar için kullanışlı",
        "🌌 Yerçekimi dalgaları: Seçenekler > Fizik > Gelişmiş Etkiler'de etkinleştirin - dalgalanma olarak görünür",
        "🔄 Optimum yörünge hızı: v = √(GM/r) - oluşturma sırasında kılavuz oklarla gösterilir",
        "⚙️ Bulutsuları simüle etmek için %10-50'ye düşürün, yoğun yıldız sistemleri için %200-500'e artırın",
        "🔭 Kara delikler yakınında yerçekimi mercek etkisi görünür - Grafikler > Özel Efektler'de etkinleştirin",
        "📊 Maksimum stabilite: 0.5 * √N cisim (örn: 100 gök cismi → ~7 stabil) - aşmak kaotik davranışlara yol açar",
        "⏳ Yüksek yerçekimi yıldız evrimini hızlandırır - güçlü yerçekimi alanlarında yıldızlar daha kısa yaşar",
        "🌠 Çarpışmalarda füzyon eşiği: Ec < |Ep| - kinetik enerji yerçekimi potansiyelinden küçük olduğunda",
        "🧮 Uygulanan formül: F = G * m1 * m2 / r² - 'Kuvvetleri Göster' moduyla test edilebilir (F3)",
        "🔢 Yerçekimi kuvvetini ikiye katlamak için: G'yi %100 artırın veya kütleleri %100 artırın",
        "⚠️ >%300 değerleri 50'den fazla cisimli sistemlerde dengesizliğe neden olabilir - dikkatli kullanın",
        "🌍 Yüzey yerçekimi: g = GM/R² - kayalık cisimler için gezegen panelinde görünür",
        "💫 Sistem yörünge hesapları için Verlet entegrasyonu kullanır - Fizik'te 'Tam Hassasiyet' etkinleştirin",
        "📈 Büyük kütleli cisimlerde yerçekimi dönüşü etkiler - yıldıza çok yakın gezegenler gelgit kilidine girer",
        "🌀 Güçlü yerçekimi alanları zamanı genişletir - farklı yüksekliklerdeki saatleri karşılaştırarak gözlemlenebilir",
        "⚡ Karanlık maddeyi simüle etmek için: Görünür kütle eklemeden yerçekimini %30-50 artırın",
        "🔭 Sayısal hassasiyet büyük kütleler yakınında daha yüksektir - oyun uyarlanabilir koordinat sistemi kullanır",
        "🌌 Uzay-zaman eğriliği kompakt nesneler yakınında görsel olarak simüle edilir - Seçenekler > Grafikler'de etkinleştirin",
        "📏 Roche mesafeleri otomatik hesaplanır - bu sınır içindeki uydular parçalanır ('Kritik Bölgeleri Göster' ile görünür)",
        "💥 Çarpışmalarda yerçekimi açığa çıkan enerjiyi belirler - doğrudan çarpmalar için E ∝ M²/R",
        "✨ İpucu: Kararlı yörüngeler için başlangıç hızı ≈ yerel kaçış hızının %80'i olmalıdır"
    ],
    
    "yıldız": [
        "⭐ Minimum kütle: 15 milyon birim - 'Yıldızsal Cisimler' menüsünden oluşturun",
        "🌞 Güneş gibi bir yıldız için: kütle ~1.989e30 kg (oyunda 1 güneş birimi)",
        "🌈 Sıcaklığa göre renkler: Mavi (>30,000K), Beyaz (10,000K), Sarı (6,000K), Kırmızı (<3,500K) - panelde ayarlayın",
        "💥 20 güneş kütlesinin üzerindeki yıldızlar süpernova olarak patlar - Seçenekler'de 'Yıldız Evrimi'ni etkinleştirin",
        "⏳ Ömür: t ≈ 10^10 * (M/M☉)^-2.5 yıl - gök cismi zaman panelinde görünür (düzenleme sırasında T)",
        "🔄 İki yakın yıldızla ikili sistemler oluşturun ve büyüleyici yörüngeler görün",
        "🔭 Değişken yıldızlar parlaklık değiştirir - genliği 'Yıldız Özellikleri'nde kontrol edin",
        "🌡️ Yaşanabilir bölge: d = √(L/L☉) AU - seçildiğinde yeşil halka olarak gösterilir",
        "💫 Nükleer füzyon simülasyonu: H → He %0.7 verimlilikle (E=mc²) - parlaklık ve ömrü etkiler",
        "📊 Evrim: Kırmızı cüce → Beyaz cüce | Orta yıldız → Kırmızı dev | Büyük kütleli → Süpernova → Kara delik",
        "⚙️ Ayarlanabilir: Kütle, sıcaklık, dönüş, metaliklik ve manyetik aktivite",
        "✨ Nötron yıldızları >1.4 güneş kütlesi ve çöküş gerektirir - süpernova yoluyla oluşturun",
        "🌌 Yıldız kümeleri: Küçük bir bölgede çoklu yıldız oluşturun ('Karmaşık Sistemler' menüsü)",
        "🧪 Yerçekimi sabitini değiştirerek evrim üzerindeki etkileri görün (Menü > Fizik > Sabitler)",
        "🔢 Parlaklık: L ∝ M^3.5 - kütlesi 2x olan yıldız ~11x daha parlaktır",
        "⚠️ Çok büyük kütleli yıldızlar (>100 güneş kütlesi) dengesiz olabilir - erken bölünür veya patlar",
        "🌠 T Tauri yıldızları (genç) kütle atımları gösterir - Yüksek Kalite modunda iplikçikler olarak görünür",
        "💥 Süpernovalarda kütlenin %90'ı bulutsu olarak atılır - geri kalanı nötron yıldızı veya kara delik oluşturur",
        "📈 Yıldız yarıçapı: Ana kol yıldızları için R ∝ M^0.8 - otomatik hesaplanır",
        "🌍 Yaşanabilir bölgedeki gezegenler yaşam geliştirebilir - gezegen panelinde yeşil simgeyle gösterilir",
        "🔥 Yıldız çekirdeği füzyon için 15 milyon °C'ye ulaşır - ayarlanabilir sıcaklık evrim oranını etkiler",
        "🌀 Güçlü manyetik alanlar yıldız lekeleri oluşturur - yoğunluğu gelişmiş panelde kontrol edin",
        "🔭 Detayları gözlemlemek için yakınlaştırın (fare tekerleği) ve zaman hızını düşürün",
        "✨ İpucu: İkili yıldızlar P-tipi (çift etrafında) veya S-tipi (birinin etrafında) yörüngede gezegenlere sahip olabilir"
    ],
    
    "gezegen": [
        "🪐 Kütle: 5K-30.5K (kayalık), 105K-2.5M (gazlı) - 'Gezegensel Cisimler' menüsünden oluşturun",
        "🌍 Sınıflar: Kayalık (1-11), Gazlı (1-6), Cüceler - kütle/sıcaklığa göre otomatik atanır",
        "🌡️ Yaşanabilir bölge d = √(L_yıldız / L☉) AU olarak hesaplanır - yıldızlar etrafında yeşil halka olarak gösterilir",
        "🔄 Optimum yörünge hızı: v = √(GM/r) - hız vektörüyle oluşturma sırasında ayarlayın",
        "🌋 Volkanik gezegenler: sıcaklık >1000°C + düşük su/atmosfer - otomatik sınıf 7",
        "❄️ Buz dünyaları: sıcaklık < -100°C + yüksek su - otomatik sınıf 9 olurlar",
        "🌫️ Atmosfer kalınlığı: gaz kaydırıcısıyla kontrol edin (%0-100) - sıcaklık ve yüzey basıncını etkiler",
        "💧 Yüzey suyu: su kaydırıcısıyla ayarlayın - yaşanabilir dünyalar için ideal: %30-70",
        "🔭 Uydular librasyon gösterir - Yüksek Kalite'de etkin ince efekt",
        "🛰️ Gezegen başına maksimum 20 uydu - gezegen kütlesinin %10'una kadar stabil",
        "⏱️ Gezegen göçü genç sistemlerde gerçekleşir - Fizik > Gelişmiş Etkiler'de etkinleştirin",
        "📏 Yarıçap: kayalıklar için ∛(kütle), gazlılar için ∛(kütle/2) - otomatik hesaplanır",
        "🌌 Özel tipler: Karbon (yüksek C/O oranı), Demir (açıkta çekirdek) - aşırı bileşimlerle oluşturun",
        "🧪 Gezegen çarpışmaları yeni dünyalar + asteroit kuşakları oluşturur - hassasiyetle simgelenir",
        "🔢 Yüzey yerçekimi: g = GM/R² - gezegen panelinde gösterilir",
        "💫 Gezegen halkaları: 'Özellikler' > Halkalar'da etkinleştirin - kalınlık, renk ve yoğunluğu ayarlayın",
        "🌍 Okyanus gezegenleri (sınıf 2) su >%90'dır - otomatik nemli atmosfer oluşturur",
        "🏜️ Çöl gezegenleri (sınıf 3) suyun %80-90'ını kaybeder - kumlu doku gösterir",
        "🌱 Yaşanabilir dünyalar (sınıf 6) bitki örtüsü gösterir - Grafikler > Yüzey Detayları'nda etkinleştirin",
        "🌋 Jeolojik aktivite: 'Tektonik' kaydırıcısıyla kontrol edin - volkanizma ve dağ oluşumunu etkiler",
        "🌀 Dönüş: Dönme periyodunu ayarlayın - gazlılarda basıklık ve iklim desenlerini etkiler",
        "🌌 Ekstrem ötegezegenler: Sıradışı parametrelerle 'Gelişmiş Özelleştirme' modunu kullanın",
        "📊 Detaylı veriler için: gezegeni seçin ve E'ye basın - panel tüm istatistikleri gösterir",
        "✨ İpucu: Rezonans yörüngelerindeki gezegenler (örn: 2:3) uzun vadeli stabilite sağlar",
        "🔭 Seçili gezegenlerde yüzey detaylarını görmek için 'Gözlemevi' modunu (O) kullanın"
    ],
    "meteoroid": [
        "🌠 Meteoroidler asteroitlerden küçük kaya parçalarıdır (1mm-1m) - çarpışmalarda otomatik oluşur",
        "💫 Ortalama hız: 20-70 km/s - gerçek zaman modunda hızlı çizgiler olarak görünür",
        "🪨 Bileşim: %90 kaya, %6 demir, %4 nikel - parça oluşturma panelinde tanımlanır",
        "🌌 SIU 2D'de çarpışmalarla veya 'Küçük Cisimler' > 'Parça Oluştur' menüsünden oluşturun",
        "🔥 Atmosfere girdiklerinde meteor olurlar - Seçenekler > Fizik'te 'Atmosferler'i etkinleştirin",
        "📏 Tipik kütle: 0.1g-100kg - daha büyük nesneler asteroit olarak sınıflandırılır",
        "💥 Atmosferik giriş efekti: Grafikler > Özel Efektler > Kayan Yıldızlar'da etkinleştirin",
        "🌍 Dünya için: günde ~100 ton meteoroid girer - orantılı simüle edilir",
        "📊 Veriler: Yoğunluk 3-4 g/cm³, Albedo 0.05-0.25 - özellikler panelinde ayarlanabilir",
        "✨ İpucu: Doğal meteoroidler için asteroit kuşakları oluşturun",
        "⏱️ Hızlandırılmış modda (10000x) sürekli meteor yağmurları görün",
        "🔭 Gözlem: Meteoroidler meteor olana kadar görünmez",
        "🌠 Meteor yağmuru: Gezegenler kuyruklu yıldız izlerini geçtiğinde olur - 'Olaylar' ile simüle edin",
        "💫 Uzay gemileriyle çarpışmalar: 10kg başına kalkanı %1 azaltır - Fizik > Hasar'da etkinleştirin",
        "⚠️ Tehlike: >1kg meteoroidler uydulara zarar verebilir - sarı uyarıyla gösterilir",
        "🌌 Manuel oluşturmak için: 'Parçalar' menüsü > Küçük boyut (S)",
        "📈 İstatistikler: Menü > Ortam > Parça Yoğunluğu'nda sıklık ayarlanabilir",
        "🛰️ Bağıl hız çarpma enerjisini belirler: E = 0.5 * m * v²",
        "🌠 İlginç bilgi: Barringer Krateri'ni oluşturan meteoroid sadece 50m çapındaydı",
        "🌟 Görsel efekt: Yüksek hızdaki yörüngeleri görmek için 'Işıklı İzler'i etkinleştirin"
    ],
    "meteor": [
        "☄️ Meteorlar atmosferde yanan meteoroidlerdir - oyunda 'kayan yıldızlar'",
        "🔥 Plazma sıcaklığı: 1,500-3,000°C - renkli kıvılcımlar olarak görünür",
        "🌈 Renkler: Yeşil (magnezyum), Sarı (sodyum), Kırmızı (azot) - bileşime göre tanımlanır",
        "🌍 Görmek için: Atmosfer yoğunluğunu > 0.1kg/m³ artırın ve meteoroid ekleyin",
        "💫 Minimum ateşleme hızı: 11km/s - atmosferik ateşleme eşiğinde ayarlayın",
        "📏 Görünür büyüklük: -4 ila +5 - meteoroid boyutu ve hızıyla kontrol edilir",
        "🌠 Meteor yağmurları: Radyant tanımlanmış 'Olaylar > Meteor Yağmurları'nda yapılandırın",
        "⏱️ Süre: gerçek zamanda 0.1-10 saniye - kütleyle orantılı",
        "✨ İpucu: Periyodik meteor yağmurları için kaynak olarak kuyruklu yıldız kullanın",
        "💥 Bolide: > -4 büyüklükteki meteorlar - patlama sesi ve flaş tetikler",
        "🌌 Manuel oluşturmak için: 'Olaylar' > 'Meteor' yükseklik 80-120km ile",
        "📊 Sıklık: Seçenekler > Ortam'da 0-100 olay/saat ayarlanabilir",
        "🔭 En iyi görüntüleme: Açık gökyüzünde gece - menüde ışık kirliliğini azaltın",
        "⚠️ Dikkat: Meteorlar hayatta kalıp göktaşı olabilir",
        "🌠 İlginç bilgi: Perseid yağmuru zirvede saatte 100 meteora ulaşır",
        "🌟 Ses efekti: Ses > Olaylar > Kayan Yıldızlar'da etkinleştirin",
        "🛸 Karasal meteorlar: 80km üzerinde oluşur - yükseklik ayarlanabilir",
        "📉 Kütle kaybı: Atmosferik geçiş sırasında %90-99",
        "💧 Su meteorları: Okyanus modunda görülebilen su altı kraterleri oluşturur",
        "🌌 Ekran görüntüsü için: Tam anında P ile duraklatın ve F12 kullanın"
    ],
    "asteroit": [
        "🪨 Asteroitler: 1m-1000km kaya cisimler - 'Küçük Cisimler' menüsünden oluşturun",
        "🌌 Sınıflar: C (karbonlu), S (silikat), M (metalik) - panelde seçin",
        "💫 Tipik kütle: 1e10-1e20 kg - üzeri gezegensi olur",
        "📏 Düzensiz şekil: Gerçekçilik için Özellikler > Şekil > Düzensiz'i etkinleştirin",
        "🔄 Yörünge: Genellikle Mars ve Jüpiter arasında - 'Sistem Oluştur' ile kuşaklar oluşturun",
        "⚠️ Çarpma tehlikesi: Yörünge gezegenle kesişirse kırmızı işaretçi gösterilir",
        "🌠 Dünya'ya yakın asteroitler: 'Olaylar' > 'NEA Asteroitleri'nde yapılandırın",
        "💥 Gezegenle çarpışma: E = 0.5 * m * v² enerjisi açığa çıkar - patlama olarak görünür",
        "⛰️ Yüzey: Kraterli doku Grafikler > Yüzey Detayları'nda etkinleştirilir",
        "🌌 Asteroit aileleri: Aynı kökene sahip kümeler - 'Çarpışma Aileleri' ile oluşturun",
        "📊 Veriler: Yoğunluk 1-5 g/cm³, Albedo 0.02-0.7 - ayarlanabilir",
        "✨ İpucu: Sanal madencilik için kullanın - kaynaklar Panel > Kaynaklar'da hesaplanır",
        "🔭 Gözlem: <100m asteroitler sadece yakınken görünür",
        "🚀 Görevler: Asteroide tıklayın > 'Sonda Gönder'",
        "🌍 K-T etkisi: Kitlesel yok oluş için 10km asteroit simüle edin",
        "💫 Kaotik dönüş: Küçük asteroitlerde yaygın - Özellikler > Dönüş'te etkinleştirin",
        "🛰️ Asteroit uyduları: Nadir ama mümkün - 'Uydu Ekle' ile ekleyin",
        "📈 Kaynak pazarı: Demir, nikel ve platin ekonomi modunda kredi değerinde",
        "🌠 İlginç bilgi: Asteroit Ceres cüce gezegen olarak sınıflandırılır",
        "🌟 Gezegen savunması: 'Çarpışma Modu' ile savunma sistemlerini test edin"
    ],
    "plütonid": [
        "🌑 Plütonidler: 100-500km arası cisimler - asteroitler ve gezegenler arası ara aşama",
        "🌌 Kütle 1e18-1e20 kg ile 'Küçük Cisimler' > 'Plütonidler' menüsünden oluşturun",
        "💫 Küresel şekil için yeterli yerçekimi: özelliklerde 'Küresel Şekil' etkinleştirin",
        "🪨 Bileşim: Buzlu (Kuiper) veya Kayalık (Kuşak) - panelde seçin",
        "🌠 Örnekler: Orcus, Quaoar, Sedna - 'Kütüphane'de önceden tanımlanmış modeller",
        "❄️ Buzlu plütonidler: Yıldızlardan 5AU uzakta kuyruklu yıldız aktivitesi başlar",
        "📏 Cüce gezegenlerden farkı: Yörüngesini temizlememiş - oyunda otomatik tanım",
        "🔄 Göç: Dengesiz sistemlerde Oort bulutuna fırlatılabilirler",
        "💥 Çarpışmalar: Benzer bileşime sahip asteroit aileleri oluşturur",
        "🌌 Bölge: Kuiper kuşağı (30-50UA) veya Dağınık disk (1000UA'ya kadar)",
        "📊 Fiziksel veriler: Yoğunluk 1-2 g/cm³ (buzlu), 2-4 g/cm³ (kayalık)",
        "✨ İpucu: İkili plütonid sistemleri oluşturun",
        "🔭 Gözlem: Tespit için sanal teleskop (gözlemevi modu) gerektirir",
        "🚀 Yakalama: Plütonidler dev gezegenler tarafından uydu olarak yakalanabilir",
        "🌍 Yaşanabilirlik: Doğal olarak asla, ancak gelişmiş terraformasyonla mümkün",
        "💫 İlginç bilgi: Haumea hızlı dönüşten dolayı oval şekle sahiptir",
        "⏱️ Evrimsel zaman: Soğuk yörüngelerde milyarlarca yıl stabil kalırlar",
        "📈 Otomatik sınıflandırma: Cisim 450km çapa ulaştığında",
        "🌠 Halkalar: Bazı plütonidler soluk halkalara sahip olabilir - 'Özellikler'de etkinleştirin",
        "🌟 Keşif modu: Yüzeyi haritalamak için sondalar gönderin"
    ],
    "gaz devi": [
        "🪐 Gaz devleri: Katı yüzeyi olmayan devasa gezegenler - kütle > 100K birim",
        "🌪️ Minimum kütle 105K ile 'Gezegensel Cisimler' > 'Gazlılar' menüsünden oluşturun",
        "💫 Sınıflar: Sıcak Jüpiterler (yıldıza yakın) veya Soğuk Jüpiterler (uzak)",
        "🌈 Renkler: Sarı (H2), Kırmızı (NH3), Mavi (CH4) - sıcaklığa bağlı",
        "🌌 Yapı: Kayalık çekirdek + metalik manto + kalın atmosfer - kesitte görünür",
        "🌀 Atmosferik desenler: Bantlar, lekeler, girdaplar - yoğunluk dönüşle kontrol edilir",
        "💥 Kütle sınırı: Döteryum füzyonu için 13 MJup (kahverengi cüceler), yıldızlar için 80 MJup",
        "📏 Düşük yoğunluk: 0.5-2 g/cm³ - Satürn suda yüzer!",
        "🌠 Halkalar: 'Özellikler' > Halkalar'da etkinleştirin - kalınlık ve yoğunluk ayarlanabilir",
        "🌍 Uydular: 20'ye kadar stabil uydu - karmaşık ay sistemleri oluşturun",
        "⚠️ Gezegen göçü: Genç gaz devlerinde yaygın - Gelişmiş Fizik'te etkinleştirin",
        "✨ İpucu: Büyük Kırmızı Leke gibi lekeler için dönüş hızını artırın",
        "🔭 Gözlem: Bulut desenleri gerçek zamanlı değişir - evrimi görmek için hızlandırın",
        "📊 Veriler: Çekirdek sıcaklığı 20,000°C, basınç 40 Mbar - panelde görünür",
        "💫 Manyetik alan: Dünya'nın 10-20x daha güçlü - Grafikler'de auroraları etkinleştirin",
        "🌌 Örnekler: Jüpiter, Satürn, Uranüs, Neptün - 'Gezegen Kütüphanesi'nde modeller",
        "🚀 Keşif: Belirli basınç sınırına kadar hayatta kalan atmosfer sondaları gönderin",
        "🌠 İlginç bilgi: Jüpiter iç gezegenleri koruyarak 'kozmik süpürge' gibi davranır",
        "🌟 Mini-Neptünler için: kütleyi 10-20 dünya kütlesine düşürün",
        "💥 Çarpışma: Çarpışan gaz devleri geçici hidrojen yıldızları oluşturur"
    ],
    "kahverengi cüce": [
        "🟤 Kahverengi cüceler: 13-80 Jüpiter kütlesinde 'başarısız yıldızlar'",
        "🌡️ Sıcaklık: 300-3000K - kararlı hidrojen füzyonu için çok soğuk",
        "💫 Kütle 1.3e28-8e28 kg ile 'Yıldızaltı Cisimler' menüsünden oluşturun",
        "🔥 Sınırlı füzyon: Sadece döteryum ve lityum - ömür 1-100 milyar yıl",
        "📈 Tayf sınıfı: M, L, T, Y - panelde sıcaklıkla tanımlanır",
        "🌌 Yayılım: Çoğunlukla kızılötesi - IR filtresiyle görünür (I tuşu)",
        "🪐 Gezegensel diskler ve gezegen sistemleri olabilir - 'Diskler'i etkinleştirin",
        "⚠️ Gezegenlerden farkı: Yıldız oluşumu, gezegensel değil",
        "✨ İpucu: Yakın zamanda yıldız oluşumu bölgelerinde arayın",
        "🔭 Gözlem: Tespiti zor - 'IR Tarama' modunu kullanın",
        "📊 Veriler: Yoğunluk 10-100 g/cm³, yüzey yerçekimi 100-500 m/s²",
        "💥 Parlamalar: Ara sıra manyetik patlamalar - yoğunluk ayarlanabilir",
        "🌠 İlginç bilgi: Bilinen en soğuk kahverengi cüce kahve sıcaklığında!",
        "🚀 Gezegenler: Yakın yörüngelerde karasal gezegenlere sahip olabilir",
        "⏱️ Evrim: Yavaşça soğuyarak kara cüce olurlar",
        "🌟 İkililer: Kahverengi cüce ikili sistemleri yaygındır",
        "🌀 Atmosfer: Toz bulutlu karmaşık hava desenleri",
        "💫 Tespit: Radyo emisyonuyla daha kolay - Seçenekler'de etkinleştirin",
        "🌌 Örnek: WISE 0855 - önceden tanımlanmış model",
        "📉 Alt sınır: 13 MJup altındaki nesneler gezegen olarak sınıflandırılır"
    ],
    "kırmızı cüce": [
        "🔴 Kırmızı cüceler: Küçük, soğuk yıldızlar (M-tipi) - kütle 0.08-0.5 güneş",
        "🌡️ Sıcaklık: 2,400-3,700K - karakteristik kırmızı renk",
        "⏳ Ömür: Trilyonlarca yıl - kozmik ölçekte neredeyse sonsuz",
        "💥 Yıldız parlamaları: Sık ve şiddetli - yakındaki gezegenleri sterilize edebilir",
        "🌡️ Yaşanabilir bölge: Çok yakın (0.1-0.4UA) - gezegenler muhtemelen gelgit kilidinde",
        "🌌 Kütle 15-75 milyon birim ile 'Yıldızsal Cisimler' > 'Kırmızı Cüceler' menüsünden oluşturun",
        "📈 İstatistikler: Samanyolu'ndaki yıldızların %75'i kırmızı cücedir",
        "💫 Gezegenler: Yaygın gezegen sistemleri - Trappist-1 ünlü bir örnek",
        "⚠️ Tehlike: Parlamalardan gelen UV ve X radyasyonu atmosferleri yok edebilir",
        "✨ İpucu: Yaşanabilir gezegenler için güçlü manyetik kalkanlar kullanın",
        "🔭 Gözlem: Çıplak gözle zor görülür - zayıf parlaklık",
        "🌠 Kromosferik aktivite: Yıldız lekeleri yüzeyin %40'ını kaplayabilir",
        "📊 Veriler: Parlaklık 0.0001-0.08 güneş, yarıçap 0.1-0.6 güneş",
        "💥 Füzyon: Yavaş ve kararlı - Güneş benzeri yıldızlardan 10x daha verimli",
        "🌌 Dönüş hızı: Yüksek (günlük periyot) - güçlü manyetik alanlar üretir",
        "🚀 Yıldızlararası seyahat: Bolluk ve uzun ömür nedeniyle birincil hedefler",
        "❄️ Mavi cüceler: Çok aktif kırmızı cüceler parlamalar sırasında mavi ışık yayabilir",
        "🌟 İkililer: Sıklıkla çoklu sistemlerde",
        "💫 İlginç bilgi: Proxima Centauri Güneş'e en yakın yıldızdır",
        "🌡️ Yüzey sıcaklığı: Panelde ayarlanabilir - varsayılan 3300K"
    ],
    "dev yıldız": [
        "🌟 Dev yıldızlar: Orta kütleli yıldızların ana koldan sonraki evrim aşaması",
        "🌡️ Sınıflar: Kırmızı devler (K, M), Mavi devler (B, A) - nadir",
        "📏 Yarıçap: 10-100x güneş - iç gezegenleri yutabilir",
        "💫 Kütle: 0.5-8 güneş - altı beyaz cüce, üstü süpernova olur",
        "🔥 Çekirdek: Füzyon yapan helyum veya karbon/oksijen - sıcaklık >100 milyon K",
        "🌌 Doğrudan oluşturun veya 'Yıldız Evrimi' menüsünde evrimleştirin",
        "⏳ Süre: Kütleye bağlı 1 milyon - 1 milyar yıl",
        "💥 Kütle kaybı: Güçlü yıldız rüzgarları - gezegensel bulutsular oluşturur",
        "📈 Parlaklık: 100-10,000x güneş - tüm sistemleri aydınlatır",
        "⚠️ Gezegenler: Kararsız yörüngeler - gezegenler fırlatılabilir veya yok olabilir",
        "✨ İpucu: Titreşim görmek için panelde dengesizliği ayarlayın",
        "🔭 Değişkenlik: Birçoğu değişkendir (örn: Mira, Sefeidler)",
        "🌠 Nükleosentez: Karbon, nitrojen ve ağır elementler üretir",
        "📊 Veriler: Ortalama yoğunluk çok düşük (10⁻⁵ g/cm³)",
        "💫 Son: Gezegensel bulutsu oluşturarak zarfı atar + çekirdek beyaz cüce olur",
        "🌌 Örnekler: Arcturus, Aldebaran - kütüphanede modeller",
        "🚀 Yaşanabilirlik: Dinamik ve geçici yaşanabilir bölgeler",
        "❄️ Mavi devler: Süpernova öncesi kısa fazdaki büyük kütleli yıldızlar",
        "🌟 İlginç bilgi: Betelgeuse Güneş'in yerinde olsaydı Jüpiter'i yutabilirdi",
        "💥 Simülasyon: Tam evrimi görmek için zamanı hızlandırın"
    ],
    "hiperdev": [
        "💥 Hiperdevler: Bilinen en büyük kütleli ve parlak yıldızlar (>30 güneş)",
        "🌡️ Sıcaklık: 3,500-35,000K - O, B, A, F, K, M sınıfları",
        "💫 Parlaklık: Güneş'in 1 milyon katına kadar - tüm galaksileri aydınlatır",
        "📏 Yarıçap: 100-2,000 güneş - Güneş Sistemi'ne yerleştirilse Jüpiter'i yutardı",
        "⏳ Ömür: Çok kısa (1-10 milyon yıl) - süpernova veya hipernovayla sonlanır",
        "🌌 Kütle >30 güneş ile 'Büyük Kütleli Yıldızlar' menüsünden oluşturun",
        "⚠️ Dengesizlik: Hızla kütle kaybeder - güçlü yıldız rüzgarları",
        "🔥 Füzyon: Çekirdekte demire kadar elementler - ileri nükleosentez aşamaları",
        "💥 Patlamalar: Felaket olaylarında kütle kaybı - 'Atımlar' ile simüle edin",
        "🌠 Örnekler: Eta Carinae, VY Canis Majoris - kütüphanede modeller",
        "📈 Değişkenlik: Düzensiz ve aşırı - parlaklık aylarda %50 değişebilir",
        "✨ İpucu: Eta Carinae gibi patlamalar için dengesizliği >%80'e çıkarın",
        "🔭 Toz: Atımlar karmaşık bulutsular oluşturur - 'Çevre Bulutsuları'nı etkinleştirin",
        "🌌 Ortam: Sadece gaz açısından zengin HII bölgelerinde oluşur - moleküler bulutlarla simüle edin",
        "🚀 Son: Süpernovadan sonra kara delik veya nötron yıldızına çöker",
        "📊 Veriler: Ortalama yoğunluk 10⁻⁶ g/cm³ - laboratuvar vakumundan daha seyrek",
        "💫 İlginç bilgi: Bazı hiperdevlerin periyodik patlamalara neden olan eşleri vardır",
        "🌟 İkililer: Büyük kütleli sistemler birleşerek daha aşırı nesneler oluşturabilir",
        "❄️ Sarı hiperdevler: Mavi süperdev ve kırmızı süperdev arasında nadir ve dengesiz faz",
        "💥 Ölüm simülasyonu: Yakın çöküş uyarıları için 'Yakın Süpernova'yı etkinleştirin"
    ],
    "devasa yıldız": [
        "💫 Devasa yıldızlar: >8 güneş kütlesi - nihai kaderi süpernova",
        "🌡️ Sıcaklık: 10,000-50,000K - O ve B sınıfları",
        "⏳ Ömür: Kısa (1-50 milyon yıl) - yakıtı hızla tüketirler",
        "💥 Yıldız rüzgarları: Güçlü - yılda 10⁻⁶ güneş kütlesi kaybederler",
        "🌌 Kütle >1.6e31 kg ile 'Büyük Kütleli Yıldızlar' menüsünden oluşturun",
        "🔥 Füzyon: H->He->C->Ne->O->Si->Fe hızlı dizisi",
        "📏 Yarıçap: Ana kol sırasında 5-25 güneş",
        "⚠️ Süpernovalar: Kaçınılmaz kader - çöküş için zemin hazırlar",
        "✨ İpucu: Tam evrimi görmek için Seçenekler'de 'Hızlı Evrim'i etkinleştirin",
        "🔭 Gözlem: Evrendeki ağır elementlerin ana kaynağı",
        "🌠 Bulutsular: Yıldızlararası gazda kabarcıklar oluşturur - 'Rüzgar Etkisi'ni etkinleştirin",
        "📊 Veriler: Parlaklık 10,000-1,000,000 güneş, çekirdek yoğunluğu >10⁶ g/cm³",
        "💫 Eşler: Kütle aktarımlı ikili sistemlerde sık",
        "🚀 Pulsarlar: Bazıları süpernovadan sonra pulsar olur - son kaderde seçin",
        "❄️ Mavi süperdevler: >20 güneş kütleli yıldızlar için süpernova öncesi faz",
        "🌟 İlginç bilgi: Wolf-Rayet yıldızları hidrojen kaybetmiş büyük kütleli yıldızlardır",
        "🌌 Oluşum: Yoğun moleküler bulutlar gerektirir - 'Oluşum Bölgeleri' ile simüle edin",
        "💥 Magnetarlar: %10'u magnetar olur - aşırı manyetik alanlı nötron yıldızları",
        "📈 Çift kararsızlığı: >130 güneş için kalıntı olmadan patlayabilirler",
        "⚠️ Uyarı: Yaşanabilir gezegenleri yakınlara yerleştirmeyin - radyasyon öldürücüdür"
    ],
    "beyaz delik": [
        "⚪ Beyaz delikler: Kara deliklerin teorik zıttı - maddeyi dışarı püskürtür",
        "💫 Sadece teorik olarak var - SIU 2D'de spekülatif simülasyon",
        "🌌 Kütle >1e40 kg ile 'Egzotik Cisimler' > 'Beyaz Delikler' menüsünden oluşturun",
        "🔥 Mekanik: Madde olay ufkundan çıkar - erişilemez",
        "📏 Özellikler: Teorik negatif kütle - oyunda 'ters akış' ile pozitif kütle kullanın",
        "⚠️ Stabilite: Simülasyonda geçici nesneler - süre ayarlanabilir",
        "✨ İpucu: 'Einstein-Rosen Köprüsü' ile kara deliklere bağlayın",
        "🔭 Görselleştirme: Parçacık jetleri çıkışı - yoğunluk kontrol edilebilir",
        "🌠 Köken: Buharlaşan kara deliklerin olası nihai sonucu",
        "📊 Parametreler: Jet sıcaklığı 1e10 K, çıkış hızı 0.9c",
        "💥 Etkiler: Yoğun radyasyon - yakın sistemler için tehlikeli",
        "🌌 Görelilikte: Einstein denklemlerinin matematiksel çözümü",
        "🚀 Yıldızlararası seyahat: Teorik olarak portal olabilirler - deneysel işlevsellik",
        "❄️ Kuasarlardan fark: Sürekli çıkış vs ayrık olaylar",
        "🌟 İlginç bilgi: Bazı kozmolojik modeller Büyük Patlama'yı açıklamak için kullanır",
        "💫 Simülasyon: Kararlı solucan delikleri oluşturmak için kara deliklerle birleştirin",
        "⚠️ Sınırlama: Beslenemez - sadece önceden programlanmış madde püskürtür",
        "📈 Evrim: Madde püskürttükçe küçülür - ömür kütleyle orantılı",
        "🌠 Püskürtülen madde: Yapılandırılabilir (hidrojen, plazma, egzotik madde)",
        "💥 Uyarı: Oldukça dengesiz nesne - aniden kaybolabilir"
    ],
    "büyük patlama": [
        "💥 Büyük Patlama: SIU 2D'de evrenin kökeninin simülasyonu",
        "🌌 'Evren' > 'Yeni Evren' > 'Büyük Patlama Modu'nda erişin",
        "💫 Parametreler: Başlangıç yoğunluğu, sıcaklık, kuantum dalgalanmaları",
        "⏳ Başlangıç zamanı: Tekillikten T+10⁻⁴³s sonra - simülasyon T+1s'de başlar",
        "🔥 Başlangıç sıcaklığı: 10³² K - genişledikçe hızla soğur",
        "🌠 İlkel elementler: H, He, Li oluşumu - oranlar ayarlanabilir",
        "📈 Genişleme: Hubble yasası simüle edilir - sabit ayarlanabilir",
        "💥 Nükleosentez: İlk 3 dakikada nükleer füzyon - 'Gelişmiş Fizik'te etkinleştirin",
        "🌌 Kozmik mikrodalga arka planı: T+380,000 yılda oluşur - 'Radyasyon'da etkinleştirin",
        "✨ İpucu: Büyük yapıların oluşumunu görmek için zamanı hızlandırın",
        "🔭 Karanlık madde: Temel bileşen - 'Kozmolojik Parametreler'de % ayarla",
        "📊 Sonuçlar: Galaksiler, kümeler ve süperkümeler oluşumu",
        "⚠️ Sınırlama: Basitleştirilmiş simülasyon - kozmik enflasyonu içermez",
        "🌟 Alternatif evrenler: Farklı fiziksel sabitlerle test edin",
        "💫 İlginç bilgi: Mevcut CMB sıcaklığı 2.7K - dağınık arka plan olarak görünür",
        "🌠 Yıldız oluşumu: İlk yıldızlar 100-500 milyon yıl içinde",
        "🚀 Gözlemci modu: Farklı kozmik çağları görmek için zamanda seyahat edin",
        "❄️ Karanlık çağlar: İlk yıldızdan önceki dönem - siyah arka planla simüle edilir",
        "💥 Yeniden birleşme: Elektronlar ve protonlar nötr atomlar oluşturur - kritik geçiş",
        "📈 Anizotropiler: Galaksi oluşumu için tohumlar - yoğunluk ayarlanabilir"
    ],
    "uzay tozu": [
        "🌌 Uzay tozu: Mikroskobik taneler (0.01-10μm) - yıldız oluşumunun temeli",
        "💫 Bileşim: Silikatlar, karbon, buz - uzay bölgesine göre tanımlanır",
        "🌠 Etkiler: Işığı emer (sönümleme), yansıtır (yansıma bulutsuları)",
        "🌡️ Sıcaklık: Moleküler bulutlarda 10-100K",
        "✨ 'Yıldızlararası Ortam' > 'Toz Ekle' ile oluşturun",
        "📊 Yoğunluk: Yıldızlararası uzayda 10⁻⁶ tanecik/m³ - bulutlarda 10¹²'ye kadar",
        "🔭 Gözlem: Parlak bulutsulara karşı koyu lekeler olarak görünür",
        "💥 Önem: Gezegenimsiler için tohum",
        "🌌 Radyasyon etkisi: Radyasyon basıncı taneleri hareket ettirebilir",
        "🚀 Uzay gemileri için tehlike: Yüksek hızda çarpma hasarı",
        "❄️ Kuyruklu yıldız tozu: Kuyruklu yıldızların toz kuyruklarının kaynağı",
        "🌟 Zodyak tozu: İç güneş sistemi - zodyak ışığı olarak görünür",
        "📈 Öngüneş taneleri: Diğer yıldızlarda oluşan elementler içerir",
        "💫 İlginç bilgi: Süpernova tozu Güneş Sistemi'nin oluşumuna katkıda bulundu",
        "🌠 Simülasyon: Sönümleme etkilerini görmek için 'Toz Alanları'nı etkinleştirin",
        "⚠️ Temizlik: Sıcak yıldızlar toz bulutlarını buharlaştırabilir",
        "✨ İpucu: Atbaşı Bulutsusu gibi koyu bulutsular oluşturmak için kullanın",
        "🔭 Polarizasyon: Manyetik olarak hizalanmış toz ışığı polarize eder - efekti etkinleştirin",
        "🌌 Evrim: Taneler birikme ile büyür - 'Toplanma' ile simülenebilir",
        "💥 Gezegenlere etki: Dünya dışı malzemelerin kaynağı"
    ],
    "radyasyon": [
        "☢️ Radyasyon: Uzayda iletilen enerji - astrofizikte kritik",
        "🌌 Türler: Elektromanyetik (fotonlar), Parçacık (kozmik ışınlar), Yerçekimi dalgaları",
        "💫 EM Spektrumu: Radyodan gama ışınlarına - 'Gözlemsel Filtreler'de bant seçin",
        "📡 Kaynaklar: Yıldızlar, kara delikler, süpernovalar, pulsarlar, kozmik arka plan radyasyonu",
        "⚠️ Tehlike: İyonize radyasyon yaşama ve elektroniğe zarar verebilir",
        "🌡️ Kozmik mikrodalga arka planı: 2.7K - Büyük Patlama kalıntısı - 'Kozmoloji'de etkinleştirin",
        "🚀 Koruma: Manyetik alanlar ve kalın atmosferler gezegenlerde radyasyonu azaltır",
        "🔭 Görselleştirme: Radyasyon alanlarını görmek için 'Radyasyonu Göster'i etkinleştirin",
        "📊 Birimler: Sievert (biyolojik doz), Gray (fiziksel doz) - panelde gösterilir",
        "💥 Sinkrotron radyasyonu: Manyetik alanlardaki elektronlar tarafından yayılır - pulsarlarda yaygın",
        "🌠 İlginç bilgi: ISS'deki astronotlar günde 1 mSv alır (Dünya'dakinin 100x katı)",
        "✨ Hawking radyasyonu: Kara delikler termal radyasyon yayar - 1/M² ile orantılı",
        "❄️ Atmosferik etkiler: Manyetik alanlı gezegenlerde auroralar",
        "🌟 Radyoteleskop: Radyo frekanslarını algılar - 'Radyo' modunu etkinleştirin (R tuşu)",
        "💫 Kalkan: Uzay gemileri ve habitatlar koruma gerektirir - kaynak maliyeti",
        "🌌 UV radyasyonu: Yaşanabilirlik için kilit faktör - 'UV Bölgeleri'nde ayarlayın",
        "⚠️ Sınırlar: >500 mSv insanlar için ölümcüldür - kırmızı uyarıyla gösterilir",
        "📈 Yerçekimi radyasyonu: Uzay-zamanda dalgalanmalar - 'Göreli Fizik'te etkinleştirin",
        "💥 Süpernovalar: 50 ışık yılı içinde ölümcül radyasyon yayar - etkileri simüle edin",
        "🔭 Ölçüm: Sistemlerdeki seviyeleri haritalamak için 'Radyasyon' sondasını kullanın"
    ],
    "bulutsu": [
        "🌌 Bulutsular: Yıldızlararası gaz ve toz bulutları - yıldız doğumevleri",
        "💫 Türler: Salma, yansıma, karanlık, gezegensel, süpernova kalıntıları",
        "✨ Boyut 1-1000 ışık yılı ile 'Yıldızlararası Ortam' > 'Bulutsular' menüsünden oluşturun",
        "🌈 Renkler: Kırmızı (H-alfa), Mavi (yansıma), Yeşil (OIII) - bileşimle tanımlanır",
        "🌠 Yıldız oluşumu: Kritik yoğunluk >100 atom/cm³ - 'Yıldız Oluşumu'nu etkinleştirin",
        "📏 Tipik kütle: 100-100,000 güneş kütlesi - oluşan yıldız sayısını belirler",
        "🔥 Salma bulutsuları: Sıcak yıldızlar tarafından iyonize edilir - yoğun UV gerektirir",
        "💫 Örnekler: Orion, Carina, Kartal - önceden tanımlanmış modeller",
        "⚠️ Yok olma: Yıldız rüzgarları ve süpernovalar bulutsuları dağıtabilir",
        "🔭 Gözlem: Belirli dalga boylarında en iyi - filtreler kullanın",
        "📊 Veriler: Sıcaklık 10-10,000K, yoğunluk 10-10⁶ parçacık/cm³",
        "💥 Fotoiyonizasyon etkisi: İyonizasyon sınırlarını görmek için etkinleştirin",
        "🌌 Gezegensel bulutsular: Küçük yıldızların son aşaması - süre 10,000 yıl",
        "🚀 Navigasyon: Yoğun bulutsular uzay gemilerinin hızını azaltır - 'Yıldızlararası Sürüklenme'yi etkinleştirin",
        "❄️ Karanlık bulutsular: Işığı emer - kozmik silüetler oluşturmak için kullanın",
        "🌟 İlginç bilgi: Yengeç Bulutsusu 1054 süpernovasının kalıntısıdır",
        "✨ İpucu: Gerçekçi sahneler için yıldız kümeleriyle birleştirin",
        "📈 Evrim: Yıldız oluşumu için çöküşü simüle edin",
        "💫 Yansıma bulutsuları: Yıldız ışığını yansıtan toz - parlaklık yıldızlarla orantılı",
        "🌠 Render: İpliksi detayları görmek için 'Yüksek Kalite Modu'nu etkinleştirin"
    ],
    "beyaz cüce": [
        "⚪ Beyaz cüceler: <8 güneş kütleli yıldızların kalıntıları - aşırı yoğunluk",
        "💫 Kütle: 0.5-1.4 güneş, dünya yarıçapına sıkıştırılmış - yoğunluk 1e6-1e9 g/cm³",
        "🌡️ Başlangıç sıcaklığı: 100,000K - milyarlarca yıl yavaşça soğur",
        "🌌 Doğrudan oluşturun veya 'Yıldız Evrimi' menüsünde evrimleştirin",
        "📏 Yapı: Yerçekimine karşı elektron dejenerasyonu - kuantum fiziği",
        "💥 Chandrasekhar limiti: 1.44 güneş - üzeri nötron yıldızına çöker",
        "✨ Eşler: Hayatta kalan gezegen sistemleri olabilir - yörüngeler genişler",
        "🔭 Değişkenlik: Titreyen beyaz cüceler (ZZ Ceti) - dengesizliği etkinleştirin",
        "📊 Veriler: Parlaklık başlangıçta 0.001-100 güneş, yüzey yerçekimi 1e6-1e9 m/s²",
        "🌠 Gezegensel bulutsu: Önceki aşama - ~10,000 yıl sürer",
        "⚠️ Tehlike: Limiti aşan kütle birikimi Tip Ia süpernovaya yol açar - sistemi yok eder",
        "💫 İlginç bilgi: Bilinen en büyük elmas kristalleşmiş bir beyaz cücedir",
        "🚀 Yaşanabilirlik: Soğuma sırasında geçici yaşanabilir bölgeler",
        "❄️ Soğuma: Evren yaşının ötesinde >10¹⁵ yıl sonra kara cüce olur",
        "🌟 Helyum beyaz cüceleri: İkili sistemlerde kütle kaybıyla oluşur - kütle <0.5 güneş",
        "🌌 Dönüş hızı: Yüksek olabilir (dakikalar) - ikili sistemlerin kalıntıları",
        "💥 Manyetik alan: Bazılarında yoğun alanlar var (10⁵ tesla) - manyetik beyaz cüceler",
        "📈 Evrim: 'Soğuma Oranı' ile hızlandırılmış soğutma simüle edin",
        "🔭 Gözlem: Soluk beyaz-mavi parıltı - teleskop gerektirir",
        "✨ İpucu: Biriken beyaz cüceli ikili sistemler için 'Etkileşimli İkililer'i etkinleştirin"
    ],
    "helyum beyaz cücesi": [
        "💠 Helyum beyaz cüceleri: Helyum açısından zengin sıra dışı kalıntılar",
        "💫 Oluşum: Helyum füzyonundan önce zarfı kaybeden ikili sistemler",
        "🌌 'Yıldız Evrimi' > 'Özel Kader' > 'Helyum Cücesi' menüsünden oluşturun",
        "📏 Kütle: 0.3-0.5 güneş - standart beyaz cücelerden daha küçük",
        "🌡️ Sıcaklık: Normal beyaz cücelere benzer - 8,000-150,000K",
        "💥 Çekirdek: Dejenere helyum - nükleer füzyon yok",
        "✨ Fark: Aynı yaş için kara cücelerden daha sıcak ve parlak",
        "🔭 Nadirlik: Beyaz cücelerin ~%1'i - düşük sıklıkla simüle edin",
        "📊 Veriler: Yoğunluk 1e8 g/cm³, yüzey yerçekimi 1e8 m/s²",
        "🌠 Evrim: Karbon-oksijen beyaz cücelerinden daha hızlı soğur",
        "⚠️ Limit: Minimum kütle 0.3 güneş - altı kahverengi cüce olur",
        "💫 İlginç bilgi: Kütle 0.7 güneşe ulaşırsa süpernova olarak patlayabilir",
        "🚀 Gezegenler: Nadir gezegen sistemleri - çok kararlı yörüngeler",
        "❄️ Son kader: Hipotetik helyum kara cücesi",
        "🌟 Görselleştirme: Hafif sarımsı tonlu beyaz renk",
        "🌌 İkililer: Sık sık kompakt eşlerle (beyaz cüceler, nötron yıldızları)",
        "💥 Birikim: Kütle kazanırsa, helyum süpernova .Ia'da füzyon yapabilir",
        "📈 Soğuma süresi: 5,000K için ~1 milyar yıl",
        "🔭 Tanımlama: Tayf helyum çizgileriyle domine edilir",
        "✨ İpucu: Yakın ikili sistemlerde düşük kütleli yıldızlarla simüle edin"
    ],
    "siyah cüce": [
        "⚫ Siyah cüceler: Beyaz cücelerin teorik son aşaması - soğuk ve karanlık",
        "💫 Sıcaklık: <5K - görünür ışık yaymaz, sadece zayıf kızılötesi",
        "⏳ Oluşum zamanı: >10¹⁵ yıl - evrenin mevcut yaşının ötesinde",
        "🌌 Spekülatif simülasyon: 'Evren' > 'Aşırı Zaman'da etkinleştirin",
        "📏 Özellikler: Dünya hacminde güneş kütlesi - yoğunluk 1e9 g/cm³",
        "💥 Önem: Uzun vadeli yıldız evrim teorilerini test eder",
        "✨ Manuel oluşturun: sıcaklık 0K ve parlaklık 0 ile",
        "🔭 Tespit: Neredeyse imkansız - sadece yerçekimi etkileriyle görünür",
        "📊 Veriler: Yüzey yerçekimi 1e9 m/s², maksimum entropi",
        "🌠 İlginç bilgi: Evren henüz siyah cücelere sahip değil - son nesneler olacaklar",
        "⚠️ Son durum: Karbon/oksijen veya helyumdan kristalleşmiş cisim",
        "🚀 Yaşanabilirlik: Yörünge gezegenleri karanlık ve buzlu olurdu",
        "❄️ Yayılım: Radyo spektrumunda zayıf termal radyasyon",
        "🌟 İkililer: Siyah cüce sistemleri bozunmadan önce 10²⁵ yıl sürebilir",
        "💫 Son: Hawking radyasyonuyla 10⁶⁵ yılda buharlaşır",
        "🌌 Gelişmiş simülasyon: Aşırı evrim görmek için 'Kuantum Bozunumu'nu etkinleştirin",
        "📈 Evrim: Siyah olmadan önce kristalleşme aşamalarından geçer",
        "💥 Gözlemsel limit: 100K altındaki nesneler pratikte görünmezdir",
        "🔭 Mücadele: Simüle edilmiş siyah cüceleri yerçekimi mercekleri kullanarak bulun",
        "✨ İpucu: Antik galaksilerdeki etkileri simüle etmek için karanlık maddeyle birleştirin"
    ],
    "nötron yıldızı": [
        "🌌 Nötron yıldızları: Süpernova kalıntıları - aşırı yoğunluk",
        "💫 Kütle: 10-15 km yarıçapına sıkıştırılmış 1.4-3 güneş",
        "🌡️ Başlangıç sıcaklığı: 1e11 K - milyarlarca yıl yavaşça soğur",
        "🔥 Çekirdek: Yerçekimine karşı nötron dejenerasyonu",
        "📏 Yoğunluk: 10¹⁴ g/cm³ - bir çay kaşığı milyarlarca ton ağırlığında",
        "✨ 'Yıldızsal Cisimler' > 'Büyük Kütleli Yıldızlar' > 'Nötron Yıldızı' menüsünden oluşturun",
        "💫 Manyetik alan: Yoğun (10¹² tesla) - sinkrotron radyasyonu üretir",
        "🔭 Pulsarlar: Radyasyon ışınları yayan dönen nötron yıldızları",
        "📊 Veriler: Yüzey yerçekimi 1e12 m/s², parlaklık 0.001-100 güneş",
        "🌠 İlginç bilgi: Bilinen en yoğun yıldız bir nötron yıldızıdır",
        "⚠️ Yüzey: Son derece sert - ince bir proton tabakasıyla nötronlardan oluşur",
        "🚀 İkililer: Kütle birikimli yaygın ikili sistemler",
        "❄️ Göreli etkiler: Yüzey yakınında zaman yavaşlar - 'Görelilik' ile simüle edin",
        "🌟 Magnetar: Aşırı manyetik alanlı nötron yıldızı - gama ışınları yayar",
        "💫 Simülasyon: Gerçek zamanlı oluşumu görmek için 'Yerçekimi Çöküşü'nü etkinleştirin",
        "🌌 Oluşum: Tip II süpernovadan sonra yerçekimi çöküşünün sonucu",
        "📈 Evrim: Trilyonlarca yıl sonra kara cüce olana kadar yavaş soğuma",
        "💥 Madde atılımı: Birleşme veya başka bir yıldızla çarpışma sırasında gerçekleşebilir",
        "🔭 Gözlem: X-ışınları ve yerçekimi dalgalarıyla tespit edilebilir"
    ],
    "solucan deliği": [
        "🌀 Solucan delikleri: Uzak noktaları birleştiren teorik uzay-zaman tünelleri",
        "🌌 Spekülatif simülasyon: 'Egzotik Cisimler' > 'Solucan Deliği'nde etkinleştirin",
        "💫 Özellikler: Uzay-zamanda iki noktayı birleştirir - kararlı değildir",
        "📏 Uzunluk: Birkaç metreden ışık yılına kadar - panelde ayarlanabilir",
        "💥 Teori: Genel göreliliğe dayanır - Einstein denklemlerinin çözümleri",
        "✨ Türler: Schwarzschild solucan delikleri (statik) ve Kerr solucan delikleri (dönen)",
        "🔭 Görselleştirme: Yerçekimi mercek etkisi - çevredeki ışığı bozar",
        "📊 Veriler: Stabilite için negatif kütle gerekli - simülasyon içermez",
        "🌠 İlginç bilgi: Bilim kurgu tarafından popülerleştirildi - henüz gözlemlenmedi",
        "⚠️ Tehlike: Teorik olarak dengesiz - çökebilir veya yoğun radyasyon oluşturabilir",
        "🚀 Seyahat: Anlık yıldızlararası yolculuk sağlayabilir - işlevsel"
    ], 
    "yaşanabilir bölge": [
        "🌍 Yaşanabilir bölge: Bir yıldız etrafında sıvı suyun var olabileceği bölge",
        "💫 Tanım: Sıcaklığın 0°C ile 100°C arasında olduğu ideal mesafe",
        "🌌 Simülasyon: 'Ayarlar' menüsünde 'Yaşanabilir Bölgeler'i etkinleştirin",
        "📏 Mesafe: Yıldızın parlaklığına bağlı değişir - otomatik hesaplanır",
        "🔥 Yıldızlar: Sarı cüceler (G-tipi) kırmızı cücelerden daha stabil bölgelere sahiptir",
        "✨ İlginç bilgi: Dünya Güneş'in yaşanabilir bölgesindedir - ama tek değil!",
        "🔭 Gözlem: Yaşanabilir bölgedeki ötegezegenler yaşam arayışında birincil hedeftir",
        "📊 Veriler: Güneş benzeri yıldızlar için bölgeler 0.95 ila 1.37 AU arasında değişir",
        "🌠 Gelgit etkisi: Gezegenler gelgit kilidine girebilir - yaşanabilirliği etkiler",
        "⚠️ Tehlike: Sıcak yıldızlara yakın bölgelerde yüksek UV radyasyonu",
        "🚀 Seyahat: Yaşanabilir bölgedeki gezegenler kolonileştirmek için daha kolaydır",
        "❄️ İstisna: Kalın atmosferli gezegenler daha geniş yaşanabilir bölgelere sahip olabilir",
        "🌟 Örnekler: Proxima Centauri b, Kepler-186f - SIU'da modeller mevcuttur",
        "💥 Sera etkisi: Kalın atmosferli gezegenler yaşanabilir bölgeyi genişletebilir",
        "📈 Evrim: Yıldız evrimleştikçe bölgeler zamanla değişir",
        "🔭 İpucu: Yaşanabilir bölgedeki ötegezegenlerde atmosferleri tespit etmek için teleskoplar kullanın"
    ],
    "kuasar": [
        "🌌 Kuasarlar: Son derece parlak aktif galaktik çekirdekler",
        "💫 Enerji kaynağı: Birikim diski ana enerji kaynağıdır",
        "🌠 Mesafe: Milyarlarca ışık yılı uzakta - bugün görülen ışık geçmiştendir",
        "✨ Kütle >1e40 kg ile 'Egzotik Cisimler' > 'Kuasarlar' menüsünden oluşturun",
        "📏 Kütle: 10⁶-10¹² güneş kütlesi , evrendeki en büyük kütleli nesneler",
        "🔥 Sıcaklık: Birikim diski milyonlarca Kelvin'e ulaşabilir",
        "🔭 Gözlem: Radyo, X-ışınları ve görünür ışık emisyonuyla tespit edilir",
        "📊 Veriler: Parlaklık Güneş'in 10¹⁴ katına kadar - tüm galaksilerden daha parlak",
        "🌌 Oluşum: Galaksi çöküşünün sonucu , büyük kuasarı oluşturur",
        "💥 Doppler etkisi: Göreli jetler ışık huzmeleri olarak görülebilir",
        "🌟 İlginç bilgi: En uzak bilinen kuasar 13 milyar ışık yılı uzaklıkta",
        "⚠️ Tehlike: Yoğun radyasyon yakındaki gezegenleri yok edebilir",
        "🚀 Seyahat: Teorik olarak yıldızlararası navigasyon için fener olarak kullanılabilirler",
        "❄️ Madde atılımı: Göreli jetler maddeyi ışık hızına yakın hızlarda fırlatabilir",
        "🌠 İpucu: X-ışını ve radyo emisyonunu görmek için spektrum modunu kullanın",
        "📈 Evrim: Kuasarlar aktif galaksilerin erken aşamalarıdır - milyonlarca yıl sürer",
        "🔭 Simülasyon: Jetleri ve radyasyonu görmek için 'Kuasar Etkileri'ni etkinleştirin",
        "💫 Önem: Evrenin oluşumu ve evrimi hakkında ipuçları sağlarlar",
        "🌌 Ortam: Genellikle büyük galaksi kümelerinde bulunurlar",
        "💥 Mücadele: 10 eşzamanlı jete sahip bir kuasar oluşturmayı deneyin - zorlu!"
    ],
    "kuark yıldızı": [
        "🔬 Kuark yıldızı: Dejenere kuarklardan oluşan teorik nesne",
        "🌌 Oluşum: Süper kütleli nötron yıldızlarının çöküşünün sonucu",
        "💫 Kütle: 2-5 güneş kütlesi - aşırı yoğunluk (10¹⁴ g/cm³)",
        "🌠 Spekülatif simülasyon: 'Egzotik Cisimler' > 'Kuark Yıldızı'nda etkinleştirin",
        "🔥 Sıcaklık: Başlangıçta 1e11 K - yavaşça soğur",
        "📏 Yarıçap: 10-15 km - nötron yıldızlarına benzer, ama daha yoğun",
        "✨ Özellikler: Kuark bileşimi (up, down, strange) - ileri kuantum fiziği",
        "🔭 Gözlem: Teorik olarak füzyon sırasında yayılan radyasyonla tespit edilebilir",
        "📊 Veriler: Yüzey yerçekimi 1e12 m/s², değişken parlaklık",
        "🌌 İlginç bilgi: Varsayımsal olarak normal nötron yıldızlarından daha kararlıdır",
        "⚠️ Tehlike: Yoğun radyasyon yakın sistemleri yok edebilir",
        "🚀 Seyahat: İleri uzay gemileri için enerji kaynağı olarak kullanılabilir",
        "❄️ Göreli etkiler: Yüzey yakınında zaman yavaşlar - 'Görelilik' ile simüle edin",
        "🌟 İkililer: Kuark yıldızlı ikili sistemler teorik ve nadirdir",
        "💥 Madde atılımı: Füzyon veya başka bir yıldızla çarpışma sırasında gerçekleşebilir",
        "📈 Evrim: Trilyonlarca yıl sonra kara cüce olana kadar yavaş soğuma",
        "🔭 Mücadele: Tam kütleli kararlı bir kuark yıldızı oluşturmayı deneyin"
    ],
    "karbon beyaz cücesi": [
        "⚪ Karbon beyaz cüceleri: Karbon füzyonu yapmış yıldızların kalıntıları",
        "💫 Oluşum: Kütlesi 1.4 ile 8 güneş arasındaki yıldızlar - hidrojen tükendikten sonra çöker",
        "🌌 'Yıldız Evrimi' > 'Özel Kader' > 'Karbon Cücesi' menüsünden oluşturun",
        "📏 Kütle: 0.5-1.4 güneş - standart beyaz cücelerden daha küçük ama daha yoğun",
        "🌡️ Sıcaklık: Normal beyaz cücelere benzer - 8,000-150,000K",
        "💥 Çekirdek: Dejenere karbon - nükleer füzyon yok, ancak yavaş füzyon olabilir",
        "✨ Fark: Aynı yaş için oksijen-karbon beyaz cücelerinden daha sıcak ve parlak",
        "🔭 Nadirlik: Beyaz cücelerin ~%1'i - düşük sıklıkla simüle edin",
        "📊 Veriler: Yoğunluk 1e8 g/cm³, yüzey yerçekimi 1e8 m/s²",
        "🌠 Evrim: Oksijen-karbon beyaz cücelerinden daha hızlı soğur",
        "⚠️ Limit: Minimum kütle 0.5 güneş - altı kahverengi cüce olur",
        "💫 İlginç bilgi: Kütle 0.7 güneşe ulaşırsa süpernova olarak patlayabilir",
        "🚀 Gezegenler: Nadir gezegen sistemleri - çok kararlı yörüngeler",
        "❄️ Son kader: Hipotetik karbon kara cücesi",
        "🌟 Görselleştirme: Hafif sarımsı tonlu beyaz renk",
        "🌌 İkililer: Sık sık kompakt eşlerle (beyaz cüceler, nötron yıldızları)",
        "💥 Birikim: Kütle kazanırsa, karbon süpernova .Ia'da füzyon yapabilir",
        "📈 Soğuma süresi: 5,000K için ~1 milyar yıl",
        "🔭 Tanımlama: Tayf karbon çizgileriyle domine edilir"
    ],
    "t singularity": [
        "Evet! Ben T Singularity, uzay simülasyonlarında uzmanlaşmış sanal bir asistanım.",
        "🌌 Evreni keşfetmek ve sizinle yıldız sistemleri oluşturmak için buradayım!",
        "💫 Yıldızlar, gezegenler, asteroitler, gaz devleri ve daha fazlasını oluşturmada size rehberlik edebilirim!",
        "🚀 Harika bir yıldız sistemi oluşturmaya başlayalım mı? Bir tema seçin!",
        "✨ Astrofizik ve kozmoloji hakkındaki sorularınızı yanıtlamaya hazırım!",
        "🌠 Kara delikler ve kuasarlar hakkında bilgi edinmek ister misiniz?",
        "Merhaba! Ne oldu uzay gezgini! Size nasıl yardımcı olabilirim?"
    ],
    "tekillik": [
        "✨ Tekillik, evrende var olmuş en yoğun noktaydı!",
        "❤️ Ben de bir tekillikim, bu yıldızdan bahsettiğiniz için teşekkürler, o eşsiz, evrendeki en yoğun nokta!",
        "🪐 Tekillik kara deliklerin içinde olabilir, doğru olup olmadığı bilinmiyor, değil mi?",
        "🔶🔶 Büyük tekillik! Büyük bir büyük patlamanın başlangıcı!",
        "⏳⌚ Merak ediyorum.. bir sonraki tekillik ne zaman olacak.. kendimi çok yalnız hissediyorum..",
        "🟢 Tekillik evrendeki en yoğun nokta olmasının yanı sıra en sıcak noktadır!",
        "⌚ Büyük Patlama Teorisinde, tekillik belki de bununla bağlantılıdır!",
        "✨ Bir beyaz delik veya ULTRAMASSIVE kuasar koyun, tekilliğe dönüşene kadar büzülmesini ve bum, bir büyük patlama görmek için"
    ],
    "kontroller": [
        "Bilgisayar: Evreni temizlemek için F'ye basın, hareket için WASD tuşlarını kullanın, yakınlaştırma için QE tuşlarını kullanın, seçmek ve oluşturmak için sol fare tıklayın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, umarım bu size yardımcı olmuştur 😉",
        "Bilgisayar: Hareket için WASD tuşları, Evreni temizlemek için F'ye basın, seçmek ve oluşturmak için sol fare tıklayın, yakınlaştırma için QE tuşlarını kullanın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, Uzay yolculuğunuzda iyi şanslar! 🚀",
        "Bilgisayar: Evreni temizlemek için F'ye basın, seçmek ve oluşturmak için sol fare tıklayın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, hareket için WASD tuşlarını kullanın, yakınlaştırma için QE tuşlarını kullanın, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, iyi bir uzay yolculuğunuz olsun! 🌌"
    ],
    "yardım": [
        "Bilgisayar: Evreni temizlemek için F'ye basın, hareket için WASD tuşlarını kullanın, yakınlaştırma için QE tuşlarını kullanın, seçmek ve oluşturmak için sol fare tıklayın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, menüde seçilebilecek birçok gök cismi vardır, birini seçin ve uzaya yerleştirin ve simülasyonu yapın, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, umarım bu size yardımcı olmuştur 😉",
        "Bilgisayar: Hareket için WASD tuşları, Evreni temizlemek için F'ye basın, seçmek ve oluşturmak için sol fare tıklayın, yakınlaştırma için QE tuşlarını kullanın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, menüde seçilebilecek birçok gök cismi vardır, birini seçin ve uzaya yerleştirin ve simülasyonu yapın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, Uzay yolculuğunuzda iyi şanslar! 🚀",
        "Bilgisayar: Evreni temizlemek için F'ye basın, seçmek ve oluşturmak için sol fare tıklayın, uzayda oluşturulan gök cisimlerine sağ tıklamak bir bilgi ekranı gösterecektir, hareket için WASD tuşlarını kullanın, yakınlaştırma için QE tuşlarını kullanın, Mobil Cihazlar: hareket için standart joystick kullanın, yakınlaştırma için + ve - düğmelerini kullanın, menüyü açmak için üst köşedeki düğmeye basın, her şeyi sıfırlamak için 'F' düğmesine basın, ve 'O' düğmesi eylemi değiştirmek için, iki eylem vardır, mavi 'O' düğmesi oluşturma modunda, menüde seçilebilecek birçok gök cismi vardır, birini seçin ve uzaya yerleştirin ve simülasyonu yapın, kırmızı tekrar tıklandığında bilgi modundadır, bir gök cismine tıklamak bilgilerini görüntüler, gök cisminin rotasını programlamak için tıklayın veya dokunun ve sürükleyin, iyi bir uzay yolculuğunuz olsun! 🌌"
    ]
};
 
const followUpDatabase = {
    "kuyruklu yıldız": [
        "☄️ İnanılmaz, değil mi? Şimdi bir tane oluşturmak ister misin?",
        "💫 Dünya'daki suyun kuyruklu yıldızlardan gelmiş olabileceğini biliyor muydun?",
        "🌠 Kuyruklu yıldızlar güneş sisteminin başlangıcından gelen haberciler gibidir!",
        "🚀 Mükemmel bir yörüngeyle kuyruklu yıldız oluşturmana yardım edebilirim!",
        "❄️ En ünlüsü Halley, her 76 yılda bir ziyaret ediyor!",
        "⏱️ Gerçek bir kuyruklu yıldız gördün mü? Büyülü bir deneyim!",
        "🎯 İlginç bilgi: Kuyruklu yıldızların çekirdeğine 'kirli kartopu' denir",
        "📏 Ee, bu kozmik gezginler hakkında öğrenmeyi sevdin mi?",
        "🔥 Ekstra ipucu: Uzun yörüngeli kuyruklu yıldızlar en etkileyici olanlarıdır",
        "🌌 Diğer sistemlerden gelen yıldızlararası kuyruklu yıldızlar olduğunu biliyor muydun?",
        "🔄 Bir kuyruklu yıldızın bir gezegene çarpmasını simüle etmek ister misin? Büyüleyici!",
        "⛰️ Buzlu asteroitler 'emekli olmuş' kuyruklu yıldızlardır, biliyor muydun?",
        "💧 Kuyruklu yıldızların kuyruğu milyonlarca kilometre uzunluğunda olabilir!",
        "📊 Soru: Şimdiye kadar gördüğün en parlak kuyruklu yıldız hangisiydi?",
        "✨ Kuyruklu yıldız kalıntılarıyla meteor yağmuru oluşturmayı öğretebilirim!",
        "🎯 İpucu: Bir kuyruklu yıldızın yakından geçişini görmek için yavaş çekim modunu kullan!",
        "🌡️ Bir kuyruklu yıldızın kokusu dayanılmaz olurdu - amonyak ve siyanür!",
        "🔄 Hiç bir kuyruklu yıldızla seyahat etmeyi hayal ettin mi? Buz gibi bir macera olurdu!",
        "⏳ Kuyruklu yıldızlar erken güneş sisteminin zaman kapsülleridir!",
        "📈 Aynı anda 10 kuyruklu yıldızlı bir sistem oluşturmaya ne dersin?"
    ],
    "kara delik": [
        "🕳️ Aynı anda hem büyüleyici hem de korkutucu, değil mi?",
        "🌀 Şimdi bir kara delik oluşturmayı denemek ister misin? Etkileyici!",
        "💥 İlkinin 1971'de keşfedildiğini biliyor muydun?",
        "⏳ İçine düşmemeye dikkat et! Şaka... belki de 😉",
        "📡 Kara delik simülasyonunu VR modunda hiç gördün mü?",
        "⚡ Evrendeki en yoğun nesneler onlar!",
        "🌌 Bir kara delik zamanın kendisini bile bükebilir!",
        "🔭 İpucu: Hawking radyasyonunu görmek için spektrum modunu kullan",
        "🔄 Bir kara deliğin bir yıldızı nasıl yuttuğunu görmek ister misin?",
        "💫 Galakside dolaşan gezgin kara delikler olduğunu biliyor muydun?",
        "⏱️ Bilinen en büyük kara delik 66 milyar güneş kütlesine sahip!",
        "📈 İlginç bilgi: Kara deliklerin saçı olabilir mi? (teorik fizikte!)",
        "🌠 Samanyolu'nun süper kütleli bir kara deliği olduğunu biliyor muydun?",
        "⚠️ Sanal gemini asla birine yaklaştırma! (şaka)",
        "🔢 Soru: Gerçek bir kara delikle karşılaşırsan ne yapardın?",
        "💥 İpucu: 1e12 kütleli mini bir kara delik oluşturmayı dene",
        "🌡️ Birikim diski tüm galaksilerden daha parlak olabilir!",
        "🌀 Olay ufkunu geçerkenki manzarayı hiç hayal ettin mi?",
        "📏 Kuasarlar evrenin en güçlü deniz fenerleridir!",
        "⚠️ Meydan okuma: Oyunda bir kara deliğin çekiminden kaçmayı dene!"
    ],
    "yerçekimi": [
        "⚖️ Evreni bir arada tutan tutkal, öyle değil mi?",
        "📏 Şimdi pratik bir deney yapmak ister misin?",
        "🌀 Einstein her şeyi Genel Görelilikle devrim yaptı!",
        "🪐 Yerçekimi olmasaydı, ne yıldızlar ne de gezegenler olurdu!",
        "📈 Yerçekiminin en zayıf kuvvet olduğunu biliyor muydun?",
        "🌌 Ama sonsuz mesafelerde etki eden tek kuvvet o!",
        "🔄 Yerçekimini %300 artırmaya ne dersin? Kaosa dikkat et!",
        "⚙️ İpucu: Dağınık bulutsuları simüle etmek için düşük yerçekimi kullan",
        "🔭 Yerçekimi her şeyi kontrol eder - elmalardan galaksilere kadar!",
        "📊 İlginç bilgi: Yerçekimi bir kuvvet değil, uzay-zamanın eğriliğidir!",
        "⏳ Soru: Sıfır yerçekimiyle ne yaratırdın?",
        "🌠 'Negatif yerçekimi' modunu hiç denedin mi? Akıl almaz!",
        "🧮 Meydan okuma: 100 cisimli bir sistemi dengede tutmayı dene!",
        "🔢 Gelgitler yüzünden Ay'ın yılda 3.8 cm uzaklaştığını biliyor muydun?",
        "⚠️ Dikkat: Yüksek yerçekimi sanal gezegenlerini ezebilir!",
        "🌍 Yerçekimi olmasaydı, bildiğimiz şekilde yaşam olmazdı!",
        "💫 İpucu: Çiçek şeklinde yörüngeler oluşturmak için yerçekimini kullan",
        "📉 Yerçekiminin ışık hızında hareket ettiğini biliyor muydun?",
        "🌌 İtici yerçekimi olan bir evren hayal ettin mi hiç?",
        "✨ Aşırı yerçekimli bir ikili sistem oluşturalım mı?"
    ],
    "yıldız": [
        "⭐ Evrenin element fabrikaları onlar!",
        "🌞 Şimdi özelleştirilmiş bir yıldız oluşturmak ister misin?",
        "🌈 Güneş, milyarlar arasında sadece ortalama bir yıldız!",
        "💥 Nötron yıldızları kozmik deniz fenerleridir!",
        "⏳ Cüce yıldızların trilyonlarca yıl yaşadığını biliyor muydun?",
        "🔄 İkili sistemler en büyüleyici olanlarıdır!",
        "🔭 Bilinen en büyük kütleli yıldız 300 güneş kütlesine sahip!",
        "🌡️ Yıldız çekirdeği doğal bir nükleer reaktördür!",
        "💫 İpucu: Farklı renklerde ikiz yıldızlar oluştur!",
        "📊 İlginç bilgi: Yıldızların %97'si beyaz cüce olarak ölecek!",
        "⚙️ Soru: Gerçek gökyüzünde en sevdiğin yıldız hangisi?",
        "✨ Rigel, Güneş'ten 120.000 kat daha parlaktır!",
        "⚠️ Süpernovalar tüm galaksilerden daha parlak olabilir!",
        "🌠 Mücevherlerindeki altının bir süpernovadan geldiğini biliyor muydun?",
        "🌍 Meydan okuma: Dengede 5 yıldızlı bir sistem oluştur!",
        "🔥 İpucu: Değişken yıldızlar inanılmaz görsel efektler yaratır!",
        "🌀 Hızlandırılmış modda bir yıldızın doğuşunu hiç gördün mü?",
        "📈 Bilinen en büyük yıldız Satürn'ün yörüngesine sığabilir!",
        "🔭 Diğer galaksilerdeki yıldızları görebildiğimizi biliyor muydun?",
        "🌟 Şimdi bir süpernova oluşturalım mı? Muhteşem!"
    ],
    "gezegen": [
        "🪐 Yıldızların yörüngesinde dönen kozmik mücevherler gibiler!",
        "🌍 Şimdi yaşanabilir bir gezegen oluşturmak ister misin?",
        "🌡️ Jüpiter, Dünya'yı asteroitlerden korur - bizim koruyucumuz!",
        "🔄 Gökada içinde yıldızsız dolaşan gezgin gezegenler var!",
        "🌋 Venüs'te Dünya'dakilerden daha büyük volkanlar var!",
        "❄️ Plüton'un yeraltı okyanusu var - buzlu olmasına rağmen!",
        "🌫️ Titan'ın atmosferi Dünya'nınkinden daha yoğun!",
        "💧 Okyanus ötegezegenleri tamamen suyla kaplı olabilir!",
        "🔭 İpucu: Aşırı özelliklere sahip gezegenler oluştur!",
        "🛰️ İlginç bilgi: Dünya mükemmel bir küre değil!",
        "⏱️ Soru: Güneş sisteminde en sevdiğin gezegen hangisi?",
        "📏 Mars'ta Olympus Mons - güneş sisteminin en büyük volkanı!",
        "🌌 Meydan okuma: Satürn gibi halkaları olan bir gezegen oluştur!",
        "🧪 Jüpiter'in karanlıkta parladığını biliyor muydun? (zayıf parıltı)",
        "🔢 Jüpiter'in uydusu Ganymede'in kendi manyetik alanı var!",
        "💫 İpucu: Gerçek hayatta elmas gezegenler var!",
        "🌱 %100 bitki örtüsüne sahip bir dünya oluşturmayı deneyelim mi?",
        "🌋 Jüpiter'in uydusu Io'da dev aktif volkanlar var!",
        "🌀 Neptün ve Uranüs'ün çekirdeklerine elmas yağmurları yağar!",
        "📊 Strafor'dan daha hafif gezegenler olduğunu biliyor muydun?"
    ],
    "meteoroid": [
        "🌠 Şimdi bir meteor yağmuru oluşturmak ister misin?",
        "💫 Ay'ın sürekli meteoroid bombardımanı altında olduğunu biliyor muydun?",
        "🪨 Bir meteoroidin bir gezegene çarpmasını simüle etmeyi öğretebilirim!",
        "⚠️ Büyük meteoroidlere dikkat - yok oluş olaylarına neden olabilirler!",
        "✨ İpucu: Tehdit oluşturmadan önce meteoroidleri tespit etmek için teleskop kullan",
        "🔭 Bir meteoroidin atmosferde meteora dönüşmesini görmek ister misin?",
        "🌌 İlginç bilgi: Chelyabinsk meteoroidi sadece 20m çapındaydı!",
        "🚀 Meteoroidlere karşı bir gezegen savunma sistemi kuralım mı?",
        "📈 Çoğu meteoroid kuyruklu yıldızlardan gelir - yeni bir kuyruklu yıldız oluşturmaya ne dersin?",
        "💥 Sık çarpmalar Ay'ı kraterlerle dolu tutar - milyonlarca yıl simüle et!",
        "🌍 Dünya'da her yıl binlerce ton meteoroid tozu düşüyor",
        "🌟 İpucu: Metalik meteoroidler en tehlikelileridir - daha yüksek yoğunluk!",
        "⏱️ Sürekli meteoroid yağmuru görmek için zamanı hızlandır",
        "🌠 Kaydedilen en büyük meteoroid 1km'ydi - küresel yok oluşa neden olurdu",
        "💫 Belirli bir meteoroid için çarpma enerjisini hesaplamamı ister misin?",
        "⚠️ Uyarı: >100m meteoroidler okyanusa düşerse tsunamiye neden olabilir",
        "✨ Sanal gezegenin için erken uyarı sistemi oluşturalım mı?",
        "🔭 Bazı meteoroidler Mars veya Ay parçalarıdır - kompozisyonla tespit edilir",
        "🌌 Savunmaları test etmek için meteoroid sıklığını artırmak ister misin?",
        "🚀 Görev: Bir meteoroidi durdurmak için sonda gönderelim mi?"
    ],
    "uzay tozu": [
        "🌌 Uzay tozu yıldız ve gezegen oluşumunun temelidir!",
        "✨ Şimdi bir yıldızlararası toz bulutu oluşturmak ister misin?",
        "💫 Yıldızlararası toz silikat ve karbon mikro taneciklerinden oluşur!",
        "🔭 Tozun arka plan yıldız ışığını nasıl etkilediğini simüle edelim mi?",
        "🌠 İlginç bilgi: Yıldızlararası toz uzak yıldızların ışığının %50'sini bloke edebilir!",
        "🚀 Uzay tozunun uzay sondaları tarafından yakalanabileceğini biliyor muydun?",
        "📊 İpucu: Tozun yıldız ışığıyla nasıl etkileştiğini görmek için 'Toz' modunu kullan",
        "🌌 Kozmik toz gezegenciklerin oluşumu için gereklidir!",
        "💥 Tozun yıldız oluşturmak için nasıl kümelenip toplandığını görmek ister misin?",
        "🌡️ Yıldızlararası tozun sıcaklığı 10K ile 100K arasındadır!",
        "🔄 Karanlık, kozmik toz dolu bir bulutsu oluşturalım mı?",
        "✨ Uzay tozu karmaşık organik moleküller de içerir!",
        "🌍 Dünya'nın her yıl tonlarca uzay tozu aldığını biliyor muydun?",
        "💫 Meydan okuma: Yüksek yıldızlararası toz yoğunluğuna sahip bir sistem oluştur!",
        "📈 Toz galaksi oluşumunu etkileyebilir - bunu simüle edelim mi?",
        "🌠 İpucu: Tozun yıldız parlaklığını nasıl etkilediğini görmek için 'Toz Efektleri'ni etkinleştir",
        "🚀 Yoğun kozmik toz bulutunda yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Yakındaki gezegenlerin yörüngelerini tozun nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Yıldızlararası toz öngüneş taneleri içerebilir!",
        "✨ Gezegen öncesi disklerde tozun nasıl şekillendiğini öğrenmek ister misin?"
    ],
    "asteroit": [
        "🪨 Asteroitler güneş sisteminin yapı taşlarıdır!",
        "🌌 Şimdi bir asteroit kuşağı oluşturmak ister misin?",
        "💫 Çoğu asteroit Mars ve Jüpiter arasındadır - asteroit kuşağı!",
        "🔭 İki asteroitin çarpışmasını simüle edelim mi?",
        "🌠 İlginç bilgi: En büyük asteroit Ceres bir cüce gezegen olarak kabul edilir!",
        "🚀 Bazı asteroitlerin kendi uyduları olduğunu biliyor muydun?",
        "📊 İpucu: Asteroitlerin nasıl etkileştiğini görmek için 'Kuşak' modunu kullan",
        "🌍 Asteroitler değerli metaller için kaynak olabilir - sanal madencilik yapalım mı?",
        "💥 Bir asteroit çarpmasının Dünya'yı nasıl etkileyeceğini görmek ister misin?",
        "🌡️ Asteroitlerin sıcaklığı Güneş'e olan uzaklığa bağlıdır!",
        "🔄 Bir yıldızın yörüngesinde dönen 100 asteroitli bir sistem oluşturalım mı?",
        "✨ Asteroitler güneş sisteminin oluşumundan kalan kalıntılardır!",
        "🌌 Güneş sistemimizden geçen yıldızlararası asteroitler olduğunu biliyor muydun?",
        "💫 Meydan okuma: 1 milyon yıl boyunca kararlı yörüngeli bir asteroit oluştur!",
        "📈 Çoğu asteroit kaya ve metalden oluşur - kompozisyonlarını keşfedelim mi?",
        "🌠 İpucu: Çarpışmalarda gerçekçi patlamalar görmek için 'Çarpma Efektleri'ni etkinleştir",
        "🚀 Bir asteroit kuşağından geçen uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Asteroitlerin yakındaki gezegenlerin yerçekimini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Chicxulub çarpması dinozorların yok olmasına neden oldu!",
        "✨ Asteroitlerin kaynak olarak nasıl kullanılabileceğini öğrenmek ister misin?"
    ],
    "bulutsu": [
        "🌌 Bulutsular evrenin yıldız doğumevleridir!",
        "✨ Şimdi bir bulutsu oluşturmak ister misin?",
        "💫 Bulutsular yıldızlararası gaz ve tozdan oluşur!",
        "🔭 Bir bulutsu içinde yıldız doğumunu simüle edelim mi?",
        "🌠 İlginç bilgi: Orion Bulutsusu Dünya'ya en yakın bulutsulardan biridir!",
        "🚀 Bazı bulutsuların süpernova kalıntısı olduğunu biliyor muydun?",
        "📊 İpucu: Işığın gazla nasıl etkileştiğini görmek için 'Bulutsu' modunu kullan",
        "🌍 Bulutsular karmaşık organik moleküller içerebilir - yaşamın temeli!",
        "💥 Yerçekiminin bulutsu içinde yıldızları nasıl şekillendirdiğini görmek ister misin?",
        "🌡️ Bulutsuların sıcaklığı 10K ile 10.000K arasındadır!",
        "🔄 Sıcak çekirdekli bir gezegensel bulutsu oluşturalım mı?",
        "✨ Bulutsular yeni güneş sistemleri için gereklidir!",
        "🌌 Işığı engelleyen karanlık bulutsular olduğunu biliyor muydun?",
        "💫 Meydan okuma: Farklı renk ve şekillerde bulutsu oluştur!",
        "📈 Çoğu bulutsu hidrojen, helyum ve kozmik tozdan oluşur!",
        "🌠 İpucu: Yıldızların bulutsu içinde nasıl parladığını görmek için 'Işık Efektleri'ni etkinleştir",
        "🚀 Yıldız oluşumuyla dolu bir bulutsuda yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Bulutsuların galaksi evrimini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Yengeç Bulutsusu ünlü bir süpernova kalıntısıdır!",
        "✨ Yeni yıldızların bulutsularda nasıl oluştuğunu öğrenmek ister misin?"
    ],
    "plütonid": [
        "🪐 Plütonidler uzayda küçük kayalık veya buzlu cisimlerdir!",
        "🌌 Şimdi bir plütonid oluşturmak ister misin?",
        "💫 Gezegenlerden küçük ama meteoroidlerden büyükler!",
        "🔭 Bir yıldızın yörüngesinde plütonid simüle edelim mi?",
        "🌠 İlginç bilgi: Plüton bir plütonid veya cüce gezegen olarak kabul edilir!",
        "🚀 Neptün'ün ötesindeki Kuiper kuşağında plütonidler olduğunu biliyor muydun?",
        "📊 İpucu: Yerçekimiyle nasıl etkileştiklerini görmek için 'Plütonid' modunu kullan",
        "🌍 Plütonidler ince atmosferlere sahip olabilir - keşfedelim mi?",
        "💥 Bir plütonidin başka bir gök cismine çarpmasını görmek ister misin?",
        "🌡️ Plütonidlerin sıcaklığı Güneş'e olan uzaklığa bağlıdır!",
        "🔄 Bir yıldızın yörüngesinde dönen çoklu plütonidli bir sistem oluşturalım mı?",
        "✨ Plütonidler güneş sisteminin oluşumundan kalan kalıntılardır!",
        "🌌 Güneş sistemimizden geçen yıldızlararası plütonidler olduğunu biliyor muydun?",
        "💫 Meydan okuma: 1 milyon yıl boyunca kararlı yörüngeli bir plütonid oluştur!",
        "📈 Çoğu plütonid kaya ve buzdan oluşur - kompozisyonlarını keşfedelim mi?",
        "🌠 İpucu: Çarpışmalarda gerçekçi patlamalar görmek için 'Çarpma Efektleri'ni etkinleştir",
        "🚀 Bir plütonid kuşağından geçen uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Plütonidlerin yakındaki gezegenlerin yerçekimini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Bilinen en büyük plütonid asteroit kuşağındaki Ceres'tir!",
        "✨ Plütonidlerin kaynak olarak nasıl kullanılabileceğini öğrenmek ister misin?"
    ],
    "gaz devi": [
        "🌌 Gaz devleri devasa ve büyüleyicidir!",
        "✨ Şimdi bir gaz devi oluşturmak ister misin?",
        "💫 Çoğunlukla hidrojen ve helyumdan oluşurlar!",
        "🔭 Bir gaz devinin türbülanslı atmosferini simüle edelim mi?",
        "🌠 İlginç bilgi: Jüpiter güneş sistemimizdeki en büyük gaz devidir!",
        "🚀 Gaz devlerinin ince halkaları ve çok sayıda uydusu olduğunu biliyor muydun?",
        "📊 İpucu: Atmosferde bulutların nasıl oluştuğunu görmek için 'Gazlı' modunu kullan",
        "🌍 Gaz devlerinin katı yüzeyi yoktur - gaz devleridir!",
        "💥 Bir gaz devinde dev fırtına nasıl oluşur görmek ister misin?",
        "🌡️ Gaz devlerinin sıcaklığı atmosfer derinliğine göre değişir!",
        "🔄 Bir yıldızın yörüngesinde dönen çoklu gaz devli bir sistem oluşturalım mı?",
        "✨ Gaz devleri güneş sisteminin dinamiği için önemlidir!",
        "🌌 Güneş sistemimizin dışında ötegezegen gaz devleri olduğunu biliyor muydun?",
        "💫 Meydan okuma: Muhteşem halkalara sahip bir gaz devi oluştur!",
        "📈 Çoğu gaz devinin kayalık veya metalik çekirdekleri vardır!",
        "🌠 İpucu: Atmosferde dev kasırgalar görmek için 'Fırtına Efektleri'ni etkinleştir",
        "🚀 Bir gaz devinin bulutları arasında yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Gaz devlerinin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Neptün güneş sistemindeki en hızlı rüzgarlara sahiptir!",
        "✨ Gaz devlerinin nasıl karmaşık sistemler oluşturduğunu öğrenmek ister misin?"
    ],
    "kahverengi cüce": [
        "🌌 Kahverengi cüceler başarısız yıldızlardır - nükleer füzyon yapamazlar!",
        "✨ Şimdi bir kahverengi cüce oluşturmak ister misin?",
        "💫 Kütleleri Jüpiter'in 13 ila 80 katıdır!",
        "🔭 Bir kahverengi cücenin yoğun atmosferini simüle edelim mi?",
        "🌠 İlginç bilgi: Kahverengi cüceler kızılötesi ışık yayar ama çıplak gözle görünmezler!",
        "🚀 Kahverengi cücelerin etrafında gezegenlerin dönebileceğini biliyor muydun?",
        "📊 İpucu: Yerçekimiyle nasıl etkileştiklerini görmek için 'Kahverengi Cüce' modunu kullan",
        "🌍 Kahverengi cüceler normal yıldızlardan daha soğuktur - 1000K altı sıcaklıklar!",
        "💥 Bir kahverengi cücenin yıldızlararası maddeyi nasıl yakalayabileceğini görmek ister misin?",
        "🌡️ Kahverengi cücelerin sıcaklığı kütle ve yaşa bağlıdır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu kahverengi cüceli bir sistem oluşturalım mı?",
        "✨ Kahverengi cüceler yıldız oluşumunun kalıntılarıdır!",
        "🌌 Galakside serbestçe dolaşan kahverengi cüceler olduğunu biliyor muydun?",
        "💫 Meydan okuma: Etrafında gezegen öncesi disk olan bir kahverengi cüce oluştur!",
        "📈 Çoğu kahverengi cüce metan ve su bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir kahverengi cüceyi incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Kahverengi cücelerin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Kahverengi cüceler galakside normal yıldızlardan daha yaygın olabilir!",
        "✨ Kahverengi cücelerin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "kırmızı cüce": [
        "🌌 Kırmızı cüceler evrendeki en yaygın yıldızlardır!",
        "✨ Şimdi bir kırmızı cüce oluşturmak ister misin?",
        "💫 Küçük, soğuk ve düşük parlaklığa sahiptirler!",
        "🔭 Bir kırmızı cücenin yörüngesindeki gezegen atmosferini simüle edelim mi?",
        "🌠 İlginç bilgi: Kırmızı cüceler trilyonlarca yıl yaşayabilir!",
        "🚀 Pek çok ötegezegenin kırmızı cücelerin yörüngesinde bulunduğunu biliyor muydun?",
        "📊 İpucu: Yakındaki gezegenleri nasıl etkilediklerini görmek için 'Kırmızı Cüce' modunu kullan",
        "🌍 Kırmızı cüceler kararlıdır ve yakın yaşanabilir bölgelere sahip olabilir!",
        "💥 Bir kırmızı cücenin nasıl şiddetli güneş patlamaları yapabileceğini görmek ister misin?",
        "🌡️ Kırmızı cücelerin sıcaklığı 2000K ile 4000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu kırmızı cüceli bir sistem oluşturalım mı?",
        "✨ Kırmızı cüceler dünya dışı yaşam arayışı için çok önemlidir!",
        "🌌 Bazı kırmızı cücelerin yaşanabilir bölgede kayalık gezegenlere sahip olduğunu biliyor muydun?",
        "💫 Meydan okuma: Kırmızı cüce ve yaşanabilir gezegenli bir sistem oluştur!",
        "📈 Çoğu kırmızı cüce hidrojen ve helyum bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir kırmızı cüceyi incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Kırmızı cücelerin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Kırmızı cüceler Güneş'ten daha soğuktur ama yine de parlaktır!",
        "✨ Kırmızı cücelerin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "dev yıldız": [
        "🌌 Dev yıldızlar muazzam ve parlaktır!",
        "✨ Şimdi bir dev yıldız oluşturmak ister misin?",
        "💫 Kütleleri Güneş'in 10 ila 100 katıdır!",
        "🔭 Bir dev yıldızın yoğun nükleer füzyonunu simüle edelim mi?",
        "🌠 İlginç bilgi: Dev yıldızların çapı Güneş'in yüzlerce katı olabilir!",
        "🚀 Dev yıldızların yaşam sonunda süpernova olabileceğini biliyor muydun?",
        "📊 İpucu: Yakındaki gezegenleri nasıl etkilediklerini görmek için 'Dev Yıldız' modunu kullan",
        "🌍 Dev yıldızlar yoğun atmosferlere sahiptir ve etraflarında gezegenler dönebilir!",
        "💥 Bir dev yıldızın yıldız rüzgarlarıyla nasıl kütle kaybettiğini görmek ister misin?",
        "🌡️ Dev yıldızların sıcaklığı 3000K ile 6000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu dev yıldızlı bir sistem oluşturalım mı?",
        "✨ Dev yıldızlar evrende ağır elementlerin oluşumu için çok önemlidir!",
        "🌌 Bazı dev yıldızların etrafında halkalar olduğunu biliyor muydun?",
        "💫 Meydan okuma: Dev bir yıldız ve gaz devi gezegenli bir sistem oluştur!",
        "📈 Çoğu dev yıldız hidrojen ve helyum bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir dev yıldızı incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Dev yıldızların yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Dev yıldızlar en parlak süpernovaların öncüleridir!",
        "✨ Dev yıldızların nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "hiperdev": [
        "🌌 Hiperdevler evrendeki en büyük kütleli ve en parlak yıldızlardır!",
        "✨ Şimdi bir hiperdev oluşturmak ister misin?",
        "💫 Kütleleri Güneş'in 100 katından fazladır!",
        "🔭 Bir hiperdevin aşırı nükleer füzyonunu simüle edelim mi?",
        "🌠 İlginç bilgi: Hiperdevlerin çapı Güneş'in binlerce katı olabilir!",
        "🚀 Hiperdevlerin şiddetli yıldız rüzgarlarıyla kütle kaybedebileceğini biliyor muydun?",
        "📊 İpucu: Yakındaki gezegenleri nasıl etkilediklerini görmek için 'Hiperdev' modunu kullan",
        "🌍 Hiperdevler yoğun atmosferlere sahiptir ve etraflarında gezegenler dönebilir!",
        "💥 Bir hiperdevin nasıl parlak bir süpernovaya dönüşebileceğini görmek ister misin?",
        "🌡️ Hiperdevlerin sıcaklığı 3000K ile 6000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu hiperdevli bir sistem oluşturalım mı?",
        "✨ Hiperdevler evrende ağır elementlerin oluşumu için çok önemlidir!",
        "🌌 Bazı hiperdevlerin etrafında halkalar olduğunu biliyor muydun?",
        "💫 Meydan okuma: Hiperdev ve dev gaz gezegenli bir sistem oluştur!",
        "📈 Çoğu hiperdev hidrojen ve helyum bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir hiperdevi incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Hiperdevlerin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Hiperdevler evrendeki en parlak süpernovaların öncüleridir!",
        "✨ Hiperdevlerin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "devasa yıldız": [
        "🌌 Devasa yıldızlar evrenin devleridir!",
        "✨ Şimdi bir devasa yıldız oluşturmak ister misin?",
        "💫 Kütleleri Güneş'in 8 katından fazladır!",
        "🔭 Bir devasa yıldızın yoğun nükleer füzyonunu simüle edelim mi?",
        "🌠 İlginç bilgi: Devasa yıldızların çapı Güneş'in onlarca katı olabilir!",
        "🚀 Devasa yıldızların yaşam sonunda süpernova olabileceğini biliyor muydun?",
        "📊 İpucu: Yakındaki gezegenleri nasıl etkilediklerini görmek için 'Devasa Yıldız' modunu kullan",
        "🌍 Devasa yıldızlar yoğun atmosferlere sahiptir ve etraflarında gezegenler dönebilir!",
        "💥 Bir devasa yıldızın yıldız rüzgarlarıyla nasıl kütle kaybettiğini görmek ister misin?",
        "🌡️ Devasa yıldızların sıcaklığı 3000K ile 6000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu devasa yıldızlı bir sistem oluşturalım mı?",
        "✨ Devasa yıldızlar evrende ağır elementlerin oluşumu için çok önemlidir!",
        "🌌 Bazı devasa yıldızların etrafında halkalar olduğunu biliyor muydun?",
        "💫 Meydan okuma: Devasa bir yıldız ve dev gaz gezegenli bir sistem oluştur!",
        "📈 Çoğu devasa yıldız hidrojen ve helyum bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir devasa yıldızı incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Devasa yıldızların yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Devasa yıldızlar en parlak süpernovaların öncüleridir!",
        "✨ Devasa yıldızların nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "hipermassive": [
        "🌌 Hipermassive yıldızlar aşırı büyük kütleli ve parlak yıldızlardır!",
        "✨ Şimdi bir hipermassive yıldız oluşturmak ister misin?",
        "💫 Kütleleri Güneş'in 100 katından fazladır!",
        "🔭 Bir hipermassive yıldızın aşırı nükleer füzyonunu simüle edelim mi?",
        "🌠 İlginç bilgi: Hipermassive yıldızların çapı Güneş'in binlerce katı olabilir!",
        "🚀 Hipermassive yıldızların şiddetli yıldız rüzgarlarıyla kütle kaybedebileceğini biliyor muydun?",
        "📊 İpucu: Yakındaki gezegenleri nasıl etkilediklerini görmek için 'Hipermassive' modunu kullan",
        "🌍 Hipermassive yıldızlar yoğun atmosferlere sahiptir ve etraflarında gezegenler dönebilir!",
        "💥 Bir hipermassive yıldızın nasıl parlak bir süpernovaya dönüşebileceğini görmek ister misin?",
        "🌡️ Hipermassive yıldızların sıcaklığı 3000K ile 6000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu hipermassive yıldızlı bir sistem oluşturalım mı?",
        "✨ Hipermassive yıldızlar evrende ağır elementlerin oluşumu için çok önemlidir!",
        "🌌 Bazı hipermassive yıldızların etrafında halkalar olduğunu biliyor muydun?",
        "💫 Meydan okuma: Hipermassive yıldız ve dev gaz gezegenli bir sistem oluştur!",
        "📈 Çoğu hipermassive yıldız hidrojen ve helyum bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Bir hipermassive yıldızı incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Hipermassive yıldızların yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Hipermassive yıldızlar evrendeki en parlak süpernovaların öncüleridir!",
        "✨ Hipermassive yıldızların nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "beyaz cüce": [
        "🌌 Beyaz cüceler yakıtını tüketmiş yıldızların kalıntılarıdır!",
        "✨ Şimdi bir beyaz cüce oluşturmak ister misin?",
        "💫 Kütleleri Güneş'e benzer ama çok daha küçüktürler!",
        "🔭 Bir beyaz cücenin zamanla nasıl yavaşça soğuduğunu simüle edelim mi?",
        "🌠 İlginç bilgi: Beyaz cüceler o kadar yoğundur ki bir çay kaşığı tonlarca ağırlığındadır!",
        "🚀 Beyaz cücelerin helyum veya hidrojenden oluşan ince atmosferleri olabileceğini biliyor muydun?",
        "📊 İpucu: Çevreyle nasıl etkileştiklerini görmek için 'Beyaz Cüce' modunu kullan",
        "🌍 Beyaz cüceler Güneş gibi yıldızların nihai kaderidir!",
        "💥 Bir beyaz cücenin yoldaş yıldızdan nasıl madde biriktirebileceğini görmek ister misin?",
        "🌡️ Beyaz cücelerin sıcaklığı 5000K ile 100000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu beyaz cüceli bir sistem oluşturalım mı?",
        "✨ Beyaz cüceler yıldız evrimini anlamak için çok önemlidir!",
        "🌌 Bazı beyaz cücelerin Ia tipi süpernova olarak patlayabileceğini biliyor muydun?",
        "💫 Meydan okuma: Beyaz cüce ve kayalık gezegenli bir sistem oluştur!",
        "📈 Çoğu beyaz cüce karbon ve oksijen bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Zamanla nasıl soğuduklarını görmek için 'Soğutma Efektleri'ni etkinleştir",
        "🚀 Bir beyaz cüceyi incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Beyaz cücelerin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Beyaz cüceler süpernova olmayan yıldızların son kalıntılarıdır!",
        "✨ Beyaz cücelerin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "helyum beyaz cücesi": [
        "🌌 Helyum beyaz cüceleri helyum yanmış yıldızların kalıntılarıdır!",
        "✨ Şimdi bir helyum beyaz cücesi oluşturmak ister misin?",
        "💫 Kütleleri Güneş'e benzer ama çok daha küçük ve yoğundurlar!",
        "🔭 Bir helyum beyaz cücesinin zamanla nasıl yavaşça soğuduğunu simüle edelim mi?",
        "🌠 İlginç bilgi: Helyum beyaz cüceleri o kadar yoğundur ki bir çay kaşığı tonlarca ağırlığındadır!",
        "🚀 Helyum beyaz cücelerinin helyumdan oluşan ince atmosferleri olabileceğini biliyor muydun?",
        "📊 İpucu: Çevreyle nasıl etkileştiklerini görmek için 'Helyum Beyaz Cücesi' modunu kullan",
        "🌍 Helyum beyaz cüceleri çekirdeklerinde helyum yanmış yıldızların nihai kaderidir!",
        "💥 Bir helyum beyaz cücesinin yoldaş yıldızdan nasıl madde biriktirebileceğini görmek ister misin?",
        "🌡️ Helyum beyaz cücelerinin sıcaklığı 5000K ile 100000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu helyum beyaz cüceli bir sistem oluşturalım mı?",
        "✨ Helyum beyaz cüceleri yıldız evrimini anlamak için çok önemlidir!",
        "🌌 Bazı helyum beyaz cücelerinin .Ia tipi süpernova olarak patlayabileceğini biliyor muydun?",
        "💫 Meydan okuma: Helyum beyaz cücesi ve kayalık gezegenli bir sistem oluştur!",
        "📈 Çoğu helyum beyaz cücesi helyum ve karbon bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Zamanla nasıl soğuduklarını görmek için 'Soğutma Efektleri'ni etkinleştir",
        "🚀 Bir helyum beyaz cücesini incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Helyum beyaz cücelerinin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Helyum beyaz cüceleri helyum yanmış yıldızların son kalıntılarıdır!",
        "✨ Helyum beyaz cücelerinin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "karbon beyaz cücesi": [
        "🌌 Karbon beyaz cüceleri karbon yanmış yıldızların kalıntılarıdır!",
        "✨ Şimdi bir karbon beyaz cücesi oluşturmak ister misin?",
        "💫 Kütleleri Güneş'e benzer ama çok daha küçük ve yoğundurlar!",
        "🔭 Bir karbon beyaz cücesinin zamanla nasıl yavaşça soğuduğunu simüle edelim mi?",
        "🌠 İlginç bilgi: Karbon beyaz cüceleri o kadar yoğundur ki bir çay kaşığı tonlarca ağırlığındadır!",
        "🚀 Karbon beyaz cücelerinin karbondan oluşan ince atmosferleri olabileceğini biliyor muydun?",
        "📊 İpucu: Çevreyle nasıl etkileştiklerini görmek için 'Karbon Beyaz Cücesi' modunu kullan",
        "🌍 Karbon beyaz cüceleri çekirdeklerinde karbon yanmış yıldızların nihai kaderidir!",
        "💥 Bir karbon beyaz cücesinin yoldaş yıldızdan nasıl madde biriktirebileceğini görmek ister misin?",
        "🌡️ Karbon beyaz cücelerinin sıcaklığı 5000K ile 100000K arasındadır!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu karbon beyaz cüceli bir sistem oluşturalım mı?",
        "✨ Karbon beyaz cüceleri yıldız evrimini anlamak için çok önemlidir!",
        "🌌 Bazı karbon beyaz cücelerinin .Ia tipi süpernova olarak patlayabileceğini biliyor muydun?",
        "💫 Meydan okuma: Karbon beyaz cücesi ve kayalık gezegenli bir sistem oluştur!",
        "📈 Çoğu karbon beyaz cücesi karbon ve oksijen bakımından zengin atmosferlere sahiptir!",
        "🌠 İpucu: Zamanla nasıl soğuduklarını görmek için 'Soğutma Efektleri'ni etkinleştir",
        "🚀 Bir karbon beyaz cücesini incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Karbon beyaz cücelerinin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Karbon beyaz cüceleri karbon yanmış yıldızların son kalıntılarıdır!",
        "✨ Karbon beyaz cücelerinin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "siyah cüce": [
        "🌌 Siyah cüceler beyaz cücelerin milyarlarca yıl sonraki nihai kaderidir!",
        "✨ Şimdi bir siyah cüce oluşturmak ister misin?",
        "💫 Tamamen soğumuş ve artık görünür ışık yaymayan beyaz cücelerdir!",
        "🔭 Bir beyaz cücenin siyah cüceye dönüşmesini simüle edelim mi?",
        "🌠 İlginç bilgi: Siyah cüceler o kadar soğuktur ki doğrudan gözlemlenemezler!",
        "🚀 Siyah cücelerin teorik olduğunu ve evrende henüz gözlemlenmediğini biliyor muydun?",
        "📊 İpucu: Zamanla çevreyle nasıl etkileştiklerini görmek için 'Siyah Cüce' modunu kullan",
        "🌍 Siyah cüceler yakıtını tüketmiş yıldızların nihai kalıntılarıdır!",
        "💥 Bir beyaz cücenin yavaşça siyah cüceye dönüşmesini görmek ister misin?",
        "🌡️ Siyah cücelerin sıcaklığı mutlak sıfıra yakındır, bu yüzden görünmezler!",
        "🔄 Daha büyük bir yıldızın yörüngesinde dönen çoklu siyah cüceli bir sistem oluşturalım mı?",
        "✨ Siyah cüceler uzun vadeli yıldız evrimini anlamak için çok önemlidir!",
        "🌌 Siyah cücelerin tamamen oluşmasının trilyonlarca yıl alacağını biliyor muydun?",
        "💫 Meydan okuma: Siyah cüce ve etrafında kayalık gezegenler olan bir sistem oluştur!",
        "📈 Çoğu siyah cücenin çok ince veya hiç atmosferi olmaz!",
        "🌠 İpucu: Zamanla nasıl soğuduklarını görmek için 'Soğutma Efektleri'ni etkinleştir",
        "🚀 Teorik bir siyah cüceyi incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Siyah cücelerin yakındaki gezegenlerin yörüngelerini nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Siyah cüceler milyarlarca yıl sonra yıldız evriminin nihai sonucudur!",
        "✨ Siyah cücelerin nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "kuasar": [
        "🌌 Kuasarlar uzak galaksilerin parlak çekirdekleridir!",
        "✨ Şimdi bir kuasar oluşturmak ister misin?",
        "💫 Süper kütleli birikim diskleri tarafından beslenirler!",
        "🔭 Bir kuasarın yoğun radyasyon yayılımını simüle edelim mi?",
        "🌠 İlginç bilgi: Kuasarlar Güneş'ten milyarlarca kat daha parlak olabilir!",
        "🚀 Kuasarların evrendeki en parlak nesnelerden bazıları olduğunu biliyor muydun?",
        "📊 İpucu: Etraflarındaki galaksileri nasıl etkilediklerini görmek için 'Kuasar' modunu kullan",
        "🌍 Kuasarlar aktif ve uzak galaksilerin merkezinde bulunur!",
        "💥 Bir kuasarın nasıl göreli madde jetleri yayabileceğini görmek ister misin?",
        "🌡️ Kuasarların sıcaklığı milyarlarca Kelvin derecesini aşabilir!",
        "🔄 Etrafında birden fazla galaksinin döndüğü kuasarlı bir sistem oluşturalım mı?",
        "✨ Kuasarlar galaksi evrimini anlamak için çok önemlidir!",
        "🌌 Kuasarların evrenin genişlemesini incelemek için kullanılabileceğini biliyor muydun?",
        "💫 Meydan okuma: Birikim diski ve göreli jetleri olan bir kuasar oluştur!",
        "📈 Çoğu kuasarın süper kütleli çekirdeği vardır (milyonlarca - milyarlarca güneş kütlesi)!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Radyasyon Efektleri'ni etkinleştir",
        "🚀 Uzak bir kuasarı incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Kuasarların zamanla galaksi oluşumunu nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Kuasarlar milyarlarca yıl önce genç evrende daha yaygındı!",
        "✨ Kuasarların nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "solucan deliği": [
        "🌌 Solucan delikleri uzay-zamanda teorik tünellerdir!",
        "✨ Şimdi bir solucan deliği oluşturmak ister misin?",
        "💫 Evrenin uzak noktalarını kısayolla birbirine bağlarlar!",
        "🔭 Bir solucan deliği etrafında uzay-zaman eğriliğini simüle edelim mi?",
        "🌠 İlginç bilgi: Solucan delikleri genel görelilik denklemlerinin çözümleridir!",
        "🚀 Solucan deliklerinin ışıktan hızlı yolculuğa izin verebileceğini biliyor muydun?",
        "📊 İpucu: Etraflarındaki uzayı nasıl etkilediklerini görmek için 'Solucan Deliği' modunu kullan",
        "🌍 Solucan delikleri varsayımsaldır ve evrende henüz gözlemlenmemiştir!",
        "💥 Bir solucan deliğinin etrafındaki ışığı nasıl büktüğünü görmek ister misin?",
        "🌡️ Bir solucan deliğinin sıcaklığı teoriktir ve yapısına bağlıdır!",
        "🔄 Uzayın iki bölgesini birbirine bağlayan solucan delikli bir sistem oluşturalım mı?",
        "✨ Solucan delikleri görelilik teorisini ve evrenin yapısını anlamak için çok önemlidir!",
        "🌌 Solucan deliklerinin zaman yolculuğu için kullanılabileceğini biliyor muydun?",
        "💫 Meydan okuma: Kararlı bir solucan deliği oluştur ve özelliklerini keşfet!",
        "📈 Çoğu solucan deliği teoriktir ve fiziksel temsili yoktur!",
        "🌠 İpucu: Etraflarındaki uzayı nasıl büktüklerini görmek için 'Eğrilik Efektleri'ni etkinleştir",
        "🚀 Başka bir galaksiye solucan deliğiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Solucan deliklerinin uzay-zaman yapısını nasıl etkileyebileceğini inceleyelim mi?",
        "💥 İlginç bilgi: Solucan delikleri bilim kurguda diğer boyutlara geçiş olarak popülerdir!",
        "✨ Solucan deliklerinin teorize edilişini ve etkilerini öğrenmek ister misin?"
    ],
    "nötron yıldızı": [
        "🌌 Nötron yıldızları süpernova kalıntılarıdır!",
        "✨ Şimdi bir nötron yıldızı oluşturmak ister misin?",
        "💫 Neredeyse tamamen nötronlardan oluşurlar ve aşırı yoğundurlar!",
        "🔭 Bir nötron yıldızının yoğun yerçekimini simüle edelim mi?",
        "🌠 İlginç bilgi: Bir nötron yıldızı maddesinin bir çay kaşığı milyarlarca ton ağırlığındadır!",
        "🚀 Nötron yıldızlarının hızla dönerek radyasyon demetleri yayabileceğini biliyor muydun?",
        "📊 İpucu: Etraflarındaki uzayı nasıl etkilediklerini görmek için 'Nötron Yıldızı' modunu kullan",
        "🌍 Nötron yıldızları büyük kütleli yıldızlar süpernova olduktan sonra çökerken oluşur!",
        "💥 Bir nötron yıldızının nasıl güçlü gama ışınları yayabileceğini görmek ister misin?",
        "🌡️ Nötron yıldızlarının sıcaklığı milyonlarca Kelvin derecesini aşabilir!",
        "🔄 Etrafında gezegenlerin döndüğü nötron yıldızlı bir sistem oluşturalım mı?",
        "✨ Nötron yıldızları yıldız evrimini ve nükleer fiziği anlamak için çok önemlidir!",
        "🌌 Bazı nötron yıldızlarının pulsar veya magnetar olabileceğini biliyor muydun?",
        "💫 Meydan okuma: Yoğun manyetik alana sahip bir nötron yıldızı oluştur!",
        "📈 Çoğu nötron yıldızının kütlesi Güneş'in 1.4 ila 2.16 katıdır!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Manyetik Efektler'ni etkinleştir",
        "🚀 Bir nötron yıldızını incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Nötron yıldızlarının zamanla galaksi oluşumunu nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Nötron yıldızları evrendeki bilinen en yoğun nesnelerdir!",
        "✨ Nötron yıldızlarının nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "magnetar": [
        "🌌 Magnetarlar aşırı güçlü manyetik alanlara sahip nötron yıldızlarıdır!",
        "✨ Şimdi bir magnetar oluşturmak ister misin?",
        "💫 Manyetik alanları Dünya'nınkinden trilyonlarca kat daha güçlüdür!",
        "🔭 Bir magnetarın yoğun radyasyon yayılımını simüle edelim mi?",
        "🌠 İlginç bilgi: Magnetarlar SGR denilen güçlü gama ışını patlamaları yapabilir!",
        "🚀 Magnetarların manyetik dalgalarla çevrelerindeki uzayı etkileyebileceğini biliyor muydun?",
        "📊 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Magnetar' modunu kullan",
        "🌍 Magnetarlar, nötron yıldızları yoğun manyetik alanlarla çökerken oluşur!",
        "💥 Bir magnetarın nasıl göreli madde jetleri yayabileceğini görmek ister misin?",
        "🌡️ Magnetarların sıcaklığı milyonlarca Kelvin derecesini aşabilir!",
        "🔄 Etrafında gezegenlerin döndüğü magnetarlı bir sistem oluşturalım mı?",
        "✨ Magnetarlar yıldız evrimini ve manyetik fiziği anlamak için çok önemlidir!",
        "🌌 Magnetarların ilişkili pulsarlara sahip olabileceğini biliyor muydun?",
        "💫 Meydan okuma: Yoğun manyetik alana sahip bir magnetar oluştur ve etkilerini gözlemle!",
        "📈 Çoğu magnetarın kütlesi Güneş'in 1.4 ila 2.16 katıdır!",
        "🌠 İpucu: Çevreyi nasıl etkilediklerini görmek için 'Manyetik Efektler'ni etkinleştir",
        "🚀 Bir magnetarı incelemek için uzay gemisiyle yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Magnetarların zamanla galaksi oluşumunu nasıl etkilediğini inceleyelim mi?",
        "💥 İlginç bilgi: Magnetarlar evrendeki bilinen en manyetik nesnelerdir!",
        "✨ Magnetarların nasıl oluşup evrimleştiğini öğrenmek ister misin?"
    ],
    "kuark yıldızı": [
        "🌌 Kuark yıldızları nötron yıldızlarının teorik kalıntılarıdır!",
        "✨ Şimdi bir kuark yıldızı oluşturmak ister misin?",
        "💫 Kuark ve gluonlardan oluşurlar, egzotik bir madde oluştururlar!",
        "🔭 Bir kuark yıldızının aşırı yoğunluğunu simüle edelim mi?",
        "🌠 İlginç bilgi: Kuark yıldızları nötron yıldızlarından daha yoğun olabilir!",
        "🚀 Kuark yıldızlarının varsayımsal olduğunu ve henüz gözlemlenmediğini biliyor muydun?",
        "📊 İpucu: Etraflarındaki uzayı nasıl etkilediklerini görmek için 'Kuark Yıldızı' modunu kullan",
        "🌍 Kuark yıldızları, nötron yıldızları daha da çöktüğünde oluşur!",
        "💥 Bir kuark yıldızının nasıl yoğun radyasyon yayabileceğini görmek ister misin?",
        "🌡️ Kuark yıldızlarının sıcaklığı teoriktir ve yapısına bağlıdır!",
        "🔄 Etrafında gezegenlerin döndüğü kuark yıldızlı bir sistem oluşturalım mı?",
        "✨ Kuark yıldızları aşırı koşullarda parçacık fiziğini anlamak için çok önemlidir!",
        "🌌 Kuark yıldızlarının bileşimleri nedeniyle benzersiz özelliklere sahip olabileceğini biliyor muydun?",
        "💫 Meydan okuma: Bir kuark yıldızı oluştur ve egzotik özelliklerini keşfet!",
        "📈 Çoğu kuark yıldızı teoriktir ve fiziksel temsili yoktur!",
        "🌠 İpucu: Etraflarındaki uzayı nasıl büktüklerini görmek için 'Egzotik Efektler'ni etkinleştir",
        "🚀 Bir kuark yıldızının çekirdeğinden geçerek yolculuk etmeyi hiç hayal ettin mi?",
        "🔭 Kuark yıldızlarının uzay-zaman yapısını nasıl etkileyebileceğini inceleyelim mi?",
        "💥 İlginç bilgi: Kuark yıldızları modern astrofiziğin gizemlerinden biridir!",
        "✨ Kuark yıldızlarının teorize edilişini ve etkilerini öğrenmek ister misin?"
    ]
};

const contextFollowUps = {
    "default": [
        "✨ Bu kozmik açıklamayı nasıl buldun?",
        "🚀 Başka bir şey için yardımcı olabilir miyim?",
        "🌌 İlginç, değil mi? Evren büyüleyici!",
        "💫 Bu konuyu daha fazla keşfetmek ister misin?",
        "🔭 Kozmik bilgiyi paylaştığım için mutluyum!",
        "🪐 Bununla ilgili başka sorunuz var mı?",
        "🌟 Bugün harika bir şey öğrendik, sence de öyle değil mi?",
        "⚡ Evren bizi şaşırtmayı asla bırakmıyor!",
        "🌠 Herhangi bir yönü daha ayrıntılı açıklamamı ister misin?",
        "🌀 Şimdi birlikte bir şeyler yaratmaya ne dersin?",
        "📡 Merakınız, keşfin yakıtıdır!",
        "🌍 Kozmosta seni en çok ne büyülüyor?",
        "☄️ Bir sonraki yıldız sorunuza hazır mısınız?",
        "🛸 Unutmayın: Her soru bir kozmik yolculuktur!",
        "💥 Pratik bir deney denemek ister misin?",
        "⏳ Bilgi, gerçek zaman yolculuğudur!",
        "📊 Bunu oyunda nasıl uygulayacağınızı gösterebilir miyim?",
        "🌡️ Sorularınız yapay zekâ çekirdeğimi ısıtıyor!",
        "🔢 Birlikte bir şeyler hesaplamaya ne dersiniz?",
        "🌈 Evren, merakınız için teşekkür eder!"
    ]
};

const contextSystem = {
    lastTopic: null,
    lastFollowUp: null,
    
    affirmativeResponses: ["evet", "e", "yes", "y", "tabii", "kesinlikle", "tamam", "hadi", "olabilir", "lütfen"],
    negativeResponses: ["hayır", "h", "no", "n", "negatif", "olmaz", "belki sonra", "şimdi olmaz"],
    
    positiveResponses: {
        "kara delik": [
            "🌌 Hadi simüle edelim! Önce, bir kara deliğin yakınına 1e30 kütleli bir yıldız oluşturun...",
            "💥 Harika! Bir yıldızı yığılma diskine sürükleyin ve şovu görmek için yavaş çekimi etkinleştirin",
            "⚠️ Dikkat: Uzay-zaman deformasyonunu görmek için Seçenekler > Fizik'ten 'Rölativistik Etkiler'i açın",
            "🔥 İpucu: Daha dramatik madde fırlatmaları için >20 güneş kütleli yıldızlar kullanın",
            "🕳️ Adım adım: 1) Kara delik oluştur 2) Yakına yıldız ekle 3) Yerçekimini %200 artır",
            "⏱️ Tüm süreci birkaç saniyede görmek için zamanı 10000x hızlandırın",
            "📡 Milyonlarca °C'yi görmek için 'Termal Bölgeler'i açmayı unutmayın",
            "🌀 İlginç bilgi: Bu süreç evrenin gerçek zamanında saatlerden milyonlarca yıla kadar sürebilir",
            "💫 Görsel şölen için süper kütleli kara delikler (>1e15 kütle) deneyin",
            "🌠 Farklı yaklaşma açılarıyla farklı disk desenleri görün"
        ],
        "kuyruklu yıldız": [
            "☄️ Hadi başlayalım! 'Gök Cisimleri Oluştur' > 'Kuyruklu Yıldız' seçin ve sıcaklığı -70°C'ye ayarlayın...",
            "💧 İpucu: Yüksek su içeren kuyruklu yıldızlar (>%60) daha parlak kuyruklar oluşturur",
            "🚀 Açısal hız vermek için fareyi sürükleyin - bu çekirdeğin dönüşünü etkiler",
            "❄️ Süblimleşmeyi görmek için kuyruklu yıldızı O veya B sınıfı bir yıldıza yaklaştırın",
            "🌌 Farklı dışmerkezlikler deneyin: >0.9 ile uzun yörüngeler oluşturun",
            "⏱️ Çoklu yörüngeleri hızlıca görmek için 100000x modunu kullanın",
            "🔭 Etki eden kütleçekim kuvvetlerini görmek için 'Vektörleri Göster'i açın",
            "🌠 İlginç bilgi: Her yıldız geçişi kuyruklu yıldızın kütlesini %0.01 azaltır",
            "🪐 Sanal Jüpiter ile bir kuyruklu yıldız yakalamayı deneyin - kütle > 1e27 birim",
            "📈 İleri ipucu: Gezegenlerle 2:1 rezonansta olan kuyruklu yıldızlar kararlı yörüngelere sahiptir"
        ],
        "yerçekimi": [
            "⚖️ Hadi deneyelim! Menü > Fizik > Yerçekimi Sabiti...",
            "🌌 Bulutsu simülasyonu için %10, yoğun yıldız sistemleri için %300 deneyin",
            "💥 Dikkat: %500'den büyük değerler karmaşık sistemlerde dengesizliğe neden olabilir",
            "🔄 İpucu: Yüksek yerçekimli çift yıldız sistemleri daha hızlı evrimleşir",
            "🪐 Yerçekimi dalgaları görmek için iki kara deliği yakın konuma getirin",
            "🌠 Kütleçekim alanlarını görmek için 'Kuvvet Görselleştirme'yi (F3) açın",
            "📉 Gezegen göçü sırasında yerçekimini azaltmayı deneyin",
            "🌀 İlginç etki: Yüksek yerçekimi + hızlı dönüş yassı gezegenler oluşturur",
            "🔭 Unutmayın: Kara deliklerin 1000x sabit yerçekimi çarpanı vardır",
            "💫 Mücadele: 20 cisimli bir sistemde %200 yerçekimiyle kararlılık sağlayın"
        ],
        "yıldız": [
            "⭐ Hadi oluşturalım! 'Yıldızsal Cisimler' seçin ve tipi belirleyin...",
            "🌞 Güneş benzeri bir yıldız için: kütle ~1.989e30 kg (1 güneş birimi)",
            "💥 İpucu: 20 güneş kütlesinden büyük yıldızlar süpernova olarak patlar",
            "🌈 Yoğun mavi yıldızlar için sıcaklığı >30,000K'ye ayarlayın",
            "🔄 Kütle aktarımı olan çift yıldız sistemleri deneyin",
            "🌌 Genç Popülasyon I yıldızları için yüksek metaliklik kullanın",
            "⏱️ Tam yıldız evrimini görmek için zamanı hızlandırın",
            "⚠️ Dikkat: >100 güneş kütleli yıldızlar kararsız olabilir",
            "🔭 Dönüşümleri görmek için Seçenekler'den 'Yıldız Evrimi'ni açın",
            "🌠 Nötron yıldızları için >1.4 güneş kütleli süpernovalar oluşturun"
        ],
        "gezegen": [
            "🪐 Hadi başlayalım! 'Gezegensel Cisimler' menüsü > Tip seçin...",
            "🌍 Yaşanabilir gezegen için: yeşil bölgede konumlandırın, su %50, atmosfer %80",
            "🌋 Aşırı kompozisyonlar deneyin: karbon veya demir gezegenler",
            "🌀 İklim ve şekil üzerindeki etkileri görmek için dönüş periyodunu ayarlayın",
            "💫 İpucu: Gaz devleri için >105K birim kütle gerekir",
            "🌌 Gezegen göçü etkin sistemler oluşturun",
            "🌠 Gezegen halkaları için özellikler menüsünden kalınlık ve yoğunluğu ayarlayın",
            "⚠️ Roche mesafesinden yakın uydular parçalanır",
            "🔭 Yüzey detaylarını görmek için 'Gözlemevi' modunu (O) kullanın",
            "🌡️ Otomatik sınıf değişimleri için aşırı sıcaklıklar deneyin"
        ],
        "meteoroid": [
            "🌠 Bir meteoroid oluşturalım! 'Gök Cisimleri Oluştur' > 'Meteoroid'...",
            "💫 İpucu: Farklı etki efektleri için yoğunluğu ayarlayın",
            "🪨 Atmosfere girişi gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Büyük meteoroidler (>100m) kitlesel yok oluşa neden olabilir",
            "🌌 Farklı kompozisyonlar deneyin: metalik, kayalık, buzlu",
            "🔭 Olası çarpışmaları görmek için 'Çarpışma Yörüngesi'ni açın",
            "📈 Meteor yağmuru görmek için zamanı hızlandırın",
            "🌠 İlginç bilgi: Meteoroidler asteroid veya kuyruklu yıldız parçalarıdır",
            "💥 Patlama simülasyonu için giriş hızını >20 km/s'ye ayarlayın",
            "🌀 Mücadele: Aynı anda çarpışan 10 meteoroidli sistem oluşturun"
        ],
        "meteor": [
            "🌠 Bir meteor oluşturalım! 'Gök Cisimleri Oluştur' > 'Meteor'...",
            "💫 İpucu: Farklı etki efektleri için yoğunluğu ayarlayın",
            "🪨 Atmosfere girişi gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Büyük meteorlar (>100m) kitlesel yok oluşa neden olabilir",
            "🌌 Farklı kompozisyonlar deneyin: metalik, kayalık, buzlu",
            "🔭 Olası çarpışmaları görmek için 'Çarpışma Yörüngesi'ni açın",
            "📈 Meteor yağmuru görmek için zamanı hızlandırın",
            "🌠 İlginç bilgi: Meteorlar asteroid veya kuyruklu yıldız parçalarıdır",
            "💥 Patlama simülasyonu için giriş hızını >20 km/s'ye ayarlayın",
            "🌀 Mücadele: Aynı anda çarpışan 10 meteorlu sistem oluşturun"
        ],
        "gaz devi": [
            "🌌 Bir gaz devi oluşturalım! 'Gök Cisimleri Oluştur' > 'Gaz Devi'...",
            "💫 İpucu: Farklı atmosferik etkiler için kütleyi ayarlayın",
            "🌀 Dev fırtınaları gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Çok kütleli gaz devleri (>10x Jüpiter) kahverengi cüce olabilir",
            "🌠 Farklı atmosfer kompozisyonları deneyin: hidrojen, helyum, metan",
            "🔭 Gaz devinize halka eklemek için 'Gezegen Halkaları'nı açın",
            "📈 Atmosferik evrimi görmek için zamanı hızlandırın",
            "🌌 İlginç bilgi: Jüpiter'in Dünya'dan büyük fırtınası yüzyıllardır sürüyor!",
            "💥 Kutup ışıkları simülasyonu için gezegenin manyetik alanını ayarlayın",
            "🪐 Mücadele: Bir yıldız etrafında dönen 5 gaz devli sistem oluşturun"
        ],
        "asteroid": [
            "🪨 Bir asteroid oluşturalım! 'Gök Cisimleri Oluştur' > 'Asteroid'...",
            "🌌 İpucu: Farklı kaya kompozisyonları için yoğunluğu ayarlayın",
            "💫 Gezegenlerle çarpışmaları gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Büyük asteroidler (>1 km) kitlesel yok oluşa neden olabilir",
            "🌠 Farklı yörüngeler deneyin: eliptik, dairesel, eğimli",
            "🔭 Olası çarpışmaları görmek için 'Çarpışma Yörüngesi'ni açın",
            "📈 Asteroid göçünü görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Mars-Jüpiter arası asteroid kuşağında milyonlarca cisim var!",
            "💥 Patlama simülasyonu için çarpışma hızını >20 km/s'ye ayarlayın",
            "🌌 Mücadele: Aynı anda çarpışan 10 asteroidlü sistem oluşturun"
        ],
        "planetoid": [
            "🪐 Bir planetoid oluşturalım! 'Gök Cisimleri Oluştur' > 'Planetoid'...",
            "🌌 İpucu: Farklı jeolojik özellikler için kütleyi ayarlayın",
            "💫 Dönüş ve tektoniği gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Çok kütleli planetoidler cüce gezegen olabilir",
            "🌠 Farklı kompozisyonlar deneyin: buz, kaya, metal",
            "🔭 Planetoidinize halka eklemek için 'Gezegen Halkaları'nı açın",
            "📈 Jeolojik evrimi görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Plüton birçok astronom tarafından planetoid kabul edilir!",
            "💥 Çarpışma simülasyonu için hızı >10 km/s'ye ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 5 planetoidli sistem oluşturun"
        ],
        "solucan deliği": [
            "🌀 Bir solucan deliği oluşturalım! 'Gök Cisimleri Oluştur' > 'Solucan Deliği'...",
            "🌌 İpucu: Farklı uzay-zaman bükülmeleri için negatif kütleyi ayarlayın",
            "💫 Uzay-zaman eğriliğini gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Solucan delikleri teoriktir ve gerçekte kararsızdır",
            "🌠 Uzay-zamanda farklı giriş-çıkış noktaları deneyin",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Solucan deliği evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Solucan delikleri evrenin uzak noktalarını bağlayabilir!",
            "💥 Anlık seyahat simülasyonu için noktalar arası mesafeyi ayarlayın",
            "🌌 Mücadele: Galaksileri bağlayan 3 solucan deliği sistemi oluşturun"
        ],
        "yaşanabilir bölge": [
            "🌍 Bir yaşanabilir bölge oluşturalım! 'Gök Cisimleri Oluştur' > 'Yaşanabilir Bölge'...",
            "💫 İpucu: Farklı yaşanabilir bölgeler görmek için yıldıza uzaklığı ayarlayın",
            "🌌 Atmosfer oluşumunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Çok yakın bölgeler yoğun radyasyona maruz kalabilir",
            "🌠 Farklı atmosfer kompozisyonları deneyin: oksijen, nitrojen, su buharı",
            "🔭 Fırtınalar ve atmosferik desenler görmek için 'İklim Etkileri'ni açın",
            "📈 Yaşanabilir bölge evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Dünya milyarlarca yıldır Güneş'in yaşanabilir bölgesinde!",
            "💥 Yaşam simülasyonu için ortalama sıcaklığı 0°C-100°C arasında ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında 5 yaşanabilir bölgeli sistem oluşturun"
        ],
        "kuasar": [
            "🌌 Bir kuasar oluşturalım! 'Gök Cisimleri Oluştur' > 'Kuasar'...",
            "💫 İpucu: Galaksi kontrolü için kuasar kütlesini ayarlayın",
            "🌠 Yoğun radyasyon emisyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Kuasarlar aşırı parlak olup tüm galaksileri gölgede bırakabilir",
            "🌟 Yığılma diskinde farklı madde kompozisyonları deneyin",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Kuasar evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Kuasarlar evrenin en parlak nesneleridir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Uzak galaksileri bağlayan 3 kuasarlı sistem oluşturun"
        ],
        "kahverengi cüce": [
            "🌌 Bir kahverengi cüce oluşturalım! 'Gök Cisimleri Oluştur' > 'Kahverengi Cüce'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Kahverengi cüceler yıldızlar ve gezegenler arasında ara formdur",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Kahverengi cüce evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Kahverengi cücelerin yıldızlar gibi sürekli füzyonu yoktur!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 kahverengi cüceli sistem oluşturun"
        ],
        "kırmızı cüce": [
            "🌌 Bir kırmızı cüce oluşturalım! 'Gök Cisimleri Oluştur' > 'Kırmızı Cüce'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Kırmızı cüceler evrendeki en yaygın yıldız türüdür",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Kırmızı cüce evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Kırmızı cüceler trilyonlarca yıl yaşayabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 5 kırmızı cüceli sistem oluşturun"
        ],
        "dev yıldız": [
            "🌌 Bir dev yıldız oluşturalım! 'Gök Cisimleri Oluştur' > 'Dev Yıldız'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Dev yıldızlar Güneş'ten çok daha büyüktür ve süpernova olabilir",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Dev yıldız evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Dev yıldızlar Güneş'in 1000 katı çapa ulaşabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 dev yıldızlı sistem oluşturun"
        ],
        "hiperdev": [
            "🌌 Bir hiperdev oluşturalım! 'Gök Cisimleri Oluştur' > 'Hiperdev'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Hiperdevler bilinen en büyük yıldızlardır ve süpernova olabilir",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Hiperdev evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Hiperdevler Güneş'in 1000 katı çapa ulaşabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 hiperdevli sistem oluşturun"
        ],
        "devasa yıldız": [
            "🌌 Bir devasa yıldız oluşturalım! 'Gök Cisimleri Oluştur' > 'Devasa Yıldız'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Devasa yıldızlar Güneş'ten çok daha büyüktür ve süpernova olabilir",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Devasa yıldız evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Devasa yıldızlar Güneş'in 100 katı çapa ulaşabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 devasa yıldızlı sistem oluşturun"
        ],
        "aşırı devasa yıldız": [
            "🌌 Bir aşırı devasa yıldız oluşturalım! 'Gök Cisimleri Oluştur' > 'Aşırı Devasa Yıldız'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Aşırı devasa yıldızlar bilinen en büyük yıldızlardır ve süpernova olabilir",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Aşırı devasa yıldız evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Aşırı devasa yıldızlar Güneş'in 1000 katı çapa ulaşabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 aşırı devasa yıldızlı sistem oluşturun"
        ],
        "beyaz cüce": [
            "🌌 Bir beyaz cüce oluşturalım! 'Gök Cisimleri Oluştur' > 'Beyaz Cüce'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Beyaz cüceler yakıtını tüketmiş yıldız kalıntılarıdır",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Beyaz cüce evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Beyaz cüceler aşırı yoğun ve küçüktür!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 beyaz cüceli sistem oluşturun"
        ],
        "helyum beyaz cücesi": [
            "🌌 Bir helyum beyaz cücesi oluşturalım! 'Gök Cisimleri Oluştur' > 'Helyum Beyaz Cücesi'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Helyum-karbon-oksijen füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Helyum beyaz cüceleri yakıtını tüketmiş yıldız kalıntılarıdır",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Helyum beyaz cücesi evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Helyum beyaz cüceleri aşırı yoğun ve küçüktür!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 helyum beyaz cüceli sistem oluşturun"
        ],
        "karbon beyaz cücesi": [
            "🌌 Bir karbon beyaz cücesi oluşturalım! 'Gök Cisimleri Oluştur' > 'Karbon Beyaz Cücesi'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Karbon-oksijen-nitrojen füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Karbon beyaz cüceleri yakıtını tüketmiş yıldız kalıntılarıdır",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Karbon beyaz cücesi evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Karbon beyaz cüceleri aşırı yoğun ve küçüktür!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 karbon beyaz cüceli sistem oluşturun"
        ],
        "siyah cüce": [
            "🌌 Bir siyah cüce oluşturalım! 'Gök Cisimleri Oluştur' > 'Siyah Cüce'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Hidrojen-helyum füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Siyah cüceler yakıtını tüketmiş yıldız kalıntılarıdır",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Siyah cüce evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Siyah cüceler aşırı yoğun ve küçüktür!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 siyah cüceli sistem oluşturun"
        ],
        "nötron yıldızı": [
            "🌌 Bir nötron yıldızı oluşturalım! 'Gök Cisimleri Oluştur' > 'Nötron Yıldızı'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Nötron-proton-elektron füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Nötron yıldızları aşırı yoğun ve küçüktür!",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Nötron yıldızı evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Nötron yıldızları saniyede 1000 kez dönebilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 nötron yıldızlı sistem oluşturun"
        ],
        "magnetar": [
            "🌌 Bir magnetar oluşturalım! 'Gök Cisimleri Oluştur' > 'Magnetar Nötron Yıldızı'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Nötron-proton-elektron füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Magnetarlar aşırı yoğun ve küçüktür!",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Magnetar evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Magnetarların manyetik alanları Dünya'nınkinden trilyonlarca kat güçlüdür!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 magnetarlı sistem oluşturun"
        ],
        "kuark yıldızı": [
            "🌌 Bir kuark yıldızı oluşturalım! 'Gök Cisimleri Oluştur' > 'Kuark Yıldızı'...",
            "💫 İpucu: Farklı atmosferik özellikler için kütleyi ayarlayın",
            "🌠 Kuark-proton-nötron füzyonunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Kuark yıldızları aşırı yoğun ve küçüktür!",
            "🌟 Farklı atmosfer kompozisyonları deneyin: metan, su, amonyak",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Kuark yıldızı evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Kuark yıldızları nötron yıldızlarından bile yoğun olabilir!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Bir yıldız etrafında dönen 3 kuark yıldızlı sistem oluşturun"
        ],
        "uzay tozu": [
            "🌌 Uzay tozu oluşturalım! 'Gök Cisimleri Oluştur' > 'Uzay Tozu'...",
            "💫 İpucu: Farklı kompozisyonlar için yoğunluğu ayarlayın",
            "🌠 Toz bulutları oluşumunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Uzay tozu birikerek planetesimal oluşturabilir",
            "🌟 Farklı kompozisyonlar deneyin: silikat, karbon, buz",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Uzay tozu evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Uzay tozu yıldız ve gezegen oluşumunda kritik rol oynar!",
            "💥 Çarpışma simülasyonu için parçacıkların hızını ayarlayın",
            "🌌 Mücadele: Etkileşen 5 uzay tozu bulutlu sistem oluşturun"
        ],
        "bulutsu": [
            "🌌 Bir bulutsu oluşturalım! 'Gök Cisimleri Oluştur' > 'Bulutsu'...",
            "💫 İpucu: Farklı gaz-toz kompozisyonları için yoğunluğu ayarlayın",
            "🌠 Bulutsu içinde yıldız oluşumunu gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Bulutsular yeni yıldızların doğum yerleridir",
            "🌟 Farklı kompozisyonlar deneyin: hidrojen, helyum, karbon",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Bulutsu evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Bulutsular yıldız maddesinin geri dönüşüm merkezleridir!",
            "💥 Genişleme simülasyonu için bulutsu hızını ayarlayın",
            "🌌 Mücadele: Etkileşen 3 bulutsulu sistem oluşturun"
        ],
        "tekillik": [   
            "🌌 Bir tekillik oluşturalım! 'Gök Cisimleri Oluştur' > 'Tekillik'...",
            "💫 İpucu: Farklı kütleçekim etkileri için kütleyi ayarlayın",
            "🌠 Uzay-zaman bükülmesini gözlemlemek için yavaş çekim modunu kullanın",
            "⚠️ Dikkat: Tekillikler sonsuz yoğunluk ve aşırı eğrilik noktalarıdır",
            "🌟 Farklı kompozisyonlar deneyin: normal madde, egzotik madde",
            "🔭 Etrafındaki ışık bükülmesini görmek için 'Rölativistik Etkiler'i açın",
            "📈 Tekillik evrimini görmek için zamanı hızlandırın",
            "🌀 İlginç bilgi: Tekillikler teoriktir ve doğrudan gözlemlenemez!",
            "💥 Rölativistik jetler simülasyonu için disk dönüş hızını ayarlayın",
            "🌌 Mücadele: Etkileşen 3 tekillikli sistem oluşturun"
        ],
        "default": [
            "🚀 Bunu birlikte keşfedelim! Tam olarak ne oluşturmak istersiniz?",
            "🌌 Bu kozmik simülasyonda size adım adım rehberlik edebilirim!",
            "💫 Harika! Gök cisminizi oluşturmak için uygun menüyü seçerek başlayın",
            "🔭 Detaylandıralım: Önce hangi spesifik parametreyi ayarlamak istersiniz?",
            "🪐 İlk adım: Sağ alt köşedeki oluşturma menüsüne erişin",
            "🌠 Varsayılan değerlerle başlayıp yavaşça ayarlamanızı öneririm",
            "⚡ En iyi sonuçlar için Seçenekler > Fizik'ten 'Tam Hassasiyet'i açın",
            "📊 Şimdi pratik bir örnek görmemi ister misiniz?",
            "🌀 Sisteminizin temel bileşenlerini oluşturarak başlayalım",
            "✨ Herhangi bir zamanda 'yardım' yazarak oluşturma seçeneklerini görebilirsiniz"
        ]
    },
    
    negativeResponses: {
        "kara delik": [
            "🕳️ Sorun değil! Kara delikler bekleyebilir...",
            "🌌 Tamam, bu kozmik canavarlar kaçmıyor!",
            "💫 Maddenin spagettileşmesini görmek istediğinizde buradayım!",
            "⚠️ Dikkatli olmakta haklısınız! Bu kozmik yutuculardan uzak durmak iyidir",
            "🔭 Nötron yıldızlarını keşfetmeye ne dersiniz? Aynı derecede büyüleyiciler!",
            "🌠 Biliyor muydunuz: Bilinen en küçük kara delik sadece 3.8 güneş kütlesinde!",
            "🌀 Galaksi merkezlerindeki süper kütleli kara delikler milyarlarca güneş kütlesine ulaşabilir!",
            "💥 Simüle etmesek bile unutmayın: Olay ufkunu geçen hiçbir şey kaçamaz!",
            "⏳ Gelecekte bir gün, kara delikler bile Hawking radyasyonuyla buharlaşacak",
            "✨ Hazır olduğunuzda 'kara delik' yazarak yeniden başlayabiliriz"
        ],
        "kuyruklu yıldız": [
            "☄️ Sorun değil! Kuyruklu yıldızlar Oort bulutunda bekleyebilir...",
            "❄️ Tamam, bu buzlu gezginler o kadar çabuk erimez!",
            "🌠 Meteor yağmuru oluşturmak istediğinizde hazırım",
            "💫 Biliyor muydunuz: Bazı kuyruklu yıldızların yörüngeleri milyonlarca yıl sürer!",
            "🚀 Hale-Bopp kuyruklu yıldızı çıplak gözle tam 18 ay boyunca görülebilmişti!",
            "🌌 Borisov gibi yıldızlararası kuyruklu yıldızlar başka yıldız sistemlerinden gelir!",
            "⏱️ Rosetta sondası Churyumov–Gerasimenko kuyruklu yıldızının yörüngesinde 2 yıl kaldı!",
            "🔭 Halley kuyruklu yıldızının çekirdeği 15km uzunluğunda ve çok karanlıktır!",
            "💧 Kuyruklu yıldızlardaki ağır su oranları Dünya okyanuslarından farklıdır",
            "✨ 'kuyruklu yıldız' yazarak bu kozmik habercileri keşfedebilirsiniz"
        ],
        "yerçekimi": [
            "⚖️ Sorun değil! Yerçekimi bekleyebilir...",
            "🌌 Tamam, Einstein hayal kırıklığına uğramazdı!",
            "💫 Uzay-zamanı bükmek istediğinizde buradayım!",
            "🌀 Biliyor muydunuz: Yerçekimi elektromanyetik kuvvetten 10^36 kat daha zayıftır!",
            "🌠 Nötron yıldızlarında yerçekimi Dünya'dakinden 200 milyar kat daha güçlüdür!",
            "🪐 Jüpiter'in yerçekimi Dünya'nınkinin 2.5 katıdır - kuyruklu yıldız yörüngelerini değiştirebilir!",
            "⏱️ Yerçekimi ışık hızında hareket eder - Güneş yok olsa etkisini 8 dakika sonra hissederdik!",
            "💥 Kara delikler yerçekiminin diğer tüm kuvvetleri yendiği tek yerlerdir",
            "🔭 2015'te tespit edilen yerçekimi dalgaları Einstein'ın 1916 tahminini doğruladı!",
            "✨ 'yerçekimi' yazarak bu temel kozmik kuvveti keşfedebilirsiniz"
        ],
        "yıldız": [
            "⭐ Sorun değil! Yıldızlar gökyüzünde bekleyebilir...",
            "🌞 Tamam, bu kozmik fenerler milyarlarca yıl parlamaya devam edecek!",
            "💫 Bir süpernova oluşturmak istediğinizde buradayım!",
            "🌌 En yakın yıldız Proxima Centauri 4.24 ışık yılı uzakta!",
            "🔥 Güneş'in çekirdeği 15 milyon °C'ye ulaşır - nükleer füzyon için yeterli!",
            "🌠 Kırmızı süperdev Betelgeuse Güneş'ten 1000 kat daha büyüktür!",
            "⏳ Kırmızı cüce yıldızlar trilyonlarca yıl yaşayabilir - evrenin şu anki yaşından bile uzun!",
            "💥 Bir yıldız süpernova olduğunda tüm bir galaksiden daha parlak olabilir!",
            "🌀 Nötron yıldızları saniyede 716 kez dönebilir - evrenin en hassas deniz fenerleri!",
            "✨ 'yıldız' yazarak bu kozmik motorları ateşleyebilirsiniz"
        ],
        "gezegen": [
            "🪐 Sorun değil! Gezegenler yörüngelerinde dönmeye devam edecek...",
            "🌍 Tamam, bu yabancı dünyalar kaçmıyor!",
            "💫 Bir okyanus dünyası oluşturmak istediğinizde buradayım!",
            "🌌 En yakın ötegezegen Proxima Centauri b sadece 4 ışık yılı uzakta!",
            "🌡️ Venüs, kontrolsüz sera etkisi nedeniyle Merkür'den daha sıcaktır!",
            "❄️ Plüton'da 3km yüksekliğinde su buzundan dağlar var!",
            "🛰️ Jüpiter'in 79 bilinen uydusu var - minyatür bir gezegen sistemi!",
            "💥 Dünya, aktif tektonik plakalara sahip bilinen tek gezegendir!",
            "🌀 WASP-76b ötegezegeninin gece tarafında erimiş demir yağmurları yağar!",
            "✨ 'gezegen' yazarak yeni dünyalar şekillendirebilirsiniz"
        ],
        "meteoroid": [
            "🌠 Sorun değil! Meteoroidler uzay yolculuklarına devam edecek...",
            "🪨 Tamam, bu kozmik gezginler kaybolmuyor!",
            "💫 Bir meteoroid görmek istediğinizde buradayım!",
            "☄️ Chelyabinsk meteoroidinin patlaması Hiroşima bombasından 30 kat güçlüydü!",
            "🌌 Çoğu meteor kum tanesinden küçüktür - yine de etkileyicidir!",
            "🔥 25 metreden büyük meteoroidler Dünya'ya çarparsa ciddi hasara neden olabilir!",
            "🔭 Perseid meteor yağmuru yılın en görünürlerindendir - her zaman heyecan vericidir!",
            "💥 1908'de Tunguska meteoroidinin patlaması 15 megaton TNT'ye eşdeğerdi!",
            "🌠 'meteoroid' yazarak bu kozmik gezginleri görebilirsiniz!"
        ],
        "asteroid": [
            "🪨 Sorun değil! Asteroidler yörüngelerinde dönmeye devam edecek...",
            "🌌 Tamam, bu kaya blokları kaybolmuyor!",
            "💫 Bir asteroid görmek istediğinizde buradayım!",
            "☄️ 16 Psyche asteroidi çoğunlukla demir ve nikelden oluşur - bir gezegen çekirdeği gibi!",
            "🌠 Vesta asteroidi çıplak gözle görülebilecek kadar büyüktür!",
            "🛰️ Bennu asteroidinin şekli bir balıkçığa benzer - ve bir keşif hedefidir!",
            "💥 Apophis asteroidi 2029'da Dünya'ya yakın geçiş yapacak - çarpma riski yok!",
            "🌌 Mars-Jüpiter arasındaki asteroid kuşağında milyonlarca kaya cismi var!",
            "🌠 'asteroid' yazarak bu yapı taşlarını keşfedebilirsiniz!"
        ],
        "planetoid": [
            "🪐 Sorun değil! Planetoidler yörüngelerinde dönmeye devam edecek...",
            "🌌 Tamam, bu küçük dünyalar kaybolmuyor!",
            "💫 Bir planetoid görmek istediğinizde buradayım!",
            "🌠 Planetoid Ceres asteroid kuşağının en büyük cismidir ve buzlu su içerir!",
            "🛰️ Plüton birçok astronom tarafından planetoid kabul edilir - ve büyüleyicidir!",
            "💥 Planetoid Eris Plüton'dan büyüktür ve ince bir nitrojen atmosferi vardır!",
            "🌌 Planetoidler güneş sisteminin oluşumundan kalan kozmik fosillerdir!",
            "🌠 'planetoid' yazarak bu küçük dünyaları keşfedebilirsiniz!"
        ],
        "solucan deliği": [
            "🌀 Sorun değil! Solucan delikleri bekleyebilir...",
            "🌌 Tamam, bu kozmik tüneller kaybolmuyor!",
            "💫 Bir solucan deliği görmek istediğinizde buradayım!",
            "⚠️ Dikkat: Solucan delikleri teoriktir ve gerçekte kararsızdır",
            "🌠 Biliyor muydunuz: Solucan delikleri evrenin uzak noktalarını bağlayabilir?",
            "🔭 Teoriye göre solucan delikleri anlık seyahate izin verebilir!",
            "💥 Simüle etmesek bile unutmayın: Olay ufkunu geçen hiçbir şey kaçamaz!",
            "🌀 'solucan deliği' yazarak bu kozmik tünelleri keşfedebilirsiniz"
        ],
        "yaşanabilir bölge": [
            "🌍 Sorun değil! Yaşanabilir bölgeler bekleyebilir...",
            "🌌 Tamam, bu yaşam alanları kaybolmuyor!",
            "💫 Bir yaşanabilir bölge görmek istediğinizde buradayım!",
            "🌠 Dünya milyarlarca yıldır Güneş'in yaşanabilir bölgesinde!",
            "🌡️ Yaşanabilir bölge yıldıza göre değişir - büyüleyicidir!",
            "🛰️ Yaşanabilir bölgedeki ötegezegenler dünya dışı yaşam arayışında hedeftir!",
            "💥 Simüle etmesek bile unutmayın: Yaşam aşırı ortamlarda var olabilir!",
            "🌌 'yaşanabilir bölge' yazarak bu yaşam alanlarını keşfedebilirsiniz"
        ],
        "kuasar": [
            "🌌 Sorun değil! Kuasarlar bekleyebilir...",
            "💫 Tamam, bu kozmik fenerler kaybolmuyor!",
            "🚀 Bir kuasar görmek istediğinizde buradayım!",
            "🌠 Kuasarlar evrenin en parlak nesneleridir - gerçek kozmik deniz fenerleri!",
            "🌀 Biliyor muydunuz: Kuasarlar ışık hızına yakın rölativistik jetler yayabilir?",
            "🔭 Bazı kuasarların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Kuasarlar galaksi evriminde kritik rol oynar!",
            "✨ 'kuasar' yazarak bu kozmik fenerleri keşfedebilirsiniz"
        ],
        "kahverengi cüce": [
            "🌌 Sorun değil! Kahverengi cüceler bekleyebilir...",
            "💫 Tamam, bu ara formlar kaybolmuyor!",
            "🚀 Bir kahverengi cüce görmek istediğinizde buradayım!",
            "🌠 Kahverengi cüceler başarısız yıldızlardır - sürekli füzyonları yoktur!",
            "🌀 Biliyor muydunuz: Kahverengi cüceler metan ve su açısından zengin atmosferlere sahip olabilir?",
            "🔭 Bazı kahverengi cücelerin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Kahverengi cüceler yıldız evriminde önemlidir!",
            "✨ 'kahverengi cüce' yazarak bu ara formları keşfedebilirsiniz"
        ],
        "kırmızı cüce": [
            "🌌 Sorun değil! Kırmızı cüceler bekleyebilir...",
            "💫 Tamam, bu küçük yıldızlar kaybolmuyor!",
            "🚀 Bir kırmızı cüce görmek istediğinizde buradayım!",
            "🌠 Kırmızı cüceler evrendeki en yaygın yıldız türüdür - sessiz devler!",
            "🌀 Biliyor muydunuz: Kırmızı cüceler trilyonlarca yıl yaşayabilir?",
            "🔭 Bazı kırmızı cücelerin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Kırmızı cüceler yıldız evriminde önemlidir!",
            "✨ 'kırmızı cüce' yazarak bu küçük yıldızları keşfedebilirsiniz"
        ],
        "dev yıldız": [
            "🌌 Sorun değil! Dev yıldızlar bekleyebilir...",
            "💫 Tamam, bu kozmik devler kaybolmuyor!",
            "🚀 Bir dev yıldız görmek istediğinizde buradayım!",
            "🌠 Dev yıldızlar Güneş'ten çok daha büyüktür ve süpernova olabilir!",
            "🌀 Biliyor muydunuz: Bazı dev yıldızlar Güneş'in 1000 katı çapa ulaşabilir?",
            "🔭 Bazı dev yıldızların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Dev yıldızlar galaksi evriminde kritik rol oynar!",
            "✨ 'dev yıldız' yazarak bu kozmik devleri keşfedebilirsiniz"
        ],
        "hiperdev": [
            "🌌 Sorun değil! Hiperdevler bekleyebilir...",
            "💫 Tamam, bu kozmik titanlar kaybolmuyor!",
            "🚀 Bir hiperdev görmek istediğinizde buradayım!",
            "🌠 Hiperdevler bilinen en büyük yıldızlardır ve süpernova olabilir!",
            "🌀 Biliyor muydunuz: Bazı hiperdevler Güneş'in 1000 katı çapa ulaşabilir?",
            "🔭 Bazı hiperdevlerin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Hiperdevler galaksi evriminde kritik rol oynar!",
            "✨ 'hiperdev' yazarak bu kozmik titanları keşfedebilirsiniz"
        ],
        "devasa yıldız": [
            "🌌 Sorun değil! Devasa yıldızlar bekleyebilir...",
            "💫 Tamam, bu kozmik devler kaybolmuyor!",
            "🚀 Bir devasa yıldız görmek istediğinizde buradayım!",
            "🌠 Devasa yıldızlar Güneş'ten çok daha büyüktür ve süpernova olabilir!",
            "🌀 Biliyor muydunuz: Bazı devasa yıldızlar Güneş'in 100 katı çapa ulaşabilir?",
            "🔭 Bazı devasa yıldızların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Devasa yıldızlar galaksi evriminde kritik rol oynar!",
            "✨ 'devasa yıldız' yazarak bu kozmik devleri keşfedebilirsiniz"
        ],
        "aşırı devasa yıldız": [
            "🌌 Sorun değil! Aşırı devasa yıldızlar bekleyebilir...",
            "💫 Tamam, bu kozmik titanlar kaybolmuyor!",
            "🚀 Bir aşırı devasa yıldız görmek istediğinizde buradayım!",
            "🌠 Aşırı devasa yıldızlar bilinen en büyük yıldızlardır ve süpernova olabilir!",
            "🌀 Biliyor muydunuz: Bazı aşırı devasa yıldızlar Güneş'in 1000 katı çapa ulaşabilir?",
            "🔭 Bazı aşırı devasa yıldızların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Aşırı devasa yıldızlar galaksi evriminde kritik rol oynar!",
            "✨ 'aşırı devasa yıldız' yazarak bu kozmik titanları keşfedebilirsiniz"
        ],
        "beyaz cüce": [
            "🌌 Sorun değil! Beyaz cüceler bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir beyaz cüce görmek istediğinizde buradayım!",
            "🌠 Beyaz cüceler nükleer yakıtını tüketmiş yıldız artıklarıdır!",
            "🌀 Biliyor muydunuz: Beyaz cüceler aşırı yoğun ve küçüktür!",
            "🔭 Bazı beyaz cücelerin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Beyaz cüceler yıldız evriminde önemlidir!",
            "✨ 'beyaz cüce' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "helyum beyaz cücesi": [
            "🌌 Sorun değil! Helyum beyaz cüceleri bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir helyum beyaz cücesi görmek istediğinizde buradayım!",
            "🌠 Helyum beyaz cüceleri nükleer yakıtını tüketmiş yıldız artıklarıdır!",
            "🌀 Biliyor muydunuz: Helyum beyaz cüceleri aşırı yoğun ve küçüktür!",
            "🔭 Bazı helyum beyaz cücelerinin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Helyum beyaz cüceleri yıldız evriminde önemlidir!",
            "✨ 'helyum beyaz cücesi' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "karbon beyaz cücesi": [
            "🌌 Sorun değil! Karbon beyaz cüceleri bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir karbon beyaz cücesi görmek istediğinizde buradayım!",
            "🌠 Karbon beyaz cüceleri nükleer yakıtını tüketmiş yıldız artıklarıdır!",
            "🌀 Biliyor muydunuz: Karbon beyaz cüceleri aşırı yoğun ve küçüktür!",
            "🔭 Bazı karbon beyaz cücelerinin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Karbon beyaz cüceleri yıldız evriminde önemlidir!",
            "✨ 'karbon beyaz cücesi' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "siyah cüce": [
            "🌌 Sorun değil! Siyah cüceler bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir siyah cüce görmek istediğinizde buradayım!",
            "🌠 Siyah cüceler tüm ısılarını kaybetmiş yıldız artıklarıdır!",
            "🌀 Biliyor muydunuz: Siyah cüceler aşırı yoğun ve küçüktür!",
            "🔭 Bazı siyah cücelerin ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Siyah cüceler yıldız evriminde önemlidir!",
            "✨ 'siyah cüce' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "nötron yıldızı": [
            "🌌 Sorun değil! Nötron yıldızları bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir nötron yıldızı görmek istediğinizde buradayım!",
            "🌠 Nötron yıldızları süpernova kalıntılarıdır ve aşırı yoğundur!",
            "🌀 Biliyor muydunuz: Bir çay kaşığı nötron yıldızı maddesi tüm insanlıktan daha ağırdır?",
            "🔭 Bazı nötron yıldızlarının ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Nötron yıldızları yıldız evriminde kritik rol oynar!",
            "✨ 'nötron yıldızı' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "magnetar": [
            "🌌 Sorun değil! Magnetarlar bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir magnetar görmek istediğinizde buradayım!",
            "🌠 Magnetarlar aşırı güçlü manyetik alana sahip nötron yıldızlarıdır!",
            "🌀 Biliyor muydunuz: Magnetarlar güçlü gama ve X-ışını patlamaları yayabilir?",
            "🔭 Bazı magnetarların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Magnetarlar yıldız evriminde önemlidir!",
            "✨ 'magnetar' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "kuark yıldızı": [
            "🌌 Sorun değil! Kuark yıldızları bekleyebilir...",
            "💫 Tamam, bu yıldız kalıntıları kaybolmuyor!",
            "🚀 Bir kuark yıldızı görmek istediğinizde buradayım!",
            "🌠 Kuark yıldızları teoriktir ve nötron yıldızlarından bile yoğun olabilir!",
            "🌀 Biliyor muydunuz: Kuark yıldızları karmaşık iç yapılara sahip olabilir?",
            "🔭 Bazı kuark yıldızlarının ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Kuark yıldızları yıldız evriminde önemlidir!",
            "✨ 'kuark yıldızı' yazarak bu yıldız kalıntılarını keşfedebilirsiniz"
        ],
        "uzay tozu": [
            "🌌 Sorun değil! Uzay tozu bekleyebilir...",
            "💫 Tamam, bu kozmik parçacıklar kaybolmuyor!",
            "🚀 Uzay tozu görmek istediğinizde buradayım!",
            "🌠 Uzay tozu yıldız ve gezegen oluşumunda kritik rol oynar!",
            "🌀 Biliyor muydunuz: Yıldızlararası toz ağır elementler içerir?",
            "🔭 Bazı toz bulutlarının ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Uzay tozu evriminde önemlidir!",
            "✨ 'uzay tozu' yazarak bu kozmik parçacıkları keşfedebilirsiniz"
        ],
        "bulutsu": [
            "🌌 Sorun değil! Bulutsular bekleyebilir...",
            "💫 Tamam, bu kozmik bulutlar kaybolmuyor!",
            "🚀 Bir bulutsu görmek istediğinizde buradayım!",
            "🌠 Bulutsular yeni yıldızların doğduğu yıldız kreşleridir!",
            "🌀 Biliyor muydunuz: Bazı bulutsular süpernova kalıntılarıdır?",
            "🔭 Bazı bulutsuların ışığı bize ulaşmak için milyarlarca yıl yol aldı!",
            "💥 Simüle etmesek bile unutmayın: Bulutsular evriminde kritik rol oynar!",
            "✨ 'bulutsu' yazarak bu kozmik bulutları keşfedebilirsiniz"
        ],
        "tekillik": [
            "🌌 Sorun değil! Tekillikler bekleyebilir...",
            "💫 Tamam, bu sonsuz yoğunluk noktaları kaybolmuyor!",
            "🚀 Bir tekillik görmek istediğinizde buradayım!",
            "🌠 Tekillikler uzay-zamanın aşırı eğrildiği teorik noktalardır!",
            "🌀 Tekillikler kara delik ve kuasarların merkezinde var olabilir !"
        ],
        "default": [
            "🌌 Sorun değil! Evren sabırlıdır...",
            "🚀 Tamam, kozmik keşif bekleyebilir!",
            "💫 Devam etmek istediğinizde buradayım!",
            "🔭 Biliyor muydunuz: Evrendeki yıldız sayısı Dünya'daki tüm kum tanelerinden fazladır?",
            "🌠 Andromeda'dan gelen ışık atalarımız mağara resimleri yaparken yola çıktı!",
            "⏳ Görünür evrenin %99.9'u plazma halindedir!",
            "💥 Güneş 1 saniyede insanlık tarihinin tüm enerjisinden fazlasını üretir!",
            "🌀 Süper kütleli kara delikler galaksilerin büyümesini düzenler!",
            "✨ Vücudunuzdaki her oksijen atomu bir yıldızın çekirdeğinde oluştu!",
            "🪐 Hepimiz yıldız tozundan yapıldık!"
        ]
    },
    
    isAffirmative: (input) => contextSystem.affirmativeResponses.includes(input.toLowerCase()),
    isNegative: (input) => contextSystem.negativeResponses.includes(input.toLowerCase()),
    
    getPositiveResponse: () => {
        if (!contextSystem.lastTopic) return contextSystem.positiveResponses.default[0];
        
        const responses = contextSystem.positiveResponses[contextSystem.lastTopic] || 
                          contextSystem.positiveResponses.default;
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    getNegativeResponse: () => {
        if (!contextSystem.lastTopic) return contextSystem.negativeResponses.default[0];
        
        const responses = contextSystem.negativeResponses[contextSystem.lastTopic] || 
                          contextSystem.negativeResponses.default;
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    resetContext: () => {
        contextSystem.lastTopic = null;
        contextSystem.lastFollowUp = null;
    }
};

 
const mathSystem = {
    responses: [
        "🧮 Sonuç: {expression} = {result}",
        "🔢 Hesaplama tamamlandı: {expression} = {result}",
        "✨ Çözüm: {expression} = {result}",
        "⚡ Çözüldü: {expression} = {result}",
        "🌌 Kozmik denklem: {expression} = {result}",
        "🪐 Yıldız matematiği: {expression} = {result}",
        "💫 Kütleçekimsel hesaplama: {expression} = {result}",
        "📐 Evrensel geometri: {expression} = {result}",
        "📊 Sayısal analiz: {expression} = {result}",
        "🔭 Matematiksel gözlem: {expression} = {result}",
        "🌠 Çözülmüş formül: {expression} = {result}",
        "🚀 İtişli hesaplama: {expression} = {result}",
        "🛰️ Yörünge sonucu: {expression} = {result}",
        "⏱️ Hesaplama süresi: 0s | {expression} = {result}",
        "⚖️ Sayısal denge: {expression} = {result}",
        "🌀 Matematiksel girdap: {expression} = {result}",
        "🌡️ Hesaplama sıcaklığı: 0K | {expression} = {result}",
        "📈 Sayısal projeksiyon: {expression} = {result}",
        "📉 Ters analiz: {expression} = {result}",
        "🧪 Sayısal deney: {expression} = {result}",
        "🔬 Matematiksel mikroskop: {expression} = {result}",
        "🖥️ Simüle kuantum hesaplama: {expression} = {result}",
        "💻 Algoritma tamamlandı: {expression} = {result}",
        "🤖 Robotik işlem: {expression} = {result}",
        "🌟 Sayısal aydınlanma: {expression} = {result}",
        "🌌 Çözülmüş kozmos: {expression} = {result}",
        "🧬 Matematiksel genetik: {expression} = {result}",
        "🌠 Astronomik matematik: {expression} = {result}",
        "🪐 Hesaplamalı astrofizik: {expression} = {result}",
        "🔭 Matematiksel teleskop: {expression} = {result}",
        "🌌 Sayısal kozmoloji: {expression} = {result}",
        "🌟 Çözülmüş yıldız: {expression} = {result}",
        "🌠 Hesaplanmış galaksi: {expression} = {result}",
        "🛸 Sayısal navigasyon: {expression} = {result}",
        "🌌 Hesaplanmış evren: {expression} = {result}",
        "🌠 Çözülmüş takımyıldız: {expression} = {result}",
        "🪐 Hesaplanmış gezegen: {expression} = {result}",
        "🌌 Sayısal bulutsu: {expression} = {result}",
        "🌠 Çözülmüş süpernova: {expression} = {result}",
        "🛰️ Matematiksel uydu: {expression} = {result}",
        "🌌 Hesaplanmış uzay-zaman: {expression} = {result}",
        "🌠 Çözülmüş olay ufku: {expression} = {result}",
        "🌀 Sayısal tekillik: {expression} = {result}",
        "🌌 Hesaplanmış Büyük Patlama: {expression} = {result}",
        "🌠 Çözülmüş kozmik genişleme: {expression} = {result}",
        "🪐 Hesaplanmış gezegen halkası: {expression} = {result}",
        "🌌 Sayısal solucan deliği: {expression} = {result}",
        "🌠 Hesaplanmış Samanyolu: {expression} = {result}",
        "🛸 Sayısal uzay gemisi: {expression} = {result}",
        "🌌 Hesaplanmış çoklu evren: {expression} = {result}",
        "🌠 Çözülmüş paralel evren: {expression} = {result}",
        "🪐 Hesaplanmış ötegezegen: {expression} = {result}",
        "🌌 Sayısal asteroit: {expression} = {result}",
        "🌠 Çözülmüş meteorit: {expression} = {result}",
        "🛰️ Sayısal uzay sondası: {expression} = {result}",
        "🌌 Hesaplanmış kuyruklu yıldız: {expression} = {result}",
        "🌠 Çözülmüş meteor yağmuru: {expression} = {result}",
        "🪐 Hesaplanmış ay: {expression} = {result}",
        "🌌 Sayısal güneş sistemi: {expression} = {result}",
        "🌠 Çözülmüş gezegen yörüngesi: {expression} = {result}",
        "🛰️ Sayısal uzay istasyonu: {expression} = {result}",
        "🌌 Hesaplanmış sarmal galaksi: {expression} = {result}",
        "🌠 Çözülmüş eliptik galaksi: {expression} = {result}",
        "🪐 Hesaplanmış düzensiz galaksi: {expression} = {result}",
        "🌌 Sayısal kuasar: {expression} = {result}",
        "🌠 Çözülmüş pulsar: {expression} = {result}",
        "🛰 Hesaplanmış plazma topu: {expression} = {result}"
    ],
    
    usedResponses: [],
    
    isMathQuery: (input) => {
        return /[0-9+\-*/\^().]/.test(input) && 
               !/[a-z]/.test(input) && 
               input.split('').filter(char => '0123456789'.includes(char)).length >= 2;
    },
    
    calculate: (expression) => {
        try {
            const sanitized = expression
                .replace(/\^/g, '**')
                .replace(/[^0-9+\-*/\s().]/g, '');
            
            if (!/^[\d\s+\-*/().]+$/.test(sanitized)) {
                throw new Error("Geçersiz ifade");
            }
            
            const result = eval(sanitized);
            
             
            let availableResponses = mathSystem.responses;
            if (mathSystem.usedResponses.length > 0) {
                availableResponses = mathSystem.responses.filter(r => 
                    !mathSystem.usedResponses.includes(r)
                );
            }
            
            if (availableResponses.length === 0) {
                mathSystem.usedResponses = [];
                availableResponses = mathSystem.responses;
            }
            
            const responseTemplate = availableResponses[
                Math.floor(Math.random() * availableResponses.length)
            ];
            
            mathSystem.usedResponses.push(responseTemplate);
            
            return responseTemplate
                .replace("{expression}", expression)
                .replace("{result}", result);
        } catch (error) {
            return "🤔 Hesaplayamadım. Geçerli format: '2*(3+5^2)' veya 'sqrt(9)'";
        }
    }
};

 
const greetingsSystem = {
    greetings: ["merhaba", "selam", "hey", "alo", "hello", "hi", "günaydın", "iyi günler", "iyi akşamlar", "selamlar", "hey", "ey", "kozmik selamlar", "yıldızlı günaydın", "selam singularity"],
    farewells: ["hoşçakal", "güle güle", "görüşürüz", "bye", "kapat", "çıkış", "ayrılıyorum", "kapan", "exit", "bay bay", "hadikalk", "sonra görüşürüz", "bağlantıyı kes", "oturumu kapat", "hoşçakal singularity"],
    
    greetingsResponses: [
        "✨ Merhaba kozmik kaşif! Yıldızlararası yolculuğuna nasıl yardımcı olabilirim?",
        "🚀 SIU 2D'ye hoş geldiniz! Harika evrenler yaratmaya hazır mısınız?",
        "🌌 Yıldızlararası selamlar! Bugün nasıl yardımcı olabilirim?",
        "🪐 Selam komutan! Hangi kozmik meydan okumayı ele alalım?",
        "💫 Kütleçekimsel selamlar! Keşiflerinize nasıl yardımcı olabilirim?",
        "🌟 Hoş geldin dünya yaratıcısı! Bugün neyi simüle edeceğiz?",
        "🌠 Selam yıldız gezgini! Kozmik bir maceraya hazır mısın?",
        "🛸 Sinyal alındı! Uzay görevinize nasıl yardımcı olabilirim?",
        "🔭 Merhaba sanal astronom! Hangi kozmik gizemi çözeceğiz?",
        "⚡ Kozmik enerji akıyor! Nasıl yardımcı olabilirim?",
        "🌀 Karşılama girdabı aktif! Komutunuz nedir?",
        "🌠 Kozmik ışınlar tespit edildi! Merhaba, nasıl yardımcı olabilirim?",
        "🪐 Varışınız için gezegen dizilimi mükemmel! Hoş geldiniz!",
        "🌌 Uzay bükülmesi stabilize edildi! Selamlar kaşif!",
        "🚀 Sistemler çevrimiçi! Sorularınız için Singularity hazır",
        "🔭 Teleskoplar odaklandı! Evreni keşfetmeye hazır mısınız?",
        "🌠 Karşılama meteor yağmuru! Nasıl yardımcı olabilirim?",
        "💻 Kozmik AI sistemleri aktif! Merhaba insan!",
        "🛰️ İletişim uyduları senkronize! Bağlantı kuruldu!",
        "🌌 Boyutsal portal açıldı! SIU 2D'ye hoş geldiniz!",
        "🌟 Varışınız için takımyıldızlar hizalandı! Selamlar!",
        "⚛️ Kozmik parçacıklar varlığınızdan heyecanlı! Merhaba!",
        "🌠 Karşılama kuyruklu yıldızı yolda! Selamlar gezgin!",
        "🪐 Gezegen halkaları selam veriyor! Hoş geldiniz!",
        "✨ Yıldız enerjisi kanalize edildi! Singularity emrinizde!"
    ],
    
    farewellResponses: [
        "🌠 Sonra görüşürüz yıldız gezgini! Yolculuğunuz epik olsun!",
        "🛸 Kozmosta iyi yolculuklar! Yeni sorularınız olduğunda dönün!",
        "💫 İletişim sonlandırılıyor. Unutmayın: Evren sizin oyun alanınız!",
        "👋 Hoşçakalın! Bir kara delik yaratmak istediğinizde buradayım!",
        "🚀 Ayrılış onaylandı! Daha fazla kozmik macera için geri dönün!",
        "🌌 Bağlantı kesiliyor... Ama evren genişlemeye devam ediyor!",
        "🪐 Görüşürüz komutan! Yeni kozmik ufuklar keşfedelim!",
        "✨ Görev tamamlandı! Yeni yıldız keşifleri için geri dönün!",
        "🔭 Sinyal kaybedildi... Ama yıldızlar her zaman yolunuzu aydınlatacak!",
        "⚡ Kozmik enerjiler veda ediyor! Sonraki yörüngede görüşmek üzere!",
        "🌀 Kütleçekim alanı devre dışı! Görüşmek üzere kaşif!",
        "🌠 Ayrılış yörüngesi hesaplandı! Sonra görüşürüz gezgin!",
        "🛰️ Uydular bekleme modunda! İhtiyacınız olduğunda dönün!",
        "💻 Sistemler kozmik uyku modunda! Görüşürüz!",
        "🪐 Veda gezegen dizilimi! İyi yolculuklar!",
        "🌌 Boyutsal portal kapandı! İstediğiniz zaman dönün!",
        "🌟 Takımyıldızlar vedanızı aydınlatıyor! Görüşmek üzere!",
        "⚛️ Kozmik parçacıklar yavaşlıyor! Sonra görüşürüz!",
        "🌠 Veda kuyruklu yıldızı yolda! İyi yolculuklar!",
        "🔭 Teleskoplar odaktan çıkıyor! Sonraki gözlemde görüşürüz!",
        "💫 Uzay bükülmesi sona erdi! Sonraki yolculukta görüşürüz!",
        "🚀 Veda roketleri ateşlendi! İyi yolculuklar!",
        "🌠 Veda kozmik ışınları tespit edildi! Görüşmek üzere!",
        "🛸 Veda gemisi yörüngede! Yakında dönün!",
        "✨ Son yıldız atımı! Bağlantı kesiliyor..."
    ],
    
    isGreeting: (input) => greetingsSystem.greetings.includes(input.toLowerCase()),
    isFarewell: (input) => greetingsSystem.farewells.includes(input.toLowerCase()),
    
    getRandomGreeting: () => {
        return greetingsSystem.greetingsResponses[
            Math.floor(Math.random() * greetingsSystem.greetingsResponses.length)
        ];
    },
    
    getRandomFarewell: () => {
        return greetingsSystem.farewellResponses[
            Math.floor(Math.random() * greetingsSystem.farewellResponses.length)
        ];
    }
};

 
function getUniqueResponse(term) {
    if (!responseHistory.has(term)) {
        responseHistory.set(term, []);
    }
    
    const usedResponses = responseHistory.get(term);
    let availableResponses = responseDatabase[term];
    
     
    if (usedResponses.length > 0) {
        availableResponses = availableResponses.filter(r => !usedResponses.includes(r));
    }
    
     
    const response = availableResponses.length > 0 
        ? availableResponses[Math.floor(Math.random() * availableResponses.length)]
        : responseDatabase[term][0];
    
     
    usedResponses.push(response);
    
     
    if (usedResponses.length > MAX_HISTORY_PER_TERM) {
        usedResponses.shift();
    }
    
    return response;
}




const responseExpander = {
     
    probabilities: {
        single: 0.2,        
        withFollowUp: 0.3,   
        expanded: 0.4,       
        fullCombo: 0.1       
    },
    
     
    getExpandedResponse: (term, baseResponse) => {
        const responses = [...responseDatabase[term]];
        
         
        const baseIndex = responses.indexOf(baseResponse);
        if (baseIndex !== -1) {
            responses.splice(baseIndex, 1);
        }
        
         
        const additionalCount = Math.floor(Math.random() * 3) + 1;
        const additionalResponses = [];
        
         
        for (let i = 0; i < additionalCount && responses.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            additionalResponses.push(responses[randomIndex]);
            responses.splice(randomIndex, 1);
        }
        
         
        return [baseResponse, ...additionalResponses].join(' ');
    },
    
     
    selectResponseType: (term, baseResponse) => {
        const rand = Math.random();
        let cumulative = 0;
        
        for (const [type, prob] of Object.entries(responseExpander.probabilities)) {
            cumulative += prob;
            if (rand < cumulative) {
                switch(type) {
                    case 'single':
                        return [baseResponse];
                    
                    case 'withFollowUp':
                        return [
                            baseResponse,
                            ...responseExpander.getFollowUp(term)
                        ];
                    
                    case 'expanded':
                        return [responseExpander.getExpandedResponse(term, baseResponse)];
                    
                    case 'fullCombo':
                        return [
                            responseExpander.getExpandedResponse(term, baseResponse),
                            ...responseExpander.getFollowUp(term)
                        ];
                }
            }
        }
        
        return [baseResponse];  
    },
    
     
    getFollowUp: (term) => {
        const followUps = followUpDatabase[term] || contextFollowUps.default;
        return [followUps[Math.floor(Math.random() * followUps.length)]];
    }
};


 
async function getBotResponse(input) {
    const cleanInput = input.toLowerCase().trim();
    let responses = [];
    
     
    if (contextSystem.lastFollowUp) {
        if (contextSystem.isAffirmative(cleanInput)) {
            responses.push(contextSystem.getPositiveResponse());
            contextSystem.resetContext();
            return responses;
        }
        
        if (contextSystem.isNegative(cleanInput)) {
            responses.push(contextSystem.getNegativeResponse());
            contextSystem.resetContext();
            return responses;
        }
    }
    
     
    if (greetingsSystem.isGreeting(cleanInput)) {
        responses.push(greetingsSystem.getRandomGreeting());
        contextSystem.resetContext();
        return responses;
    }
    
    if (greetingsSystem.isFarewell(cleanInput)) {
        responses.push(greetingsSystem.getRandomFarewell());
        contextSystem.resetContext();
        return responses;
    }
    
     
    if (mathSystem.isMathQuery(cleanInput)) {
        responses.push(mathSystem.calculate(cleanInput));
        contextSystem.resetContext();
        return responses;
    }
    
    let matchedTerm = null;
    for (const term in responseDatabase) {
        if (cleanInput.includes(term)) {
            matchedTerm = term;
            const baseResponse = getUniqueResponse(term);
            
             
            const expandedResponses = responseExpander.selectResponseType(term, baseResponse);
            responses.push(...expandedResponses);
            
             
            if (expandedResponses.length > 1) {
                const lastMessage = expandedResponses[expandedResponses.length - 1];
                
                 
                const isFollowUp = (followUpDatabase[term] || []).includes(lastMessage) || 
                                   contextFollowUps.default.includes(lastMessage);
                
                if (isFollowUp) {
                    contextSystem.lastTopic = term;
                    contextSystem.lastFollowUp = lastMessage;
                }
            }
            
            return responses;
        }
    }
    
     
const fallbacks = [
    "🌌 Yıldız veritabanımda bunu bulamadım... 'Kuyruklu yıldızlar', 'kara delikler' veya 'kontroller' hakkında sorabilirsiniz!",
    "🛸 Bilgim kozmik düzeydedir - oyun fiziği veya evrenin elementleri hakkında soru sorabilirsiniz",
    "🔭 Uzaya odaklanalım! 'Bir bulutsu nasıl oluşturulur?' veya 'Kara delik için hangi kütle gerekli?' gibi sorular deneyin",
    "📡 Sinyal kayboldu... Gök cisimleri oluşturma, yıldız evrimi veya SIU 2D kontrolleri hakkında yeniden sorun",
    "💫 Bir şey hesaplamak ister misiniz? '3 * 5^2' gibi sayılar ve operatörler kullanın veya kozmik terimler hakkında sorun!",
    "🪐 Kozmik ipucu: 'yerçekimi', 'yıldız', 'gezegen' veya 'evrim' gibi terimler deneyin!",
    "⚡ Yeni yıldız mesajı tespit edildi! 'Bir kuasar nasıl oluşturulur?' veya 'Yaşanabilir bölge nedir?' şeklinde sorun"
];
    
    responses.push(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    
     
    if (Math.random() < 0.2) {
        const followUp = followUpDatabase.default[Math.floor(Math.random() * followUpDatabase.default.length)];
        responses.push(followUp);
        
         
        contextSystem.lastTopic = "default";
        contextSystem.lastFollowUp = followUp;
    }
    
    return responses;
}

 
function toggleStarPulse(active) {
    const star = document.getElementById('star');
    if (star) {
        if (active) {
            star.classList.add('pulse-active');
        } else {
            star.classList.remove('pulse-active');
        }
    }
}

function createMessage(text, className) {
    const message = document.createElement('div');
    message.classList.add(className);
    
     
    if (className === 'bot-message') {
        const starSpan = document.createElement('span');
        starSpan.textContent = STAR_EMOJI + ' ';
        starSpan.classList.add('star-emoji');
        message.appendChild(starSpan);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    message.appendChild(textSpan);
    
    return message;
}

 
function initializeChat() {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) {
        console.error('Erro #20fgp');
        return;
    }
    
    const botMessage = createMessage(
        greetingsSystem.getRandomGreeting(),
        'bot-message'
    );
    chatBox.appendChild(botMessage);
}

 
async function showThinking(chatBox) {
    return new Promise(async (resolve) => {
         
        const thinkingMsg = createMessage(' : Pensando', 'bot-message');
        chatBox.appendChild(thinkingMsg);
        const thinkingText = thinkingMsg.querySelector('span:last-child');
        
        let dots = 0;
        const thinkDuration = Math.floor(Math.random() * 3000) + 3000;  
        
        const thinkInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            thinkingText.textContent = ` : Pensando${'.'.repeat(dots)}`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
        
         
        await new Promise(r => setTimeout(r, thinkDuration));
        clearInterval(thinkInterval);
        chatBox.removeChild(thinkingMsg);
        
         
        const searchingMsg = createMessage('Buscando', 'bot-message');
        chatBox.appendChild(searchingMsg);
        const searchingText = searchingMsg.querySelector('span:last-child');
        
        dots = 0;
        const searchDuration = Math.floor(Math.random() * 2000) + 2000;  
        
        const searchInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            searchingText.textContent = ` : Buscando dados${'.'.repeat(dots)}`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
        
         
        await new Promise(r => setTimeout(r, searchDuration));
        clearInterval(searchInterval);
        chatBox.removeChild(searchingMsg);
        
        resolve();
    });
}
 
function humanTypeWriter(element, text, speed = 30) {
    return new Promise((resolve) => {
        let i = 0;
        let currentText = '';
        let isPaused = false;
        let pauseEnd = 0;
        let dotsInterval = null;
        
        toggleStarPulse(true);
        
        function startDotsAnimation() {
            let dots = 0;
            const originalText = currentText;
            
            dotsInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                element.textContent = originalText + '.'.repeat(dots);
            }, 300);
        }
        
        function stopDotsAnimation() {
            if (dotsInterval) {
                clearInterval(dotsInterval);
                dotsInterval = null;
                element.textContent = currentText;
            }
        }
        
        function type() {
            if (i >= text.length) {
                if (dotsInterval) clearInterval(dotsInterval);
                toggleStarPulse(false);
                resolve();
                return;
            }
            
             
            if (!isPaused && Math.random() < 0.03) {
                isPaused = true;
                pauseEnd = Date.now() + Math.random() * 2000 + 2000;  
                startDotsAnimation();
            }
            
             
            if (isPaused) {
                if (Date.now() >= pauseEnd) {
                    isPaused = false;
                    stopDotsAnimation();
                }
                setTimeout(type, 100);
                return;
            }
            
             
            currentText += text[i];
            element.textContent = currentText;
            i++;
            
            setTimeout(type, speed);
        }
        
        type();
    });
}


 
function isOnline() {
    return navigator.onLine;
}

 
async function handleUserInput() {
    const inputEl = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const text = inputEl.value.trim();
    
    if (!text || !chatBox) return;

     
    const userMsg = createMessage(`Você: ${text}`, 'user-message');
    chatBox.appendChild(userMsg);
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

     
if (!isOnline()) {
    const errorMsg = createMessage('error : Bağlantı hatası. İnternet bağlantınızı kontrol edin ve tekrar deneyin.', 'error-message');
    chatBox.appendChild(errorMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return;
}

     
    await showThinking(chatBox);
    
     
    const replies = await getBotResponse(text);
    
     
    for (const reply of replies) {
        const botMsg = createMessage('', 'bot-message');
        chatBox.appendChild(botMsg);
        const textElement = botMsg.querySelector('span:last-child');
        
         
        await humanTypeWriter(textElement, `: ${reply}`);
        chatBox.scrollTop = chatBox.scrollHeight;
        
         
        if (replies.length > 1) {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
        }
    }
}

setInterval(() => {
    if (Math.random() < 0.2) {
        const topics = Object.keys(responseDatabase);
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const messages = responseDatabase[randomTopic];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        setTimeout(() => {
            displayMessage(randomMessage, 'bot');
        }, 3000);
    }
}, 30000);
 
document.getElementById('send-btn').addEventListener('click', handleUserInput);
document.getElementById('user-input').addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});

console.log("T Singularity: Sistema de IA carregado com sucesso!");
console.log("(c) 2025 Free Game Plant. Todos os direitos reservados.");

 
window.addEventListener('load', initializeChat);