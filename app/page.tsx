"use client";

import { useMemo, useState } from "react";

type FactorKey = "fit" | "cost" | "work" | "postStudy" | "tech";

type Program = {
  id: string;
  mark: string;
  university: string;
  city: string;
  country: string;
  program: string;
  fit: number;
  cost: number;
  work: number;
  postStudy: number;
  tech: number;
  tuition: string;
  workRule: string;
  postStudyRule: string;
  label: "Güçlü seçenek" | "Zorlayıcı" | "İddialı";
  source: string;
  note: string;
};

const programs: Program[] = [
  {
    id: "su-information-security",
    mark: "SU",
    university: "Stockholm University",
    city: "Stockholm",
    country: "İsveç",
    program: "Information Security",
    fit: 76,
    cost: 43,
    work: 38,
    postStudy: 64,
    tech: 92,
    tuition: "270.000 SEK / 2 yıl",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.su.se/english/education/course-catalogue/sm/smino",
    note: "Alan şartı esnek; genel GPA barajı ilan edilmemiş.",
  },
  {
    id: "kit-computer-science",
    mark: "KIT",
    university: "Karlsruhe Institute of Technology",
    city: "Karlsruhe",
    country: "Almanya",
    program: "Computer Science",
    fit: 58,
    cost: 88,
    work: 82,
    postStudy: 88,
    tech: 78,
    tuition: "1.500 € / dönem",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Zorlayıcı",
    source:
      "https://www.sle.kit.edu/english/vorstudium/master-computer-science.php",
    note: "Transkriptte CS, matematik ve mühendislik kredileri kritik.",
  },
  {
    id: "kth-computer-science",
    mark: "KTH",
    university: "KTH Royal Institute of Technology",
    city: "Stockholm",
    country: "İsveç",
    program: "Computer Science",
    fit: 41,
    cost: 34,
    work: 38,
    postStudy: 64,
    tech: 96,
    tuition: "Yaklaşık 360.000 SEK / 2 yıl",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "İddialı",
    source:
      "https://www.kth.se/en/studies/master/computer-science/msc-computer-science-1.419974",
    note: "Akademik rekabet yüksek; iş deneyimi GPA açığını tek başına kapatmaz.",
  },
  {
    id: "su-computer-systems",
    mark: "SU",
    university: "Stockholm University",
    city: "Stockholm",
    country: "İsveç",
    program: "Computer and Systems Sciences",
    fit: 72,
    cost: 43,
    work: 38,
    postStudy: 64,
    tech: 92,
    tuition: "Program ücretine göre değişir",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.su.se/english/education/course-catalogue/sc/scsso",
    note: "Bilgisayar ve sistem bilimlerinden en az 90 ECTS bekleniyor.",
  },
  {
    id: "kth-cybersecurity",
    mark: "KTH",
    university: "KTH Royal Institute of Technology",
    city: "Stockholm",
    country: "İsveç",
    program: "Cybersecurity",
    fit: 38,
    cost: 34,
    work: 38,
    postStudy: 64,
    tech: 96,
    tuition: "Program ücretine göre değişir",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "İddialı",
    source:
      "https://www.kth.se/en/studies/master/cybersecurity/msc-cybersecurity-1.1076022",
    note: "Teknik ön koşullar ve seçim rekabeti yüksek.",
  },
  {
    id: "su-data-science",
    mark: "SU",
    university: "Stockholm University",
    city: "Stockholm",
    country: "İsveç",
    program: "Data Science, Statistics and Decision Analysis",
    fit: 63,
    cost: 43,
    work: 38,
    postStudy: 64,
    tech: 92,
    tuition: "270.000 SEK / 2 yıl",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.su.se/english/education/course-catalogue/sd/sdsbo",
    note: "Programlama altyapısı uygun; istatistik hazırlığı ayrıca incelenmeli.",
  },
  {
    id: "liu-computer-science",
    mark: "LiU",
    university: "Linköping University",
    city: "Linköping",
    country: "İsveç",
    program: "Computer Science",
    fit: 61,
    cost: 50,
    work: 38,
    postStudy: 64,
    tech: 72,
    tuition: "Program ücretine göre değişir",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Zorlayıcı",
    source: "https://studieinfo.liu.se/en/program/6MICS",
    note: "Yazılım ve sistem altyapısı uyumlu; uzmanlık ön koşulları kontrol edilmeli.",
  },
  {
    id: "lnu-software-technology",
    mark: "LNU",
    university: "Linnaeus University",
    city: "Växjö",
    country: "İsveç",
    program: "Software Technology",
    fit: 74,
    cost: 57,
    work: 38,
    postStudy: 64,
    tech: 58,
    tuition: "Program sayfasında kontrol et",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.lnu.se/en/programme/software-technology-master-programme-nada2/vaxjo-international-autumn/",
    note: "Uygulamalı yazılım deneyiminle iyi örtüşen daha erişilebilir bir seçenek.",
  },
  {
    id: "skovde-data-science",
    mark: "HIS",
    university: "University of Skövde",
    city: "Skövde",
    country: "İsveç",
    program: "Data Science",
    fit: 72,
    cost: 60,
    work: 38,
    postStudy: 64,
    tech: 55,
    tuition: "Program sayfasında kontrol et",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.his.se/en/education/informatics/data-science-masters-programme-dscma/",
    note: "Proje portföyün ve programlama geçmişin başvuruyu destekleyebilir.",
  },
  {
    id: "university-west-cybersecurity",
    mark: "HV",
    university: "University West",
    city: "Trollhättan",
    country: "İsveç",
    program: "Cybersecurity",
    fit: 77,
    cost: 62,
    work: 38,
    postStudy: 64,
    tech: 52,
    tuition: "Program sayfasında kontrol et",
    workRule: "Resmî haftalık saat sınırı yok",
    postStudyRule: "Mezuniyet sonrası iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.hv.se/en/education/degree-programmes/master-in-cybersecurity/",
    note: "Uygulamalı profil ve güvenlik ilgisi için dengeli hedef.",
  },
  {
    id: "passau-computer-science",
    mark: "UP",
    university: "University of Passau",
    city: "Passau",
    country: "Almanya",
    program: "Computer Science",
    fit: 67,
    cost: 90,
    work: 82,
    postStudy: 88,
    tech: 61,
    tuition: "Dönem katkı payı",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.uni-passau.de/en/msc-computer-science",
    note: "CS ve matematik kredi dağılımı belirleyici; iki dil seçeneği avantajlı.",
  },
  {
    id: "passau-ai-engineering",
    mark: "UP",
    university: "University of Passau",
    city: "Passau",
    country: "Almanya",
    program: "Artificial Intelligence Engineering",
    fit: 58,
    cost: 90,
    work: 82,
    postStudy: 88,
    tech: 61,
    tuition: "Dönem katkı payı",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.uni-passau.de/en/msc-ai-eng",
    note: "Matematik ve teorik CS kredileri ayrıntılı inceleniyor.",
  },
  {
    id: "paderborn-computer-science",
    mark: "UPB",
    university: "Paderborn University",
    city: "Paderborn",
    country: "Almanya",
    program: "Computer Science",
    fit: 55,
    cost: 88,
    work: 82,
    postStudy: 88,
    tech: 68,
    tuition: "Dönem katkı payı",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.uni-paderborn.de/en/studyoffer/course_of_study/computer-science-master",
    note: "İngilizce program için IELTS 6.5 ve güçlü ders eşleşmesi bekleniyor.",
  },
  {
    id: "hildesheim-data-analytics",
    mark: "UHI",
    university: "University of Hildesheim",
    city: "Hildesheim",
    country: "Almanya",
    program: "Data Analytics",
    fit: 69,
    cost: 90,
    work: 82,
    postStudy: 88,
    tech: 63,
    tuition: "Dönem katkı payı",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.uni-hildesheim.de/en/studium/studieninteressierte/studiengaenge/masterstudium/data-analytics-msc/",
    note: "ML ve veri odağı güçlü; matematik ve istatistik derslerini öne çıkarmalısın.",
  },
  {
    id: "hildesheim-software-engineering",
    mark: "UHI",
    university: "University of Hildesheim",
    city: "Hildesheim",
    country: "Almanya",
    program: "Software Engineering",
    fit: 75,
    cost: 90,
    work: 82,
    postStudy: 88,
    tech: 63,
    tuition: "Dönem katkı payı",
    workRule: "20 saat/hafta veya 140 tam gün/yıl",
    postStudyRule: "18 aya kadar iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.uni-hildesheim.de/en/studium/studieninteressierte/studiengaenge/masterstudium/software-engineering-msc/",
    note: "Yazılım geliştirme deneyiminle listedeki en doğal eşleşmelerden.",
  },
  {
    id: "lut-software-engineering",
    mark: "LUT",
    university: "LUT University",
    city: "Lappeenranta",
    country: "Finlandiya",
    program: "Software Engineering",
    fit: 72,
    cost: 61,
    work: 75,
    postStudy: 85,
    tech: 60,
    tuition: "Program sayfasında kontrol et",
    workRule: "Ortalama 30 saat/hafta",
    postStudyRule: "2 yıla kadar iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.lut.fi/en/studies/tekniikka/masters-programme-software-engineering",
    note: "En az 24 ECTS bilgisayar bilimi veya ilişkili alan şartı profilinle uyumlu.",
  },
  {
    id: "oulu-computer-science-engineering",
    mark: "UO",
    university: "University of Oulu",
    city: "Oulu",
    country: "Finlandiya",
    program: "Computer Science and Engineering",
    fit: 59,
    cost: 59,
    work: 75,
    postStudy: 85,
    tech: 72,
    tuition: "Program sayfasında kontrol et",
    workRule: "Ortalama 30 saat/hafta",
    postStudyRule: "2 yıla kadar iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.oulu.fi/en/apply/masters-computer-science-and-engineering",
    note: "AI, applied computing ve cyber security yolları kariyer hedefinle uyumlu.",
  },
  {
    id: "oulu-software-engineering",
    mark: "UO",
    university: "University of Oulu",
    city: "Oulu",
    country: "Finlandiya",
    program: "Software Engineering and Information Systems",
    fit: 67,
    cost: 59,
    work: 75,
    postStudy: 85,
    tech: 72,
    tuition: "Program sayfasında kontrol et",
    workRule: "Ortalama 30 saat/hafta",
    postStudyRule: "2 yıla kadar iş arama izni",
    label: "Zorlayıcı",
    source: "https://www.oulu.fi/en/apply/masters-software-engineering-and-information-systems",
    note: "Yazılım tanımlı ürünler odağı iş deneyimini doğrudan destekliyor.",
  },
  {
    id: "uef-information-technology",
    mark: "UEF",
    university: "University of Eastern Finland",
    city: "Joensuu",
    country: "Finlandiya",
    program: "Information Technology",
    fit: 73,
    cost: 65,
    work: 75,
    postStudy: 85,
    tech: 55,
    tuition: "Program sayfasında kontrol et",
    workRule: "Ortalama 30 saat/hafta",
    postStudyRule: "2 yıla kadar iş arama izni",
    label: "Güçlü seçenek",
    source: "https://www.uef.fi/en/degree-programme/masters-degree-programme-in-information-technology",
    note: "Daha küçük şehir ve uygulamalı IT odağı kabul-maliyet dengesini güçlendiriyor.",
  },
  {
    id: "tartu-software-engineering",
    mark: "UT",
    university: "University of Tartu",
    city: "Tartu",
    country: "Estonya",
    program: "Software Engineering",
    fit: 64,
    cost: 74,
    work: 68,
    postStudy: 72,
    tech: 79,
    tuition: "Program sayfasında kontrol et",
    workRule: "Tam zamanlı eğitimi aksatmayacak şekilde",
    postStudyRule: "Mezuniyet sonrası kalış seçeneği",
    label: "Zorlayıcı",
    source: "https://ut.ee/en/curriculum/software-engineering",
    note: "Enterprise ve secure systems yolları ile 18 ECTS uygulama modülü güçlü eşleşme.",
  },
  {
    id: "tartu-computer-science",
    mark: "UT",
    university: "University of Tartu",
    city: "Tartu",
    country: "Estonya",
    program: "Computer Science",
    fit: 56,
    cost: 74,
    work: 68,
    postStudy: 72,
    tech: 79,
    tuition: "Program sayfasında kontrol et",
    workRule: "Tam zamanlı eğitimi aksatmayacak şekilde",
    postStudyRule: "Mezuniyet sonrası kalış seçeneği",
    label: "Zorlayıcı",
    source: "https://ut.ee/en/curriculum/computer-science",
    note: "Araştırma yoğun seçenek; akademik hazırlık ve ders içerikleri kritik.",
  },
  {
    id: "taltech-cybersecurity",
    mark: "TTÜ",
    university: "Tallinn University of Technology",
    city: "Tallinn",
    country: "Estonya",
    program: "Cybersecurity",
    fit: 61,
    cost: 70,
    work: 68,
    postStudy: 72,
    tech: 88,
    tuition: "Program sayfasında kontrol et",
    workRule: "Tam zamanlı eğitimi aksatmayacak şekilde",
    postStudyRule: "Mezuniyet sonrası kalış seçeneği",
    label: "Zorlayıcı",
    source: "https://taltech.ee/en/programmes",
    note: "En az %60 akademik sonuç katı ön koşul; not dönüşümü baştan doğrulanmalı.",
  },
  {
    id: "radboud-computing-science",
    mark: "RU",
    university: "Radboud University",
    city: "Nijmegen",
    country: "Hollanda",
    program: "Computing Science",
    fit: 49,
    cost: 35,
    work: 55,
    postStudy: 76,
    tech: 78,
    tuition: "Program sayfasında kontrol et",
    workRule: "16 saat/hafta veya yazın tam zamanlı; işveren izni gerekir",
    postStudyRule: "1 yıllık orientation year",
    label: "İddialı",
    source: "https://www.ru.nl/en/education/masters/computing-science",
    note: "Araştırma ağırlığı ve ders eşleşmesi nedeniyle GPA profilin için iddialı.",
  },
  {
    id: "ucd-computer-science",
    mark: "UCD",
    university: "University College Dublin",
    city: "Dublin",
    country: "İrlanda",
    program: "Computer Science (Negotiated Learning)",
    fit: 52,
    cost: 28,
    work: 72,
    postStudy: 90,
    tech: 94,
    tuition: "Program sayfasında kontrol et",
    workRule: "Dönemde 20 saat/hafta",
    postStudyRule: "Master sonrası 24 aya kadar",
    label: "İddialı",
    source: "https://www.ucd.ie/courses/msc-computer-science-negotiated-learning",
    note: "Dublin iş pazarı çok güçlü; kabul ve toplam bütçe tarafı zorlayıcı.",
  },
  {
    id: "aarhus-computer-science",
    mark: "AU",
    university: "Aarhus University",
    city: "Aarhus",
    country: "Danimarka",
    program: "Computer Science",
    fit: 46,
    cost: 38,
    work: 70,
    postStudy: 88,
    tech: 76,
    tuition: "Program sayfasında kontrol et",
    workRule: "Aylık çalışma sınırı oturum koşuluna bağlı",
    postStudyRule: "Programa göre 3 yıla kadar",
    label: "İddialı",
    source: "https://bachelor.au.dk/en/computerscience",
    note: "Akademik rekabet yüksek; ders içerikleri iyi eşleşse de güvenli hedef değil.",
  },
  {
    id: "ntnu-applied-computer-science",
    mark: "NTNU",
    university: "Norwegian University of Science and Technology",
    city: "Gjøvik",
    country: "Norveç",
    program: "Applied Computer Science",
    fit: 42,
    cost: 24,
    work: 70,
    postStudy: 66,
    tech: 68,
    tuition: "205.600 NOK / akademik yıl",
    workRule: "20 saat/hafta",
    postStudyRule: "1 yıla kadar iş arama izni",
    label: "İddialı",
    source: "https://www.ntnu.edu/studies/macs/admission",
    note: "En az C ortalama ve ayrıntılı CS kredi şartı nedeniyle düşük GPA ile zor.",
  },
  {
    id: "tu-wien-data-science",
    mark: "TUW",
    university: "TU Wien",
    city: "Viyana",
    country: "Avusturya",
    program: "Data Science",
    fit: 51,
    cost: 78,
    work: 68,
    postStudy: 76,
    tech: 83,
    tuition: "Devlet üniversitesi ücreti + dönem katkısı",
    workRule: "İşveren izniyle 20 saat/hafta",
    postStudyRule: "12 aya kadar iş arama izni",
    label: "İddialı",
    source: "https://www.tuwien.at/en/studies/studies/master-programmes",
    note: "Matematik ve veri bilimi altyapısı ayrıntılı incelenir; Viyana pazarı avantajlı.",
  },
  {
    id: "ctu-informatics",
    mark: "ČVUT",
    university: "Czech Technical University in Prague",
    city: "Prag",
    country: "Çekya",
    program: "Informatics",
    fit: 69,
    cost: 80,
    work: 72,
    postStudy: 70,
    tech: 78,
    tuition: "Program sayfasında kontrol et",
    workRule: "Tam zamanlı akredite eğitimde çalışma izni gerekmez",
    postStudyRule: "9 aya kadar iş arama izni",
    label: "Güçlü seçenek",
    source: "https://fit.cvut.cz/en/studies/programs-and-specializations/master",
    note: "Yazılım mühendisliği ve güvenlik uzmanlıkları profilinle güçlü eşleşiyor.",
  },
  {
    id: "warsaw-tech-data-science",
    mark: "WUT",
    university: "Warsaw University of Technology",
    city: "Varşova",
    country: "Polonya",
    program: "Data Science",
    fit: 68,
    cost: 76,
    work: 75,
    postStudy: 70,
    tech: 80,
    tuition: "Yaklaşık 6.510 € / program yılı",
    workRule: "Tam zamanlı öğrenci oturumuyla çalışma izni gerekmez",
    postStudyRule: "Mezunlar için iş arama oturumu",
    label: "Güçlü seçenek",
    source: "https://www.students.pw.edu.pl/Studies-Offer/M.Sc.-offer/Data-Science",
    note: "Veri mühendisliği ve analitik odağı uygun; ücret ve not dönüşümü doğrulanmalı.",
  },
];

