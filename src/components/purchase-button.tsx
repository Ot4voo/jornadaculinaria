import { useEffect, useRef, useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { purchase } from '@/data/purchase';

export function resolveCheckoutUrl(value: string) {
  if (!value.trim()) return null;
  const url = new URL(value);
  if (url.protocol !== 'https:') throw new Error('Invalid checkout');
  return url.href;
}

export function PurchaseButton({ final = false, compact = false }: { final?: boolean; compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const className = final ? 'checkout-button' : compact ? 'header-cta h-10 text-xs' : 'h-12 px-6 text-xs';
  if (!purchase.checkoutUrl) return <div className={compact ? 'purchase-control compact' : 'purchase-control'}>
    {final ? <Button variant="culinary" className={className} disabled>Compra temporariamente indisponível</Button> : <Button variant={compact ? 'editorial' : 'culinary'} asChild className={className}><a href={compact ? '#compra' : '#colecao'}>{compact ? 'Ver oferta' : 'Conhecer os 16 e-books'}<ArrowRight /></a></Button>}
    {!compact && <p className="purchase-status">{final ? 'As compras serão liberadas quando o pagamento estiver disponível.' : 'Compra temporariamente indisponível.'}</p>}
  </div>;
  function openCheckout() {
    setError(false);
    try {
      const url = resolveCheckoutUrl(purchase.checkoutUrl);
      if (!url) return;
      setLoading(true);
      timer.current = setTimeout(() => { setLoading(false); setError(true); }, 10000);
      window.location.assign(url);
    } catch { setLoading(false); setError(true); }
  }
  return <div className="purchase-control">
    <Button variant={compact ? 'editorial' : 'culinary'} className={className} disabled={loading} aria-busy={loading} onClick={openCheckout}>{loading ? <><LoaderCircle className="animate-spin" />Abrindo pagamento…</> : <>Quero acessar os 16 e-books<ArrowRight /></>}</Button>
    {error && <p role="alert" className="purchase-status">Não foi possível abrir o pagamento. Tente novamente.</p>}
  </div>;
}