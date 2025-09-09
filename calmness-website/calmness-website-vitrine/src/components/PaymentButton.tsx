"use client";
import Link from 'next/link';

interface PaymentButtonProps {
  service: string;
  className?: string;
  children: React.ReactNode;
}

export default function PaymentButton({ service, className = '', children }: PaymentButtonProps) {
  return (
    <Link href={`/paiement?service=${service}`} className={className}>
      {children}
    </Link>
  );
}
