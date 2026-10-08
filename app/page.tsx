"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

const disciplines = [
  "Animation",
  "VFX",
  "Games",
  "Virtual Production",
  "XR",
  "Advertising",
  "Film",
];

const capabilities = [
  {
    number: "01",
    icon: "growth",
    title: "Business Development",
    copy: "Reach the brands, agencies, publishers and production companies that fit your ambition.",
    outcome: "New markets. Better-fit opportunities.",
  },
  {
    number: "02",
    icon: "partnership",
    title: "Strategic Partnerships",
    copy: "Bring complementary companies together around stronger ideas and more capable teams.",
    outcome: "The right partners, assembled with purpose.",
  },
  {
    number: "03",
    icon: "production",
    title: "Executive Production",
    copy: "Shape the production from the first pitch through delivery, with the right structure around it.",
    outcome: "Clearer paths from possibility to production.",
  },
  {
    number: "04",
    icon: "coproduction",
    title: "Co-Productions",
    copy: "Find international partners for features, series and original IP with shared creative potential.",
    outcome: "Bigger stories, built together.",
  },
  {
    number: "05",
    icon: "funding",
    title: "Funding",
    copy: "Identify public programs, strategic partners and funding opportunities that can move a project forward.",
    outcome: "More ways to make ambitious work possible.",
  },
];

const partners = [
  {
    name: "Exodo Animation",
    specialty: "Cinematics · Advertising · Animation",
    url: "https://www.exodoanimation.com/",
    logo: "/partners/exodo.png",
  },
  {
    name: "Mali Arts",
    specialty: "Feature Animation · Original IP",
    url: "https://maliarts.net/",
    logo: "/partners/maliarts.png",
  },
  {
    name: "Detonante",
    specialty: "Visual Effects",
    url: "https://detonantevfx.com/",
    logo: "/partners/detonante.svg",
    inverse: true,
  },
  {
    name: "Void XR",
    specialty: "Immersive Experiences",
    url: "https://www.voidxr.studio/",
    logo: "/partners/voidxr.svg",
    inverse: true,
  },
];

