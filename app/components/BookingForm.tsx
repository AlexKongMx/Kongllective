"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Slot = {
  startTime: string;
  endTime: string;
  period: "morning" | "afternoon";
};

type Status = "loading" | "ready" | "sending" | "success" | "error";

const TIMEZONE = "America/Vancouver";

function dayKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

function fmt(iso: string, opts: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    ...opts,
  }).format(new Date(iso));
}

export default function BookingForm() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [day, setDay] = useState("");
  const [selected, setSelected] = useState<Slot | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [objective, setObjective] = useState("");

  async function load() {
    setStatus("loading");
    setError("");
    setSlots([]);
    setSelected(null);
    try {
      const res = await fetch("https://n8n.srv1457832.hstgr.cloud/webhook/kongllective-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "availability" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !Array.isArray(data.slots)) {
        throw new Error(data.error || "load_failed");
      }
      setSlots(data.slots);
      if (data.slots.length > 0) {
        setDay(dayKey(data.slots[0].startTime));
      }
      setStatus("ready");
    } catch {
      setError("Couldn't load available times. Please try again.");
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const days = useMemo(
    () => [...new Set(slots.map((s) => dayKey(s.startTime)))],
    [slots]
  );

  const choices = slots.filter((s) => dayKey(s.startTime) === day);

  async function reserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected || status === "sending") return;
    setStatus("sending");
    setError("");
    const name = `${firstName.trim()} ${lastName.trim()}`.trim();
    try {
      const res = await fetch("https://n8n.srv1457832.hstgr.cloud/webhook/kongllective-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "book",
          startTime: selected.startTime,
          visitor: {
            name,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            business: business.trim(),
            objective: objective.trim(),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !data.appointmentId) {
        throw new Error(data.error || "booking_failed");
      }
      setMeetingUrl(data.meetingUrl || "");
      setStatus("success");
    } catch {
      setError("That time couldn't be confirmed. Please try another.");
      setStatus("ready");
    }
  }

  return (
    <div className="booking">
      <div className="booking__header">
        <span className="booking__eyebrow">30 min · Google Meet</span>
        <h3>Pick a time that works for you</h3>
        <p>Two focused slots each weekday, Vancouver time.</p>
      </div>

      {status === "loading" && (
        <p className="booking__status" role="status">
          Checking availability…
        </p>
      )}

      {status === "error" && (
        <div className="booking__status" role="alert">
          <p>{error}</p>
          <button type="button" onClick={load} className="booking__retry">
            Try again
          </button>
        </div>
      )}

      {(status === "ready" || status === "sending") && (
        <>
          <p className="booking__step-label">Step 1 — Choose a day</p>
          <div className="booking__days" aria-label="Available days">
            {days.map((d) => {
              const sample = slots.find((s) => dayKey(s.startTime) === d)!;
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={day === d}
                  className={day === d ? "is-active" : ""}
                  onClick={() => {
                    setDay(d);
                    setSelected(null);
                    setError("");
                  }}
                >
                  <span>{fmt(sample.startTime, { weekday: "short" })}</span>
                  <strong>{fmt(sample.startTime, { day: "numeric" })}</strong>
                  <span>{fmt(sample.startTime, { month: "short" })}</span>
                </button>
              );
            })}
          </div>

          <p className="booking__step-label">Step 2 — Pick a time</p>
          <div className="booking__slots">
            {choices.map((slot) => (
              <button
                key={slot.startTime}
                type="button"
                aria-pressed={selected?.startTime === slot.startTime}
                className={selected?.startTime === slot.startTime ? "is-active" : ""}
                onClick={() => {
                  setSelected(slot);
                  setError("");
                }}
              >
                <span>
                  {slot.period === "morning" ? "Morning" : "Afternoon"}
                </span>
                <strong>
                  {fmt(slot.startTime, { hour: "numeric", minute: "2-digit" })}
                </strong>
              </button>
            ))}
          </div>

          {selected && (
            <form className="booking__form" onSubmit={reserve}>
              <h4>Tell us about your project</h4>
              <p className="booking__form-sub">Step 3 — We'll send the calendar invite to your email</p>
              <div className="booking__row">
                <label>
                  First name
                  <input
                    required
                    autoComplete="given-name"
                    maxLength={60}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    autoComplete="family-name"
                    maxLength={80}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Kong"
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </label>
              <label>
                Company / Project
                <input
                  required
                  maxLength={160}
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Your company or project name"
                />
              </label>
              <label>
                What do you want to build?
                <textarea
                  required
                  rows={3}
                  maxLength={2000}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Tell us about your goals, timeline, and what success looks like."
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="booking__submit"
              >
                {status === "sending" ? "Confirming…" : "Confirm booking →"}
              </button>
              {error && (
                <p className="booking__error" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </>
      )}

      {status === "success" && selected && (
        <div className="booking__success" role="status">
          <span className="booking__check">✓</span>
          <h4>You're booked</h4>
          <p>
            {fmt(selected.startTime, {
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            · Vancouver time
          </p>
          <p>A calendar invitation is on its way to {email}.</p>
          {meetingUrl && (
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="booking__meet"
            >
              Join Google Meet →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
