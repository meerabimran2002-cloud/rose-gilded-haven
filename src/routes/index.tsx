import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Star, Heart, ShoppingBag, ArrowRight, ArrowUp,
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter,
  ChefHat, Award, Users, Utensils, Send, Sparkles, Flame, Percent,
  Home, Info, UtensilsCrossed, Image as ImageIcon, MessageSquare, CalendarCheck, Lock,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { CartDrawer } from "@/components/CartDrawer";


export const Route = createFileRoute("/")({
  component: GoldenPlateHome,
  head: () => ({
    meta: [
      { title: "Golden Plate — Luxury Fine Dining in Islamabad" },
      { name: "description", content: "Golden Plate is Islamabad's premier luxury restaurant. Signature steaks, wood-fired pizzas, artisan desserts and curated deals. Reserve tonight." },
      { property: "og:title", content: "Golden Plate — Luxury Fine Dining in Islamabad" },
      { property: "og:description", content: "Islamabad's premier luxury restaurant. Signature dishes, master chefs, unforgettable evenings." },
      { property: "og:type", content: "restaurant" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" },
    ],
  }),
});

// Real, unique Unsplash photos — each matches the dish/chef/scene it represents.
const IMG = {
  hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80",
  interior: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1400&q=80",
};

const NAV = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: Info },
  { label: "Menu", href: "#menu", icon: UtensilsCrossed },
  { label: "Deals", href: "#deals", icon: Percent },
  { label: "Chefs", href: "#chefs", icon: ChefHat },
  { label: "Gallery", href: "#gallery", icon: ImageIcon },
  { label: "Reviews", href: "#reviews", icon: MessageSquare },
  { label: "Reserve", href: "#reserve", icon: CalendarCheck },
  { label: "Contact", href: "#contact", icon: MapPin },
] as const;


const CATEGORIES = ["All", "Starters", "Signature", "Pizza", "Steaks", "Desserts", "Drinks"] as const;

// Every dish image is the ACTUAL dish it names. All different, all real.
const DISHES = [
  {
    name: "Truffle Wagyu Steak", cat: "Steaks", price: 62, rating: 5.0, cal: 780, tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80",
    desc: "A5 Wagyu, black truffle butter, whipped bone marrow.",
  },
  {
    name: "Wood-Fired Margherita", cat: "Pizza", price: 22, rating: 4.8, cal: 620, tag: "Classic",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=900&q=80",
    desc: "San Marzano tomato, buffalo mozzarella, fresh basil.",
  },
  {
    name: "Truffle Bianca Pizza", cat: "Pizza", price: 32, rating: 4.9, cal: 640, tag: "New",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80",
    desc: "Sourdough crust, black truffle, taleggio, edible gold.",
  },
  {
    name: "Grilled Ribeye Steak", cat: "Steaks", price: 48, rating: 4.8, cal: 720, tag: "Chef's Pick",
    img: "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80",
    desc: "Dry-aged 45 days, roasted shallot cream, pink pepper crust.",
  },
  {
    name: "Saffron Silk Risotto", cat: "Signature", price: 28, rating: 4.9, cal: 560, tag: "Signature",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=80",
    desc: "Carnaroli rice, Kashmiri saffron, aged parmesan crown.",
  },
  {
    name: "Seared Salmon Fillet", cat: "Signature", price: 34, rating: 4.9, cal: 480, tag: "Fresh",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&q=80",
    desc: "Norwegian salmon, lemon beurre blanc, asparagus tips.",
  },
  {
    name: "Burrata & Heirloom Tomato", cat: "Starters", price: 18, rating: 4.7, cal: 340, tag: "Light",
    img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=900&q=80",
    desc: "Creamy burrata, garden tomatoes, basil oil, aged balsamic.",
  },
  {
    name: "Truffle Mushroom Soup", cat: "Starters", price: 14, rating: 4.8, cal: 290, tag: "Warm",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
    desc: "Wild mushrooms, cream, black truffle shavings.",
  },
  {
    name: "Molten Chocolate Lava", cat: "Desserts", price: 16, rating: 5.0, cal: 520, tag: "Bestseller",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=900&q=80",
    desc: "Warm dark chocolate core, vanilla bean ice cream, gold flake.",
  },
  {
    name: "Rose Panna Cotta", cat: "Desserts", price: 14, rating: 4.9, cal: 320, tag: "Chef's Pick",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80",
    desc: "Silken cream infused with Damascus rose and berries.",
  },
  {
    name: "Classic Tiramisu", cat: "Desserts", price: 13, rating: 4.8, cal: 410, tag: "Italian",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=80",
    desc: "Espresso-soaked ladyfingers, mascarpone cream, cocoa dust.",
  },
  {
    name: "Blush Rose Martini", cat: "Drinks", price: 18, rating: 4.7, cal: 210, tag: "Signature",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80",
    desc: "Rose gin, lychee, elderflower, pink Himalayan salt.",
  },
] as const;