const universityCount = new Set(programs.map((program) => program.university)).size;

type CountryPolicy = {
  country: string;
  code: string;
  city: string;
  cityScale: string;
  studentWork: string;
  postStudy: string;
  living: string;
  tuition: string;
  techMarket: number;
  techLabel: string;
  source: string;
};

const countryPolicies: CountryPolicy[] = [
  {
    country: "İsveç",
    code: "SE",
    city: "Stockholm",
    cityScale: "Büyük başkent",
    studentWork: "Resmî haftalık saat sınırı yok",
    postStudy: "12 aya kadar",
    living: "1.050–1.400 € / ay",
    tuition: "9.000–18.000 € / yıl",
    techMarket: 91,
    techLabel: "Nordic teknoloji merkezi",
    source:
      "https://www.migrationsverket.se/en/you-want-to-apply/study/higher-education.html",
  },
  {
    country: "Almanya",
    code: "DE",
    city: "Berlin · Münih · Karlsruhe",
    cityScale: "Çok merkezli büyük pazar",
    studentWork: "20 saat / hafta",
    postStudy: "18 aya kadar",
    living: "950–1.400 € / ay",
    tuition: "Çoğu devlet programı düşük ücretli",
    techMarket: 95,
    techLabel: "Avrupa'nın en geniş pazarlarından",
    source:
      "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
  },
  {
    country: "Finlandiya",
    code: "FI",
    city: "Helsinki · Espoo",
    cityScale: "Orta ölçekli başkent",
    studentWork: "Ort. 30 saat / hafta",
    postStudy: "2 yıla kadar",
    living: "900–1.250 € / ay",
    tuition: "8.000–18.000 € / yıl",
    techMarket: 77,
    techLabel: "Yoğun startup ve deep-tech ağı",
    source:
      "https://infofinland.fi/education/foreign-students-in-finland",
  },
  {
    country: "Estonya",
    code: "EE",
    city: "Tallinn · Tartu",
    cityScale: "Küçük, dijital odaklı pazar",
    studentWork: "Saat sınırı yok; eğitim aksamamalı",
    postStudy: "9 aya kadar",
    living: "700–1.100 € / ay",
    tuition: "4.000–8.000 € / yıl",
    techMarket: 82,
    techLabel: "Yoğun startup ve siber güvenlik ağı",
    source: "https://www.studyinestonia.ee/working",
  },
  {
    country: "Danimarka",
    code: "DK",
    city: "Kopenhag · Aarhus",
    cityScale: "Orta ölçekli başkent",
    studentWork: "90 saat / ay",
    postStudy: "Programa göre 3 yıla kadar",
    living: "1.200–1.600 € / ay",
    tuition: "6.000–16.000 € / yıl",
    techMarket: 78,
    techLabel: "Yüksek ücretli, daha küçük pazar",
    source:
      "https://www.nyidanmark.dk/de-DE/Words-and-concepts/SIRI/Warning---students-illegal-work",
  },
  {
    country: "Norveç",
    code: "NO",
    city: "Oslo · Trondheim",
    cityScale: "Küçük/orta pazar",
    studentWork: "20 saat / hafta",
    postStudy: "1 yıla kadar",
    living: "1.200–1.650 € / ay",
    tuition: "Kurum ve programa göre değişir",
    techMarket: 69,
    techLabel: "Enerji, denizcilik ve yazılım",
    source:
      "https://www.udi.no/en/want-to-apply/studies/studietillatelse/",
  },
  {
    country: "Hollanda",
    code: "NL",
    city: "Amsterdam · Eindhoven",
    cityScale: "Yoğun, uluslararası pazar",
    studentWork: "16 saat / hafta + izin",
    postStudy: "1 yıllık orientation year",
    living: "1.250–1.750 € / ay",
    tuition: "12.000–24.000 € / yıl",
    techMarket: 90,
    techLabel: "İngilizce dostu teknoloji pazarı",
    source:
      "https://ind.nl/en/residence-permits/study/student-residence-permit-for-university-or-higher-professional-education",
  },
  {
    country: "İrlanda",
    code: "IE",
    city: "Dublin · Cork",
    cityScale: "Küçük ama Big Tech yoğun",
    studentWork: "20 saat / hafta",
    postStudy: "Master sonrası 24 ay",
    living: "1.400–1.900 € / ay",
    tuition: "12.000–26.000 € / yıl",
    techMarket: 92,
    techLabel: "EMEA Big Tech merkezi",
    source:
      "https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/",
  },
  {
    country: "Birleşik Krallık",
    code: "GB",
    city: "Londra · Manchester",
    cityScale: "Çok büyük pazar",
    studentWork: "20 saat / hafta",
    postStudy: "2027'den itibaren 18 ay",
    living: "1.300–2.200 € / ay",
    tuition: "18.000–38.000 £ / yıl",
    techMarket: 98,
    techLabel: "Avrupa'nın en büyük teknoloji merkezi",
    source: "https://www.gov.uk/student-visa",
  },
  {
    country: "Kanada",
    code: "CA",
    city: "Toronto · Vancouver · Montréal",
    cityScale: "Çok merkezli büyük pazar",
    studentWork: "24 saat / hafta",
    postStudy: "Master için 3 yıla kadar PGWP",
    living: "1.400–2.200 € / ay",
    tuition: "18.000–35.000 CAD / yıl",
    techMarket: 89,
    techLabel: "Geniş fakat rekabetçi pazar",
    source:
      "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html",
  },
  {
    country: "Avustralya",
    code: "AU",
    city: "Sydney · Melbourne",
    cityScale: "Büyük ve uzak pazar",
    studentWork: "48 saat / 2 hafta",
    postStudy: "Master için çoğunlukla 2 yıl",
    living: "1.400–2.000 € / ay",
    tuition: "25.000–50.000 AUD / yıl",
    techMarket: 82,
    techLabel: "İyi ücretli APAC teknoloji pazarı",
    source:
      "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
  },
  {
    country: "Avusturya",
    code: "AT",
    city: "Viyana · Graz · Linz",
    cityScale: "Orta ölçekli Orta Avrupa pazarı",
    studentWork: "İşveren izniyle 20 saat / hafta",
    postStudy: "12 aya kadar",
    living: "1.000–1.450 € / ay",
    tuition: "Devlet kurumlarında çoğunlukla düşük",
    techMarket: 80,
    techLabel: "Kurumsal yazılım ve endüstriyel teknoloji",
    source: "https://www.migration.gv.at/en/living-and-working-in-austria/study-in-austria/",
  },
  {
    country: "Çekya",
    code: "CZ",
    city: "Prag · Brno",
    cityScale: "Büyüyen, maliyet dengeli pazar",
    studentWork: "Akredite tam zamanlı eğitimde izin gerekmez",
    postStudy: "9 aya kadar",
    living: "650–1.050 € / ay",
    tuition: "İngilizce programlarda kuruma göre değişir",
    techMarket: 78,
    techLabel: "Yazılım, siber güvenlik ve oyun sektörü",
    source: "https://www.studyin.cz/faq/",
  },
  {
    country: "Polonya",
    code: "PL",
    city: "Varşova · Kraków · Wrocław",
    cityScale: "Çok merkezli büyüyen pazar",
    studentWork: "Tam zamanlı öğrencide izin gerekmez",
    postStudy: "Mezunlar için geçici oturum",
    living: "650–1.050 € / ay",
    tuition: "2.000–8.000 € / yıl",
    techMarket: 82,
    techLabel: "Geniş yazılım ve iş hizmetleri pazarı",
    source: "https://study.gov.pl/work-and-internships",
  },
];

