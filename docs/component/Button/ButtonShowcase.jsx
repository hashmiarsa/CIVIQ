import { useState } from "react";
import Button, {
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  TintedButton,
  DestructiveButton,
  IconButton,
} from "./Button";

// ─── Simple SVG icons ──────────────────────────
const PlusIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M7.5 2v11M2 7.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M2 4h11M5 4V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V4M6 7v4M9 7v4M3 4l.8 8.5a.5.5 0 0 0 .5.5h6.4a.5.5 0 0 0 .5-.5L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MapIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M7.5 1a4 4 0 0 1 4 4c0 3-4 9-4 9S3.5 8 3.5 5a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="7.5" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const BellIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M7.5 1.5A4 4 0 0 0 3.5 5.5v3l-1 1.5h10l-1-1.5v-3a4 4 0 0 0-4-4ZM6 10.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ArrowRightIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <path d="M3 7.5h9M8.5 4l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Section wrapper ───────────────────────────
const Section = ({ title, children }) => (
  <div className="mb-10">
    <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A] mb-4 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
      {title}
    </p>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div className="flex items-center gap-3 flex-wrap mb-4">
    <span className="text-[11px] text-[#A1A1AA] w-20 shrink-0">{label}</span>
    <div className="flex items-center gap-2 flex-wrap">{children}</div>
  </div>
);

