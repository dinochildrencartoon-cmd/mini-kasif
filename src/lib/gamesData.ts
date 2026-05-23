export interface LearningItem {
  title: string;
  subtitle: string;
  visual: string;
  soundText: string;
}

export interface LearningCard {
  title: string;
  items: LearningItem[];
}

export type GameType = "multiple-choice" | "matching" | "find-the-odd" | "memory-missing";

export interface BaseGame {
  id: string;
  type: GameType;
  title: string;
  question: string;
  successMessage: string;
  retryMessage: string;
}

export interface MultipleChoiceOption {
  emoji: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceGame extends BaseGame {
  type: "multiple-choice";
  visual?: string;
  options: MultipleChoiceOption[];
}

export interface MatchingItem {
  id: string;
  content: string;
}

export interface MatchingGame extends BaseGame {
  type: "matching";
  leftItems: MatchingItem[];
  rightItems: MatchingItem[];
  correctPairs: Record<string, string>; // leftId -> rightId
}

export interface OddItem {
  id: string;
  emoji: string;
  text: string;
  isOdd: boolean;
}

export interface FindTheOddGame extends BaseGame {
  type: "find-the-odd";
  items: OddItem[];
}

export interface MemoryItem {
  id: string;
  emoji: string;
  text: string;
}

export interface MemoryMissingGame extends BaseGame {
  type: "memory-missing";
  items: MemoryItem[];
  missingItemIndex: number;
  options: MultipleChoiceOption[];
}

export type Game = MultipleChoiceGame | MatchingGame | FindTheOddGame | MemoryMissingGame;

export interface QuizQuestion {
  question: string;
  hint: string;
  options: MultipleChoiceOption[];
}

export interface Category {
  slug: string;
  title: string;
  emoji: string;
  desc: string;
  isFree: boolean;
  offlineTask: string;
  badge: string;
  learningCard: LearningCard;
  games: Game[];
  quiz: QuizQuestion[];
}

export const categories: Category[] = [
  {
    slug: "colors",
    title: "Renkler",
    emoji: "🎨",
    desc: "Mavi, kırmızı ve sarıyı sevimli balıklarla öğrenelim!",
    isFree: true,
    offlineTask: "Odandaki 3 tane mavi veya kırmızı renkli oyuncağı bul ve anne ya da babana göster!",
    badge: "🎨 Renk Kâşifi",
    learningCard: {
      title: "Renklerin Renkli Dünyası",
      items: [
        {
          title: "Mavi",
          subtitle: "Gökyüzünün ve sevimli balıkların rengidir.",
          visual: "🔵",
          soundText: "Mavi, gökyüzünün ve denizlerin rengidir.",
        },
        {
          title: "Kırmızı",
          subtitle: "Tatlı elmaların ve çileklerin rengidir.",
          visual: "🔴",
          soundText: "Kırmızı, elmaların, çileklerin ve sevginin rengidir.",
        },
        {
          title: "Sarı",
          subtitle: "Dünyamızı ısıtan güneşin rengidir.",
          visual: "🟡",
          soundText: "Sarı, güneşin, muzların ve neşeli yıldızların rengidir.",
        },
        {
          title: "Yeşil",
          subtitle: "Taze çimenlerin ve yaprakların rengidir.",
          visual: "🟢",
          soundText: "Yeşil, ormanların, yaprakların ve sevimli kurbağaların rengidir.",
        },
      ],
    },
    games: [
      {
        id: "colors-mc-1",
        type: "multiple-choice",
        title: "Kırmızı Elma Nerede?",
        question: "Hangisi kırmızı renklidir? 🍎",
        visual: "🍎",
        options: [
          { emoji: "🍎", text: "Elma", isCorrect: true },
          { emoji: "🍌", text: "Muz", isCorrect: false },
          { emoji: "🐬", text: "Yunus", isCorrect: false },
        ],
        successMessage: "Harika! Doğru cevap, elma kırmızıdır! 🎉",
        retryMessage: "Bir daha bakalım. Kırmızı renk çilek ve elmalarda olur.",
      },
      {
        id: "colors-match-2",
        type: "matching",
        title: "Renk Eşleştirme",
        question: "Renkleri nesnelerle doğru şekilde eşleştir!",
        leftItems: [
          { id: "blue", content: "🔵 Mavi" },
          { id: "red", content: "🔴 Kırmızı" },
          { id: "yellow", content: "🟡 Sarı" },
        ],
        rightItems: [
          { id: "strawberry", content: "🍓 Çilek" },
          { id: "ocean", content: "🌊 Deniz" },
          { id: "sun", content: "☀️ Güneş" },
        ],
        correctPairs: {
          blue: "ocean",
          red: "strawberry",
          yellow: "sun",
        },
        successMessage: "Harika eşleştirdin! Renkler tam yerine oturdu! 🌟",
        retryMessage: "Bir daha deneyelim! Mavi deniz, kırmızı çilek, sarı güneş.",
      },
      {
        id: "colors-odd-3",
        type: "find-the-odd",
        title: "Farklı Rengi Bul",
        question: "Gruptaki diğer nesnelerden farklı renkte olanı seç!",
        items: [
          { id: "apple", emoji: "🍎", text: "Kırmızı Elma", isOdd: false },
          { id: "strawberry", emoji: "🍓", text: "Kırmızı Çilek", isOdd: false },
          { id: "cherry", emoji: "🍒", text: "Kırmızı Kiraz", isOdd: false },
          { id: "banana", emoji: "🍌", text: "Sarı Muz", isOdd: true },
        ],
        successMessage: "Muhteşem! Muz sarı olduğu için gruptan farklıdır! 🍌",
        retryMessage: "Bir daha bakalım. Kırmızı olmayan hangisi?",
      },
    ],
    quiz: [
      {
        question: "Gökyüzü genellikle hangi renktir?",
        hint: "Gündüz başımızı yukarı kaldırdığımızda gördüğümüz renk.",
        options: [
          { emoji: "🔵", text: "Mavi", isCorrect: true },
          { emoji: "🟡", text: "Sarı", isCorrect: false },
          { emoji: "🟢", text: "Yeşil", isCorrect: false },
        ],
      },
      {
        question: "Kurbağalar genellikle hangi renktir?",
        hint: "Vırak vırak diyen sevimli dostumuz.",
        options: [
          { emoji: "🔴", text: "Kırmızı", isCorrect: false },
          { emoji: "🟢", text: "Yeşil", isCorrect: true },
          { emoji: "🔵", text: "Mavi", isCorrect: false },
        ],
      },
      {
        question: "Tatlı sulu limon hangi renktir?",
        hint: "Limonata yaptığımız ekşi meyve.",
        options: [
          { emoji: "🟡", text: "Sarı", isCorrect: true },
          { emoji: "🟢", text: "Yeşil", isCorrect: false },
          { emoji: "🔴", text: "Kırmızı", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "numbers",
    title: "Sayılar",
    emoji: "🔢",
    desc: "1'den 10'a kadar saymayı ve adetleri öğrenelim!",
    isFree: false,
    offlineTask: "Evde 5 tane oyuncak bul ve anne veya babana sayarak göster.",
    badge: "🔢 Sayı Kâşifi",
    learningCard: {
      title: "Sayılarla Eğlenceli Sayma",
      items: [
        {
          title: "1 Sayısı",
          subtitle: "1 tane sevimli ayıcık 🧸",
          visual: "1️⃣",
          soundText: "Bir sayısı! Ekranda bir adet ayıcık var.",
        },
        {
          title: "2 Sayısı",
          subtitle: "2 tane ötücü kuş 🐦🐦",
          visual: "2️⃣",
          soundText: "İki sayısı! Ekranda iki adet kuş var.",
        },
        {
          title: "3 Sayısı",
          subtitle: "3 tane tatlı elma 🍎🍎🍎",
          visual: "3️⃣",
          soundText: "Üç sayısı! Ekranda üç adet elma var.",
        },
        {
          title: "4 Sayısı",
          subtitle: "4 tane futbol topu ⚽⚽⚽⚽",
          visual: "4️⃣",
          soundText: "Dört sayısı! Ekranda dört adet top var.",
        },
        {
          title: "5 Sayısı",
          subtitle: "5 tane renkli balon 🎈🎈🎈🎈🎈",
          visual: "5️⃣",
          soundText: "Beş sayısı! Ekranda beş adet balon var.",
        },
      ],
    },
    games: [
      {
        id: "numbers-mc-1",
        type: "multiple-choice",
        title: "Kaç Tane Var?",
        question: "Ekranda kaç tane kırmızı elma görüyorsun? 🍎🍎🍎",
        visual: "🍎🍎🍎",
        options: [
          { emoji: "2️⃣", text: "2 Elma", isCorrect: false },
          { emoji: "3️⃣", text: "3 Elma", isCorrect: true },
          { emoji: "4️⃣", text: "4 Elma", isCorrect: false },
        ],
        successMessage: "Harika! Doğru saydın, tam 3 elma var. 🍎",
        retryMessage: "Bir daha sayalım. Elmaları tek tek parmağınla saymayı dene.",
      },
      {
        id: "numbers-match-2",
        type: "matching",
        title: "Sayıyı Eşleştir",
        question: "Sayıları doğru nesne gruplarıyla eşleştir!",
        leftItems: [
          { id: "num-2", content: "2️⃣ İki" },
          { id: "num-4", content: "4️⃣ Dört" },
          { id: "num-5", content: "5️⃣ Beş" },
        ],
        rightItems: [
          { id: "group-4", content: "⚽⚽⚽⚽ (Toplar)" },
          { id: "group-2", content: "🍒🍒 (Kirazlar)" },
          { id: "group-5", content: "🎈🎈🎈🎈🎈 (Balonlar)" },
        ],
        correctPairs: {
          "num-2": "group-2",
          "num-4": "group-4",
          "num-5": "group-5",
        },
        successMessage: "Sayılarla nesneleri mükemmel eşleştirdin! 🌟",
        retryMessage: "Bir daha deneyelim! Sayarak eşleştirelim.",
      },
      {
        id: "numbers-mc-3",
        type: "multiple-choice",
        title: "Az mı Çok mu?",
        question: "Hangisinde daha çok nesne var? Çok olan grubu bul!",
        visual: "🎈 vs 🎈🎈🎈🎈🎈",
        options: [
          { emoji: "🎈", text: "1 Balon (Az)", isCorrect: false },
          { emoji: "🎈🎈🎈🎈🎈", text: "5 Balon (Çok)", isCorrect: true },
        ],
        successMessage: "Tebrikler! 5 balon 1 balondan çok daha fazladır! 🎉",
        retryMessage: "Daha kalabalık olan grubu seçelim. Tekrar dene!",
      },
    ],
    quiz: [
      {
        question: "Parmağımızla 1 sayısını gösterelim. Kaç elma var? 🍎",
        hint: "Sadece tek bir elma görüyorsun.",
        options: [
          { emoji: "1️⃣", text: "1", isCorrect: true },
          { emoji: "2️⃣", text: "2", isCorrect: false },
          { emoji: "3️⃣", text: "3", isCorrect: false },
        ],
      },
      {
        question: "2 sayısından hemen sonra hangi sayı gelir?",
        hint: "Birden başlayarak sayalım: Bir, iki...",
        options: [
          { emoji: "1️⃣", text: "1", isCorrect: false },
          { emoji: "3️⃣", text: "3", isCorrect: true },
          { emoji: "4️⃣", text: "4", isCorrect: false },
        ],
      },
      {
        question: "Ekranda kaç tane yıldız var? ⭐⭐⭐⭐⭐",
        hint: "Yıldızları teker teker saymayı deneyelim.",
        options: [
          { emoji: "3️⃣", text: "3", isCorrect: false },
          { emoji: "4️⃣", text: "4", isCorrect: false },
          { emoji: "5️⃣", text: "5", isCorrect: true },
        ],
      },
    ],
  },
  {
    slug: "shapes",
    title: "Şekiller",
    emoji: "📐",
    desc: "Daire, kare, üçgen ve dikdörtgen şekillerini tanıyalım!",
    isFree: false,
    offlineTask: "Evde daireye benzeyen 2 eşya bul ve ailene göster.",
    badge: "📐 Şekil Ustası",
    learningCard: {
      title: "Şekilleri Öğrenelim",
      items: [
        {
          title: "Daire",
          subtitle: "Daire yuvarlaktır, hiç köşesi yoktur.",
          visual: "🔴",
          soundText: "Daire yuvarlaktır, köşesi yoktur.",
        },
        {
          title: "Kare",
          subtitle: "Karenin 4 eşit kenarı ve 4 köşesi vardır.",
          visual: "🟩",
          soundText: "Karenin dört eşit kenarı ve dört köşesi vardır.",
        },
        {
          title: "Üçgen",
          subtitle: "Üçgenin 3 kenarı ve 3 köşesi vardır.",
          visual: "🔺",
          soundText: "Üçgenin üç kenarı ve üç köşesi vardır.",
        },
        {
          title: "Dikdörtgen",
          subtitle: "Dikdörtgenin 2 uzun, 2 kısa kenarı vardır.",
          visual: "🟦",
          soundText: "Dikdörtgenin iki uzun, iki kısa kenarı vardır.",
        },
      ],
    },
    games: [
      {
        id: "shapes-mc-1",
        type: "multiple-choice",
        title: "Şekli Bul",
        question: "Soru: Hangisi dairedir? Yuvarlak şekli bul!",
        visual: "🔴 🟩 🔺",
        options: [
          { emoji: "🔴", text: "Daire", isCorrect: true },
          { emoji: "🟩", text: "Kare", isCorrect: false },
          { emoji: "🔺", text: "Üçgen", isCorrect: false },
        ],
        successMessage: "Harika! Daire yuvarlaktır ve hiç köşesi yoktur! 🔴",
        retryMessage: "Bir daha bakalım. Daire tekerlek gibi yuvarlaktır.",
      },
      {
        id: "shapes-match-2",
        type: "matching",
        title: "Evdeki Şekiller",
        question: "Eşyaların hangi şekle benzediğini bul ve eşleştir!",
        leftItems: [
          { id: "ball", content: "⚽ Futbol Topu" },
          { id: "book", content: "📖 Hikaye Kitabı" },
          { id: "window", content: "🪟 Ev Penceresi" },
        ],
        rightItems: [
          { id: "circle", content: "🔴 Daire" },
          { id: "rectangle", content: "🟦 Dikdörtgen" },
          { id: "square", content: "🟩 Kare" },
        ],
        correctPairs: {
          ball: "circle",
          book: "rectangle",
          window: "square",
        },
        successMessage: "Mükemmel! Günlük eşyaların şekillerini buldun! 🪟⚽",
        retryMessage: "Tekrar deneyelim. Top yuvarlaktır, kitap uzun karedir.",
      },
      {
        id: "shapes-match-3",
        type: "matching",
        title: "Gölge Eşleştirme",
        question: "Şekilleri doğru gölgeleriyle eşleştir!",
        leftItems: [
          { id: "circle-sh", content: "🔴 Daire" },
          { id: "triangle-sh", content: "🔺 Üçgen" },
          { id: "square-sh", content: "🟩 Kare" },
        ],
        rightItems: [
          { id: "shadow-tri", content: "▲ (Gölge)" },
          { id: "shadow-cir", content: "⚫ (Gölge)" },
          { id: "shadow-squ", content: "■ (Gölge)" },
        ],
        correctPairs: {
          "circle-sh": "shadow-cir",
          "triangle-sh": "shadow-tri",
          "square-sh": "shadow-squ",
        },
        successMessage: "Harika! Gölgeleri tam eşleştirdin! 🌟",
        retryMessage: "Şeklin dış hatlarına dikkat et. Bir daha deneyelim.",
      },
    ],
    quiz: [
      {
        question: "Pizzanın lezzetli bir dilimi hangi şekle benzer?",
        hint: "Üç kenarı ve sivri uçları vardır.",
        options: [
          { emoji: "🔺", text: "Üçgen", isCorrect: true },
          { emoji: "🔴", text: "Daire", isCorrect: false },
          { emoji: "🟩", text: "Kare", isCorrect: false },
        ],
      },
      {
        question: "Duvar saati genellikle hangi geometrik şekle benzer?",
        hint: "Zamanı gösteren yuvarlak saat kadranı.",
        options: [
          { emoji: "🔴", text: "Daire", isCorrect: true },
          { emoji: "🔺", text: "Üçgen", isCorrect: false },
          { emoji: "🟦", text: "Dikdörtgen", isCorrect: false },
        ],
      },
      {
        question: "Hangi şeklin tam olarak 4 köşesi vardır?",
        hint: "Kutulara benzeyen, tüm kenarları eşit olan şekil.",
        options: [
          { emoji: "🟩", text: "Kare", isCorrect: true },
          { emoji: "🔴", text: "Daire", isCorrect: false },
          { emoji: "🔺", text: "Üçgen", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "animals",
    title: "Hayvanlar",
    emoji: "🦁",
    desc: "Sevimli orman ve deniz canlılarını keşfedelim!",
    isFree: false,
    offlineTask: "Bugün gördüğün veya hayal ettiğin bir hayvanı ailene anlat. Nerede yaşadığını söyle.",
    badge: "🦁 Hayvan Dostu",
    learningCard: {
      title: "Sevimli Hayvan Dostlarımız",
      items: [
        {
          title: "Kedi",
          subtitle: "Miyav diyen, sevimli tüylü dostumuz. 🐱",
          visual: "🐱",
          soundText: "Kedi! Sevimli bir evcil hayvandır, miyavlar.",
        },
        {
          title: "Köpek",
          subtitle: "Hav hav diyen, sadık dostumuz. 🐶",
          visual: "🐶",
          soundText: "Köpek! Sadık bir dosttur, hav hav diye havlar.",
        },
        {
          title: "Kuş",
          subtitle: "Cik cik öten, uçabilen dostumuz. 🐦",
          visual: "🐦",
          soundText: "Kuş! Gökyüzünde uçar, cik cik diye öter.",
        },
        {
          title: "Balık",
          subtitle: "Denizlerde yüzen solungaçlı dostumuz. 🐟",
          visual: "🐟",
          soundText: "Balık! Denizin derinliklerinde yüzer.",
        },
      ],
    },
    games: [
      {
        id: "animals-mc-1",
        type: "multiple-choice",
        title: "Hayvanı Tanı",
        question: "Ekranda duran bu sevimli hayvan hangisidir? 🐱",
        visual: "🐱",
        options: [
          { emoji: "🐱", text: "Kedi", isCorrect: true },
          { emoji: "🐶", text: "Köpek", isCorrect: false },
          { emoji: "🐟", text: "Balık", isCorrect: false },
        ],
        successMessage: "Harika! Doğru bildin, bu tatlı bir kedidir! 🐱",
        retryMessage: "Bir daha bakalım. Kendisi miyav diyerek gezer.",
      },
      {
        id: "animals-mc-2",
        type: "multiple-choice",
        title: "Hayvan Sesi",
        question: "'Miyav' sesi hangi hayvana aittir?",
        visual: "🔊 'Miyav!'",
        options: [
          { emoji: "🐱", text: "Kedi", isCorrect: true },
          { emoji: "🐮", text: "İnek", isCorrect: false },
          { emoji: "🐦", text: "Kuş", isCorrect: false },
        ],
        successMessage: "Harika! Kedi miyavlar, inek möler, kuş cikler! 🎉",
        retryMessage: "Düşünelim! Bu tüylü dost süt içmeyi çok sever.",
      },
      {
        id: "animals-match-3",
        type: "matching",
        title: "Nerede Yaşar?",
        question: "Hayvanları doğru yaşam alanlarıyla eşleştir!",
        leftItems: [
          { id: "fish-h", content: "🐟 Balık" },
          { id: "bird-h", content: "🐦 Kuş" },
          { id: "dog-h", content: "🐶 Köpek" },
        ],
        rightItems: [
          { id: "sea-h", content: "🌊 Deniz" },
          { id: "tree-h", content: "🌳 Ağaç Dalı" },
          { id: "house-h", content: "🏠 Sıcak Ev" },
        ],
        correctPairs: {
          "fish-h": "sea-h",
          "bird-h": "tree-h",
          "dog-h": "house-h",
        },
        successMessage: "Tüm hayvanları mutlu yuvalarına yerleştirdin! 🌳🌊",
        retryMessage: "Tekrar deneyelim! Balık suda yüzer, kuş ağaçta uçar.",
      },
    ],
    quiz: [
      {
        question: "Gökyüzünde uçan ve cik cik öten hayvan hangisidir?",
        hint: "Kanatları ve tüyleri olan küçük bir canlı.",
        options: [
          { emoji: "🐦", text: "Kuş", isCorrect: true },
          { emoji: "🐟", text: "Balık", isCorrect: false },
          { emoji: "🐱", text: "Kedi", isCorrect: false },
        ],
      },
      {
        question: "Hav hav diye ses çıkaran sadık dostumuz hangisidir?",
        hint: "Kemik çiğnemeyi ve koşup oynamayı çok sever.",
        options: [
          { emoji: "🐶", text: "Köpek", isCorrect: true },
          { emoji: "🐮", text: "İnek", isCorrect: false },
          { emoji: "🐰", text: "Tavşan", isCorrect: false },
        ],
      },
      {
        question: "Denizde solungaçlarıyla nefes alıp yüzen sevimli dostumuz?",
        hint: "Sadece suyun altında yüzerek yaşayabilir.",
        options: [
          { emoji: "🐟", text: "Balık", isCorrect: true },
          { emoji: "🐶", text: "Köpek", isCorrect: false },
          { emoji: "🐦", text: "Kuş", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "emotions",
    title: "Duygularımız",
    emoji: "😊",
    desc: "Mutluluk, şaşkınlık ve hislerimizi tanıyalım!",
    isFree: false,
    offlineTask: "Bugün nasıl hissettiğini (mutlu, heyecanlı vb.) anne veya babana anlat.",
    badge: "😊 Duygu Kâşifi",
    learningCard: {
      title: "Duygularımızı Tanıyalım",
      items: [
        {
          title: "Mutlu",
          subtitle: "İçimiz neşeyle dolar, yüzümüz güler. 😊",
          visual: "😊",
          soundText: "Mutlu! Yüzümüz güler, içimiz neşeyle dolar.",
        },
        {
          title: "Üzgün",
          subtitle: "Canımız sıkılabilir, ağlamak isteyebiliriz. 😢",
          visual: "😢",
          soundText: "Üzgün! Canımız sıkılabilir, ağlamak isteyebiliriz.",
        },
        {
          title: "Kızgın",
          subtitle: "Kaşlarımızı çatarız, derin nefes almalıyız. 😡",
          visual: "😡",
          soundText: "Kızgın! Kaşlarımızı çatarız, derin nefes alıp sakinleşebiliriz.",
        },
        {
          title: "Şaşkın",
          subtitle: "Ağzımız açılır, gözlerimiz kocaman olur. 😲",
          visual: "😲",
          soundText: "Şaşkın! Ağzımız açılır, gözlerimiz kocaman olur.",
        },
      ],
    },
    games: [
      {
        id: "emotions-mc-1",
        type: "multiple-choice",
        title: "Yüz İfadesini Bul",
        question: "Bu çocuk nasıl hissediyor? Yüz ifadesine bak!",
        visual: "😊",
        options: [
          { emoji: "😊", text: "Mutlu", isCorrect: true },
          { emoji: "😢", text: "Üzgün", isCorrect: false },
          { emoji: "😡", text: "Kızgın", isCorrect: false },
        ],
        successMessage: "Tebrikler! Gülen yüz, mutlu bir hissi gösterir! 😊",
        retryMessage: "Bir daha bakalım. Ağız yukarı doğru kıvrılmış.",
      },
      {
        id: "emotions-match-2",
        type: "matching",
        title: "Duygu Eşleştirme",
        question: "Duygu kelimelerini doğru yüz ifadeleriyle eşleştir!",
        leftItems: [
          { id: "happy-t", content: "Mutlu" },
          { id: "sad-t", content: "Üzgün" },
          { id: "angry-t", content: "Kızgın" },
        ],
        rightItems: [
          { id: "angry-e", content: "😡 Kızgın Yüz" },
          { id: "happy-e", content: "😊 Gülen Yüz" },
          { id: "sad-e", content: "😢 Ağlayan Yüz" },
        ],
        correctPairs: {
          "happy-t": "happy-e",
          "sad-t": "sad-e",
          "angry-t": "angry-e",
        },
        successMessage: "Duyguları yüz ifadeleriyle mükemmel eşleştirdin! 🌟",
        retryMessage: "Tekrar dene. Emojilerin kaşlarına ve ağızlarına dikkat et.",
      },
      {
        id: "emotions-mc-3",
        type: "multiple-choice",
        title: "Ne Yapabiliriz?",
        question: "Arkadaşın oyuncağını paylaşmadı. Ne yapsak daha iyi olur?",
        visual: "🧸🤝",
        options: [
          { emoji: "🗣️", text: "Sakin kalıp konuşabiliriz", isCorrect: true },
          { emoji: "🔊", text: "Bağırabiliriz", isCorrect: false },
          { emoji: "😠", text: "Oyuncağı çekip alabiliriz", isCorrect: false },
        ],
        successMessage: "Harika seçim! Sakince konuşmak sorunları tatlıca çözer. 🤝",
        retryMessage: "Bir daha düşünelim. Arkadaşımızla aramızı bozmayacak seçenek hangisi?",
      },
    ],
    quiz: [
      {
        question: "Sana sürpriz güzel bir hediye alındığında nasıl hissedersin?",
        hint: "İçimiz kıpır kıpır olur ve gülümseriz.",
        options: [
          { emoji: "😊", text: "Mutlu", isCorrect: true },
          { emoji: "😡", text: "Kızgın", isCorrect: false },
          { emoji: "😢", text: "Üzgün", isCorrect: false },
        ],
      },
      {
        question: "Kendimizi korkmuş hissettiğimizde ne yapmalıyız?",
        hint: "Bizi seven ve koruyan kişilere sığınmalıyız.",
        options: [
          { emoji: "👨‍👩‍👧", text: "Ailemizden yardım isteriz", isCorrect: true },
          { emoji: "🤫", text: "Kimseye söylemeyiz", isCorrect: false },
          { emoji: "🏃", text: "Tek başımıza kaçarız", isCorrect: false },
        ],
      },
      {
        question: "Arkadaşımızın çok üzgün ve ağlamaklı olduğunu görsek ne yaparız?",
        hint: "Ona sevgimizi gösterip moral verebiliriz.",
        options: [
          { emoji: "🤗", text: "Ona sarılıp teselli ederiz", isCorrect: true },
          { emoji: "😆", text: "Ona güleriz", isCorrect: false },
          { emoji: "🚶", text: "Görmezden gelip gideriz", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "manners",
    title: "Görgü Kuralları",
    emoji: "🤝",
    desc: "Paylaşma, teşekkür etme ve nezaket kurallarını öğrenelim!",
    isFree: false,
    offlineTask: "Bugün ailenden birine 'Teşekkür ederim' veya 'Lütfen' de.",
    badge: "🤝 Nazik Arkadaş",
    learningCard: {
      title: "Nezaket Kuralları",
      items: [
        {
          title: "Teşekkür Ederim",
          subtitle: "Bize yardım eden insanlara söyleriz. 🤝",
          visual: "🤝",
          soundText: "Teşekkür ederim! Bize iyilik yapan veya yardım eden kişilere söyleriz.",
        },
        {
          title: "Lütfen",
          subtitle: "Bir şey rica ederken kibarca söyleriz. 🙏",
          visual: "🙏",
          soundText: "Lütfen! Birinden bir ricada bulunurken bu sihirli kelimeyi kullanırız.",
        },
        {
          title: "Paylaşmak",
          subtitle: "Oyuncakları paylaşmak arkadaşlığı güçlendirir. ⚽",
          visual: "⚽",
          soundText: "Paylaşmak! Arkadaşlarımızla oyuncak ve eşyaları paylaşmak güzeldir.",
        },
        {
          title: "Sıra Beklemek",
          subtitle: "Sıramız gelene kadar sabırla durmaktır. 🚶",
          visual: "🚶",
          soundText: "Sıra beklemek! Parkta kaydırağa binerken sıramızı sabırla bekleriz.",
        },
      ],
    },
    games: [
      {
        id: "manners-mc-1",
        type: "multiple-choice",
        title: "Ne Söylemeliyiz?",
        question: "Biri sana kayıp oyuncağını bulmada yardım etti. Ne söylersin?",
        visual: "🧸💖",
        options: [
          { emoji: "🌸", text: "Teşekkür ederim", isCorrect: true },
          { emoji: "😠", text: "Ver onu bana", isCorrect: false },
          { emoji: "👋", text: "Git buradan", isCorrect: false },
        ],
        successMessage: "Harika! Teşekkür etmek çok nazik ve tatlı bir davranıştır! 🌸",
        retryMessage: "Düşünelim! Biri bize yardım edince mutlu oluruz ve ne deriz?",
      },
      {
        id: "manners-mc-2",
        type: "multiple-choice",
        title: "Sıra Bekleme Oyunu",
        question: "Parktaki kaydıraktan kaymak için ne yapmalıyız? 🛝",
        visual: "🛝🚶🚶",
        options: [
          { emoji: "🚶", text: "Sıramızı beklemeliyiz", isCorrect: true },
          { emoji: "😠", text: "Herkesi itip geçmeliyiz", isCorrect: false },
          { emoji: "😭", text: "Ağlayıp huysuzluk etmeliyiz", isCorrect: false },
        ],
        successMessage: "Bravo! Sıra beklemek hem adil hem de güvenlidir! 🛝🌟",
        retryMessage: "Bir daha düşünelim. Arkadaşlarımızı rahatsız etmeden nasıl oynarız?",
      },
      {
        id: "manners-mc-3",
        type: "multiple-choice",
        title: "Paylaşmak Güzeldir",
        question: "Arkadaşın da senin oynadığın top ile oynamak istiyor. Ne yaparsın?",
        visual: "⚽🤝",
        options: [
          { emoji: "🤝", text: "Birlikte oynayabiliriz", isCorrect: true },
          { emoji: "🤫", text: "Topu saklayabilirim", isCorrect: false },
          { emoji: "😠", text: "Arkadaşımı itebilirim", isCorrect: false },
        ],
        successMessage: "Harika! Oyunu paylaşmak, eğlenceyi ikiye katlar! ⚽🎉",
        retryMessage: "Unutmayalım! Paylaşmak arkadaşlığımızı güçlendirir. Tekrar dene.",
      },
    ],
    quiz: [
      {
        question: "Birinden bir şey isterken hangi sihirli kelimeyi kullanmalıyız?",
        hint: "Rica ederken kullandığımız kibar kelime.",
        options: [
          { emoji: "🙏", text: "Lütfen", isCorrect: true },
          { emoji: "😠", text: "Hemen ver", isCorrect: false },
          { emoji: "🤫", text: "Benim o", isCorrect: false },
        ],
      },
      {
        question: "Arkadaşlarımızla oyuncakları paylaşmak bize nasıl hissettirir?",
        hint: "Birlikte oynamak arkadaşlığımızı pekiştirir.",
        options: [
          { emoji: "😊", text: "Mutlu ve huzurlu", isCorrect: true },
          { emoji: "😡", text: "Kızgın", isCorrect: false },
          { emoji: "😢", text: "Üzgün", isCorrect: false },
        ],
      },
      {
        question: "Annemiz bize lezzetli bir yemek hazırladığında ne söyleriz?",
        hint: "Yemeği yapan kişiye teşekkür etme ifadesi.",
        options: [
          { emoji: "👩‍🍳", text: "Eline sağlık", isCorrect: true },
          { emoji: "👎", text: "Çok kötü olmuş", isCorrect: false },
          { emoji: "🤫", text: "Hiçbir şey demem", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "english",
    title: "İngilizce Kelimeler",
    emoji: "🇬🇧",
    desc: "İlk İngilizce kelimeleri ve basit selamlaşmayı öğrenelim!",
    isFree: false,
    offlineTask: "Bugün anne veya babana 'Hello' de ve el salla.",
    badge: "🇬🇧 İngilizce Kâşifi",
    learningCard: {
      title: "İlk İngilizce Kelimeler",
      items: [
        {
          title: "Hello",
          subtitle: "Merhaba demek. 👋",
          visual: "👋",
          soundText: "Hello! İngilizce merhaba demektir.",
        },
        {
          title: "Goodbye",
          subtitle: "Hoşça kal / Güle güle demek. 👋",
          visual: "🏃",
          soundText: "Goodbye! İngilizce hoşça kal demektir.",
        },
        {
          title: "Cat",
          subtitle: "Kedi demek. 🐱",
          visual: "🐱",
          soundText: "Cat! İngilizce kedi demektir.",
        },
        {
          title: "Dog",
          subtitle: "Köpek demek. 🐶",
          visual: "🐶",
          soundText: "Dog! İngilizce köpek demektir.",
        },
        {
          title: "Red",
          subtitle: "Kırmızı renk demek. 🔴",
          visual: "🔴",
          soundText: "Red! İngilizce kırmızı demektir.",
        },
        {
          title: "Blue",
          subtitle: "Mavi renk demek. 🔵",
          visual: "🔵",
          soundText: "Blue! İngilizce mavi demektir.",
        },
      ],
    },
    games: [
      {
        id: "english-mc-1",
        type: "multiple-choice",
        title: "Kelimeyi Bul",
        question: "Soru: Kedi İngilizce olarak nasıl söylenir? 🐱",
        visual: "🐱",
        options: [
          { emoji: "🐱", text: "Cat", isCorrect: true },
          { emoji: "🐶", text: "Dog", isCorrect: false },
          { emoji: "🔴", text: "Red", isCorrect: false },
        ],
        successMessage: "Harika! Kedi İngilizce Cat demektir. 🐱",
        retryMessage: "Bir daha bakalım. Dog köpek, Red ise kırmızıdır.",
      },
      {
        id: "english-match-2",
        type: "matching",
        title: "Resimle Eşleştir",
        question: "İngilizce kelimeleri doğru resimlerle eşleştir!",
        leftItems: [
          { id: "eng-dog", content: "Dog" },
          { id: "eng-blue", content: "Blue" },
          { id: "eng-red", content: "Red" },
        ],
        rightItems: [
          { id: "img-red", content: "🔴 Kırmızı" },
          { id: "img-dog", content: "🐶 Köpek" },
          { id: "img-blue", content: "🔵 Mavi" },
        ],
        correctPairs: {
          "eng-dog": "img-dog",
          "eng-blue": "img-blue",
          "eng-red": "img-red",
        },
        successMessage: "Mükemmel! İngilizce kelimeleri resimlerle doğru eşleştirdin! 🌟",
        retryMessage: "Tekrar dene! Dog köpek, Blue mavi, Red kırmızıdır.",
      },
      {
        id: "english-mc-3",
        type: "multiple-choice",
        title: "Selamlaşma Zamanı",
        question: "Bir arkadaşın yanına geldi. Ona nasıl selam verirsin?",
        visual: "👋👦",
        options: [
          { emoji: "👋", text: "Hello", isCorrect: true },
          { emoji: "🏃", text: "Goodbye", isCorrect: false },
          { emoji: "🔵", text: "Blue", isCorrect: false },
        ],
        successMessage: "Tebrikler! Karşılaşınca 'Hello', ayrılırken 'Goodbye' deriz! 👋",
        retryMessage: "Düşünelim! Merhaba demek için hangi kelimeyi kullanıyorduk?",
      },
    ],
    quiz: [
      {
        question: "Sadık dostumuz köpeğin İngilizce adı hangisidir?",
        hint: "Kemik çiğnemeyi sever, hav hav der.",
        options: [
          { emoji: "🐶", text: "Dog", isCorrect: true },
          { emoji: "🐱", text: "Cat", isCorrect: false },
          { emoji: "🐦", text: "Bird", isCorrect: false },
        ],
      },
      {
        question: "Bulutsuz gökyüzünün rengi olan mavi İngilizce nedir?",
        hint: "Denizlerin ve gökyüzünün rengi.",
        options: [
          { emoji: "🔵", text: "Blue", isCorrect: true },
          { emoji: "🔴", text: "Red", isCorrect: false },
          { emoji: "🟡", text: "Yellow", isCorrect: false },
        ],
      },
      {
        question: "Oyun bitti ve arkadaşımız eve gidiyor. Arkasından ne söyleriz?",
        hint: "Güle güle, hoşça kal anlamında.",
        options: [
          { emoji: "👋", text: "Goodbye", isCorrect: true },
          { emoji: "👋", text: "Hello", isCorrect: false },
          { emoji: "🙏", text: "Please", isCorrect: false },
        ],
      },
    ],
  },
  {
    slug: "attention",
    title: "Dikkat & Mantık",
    emoji: "🧠",
    desc: "Gözlem, eşleştirme ve hafıza becerilerini geliştirin!",
    isFree: false,
    offlineTask: "Odanda 3 nesne seç. Birini sakla ve ailenden hangisinin eksik olduğunu bulmasını iste.",
    badge: "🧠 Dikkat Dedektifi",
    learningCard: {
      title: "Süper Dikkat Egzersizleri",
      items: [
        {
          title: "Farklı Olan",
          subtitle: "Gruptaki diğer şeylere benzemeyen nesnedir.",
          visual: "🔍",
          soundText: "Farklı olan! Gruptaki diğer nesnelere benzemeyen şeyi bulacağız.",
        },
        {
          title: "Gölgeler",
          subtitle: "Işığın önü kapanınca oluşan koyu şekildir.",
          visual: "⚫",
          soundText: "Gölge! Nesnelerin dış hatlarını takip ederek gölgesini bulacağız.",
        },
        {
          title: "Hangisi Eksik",
          subtitle: "Önceden var olan ama sonradan saklanan şeydir.",
          visual: "❓",
          soundText: "Hangisi eksik! Hafızamızı kullanıp kaybolan nesneyi tahmin edeceğiz.",
        },
      ],
    },
    games: [
      {
        id: "attention-odd-1",
        type: "find-the-odd",
        title: "Farklı Olanı Bul",
        question: "Aşağıdakilerden hangisi meyve değildir? Farklı olanı seç!",
        items: [
          { id: "apple-f", emoji: "🍎", text: "Elma", isOdd: false },
          { id: "banana-f", emoji: "🍌", text: "Muz", isOdd: false },
          { id: "grape-f", emoji: "🍇", text: "Üzüm", isOdd: false },
          { id: "car-f", emoji: "🚗", text: "Araba", isOdd: true },
        ],
        successMessage: "Harika dikkat! Araba bir oyuncak/taşıttır, meyve değildir! 🚗",
        retryMessage: "Yiyemeyeceğimiz, diğerlerinden tamamen farklı olan şeyi seçelim.",
      },
      {
        id: "attention-mc-2",
        type: "multiple-choice",
        title: "Gölgeyi Eşleştir",
        question: "Bu sevimli balığın gölgesi hangisidir? 🐟",
        visual: "🐟",
        options: [
          { emoji: "⚫", text: "Balık Gölgesi (Balık Şekli)", isCorrect: true },
          { emoji: "⬛", text: "Kare Şekli", isCorrect: false },
          { emoji: "▲", text: "Üçgen Şekli", isCorrect: false },
        ],
        successMessage: "Harika gözlem! Gölge, balığın dış hatlarıyla tam eşleşiyor! ⚫",
        retryMessage: "Şekle dikkatli bak. Balığın kuyruğu ve yüzgeçleri gölgede de olmalı.",
      },
      {
        id: "attention-mem-3",
        type: "memory-missing",
        title: "Hangisi Eksik?",
        question: "Dikkatlice bak ve kaybolan nesneyi bul!",
        items: [
          { id: "bear", emoji: "🧸", text: "Ayıcık" },
          { id: "car", emoji: "🚗", text: "Araba" },
          { id: "ball", emoji: "⚽", text: "Top" },
        ],
        missingItemIndex: 1, // araba kaybolacak
        options: [
          { emoji: "⚽", text: "Top", isCorrect: false },
          { emoji: "🚗", text: "Araba", isCorrect: true },
          { emoji: "🧸", text: "Ayıcık", isCorrect: false },
        ],
        successMessage: "Müthiş hafıza! Kaybolan nesne kırmızı arabaydı! 🚗🎉",
        retryMessage: "Bir daha bakalım. İlk başta duran ama şimdi olmayan hangisi?",
      },
    ],
    quiz: [
      {
        question: "Aşağıdaki hayvanlardan hangisi uçamaz?",
        hint: "Kuşlar ve kelebekler havada uçar, peki ya zıplayan dostumuz?",
        options: [
          { emoji: "🐰", text: "Tavşan", isCorrect: true },
          { emoji: "🐦", text: "Kuş", isCorrect: false },
          { emoji: "🦋", text: "Kelebek", isCorrect: false },
        ],
      },
      {
        question: "Hangi şekil diğerlerinden farklıdır? Dikkatlice bak!",
        hint: "Köşeleri olanlar ve yuvarlak olan.",
        options: [
          { emoji: "🔴", text: "Daire (Yuvarlak)", isCorrect: true },
          { emoji: "🟩", text: "Kare (Köşeli)", isCorrect: false },
          { emoji: "🟩", text: "Kare (Köşeli)", isCorrect: false },
        ],
      },
      {
        question: "Muz, elma ve çilek grubuna hangisi eklenebilir?",
        hint: "Meyvelerin yanına yeni bir meyve ekleyelim.",
        options: [
          { emoji: "🍉", text: "Karpuz", isCorrect: true },
          { emoji: "✏️", text: "Kalem", isCorrect: false },
          { emoji: "👟", text: "Ayakkabı", isCorrect: false },
        ],
      },
    ],
  },
];
