import type { ReactNode } from "react";

type SilhouetteProps = {
  className?: string;
};

export function ViennaSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="140" width="400" height="60" opacity="0.4" />
      <rect x="40" y="110" width="50" height="90" />
      <rect x="100" y="95" width="40" height="105" />
      <rect x="150" y="80" width="100" height="120" />
      <rect x="170" y="55" width="60" height="25" rx="4" />
      <ellipse cx="200" cy="50" rx="28" ry="18" />
      <rect x="260" y="95" width="40" height="105" />
      <rect x="310" y="110" width="50" height="90" />
    </svg>
  );
}

export function BerlinSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="150" width="400" height="50" opacity="0.4" />
      <rect x="60" y="100" width="280" height="100" />
      <rect x="80" y="70" width="20" height="130" />
      <rect x="120" y="70" width="20" height="130" />
      <rect x="160" y="70" width="20" height="130" />
      <rect x="220" y="70" width="20" height="130" />
      <rect x="260" y="70" width="20" height="130" />
      <rect x="300" y="70" width="20" height="130" />
      <rect x="130" y="40" width="140" height="30" rx="2" />
      <polygon points="200,15 170,40 230,40" />
    </svg>
  );
}

export function ZurichSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <polygon points="0,120 80,60 160,90 240,40 320,70 400,50 400,200 0,200" opacity="0.35" />
      <rect x="0" y="145" width="400" height="55" opacity="0.4" />
      <rect x="170" y="85" width="60" height="115" />
      <polygon points="200,20 175,85 225,85" />
      <rect x="80" y="110" width="35" height="90" />
      <rect x="285" y="105" width="40" height="95" />
      <rect x="330" y="115" width="30" height="85" />
    </svg>
  );
}

export function ParisSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="150" width="400" height="50" opacity="0.4" />
      <polygon points="200,15 185,60 215,60" />
      <polygon points="200,60 170,150 230,150" />
      <rect x="193" y="60" width="14" height="90" />
      <rect x="50" y="110" width="30" height="90" />
      <rect x="90" y="100" width="25" height="100" />
      <rect x="320" y="105" width="35" height="95" />
      <rect x="280" y="115" width="28" height="85" />
    </svg>
  );
}

export function MonacoSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="155" width="400" height="45" opacity="0.5" />
      <path d="M0 155 Q200 130 400 155 L400 200 L0 200 Z" opacity="0.3" />
      <ellipse cx="120" cy="150" rx="55" ry="12" opacity="0.6" />
      <ellipse cx="280" cy="148" rx="70" ry="14" opacity="0.6" />
      <rect x="60" y="95" width="280" height="60" rx="4" />
      <rect x="100" y="70" width="20" height="85" />
      <rect x="140" y="60" width="25" height="95" />
      <rect x="180" y="55" width="40" height="100" />
      <rect x="235" y="65" width="22" height="90" />
      <rect x="275" y="75" width="30" height="80" />
    </svg>
  );
}

export function LuxembourgSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <polygon points="0,130 100,80 200,60 300,85 400,110 400,200 0,200" opacity="0.35" />
      <rect x="0" y="150" width="400" height="50" opacity="0.4" />
      <rect x="130" y="90" width="140" height="110" />
      <rect x="150" y="70" width="15" height="130" />
      <rect x="190" y="55" width="20" height="145" />
      <rect x="235" y="70" width="15" height="130" />
      <polygon points="200,35 175,70 225,70" />
    </svg>
  );
}

export function AmsterdamSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="155" width="400" height="45" opacity="0.5" />
      <path d="M0 160 Q100 145 200 155 T400 160" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <rect x="30" y="95" width="45" height="105" />
      <polygon points="52,95 52,70 75,55 98,70 98,95" />
      <rect x="110" y="100" width="40" height="100" />
      <polygon points="130,100 130,75 150,60 170,75 170,100" />
      <rect x="185" y="90" width="50" height="110" />
      <polygon points="210,90 210,65 235,48 260,65 260,90" />
      <rect x="255" y="105" width="42" height="95" />
      <polygon points="276,105 276,82 295,68 314,82 314,105" />
      <rect x="320" y="100" width="50" height="100" />
      <polygon points="345,100 345,78 365,62 385,78 385,100" />
    </svg>
  );
}

const SILHOUETTES: Record<string, (props: SilhouetteProps) => ReactNode> = {
  austria: ViennaSilhouette,
  germany: BerlinSilhouette,
  switzerland: ZurichSilhouette,
  france: ParisSilhouette,
  monaco: MonacoSilhouette,
  luxembourg: LuxembourgSilhouette,
  netherlands: AmsterdamSilhouette,
};

export function CitySilhouette({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Component = SILHOUETTES[slug] ?? ViennaSilhouette;
  return <Component className={className} />;
}
