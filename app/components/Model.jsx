"use client";

import { useState } from "react";
import { BriefcaseBusiness, ShieldCheck } from "lucide-react";

const VIEWS = [
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Explore my experience and projects.",
    icon: BriefcaseBusiness,
  },
  {
    value: "admin",
    label: "Admin",
    description: "View the portfolio as an administrator.",
    icon: ShieldCheck,
  },
];

export default function Model({ onSelect }) {
  const [selectedView, setSelectedView] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedView === "recruiter" || selectedView === "admin") {
      onSelect(selectedView);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
      <section
        aria-labelledby="view-as-title"
        aria-describedby="view-as-description"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        role="dialog"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Welcome
        </p>
        <h1 id="view-as-title" className="text-2xl font-bold tracking-tight text-text">
          View as
        </h1>
        <p id="view-as-description" className="mt-2 text-sm leading-relaxed text-text-secondary">
          Choose how you&apos;d like to view this portfolio.
        </p>

        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <fieldset className="space-y-3">
            <legend className="sr-only">Choose a view</legend>
            {VIEWS.map(({ value, label, description, icon: Icon }, index) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                  selectedView === value
                    ? "border-accent bg-accent/10"
                    : "border-border bg-bg hover:border-accent/50"
                }`}
              >
                <input
                  autoFocus={index === 0}
                  checked={selectedView === value}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                  name="view-as"
                  onChange={() => setSelectedView(value)}
                  required
                  type="radio"
                  value={value}
                />
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-text">{label}</span>
                  <span className="mt-0.5 block text-sm text-text-secondary">{description}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <button
            className="mt-2 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Continue to portfolio
          </button>
        </form>
      </section>
    </div>
  );
}