const DEALS = [
  {
    title: "Golden Date Night",
    price: 89, old: 140, save: "36%",
    desc: "3-course dinner for two · house wine · complimentary dessert.",
    tag: "For Two",
    img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80",
  },
  {
    title: "Family Feast Platter",
    price: 129, old: 190, save: "32%",
    desc: "Serves 4 · mixed grill, sides, salads, dessert & drinks.",
    tag: "Family",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
  },
  {
    title: "Weekday Lunch Set",
    price: 19, old: 32, save: "40%",
    desc: "Starter + main + drink · Tue – Fri · 12 – 3 PM.",
    tag: "Lunch",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80",
  },
  {
    title: "Pizza & Pint Night",
    price: 24, old: 38, save: "37%",
    desc: "Any wood-fired pizza + craft beer · every Thursday.",
    tag: "Thursday",
    img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=900&q=80",
  },
] as const;

// Two chefs — a woman and a man, each with a matching real portrait.
const CHEFS = [
  {
    name: "Zara Khan", role: "Executive Chef", exp: "18 yrs", spec: "Modern Mediterranean",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=800&q=80",
  },
  {
    name: "Ali Khan", role: "Head Chef & Pâtissier", exp: "15 yrs", spec: "Wood-Fire & Desserts",
    img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80",
  },
] as const;


const REVIEWS = [
  { name: "Ayesha M.", rating: 5, text: "The most beautiful dining room in Islamabad. Every plate feels like a love letter." },
  { name: "Daniel R.", rating: 5, text: "The wagyu was flawless, and the blush martini is now my personal ritual." },
  { name: "Sana T.", rating: 5, text: "Elegant, warm, and never overdone. A rare find — we'll be back monthly." },
] as const;

