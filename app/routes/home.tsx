import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import {
  Phone,
  Scissors,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  Award,
  Share2,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import hair from "../../public/hair.jpg";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "თმის ჩაბარების სერვისი - Inga's Hair Studio" },
    {
      name: "description",
      content:
        "Inga's Hair Studio — ინგა, ქალის თმის სტილისტი. დარეკეთ: 599 36 06 28",
    },
  ];
}

const PHONE = "599360628";
const PHONE_DISPLAY = "599 36 06 28";
const PHONE_HREF = `ტელ:+995${PHONE}`;

/* ── Scroll reveal hook ── */
function useReveal(className = "reveal") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className,
  type = "reveal",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "reveal" | "reveal-left" | "reveal-right" | "reveal-scale";
  delay?: number;
}) {
  const ref = useReveal(type);
  return (
    <div ref={ref} className={cn(type, `delay-${delay}`, className)}>
      {children}
    </div>
  );
}

/* ── Data ── */
const services = [
  {
    num: "01",
    icon: Scissors,
    title: "თმის შეჭრა",
    sub: "თმის შეჭრა",
    desc: "ინდივიდუალური ქალის თმის შეჭრა — ხაზს უსვამს სახის ოვალს და თქვენს სტილს.",
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=85",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "შეღებვა და მელირება",
    sub: "თმის შეღებვა",
    desc: "ქალის თმის შეღებვა და მელირება — ფერი, რომელიც უსვამს ხაზს თქვენს სტილს.",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85",
  },
  {
    num: "03",
    icon: Heart,
    title: "ვარცხნილობა და სტაილინგი",
    sub: "ვარცხნილობა",
    desc: "ქალის ვარცხნილობა და სტაილინგი — დახვეწილი და ხანგრძლივი შედეგისთვის.",
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=85",
  },
  {
    num: "04",
    icon: Star,
    title: "საქორწილო ვარცხნილობა",
    sub: "საქორწილო ვარცხნილობა",
    desc: "საქორწილო ვარცხნილობა — დახვეწილი და გამორჩეული შედეგისთვის.",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85",
  },
];

