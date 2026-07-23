import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, Star, Heart, ShoppingBag, ArrowRight, ArrowUp,
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter,
  ChefHat, Award, Users, Utensils, Send, Sparkles,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import chefImg from "@/assets/chef.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

export const Route = createFileRoute("/")({
  component: RoselleHome,
  head: () => ({
    meta: [
      { title: "Roselle — Modern Luxury Dining in Islamabad" },
      { name: "description", content: "Refined cuisine and rose-gold ambience in the heart of Islamabad. Reserve your table at Roselle today." },
      { property: "og:title", content: "Roselle — Modern Luxury Dining" },
      { property: "og:description", content: "Refined cuisine and rose-gold ambience in the heart of Islamabad." },
      { property: "og:type", content: "restaurant" },
    ],
  }),
});

const NAV = [
  ["Home", "#home"], ["About", "#about"], ["Menu", "#menu"],
  ["Chefs", "#chefs"], ["Gallery", "#gallery"], ["Reviews", "#reviews"],
  ["Reserve", "#reserve"], ["Contact", "#contact"],
] as const;

const CATEGORIES = ["All", "Signature", "Pizza", "Steaks", "Desserts", "Drinks"] as const;

const DISHES = [
  { name: "Rose Petal Panna Cotta", cat: "Desserts", price: 14, rating: 4.9, cal: 320, tag: "Chef's Pick", img: dish1, desc: "Silken cream infused with Damascus rose and 24k gold leaf." },
  { name: "Wagyu Rose Steak", cat: "Steaks", price: 62, rating: 5.0, cal: 780, tag: "Bestseller", img: dish2, desc: "A5 Wagyu, pink peppercorn jus, whipped bone marrow." },
  { name: "Truffle Bianca", cat: "Pizza", price: 32, rating: 4.8, cal: 640, tag: "New", img: dish3, desc: "Wood-fired sourdough, black truffle, buffalo mozzarella, edible gold." },
  { name: "Blush Martini", cat: "Drinks", price: 18, rating: 4.7, cal: 210, tag: "Signature", img: dish4, desc: "Rose gin, lychee, elderflower, a whisper of pink Himalayan salt." },
  { name: "Saffron Silk Risotto", cat: "Signature", price: 28, rating: 4.9, cal: 560, tag: "Chef's Pick", img: dish1, desc: "Carnaroli rice, Kashmiri saffron, aged parmesan crown." },
  { name: "Pink Peppercorn Ribeye", cat: "Steaks", price: 48, rating: 4.8, cal: 720, tag: "Bestseller", img: dish2, desc: "Dry-aged 45 days, roasted shallot cream, pink pepper crust." },
] as const;

const CHEFS = [
  { name: "Amara Sadiq", role: "Executive Chef", exp: "18 yrs", spec: "Modern Mediterranean" },
  { name: "Rafael Moreno", role: "Head Pâtissier", exp: "12 yrs", spec: "Artisan Desserts" },
  { name: "Zara Khan", role: "Chef de Cuisine", exp: "10 yrs", spec: "Wood-Fire & Grill" },
] as const;

const REVIEWS = [
  { name: "Ayesha M.", rating: 5, text: "The most beautiful dining room in Islamabad. Every plate feels like a love letter." },
  { name: "Daniel R.", rating: 5, text: "Wagyu was flawless, and the blush martini is now my personal ritual." },
  { name: "Sana T.", rating: 5, text: "Elegant, warm, and never overdone. A rare find. We'll be back monthly." },
] as const;

