"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  Briefcase,
  Car,
  ChartLineUp,
  Check,
  CircleNotch,
  Diamond,
  HouseLine,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Context: any claim button or form on the page opens the overlay.     */
/* ------------------------------------------------------------------ */

type OpenArgs = { handle?: string; draft?: string };
type ClaimCtx = { open: (args?: OpenArgs) => void };

const Ctx = createContext<ClaimCtx>({ open: () => {} });
export const useClaim = () => useContext(Ctx);

export function ClaimProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<(OpenArgs & { key: number }) | null>(null);
  const open = useCallback((args?: OpenArgs) => setState({ ...args, key: Date.now() }), []);
  const close = useCallback(() => setState(null), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <Ctx.Provider value={value}>
      <div id="page-root">{children}</div>
      <AnimatePresence>{state && <ClaimOverlay key={state.key} initialHandle={state.handle} draft={state.draft} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Handle rules and a stand-in availability check.                      */
/* ------------------------------------------------------------------ */

const TAKEN = new Set(["listlabs", "admin", "support", "help", "riverbend", "marcus", "sarah", "collectibles", "cars"]);
const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{1,18}[a-z0-9])?$/;

const clean = (v: string) =>
  v
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 20);

type Check = { state: "idle" | "checking" | "invalid" | "taken" | "free"; suggestions?: string[] };

function useHandleCheck(handle: string): Check {
  const valid = HANDLE_RE.test(handle);
  const [result, setResult] = useState<{ handle: string; check: Check } | null>(null);
  useEffect(() => {
    if (!handle || !valid) return;
    const t = window.setTimeout(() => {
      setResult({
        handle,
        check: TAKEN.has(handle)
          ? { state: "taken", suggestions: [`${handle}-co`, `${handle}-tx`, `the-${handle}`].filter((s) => s.length <= 20) }
          : { state: "free" },
      });
    }, 550);
    return () => window.clearTimeout(t);
  }, [handle, valid]);
  if (!handle) return { state: "idle" };
  if (!valid) return { state: "invalid" };
  return result?.handle === handle ? result.check : { state: "checking" };
}

/* ------------------------------------------------------------------ */
/* The overlay.                                                         */
/* ------------------------------------------------------------------ */

const STEPS = ["Handle", "Email", "Code", "Focus", "Done"] as const;

const ASSETS = [
  { key: "real-estate", label: "Real estate", Icon: HouseLine },
  { key: "business", label: "Business", Icon: Briefcase },
  { key: "securities", label: "Securities", Icon: ChartLineUp },
  { key: "equipment", label: "Equipment", Icon: Wrench },
  { key: "vehicles", label: "Vehicles", Icon: Car },
  { key: "collectibles", label: "Collectibles", Icon: Diamond },
];

