import type { ReactNode } from "react";
import { ClaimProvider } from "@/components/claim/ClaimFlow";
import { Close } from "@/components/home/Closing";
import { Header } from "@/components/home/Header";
import { VersionSwitch } from "@/components/site/VersionSwitch";
import type { Variant } from "@/lib/site";

/**
 * Every page: the version wrapper (tokens switch on data-variant), the claim flow, the header,
 * the page itself, then the closing claim card and footer.
 */
export function SiteShell({ variant, children, close = true }: { variant: Variant; children: ReactNode; close?: boolean }) {
  return (
    <div data-variant={variant}>
      <ClaimProvider>
        <Header />
        <main>
          {children}
          {close && <Close />}
        </main>
      </ClaimProvider>
      <VersionSwitch />
    </div>
  );
}
