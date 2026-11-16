import { useRef, type ReactNode } from "react";
import { Button, LogoMark } from "./brand";
import { EMAIL, OFFICE, PHONES, downloadVCard } from "./contactData";

type Item = { t: string; d: string };

const MODALS: { key: string; label: string; intro: string; items?: Item[]; contact?: boolean }[] = [
  {
    key: "standards",
    label: "Architecture Standards",
    intro:
      "The engineering practices applied to every SYNAPSTREAM system, regardless of size or sector.",
    items: [
      {
        t: "Documented architecture decisions",
        d: "Significant design choices are recorded with their context and trade-offs, and handed over with the system.",
      },
      {
        t: "Reviewed, version-controlled code",
        d: "Every change goes through version control and peer code review before it is merged.",
      },
      {
        t: "Automated testing",
        d: "Unit, integration, and end-to-end tests run automatically on each change in continuous integration.",
      },
      {
        t: "Separated environments",
        d: "Development, staging, and production are isolated; releases are verified in staging first.",
      },
      {
        t: "Infrastructure as code",
        d: "Servers, networks, and configuration are defined in code so environments can be rebuilt reproducibly.",
      },
      {
        t: "Open interfaces",
        d: "APIs are described with OpenAPI and authentication follows OAuth 2.0 / OpenID Connect.",
      },
    ],
  },
  {
    key: "governance",
    label: "Data Governance Policy",
    intro: "How we treat the data inside the systems we build and maintain for you.",
    items: [
      {
        t: "Your data remains yours",
        d: "Clients retain full ownership of all data, schemas, and derived records.",
      },
      {
        t: "Residency you choose",
        d: "Data is stored only in the environment you select: on-premise, national data center, or private cloud.",
      },
      {
        t: "Least-privilege access",
        d: "Engineering access is role-based, limited to what a task requires, and revoked when no longer needed.",
      },
      {
        t: "Traceable activity",
        d: "Administrative and data-access actions are written to tamper-evident activity logs.",
      },
      {
        t: "Encryption",
        d: "Data is encrypted in transit and at rest using current, widely reviewed standards.",
      },
      {
        t: "Retention & deletion",
        d: "Retention periods and deletion procedures follow your institutional policies.",
      },
    ],
  },
  {
    key: "contact",
    label: "Direct Contact",
    intro: "Reach our engineering leadership directly.",
    contact: true,
  },
];

function Modal({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-6">
        <div>
          <LogoMark className="w-9" />
          <h2 id={id} className="mt-6 text-[26px] font-semibold leading-tight tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{intro}</p>
        </div>
      </div>
      {children}
    </>
  );
}

export function Footer() {
  const refs = useRef<Record<string, HTMLDialogElement | null>>({});

  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-10 md:px-12 xl:px-20">
        <p className="text-sm text-silver">
          © 2026 SYNAPSTREAM. All rights reserved. Chittagong, Bangladesh.
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {MODALS.map((m) => (
            <li key={m.key}>
              <button
                type="button"
                onClick={() => refs.current[m.key]?.showModal()}
                className="link-draw text-sm text-silver transition-colors hover:text-white"
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {MODALS.map((m) => (
        <dialog
          key={m.key}
          ref={(el) => {
            refs.current[m.key] = el;
          }}
          aria-labelledby={`modal-${m.key}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) e.currentTarget.close();
          }}
          className="tile-lg m-auto max-h-[86vh] w-[min(720px,calc(100vw-32px))] overflow-y-auto bg-white p-0 text-black"
        >
          <div className="p-8 md:p-12">
            <Modal id={`modal-${m.key}`} title={m.label} intro={m.intro}>
              {m.items && (
                <ul className="divide-y divide-neutral-200">
                  {m.items.map((it) => (
                    <li key={it.t} className="py-5">
                      <h3 className="text-base font-semibold">{it.t}</h3>
                      <p className="mt-1.5 text-[15px] leading-[1.65] text-neutral-600">{it.d}</p>
                    </li>
                  ))}
                </ul>
              )}
              {m.contact && (
                <dl className="space-y-5 py-6 font-mono text-[15px]">
                  <div>
                    <dt className="font-sans text-sm font-medium text-neutral-500">Phone</dt>
                    <dd className="mt-1">
                      {PHONES.map((p, i) => (
                        <span key={p}>
                          {i > 0 && ", "}
                          <a href={`tel:${p}`} className="link-draw">
                            {p}
                          </a>
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-medium text-neutral-500">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${EMAIL}`} className="link-draw break-all">
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-medium text-neutral-500">Office</dt>
                    <dd className="mt-1">{OFFICE}</dd>
                  </div>
                </dl>
              )}
              <form
                method="dialog"
                className="mt-4 flex flex-wrap gap-3 border-t border-neutral-200 pt-6"
              >
                <Button type="submit" variant="black" autoFocus>
                  Close
                </Button>
                {m.contact && (
                  <Button
                    type="button"
                    variant="outline"
                    className="!border-neutral-300 !text-black hover:!bg-neutral-100"
                    onClick={downloadVCard}
                  >
                    Download vCard
                  </Button>
                )}
              </form>
            </Modal>
          </div>
        </dialog>
      ))}
    </footer>
  );
}