// ─── Showcase ─────────────────────────────────
export default function ButtonShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  const triggerLoading = (key) => {
    setLoadingStates((s) => ({ ...s, [key]: true }));
    setTimeout(() => setLoadingStates((s) => ({ ...s, [key]: false })), 2200);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
                Button
              </h1>
              <p className="text-sm text-[#71717A] mt-1">
                CIVIQ component · accent #5E6AD2
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? "☀ Light" : "⏾ Dark"}
            </button>
          </div>

          {/* Variants */}
          <Section title="Variants">
            <Row label="primary">
              <PrimaryButton>Approve Project</PrimaryButton>
            </Row>
            <Row label="secondary">
              <SecondaryButton>View Details</SecondaryButton>
            </Row>
            <Row label="ghost">
              <GhostButton>Cancel</GhostButton>
            </Row>
            <Row label="tinted">
              <TintedButton iconLeft={<MapIcon />}>View on Map</TintedButton>
            </Row>
            <Row label="destructive">
              <DestructiveButton iconLeft={<TrashIcon />}>Reject Project</DestructiveButton>
            </Row>
          </Section>

          {/* Sizes */}
          <Section title="Sizes — all variants">
            <Row label="large">
              <PrimaryButton size="lg">Approve Project</PrimaryButton>
              <SecondaryButton size="lg">Cancel</SecondaryButton>
              <GhostButton size="lg">View</GhostButton>
            </Row>
            <Row label="medium">
              <PrimaryButton size="md">Approve Project</PrimaryButton>
              <SecondaryButton size="md">Cancel</SecondaryButton>
              <GhostButton size="md">View</GhostButton>
            </Row>
            <Row label="small">
              <PrimaryButton size="sm">Approve</PrimaryButton>
              <SecondaryButton size="sm">Cancel</SecondaryButton>
              <GhostButton size="sm">View</GhostButton>
            </Row>
          </Section>

          {/* Icons */}
          <Section title="With icons">
            <Row label="icon left">
              <PrimaryButton iconLeft={<PlusIcon />}>Submit Project</PrimaryButton>
              <SecondaryButton iconLeft={<MapIcon />}>Open Map</SecondaryButton>
              <TintedButton iconLeft={<CheckIcon />}>Assign</TintedButton>
            </Row>
            <Row label="icon right">
              <PrimaryButton iconRight={<ArrowRightIcon />}>Continue</PrimaryButton>
              <SecondaryButton iconRight={<ArrowRightIcon />}>Next Step</SecondaryButton>
            </Row>
            <Row label="both">
              <PrimaryButton iconLeft={<CheckIcon />} iconRight={<ArrowRightIcon />}>
                Approve and Continue
              </PrimaryButton>
            </Row>
          </Section>

          {/* Icon-only */}
          <Section title="Icon only">
            <Row label="sizes">
              <IconButton size="lg" variant="secondary" icon={<BellIcon />} label="Notifications" />
              <IconButton size="md" variant="secondary" icon={<BellIcon />} label="Notifications" />
              <IconButton size="sm" variant="secondary" icon={<BellIcon />} label="Notifications" />
            </Row>
            <Row label="variants">
              <IconButton variant="primary"     icon={<PlusIcon />}   label="Add" />
              <IconButton variant="secondary"   icon={<SearchIcon />} label="Search" />
              <IconButton variant="ghost"       icon={<MapIcon />}    label="Map" />
              <IconButton variant="tinted"      icon={<CheckIcon />}  label="Confirm" />
              <IconButton variant="destructive" icon={<TrashIcon />}  label="Delete" />
            </Row>
          </Section>

          {/* Loading */}
          <Section title="Loading states — click to trigger">
            <Row label="click me">
              <PrimaryButton
                loading={loadingStates["a"]}
                onClick={() => triggerLoading("a")}
              >
                {loadingStates["a"] ? "Approving…" : "Approve Project"}
              </PrimaryButton>
              <SecondaryButton
                loading={loadingStates["b"]}
                onClick={() => triggerLoading("b")}
              >
                {loadingStates["b"] ? "Saving…" : "Save Changes"}
              </SecondaryButton>
              <DestructiveButton
                loading={loadingStates["c"]}
                onClick={() => triggerLoading("c")}
              >
                {loadingStates["c"] ? "Deleting…" : "Delete"}
              </DestructiveButton>
            </Row>
          </Section>

          {/* Disabled */}
          <Section title="Disabled states">
            <Row label="disabled">
              <PrimaryButton disabled>Approve Project</PrimaryButton>
              <SecondaryButton disabled>Save</SecondaryButton>
              <GhostButton disabled>Cancel</GhostButton>
              <TintedButton disabled>Assign</TintedButton>
              <DestructiveButton disabled>Delete</DestructiveButton>
            </Row>
          </Section>

          {/* Shortcut */}
          <Section title="With keyboard shortcuts">
            <Row label="shortcut">
              <PrimaryButton shortcut="⌘A">Approve</PrimaryButton>
              <SecondaryButton shortcut="⌘S">Save Draft</SecondaryButton>
              <DestructiveButton shortcut="⌘⌫">Reject</DestructiveButton>
            </Row>
          </Section>

          {/* Full width */}
          <Section title="Full width">
            <div className="flex flex-col gap-2 max-w-sm">
              <PrimaryButton fullWidth iconLeft={<CheckIcon />}>
                Approve Project
              </PrimaryButton>
              <SecondaryButton fullWidth>
                Save as Draft
              </SecondaryButton>
              <DestructiveButton fullWidth iconLeft={<TrashIcon />}>
                Reject and Notify Officer
              </DestructiveButton>
            </div>
          </Section>

          {/* Real CIVIQ usage */}
          <Section title="Real CIVIQ usage examples">
            <Row label="admin">
              <PrimaryButton iconLeft={<CheckIcon />}>Approve</PrimaryButton>
              <TintedButton iconLeft={<MapIcon />}>View on Map</TintedButton>
              <DestructiveButton iconLeft={<TrashIcon />}>Reject</DestructiveButton>
            </Row>
            <Row label="officer">
              <PrimaryButton iconLeft={<PlusIcon />}>Submit Project</PrimaryButton>
              <SecondaryButton>Save Draft</SecondaryButton>
              <GhostButton>Cancel</GhostButton>
            </Row>
            <Row label="navbar">
              <IconButton variant="ghost" icon={<BellIcon />} label="Notifications" />
              <IconButton variant="ghost" icon={<SearchIcon />} label="Search" />
            </Row>
          </Section>

        </div>
      </div>
    </div>
  );
}
