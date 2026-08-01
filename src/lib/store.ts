import { useCallback, useEffect, useState } from "react";

export type CartItem = { name: string; price: number; img: string; qty: number };

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string; note?: string };
  items: CartItem[];
  total: number;
  status: "new" | "preparing" | "delivered" | "cancelled";
};

const CART_KEY = "gp_cart_v1";
const ORDERS_KEY = "gp_orders_v1";
const ADMIN_KEY = "gp_admin_session_v1";

export const ADMIN_EMAIL = "meerab.imran.2002@gmail.com";
export const ADMIN_PASSWORD = "meerabkhan123456";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("gp-store", { detail: key }));
}

function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    setValue(read<T>(key, fallback));
    const sync = () => setValue(read<T>(key, fallback));
    window.addEventListener("gp-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gp-store", sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = useCallback((next: T) => { write(key, next); setValue(next); }, [key]);
  return [value, save] as const;
}

export function useCart() {
  const [items, setItems] = useStored<CartItem[]>(CART_KEY, []);

  const add = (item: Omit<CartItem, "qty">) => {
    const existing = items.find((i) => i.name === item.name);
    setItems(
      existing
        ? items.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { ...item, qty: 1 }],
    );
  };
  const setQty = (name: string, qty: number) =>
    setItems(qty <= 0 ? items.filter((i) => i.name !== name) : items.map((i) => (i.name === name ? { ...i, qty } : i)));
  const remove = (name: string) => setItems(items.filter((i) => i.name !== name));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return { items, add, setQty, remove, clear, count, total };
}

export function useOrders() {
  const [orders, setOrders] = useStored<Order[]>(ORDERS_KEY, []);

  const place = (customer: Order["customer"], items: CartItem[], total: number): Order => {
    const order: Order = {
      id: `GP-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer,
      items,
      total,
      status: "new",
    };
    setOrders([order, ...orders]);
    return order;
  };

  const setStatus = (id: string, status: Order["status"]) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));

  const removeOrder = (id: string) => setOrders(orders.filter((o) => o.id !== id));

  return { orders, place, setStatus, removeOrder };
}

export function isAdminLoggedIn() {
  return read<boolean>(ADMIN_KEY, false);
}
export function setAdminLoggedIn(value: boolean) {
  write(ADMIN_KEY, value);
}
