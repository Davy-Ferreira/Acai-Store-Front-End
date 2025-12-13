import React from "react";

export function MailIcon({ className = "w-5 h-5 text-gray-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 5h18v14H3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function LockIcon({ className = "w-5 h-5 text-gray-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function EyeOpenIcon({ className = "w-5 h-5 text-gray-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function EyeClosedIcon({ className = "w-5 h-5 text-gray-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