function GoldenPlateHome() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const { add, count } = useCart();
  const [wish, setWish] = useState<Set<string>>(new Set());
  const [showTop, setShowTop] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dishes = DISHES.filter(d => filter === "All" || d.cat === filter);

  const toggleWish = (name: string) => setWish(w => {
    const n = new Set(w); n.has(name) ? n.delete(name) : n.add(name); return n;
  });

  return (
    <div id="home" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass shadow-glass" : "py-4 sm:py-6"}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="truncate">Golden Plate</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {NAV.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="relative group inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition">
                <Icon className="h-3.5 w-3.5 text-accent" />
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link to="/admin" className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm font-medium hover:shadow-glass transition">
              <Lock className="h-3.5 w-3.5 text-accent" /> Admin
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative rounded-full glass p-2.5 hover:shadow-glass transition" aria-label="Open cart">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{count}</span>
              )}
            </button>
            <a href="#reserve" className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium magnetic-btn">
              Reserve <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button className="lg:hidden rounded-full glass p-2.5" onClick={() => setNavOpen(v => !v)} aria-label="Toggle menu">
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="lg:hidden mx-4 mt-3 glass rounded-3xl p-4 animate-rise sm:mx-6">
            <div className="grid grid-cols-2 gap-2">
              {NAV.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} onClick={() => setNavOpen(false)}
                  className="flex items-center gap-2 rounded-2xl bg-background/60 px-4 py-3 text-sm font-medium">
                  <Icon className="h-4 w-4 shrink-0 text-accent" /> {label}
                </a>
              ))}
              <Link to="/admin" onClick={() => setNavOpen(false)}
                className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-sm font-medium text-background">
                <Lock className="h-4 w-4" /> Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>


      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <img src={IMG.hero} alt="Golden Plate dining room at golden hour" className="h-full w-full object-cover animate-reveal" />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-soft/40 via-background/40 to-background" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-32 left-10 h-40 w-40 rounded-full bg-primary/50 blur-3xl animate-float" />
          <div className="absolute bottom-24 right-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full bg-primary/60 blur-2xl animate-float" />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> 3 tables left tonight
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95]">
              Plated in <em className="text-gradient not-italic font-medium">gold</em>.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
              A rose-lit dining room in the heart of Islamabad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reserve" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium magnetic-btn">
                Book a Table <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium magnetic-btn">
                View Menu
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block animate-rise" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-[2rem] p-6 tilt-card">
              <img src={DISHES[0].img} alt={DISHES[0].name} className="rounded-2xl h-72 w-full object-cover" loading="lazy" />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">Tonight's Special</div>
                  <div className="mt-1 font-display text-2xl">{DISHES[0].name}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl">${DISHES[0].price}</div>
                  <div className="flex items-center gap-1 text-xs justify-end mt-1">
                    <Star className="h-3 w-3 fill-accent text-accent" /> {DISHES[0].rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 animate-float">
              <div className="flex items-center gap-3">
                <ChefHat className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Executive Chef</div>
                  <div className="font-medium text-sm">Ayesha Malik</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border/60 bg-pink-soft/20 overflow-hidden py-4">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_35s_linear_infinite] font-display text-2xl text-foreground/70">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Wood-fired", "Slow-crafted", "Rose-lit", "Michelin recommended", "Islamabad · F-7", "Since 2007", "Reserve tonight"].map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-12">
                {t} <Sparkles className="h-4 w-4 text-accent" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={IMG.interior} alt="Golden Plate interior" className="rounded-[2rem] shadow-luxe w-full object-cover aspect-[4/5]" loading="lazy" />
            <div className="absolute -bottom-8 -right-8 glass rounded-3xl p-6 max-w-xs animate-float-slow">
              <Award className="h-6 w-6 text-accent" />
              <div className="mt-2 font-display text-xl">Michelin Recommended</div>
              <div className="text-xs text-muted-foreground mt-1">Three years running · 2022 – 2025</div>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Our Story</span>
            <h2 className="mt-4 font-display text-5xl lg:text-6xl font-light leading-tight">
              Rooted in Islamabad.<br />Refined for a lifetime.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Since 2007, Golden Plate has been the quiet corner where Islamabad's most memorable evenings unfold. We source from the valleys of the north, cook slowly over live fire, and plate every course as if it were the last of the night.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { n: "18+", l: "Years", i: Clock },
                { n: "120k", l: "Guests", i: Users },
                { n: "42", l: "Dishes", i: Utensils },
              ].map(({ n, l, i: Icon }) => (
                <div key={l} className="glass rounded-2xl p-5 text-center tilt-card">
                  <Icon className="h-5 w-5 mx-auto text-accent" />
                  <div className="mt-2 font-display text-3xl">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-28 bg-gradient-to-b from-transparent via-pink-soft/30 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Signature Menu</span>
              <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Plated with intent.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2 text-sm transition ${filter === c ? "bg-foreground text-background" : "glass hover:shadow-glass"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((d) => (
              <article key={d.name} className="group tilt-card glass rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-accent">
                    {d.tag}
                  </span>
                  <button
                    onClick={() => toggleWish(d.name)}
                    aria-label="Favorite"
                    className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110"
                  >
                    <Heart className={`h-4 w-4 ${wish.has(d.name) ? "fill-accent text-accent" : "text-foreground"}`} />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
                    <div className="font-display text-2xl text-gradient shrink-0">${d.price}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {d.rating}</span>
                    <span>{d.cal} cal</span>
                    <span className="text-accent">{d.cat}</span>
                  </div>
                  <button
                    onClick={() => { add({ name: d.name, price: d.price, img: d.img }); setCartOpen(true); }}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-medium magnetic-btn"
                  >
                    Add to order <ShoppingBag className="h-3.5 w-3.5" />
                  </button>

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section id="deals" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                <Flame className="h-3.5 w-3.5" /> Limited Deals
              </span>
              <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Golden offers, warm evenings.</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">Curated seasonal deals — available for a limited time. Reserve early to secure your table.</p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEALS.map((d) => (
              <article key={d.title} className="group tilt-card glass rounded-3xl overflow-hidden relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={d.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[10px] uppercase tracking-wider font-semibold">
                    <Percent className="h-3 w-3" /> Save {d.save}
                  </span>
                  <span className="absolute top-4 right-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-foreground">
                    {d.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl leading-tight">{d.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl text-gradient">${d.price}</span>
                    <span className="text-sm line-through text-muted-foreground">${d.old}</span>
                  </div>
                  <a href="#reserve" className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-medium magnetic-btn">
                    Claim deal <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CHEFS */}
      <section id="chefs" className="py-28 bg-gradient-to-b from-transparent via-pink-soft/30 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">The Kitchen</span>
            <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Meet the makers.</h2>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CHEFS.map((c) => (
              <div key={c.name} className="group tilt-card glass rounded-3xl overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-accent">{c.role}</div>
                  <div className="mt-1 font-display text-2xl">{c.name}</div>
                  <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{c.exp}</span>
                    <span className="text-right">{c.spec}</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    {[Instagram, Twitter, Facebook].map((Icon, k) => (
                      <a key={k} href="#" className="grid h-9 w-9 place-items-center rounded-full glass hover:shadow-glass transition">
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — all dishes */}
      <section id="gallery" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Gallery</span>
              <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Every dish, in rose light.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">A visual walk through every plate on our current menu.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {DISHES.map((d) => (
              <div key={d.name} className="relative overflow-hidden rounded-3xl group aspect-square">
                <img src={d.img} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="font-display text-lg text-background leading-tight">{d.name}</div>
                  <div className="text-xs text-background/80">${d.price} · {d.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Guests</span>
            <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">In their own words.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="glass rounded-3xl p-8 tilt-card">
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-snug">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Verified guest</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="py-28 bg-gradient-to-b from-transparent via-pink-soft/40 to-transparent">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-[2.5rem] p-8 md:p-14 shadow-luxe">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Reservations</span>
                <h2 className="mt-3 font-display text-5xl font-light leading-tight">Reserve your evening.</h2>
                <p className="mt-4 text-muted-foreground">We hold a limited number of tables each night. Reserve at least 24 hours ahead for weekend dining.</p>
                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-accent" /> Tue – Sun · 6:00 PM – 11:30 PM</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> F-7 Markaz, Islamabad</div>
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +92 51 111 GOLDEN</div>
                </div>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); setBooked(true); setTimeout(() => setBooked(false), 4000); }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { p: "Full name", t: "text", span: "col-span-2" },
                  { p: "Email", t: "email", span: "col-span-2 md:col-span-1" },
                  { p: "Phone", t: "tel", span: "col-span-2 md:col-span-1" },
                  { p: "Guests", t: "number", span: "col-span-1" },
                  { p: "Date", t: "date", span: "col-span-1" },
                ].map(f => (
                  <input key={f.p} required type={f.t} placeholder={f.p}
                    className={`${f.span} rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition`} />
                ))}
                <input required type="time" className="col-span-2 rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition" />
                <textarea placeholder="Special requests (optional)" rows={3}
                  className="col-span-2 rounded-2xl border border-border bg-background/60 px-5 py-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition resize-none" />
                <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-4 text-sm font-medium magnetic-btn">
                  {booked ? "Reserved · We'll be in touch ✓" : "Confirm reservation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Visit</span>
            <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Find us in F-7.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">Tucked behind a rose-lit courtyard in F-7 Markaz. Valet parking every evening.</p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> Street 12, F-7 Markaz, Islamabad, Pakistan</div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +92 51 111 GOLDEN</div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> hello@goldenplate.pk</div>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm magnetic-btn">
                <Send className="h-3.5 w-3.5" /> WhatsApp us
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm magnetic-btn">
                Get directions <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="glass rounded-[2rem] p-2 shadow-glass">
            <iframe
              title="Golden Plate map"
              src="https://www.google.com/maps?q=F-7+Markaz+Islamabad&output=embed"
              className="w-full h-[420px] rounded-[1.75rem] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-pink-soft/20">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-display text-2xl font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              Golden Plate
            </div>
            <p className="mt-4 text-sm text-muted-foreground">A modern luxury dining room in Islamabad, plated with intent since 2007.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Menu", "Deals", "Chefs", "Gallery", "Reservations"].map(l => <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-accent transition">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>F-7 Markaz, Islamabad</li>
              <li>+92 51 111 GOLDEN</li>
              <li>hello@goldenplate.pk</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Newsletter</div>
            <p className="mt-4 text-sm text-muted-foreground">Seasonal menus, private events, and quiet evenings.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input type="email" placeholder="you@email.com" className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent" />
              <button className="rounded-full bg-foreground text-background px-4 py-2.5 text-sm magnetic-btn">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full glass hover:shadow-glass transition">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Golden Plate · Islamabad</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition">Privacy</a>
              <a href="#" className="hover:text-accent transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="#reserve"
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-medium shadow-luxe magnetic-btn"
      >
        <Sparkles className="h-4 w-4" /> Reserve
      </a>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-luxe magnetic-btn animate-rise"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