const worldCountryCodes = `
AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG
BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG
SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID
IR IQ IE IL IT JM JP JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MG MW
MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG MK NO
OM PK PW PS PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL
SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TJ TZ TH TL TG TO TT TN TR TM TV UG
UA AE GB US UY UZ VU VA VE VN YE ZM ZW
`
  .trim()
  .split(/\s+/);

const factors: Array<{ key: FactorKey; label: string; glyph: string }> = [
  { key: "fit", label: "Kabul ihtimali", glyph: "◎" },
  { key: "cost", label: "Eğitim maliyeti", glyph: "◉" },
  { key: "work", label: "Öğrenci çalışma izni", glyph: "▣" },
  { key: "postStudy", label: "Mezuniyet sonrası izin", glyph: "▤" },
  { key: "tech", label: "Tech iş pazarı", glyph: "◇" },
];

const defaultWeights: Record<FactorKey, number> = {
  fit: 5,
  cost: 4,
  work: 5,
  postStudy: 5,
  tech: 5,
};

function scoreProgram(
  program: Program,
  weights: Record<FactorKey, number>,
) {
  const total = factors.reduce(
    (sum, factor) => sum + program[factor.key] * weights[factor.key],
    0,
  );
  const divisor = factors.reduce(
    (sum, factor) => sum + weights[factor.key],
    0,
  );
  return Math.round(total / divisor);
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("Tümü");
  const [city, setCity] = useState("Tümü");
  const [university, setUniversity] = useState("Tümü");
  const [field, setField] = useState("Tümü");
  const [weights, setWeights] = useState(defaultWeights);
  const [personalSort, setPersonalSort] = useState(true);
  const [saved, setSaved] = useState<string[]>(["su-information-security"]);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const filteredPrograms = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("tr-TR");
    return programs
      .filter((program) => {
        const haystack =
          `${program.university} ${program.program} ${program.city} ${program.country}`.toLocaleLowerCase(
            "tr-TR",
          );
        return (
          (!search || haystack.includes(search)) &&
          (country === "Tümü" || program.country === country) &&
          (city === "Tümü" || program.city === city) &&
          (university === "Tümü" || program.university === university) &&
          (field === "Tümü" ||
            program.program
              .toLocaleLowerCase("tr-TR")
              .includes(field.toLocaleLowerCase("tr-TR")))
        );
      })
      .sort((a, b) =>
        personalSort
          ? scoreProgram(b, weights) - scoreProgram(a, weights)
          : a.university.localeCompare(b.university),
      );
  }, [city, country, field, personalSort, query, university, weights]);

  const topPrograms = filteredPrograms.slice(0, 3);
  const countries = [...new Set(programs.map((program) => program.country))];
  const cities = [...new Set(programs.map((program) => program.city))];
  const universities = [
    ...new Set(programs.map((program) => program.university)),
  ];
  const countryNames = useMemo(() => {
    const displayNames = new Intl.DisplayNames(["tr"], { type: "region" });
    return worldCountryCodes
      .map((code) => displayNames.of(code) ?? code)
      .sort((a, b) => a.localeCompare(b, "tr"));
  }, []);

  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="GradPath Global ana sayfa">
          <span className="brand-compass" aria-hidden="true">✦</span>
          <span>GradPath Global</span>
        </a>
        <nav aria-label="Ana menü">
          <a className="active" href="#kesfet">Keşfet</a>
          <a href="#karsilastir">Karşılaştır</a>
          <a href="#rehber">Rehberler</a>
        </nav>
        <div className="header-actions">
          <a className="saved-link" href="#kaydedilenler">
            <span aria-hidden="true">▱</span> Kaydedilenler <b>{saved.length}</b>
          </a>
          <span className="avatar" aria-label="Ahmet Yanık">AY</span>
        </div>
      </header>

      <section className="atlas-hero" id="top">
        <span className="latitude latitude-one">60°N</span>
        <span className="latitude latitude-two">30°N</span>
        <div className="hero-copy">
          <p className="eyebrow">Kişisel master atlası</p>
          <h1>Dünyadaki doğru master programını bul.</h1>
          <p className="hero-lede">
            Ülke kurallarını, gerçek maliyeti ve kabul uygunluğunu tek yerde
            karşılaştır. Sıralama senin akademik ve kariyer profiline göre çalışır.
          </p>
          <button
            className={`primary-button ${personalSort ? "is-active" : ""}`}
            type="button"
            onClick={() => setPersonalSort((current) => !current)}
          >
            {personalSort ? "Profiline göre sıralanıyor" : "Profilime göre sırala"}
            <span aria-hidden="true">→</span>
          </button>
          <div className="profile-strip" aria-label="Kişisel profil özeti">
            <span className="profile-icon" aria-hidden="true">◯</span>
            <strong>Ahmet</strong><i />
            <span>Bilgisayar Mühendisliği</span><i />
            <span>GPA 2.17/4.00</span><i />
            <span>2 yıl deneyim</span><i />
            <span>AI &amp; Backend</span>
          </div>
        </div>

        <section className="top-matches" aria-labelledby="match-heading">
          <div className="match-heading-row">
            <h2 id="match-heading"><span aria-hidden="true">✦</span> Sana göre öne çıkanlar</h2>
            <span className="data-date">25 TEM 2026</span>
          </div>
          <div className="match-grid">
            {topPrograms.length ? (
              topPrograms.map((program) => {
                const score = scoreProgram(program, weights);
                return (
                  <article className="match-card" key={program.id}>
                    <div className="card-topline">
                      <span className="uni-mark">{program.mark}</span>
                      <button
                        className={`save-button ${saved.includes(program.id) ? "saved" : ""}`}
                        type="button"
                        onClick={() => toggleSaved(program.id)}
                        aria-label={`${program.university} ${saved.includes(program.id) ? "kaydını kaldır" : "kaydet"}`}
                      >
                        {saved.includes(program.id) ? "◆" : "◇"}
                      </button>
                    </div>
                    <h3>{program.university}</h3>
                    <p className="program-name">{program.program}</p>
                    <p className="location"><span aria-hidden="true">⌖</span> {program.city}, {program.country}</p>
                    <span className={`fit-label tone-${program.label === "Güçlü seçenek" ? "strong" : program.label === "Zorlayıcı" ? "medium" : "reach"}`}>
                      {program.label}
                    </span>
                    <div className="score-line"><span>Profil uyumu</span><strong>{score}%</strong></div>
                    <div className="score-track"><span style={{ width: `${score}%` }} /></div>
                    <div className="score-axis"><span>0</span><span>50</span><span>100</span></div>
                    <a className="source-link" href={program.source} target="_blank" rel="noreferrer">
                      Resmî program sayfası ↗
                    </a>
                  </article>
                );
              })
            ) : (
              <div className="empty-state">Bu filtrelerle eşleşen program bulunamadı.</div>
            )}
          </div>
          <p className="score-disclaimer">
            Uyum skoru kabul garantisi değildir; ilan edilen koşullar ve kişisel profil üzerinden karar desteği sunar.
          </p>
        </section>
      </section>

      <section className="search-deck" id="kesfet">
        <div className="search-row">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Üniversite, program veya şehir ara</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Üniversite, program veya şehir ara"
            />
          </label>
          <FilterSelect label="Ülke" value={country} items={countries} onChange={setCountry} />
          <FilterSelect label="Şehir" value={city} items={cities} onChange={setCity} />
          <FilterSelect label="Üniversite" value={university} items={universities} onChange={setUniversity} />
          <FilterSelect label="Program" value={field} items={["Computer", "Information", "Data", "Cybersecurity"]} onChange={setField} />
        </div>
        <div className="factor-heading">
          <h2>Karar faktörleri</h2><span>{filteredPrograms.length} program eşleşmesi</span>
        </div>
        <div className="factor-grid">
          {factors.map((factor) => (
            <label className="factor-control" key={factor.key}>
              <span className="factor-glyph" aria-hidden="true">{factor.glyph}</span>
              <span className="factor-copy">
                <span>{factor.label}</span>
                <input
                  type="range" min="1" max="5" step="1"
                  value={weights[factor.key]}
                  onChange={(event) => setWeights((current) => ({
                    ...current,
                    [factor.key]: Number(event.target.value),
                  }))}
                  aria-label={`${factor.label} ağırlığı`}
                />
              </span>
              <strong>{weights[factor.key]}/5</strong>
            </label>
          ))}
        </div>
      </section>

      <div className="first-slice-footer">
        <span>Şu anda kişiselleştirilmiş pilot veri seti gösteriliyor.</span>
        <a href="#kapsam">Kapsamı ve metodolojiyi gör ↓</a>
      </div>

      <section className="content-section country-section" id="karsilastir">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ülke karşılaştırması</p>
            <h2>Önce vize gerçeğini gör.</h2>
          </div>
          <p>
            Çalışma hakkı ile yaşam maliyetini kabul ihtimalinden ayrı
            değerlendir. Maliyet aralıkları yaklaşık planlama değerleridir.
          </p>
        </div>
        <div className="country-grid">
          {countryPolicies.map((policy) => (
            <article className="country-card" key={policy.code}>
              <div className="country-card-head">
                <span className="country-code">{policy.code}</span>
                <span className="verified-badge">Resmî kaynak</span>
              </div>
              <h3>{policy.country}</h3>
              <p className="city-line">{policy.city}</p>
              <dl>
                <div>
                  <dt>Öğrenciyken çalışma</dt>
                  <dd>{policy.studentWork}</dd>
                </div>
                <div>
                  <dt>Mezuniyet sonrası</dt>
                  <dd>{policy.postStudy}</dd>
                </div>
                <div>
                  <dt>Yaklaşık yaşam</dt>
                  <dd>{policy.living}</dd>
                </div>
                <div>
                  <dt>Öğrenim ücreti</dt>
                  <dd>{policy.tuition}</dd>
                </div>
              </dl>
              <div className="market-line">
                <span>Tech pazarı</span>
                <strong>{policy.techMarket}/100</strong>
              </div>
              <div className="mini-track">
                <span style={{ width: `${policy.techMarket}%` }} />
              </div>
              <p className="market-label">{policy.techLabel}</p>
              <a href={policy.source} target="_blank" rel="noreferrer">
                Göçmenlik kaynağını aç ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section city-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Şehir merceği</p>
            <h2>Üniversite kadar şehir de önemli.</h2>
          </div>
          <p>
            Pazar büyüklüğü, yaşam gideri ve İngilizceyle iş bulma ihtimali
            birlikte düşünülmeli.
          </p>
        </div>
        <div className="city-table-wrap">
          <table className="city-table">
            <thead>
              <tr>
                <th>Merkez</th>
                <th>Şehir ölçeği</th>
                <th>Tech pazarı</th>
                <th>Yaklaşık yaşam</th>
                <th>Öğrenci çalışma hakkı</th>
              </tr>
            </thead>
            <tbody>
              {countryPolicies.map((policy) => (
                <tr key={policy.code}>
                  <td><strong>{policy.city}</strong><span>{policy.country}</span></td>
                  <td>{policy.cityScale}</td>
                  <td>
                    <span className="table-score">{policy.techMarket}</span>
                    <span className="table-track"><i style={{ width: `${policy.techMarket}%` }} /></span>
                  </td>
                  <td>{policy.living}</td>
                  <td>{policy.studentWork}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section program-section" id="kaydedilenler">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Program laboratuvarı</p>
            <h2>Koşulu, maliyeti ve riski yan yana koy.</h2>
          </div>
          <p>
            Doğrulanan programlar transkript ve kariyer yönüne göre erişilebilir,
            zorlayıcı ve iddialı olarak etiketlendi.
          </p>
        </div>
        <div className="program-list">
          {filteredPrograms.map((program) => (
            <article className="program-row" key={program.id}>
              <div className="program-identity">
                <span className="uni-mark">{program.mark}</span>
                <div>
                  <p>{program.university}</p>
                  <h3>{program.program}</h3>
                  <span>{program.city}, {program.country}</span>
                </div>
              </div>
              <div className="program-fact">
                <span>Öğrenim</span>
                <strong>{program.tuition}</strong>
              </div>
              <div className="program-fact">
                <span>Öğrenciyken</span>
                <strong>{program.workRule}</strong>
              </div>
              <div className="program-fact">
                <span>Profil notu</span>
                <strong>{program.note}</strong>
              </div>
              <div className="row-score">
                <strong>{scoreProgram(program, weights)}%</strong>
                <span>{program.label}</span>
              </div>
              <button
                type="button"
                className={`row-save ${saved.includes(program.id) ? "saved" : ""}`}
                onClick={() => toggleSaved(program.id)}
                aria-label={`${program.university} ${saved.includes(program.id) ? "kaydını kaldır" : "kaydet"}`}
              >
                {saved.includes(program.id) ? "Kaydedildi" : "Kaydet"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section world-section" id="kapsam">
        <div className="coverage-panel">
          <div className="coverage-copy">
            <p className="eyebrow">Global kapsam</p>
            <h2>195 ülkelik indeks, doğrulanmış veri katmanları.</h2>
            <p>
              Bütün ülkeler keşif indeksinde bulunuyor. Vize, ücret ve program
              verileri yalnızca resmî kaynağı doğrulanan destinasyonlarda karar
              puanına katılıyor. Böylece eksik veri sahte kesinlik üretmiyor.
            </p>
          </div>
          <div className="coverage-stats">
            <div><strong>195</strong><span>ülke indekslendi</span></div>
            <div><strong>{countryPolicies.length}</strong><span>göçmenlik politikası doğrulandı</span></div>
            <div><strong>{programs.length}</strong><span>program koşulu incelendi</span></div>
            <div><strong>{universityCount}</strong><span>üniversite profiline işlendi</span></div>
          </div>
        </div>
        <div className={`world-list ${showAllCountries ? "expanded" : ""}`}>
          {(showAllCountries ? countryNames : countryNames.slice(0, 32)).map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <button
          className="secondary-button"
          type="button"
          onClick={() => setShowAllCountries((current) => !current)}
        >
          {showAllCountries ? "Listeyi daralt ↑" : `Tüm ${countryNames.length} ülkeyi göster ↓`}
        </button>
      </section>

      <section className="content-section methodology" id="rehber">
        <div>
          <p className="eyebrow">Nasıl çalışıyor?</p>
          <h2>Tek puan değil, açıklanabilir karar.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Uygunluk</strong><p>GPA, alan, ECTS ön koşulları ve deneyim birlikte incelenir.</p></li>
          <li><span>02</span><strong>Sürdürülebilirlik</strong><p>Ücret, yaşam gideri ve yasal çalışma saati aynı tabloda değerlendirilir.</p></li>
          <li><span>03</span><strong>Kariyer</strong><p>Şehrin tech pazarı ve mezuniyet sonrası kalış yolu ayrı gösterilir.</p></li>
          <li><span>04</span><strong>Kaynak</strong><p>Değişebilen göçmenlik verileri tarih ve resmî bağlantıyla sunulur.</p></li>
        </ol>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-compass">✦</span>GradPath Global</a>
        <p>Ahmet için kişiselleştirilmiş master karar sistemi.</p>
        <span>Veri kontrol tarihi: 25 Temmuz 2026</span>
      </footer>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: string;
  items: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={`${label} filtresi`}>
        <option value="Tümü">Tümü</option>
        {items.map((item) => <option value={item} key={item}>{item}</option>)}
      </select>
    </label>
  );
}