function RoselleHome() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [cart, setCart] = useState(0);
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
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass shadow-glass" : "py-6"}`}>
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Roselle
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {NAV.map(([l, h]) => (
              <a key={l} href={h} className="relative group text-foreground/80 hover:text-foreground transition">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full glass p-2.5 hover:shadow-glass transition" aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
              {cart > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{cart}</span>
              )}
            </button>
            <a href="#reserve" className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium magnetic-btn">
              Reserve <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button className="lg:hidden rounded-full glass p-2.5" onClick={() => setNavOpen(v => !v)} aria-label="Menu">
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="lg:hidden mx-6 mt-3 glass rounded-3xl p-6 animate-rise">
            <div className="flex flex-col gap-4">
              {NAV.map(([l, h]) => (
                <a key={l} href={h} onClick={() => setNavOpen(false)} className="text-base font-medium">{l}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Roselle dining room at golden hour" className="h-full w-full object-cover animate-reveal" />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-soft/40 via-background/30 to-background" />
        </div>
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-32 left-10 h-40 w-40 rounded-full bg-primary/50 blur-3xl animate-float" />
          <div className="absolute bottom-24 right-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full bg-primary/60 blur-2xl animate-float" />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Now taking reservations · Islamabad
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95]">
              A quiet kind of <em className="text-gradient not-italic font-medium">luxury</em>,<br />
              plated by hand.
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Roselle is a rose-lit dining room in the heart of the capital — where slow craft, seasonal ingredients, and a soft pink glow meet on every plate.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#reserve" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium magnetic-btn">
                Book a Table <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium magnetic-btn">
                View Menu
              </a>
            </div>
            <div className="mt-12 flex items-center gap-8">
              {[["18", "Years"], ["42", "Signature dishes"], ["4.9★", "Guest rating"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-medium">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="relative hidden lg:block animate-rise" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-[2rem] p-6 tilt-card">
              <img src={dish1} alt="Signature dessert" className="rounded-2xl h-72 w-full object-cover" loading="lazy" />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">Tonight's Special</div>
                  <div className="mt-1 font-display text-2xl">Rose Petal Panna Cotta</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl">$14</div>
                  <div className="flex items-center gap-1 text-xs justify-end mt-1">
                    <Star className="h-3 w-3 fill-accent text-accent" /> 4.9
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 animate-float">
              <div className="flex items-center gap-3">
                <ChefHat className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs text-muted-foreground">Executive Chef</div>
                  <div className="font-medium text-sm">Amara Sadiq</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={chefImg} alt="Executive chef" className="rounded-[2rem] shadow-luxe w-full object-cover aspect-[4/5]" loading="lazy" />
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
              Since 2007, Roselle has been the quiet corner where Islamabad's most memorable evenings unfold. We source from the valleys of the north, cook slowly over live fire, and plate every course as if it were the last of the night.
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
                    onClick={() => setCart(c => c + 1)}
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

      {/* CHEFS */}
      <section id="chefs" className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">The Kitchen</span>
            <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Meet the makers.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {CHEFS.map((c, i) => (
              <div key={c.name} className="group tilt-card glass rounded-3xl overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={[chefImg, dish2, dish4][i]} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-accent">{c.role}</div>
                  <div className="mt-1 font-display text-2xl">{c.name}</div>
                  <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{c.exp}</span>
                    <span>{c.spec}</span>
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

      {/* GALLERY */}
      <section id="gallery" className="py-28 bg-gradient-to-b from-transparent via-pink-soft/30 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Gallery</span>
              <h2 className="mt-3 font-display text-5xl lg:text-6xl font-light">Moments in rose light.</h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[240px]">
            {[
              { src: hero, span: "col-span-2 row-span-2" },
              { src: dish1, span: "" },
              { src: dish3, span: "" },
              { src: chefImg, span: "row-span-2" },
              { src: dish4, span: "" },
              { src: dish2, span: "col-span-2" },
            ].map((g, i) => (
              <div key={i} className={`relative overflow-hidden rounded-3xl group ${g.span}`}>
                <img src={g.src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +92 51 111 ROSELLE</div>
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
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> +92 51 111 ROSELLE</div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> hello@roselle.pk</div>
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
              title="Roselle map"
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
              Roselle
            </div>
            <p className="mt-4 text-sm text-muted-foreground">A modern luxury dining room in Islamabad, plated with intent since 2007.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Menu", "Chefs", "Gallery", "Reservations"].map(l => <li key={l}><a href="#" className="hover:text-accent transition">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>F-7 Markaz, Islamabad</li>
              <li>+92 51 111 ROSELLE</li>
              <li>hello@roselle.pk</li>
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
            <div>© {new Date().getFullYear()} Roselle Dining · Islamabad</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition">Privacy</a>
              <a href="#" className="hover:text-accent transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
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
