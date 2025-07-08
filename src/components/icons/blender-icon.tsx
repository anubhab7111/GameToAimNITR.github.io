import type { SVGProps } from "react";

export function BlenderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a10 10 0 00-4.47 1.29l1.47 8.42-1.47 1.47A10 10 0 0012 22a10 10 0 009.7-7.53l-6.23-2.67 2.67-6.23A10 10 0 0012 2z" />
    </svg>
  );
}
