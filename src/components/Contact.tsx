import {
    useState,
    type FormEvent,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";
import { Arrow, Button, ButtonLink, LogoMark } from "./brand";
import { EMAIL, OFFICE, PHONES, downloadVCard } from "./contactData";
import { HalftoneSphere } from "./HalftoneSphere";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DrawLine, EASE_OUT, Reveal, useIsMobile } from "../motion";
import { QrCode } from "./QrBlock";

type Fields = {
    name: string;
    title: string;
    org: string;
    email: string;
    phone: string;
    overview: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
const EMPTY: Fields = {
    name: "",
    title: "",
    org: "",
    email: "",
    phone: "",
    overview: "",
};

function validate(f: Fields): Errors {
    const e: Errors = {};
    if (f.name.trim().length < 2) e.name = "Enter your full name";
    if (f.title.trim().length < 2) e.title = "Enter your title";
    if (f.org.trim().length < 2) e.org = "Enter your organization";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
        e.email = "Enter a valid work email";
    if (f.phone.replace(/[^\d]/g, "").length < 7)
        e.phone = "Enter phone number";
    if (f.overview.trim().length < 20)
        e.overview = "Add a short overview (20+ characters)";
    return e;
}

const fieldCls = (error?: string) =>
    `mt-2 w-full tile-xs border bg-white px-4 text-[15px] text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black ${
        error ? "border-black" : "border-neutral-300 hover:border-neutral-400"
    }`;

function FieldShell({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={id} className="text-sm font-medium text-black">
                    {label}
                </label>
                {error && (
                    <span
                        id={`${id}-err`}
                        className="text-[13px] text-neutral-600"
                    >
                        {error}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

function Input({
    id,
    label,
    error,
    ...rest
}: {
    id: keyof Fields;
    label: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <FieldShell id={id} label={label} error={error}>
            <input
                id={id}
                name={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                className={`${fieldCls(error)} h-12`}
                {...rest}
            />
        </FieldShell>
    );
}

function InquiryForm() {
    const [f, setF] = useState<Fields>(EMPTY);
    const [errors, setErrors] = useState<Errors>({});
    const [done, setDone] = useState(false);

    const set = (k: keyof Fields) => (v: string) => {
        setF((p) => ({ ...p, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate(f);
        setErrors(errs);
        const first = Object.keys(errs)[0];
        if (first) {
            document.getElementById(first)?.focus();
            return;
        }
        setDone(true);
    };

    if (done) {
        const subject = encodeURIComponent(`Project inquiry — ${f.org}`);
        const body = encodeURIComponent(
            `Name: ${f.name}\nTitle: ${f.title}\nOrganization: ${f.org}\nEmail: ${f.email}\nPhone: ${f.phone}\n\nProject overview:\n${f.overview}`,
        );
        return (
            <m.div
                role="status"
                className="tile-lg flex h-full flex-col bg-black p-10 text-white md:p-12"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
            >
                <span
                    className="grid size-11 place-items-center rounded-full bg-white text-black"
                    aria-hidden
                >
                    <svg viewBox="0 0 16 16" className="size-4" fill="none">
                        <path
                            d="M3 8.5l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            pathLength={1}
                            style={{
                                strokeDasharray: 1,
                                animation:
                                    "check-draw 0.6s cubic-bezier(.16,1,.3,1) 0.35s both",
                            }}
                        />
                    </svg>
                </span>
                <h3 className="mt-8 text-[28px] font-semibold leading-[1.2] tracking-[-0.02em]">
                    Thank you, {f.name.trim().split(" ")[0]}. Your inquiry is
                    prepared.
                </h3>
                <p className="mt-4 max-w-[52ch] text-base leading-[1.65] text-silver">
                    Send it to our engineering leadership from your email
                    client—every detail below is already filled in. We reply to
                    inquiries directly, usually within two business days.
                </p>
                <dl className="mt-8 grid gap-5 border-y border-line py-6 text-sm">
                    <div>
                        <dt className="text-step-2">Organization</dt>
                        <dd className="mt-1 text-mist">{f.org}</dd>
                    </div>
                </dl>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
                    <ButtonLink
                        href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}
                    >
                        Send inquiry by email <Arrow />
                    </ButtonLink>
                    <Button variant="outline" onClick={downloadVCard}>
                        Download vCard
                    </Button>
                    <button
                        type="button"
                        onClick={() => {
                            setDone(false);
                            setF(EMPTY);
                        }}
                        className="ml-auto text-sm text-silver underline-offset-4 hover:text-white hover:underline"
                    >
                        Start a new inquiry
                    </button>
                </div>
            </m.div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-7"
            aria-label="Executive project inquiry"
        >
            <div className="grid gap-7 sm:grid-cols-2">
                <Input
                    id="name"
                    label="Full name"
                    autoComplete="name"
                    value={f.name}
                    onChange={(e) => set("name")(e.target.value)}
                    error={errors.name}
                />
                <Input
                    id="title"
                    label="Title"
                    placeholder="e.g. Director of IT"
                    autoComplete="organization-title"
                    value={f.title}
                    onChange={(e) => set("title")(e.target.value)}
                    error={errors.title}
                />
            </div>
            <Input
                id="org"
                label="Organization / Ministry / Conglomerate name"
                autoComplete="organization"
                value={f.org}
                onChange={(e) => set("org")(e.target.value)}
                error={errors.org}
            />
            <div className="grid gap-7 sm:grid-cols-2">
                <Input
                    id="email"
                    label="Work email"
                    type="email"
                    autoComplete="email"
                    value={f.email}
                    onChange={(e) => set("email")(e.target.value)}
                    error={errors.email}
                />
                <Input
                    id="phone"
                    label="Phone number"
                    type="tel"
                    autoComplete="tel"
                    value={f.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    error={errors.phone}
                />
            </div>

            <FieldShell
                id="overview"
                label="Project overview / requirements"
                error={errors.overview}
            >
                <textarea
                    id="overview"
                    name="overview"
                    rows={5}
                    aria-invalid={!!errors.overview}
                    aria-describedby={
                        errors.overview ? "overview-err" : undefined
                    }
                    placeholder="Current systems, the problem you need solved, timelines, and any deployment constraints."
                    value={f.overview}
                    onChange={(e) => set("overview")(e.target.value)}
                    className={`${fieldCls(errors.overview)} resize-y py-3.5 leading-relaxed`}
                />
            </FieldShell>

            <Button
                type="submit"
                variant="black"
                size="lg"
                className="w-full justify-between sm:w-auto sm:min-w-[280px]"
            >
                Send Project Inquiry <Arrow />
            </Button>
        </form>
    );
}

/** QR code revealed once by a single scan-line sweep. */
function QrReveal() {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <div className="relative w-[120px] shrink-0 overflow-hidden">
                <QrCode className="w-full" />
            </div>
        );
    }
    return (
        <div className="relative w-[120px] shrink-0 overflow-hidden">
            <QrCode className="w-full" />
            <m.span
                aria-hidden
                className="absolute inset-0 origin-bottom bg-white"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                    duration: 1.1,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.3,
                }}
            />
            <m.span
                aria-hidden
                className="absolute inset-x-0 h-px bg-black"
                initial={{ top: "0%", opacity: 1 }}
                whileInView={{ top: "100%", opacity: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                    top: {
                        duration: 1.1,
                        ease: [0.65, 0, 0.35, 1],
                        delay: 0.3,
                    },
                    opacity: { duration: 0.2, delay: 1.35 },
                }}
            />
        </div>
    );
}

export function Contact() {
    const ref = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    const isMobile = useIsMobile();
    // The arc rises into place as the section approaches, like the card emerging from the page
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start 20%"],
    });
    const arcY = useTransform(scrollYProgress, [0, 1], [160, 0]);

    return (
        <section
            ref={ref}
            id="contact"
            aria-label="Contact"
            className="relative overflow-hidden bg-black pt-0 lg:pt-0"
        >
            <DrawLine className="absolute inset-x-0 top-0 h-px bg-hairline" />
            {/* Rising halftone arc, mirroring the physical business card */}
            <m.div
                className="pointer-events-none relative mx-auto -mb-32 h-[420px] max-w-[1280px]"
                style={reduced || isMobile ? undefined : { y: arcY }}
                aria-hidden
            >
                <HalftoneSphere
                    radius={0.44}
                    centerY={1.45}
                    rings={88}
                    maxDot={6}
                    tilt={0.9}
                    speed={0.015}
                    fadeTop={0.4}
                    intro={1.8}
                />
            </m.div>

            <div className="relative mx-auto max-w-[1440px] px-4 md:px-8 xl:px-20">
                <Reveal
                    y={64}
                    amount={0.08}
                    className="tile-lg bg-white p-6 sm:p-8 text-black md:p-16"
                >
                    <div className="grid grid-cols-12 gap-x-8 gap-y-16">
                        <div className="col-span-12 flex flex-col lg:col-span-5 lg:pr-8">
                            <LogoMark
                                className="w-[72px]"
                                title="SYNAPSTREAM"
                            />
                            <p className="mt-6 sm:mt-8 max-w-[44ch] text-[15px] sm:text-lg leading-[1.65] text-neutral-600">
                                Speak directly with our engineering leadership
                                about your infrastructure or software
                                requirements.
                            </p>

                            <dl className="mt-12 space-y-6 border-t border-neutral-200 pt-10">
                                <div>
                                    <dt className="text-sm font-medium text-neutral-500">
                                        Phone
                                    </dt>
                                    <dd className="mt-1.5 font-mono text-[15px]">
                                        {PHONES.map((p, i) => (
                                            <span key={p}>
                                                {i > 0 && ", "}
                                                <a
                                                    href={`tel:${p}`}
                                                    className="link-draw"
                                                >
                                                    {p}
                                                </a>
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-neutral-500">
                                        Email
                                    </dt>
                                    <dd className="mt-1.5 font-mono text-[15px]">
                                        <a
                                            href={`mailto:${EMAIL}`}
                                            className="link-draw break-all"
                                        >
                                            {EMAIL}
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-neutral-500">
                                        Office
                                    </dt>
                                    <dd className="mt-1.5 font-mono text-[15px]">
                                        {OFFICE}
                                    </dd>
                                </div>
                            </dl>

                            <div className="tile mt-12 flex items-center gap-6 border border-neutral-200 p-5">
                                <QrReveal />
                                <div>
                                    <p className="text-[15px] font-medium leading-snug">
                                        Scan to save corporate contact card
                                        (vCard)
                                    </p>
                                    <button
                                        type="button"
                                        onClick={downloadVCard}
                                        className="mt-3 text-sm text-neutral-600 underline underline-offset-4 hover:text-black"
                                    >
                                        Or download synapstream.vcf
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-7">
                            <div className="tile-lg h-full border border-neutral-200 p-8 md:p-12">
                                <h3 className="text-[22px] font-semibold tracking-[-0.015em]">
                                    Executive project inquiry
                                </h3>
                                <p className="mb-10 mt-2 text-[15px] text-neutral-600">
                                    All fields are required.
                                </p>
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
