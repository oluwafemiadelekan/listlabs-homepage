"use client";

import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WarningCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/brand";
import { microTransition } from "@/lib/motion";
import { Button } from "./Button";

/* ---------- Plain input ---------- */

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> & {
  label?: string;
  prefix?: ReactNode;
  error?: string;
  hint?: string;
  className?: string;
};

export function Input({ label, prefix, error, hint, className, id, ...rest }: InputProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="t-small font-medium text-fg">
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex h-[52px] items-center gap-2 rounded-pill bg-surface px-5",
          "transition-[box-shadow] duration-[220ms] ease-out",
          error
            ? "shadow-[inset_0_0_0_1px_var(--error)]"
            : "shadow-[inset_0_0_0_1px_var(--line-strong)] focus-within:shadow-[inset_0_0_0_1px_var(--accent),0_0_0_4px_var(--accent-ring)]",
        )}
      >
        {prefix && <span className="shrink-0 font-semibold text-accent">{prefix}</span>}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-base outline-none"
          {...rest}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="t-caption flex items-center gap-1.5 pl-5 text-error">
          <WarningCircle size={14} weight="fill" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="t-caption pl-5 text-fg-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Capsule: one pill holding the field and its action ---------- */

type CapsuleProps = {
  prefix?: ReactNode;
  placeholder: string;
  ariaLabel: string;
  action: string;
  helper?: ReactNode;
  error?: string;
  onSubmitValue?: (value: string) => string | void;
  className?: string;
  autoComplete?: string;
  name?: string;
  size?: "md" | "lg";
};

export function Capsule({
  prefix,
  placeholder,
  ariaLabel,
  action,
  helper,
  error,
  onSubmitValue,
  className,
  autoComplete = "off",
  name,
  size = "lg",
}: CapsuleProps) {
  const id = useId();
  const [value, setValue] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!onSubmitValue) return;
    setBusy(true);
    setNote(null);
    const msg = onSubmitValue(value.trim());
    window.setTimeout(() => {
      setBusy(false);
      setNote(msg ?? null);
    }, 650);
  };

  const invalid = Boolean(error);
  const below = error ? "error" : note ? "note" : helper ? "helper" : null;

  return (
    <form onSubmit={submit} className={cn("w-full max-w-[540px]", className)} noValidate>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-[26px] bg-paper p-1.5 sm:flex-row sm:items-center sm:rounded-pill",
          "transition-[box-shadow] duration-[260ms] ease-out",
          invalid
            ? "shadow-[inset_0_0_0_1px_var(--error)]"
            : "shadow-[inset_0_0_0_1px_var(--line-strong)] focus-within:shadow-[inset_0_0_0_1px_var(--accent),0_0_0_5px_var(--accent-ring)]",
        )}
      >
        <label className={cn("flex min-w-0 flex-1 cursor-text items-center gap-1.5 pl-4", size === "lg" ? "h-12" : "h-10")}>
          {prefix && <span className="shrink-0 text-[17px] font-medium text-violet">{prefix}</span>}
          <input
            id={id}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-invalid={invalid || undefined}
            aria-describedby={below ? `${id}-below` : undefined}
            autoComplete={autoComplete}
            autoCapitalize="none"
            spellCheck={false}
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-[17px] outline-none"
          />
        </label>
        <Button type="submit" size={size === "lg" ? "lg" : "md"} arrow loading={busy} className="w-full justify-between sm:w-auto">
          {action}
        </Button>
      </div>
      <div className="relative mt-3 min-h-[20px] pl-5">
        <AnimatePresence mode="wait" initial={false}>
          {below && (
            <motion.p
              key={below}
              id={`${id}-below`}
              role={below === "note" ? "status" : undefined}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={microTransition}
              className={cn(
                "t-caption flex items-center gap-1.5",
                below === "error" ? "text-error" : below === "note" ? "text-fg-soft" : "text-fg-muted",
              )}
            >
              {below === "error" && <WarningCircle size={14} weight="fill" />}
              {below === "error" ? error : below === "note" ? note : helper}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export function HandleForm({ className, error }: { className?: string; error?: string }) {
  return (
    <Capsule
      prefix="@"
      name="handle"
      placeholder="your-handle"
      ariaLabel="Your handle"
      action={BRAND.ctaPrimary}
      helper={BRAND.helper}
      error={error}
      className={className}
      onSubmitValue={() => "Concept only. In the build this goes to the real product signup."}
    />
  );
}

export function ListingForm({ className }: { className?: string }) {
  return (
    <Capsule
      name="listing"
      placeholder="I'm listing…"
      ariaLabel="Describe something you are listing"
      action="Start listing"
      className={className}
      onSubmitValue={() => "Concept only. In the build this starts a listing."}
    />
  );
}
