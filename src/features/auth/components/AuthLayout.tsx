import type { ReactNode } from "react";
import { BrandLogo } from "@/features/auth/components/BrandLogo";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="mb-10 flex justify-center">
          <BrandLogo compact />
        </div>

        <h1 className="brand-title">{title}</h1>

        {subtitle ? (
          <p className="mt-5 text-center text-[2.1rem] font-light leading-tight tracking-[-0.06em] text-[#3a2f2f]">
            {subtitle}
          </p>
        ) : null}

        <div className="mt-8">{children}</div>

        {footer ? <div className="mt-8">{footer}</div> : null}
      </div>
    </div>
  );
}
