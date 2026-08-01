import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart, useOrders } from "@/lib/store";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, setQty, remove, clear, total, count } = useCart();
  const { place } = useOrders();
  const [placed, setPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    const order = place(form, items, total);
    clear();
    setPlaced(order.id);
    setForm({ name: "", phone: "", address: "", note: "" });
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative h-full w-full max-w-md bg-background shadow-luxe flex flex-col animate-rise">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <ShoppingBag className="h-4 w-4 shrink-0 text-accent" />
            <h2 className="truncate font-display text-xl">Your Order ({count})</h2>
          </div>
          <button onClick={onClose} aria-label="Close cart" className="grid h-9 w-9 shrink-0 place-items-center rounded-full glass">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {placed ? (
            <div className="mt-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
              <h3 className="mt-4 font-display text-2xl">Order placed!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Order ID <span className="font-medium text-foreground">{placed}</span>. Our team will call you shortly.</p>
              <button onClick={() => { setPlaced(null); onClose(); }} className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm text-background magnetic-btn">
                Continue browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted-foreground">Your order is empty. Add something delicious.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.name} className="flex items-center gap-3 rounded-2xl glass p-3">
                  <img src={i.img} alt={i.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{i.name}</div>
                    <div className="text-sm text-accent">${i.price}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => setQty(i.name, i.qty - 1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center rounded-full border border-border">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.name, i.qty + 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center rounded-full border border-border">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button onClick={() => remove(i.name)} aria-label="Remove" className="ml-auto text-muted-foreground hover:text-accent">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!placed && items.length > 0 && (
          <form onSubmit={submit} className="space-y-3 border-t border-border px-5 py-4">
            <div className="flex items-center justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-gradient">${total}</span>
            </div>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" type="tel"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Delivery address"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
            <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note (optional)"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
            <button type="submit" className="w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background magnetic-btn">
              Place order
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
