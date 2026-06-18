export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(' ')
}

// All CTA clicks land on the checkout route.
export const goToCheckout = (navigate: (path: string) => void): void => {
  navigate('/checkout')
}

// Format currency
export const formatINR = (n: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