function ClaimOverlay({ initialHandle = "", draft, onClose }: { initialHandle?: string; draft?: string; onClose: () => void }) {
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [handle, setHandle] = useState(clean(initialHandle));
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [focus, setFocus] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const check = useHandleCheck(handle);

  // Lock the page behind: stop smooth scroll, make the page inert, restore focus on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.getElementById("page-root");
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      root?.removeAttribute("inert");
      opener?.focus?.();
    };
  }, [lenis]);

  // Focus the first field of a step only once that step has finished entering,
  // so focus never lands on the step that is animating out.
  const focusStep = (el: HTMLElement | null) => el?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  // The first step does not animate in on its own, so focus it once the overlay has opened.
  useEffect(() => {
    const t = window.setTimeout(() => stepRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 500);
    return () => window.clearTimeout(t);
  }, []);

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  // A short, honest pause on each submit so the button state is visible.
  const next = (to: number) => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      go(to);
    }, 600);
  };

  // Escape closes from anywhere, even when nothing inside has focus.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const codeOk = code.every((c) => /^\d$/.test(c));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-title"
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-cream"
      data-lenis-prevent
      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0% round 28px)" }}
      animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0% round 28px)" }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      {/* Top bar */}
      <div className="container flex h-20 shrink-0 items-center justify-between gap-6">
        <Logo size={20} />
        {step < 4 && (
          <ol className="m-0 hidden list-none items-center gap-1.5 p-0 sm:flex" aria-label="Progress">
            {STEPS.slice(0, 4).map((s, i) => (
              <li key={s} aria-current={i === step ? "step" : undefined} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "h-1.5 rounded-pill transition-[width,background-color] duration-[500ms] ease-[var(--ease-out-expo)]",
                    i === step ? "w-8 bg-ink" : i < step ? "w-4 bg-violet" : "w-4 bg-sand-2",
                  )}
                />
                <span className="sr-only">{s}</span>
              </li>
            ))}
          </ol>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-pill bg-paper text-ink shadow-[inset_0_0_0_1px_var(--line)] transition-[background-color,transform] duration-[240ms] ease-out hover:bg-sand active:scale-95"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div ref={panel} className="container grid flex-1 items-center gap-10 pb-14 pt-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="relative max-w-[520px]">
          {step > 0 && step < 4 && (
            <button
              type="button"
              onClick={() => go(step - 1)}
              className="mb-6 inline-flex items-center gap-1.5 rounded-pill text-[14px] text-ink-soft transition-colors duration-[200ms] hover:text-ink"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 28, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -20, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              ref={stepRef}
              onAnimationComplete={(def) => {
                if (typeof def === "object" && def !== null && "opacity" in def && (def as { opacity: number }).opacity === 1) focusStep(stepRef.current);
              }}
            >
              {step === 0 && (
                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    if (check.state === "free") next(1);
                  }}
                  noValidate
                >
                  {draft && (
                    <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-pill bg-paper px-3.5 py-1.5 text-[13px] text-ink-soft shadow-[inset_0_0_0_1px_var(--line)]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-violet" />
                      <span className="truncate">Your draft: &ldquo;{draft}&rdquo;. Claim a handle to keep it.</span>
                    </p>
                  )}
                  <h2 id="claim-title" className="t-h1">Claim your handle</h2>
                  <p className="t-body mt-3 text-ink-soft">{BRAND.helper}</p>
                  <div
                    className={cn(
                      "mt-8 flex h-[60px] items-center gap-1.5 rounded-pill bg-paper px-5 transition-[box-shadow] duration-[260ms] ease-out",
                      check.state === "invalid" || check.state === "taken"
                        ? "shadow-[inset_0_0_0_1.5px_var(--error)]"
                        : "shadow-[inset_0_0_0_1px_var(--line-strong)] focus-within:shadow-[inset_0_0_0_1px_var(--violet),0_0_0_5px_var(--accent-ring)]",
                    )}
                  >
                    <span className="text-[20px] font-medium text-violet">@</span>
                    <input
                      data-autofocus
                      value={handle}
                      onChange={(e) => setHandle(clean(e.target.value))}
                      placeholder="your-handle"
                      aria-label="Your handle"
                      aria-describedby="handle-status"
                      autoComplete="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      className="h-full min-w-0 flex-1 bg-transparent text-[20px] outline-none"
                    />
                    <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center">
                      {check.state === "checking" && <CircleNotch size={18} className="animate-spin text-muted" />}
                      {check.state === "free" && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="flex h-7 w-7 items-center justify-center rounded-pill bg-violet text-paper"
                        >
                          <Check size={14} weight="bold" />
                        </motion.span>
                      )}
                    </span>
                  </div>
                  <div id="handle-status" aria-live="polite" className="mt-3 min-h-[44px] pl-5 text-[14px]">
                    {check.state === "idle" && <span className="text-muted">3 to 20 characters. Letters, numbers and dashes.</span>}
                    {check.state === "checking" && <span className="text-muted">Checking @{handle}…</span>}
                    {check.state === "invalid" && <span className="text-error">Use 3 to 20 letters, numbers or dashes. Start and end with a letter or number.</span>}
                    {check.state === "free" && (
                      <span>
                        <span className="font-medium">@{handle}</span> <span className="text-ink-soft">is available.</span>
                      </span>
                    )}
                    {check.state === "taken" && (
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-error">@{handle} is taken. Try</span>
                        {check.suggestions?.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setHandle(s)}
                            className="rounded-pill bg-paper px-3 py-1 text-[13px] text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] transition-colors duration-[200ms] hover:bg-sand"
                          >
                            @{s}
                          </button>
                        ))}
                      </span>
                    )}
                  </div>
                  <Button type="submit" size="lg" arrow loading={busy} disabled={check.state !== "free"} className="mt-4">
                    Continue
                  </Button>
                </form>
              )}

              {step === 1 && (
                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    if (emailOk) next(2);
                  }}
                  noValidate
                >
                  <h2 id="claim-title" className="t-h1">Where should we send your code?</h2>
                  <p className="t-body mt-3 text-ink-soft">No password. We email a six-digit code each time you sign in.</p>
                  <label className="mt-8 flex h-[60px] items-center rounded-pill bg-paper px-5 shadow-[inset_0_0_0_1px_var(--line-strong)] transition-[box-shadow] duration-[260ms] ease-out focus-within:shadow-[inset_0_0_0_1px_var(--violet),0_0_0_5px_var(--accent-ring)]">
                    <span className="sr-only">Email</span>
                    <input
                      data-autofocus
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="h-full min-w-0 flex-1 bg-transparent text-[18px] outline-none"
                    />
                  </label>
                  <Button type="submit" size="lg" arrow loading={busy} disabled={!emailOk} className="mt-6">
                    Send code
                  </Button>
                </form>
              )}

              {step === 2 && (
                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    if (codeOk) next(3);
                  }}
                  noValidate
                >
                  <h2 id="claim-title" className="t-h1">Enter your code</h2>
                  <p className="t-body mt-3 text-ink-soft">
                    We sent six digits to <span className="font-medium text-ink">{email}</span>.
                  </p>
                  <CodeInput value={code} onChange={setCode} />
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button type="submit" size="lg" arrow loading={busy} disabled={!codeOk}>
                      Verify
                    </Button>
                    <button type="button" onClick={() => setCode(["", "", "", "", "", ""])} className="text-[14px] text-ink-soft underline-offset-4 transition-colors duration-[200ms] hover:text-ink hover:underline">
                      Resend code
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form
                  onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    next(4);
                  }}
                >
                  <h2 id="claim-title" className="t-h1">What do you move?</h2>
                  <p className="t-body mt-3 text-ink-soft">Pick any. It shapes your feed and the saved searches we suggest. You can change it later.</p>
                  <fieldset className="mt-8 grid grid-cols-2 gap-[4px] border-0 p-0 sm:grid-cols-3">
                    <legend className="sr-only">Asset types</legend>
                    {ASSETS.map(({ key, label, Icon }, i) => {
                      const on = focus.includes(key);
                      return (
                        <label
                          key={key}
                          className={cn(
                            "relative flex cursor-pointer flex-col gap-6 rounded-card p-4 transition-[background-color,color] duration-[300ms] ease-out",
                            on ? "bg-plum text-paper" : "bg-paper text-ink hover:bg-sand",
                          )}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={on}
                            data-autofocus={i === 0 ? true : undefined}
                            onChange={() => setFocus((f) => (on ? f.filter((x) => x !== key) : [...f, key]))}
                          />
                          <Icon size={20} weight={on ? "fill" : "regular"} />
                          <span className="text-[15px] font-medium">{label}</span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-pill transition-[background-color,opacity] duration-[300ms]",
                              on ? "bg-violet opacity-100" : "opacity-0",
                            )}
                          >
                            <Check size={11} weight="bold" />
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button type="submit" size="lg" arrow loading={busy}>
                      {focus.length ? "Continue" : "Skip for now"}
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-violet text-paper">
                    <Check size={22} weight="bold" />
                  </span>
                  <h2 id="claim-title" className="t-h1 mt-6">
                    <span className="whitespace-nowrap">@{handle}</span> is yours.
                  </h2>
                  <p className="t-body mt-3 max-w-[44ch] text-ink-soft">
                    {draft
                      ? "Your draft listing is saved to your handle. Finish it, then decide who sees it."
                      : "List what you have and decide who sees it, or set a saved search that watches for what you want."}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button size="lg" arrow onClick={onClose} data-autofocus>
                      {draft ? "Finish your listing" : "Start a listing"}
                    </Button>
                    <Button size="lg" variant="secondary" onClick={onClose}>
                      Set a saved search
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live preview of what you are claiming */}
        <ProfilePreview handle={handle} focus={focus} done={step === 4} />
      </div>

      <p className="container pb-6 text-[12px] text-muted">Concept flow. Nothing is sent or stored.</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces.                                                              */
/* ------------------------------------------------------------------ */

function CodeInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const set = (i: number, d: string) => {
    const next = [...value];
    next[i] = d;
    onChange(next);
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    e.preventDefault();
    onChange([...digits, ...Array(6 - digits.length).fill("")]);
    refs.current[Math.min(digits.length, 5)]?.focus();
  };
  return (
    <div className="mt-8 flex gap-[4px]" role="group" aria-label="Six-digit code">
      {value.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-autofocus={i === 0 ? true : undefined}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onPaste={onPaste}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1);
            set(i, v);
            if (v && i < 5) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus();
          }}
          className="tnum h-16 w-full min-w-0 max-w-[64px] rounded-[18px] bg-paper text-center text-[24px] font-medium shadow-[inset_0_0_0_1px_var(--line-strong)] outline-none transition-[box-shadow] duration-[240ms] ease-out focus:shadow-[inset_0_0_0_1px_var(--violet),0_0_0_4px_var(--accent-ring)]"
        />
      ))}
    </div>
  );
}

