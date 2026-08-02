import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, LogOut, ArrowLeft, ShoppingBag, DollarSign, Clock, Trash2, CalendarDays } from "lucide-react";
import { ADMIN_EMAIL, ADMIN_PASSWORD, isAdminLoggedIn, setAdminLoggedIn, useOrders, useReservations, type Order, type Reservation } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  component: AdminPortal,
  head: () => ({
    meta: [
      { title: "Admin Portal — Golden Plate" },
      { name: "description", content: "Golden Plate admin portal: manage incoming food orders, update status and track revenue." },
      { property: "og:title", content: "Admin Portal — Golden Plate" },
      { property: "og:description", content: "Manage incoming orders and track revenue for Golden Plate, Islamabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const STATUSES: Order["status"][] = ["new", "preparing", "delivered", "cancelled"];
const RES_STATUSES: Reservation["status"][] = ["new", "confirmed", "seated", "cancelled"];

function AdminPortal() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { orders, setStatus, removeOrder } = useOrders();
  const { reservations, setReservationStatus, removeReservation } = useReservations();

  useEffect(() => { setAuthed(isAdminLoggedIn()); setReady(true); }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true); setAuthed(true); setError("");
    } else setError("Wrong email or password.");
  };

  if (!ready) return null;

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-gradient-to-b from-pink-soft/40 to-background px-5">
        <form onSubmit={login} className="w-full max-w-sm glass rounded-3xl p-8 shadow-luxe">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 font-display text-3xl">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Golden Plate management portal.</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email"
            className="mt-6 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password"
            className="mt-3 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
          {error && <p className="mt-3 text-sm text-accent">{error}</p>}
          <button type="submit" className="mt-5 w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background magnetic-btn">Sign in</button>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to website
          </Link>
        </form>
      </main>
    );
  }

  const revenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === "new").length;

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border glass px-5 py-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl">Golden Plate · Admin</h1>
          <p className="truncate text-xs text-muted-foreground">{ADMIN_EMAIL}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link to="/" className="rounded-full glass px-4 py-2 text-sm">Website</Link>
          <button onClick={() => { setAdminLoggedIn(false); setAuthed(false); }} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background">
            <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { l: "Total orders", v: orders.length, i: ShoppingBag },
            { l: "Pending", v: pending, i: Clock },
            { l: "Revenue", v: `$${revenue}`, i: DollarSign },
          ].map(({ l, v, i: Icon }) => (
            <div key={l} className="glass rounded-3xl p-6">
              <Icon className="h-5 w-5 text-accent" />
              <div className="mt-3 font-display text-3xl">{v}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl">Table bookings</h2>
        {reservations.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No table bookings yet. Reservations from the website appear here instantly.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {reservations.map((r) => (
              <article key={r.id} className="glass rounded-3xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-xl">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.id} · {new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <button onClick={() => removeReservation(r.id)} aria-label="Delete booking" className="text-muted-foreground hover:text-accent">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-accent" /> {r.date} · {r.time} · {r.guests} guests</div>
                  <div className="text-muted-foreground">{r.phone} · {r.email}</div>
                  {r.note && <div className="text-muted-foreground">Note: {r.note}</div>}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {RES_STATUSES.map((s) => (
                    <button key={s} onClick={() => setReservationStatus(r.id, s)}
                      className={`rounded-full px-4 py-1.5 text-xs capitalize transition ${r.status === s ? "bg-foreground text-background" : "border border-border"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <h2 className="mt-10 font-display text-2xl">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No orders yet. Orders placed on the website appear here instantly.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((o) => (
              <article key={o.id} className="glass rounded-3xl p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-xl">{o.id}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display text-2xl text-gradient">${o.total}</div>
                    <button onClick={() => removeOrder(o.id)} aria-label="Delete order" className="mt-1 text-muted-foreground hover:text-accent">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-sm">
                  <div className="font-medium">{o.customer.name} · {o.customer.phone}</div>
                  <div className="text-muted-foreground">{o.customer.address}</div>
                  {o.customer.note && <div className="text-muted-foreground">Note: {o.customer.note}</div>}
                </div>

                <ul className="mt-3 space-y-1 text-sm">
                  {o.items.map((i) => (
                    <li key={i.name} className="flex justify-between gap-3">
                      <span className="min-w-0 truncate">{i.qty} × {i.name}</span>
                      <span className="shrink-0 text-muted-foreground">${i.qty * i.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => setStatus(o.id, s)}
                      className={`rounded-full px-4 py-1.5 text-xs capitalize transition ${o.status === s ? "bg-foreground text-background" : "border border-border"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
