import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PurchaseButton, resolveCheckoutUrl } from '@/components/purchase-button';

afterEach(cleanup);
describe('Purchase availability', () => {
  it('shows an honest disabled state without an official checkout', () => {
    render(<PurchaseButton final />);
    expect(screen.getByRole('button', { name: 'Compra temporariamente indisponível' })).toBeDisabled();
    expect(screen.queryByText(/URL de pagamento/)).not.toBeInTheDocument();
  });
  it('allows browsing the collection without simulating a purchase', () => {
    render(<PurchaseButton />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#colecao');
    expect(screen.getByText('Compra temporariamente indisponível.')).toBeInTheDocument();
  });
  it('accepts only a configured secure checkout URL', () => {
    expect(resolveCheckoutUrl('')).toBeNull();
    expect(resolveCheckoutUrl('https://example.com/pay')).toBe('https://example.com/pay');
    expect(() => resolveCheckoutUrl('javascript:alert(1)')).toThrow();
    expect(() => resolveCheckoutUrl('not a URL')).toThrow();
    expect(() => resolveCheckoutUrl('http://example.com')).toThrow();
  });
});