function ProfilePreview({ handle, focus, done }: { handle: string; focus: string[]; done: boolean }) {
  const shown = handle || "your-handle";
  const labels = ASSETS.filter((a) => focus.includes(a.key)).map((a) => a.label);
  return (
    <aside aria-label="Profile preview" className="hidden lg:block">
      <div className="flex flex-col gap-[4px]">
        <div className="relative overflow-hidden rounded-card bg-plum p-6 text-paper">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-violet text-[18px] font-medium uppercase">
              {shown.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[20px] font-medium tracking-[-0.02em]">@{shown}</div>
              <div className="truncate text-[13px] text-paper/60">
                {BRAND.handleDomain}/@{shown}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {(labels.length ? labels : ["Pick what you move"]).map((l) => (
              <span key={l} className={cn("rounded-pill px-3 py-1 text-[12px]", labels.length ? "bg-paper/15 text-paper" : "text-paper/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]")}>
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[4px]">
          {[
            ["Listings", "0"],
            ["Following", "0"],
            ["Searches", "0"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-card bg-paper p-4">
              <div className="tnum text-[22px] font-medium">{v}</div>
              <div className="text-[12px] text-muted">{k}</div>
            </div>
          ))}
        </div>
        <div className="rounded-card bg-sand p-4 text-[13px] text-ink-soft">
          {done ? "Your handle is live. People can find you by it." : "This is how people will find you."}
        </div>
      </div>
    </aside>
  );
}