/* ── Component ── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: "services", label: "სერვისები" },
    { id: "contact", label: "კონტაქტი" },
  ];

  return (
    <div>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "nav-blur bg-[#1A0F0A]/90 py-4 border-b border-white/5"
            : "bg-transparent py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <button
            onClick={() => goto("hero")}
            className="flex flex-col leading-none cursor-pointer"
          >
            <span className="text-[#C9A96E] font-bold tracking-[0.25em] text-xl">
              Inga's Hair
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C9A96E]/50 font-light">
              hair studio
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => goto(l.id)}
                className="text-[#E8D5A3]/70 text-base hover:text-[#C9A96E]  tracking-[0.15em] uppercase transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <a
            href={PHONE_HREF}
            className="hidden md:inline-flex items-center gap-2 border border-[#C9A96E]/40 bg-[#C9A96E] text-black  hover:border-[#C9A96E] hover:bg-[#d39c35]  text-[#C9A96E] text-base shadow-2xl tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 rounded-full"
          >
            <Phone size={12} />
            დარეკეთ
          </a>

          <button
            className="md:hidden text-[#C9A96E]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#1A0F0A]/98 nav-blur px-8 pt-6 pb-8 flex flex-col gap-5 border-t border-white/5">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => goto(l.id)}
                className="text-[#E8D5A3]/70 hover:text-[#C9A96E] text-sm tracking-[0.15em] uppercase text-left cursor-pointer transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-[#C9A96E] text-sm font-medium mt-2"
            >
              <Phone size={14} />
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section
        id="hero"
        className="relative h-screen min-h-[700px] overflow-hidden grain"
      >
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1800&q=90"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ transition: "transform 8s ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/60 via-[#1A0F0A]/30 to-[#1A0F0A]/80" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="mb-6">
            <span className="pill text-[#C9A96E]/80 border-[#C9A96E]/30 text-[10px]">
              ✦ ინგა ✦ &nbsp; ქალის თმის სტილისტი &nbsp;
            </span>
          </div>
          <h1
            className="text-white leading-[0.88] mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(56px, 14vw, 120px)",
              fontWeight: 300,
            }}
          >
            თმის ჩაბარება
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <p className="text-white/60 text-base max-w-xs leading-relaxed">
              ხარისხი და ნდობა — პრემიუმ თმის ჩაბარების სერვისი.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={PHONE_HREF}
                className="group flex items-center gap-3 bg-[#C9A96E] hover:bg-[#A8813E] text-[#1A0F0A] px-7 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
              >
                <Phone size={14} />
                {PHONE_DISPLAY}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <button
                onClick={() => goto("services")}
                className="text-white/60 hover:text-white text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors flex items-center gap-2"
              >
                სერვისები
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="bg-[#C9A96E] py-3.5 overflow-hidden">
        <div className="marquee-inner flex gap-12 w-max">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-12 text-[#1A0F0A] text-xs tracking-[0.2em] uppercase font-medium whitespace-nowrap"
              >
                <span>თმის ჩაბარება</span>
                <span className="opacity-40">✦</span>
                <span>თმის შეჭრა</span>
                <span className="opacity-40">✦</span>
                <span>შეღებვა და მელირება</span>
                <span className="opacity-40">✦</span>
                <span>თმის ჩაბარება</span>
                <span className="opacity-40">✦</span>
                <span>ვარცხნილობა და სტაილინგი</span>
                <span className="opacity-40">✦</span>
                <span>საქორწილო ვარცხნილობა</span>
                <span className="opacity-40">✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" className="py-28 md:py-36 px-6 lg:px-16 bg-[#F7F2ED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-6 items-center">
            {/* text side */}
            <div className="lg:col-span-5 lg:pr-8">
              <Reveal>
                <span className="pill mb-6 inline-block">ჩვენ შესახებ</span>
              </Reveal>
              <Reveal delay={1}>
                <h2
                  className="text-[#1A0F0A] leading-[1.05] mb-8"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(44px, 6vw, 64px)",
                    fontWeight: 400,
                  }}
                >
                  რას
                  <br />
                  <em style={{ fontStyle: "italic", color: "#C9A96E" }}>
                    გთავაზობთ?
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <div className="rule mb-8 w-24" />
              </Reveal>
              <Reveal delay={2}>
                <p className="text-[#1A0F0A]/90 leading-relaxed mb-5 text-[15px]">
                  ინგა არის Inga’s Hair-ის დამფუძნებელი — პროფესიონალი, რომელსაც
                  12 წელზე მეტი გამოცდილება აქვს თმის სფეროში და ზუსტად იცის,
                  როგორ შეაფასოს თმის ხარისხი და ღირებულება. მისთვის თმის
                  ჩაბარება მხოლოდ პროცესი არ არის — ეს არის ინდივიდუალური
                  მიდგომა, სანდოობა და მაქსიმალურად სამართლიანი შეფასება.{" "}
                </p>
                <p className="text-[#1A0F0A]/90 leading-relaxed mb-5 text-[15px]">
                  {" "}
                  თმის ჩაბარება მარტივად, სწრაფად და კომფორტულად — 📍 ჭავჭავაძე,
                  გრანდმოლი. დამიკავშირდით ნომერზე: 599 36 06 28
                </p>

                <div className="flex flex-wrap text-lg gap-2 mb-10">
                  {["ქალის თმის სრული მომსახურება ✅"].map((t) => (
                    <span key={t} className="pill text-xl">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={PHONE_HREF}
                  className="group inline-flex items-center gap-3 bg-[#1A0F0A] hover:bg-[#2E1A10] text-[#C9A96E] px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 hover:scale-105"
                >
                  <Phone size={14} />
                  ჩაიწერეთ — {PHONE_DISPLAY}
                  <ArrowUpRight
                    size={14}
                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
              </Reveal>
            </div>

            {/* image side — bento grid */}
            <div className="lg:col-span-7 grid grid-cols-5 grid-rows-2 gap-3 h-[520px]">
              <Reveal
                type="reveal-scale"
                className="col-span-3 row-span-2 img-zoom overflow-hidden rounded-2xl"
              >
                <img
                  src={hair}
                  alt="Inga stylist"
                  className="w-full h-full object-cover"
                />
              </Reveal>
              <Reveal
                type="reveal-scale"
                delay={2}
                className="col-span-2 img-zoom overflow-hidden rounded-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=85"
                  alt="salon"
                  className="w-full h-full object-cover"
                />
              </Reveal>
              <div className="col-span-2 grid grid-cols-2 gap-3">
                <Reveal
                  type="reveal-scale"
                  delay={3}
                  className="img-zoom overflow-hidden rounded-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&q=85"
                    alt="color"
                    className="w-full h-full object-cover"
                  />
                </Reveal>
                <div className="bg-[#1A0F0A] rounded-2xl flex flex-col items-center justify-center p-4">
                  <span
                    className="text-[#C9A96E] text-4xl font-bold leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    12+
                  </span>
                  <span className="text-[#E8D5A3]/50 text-[9px] tracking-widest uppercase mt-1 text-center">
                    წელი გამოცდილება
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" className="py-28 md:py-36 bg-[#1A0F0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <span className="pill mb-5 inline-block">სერვისები</span>
              <h2
                className="text-white leading-[1.05]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 400,
                }}
              >
                სერვისები
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed md:text-right">
              თითოეული სერვისი — პრემიუმ პროდუქტები, ექსპერტული ტექნიკა,
              განუმეორებელი შედეგი.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
            {services.map((s, i) => (
              <Reveal
                key={s.num}
                type="reveal-scale"
                delay={(i + 1) as any}
                className="service-card bg-[#1A0F0A] p-8 group cursor-default"
              >
                <div className="big-number text-white mb-2">{s.num}</div>
                <div className="mb-6 img-zoom overflow-hidden rounded-xl h-44">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[#C9A96E]/60 text-[10px] tracking-[0.2em] uppercase block mb-2">
                  {s.sub}
                </span>
                <h3
                  className="text-white text-2xl mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                  }}
                >
                  {s.title}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed mb-6">
                  {s.desc}
                </p>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 text-[#C9A96E] text-[11px] tracking-[0.15em] uppercase group-hover:gap-3 transition-all"
                >
                  ჩაიწერეთ <ArrowRight size={12} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SPLIT BANNER ══════════════ */}
      <section className="grid lg:grid-cols-2 min-h-[600px]">
        <div
          className="relative overflow-hidden min-h-[350px] img-zoom grain"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=900&q=90)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#1A0F0A]/50" />
        </div>
        <div className="bg-[#2E1A10] flex flex-col justify-center px-10 lg:px-16 py-16">
          <Reveal>
            <span className="pill mb-8 inline-block border-[#C9A96E]/20">
              ნებისმიერი თმა იმსახურებს სწორ შეფასებას 💛
            </span>
            <blockquote
              className="text-[#E8D5A3] leading-[1.2] mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
              }}
            >
              "ნებისმიერი ტიპის თმა — ფასდება სწორად"
            </blockquote>
            <p className="text-[#E8D5A3]/50 text-sm leading-relaxed max-w-sm mb-10">
              თქვენი თმა ფასდება სამართლიანად — ხარისხის, სიგრძისა და
              მდგომარეობის მიხედვით.
            </p>
            <a
              href={PHONE_HREF}
              className="group inline-flex items-center gap-3 border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A0F0A] text-[#C9A96E] px-7 py-4 rounded-full text-sm tracking-wide transition-all duration-300 w-fit"
            >
              <Phone size={14} />
              {PHONE_DISPLAY}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section
        id="contact"
        className="py-28 md:py-36 px-6 lg:px-16 bg-[#1A0F0A]"
      >
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-20">
            <span className="pill mb-6 inline-block">კავშირი</span>
            <h2
              className="text-white mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 7vw, 88px)",
                fontWeight: 300,
              }}
            >
              ჩვენ ველოდებით
              <br />
              <span className="gold-gradient">თქვენს ზარს.</span>
            </h2>
            <p className="text-white/40 text-[15px] max-w-sm mx-auto leading-relaxed">
              ჩაიწერეთ დღეს — ტელეფონის ნომერი:
            </p>
          </Reveal>

          {/* big CTA */}
          <Reveal>
            <a
              href={PHONE_HREF}
              className="group block bg-[#C9A96E] hover:bg-[#A8813E] transition-all duration-500 rounded-3xl p-12 md:p-16 text-center hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#C9A96E]/20"
            >
              <div className="flex items-center justify-center gap-4 mb-3">
                <Phone
                  size={28}
                  className="text-[#1A0F0A] group-hover:rotate-12 transition-transform duration-300"
                />
                <span
                  className="text-[#1A0F0A] font-bold"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 7vw, 80px)",
                    lineHeight: 1,
                  }}
                >
                  {PHONE_DISPLAY}
                </span>
              </div>
              <p className="text-[#1A0F0A]/60 text-sm tracking-[0.15em] uppercase">
                ინგა — Hair Stylist · დარეკეთ ახლავე
              </p>
            </a>
          </Reveal>

          {/* info cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              {
                icon: Clock,
                title: "საათები",
                lines: ["ორშაბათი–კვირა: 10:00–18:00"],
              },
              {
                icon: MapPin,
                title: "მდებარეობა",
                lines: [
                  "ქუთაისი, საქართველო",
                  "მისამართი — ჭავჭავაძე გრანდმოლი",
                ],
              },
              {
                icon: Share2,
                title: "Facebook",
                lines: ["@Inga's Hair", "ნამუშევრები და ნიუსი"],
              },
            ].map(({ icon: Icon, title, lines }) => (
              <Reveal key={title} className="bg-[#2E1A10] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
                    <Icon size={15} className="text-[#C9A96E]" />
                  </div>
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {title}
                  </span>
                </div>
                {lines.map((l) => (
                  <p key={l} className="text-white/40 text-xs leading-relaxed">
                    {l}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-[#0F0704] py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span
              className="text-[#C9A96E] text-xl font-bold tracking-[0.25em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Inga's Hair
            </span>
            <span className="text-[8px] tracking-[0.35em] uppercase text-[#C9A96E]/30 mt-0.5">
              hair studio by inga
            </span>
          </div>
          <p className="text-white text-base tracking-wider">
            © 2026 Inga's Hair Studio - შექმნილია{" "}
            <Link
              to="https://webnotes.ge"
              className="underline font-bold mr-1"
              target="_blank"
            >
              Webnotes
            </Link>
            -ის მიერ ✅
          </p>
          <a
            href={PHONE_HREF}
            className="text-[#C9A96E]/50 hover:text-[#C9A96E] text-sm transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </footer>
    </div>
  );
}