const process = [
  ["01", "Discovery", "Understand the project, the ambition and the real challenge."],
  ["02", "Matching", "Find the creative partners whose strengths belong in the room."],
  ["03", "Strategy", "Define the most effective production and partnership approach."],
  ["04", "Execution", "Connect the people, align the vision and move the work forward."],
  ["05", "Beyond", "Build relationships that keep creating value after delivery."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CapabilityIcon({ type }: { type: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {type === "growth" && (
        <>
          <path {...common} d="M4 18V13M10 18V9M16 18V5" />
          <path {...common} d="m14 5 2-2 2 2" />
        </>
      )}
      {type === "partnership" && (
        <>
          <circle {...common} cx="9" cy="12" r="5" />
          <circle {...common} cx="15" cy="12" r="5" />
        </>
      )}
      {type === "production" && (
        <>
          <rect {...common} x="4" y="7" width="16" height="12" rx="1" />
          <path {...common} d="M4 11h16M7 7l3 4M13 7l3 4" />
        </>
      )}
      {type === "coproduction" && (
        <>
          <path {...common} d="M4 7h5a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h5" />
          <path {...common} d="m17 14 3 3-3 3M4 17h4" />
        </>
      )}
      {type === "funding" && (
        <>
          <circle {...common} cx="12" cy="12" r="7" />
          <path {...common} d="M14.5 9.5c-.5-.7-1.3-1-2.4-1-1.3 0-2.2.7-2.2 1.7 0 2.7 4.7 1.2 4.7 3.9 0 1.1-1 1.9-2.5 1.9-1.2 0-2.1-.4-2.7-1.2M12 6.5v2M12 16v1.5" />
        </>
      )}
    </svg>
  );
}

function Signature({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "signature signature--compact" : "signature"} aria-label="Kongllective">
      <img src="/brand/kongllective-brush-logo-transparent-v1.png" alt="" aria-hidden="true" />
    </span>
  );
}

function DisciplineCarousel() {
  const carousel = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastTime: 0,
    startTime: 0,
    totalMovement: 0,
    velocity: 0,
    frame: 0,
    autoTimer: 0,
    resumeAt: 0,
    hovering: false,
  });

  const normalizeLoop = (element: HTMLDivElement) => {
    const loopWidth = element.scrollWidth / 2;
    if (!loopWidth) return;
    if (element.scrollLeft >= loopWidth) element.scrollLeft -= loopWidth;
    if (element.scrollLeft <= 0) element.scrollLeft += loopWidth;
  };

  const stopMomentum = () => {
    if (drag.current.frame) window.clearInterval(drag.current.frame);
    drag.current.frame = 0;
  };

  useEffect(() => {
    const element = carousel.current;
    if (!element) return;

    element.scrollLeft = 1;
    drag.current.autoTimer = window.setInterval(() => {
      const now = performance.now();
      if (
        !drag.current.active &&
        !drag.current.frame &&
        !drag.current.hovering &&
        now >= drag.current.resumeAt &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        element.scrollLeft += 0.75;
        normalizeLoop(element);
      }
    }, 30);

    return () => {
      stopMomentum();
      if (drag.current.autoTimer) window.clearInterval(drag.current.autoTimer);
    };
  }, []);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carousel.current;
    if (!element || (event.pointerType === "mouse" && event.button !== 0)) return;
    stopMomentum();
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      startTime: performance.now(),
      totalMovement: 0,
      velocity: 0,
      frame: 0,
      autoTimer: drag.current.autoTimer,
      resumeAt: Number.POSITIVE_INFINITY,
      hovering: drag.current.hovering,
    };
    element.setPointerCapture(event.pointerId);
    element.classList.add("is-dragging");
    event.preventDefault();
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carousel.current;
    if (!element || !drag.current.active || event.pointerId !== drag.current.pointerId) return;

    const now = performance.now();
    const elapsed = Math.max(1, now - drag.current.lastTime);
    const movement = event.clientX - drag.current.lastX;
    const instantVelocity = -movement / elapsed;

    element.scrollLeft -= movement;
    normalizeLoop(element);
    drag.current.totalMovement -= movement;
    drag.current.velocity = drag.current.velocity * 0.68 + instantVelocity * 0.32;
    drag.current.lastX = event.clientX;
    drag.current.lastTime = now;
    event.preventDefault();
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = carousel.current;
    if (!element || !drag.current.active || event.pointerId !== drag.current.pointerId) return;
    drag.current.active = false;
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    element.classList.remove("is-dragging");
    drag.current.resumeAt = performance.now() + 900;

    const releasedAt = performance.now();
    if (releasedAt - drag.current.lastTime > 500 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drag.current.velocity = 0;
      return;
    }

    const averageVelocity = drag.current.totalMovement / Math.max(1, releasedAt - drag.current.startTime);
    const releaseVelocity = Math.abs(drag.current.velocity) > 0.05
      ? drag.current.velocity
      : averageVelocity * 0.72;
    let velocity = Math.max(-3.2, Math.min(3.2, releaseVelocity)) * 16.667;
    let previous = element.scrollLeft;

    drag.current.frame = window.setInterval(() => {
      element.scrollLeft += velocity;
      normalizeLoop(element);
      const current = element.scrollLeft;
      velocity *= 0.945;

      if (Math.abs(velocity) < 0.12 || current === previous) {
        window.clearInterval(drag.current.frame);
        drag.current.frame = 0;
        return;
      }

      previous = current;
    }, 16);
  };

  const handleKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const element = carousel.current;
    if (!element || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    stopMomentum();
    drag.current.resumeAt = performance.now() + 1200;
    event.preventDefault();
    element.scrollBy({ left: event.key === "ArrowRight" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <div
      id="disciplines"
      className="discipline-window"
      aria-label="Creative disciplines in the collective. Click and drag to explore."
      role="region"
      tabIndex={0}
      ref={carousel}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={handleKeys}
      onMouseEnter={() => { drag.current.hovering = true; }}
      onMouseLeave={() => {
        drag.current.hovering = false;
        drag.current.resumeAt = performance.now() + 350;
      }}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="discipline-track">
        {[...disciplines, ...disciplines].map((item, index) => (
          <div className="discipline-card" key={`${item}-${index}`} aria-hidden={index >= disciplines.length}>
            <span>{String((index % disciplines.length) + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
            <i aria-hidden="true">↗</i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  function openCalendly() {
    const w = window as unknown as {
      Calendly?: { initPopupWidget: (options: { url: string }) => void };
    };
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url: "https://calendly.com/alex-kongllective/30min" });
    } else {
      window.open("https://calendly.com/alex-kongllective/30min", "_blank", "noopener,noreferrer");
    }
  }

  async function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(formElement).entries())),
      });
      if (!response.ok) throw new Error("Lead delivery failed");
      formElement.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main>
      <section className="hero" id="top">
        <header className="hero__header">
          <a href="#top" className="brand-link" aria-label="Kongllective home">
            <Signature compact />
          </a>
        </header>

        <div className="hero__art" aria-hidden="true">
          <img src="/brand/kongllective-hero-gorilla-v1.png" alt="" />
        </div>
        <div className="hero__grain" aria-hidden="true" />

        <div className="hero__content">
          <p className="eyebrow">Strategic creative partnerships</p>
          <h1>
            <span className="hero__line">Extraordinary projects</span>
            <span className="hero__line">begin with extraordinary</span>
            <span className="hero__line hero__line--outline">partnerships.</span>
          </h1>
          <p className="hero__lede">
            We connect the right companies, clients and partners to build work with greater reach, scale and impact.
          </p>
          <a className="button button--light" href="#contact">
            Let&apos;s talk <Arrow />
          </a>
        </div>

        <div className="hero__foot">
          <span>Animation · VFX · Games · Film · Advertising · Immersive</span>
          <a href="#intro" aria-label="Scroll to learn more">Explore ↓</a>
        </div>
      </section>

      <section className="intro section section--paper" id="intro">
        <div className="section-label">
          <span>01</span>
          <span>Who we are</span>
        </div>
        <div className="intro__statement">
          <p className="kicker">Great studios deserve great opportunities.</p>
          <h2>
            Talent is everywhere.
            <br />
            <em>Connection isn&apos;t.</em>
          </h2>
        </div>
        <div className="intro__body">
          <p>Great studios rarely struggle because of talent.</p>
          <p>They struggle because the right opportunities never find them.</p>
          <p className="intro__body-closing">We exist to change that.</p>
        </div>
        <div className="manifesto" aria-label="Our purpose">
          <span>Open doors.</span>
          <span>Build trust.</span>
          <span>Create opportunities.</span>
        </div>
      </section>

      <section className="collective section section--ink" id="collective">
        <div className="section-label section-label--light">
          <span>02</span>
          <span>The collective</span>
        </div>
        <div className="collective__head">
          <h2>Different strengths.<br /><span>One standard.</span></h2>
          <p>
            Not a traditional studio. A carefully curated ecosystem of creative companies, assembled around what each opportunity actually needs.
          </p>
        </div>

        <DisciplineCarousel />
        <p className="collective__outcome">The right team for every challenge.</p>
      </section>

      <section className="capabilities section section--paper" id="capabilities">
        <div className="section-label">
          <span>03</span>
          <span>How we create growth</span>
        </div>
        <div className="capabilities__intro">
          <h2>From strong work<br />to <em>real momentum.</em></h2>
          <p>Our services are the mechanisms. The outcome is a stronger position, a wider field of opportunity and partnerships built to last.</p>
        </div>
        <div className="capability-list">
          {capabilities.map((item) => (
            <article className="capability" key={item.number}>
              <div className="capability__index">
                <CapabilityIcon type={item.icon} />
                <span className="capability__number">{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <strong>{item.outcome}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="process section section--orange" id="process">
        <div className="section-label section-label--dark">
          <span>04</span>
          <span>How we work</span>
        </div>
        <div className="process__head">
          <h2>Every opportunity starts<br />with a conversation.</h2>
        </div>
        <div className="process-list">
          {process.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles section section--paper">
        <div className="section-label">
          <span>05</span>
          <span>Why Kongllective</span>
        </div>
        <div className="principles-grid">
          <article>
            <span>01</span>
            <h3>Boutique</h3>
            <p>A small number of carefully selected partners. Depth over volume, always.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Trusted</h3>
            <p>Long-term relationships built through honesty, consistency and shared wins.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Connected</h3>
            <p>Studios, clients, investors and production partners brought into useful alignment.</p>
          </article>
        </div>
      </section>

      <section className="partners section section--soft" id="partners">
        <div className="section-label">
          <span>06</span>
          <span>The Network</span>
        </div>
        <div className="partners__head">
          <h2>A collective shaped<br />by <em>craft.</em></h2>
          <p>Independent companies. Distinctive expertise. A shared standard for the work and the relationship behind it.</p>
        </div>
        <div className="partner-grid">
          {partners.map(({ name, specialty, url, logo, inverse }, index) => (
            <a
              className="partner-card"
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${name} website`}
              key={name}
            >
              <div className="partner-card__top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div className={`partner-logo${inverse ? " partner-logo--inverse" : ""}`}>
                <img src={logo} alt={`${name} logo`} />
              </div>
              <h3>{name}</h3>
              <p>{specialty}</p>
            </a>
          ))}
          <article className="partner-grid__more">
            <span>+</span>
            <p>More partners coming.</p>
          </article>
        </div>
        <div className="credibility-strip" aria-label="Selected production experience">
          <p>Worked with artists, productions and studios behind projects for</p>
          <div>
            <span>Disney</span>
            <span>Sony</span>
            <span>Netflix</span>
            <span>Nintendo</span>
            <span>WB</span>
          </div>
        </div>
      </section>

      <section className="paths section section--ink" id="build">
        <div className="section-label section-label--light">
          <span>07</span>
          <span>Build with us</span>
        </div>
        <div className="path-grid">
          <article className="path-card path-card--clients">
            <span>For clients</span>
            <h2>Find the right creative partner.</h2>
            <p>Commercial, cinematic, feature film or immersive experience. One conversation gives you access to the right team.</p>
            <a href="#contact">Start a project <Arrow /></a>
          </article>
          <article className="path-card path-card--studios">
            <span>For studios</span>
            <h2>Grow beyond referrals.</h2>
            <p>Business development, international partnerships, funding and strategic representation built around your strengths.</p>
            <a href="#contact">Join the conversation <Arrow /></a>
          </article>
        </div>
        <div className="paths__booking">
          <p>Prefer to talk it through directly?</p>
          <button className="button button--orange" type="button" onClick={openCalendly}>
            Book a discovery call <Arrow />
          </button>
        </div>
      </section>

      <section className="founder section section--paper" id="about">
        <div className="section-label">
          <span>08</span>
          <span>Founder</span>
        </div>
        <div className="founder__visual">
          <img src="/brand/kongllective-founder-alex-v1.png" alt="Alex Kong, founder and producer" />
        </div>
        <div className="founder__copy">
          <p className="kicker">Alex Kong · Founder</p>
          <h2>The missing piece<br />wasn&apos;t <em>talent.</em></h2>
          <p>
            After nearly two decades across animation, VFX, recruiting and production, I kept seeing the same disconnect: great studios struggled to find the right opportunities, while great clients struggled to find the right creative partners.
          </p>
          <p className="founder__closing">Kongllective exists to bridge that gap.</p>
        </div>
      </section>

      <section className="contact section section--ink" id="contact">
        <div className="contact__watermark" aria-hidden="true">
          <img src="/brand/kongllective-hero-gorilla-v1.png" alt="" />
        </div>
        <div className="contact__grid">
          <div className="contact__copy">
            <p className="eyebrow">A conversation is a good place to start.</p>
            <h2>Let&apos;s build something<br /><span>extraordinary.</span></h2>
            <p>Looking for a creative partner, exploring international collaboration or ready to grow your studio? We&apos;d love to hear your story.</p>
          </div>
          <form className="collective-form" onSubmit={sendLead}>
            <input className="honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <label>Your name<input name="name" type="text" placeholder="Name" required /></label>
            <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
            <label>Company <small>(optional)</small><input name="company" type="text" placeholder="Company or studio" /></label>
            <label>Tell us a little<textarea name="message" rows={4} placeholder="What are you building or looking to make happen?" required /></label>
            <button className="button button--orange" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Sending…" : <>Start a conversation <Arrow /></>}</button>
            <p className={`collective-form__status ${formStatus}`} aria-live="polite">
              {formStatus === "success" && "Received. Alex will be in touch shortly."}
              {formStatus === "error" && <>Couldn&apos;t send it. Please try again or email <a href="mailto:alex@kongllective.com">alex@kongllective.com</a>.</>}
            </p>
          </form>
        </div>
      </section>

      <footer>
        <a href="#top"><Signature compact /></a>
        <p>Strategic Partnerships · Executive Production · Business Development</p>
        <div>
          <a href="mailto:hello@kongllective.com">Email</a>
          <span>LinkedIn</span>
          <span>Vancouver · Mexico City</span>
        </div>
        <span className="copyright">© {new Date().getFullYear()} Kongllective</span>
      </footer>
    </main>
  );
}
