import type { SVGProps } from "react";

export function UnityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l7 4.5v9L12 20l-7-4.5v-9L12 2z" />
      <path d="M12 11l7-4.5" />
      <path d="M5 6.5l7 4.5" />
      <path d="M12 20v-9" />
      <path d="M19 15.5l-7-4.5" />
      <path d="M5 15.5l7-4.5" />
    </svg>
  );
}
