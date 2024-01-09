import { SVGProps } from "react";

export function SmileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M464 256a208 208 0 1 0-416 0a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0a256 256 0 1 1-512 0zm177.6 62.1c15.2 16.4 41.2 33.9 78.4 33.9s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0a32 32 0 1 1-64 0zm192-32a32 32 0 1 1 0 64a32 32 0 1 1 0-64z"
      ></path>
    </svg>
  );
}