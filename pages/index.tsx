"use client";

import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  SVGAttributes,
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  memo,
  JSXElementConstructor,
  useRef,
  useEffect,
  ReactNode,
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  PointerEventHandler,
  FormEventHandler,
  SVGProps,
  UIEventHandler,
} from "react";
import {
  ActivityIcon,
  ChartPieIcon,
  ThermometerIcon,
  DropletIcon,
  StarIcon,
  X,
  ChevronDownIcon,
  CalendarDays,
  DeleteIcon,
  PencilIcon,
  MenuIcon,
  UsersRoundIcon,
  BarChart2Icon,
  CalendarDaysIcon,
  HomeIcon,
  RepeatIcon,
  SettingsIcon,
  BellIcon,
  CalendarIcon,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DateTime, Duration, DurationUnit } from "luxon";
import { AnimatedProps, animated, useSpring, to } from "@react-spring/web";
import * as RadixDialog from "@radix-ui/react-dialog";
import {
  DayPicker,
  DayPickerDefaultProps,
  DayPickerSingleProps,
  SelectSingleEventHandler,
} from "react-day-picker";
import { format } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import * as Redux from "@reduxjs/toolkit";
import * as ReactRedux from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// --- AppDialog.tsx ---
function AppDialog() {}

function AppDialogButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(...style.input.classNames, className)}
      {...props}
    />
  );
}

function AppDialogBody({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={classNames("p-4", className)} {...props} />;
}
AppDialog.Button = AppDialogButton;
AppDialog.Body = AppDialogBody;
// --- assets/avatars/AvatarAidan.tsx ---
function AvatarAidan({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      className={classNames(className)}
      {...props}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#d78774"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          d="M23.63 28a1 1 0 0 0 .37 1.37 4.5 4.5 0 0 0 2.25.63 4.5 4.5 0 0 0 2.25-.63 1.003 1.003 0 0 0-1-1.74c-.43.25-.85.37-1.25.37s-.82-.12-1.25-.37a1 1 0 0 0-1.37.37m12 0a1 1 0 0 0 .37 1.37 4.5 4.5 0 0 0 2.25.63 4.5 4.5 0 0 0 2.25-.63 1.003 1.003 0 0 0-1-1.74 2.5 2.5 0 0 1-1.25.37c-.4 0-.82-.12-1.25-.37a1 1 0 0 0-1.37.37"
        ></path>
        <g transform="translate(2 2)">
          <path
            fill="#6c4545"
            d="m44 26-.02-.02-.3.02a2 2 0 0 1-1.8-2.88 2 2 0 0 1-2.73-2.1 2 2 0 0 1-3.3.56h-.02a1.99 1.99 0 0 1-2 2.05 2 2 0 0 1-1.75-1.04 2 2 0 0 1-3.92.33 2 2 0 0 1-3.87-.6c-.04 0-.09 0-.13-.02a2 2 0 0 1-3.67-.98c-.3-.1-.57-.2-.85-.32.02.09.02.17.02.26a2 2 0 0 1-2.74 1.86A2 2 0 0 1 16 25.8v.23a4.5 4.5 0 0 0 .58 8.97A14.04 14.04 0 0 0 25 44.08v3.06c-.25-.2-.47-.42-.65-.68-.49-.13-.96-.29-1.43-.46a3.46 3.46 0 0 1-4.54-2.3 21 21 0 0 1-.98-.7 3.46 3.46 0 0 1-3.83-3.8c-.17-.21-.34-.43-.5-.66a3.46 3.46 0 0 1-2.66-5.07l-.14-.39a3.47 3.47 0 0 1-1.08-5.96v-.01a3.47 3.47 0 0 1 .47-6.2 3.47 3.47 0 0 1 2.28-5.79 3.47 3.47 0 0 1 3.87-4.86 3.47 3.47 0 0 1 5.15-3.5 3.47 3.47 0 0 1 5.94-1.83 3.47 3.47 0 0 1 6.22 0 3.47 3.47 0 0 1 5.94 1.83 3.47 3.47 0 0 1 5.14 3.5 3.47 3.47 0 0 1 3.87 4.86 3.47 3.47 0 0 1 2.28 5.8 3.47 3.47 0 0 1 .47 6.19 3.47 3.47 0 0 1-1.08 5.97l-.14.4a3.47 3.47 0 0 1-2.66 5.06c-.16.23-.33.45-.5.66A3.46 3.46 0 0 1 42.6 43l-.98.7a3.46 3.46 0 0 1-4.54 2.3c-.47.17-.94.33-1.43.46-.18.26-.4.49-.65.68v-3.06A14.04 14.04 0 0 0 43.42 35h.08a4.5 4.5 0 0 0 .5-8.97z"
          ></path>
          <mask
            id="hairCurly-a"
            width="46"
            height="45"
            x="7"
            y="3"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "luminance" }}
          >
            <path
              fill="#fff"
              d="m44 26-.02-.02-.3.02a2 2 0 0 1-1.8-2.88 2 2 0 0 1-2.73-2.1 2 2 0 0 1-3.3.56h-.02a1.99 1.99 0 0 1-2 2.05 2 2 0 0 1-1.75-1.04 2 2 0 0 1-3.92.33 2 2 0 0 1-3.87-.6c-.04 0-.09 0-.13-.02a2 2 0 0 1-3.67-.98c-.3-.1-.57-.2-.85-.32.02.09.02.17.02.26a2 2 0 0 1-2.74 1.86A2 2 0 0 1 16 25.8v.23a4.5 4.5 0 0 0 .58 8.97A14.04 14.04 0 0 0 25 44.08v3.06c-.25-.2-.47-.42-.65-.68-.49-.13-.96-.29-1.43-.46a3.46 3.46 0 0 1-4.54-2.3 21 21 0 0 1-.98-.7 3.46 3.46 0 0 1-3.83-3.8c-.17-.21-.34-.43-.5-.66a3.46 3.46 0 0 1-2.66-5.07l-.14-.39a3.47 3.47 0 0 1-1.08-5.96v-.01a3.47 3.47 0 0 1 .47-6.2 3.47 3.47 0 0 1 2.28-5.79 3.47 3.47 0 0 1 3.87-4.86 3.47 3.47 0 0 1 5.15-3.5 3.47 3.47 0 0 1 5.94-1.83 3.47 3.47 0 0 1 6.22 0 3.47 3.47 0 0 1 5.94 1.83 3.47 3.47 0 0 1 5.14 3.5 3.47 3.47 0 0 1 3.87 4.86 3.47 3.47 0 0 1 2.28 5.8 3.47 3.47 0 0 1 .47 6.19 3.47 3.47 0 0 1-1.08 5.97l-.14.4a3.47 3.47 0 0 1-2.66 5.06c-.16.23-.33.45-.5.66A3.46 3.46 0 0 1 42.6 43l-.98.7a3.46 3.46 0 0 1-4.54 2.3c-.47.17-.94.33-1.43.46-.18.26-.4.49-.65.68v-3.06A14.04 14.04 0 0 0 43.42 35h.08a4.5 4.5 0 0 0 .5-8.97z"
            ></path>
          </mask>
          <g mask="url(#hairCurly-a)">
            <path
              fill="#fff"
              d="M7 3h46v44H7z"
              opacity="0.26"
              style={{ mixBlendMode: "overlay" }}
            ></path>
          </g>
        </g>
        <path
          fill="#7555ca"
          d="M27 49v3a5 5 0 0 0 10 0v-3l6.65 2.05a9 9 0 0 1 6.35 8.6V64H14v-4.35a9 9 0 0 1 6.35-8.6z"
        ></path>
        <path
          fill="#000"
          d="m11 6.54-1.65.5A9 9 0 0 0 7 8.17V20h4zM15 20h4v-5.29a7.02 7.02 0 0 1-4-3.1zm8 0h4v-8.4a7.02 7.02 0 0 1-4 3.11v5.3Zm8 0h4V8.16a9 9 0 0 0-2.35-1.12L31 6.55z"
          opacity="0.4"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(11 44)"
        ></path>
        <path
          fill="#fff"
          d="M3.4 13a9 9 0 0 1 2.53-4h8.14a6.98 6.98 0 0 0 2.03 4zM39 17v3H3v-3zm-2.93-8a9 9 0 0 1 2.53 4H25.9a6.98 6.98 0 0 0 2.03-4z"
          opacity="0.17"
          style={{ mixBlendMode: "lighten" }}
          transform="translate(11 44)"
        ></path>
        <ellipse
          cx="9"
          cy="5"
          fill="#1B0640"
          rx="2"
          ry="2.5"
          transform="translate(23 36)"
        ></ellipse>
        <path
          fill="#000"
          d="M4.25 5a.75.75 0 0 1 1.5 0c0 .84.91 1.75 2.25 1.75s2.25-.91 2.25-1.75a.75.75 0 0 1 1.5 0c0 1.66-1.59 3.25-3.75 3.25S4.25 6.66 4.25 5"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}
// --- assets/avatars/AvatarDestiny.tsx ---
function AvatarDestiny({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#eeb4a4"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          fillRule="evenodd"
          d="M24 28.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0m13 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"
          clipRule="evenodd"
        ></path>
        <path
          fill="#6c4545"
          fillRule="evenodd"
          d="M46 28c-2.18-2.42-3.65-5.54-4.42-9.36a19.6 19.6 0 0 1-9.08 7.86c-4.67 2-9.5 2.33-14.5 1v.53c-.73.08-1.42.34-2 .73V27.5C16 18.39 23.16 11 32 11s16 7.39 16 16.5v1.26a4.5 4.5 0 0 0-2-.73zm-9 21.31v-3.23A14.04 14.04 0 0 0 45.42 37h.08c.93 0 1.78-.28 2.5-.76V47a38.7 38.7 0 0 1-11 2.31M16 47a38.7 38.7 0 0 0 11 2.31v-3.23A14.04 14.04 0 0 1 18.58 37h-.08c-.93 0-1.79-.28-2.5-.76z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#fff"
          d="M30 9c-8.84 0-16 7.39-16 16.5v1.26c.58-.4 1.27-.65 2-.73v-.53c5 1.33 9.83 1 14.5-1a19.6 19.6 0 0 0 9.08-7.86c.77 3.82 2.24 6.94 4.42 9.36v.03c.73.08 1.42.34 2 .73V25.5C46 16.39 38.84 9 30 9"
          opacity="0.26"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(2 2)"
        ></path>
        <path
          fill="#e24553"
          d="M27 49v3a5 5 0 0 0 10 0v-3l6.65 2.05a9 9 0 0 1 6.35 8.6V64H14v-4.35a9 9 0 0 1 6.35-8.6z"
        ></path>
        <path
          fill="#000"
          d="m11 6.54-1.65.5A9 9 0 0 0 7 8.17V20h4zM15 20h4v-5.29a7.02 7.02 0 0 1-4-3.1zm8 0h4v-8.4a7.02 7.02 0 0 1-4 3.11v5.3Zm8 0h4V8.16a9 9 0 0 0-2.35-1.12L31 6.55z"
          opacity="0.4"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(11 44)"
        ></path>
        <path
          fill="#fff"
          d="M3.4 13a9 9 0 0 1 2.53-4h8.14a6.98 6.98 0 0 0 2.03 4zM39 17v3H3v-3zm-2.93-8a9 9 0 0 1 2.53 4H25.9a6.98 6.98 0 0 0 2.03-4z"
          opacity="0.17"
          style={{ mixBlendMode: "lighten" }}
          transform="translate(11 44)"
        ></path>
        <path fill="#DC5C7A" d="M28 41h8s-1 2.5-4 2.5-4-2.5-4-2.5"></path>
        <path
          fill="#F57B98"
          d="M28.39 40.22A2.1 2.1 0 0 1 32 40a2.1 2.1 0 0 1 3.61.22l.4.78h-8.02l.39-.78Z"
        ></path>
        <path
          fill="#000"
          d="M4.25 5a.75.75 0 0 1 1.5 0c0 .84.91 1.75 2.25 1.75s2.25-.91 2.25-1.75a.75.75 0 0 1 1.5 0c0 1.66-1.59 3.25-3.75 3.25S4.25 6.66 4.25 5"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}
// --- assets/avatars/AvatarOliver.tsx ---
function AvatarOliver({ className, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#836055"
          d="M46.07 40.4c.47 7.5.94 15-11.07 15.56v9.91S31.36 68 26.5 68 18 64.52 18 64.52V45.1c-.2-1.02-.33-2.06-.41-3.12a5 5 0 0 1-.9-9.8C15.37 22.63 17.52 13 32 13c14.59 0 14.24 11.08 13.96 19.81-.04 1.15-.07 2.25-.07 3.29 0 1.4.09 2.86.18 4.3"
        ></path>
        <path
          fill="#000"
          fillOpacity="0.07"
          d="M17.59 41.98c-.16-1.97-.16-3.97-.16-5.88a47 47 0 0 1-.73-3.93 5 5 0 0 0 .89 9.81M18 45.1v19.42S21.64 68 26.5 68s8.5-2.13 8.5-2.13v-9.91q-.72.03-1.5.03c-10.79 0-14.34-4.95-15.5-10.9Z"
        ></path>
        <path
          fill="#000"
          fillOpacity="0.07"
          d="M34.93 55.96c-.46.02-.93.03-1.43.03-7.25 0-11.23-2.23-13.41-5.5.5 4.82 3.16 8.5 8.3 8.5h1.36c3.8.03 4.92.04 5.18-3.03"
        ></path>
        <rect
          width="3"
          height="2"
          x="36"
          y="41"
          fill="#000"
          fillOpacity="0.07"
          rx="1"
        ></rect>
        <rect width="40" height="23" x="7" y="60" fill="#ff4dd8" rx="9"></rect>
        <path
          fill="#1b0b47"
          d="M20.67 28.22v6.02c0 .76-.67 1.76-1.17 2.26s-2 1.5-2.85 1.5-3.54-.45-4.83-2.26c-1.28-1.8-.89-11.32 0-13.54.9-2.21 4.19-6.88 8.85-10.45a26.26 26.26 0 0 1 12.88-5.34C58.48 3.4 49.22 20.99 46 25.5c-5.5-2-9.5-2.5-16.72-1.53-7.21.99-8.01 1.99-8.6 4.24Z"
        ></path>
        <path
          fill="#66253C"
          d="M28.93 46a1 1 0 0 1 1-1h9.14a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-1.14a5 5 0 0 1-5-5"
        ></path>
        <path
          fill="#B03E67"
          d="M36.76 50.7a5 5 0 0 1-1.69.3h-1.14a5 5 0 0 1-5-4.8c.77-.29 1.9-.25 3.02-.22L33 46c2.21 0 4 1.57 4 3.5 0 .42-.09.83-.24 1.2"
        ></path>
        <path
          fill="#fff"
          d="M30 45h10v1a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1z"
        ></path>
        <g fill="#1b0b47" transform="translate(0 -1)">
          <rect width="3" height="4" x="30" y="36" rx="1.5"></rect>
          <rect width="3" height="4" x="40" y="36" rx="1.5"></rect>
        </g>
      </g>
    </svg>
  );
}
// --- assets/avatars/AvatarRyan.tsx ---
function AvatarRyan({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 360 360"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="360" height="360" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#f9c9b6"
          stroke="#000"
          strokeWidth="4"
          d="M234 342.5c-14.4-20-25.67-58.67-27-78L138.5 235 110 342.5z"
        ></path>
        <path
          fill="#000"
          d="M130.37 263.69c-2.1.2-4.22.31-6.37.31-30.78 0-56.05-21.57-58.76-49.1L127 241.5c.38 5.48 1.55 13.32 3.37 22.19"
          style={{ mixBlendMode: "multiply" }}
          transform="translate(80 23)"
        ></path>
        <path
          fill="#f9c9b6"
          stroke="#000"
          strokeWidth="4"
          d="M261.94 174.37v.01l.1.4.14.65a75.72 75.72 0 0 1-147.25 35.27l-.2-.74L98 140.13l-.06-.29a75.72 75.72 0 0 1 147.26-35.29l.05.21.02.08.05.2.05.2v.01l16.4 68.44.08.34.08.34Z"
        ></path>
        <path
          fill="#000"
          d="M238.42 214.57 237.4 200a8.06 8.06 0 0 0-9.74-7.3c-6.95 1.49-20.1 4.1-29.54 4.76-9.43.66-22.82-.1-29.9-.6a8.06 8.06 0 0 0-8.63 8.58L160.6 220a8.06 8.06 0 0 0 9.73 7.3c6.95-1.48 20.1-4.1 29.54-4.76s22.82.1 29.91.61a8.06 8.06 0 0 0 8.63-8.58Z"
        ></path>
        <path
          fill="#fff"
          d="m169.75 200.97 1.6 6.07a6 6 0 0 0 6.22 4.46 6 6 0 0 0-5.54 5.28l-.74 6.23c7.28-1.52 19.34-3.83 28.3-4.46 8.98-.63 21.24-.02 28.66.48l-1.6-6.07a6 6 0 0 0-6.21-4.46 6 6 0 0 0 5.54-5.28l.73-6.24c-7.27 1.53-19.33 3.84-28.3 4.47-8.97.62-21.23.01-28.65-.48Z"
        ></path>
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeWidth="4"
          d="M209 112.21c5.67-2.66 19-5.1 27 6.5m-102.42 18.81c2.07-5.9 9.68-17.12 23.56-14.7"
        ></path>
        <path
          fill="#6bd9e9"
          stroke="#000"
          strokeWidth="3.82"
          d="m35.6 323.86-.62-1.64c-.56-1.55-1.35-3.84-2.23-6.74a163 163 0 0 1-5.28-23.98c-2.81-19.77-2.8-45.8 8.4-71.12 1.8-4.09 4.07-8.3 6.52-12.85 9.47-17.6 21.77-40.46 21.77-82.45 0-30.59 14.84-56.35 36.7-74.51 21.88-18.18 50.7-28.66 78.38-28.66 15.13 0 27.3 1.73 37.07 7.64 9.72 5.87 17.37 16.05 23.05 33.58a3.47 3.47 0 0 0 4.36 2.27c11.31-3.67 28.47.04 42.95 9.5 14.42 9.4 25.62 24.15 25.62 41.91 0 15.43-2.64 25.85-5.22 36-3.12 12.3-6.13 24.16-4 43.5.7 6.45 2.15 11.03 4.16 14.82 1.98 3.73 4.48 6.62 7.12 9.66l.05.07c6.28 7.25 9.13 13.22 10.06 18.47.92 5.23-.05 9.98-1.84 14.9-.9 2.48-2 4.97-3.15 7.59l-.1.22c-1.12 2.53-2.3 5.19-3.35 7.98-2.18 5.77-3.89 12.2-3.72 19.83.15 6.48 1.3 10.91 3.01 14.27 1.7 3.32 3.89 5.44 5.8 7.3l.05.05c1.74 1.68 3.2 3.1 4.27 5.1.96 1.78 1.67 4.13 1.79 7.66a172.14 172.14 0 0 1-87.4 23.9 111 111 0 0 1-7.28-.28c-6.15-9.4-11.75-24.88-16.1-40.8-4.21-15.46-7.18-31.08-8.3-41.4 37.08-10.72 60.32-48.98 54.73-88.46l-.01-.12a6 6 0 0 0-.08-.47 77 77 0 0 0-.43-2.25 487 487 0 0 0-6.53-28.2 277 277 0 0 0-7.45-24.2c-2.76-7.5-5.83-14.15-9.1-18.24l-.3-.37-.44-.2c-1.93-.83-3.94-1.77-6.03-2.74-9.93-4.62-21.84-10.17-37.26-10.78-18.78-.74-42.56 5.78-74.7 29.09l-2.02 1.46 1.95 1.57c15.92 12.83 19.37 29.86 18.63 44.3a89.2 89.2 0 0 1-5.24 25.1c-1.16-1.69-1.9-3.82-2.45-6.33a85 85 0 0 1-.96-5.45l-.05-.3c-.3-2-.63-4.08-1.1-6.09-.96-4.01-2.57-8.02-6.14-10.86-3.58-2.84-8.8-4.25-16.4-3.83l-2.22.13.46 2.18 11.36 53.31.02.08.03.09a79.8 79.8 0 0 0 19.91 32.81 66 66 0 0 1 1.54 2.68c1.01 1.82 2.37 4.38 3.76 7.33 2.82 5.94 5.66 13.24 6.2 19.2.57 6.05-.96 13.86-2.7 20.31a130 130 0 0 1-2.84 9.14c-5.03-2.4-9.53-2.23-13.38.01-4.16 2.43-7.21 7.06-9.48 12.22-4.15 9.42-6.14 21.64-7.06 29.22A602 602 0 0 1 55.2 331.1a354 354 0 0 1-15.2-5.46 191 191 0 0 1-4.4-1.77Z"
        ></path>
        <path
          fill="#ffeba4"
          d="M168.47 143.36c1.86 6.36-5.04 1.48-11.4 3.33-6.36 1.86-9.78 9.76-11.64 3.4a12.001 12.001 0 0 1 23.04-6.73m63.79-9.19c1.64 6.42-4.7 1.52-11.11 3.15-6.43 1.64-10.51 9.19-12.15 2.77a12 12 0 1 1 23.26-5.92"
        ></path>
        <path
          fill="#000"
          d="M147.29 153.07c.11.82 1.14 1 1.72.41 2.46-2.52 6.25-4.36 10.65-4.89 2.6-.3 5.1-.12 7.32.48.75.2 1.5-.44 1.23-1.17a10.84 10.84 0 0 0-20.91 5.17Zm64.09-10c.12.82 1.15 1 1.73.41 2.44-2.48 6.19-4.3 10.54-4.83 2.56-.3 5.03-.12 7.23.47.75.2 1.5-.44 1.23-1.17a10.74 10.74 0 0 0-20.73 5.12"
        ></path>
        <g stroke="#d2eff3" strokeWidth="4" transform="translate(102 111)">
          <circle cx="122.5" cy="28" r="26"></circle>
          <circle cx="55.5" cy="37" r="26"></circle>
          <path d="M97.5 35a8 8 0 0 0-16 0M30 39 0 44.5"></path>
        </g>
        <path
          stroke="#000"
          strokeWidth="4"
          d="M193.687 153.056c.206 3.838 1.698 12.08 6.049 14.297 5.438 2.77 1.175 11.953-9.006 11.364"
        ></path>
        <path
          stroke="#000"
          strokeWidth="8"
          d="M114.5 160.18a23.8 23.8 0 0 0-7.42-1.18c-10.5 0-19 6.5-18 18.5 1.04 12.5 8.5 17 19 17a19.6 19.6 0 0 0 6.92-1.27"
        ></path>
        <path
          fill="#f9c9b6"
          d="M115.5 193.04a19.4 19.4 0 0 1-7.42 1.46c-10.5 0-17.96-4.5-19-17-1-12 7.5-18.5 18-18.5 3.14 0 6.19.6 8.92 1.73l-.5 32.3Z"
        ></path>
        <path
          stroke="#000"
          strokeWidth="4"
          d="M111.5 167.5c-4-1.83-12.8-2.8-16 8"
        ></path>
        <path
          stroke="#000"
          strokeWidth="4"
          d="M101 168c2.17 1.83 6.3 7.5 5.5 15.5"
        ></path>
        <path
          fill="#6bd9e9"
          stroke="#000"
          strokeWidth="4.27"
          d="M313.37 362.86H40.46l.1-.2c4.55-9.28 12.94-26.35 23.84-41.63 6.2-8.67 13.13-16.65 20.54-22.27 7.41-5.61 15.12-8.73 22.95-8.04 15.06 1.31 28.46 9.56 41.93 17.83l3.83 2.35c14.48 8.82 29.35 17.02 45.72 13.43 5.53-1.2 9.26-3.8 11.6-7.16 2.32-3.3 3.15-7.15 3.3-10.66.14-3.52-.4-6.85-.96-9.26a40 40 0 0 0-.75-2.78c3.63-3.64 7.47-5.77 11.43-6.73 4.3-1.03 8.89-.73 13.72.7 9.73 2.87 20.14 10.25 30.3 19.73 18.61 17.37 35.69 41.14 45.36 54.68Z"
        ></path>
      </g>
    </svg>
  );
}
// --- assets/avatars/AvatarSophia.tsx ---
function AvatarSophia({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 64 64"
      {...props}
      className={classNames(className)}
    >
      <mask id="viewboxMask">
        <rect width="64" height="64" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path
          fill="#eeb4a4"
          d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
        ></path>
        <mask
          id="personas-a"
          width="36"
          height="44"
          x="14"
          y="13"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path
            fill="#fff"
            d="M37 46.08V52a5 5 0 0 1-10 0v-5.92A14.04 14.04 0 0 1 18.58 37h-.08a4.5 4.5 0 0 1-.5-8.97V27a14 14 0 1 1 28 0v1.03a4.5 4.5 0 0 1-.58 8.97A14.04 14.04 0 0 1 37 46.08"
          ></path>
        </mask>
        <g mask="url(#personas-a)">
          <path
            fill="#fff"
            d="M32 13a14 14 0 0 1 14 14v6a14 14 0 1 1-28 0v-6a14 14 0 0 1 14-14"
            opacity="0.36"
            style={{ mixBlendMode: "overlay" }}
          ></path>
        </g>
        <path
          fill="#1B0640"
          d="M24 28.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0m17.24-.6a.75.75 0 0 0-.83-.64l-4 .5a.75.75 0 0 0 .18 1.48l4-.5c.41-.05.7-.42.65-.83Z"
        ></path>
        <path
          fill="#362c47"
          d="m17.79 27.56-.71-6.6A9 9 0 0 1 26.03 11H43a9.2 9.2 0 0 1-.74 3.63 7.93 7.93 0 0 1 4.6 8.35L46 29v4.22a14 14 0 0 1-.48 3.42l-2.52.54A1 1 0 0 1 41.8 36l1.9-9.12c-1.57-2.09-2.68-5.24-3.31-9.44a9.24 9.24 0 0 1-5.7 2.77c-1.82.2-3.39.29-4.7.29-3 0-5.67-.5-8-1.5 0 2.6-.67 5.1-2 7.52L21.98 36a1 1 0 0 1-1.2 1.18l-2.51-.54a14 14 0 0 1-.48-3.42z"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M19.98 34 18 24.52c1.33-2.42 2-4.93 2-7.52 2.33 1 5 1.5 8 1.5 1.31 0 2.88-.1 4.7-.29A9.24 9.24 0 0 0 41 9H24.03a9 9 0 0 0-8.95 9.97l.7 6.59v5.66a14 14 0 0 0 .49 3.42l2.52.54A1 1 0 0 0 19.98 34M44 31.22V27l.86-6.02.02-.14a7.91 7.91 0 0 0-2.42-6.73 9.3 9.3 0 0 1-3.45 4.5 17.2 17.2 0 0 0 2.7 6.27L39.8 34a1 1 0 0 0 1.2 1.18l2.52-.54a14 14 0 0 0 .48-3.42"
          clipRule="evenodd"
          opacity="0.26"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(2 2)"
        ></path>
        <path
          fill="#e24553"
          d="M27 51v.47a5 5 0 1 0 10 0V51c7.06 1.52 12.93 6.74 16 13H11c3.07-6.26 8.94-11.48 16-13"
        ></path>
        <ellipse
          cx="9"
          cy="5"
          fill="#1B0640"
          rx="2"
          ry="2.5"
          transform="translate(23 36)"
        ></ellipse>
        <path
          fill="#000"
          d="M5.29 6.24a.75.75 0 1 1 1.42-.48c.23.7.62 1 1.3 1 .66 0 1.05-.3 1.28-1a.75.75 0 1 1 1.42.48c-.42 1.3-1.37 2.01-2.7 2.01S5.72 7.54 5.3 6.24Z"
          opacity="0.36"
          style={{ mixBlendMode: "overlay" }}
          transform="translate(24 28)"
        ></path>
      </g>
    </svg>
  );
}
// --- CardPressure.tsx ---
function CardPressure({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  const dispatch = useDispatch();
  const pressure = useSelector(({ configuration: { pressure } }) => pressure);
  const onChangePressure = useCallback(
    (newPressure: number) => {
      if (report === null) {
        return;
      }

      dispatch({
        type: ActionType.UpdateWaterConsumptionReport,
        payload: {
          id: report.id,
          pressure: newPressure,
        },
      });
    },
    [report, dispatch]
  );
  if (report === null) {
    return null;
  }

  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ActivityIcon />
        </Card.Title.Icon>
        Pressure
      </Card.Title>
      <Card.Body>
        <div className="flex-1 flex flex-row">
          <div className="flex-1 text-lg flex items-end">
            {report.pressure.toFixed(1)} psi
          </div>
          <InputRange
            value={report.pressure}
            min={pressure.minimum}
            max={pressure.maximum}
            onChange={onChangePressure}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
// --- CardStatistics.tsx ---
/**
 * A card that displays the average water consumption for the selected time range,
 * a dropdown to select the time range, and a vertical bar indicator of the
 * consumption over the past week.
 *
 * @param {PropsWithChildren<HTMLAttributes<HTMLDivElement>>} props
 * @returns {JSX.Element}
 */
function CardStatistics({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): JSX.Element {
  const reports = useSelector((state) => state.waterConsumptionReports);
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Week);
  const filteredReports = useMemo(
    () =>
      filterReportsByDateRange(
        Array.from(reports.values()),
        timeRange,
        DateTime.now()
      ),
    [reports, timeRange]
  );
  const averageConsumption = useMemo(
    () => calculateAverageFromReportList(filteredReports),
    [filteredReports]
  );
  const dropdown = useMemo(() => {
    const label = timeRangeLabel(timeRange);
    return (
      <Dropdown label={label}>
        {[TimeRange.Week, TimeRange.Month, TimeRange.Year, TimeRange.Day].map(
          (range) => (
            <DropdownMenu.Item
              key={range}
              className={classNames(...style.select.classNames)}
              onClick={() => setTimeRange(range)}
            >
              {timeRangeLabel(range)}
            </DropdownMenu.Item>
          )
        )}
      </Dropdown>
    );
  }, [timeRange]);
  const verticalIndicators = useMemo((): ReadonlyArray<number> => {
    const startTime = DateTime.now().startOf("day");
    let endTime: DateTime;

    switch (timeRange) {
      case TimeRange.Day:
        endTime = startTime.endOf("day");
        break;
      case TimeRange.Week:
        endTime = startTime.endOf("week");
        break;
      case TimeRange.Month:
        endTime = startTime.endOf("month");
        break;
      case TimeRange.Year:
        endTime = startTime.endOf("year");
        break;
    }

    const list = filterWaterConsumptionReportByDateRange(
      { waterConsumptionReports: reports },
      startTime,
      endTime
    );

    return list.slice(0, 7).map((report) => {
      const itemsAverage =
        report.items.reduce((sum, item) => sum + item.consumption, 0) /
        report.items.length;
      return itemsAverage / averageConsumption;
    });
  }, [timeRange, reports, averageConsumption]);
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ChartPieIcon />
        </Card.Title.Icon>
        <div className="flex-1">Statistics</div>
        <div>{dropdown}</div>
      </Card.Title>
      <Card.Body className="flex xl:flex-row gap-4 flex-col">
        <div className="flex flex-[30px] flex-col gap-1">
          <div className="text-gray-500">Average</div>
          <div>{millilitersToLiters(averageConsumption).toFixed(2)} liters</div>
        </div>
        <div className="flex flex-1 flex-col xl:flex-row gap-2">
          {verticalIndicators.map((indicator, index) => (
            <VerticalBarIndicator
              key={index}
              variant={index % 2 ? "primary" : "secondary"}
              value={indicator * 100}
              className="flex-1 h-full"
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
// --- CardTemperature.tsx ---
function CardTemperature({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  const dispatch = useDispatch();
  const temperature = useSelector(
    ({ configuration: { temperature } }) => temperature
  );
  const onChangeTemperature = useCallback(
    (newTemperature: number) => {
      if (report === null) {
        return;
      }

      dispatch({
        type: ActionType.UpdateWaterConsumptionReport,
        payload: {
          id: report.id,
          temperature: newTemperature,
        },
      });
    },
    [report, dispatch]
  );
  if (report === null) {
    return null;
  }

  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <ThermometerIcon />
        </Card.Title.Icon>
        Temperature
      </Card.Title>
      <Card.Body>
        <div className="flex-1 flex flex-row">
          <div className="flex-1 text-lg flex items-end">
            {report.temperature.toFixed(1)} °C
          </div>
          <InputRange
            value={report.temperature}
            min={temperature.minimum}
            max={temperature.maximum}
            onChange={onChangeTemperature}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
// --- CardUserWaterConsumption.tsx ---
interface ICardUserWaterConsumptionProps
  extends HTMLAttributes<HTMLDivElement> {
  endpointId: string | null;
}

function CardUserWaterConsumption({
  endpointId,
  className,
  ...props
}: ICardUserWaterConsumptionProps) {
  const [kindId, setKindId] = useState<string | null>(null);
  const kinds = useSelector(
    ({ waterConsumptionKinds }) => waterConsumptionKinds
  );
  const waterConsumptionReport = useSelector(
    selectTodayLatestWaterConsumptionReport
  );
  const reportItems = useMemo(
    () =>
      (waterConsumptionReport?.items ?? [])
        .filter((i) => {
          if (endpointId === null) {
            return true;
          }
          return i.endpointId === endpointId;
        })
        .filter((i) => {
          if (kindId === null) {
            return true;
          }
          return i.kindId === kindId;
        }),
    [waterConsumptionReport, kindId, endpointId]
  );
  const totalConsumption = useMemo(
    () => reportItems.reduce((sum, item) => sum + item.consumption, 0),
    [reportItems]
  );
  const averageConsumption = useMemo(
    () => calculateAverageFromReportItemList(reportItems),
    [reportItems]
  );
  const kindSelectOptions = useMemo(
    () =>
      Array.from(kinds.values()).map((kind) => ({
        value: kind.id,
        label: kind.title,
      })),
    [kinds]
  );
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <DropletIcon />
        </Card.Title.Icon>
        Your water consumption
      </Card.Title>
      <Card.Body
        className={classNames(
          "flex",
          "2xl:flex-row",
          "gap-2",
          "flex-col-reverse"
        )}
      >
        <div className={classNames("flex", "gap-4", "flex-col", "flex-1")}>
          <div
            className="flex flex-col gap-1"
            aria-label={"Water consumption in liters"}
          >
            <div className="text-gray-400">Today</div>
            <div aria-label={"Contains consumption in liters"}>
              {Math.ceil(millilitersToLiters(totalConsumption))} liters
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-gray-400">This month</div>
            {((averageConsumption * 30) / 1_000_000).toFixed(2)} m³
          </div>
          <Select
            aria-placeholder="Water kind"
            aria-label="Water kind"
            value={kindId}
            onChange={setKindId}
            options={kindSelectOptions}
          />
        </div>
        <div
          className="flex justify-center"
          aria-label={"Water consumption indicator"}
        >
          <WaterBottleIndicator
            className="w-40"
            percentage={
              // Water consumption percentage based on average consumption
              clamp((averageConsumption / totalConsumption) * 100, 0, 100)
            }
          />
        </div>
      </Card.Body>
    </Card>
  );
}
// --- CardWaterConsumptionSelector.tsx ---
interface ICardUserWaterConsumptionSelectorProps
  extends HTMLAttributes<HTMLDivElement> {
  endpointId: string | null;
  onSelectEndpointId: Dispatch<SetStateAction<string | null>>;
}

function CardWaterConsumptionSelector({
  className,
  endpointId: selectedEndpointId,
  onSelectEndpointId,
  ...props
}: ICardUserWaterConsumptionSelectorProps) {
  const [slideItemIndex, setSlideItemIndex] = useState(0);
  const endpoints = useSelector(
    ({ waterConsumptionEndpoints }) => waterConsumptionEndpoints
  );
  const slides = useMemo(
    () =>
      Array.from(endpoints.values()).map((endpoint): ICarouselSlide => {
        let icon: JSX.Element | null;
        const iconClassNames = classNames("w-10");
        switch (endpoint.icon) {
          case "shower":
            icon = (
              <img
                src="https://i.postimg.cc/mkV05m8S/image.png"
                alt="Shower head"
                className={iconClassNames}
              />
            );
            break;
          case "dishes":
            icon = (
              <img
                src="https://i.postimg.cc/XvMDQMnb/image.png"
                alt="Dishes"
                className={iconClassNames}
              />
            );
            break;
          case "faucet":
            icon = (
              <img
                src="https://i.postimg.cc/jC0JBh2L/image.png"
                alt="Faucet"
                className={iconClassNames}
              />
            );
            break;
          default:
            icon = null;
        }
        const toggleEndpoint = () => {
          onSelectEndpointId((selectedEndpointId) =>
            // Unselect the current endpoint if it is selected
            selectedEndpointId === endpoint.id ? null : endpoint.id
          );
        };
        return {
          children: ({ current, index }) => {
            return (
              <div className="flex flex-col gap-4 items-center">
                {icon}
                {current !== index ? null : (
                  <>
                    <div className="text-xl">{endpoint.title}</div>
                    <CardWaterConsumptionSelectorButton
                      onClick={toggleEndpoint}
                    >
                      {selectedEndpointId === endpoint.id
                        ? "Unselect"
                        : "Select"}
                    </CardWaterConsumptionSelectorButton>
                  </>
                )}
              </div>
            );
          },
        };
      }),
    [endpoints, onSelectEndpointId, selectedEndpointId]
  );
  const slidesNavigator = useMemo(
    () => (
      <div className="flex flex-row w-full gap-2 justify-center">
        {slides.map((_, index) => (
          // Dots for navigating through the slides
          <div
            key={index}
            onClick={() => setSlideItemIndex(index)}
            className={classNames(
              "cursor-pointer",
              "w-2",
              "h-2",
              { "bg-gray-800": index === slideItemIndex },
              "hover:bg-gray-600",
              "rounded-full",
              "bg-gray-400",
              "dark:bg-gray-700"
            )}
          />
        ))}
      </div>
    ),
    [slides, setSlideItemIndex, slideItemIndex]
  );
  return (
    <Card className={className}>
      <div
        className={classNames(
          "flex-1",
          "flex",
          "justify-center",
          "flex-col",
          "gap-4"
        )}
        {...props}
      >
        <Carousel
          current={slideItemIndex}
          className={classNames(
            "flex",
            "flex-col",
            "2xl:flex-row",
            "gap-2",
            "w-full",
            "items-center"
          )}
          onChange={setSlideItemIndex}
          slides={slides}
          Parent={WaterConsumptionSelectorOption}
        />
        {slidesNavigator}
      </div>
    </Card>
  );
}
// --- CardWaterConsumptionSelectorButton.tsx ---
function CardWaterConsumptionSelectorButton({
  onClick,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "flex",
        "rounded-2xl",
        "w-full",
        "items-center",
        "text-xl",
        "px-8",
        "bg-black",
        "hover:bg-gray-900",
        "text-white",
        "h-12",
        "justify-center",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "dark:bg-gray-900",
        "dark:hover:bg-gray-800",
        "dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
}
// --- CardWaterMineralization.tsx ---
function CardWaterMineralization({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const mineralizationRange = useSelector(
    ({ configuration }) => configuration.mineralization
  );
  const report = useSelector(selectTodayLatestWaterConsumptionReport);
  if (report === null) {
    return null;
  }

  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>
        <Card.Title.Icon>
          <StarIcon />
        </Card.Title.Icon>
        Water Mineralization
      </Card.Title>
      <Card.Body>
        <RangeHorizontalIndicator
          min={mineralizationRange.minimum}
          max={mineralizationRange.maximum}
          value={report.mineralization}
        >
          <div className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-white">
            <span>{report.mineralization.toFixed(2)} ppm</span>
          </div>
        </RangeHorizontalIndicator>
      </Card.Body>
    </Card>
  );
}
// --- CardWelcomeUser.tsx ---
const CardWelcomeUser = memo(function CardWelcomeUser({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const currentUser = useSelector(({ user }) => user);
  if (currentUser === null) {
    return null;
  }
  return (
    <Card
      className={classNames(
        "mb-8",
        "overflow-hidden",
        "relative",
        "last:mb-8",
        "h-80",
        "sm:h-64",
        "xl:h-auto",
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          "text-shadow-lg",
          "text-shadow-black",
          "z-20",
          "xl:text-shadow-none",
          "flex",
          "flex-col",
          "gap-2"
        )}
      >
        <div className="text-4xl overflow-hidden text-ellipsis max-w-sm">
          Hello, {currentUser.firstName}!
        </div>
        <div className="text-gray-500 dark:text-white">
          <div>Have a nice day.</div>
          <div>Saving the World by Saving Water!</div>
        </div>
      </div>
      <img
        className={classNames(
          "right-0",
          "z-10",
          "top-0",
          "absolute",
          "h-full",
          "max-w-none"
        )}
        alt="Water drop avatar holding the world with in his hand with waves coming out of his feet."
        src="https://i.postimg.cc/CKmnfSxS/image.png"
      />
    </Card>
  );
});
// --- config.ts ---
const style = Object.seal(
  Object.freeze({
    input: {
      classNames: [
        "bg-[#f2f4f5]",
        "dark:bg-gray-800",
        "rounded-full",
        // "dark:bg-gray-700",
        // "bg-gray-50",
        "border",
        "border-gray-200",
        "dark:border-gray-600",
        // "text-gray-900",
        // "dark:text-gray-300",
        // "text-sm",
        "rounded-lg",
        // "focus:ring-blue-500",
        // "focus:border-blue-500",
        "block",
        // "w-full",
        "px-2.5",
        "py-2",
      ],
    },
    appContainer: {
      bg: {
        classNames: ["bg-[#eff3f8]", "dark:bg-gray-800"],
      },
    },
    card: {
      spacing: {
        classNames: ["gap-4"],
      },
    },
    select: {
      classNames: [
        "px-4",
        "flex",
        "items-center",
        "text-sm",
        "h-10",
        "text-gray-700",
        "dark:text-gray-200",
        "hover:bg-gray-100",
        "dark:hover:bg-gray-700",
        "cursor-pointer",
        "rounded-md",
      ],
    },
    colors: {
      green: "#ccf6f1",
      lightGray100: "#eff3f8",
      lightBlue100: "#e3eef3",
    },
  })
);
const defaultAppConfiguration: IAppConfiguration = Object.seal(
  Object.freeze({
    automation: {
      turnOffIdleTaps: false,
      irrigationSchedule: false,
      smartNotifications: false,
    },
    temperature: {
      maximum: 100,
      minimum: 20,
    },
    mineralization: {
      maximum: 100,
      minimum: 50,
    },
    pressure: {
      maximum: 80,
      minimum: 40,
    },
  })
);
// --- core/Card.tsx ---
function Card({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      aria-label="Card"
      className={classNames(
        className,
        "rounded-[40px]",
        "bg-white",
        "dark:bg-gray-700",
        "p-6",
        "flex",
        "flex-col",
        "gap-4"
      )}
      {...props}
    />
  );
}

function CardTitle(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      aria-label="Card title"
      className="2xl:flex-row flex-col flex gap-4 text-lg items-center"
      {...props}
    />
  );
}

function CardBody(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      aria-label="Card body"
      className="flex flex-1 flex-col gap-4"
      {...props}
    />
  );
}
CardTitle.Icon = function CardTitleIcon(
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) {
  return (
    <div
      aria-label="Card title icon"
      className={classNames(
        "rounded-2xl",
        "p-3",
        "bg-[#f2f2f2]",
        "text-[#737f94]",
        "dark:bg-gray-300"
      )}
      {...props}
    />
  );
};
Card.Title = CardTitle;
Card.Body = CardBody;
// --- core/Carousel.tsx ---
interface ICarouselSlideProps
  extends AnimatedProps<HTMLAttributes<HTMLDivElement>> {
  active: boolean;
  index: number;
  current: number;
}

interface ICarouselSlide {
  children:
    | JSX.Element
    | null
    | ((props: Pick<ICarouselSlideProps, "current" | "index">) => JSX.Element);
}

interface ICarouselProps
  extends PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, "onChange">> {
  slides: ReadonlyArray<ICarouselSlide>;
  current: number;
  Parent: JSXElementConstructor<ICarouselSlideProps>;
  onChange(current: number): void;
}

const Carousel = memo(function Carousel({
  className,
  slides,
  current,
  Parent,
  onChange,
  ...props
}: ICarouselProps) {
  const reorderedSlides = useMemo(() => {
    const transformedSlides = slides.map((slide, index) => {
      return {
        key: index,
        active: index === current,
        index,
        current,
        slide,
      };
    });
    const nonActiveSlides = transformedSlides.filter(
      ({ index }) => index !== current
    );
    const leftSlides = nonActiveSlides.slice(0, 1);
    const rightSlides = nonActiveSlides.slice(1);
    const activeSlide =
      transformedSlides.find(({ index }) => index === current) ?? null;
    return [...leftSlides, activeSlide, ...rightSlides].map((slideInfo) => {
      if (slideInfo === null) {
        return null;
      }
      const { index, current, slide } = slideInfo;
      return (
        <Parent
          key={index}
          onClick={() => onChange(index)}
          active={index === current}
          index={index}
          current={current}
        >
          {typeof slide.children === "function"
            ? slide.children({ index, current })
            : slide.children}
        </Parent>
      );
    });
  }, [slides, onChange, Parent, current]);
  return (
    <div className={classNames(className)} {...props}>
      {reorderedSlides}
    </div>
  );
});
// --- core/Checkbox.tsx ---
interface ICheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked: boolean;
  onChange: Dispatch<boolean>;
}

/**
 * A checkbox component with animations.
 */
function Checkbox({ className, checked, onChange, ...props }: ICheckboxProps) {
  const checkboxDimensions = useRef({
    width: 24,
    height: 24,
    margin: 4,
  });
  const checkboxParentDimensions = useRef({
    width: checkboxDimensions.current.width * 2.5,
    height: checkboxDimensions.current.height * 1.25,
  });
  const fromTransformProps = ["scaleX(1.5)"];
  const toTransformProps = ["scaleX(1)"];
  const style = useSpring({
    from: {
      transform: [
        checked
          ? `translateX(${checkboxDimensions.current.margin}px)`
          : `translateX(${checkboxDimensions.current.width}px)`,
        ...fromTransformProps,
      ].join(" "),
    },
    to: {
      transform: [
        checked
          ? `translateX(${
              checkboxParentDimensions.current.width -
              checkboxDimensions.current.width -
              checkboxDimensions.current.margin
            }px)`
          : `translateX(${checkboxDimensions.current.margin}px)`,
        ...toTransformProps,
      ].join(" "),
    },
  });
  const toggle = useDebounce(
    useCallback(() => {
      onChange(!checked);
    }, [onChange, checked]),
    0
  );
  return (
    <div
      aria-checked={checked}
      aria-label="Checkbox"
      role="checkbox"
      style={checkboxParentDimensions.current}
      className={classNames(
        { "bg-[#89b8f4]": checked, "bg-gray-200 dark:bg-gray-800": !checked },
        "transition-colors",
        "duration-300",
        "ease-in-out",
        "cursor-pointer",
        "rounded-full",
        "flex",
        "items-center",
        "justify-start",
        "relative",
        className
      )}
      onClick={toggle}
      {...props}
    >
      <animated.div
        style={{
          ...style,
          width: checkboxDimensions.current.width,
          height: checkboxDimensions.current.height,
        }}
        className={classNames("rounded-full", "absolute", {
          "bg-[#f1fefe]": checked,
          "bg-gray-300 dark:bg-gray-500": !checked,
        })}
      />
    </div>
  );
}
// --- core/dataTypes/map/createMap.ts ---
/**
 * Creates an immutable Map from an array of objects with `id` property.
 *
 * @param state - an array of objects with `id` property.
 * @returns an immutable Map with objects from `state` as values.
 * @example
 * const data = [
 *   { id: '1', name: 'John' },
 *   { id: '2', name: 'Jane' },
 * ];
 *
 * const map = createMap(data);
 * console.log(map.get('1').name); // John
 */
function createMap<
  T extends { [K2 in K]: string },
  K extends keyof T = keyof T
>(state: ReadonlyArray<T>, key: K): ReadonlyMap<string, T> {
  return new Map<string, T>(state.map((item) => [item[key], item]));
}
// --- core/dataTypes/map/mergeMaps.ts ---
/**
 * Merge two maps into a new map. The second map takes precedence over the
 * first map, so if there are any keys in common, the values from the second
 * map will be used in the resulting map.
 *
 * @param {ReadonlyMap<string, T>} dest The first map.
 * @param {ReadonlyMap<string, T>} src The second map.
 * @returns {ReadonlyMap<string, T>} A new map that is the result of merging
 * the two input maps.
 */
function mergeMaps<T>(
  dest: ReadonlyMap<string, T>,
  src: ReadonlyMap<string, T>
): ReadonlyMap<string, T> {
  return new Map([...Array.from(dest), ...Array.from(src)]);
}
// --- core/Dynamic.tsx ---
/**
 * This component is used to render dynamic content on the client-side.
 * It takes a single child node and will only render it if it's running on the client.
 * It will not render anything on the server.
 *
 * @example
 *  <Dynamic>
 *    <MyComponent />
 *  </Dynamic>
 * @param props.children - The child node to render.
 */
function Dynamic({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);
  if (!isClient) {
    return null;
  }

  return <>{children}</>;
}
// --- core/hooks/useClock.ts ---
function useClock() {
  const [seconds, setSeconds] = useState<number>(
    DateTime.now().toUnixInteger()
  );
  const updateCurrentTime = useCallback(() => {
    setSeconds(DateTime.now().toUnixInteger());
  }, [setSeconds]);
  useInterval(updateCurrentTime, Math.floor(1000 * 0.8));
  return useMemo(() => DateTime.fromSeconds(seconds), [seconds]);
}
// --- core/hooks/useDebounce.ts ---
function useDebounce<T extends unknown[]>(
  fn: (...args: T) => void,
  ms: number
): (...args: T) => void {
  const timerId = useRef<number | null>(null);
  const clear = useCallback(() => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  }, [timerId]);
  useEffect(() => {
    return () => clear();
  }, [clear]);
  return useCallback<(...args: T) => void>(
    (...args) => {
      clear();
      timerId.current = window.setTimeout(fn, ms, ...args);
    },
    [fn, ms, clear]
  );
}
// --- core/hooks/useDuration.ts ---
interface IUseDurationHookIsExpired {
  (duration: Duration): boolean;
}

interface IUseDurationHookDifference {
  (): Duration | null;
}

interface IUseDurationHookRefreshDateTime {
  (): void;
}

/**
 * Returns a tuple of three functions related to managing a duration timer.
 * The first function, `isExpired`, takes a Luxon Duration and returns a boolean
 * indicating whether the duration has expired since the last call to the second
 * function, `refreshDateTime`. The third function, `calculateDifference`, returns
 * the Luxon Duration between the current time and the last call to `refreshDateTime`.
 * @returns A tuple of three functions: `isExpired(duration: Duration): boolean`,
 * `refreshDateTime(): void`, and `calculateDifference(): Duration`.
 */
function useDuration(): [
  IUseDurationHookIsExpired,
  IUseDurationHookRefreshDateTime,
  IUseDurationHookDifference
] {
  const lastCallRef = useRef<DateTime | null>(null);
  const calculateDifference = useCallback(() => {
    const now = DateTime.now();
    const previous = lastCallRef.current;

    return previous !== null ? now.diff(previous) : null;
  }, []);
  const refreshDateTime = useCallback(() => {
    lastCallRef.current = DateTime.now();
  }, []);
  const isExpired = useCallback(
    (duration: Duration) => {
      const elapsedTime = calculateDifference();

      if (
        elapsedTime === null ||
        elapsedTime.as("milliseconds") < duration.as("milliseconds")
      ) {
        return false;
      }

      return true;
    },
    [calculateDifference]
  );
  useEffect(() => {
    refreshDateTime();

    return () => {
      lastCallRef.current = null;
    };
  }, [refreshDateTime]);
  return [isExpired, refreshDateTime, calculateDifference];
}
// --- core/hooks/useInterval.ts ---
function useInterval(fn: () => void, ms: number) {
  const [schedule, clear] = useTimeout(ms, {
    concurrency: 1,
  });
  const repeat = useCallback(() => {
    fn();
    schedule(repeat);
  }, [schedule, fn]);
  useEffect(() => {
    repeat();
    return () => clear();
  }, [repeat, clear]);
  return [repeat, clear];
}
// --- core/hooks/useRandomWaterConsumptionReportItemsGenerator.ts ---
interface IUseRandomWaterConsumptionReportGeneratorHookResult {
  (): ReadonlyArray<IWaterConsumptionReportItem> | null;
}

function useRandomWaterConsumptionReportItemsGenerator(): IUseRandomWaterConsumptionReportGeneratorHookResult {
  const {
    waterConsumptionLocations: locations,
    waterConsumptionEndpoints,
    waterConsumptionKinds,
  } = useSelector(
    ({
      waterConsumptionLocations,
      waterConsumptionEndpoints,
      waterConsumptionKinds,
    }) => ({
      waterConsumptionLocations,
      waterConsumptionEndpoints,
      waterConsumptionKinds,
    }),
    shallowIsEqual
  );
  const itemDataMap = useMemo(
    () => ({
      endpoints: Array.from(waterConsumptionEndpoints.values()),
      locations: Array.from(locations.values()),
      kinds: Array.from(waterConsumptionKinds.values()),
    }),
    [waterConsumptionEndpoints, locations, waterConsumptionKinds]
  );
  const randomItemRelatedIds = useCallback(() => {
    const location =
      itemDataMap.locations[
        randomInteger(0, itemDataMap.locations.length - 1)
      ] ?? null;

    const endpoint =
      itemDataMap.endpoints[
        randomInteger(0, itemDataMap.endpoints.length - 1)
      ] ?? null;

    const kind =
      itemDataMap.kinds[randomInteger(0, itemDataMap.kinds.length - 1)] ?? null;

    if (location === null || kind === null || endpoint === null) {
      console.error("location, kind, or endpoint is null: %o", {
        location,
        kind,
        endpoint,
      });
      return null;
    }

    return {
      locationId: location.id,
      endpointId: endpoint.id,
      kindId: kind.id,
    };
  }, [itemDataMap]);
  return useCallback(
    ({
      minimumPerItemConsumption = 1,
      maximumPerItemConsumption = 1000,
      consumptionRate = randomFloat(0.1, 1),
      maximumItemCount = 32,
    }: Partial<{
      maximumItemCount: number;
      consumptionRate: number;
      minimumPerItemConsumption: number;
      maximumPerItemConsumption: number;
    }> = {}): ReadonlyArray<IWaterConsumptionReportItem> | null => {
      const items = new Array<IWaterConsumptionReportItem>();

      for (let i = 0; i < randomInteger(1, maximumItemCount); i++) {
        const relatedIds = randomItemRelatedIds();

        if (relatedIds === null) {
          console.error("randomItemRelatedIds returned null");
          continue;
        }

        const { locationId, endpointId, kindId } = relatedIds;

        items.push({
          kindId,
          locationId,
          consumption:
            randomFloat(minimumPerItemConsumption, maximumPerItemConsumption) *
            consumptionRate,
          endpointId,
        });
      }

      return items;
    },
    [randomItemRelatedIds]
  );
}
// --- core/hooks/useTimeout.ts ---
type TimeoutHookScheduleCallback<T extends unknown[]> = (
  fn: (...args: T) => void,
  ...args: T
) => void;
type TimeoutHookTimerCallback<T extends unknown[]> = (...args: T) => void;
type TimeoutHook<T extends unknown[]> = [
  // Set a timer
  TimeoutHookScheduleCallback<T>,
  // Clear timers
  (begin?: number, end?: number) => void
];

interface ITimeoutHookOptions {
  concurrency: number | null;
}

function useTimeout<T extends unknown[]>(
  ms: number,
  { concurrency = null }: Partial<ITimeoutHookOptions> = {}
): TimeoutHook<T> {
  const milliseconds = useMemo(() => clamp(ms, 100, Infinity), [ms]);
  const timerIds = useRef(new Set<NodeJS.Timeout | number>());
  const clear = useCallback((begin = 0, end = timerIds.current.size) => {
    const ids = Array.from(timerIds.current).slice(begin, end);

    for (const id of ids) {
      clearTimeout(id);
      timerIds.current.delete(id);
    }
  }, []);
  const schedule = useCallback(
    (fn: TimeoutHookTimerCallback<T>, ...args: T) => {
      if (concurrency !== null) {
        const overlapCount = timerIds.current.size - concurrency;

        if (overlapCount > 0) {
          clear(0, overlapCount);
        }
      }

      timerIds.current.add(setTimeout<T>(fn, milliseconds, ...args));
    },
    [milliseconds, clear, concurrency]
  );
  useEffect(() => {
    return () => clear();
  }, [clear]);
  return [schedule, clear];
}
// --- core/hooks/useWindowDimensions.ts ---
interface IVector2D {
  x: number;
  y: number;
}

// --- core/math/clamp.ts ---
/**
 * Clamps a number between a minimum and maximum value.
 *
 * @example
 * clamp(10, 5, 15) // 10
 * clamp(20, 5, 15) // 15
 * clamp(3, 5, 15) // 5
 * @param value - Value to be clamped.
 * @param min - Minimum value.
 * @param max - Maximum value.
 * @returns The clamped value.
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
// --- core/math/randomFloat.ts ---
/**
 * Returns a random floating-point number between min (inclusive) and max
 * (exclusive).
 *
 * @example
 * randomFloat(0, 1) // 0.5
 */
function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
// --- core/math/randomInteger.ts ---
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// --- core/modules/dialog/Dialog.tsx ---
interface IDialogProps extends RadixDialog.DialogProps {
  trigger?: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  onClose?(): void;
}

function Dialog({
  trigger,
  children,
  onClose,
  title,
  description,
  className,
  ...props
}: IDialogProps) {
  return (
    <RadixDialog.Root open defaultOpen {...props}>
      {trigger ? (
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      ) : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <RadixDialog.Content
          aria-describedby="dialog-content"
          className={classNames(
            "fixed",
            "left-1/2",
            "top-1/2",
            "z-50",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "xl:rounded-xl",
            "bg-white",
            "p-6",
            "shadow-lg",
            "dark:bg-zinc-900",
            "xl:w-[80vw]",
            "xl:h-[80vh]",
            "w-full",
            "h-full",
            "rounded-none",
            className
          )}
        >
          <div className="flex items-start justify-between mb-4">
            {title && (
              <RadixDialog.Title className="text-xl font-bold">
                {title}
              </RadixDialog.Title>
            )}
            <RadixDialog.Close asChild>
              <button
                className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
                aria-label="Close"
                type="button"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </RadixDialog.Close>
          </div>
          {description && (
            <RadixDialog.Description className="mb-4 text-sm text-zinc-500">
              {description}
            </RadixDialog.Description>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
// --- core/modules/dropdown/Dropdown.tsx ---
interface DropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | null;
  children: ReactNode;
}

function Dropdown({ label, children, className, ...props }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          {...props}
          type="button"
          aria-label={"Open dropdown menu"}
          className={classNames(
            className,
            ...style.input.classNames,
            "gap-2",
            "flex",
            "text-sm",
            "flex-row",
            "items-center"
          )}
        >
          <div className="flex-1">{label}</div>
          <div
            className={classNames(
              "p-1",
              "rounded-lg",
              "border-2",
              "border-[#777f93]",
              "text-[#777f93]"
            )}
          >
            <ChevronDownIcon className="w-3 h-3" />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          aria-label="Dropdown menu content"
          className={classNames(
            "min-w-[10rem]",
            "flex",
            "flex-col",
            "gap-2",
            "bg-white",
            "dark:bg-gray-800",
            "dark:text-white",
            "dark:border-gray-600",
            "border",
            "border-gray-200",
            "rounded-md shadow-md p-1 z-50"
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
// --- core/modules/form/FormGroup.tsx ---
interface IFormGroupProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  title: string;
  required?: boolean;
  errors?: ReadonlyArray<IFormGroupError> | null;
}

interface IFormGroupError {
  message: string;
}

function FormGroup({
  title,
  className,
  errors = null,
  children,
  required,
  ...props
}: IFormGroupProps) {
  return (
    <div
      className={classNames("flex", "gap-2", "flex-col", className)}
      {...props}
    >
      <div className="flex flex-row gap-1 flex-nowrap">
        {title}
        {required && <span className="text-red-500">*</span>}
      </div>
      <div className="flex-1">{children}</div>
      {errors !== null && errors.length > 0 ? (
        <div className="text-red-500 flex flex-col gap-2">
          {errors.map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
// --- core/shallowIsEqual.ts ---
/**
 * Checks whether two objects are equal by comparing their property values.
 * @example
 * shallowIsEqual({ foo: "bar" }, { foo: "bar" }) // true
 * shallowIsEqual({ foo: "bar" }, { bar: "foo" }) // false
 * shallowIsEqual({ foo: "bar", baz: "qux" }, { foo: "bar", baz: "qux" }) // true
 * shallowIsEqual({ foo: "bar", baz: "qux" }, { foo: "bar", baz: "quux" }) // false
 * @param a The first object to compare.
 * @param b The second object to compare.
 * @returns Whether the two objects are equal.
 */
function shallowIsEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);
  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (let i = 0; i < entriesA.length; i++) {
    const [keyA, valueA] = entriesA[i];
    const [keyB, valueB] = entriesB[i];

    if (keyA !== keyB) {
      return false;
    }
    if (!Object.is(valueA, valueB)) {
      return false;
    }
  }

  return true;
}
// --- DatePickerDropdown.tsx ---
// import "react-day-picker/dist/style.css";
interface IDatePickerDropdownProps extends Omit<DayPickerSingleProps, "mode"> {
  onChange: (date: Date | null) => void;
  value: Date | null;
}

function DatePickerDropdown({
  onChange,
  value,
  ...props
}: IDatePickerDropdownProps) {
  const onChangeDate = useCallback<SelectSingleEventHandler>(
    (date) => {
      onChange(date ?? null);
    },
    [onChange]
  );
  const dayPickerAdditionalProps = useMemo<
    DayPickerDefaultProps | DayPickerSingleProps
  >(
    () => ({
      modifiersClassNames: {
        // selected: "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white",
        // today: "font-bold text-blue-500",
      },
      classNames: {
        table: "w-full border-spacing-1",
        caption:
          "text-center mb-4 text-sm font-medium flex flex-row gap-2 items-center justify-between",
        head_cell: "text-xs text-zinc-500 dark:text-zinc-400 font-medium",
        day: classNames(
          "h-9",
          "w-9",
          "rounded-full",
          "flex",
          "items-center",
          "justify-center",
          "text-sm",
          "transition-colors",
          "hover:bg-zinc-100",
          "hover:text-black",
          "dark:hover:bg-zinc-700",
          "dark:hover:text-white"
        ),
        day_selected: classNames(
          "bg-blue-600",
          "text-white",
          "dark:bg-blue-500",
          "dark:text-white"
        ),
        day_today: classNames(
          "border",
          "border-blue-500",
          "dark:border-blue-400"
        ),
        nav_button: classNames(
          "text-zinc-600",
          "hover:text-black",
          "dark:text-zinc-400",
          "dark:hover:text-white"
        ),
      },
    }),
    []
  );
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={classNames(
            ...style.input.classNames,
            "flex",
            "flex-row",
            "gap-2",
            "items-center"
            // "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm",
            // "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700",
            // "border border-zinc-200 dark:border-zinc-600",
          )}
        >
          <CalendarDays className="w-4 h-4" />
          <div className="text-ellipsis overflow-hidden max-w-sm">
            {value ? format(value, "PPP") : "Select date"}
          </div>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className={classNames(
            "rounded-xl border bg-white p-4 shadow-lg z-50",
            "dark:bg-zinc-900 dark:border-zinc-700"
          )}
        >
          <DayPicker
            {...props}
            {...dayPickerAdditionalProps}
            mode="single"
            selected={value ?? undefined}
            onSelect={onChangeDate}
            className="text-zinc-800 dark:text-white"
          />
          <Popover.Arrow className="fill-white dark:fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
// --- DialogReportsHistory.tsx ---
function DialogReportsHistory({ ...props }: IDialogProps) {
  const reportsData = useRef(
    useSelector(
      ({
        waterConsumptionLocations,
        waterConsumptionKinds,
        waterConsumptionReports,
        waterConsumptionEndpoints,
      }) => ({
        locations: waterConsumptionLocations,
        kinds: waterConsumptionKinds,
        reports: waterConsumptionReports,
        endpoints: waterConsumptionEndpoints,
      }),
      shallowIsEqual
    )
  ).current;
  const reportsHistoryProps = useMemo(
    () => ({
      reports: Array.from(reportsData.reports.values()),
      endpoints: Array.from(reportsData.endpoints.values()),
      kinds: Array.from(reportsData.kinds.values()),
      locations: Array.from(reportsData.locations.values()),
    }),
    [reportsData]
  );
  return (
    <Dialog {...props} title="Reports history">
      <AppDialog.Body className="overflow-hidden h-full">
        <ReportsHistory {...reportsHistoryProps} />
      </AppDialog.Body>
    </Dialog>
  );
}
// --- DialogScheduleManagement.tsx ---
function DialogScheduleManagement({
  className,
  ...props
}: Omit<IDialogProps, "children">) {
  const schedules = useSelector(({ schedules }) => schedules);
  const forbiddenDateRanges = useMemo<
    ReadonlyArray<IScheduleFormForbiddenDateRange>
  >(
    () =>
      schedules.map((schedule) => ({
        scheduleId: schedule.id,
        start: schedule.range.start,
        end: schedule.range.end,
      })),
    [schedules]
  );
  const dispatch = useDispatch();
  const onSubmitSchedule = useCallback(
    (schedule: IWaterConsumptionSchedule) => {
      dispatch({
        type: ActionType.SetWaterConsumptionSchedules,
        payload: [schedule],
      });
    },
    [dispatch]
  );
  const [editSchedule, setEditSchedule] =
    useState<IWaterConsumptionSchedule | null>(null);
  const transformedSchedules = useMemo(
    () =>
      Array.from(schedules)
        .sort(
          (s1, s2) =>
            // Show newest first
            s2.range.start.getTime() - s1.range.start.getTime()
        )
        .map((schedule) => ({
          schedule,
          actions: {
            edit: () => {
              setEditSchedule(schedule);
            },
            setEnabled: (enabled: boolean) => {
              dispatch({
                type: ActionType.UpdateWaterConsumptionSchedule,
                payload: {
                  id: schedule.id,
                  enabled,
                },
              });
            },

            delete: () => {
              dispatch({
                type: ActionType.DeleteWaterConsumptionSchedule,
                payload: schedule.id,
              });
            },
          },
        })),
    [schedules, setEditSchedule, dispatch]
  );
  const tableRowClassNames = classNames(
    "flex-auto",
    "flex",
    "flex-col",
    "justify-center",
    "gap-2",
    "xl:gap-4"
  );
  return (
    <Dialog
      title="Scheduling"
      className={classNames(
        className,
        "overflow-x-hidden",
        "overflow-y-auto",
        "xl:overflow-y-hidden"
      )}
      {...props}
    >
      <AppDialog.Body
        className={classNames(
          "flex",
          "flex-col",
          "gap-8",
          "xl:h-full",
          "xl:flex-row",
          "xl:gap-4"
        )}
      >
        <div
          className={classNames(
            "xl:pr-4",
            "xl:w-[30%]",
            "xl:overflow-y-auto",
            "xl:overflow-x-hidden"
          )}
        >
          <NewScheduleForm
            forbiddenDateRanges={forbiddenDateRanges}
            value={editSchedule}
            onSubmit={onSubmitSchedule}
          />
        </div>

        <div
          className={classNames(
            "xl:flex-1",
            "flex-auto",
            "w-full",
            "flex-col",
            "flex",
            "items-center",
            "xl:gap-4",
            "gap-2",
            "xl:overflow-y-auto"
          )}
        >
          {transformedSchedules.length === 0 ? (
            <>
              <div
                className={classNames(
                  "text-gray-500",
                  "p-4",
                  "text-center",
                  "bg-gray-400",
                  "dark:bg-gray-700",
                  "dark:text-gray-300",
                  "rounded-md",
                  "border",
                  "border-gray-300",
                  "dark:border-gray-600"
                )}
              >
                No schedules available yet.
              </div>
            </>
          ) : (
            transformedSchedules.map(({ schedule: s, actions }) => (
              <div
                className={classNames(
                  "flex",
                  "flex-col",
                  "gap-6",
                  "xl:flex-row",
                  "w-full",
                  "border",
                  "overflow-x-auto",
                  "border-gray-300",
                  "dark:border-gray-600",
                  "p-4",
                  "rounded-md"
                )}
                key={s.id}
              >
                <div className={classNames("flex items-center")}>
                  <Checkbox checked={s.enabled} onChange={actions.setEnabled} />
                </div>
                <div className={classNames(tableRowClassNames, "font-bold")}>
                  {s.title}
                </div>
                {s.days.length > 0 ? (
                  <div className={classNames(tableRowClassNames)}>
                    {s.days.join(", ")}
                  </div>
                ) : (
                  <div className={classNames(tableRowClassNames, "font-bold")}>
                    Everyday
                  </div>
                )}
                <div className={tableRowClassNames}>
                  {DateTime.fromJSDate(s.range.start).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}{" "}
                  -{" "}
                  {DateTime.fromJSDate(s.range.end).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                </div>
                <div
                  className={classNames("flex", "flex-row", "gap-2", "text-sm")}
                >
                  <AppDialog.Button type="button" onClick={actions.edit}>
                    <PencilIcon />
                  </AppDialog.Button>
                  <AppDialog.Button type="button" onClick={actions.delete}>
                    <DeleteIcon />
                  </AppDialog.Button>
                </div>
              </div>
            ))
          )}
        </div>
      </AppDialog.Body>
    </Dialog>
  );
}
// --- DialogSettings.tsx ---
function DialogSettings({ ...props }: IDialogProps) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const setUser = useCallback(
    (changes: Partial<IUser>) => {
      if (user === null) {
        return;
      }
      dispatch({
        type: ActionType.SetUser,
        payload: {
          ...user,
          ...changes,
        },
      });
    },
    [dispatch, user]
  );
  const onChangeFirstName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) =>
      setUser({
        firstName: e.target.value,
      }),
    [setUser]
  );
  const onChangeLastName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) =>
      setUser({
        lastName: e.target.value,
      }),
    [setUser]
  );
  const onChangeAssistantTips = useCallback(
    (assistantTips: boolean) => setUser({ assistantTips }),
    [setUser]
  );
  if (user === null) {
    return null;
  }

  return (
    <Dialog {...props} className="gap-2 flex flex-col">
      <FormGroup title="First name">
        <Input value={user.firstName} onChange={onChangeFirstName} />
      </FormGroup>
      <FormGroup title="Last name">
        <Input value={user.lastName} onChange={onChangeLastName} />
      </FormGroup>
      <FormGroup title="Assistant tips">
        <Checkbox
          checked={user.assistantTips}
          onChange={onChangeAssistantTips}
        />
      </FormGroup>
    </Dialog>
  );
}
// --- GenerateInitialReports.tsx ---
/**
 * A React component that generates random reports once and then calls the onFinished callback.
 *
 * The component will first get the current state of the water consumption endpoints, kinds, and locations
 * and then generate a new array of reports using the generateRandomWaterConsumptionReports function.
 * The generated reports will then be dispatched to the Redux store.
 *
 * The component will only generate the reports once, when it is first mounted.
 *
 * @param onFinished {() => void} A callback that will be called when the reports have been generated and added to the Redux store.
 */
function GenerateInitialReports({ onFinished }: { onFinished: () => void }) {
  const dispatch = useDispatch();
  const appState = useSelector(
    ({
      waterConsumptionEndpoints,
      waterConsumptionKinds,
      waterConsumptionLocations,
    }) => ({
      waterConsumptionEndpoints,
      waterConsumptionKinds,
      waterConsumptionLocations,
    }),
    shallowIsEqual
  );
  const scheduleGenerateReports = useCallback(() => {
    dispatch({
      type: ActionType.SetWaterConsumptionReports,
      payload: generateRandomWaterConsumptionReports(appState),
    });
  }, [dispatch, appState]);
  useEffect(() => {
    scheduleGenerateReports();
    onFinished();
  }, [scheduleGenerateReports, onFinished]);
  return null;
}
// --- generateRandomWaterConsumptionReports.ts ---
/**
 * Generates an array of random water consumption reports based on the
 * provided parts of the application state.
 *
 * The generated reports have the following properties:
 * - id: a random UUID
 * - date: a date between the start of the current year plus 6 months and the
 *   end of the current year
 * - items: an array of 20 items, each with the following properties:
 *   - kindId: the ID of a random water consumption kind
 *   - consumption: a random value between 10 and 1000 liters
 *   - locationId: the ID of a random water consumption location
 *   - endpointId: the ID of a random water consumption endpoint
 * - temperature: the maximum temperature setting in the application
 *   configuration
 * - pressure: the maximum pressure setting in the application configuration
 * - mineralization: the maximum mineralization setting in the application
 *   configuration
 *
 * @param {{
 *   waterConsumptionEndpoints: ReadonlyMap<string, IWaterConsumptionEndpoint>,
 *   waterConsumptionKinds: ReadonlyMap<string, IWaterConsumptionKind>,
 *   waterConsumptionLocations: ReadonlyMap<string, IWaterConsumptionLocation>,
 * }} options
 * @returns {IWaterConsumptionReport[]}
 */
function generateRandomWaterConsumptionReports({
  waterConsumptionEndpoints,
  waterConsumptionKinds,
  waterConsumptionLocations,
}: Pick<
  IAppState,
  | "waterConsumptionEndpoints"
  | "waterConsumptionKinds"
  | "waterConsumptionLocations"
>): ReadonlyArray<IWaterConsumptionReport> {
  const generatedReports = new Array<IWaterConsumptionReport>();
  const startDate = DateTime.now().startOf("year");
  const endDate = DateTime.now().endOf("year");
  const variationRate = 1;
  {
    let currentDate = startDate;
    const kinds = Array.from(waterConsumptionKinds.values());
    const locations = Array.from(waterConsumptionLocations.values());
    const endpoints = Array.from(waterConsumptionEndpoints.values());
    const duration = endDate.diff(startDate);
    const durationUnit: DurationUnit = "days";
    const dayCount = duration.as(durationUnit);

    let initialTemperature = randomInteger(
      defaultAppConfiguration.temperature.minimum,
      defaultAppConfiguration.temperature.maximum
    );
    let initialPressure = randomInteger(
      defaultAppConfiguration.pressure.minimum,
      defaultAppConfiguration.pressure.maximum
    );
    let initialMineralization = randomInteger(
      defaultAppConfiguration.mineralization.minimum,
      defaultAppConfiguration.mineralization.maximum
    );

    for (let i = 0; i < dayCount; i++) {
      const items = new Array<IWaterConsumptionReportItem>();
      const report: IWaterConsumptionReport = {
        id: crypto.randomUUID(),
        date: currentDate.toJSDate(),
        items,
        temperature: initialTemperature,
        pressure: initialPressure,
        mineralization: initialMineralization,
      };

      for (let i = 0; i < 8; i++) {
        const kind = kinds[randomInteger(0, waterConsumptionKinds.size - 1)];
        const location =
          locations[randomInteger(0, waterConsumptionLocations.size - 1)];
        const endpoint =
          endpoints[randomInteger(0, waterConsumptionEndpoints.size - 1)];

        items.push({
          kindId: kind.id,
          consumption: randomFloat(10, 100) * 1000,
          locationId: location.id,
          endpointId: endpoint.id,
        });
      }

      generatedReports.push(report);

      currentDate = currentDate.plus({ [durationUnit]: 1 });

      // Create small variations for temperature, pressure, and mineralization
      initialTemperature = randomInteger(
        initialTemperature - variationRate,
        initialTemperature + variationRate
      );
      initialPressure = randomInteger(
        initialPressure - variationRate,
        initialPressure + variationRate
      );
      initialMineralization = randomInteger(
        initialMineralization - variationRate,
        initialMineralization + variationRate
      );
    }
  }

  return generatedReports;
}
// --- hooks/usePersistedTab.ts ---
type UsePersistedTabHookResult = [
  NavigationBarTab | null,
  (newTabId: NavigationBarTab | null) => void
];

function usePersistedTab(): UsePersistedTabHookResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabId = useMemo(() => {
    let tabId: NavigationBarTab | null;

    switch (searchParams.get("tab")) {
      case NavigationBarTab.Automation:
        tabId = NavigationBarTab.Automation;
        break;
      default:
        tabId = null;
    }

    return tabId;
  }, [searchParams]);
  const persistTabId = useDebounce(
    useCallback(
      (tabId: NavigationBarTab | null) => {
        if (tabId === null) {
          router.push(pathname);
          return;
        }

        router.push(`${pathname}?tab=${tabId}`);
      },
      [router, pathname]
    ),
    0
  );
  return useMemo(() => [tabId, persistTabId], [tabId, persistTabId]);
}
// --- hooks/useWeekDays.ts ---
function useWeekDays() {
  const weekDays = useRef<ReadonlyArray<WeekDay>>([
    WeekDay.Sunday,
    WeekDay.Monday,
    WeekDay.Tuesday,
    WeekDay.Wednesday,
    WeekDay.Thursday,
    WeekDay.Friday,
    WeekDay.Saturday,
  ]);
  return weekDays.current;
}
// --- index.tsx ---
const inter = Inter({
  subsets: ["latin"],
});

export default function App() {
  const store = useRef(configureStore());
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(
    null
  );
  const [tabId, setTabId] = usePersistedTab();
  const tabContents = useMemo(() => {
    const className = classNames("p-10");

    switch (tabId) {
      case NavigationBarTab.Automation:
        return <Automation className={className} />;
    }

    return (
      <Home
        className={className}
        selectedEndpointId={selectedEndpointId}
        setSelectedEndpointId={setSelectedEndpointId}
      />
    );
  }, [tabId, selectedEndpointId, setSelectedEndpointId]);
  return (
    <Dynamic>
      <Provider store={store.current}>
        <PeriodicUpdate />
        <div
          className={classNames(
            inter.className,
            ...style.appContainer.bg.classNames,
            "overflow-x-hidden",
            "flex",
            "flex-col",
            "xl:flex-row",
            "h-screen",
            "w-screen"
          )}
        >
          <NavigationBar
            onChangeTab={setTabId}
            tab={tabId}
            className={classNames("xl:w-16", "xl:h-full", "w-full")}
          />
          {tabContents}
        </div>
      </Provider>
    </Dynamic>
  );
}
// --- Input.tsx ---
const Input = memo(
  forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    function Input({ className, ...props }, ref) {
      return (
        <input
          ref={ref}
          className={classNames(...style.input.classNames, className)}
          {...props}
        />
      );
    }
  )
);
// --- InputRange.tsx ---
interface IInputRangeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  value: number;
  steps?: number;
  min?: number;
  max?: number;
  onChange(value: number): void;
}

interface IVector2D {
  x: number;
  y: number;
}

interface IDraggingState {
  screenX: number;
  screenY: number;
  delta: IVector2D | null;
}

const InputRange = memo(function InputRange({
  className,
  onChange,
  value,
  min = 0,
  max = 100,
  steps = 1,
  ...props
}: IInputRangeProps) {
  const draggingStateRef = useRef<IDraggingState | null>(null);

  const [internalValue, setInternalValue] = useState(value);

  const progressIndicatorStyle = useMemo(
    () => ({
      height: `${(internalValue / max) * 100}%`,
      backgroundColor: style.colors.green,
    }),
    [internalValue, max]
  );

  const onStartDrag = useCallback<PointerEventHandler<HTMLDivElement>>((e) => {
    if (draggingStateRef.current !== null) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    draggingStateRef.current = {
      screenX: e.screenX,
      screenY: e.screenY,
      delta: null,
    };
  }, []);

  const onDrag = useCallback<PointerEventHandler<HTMLDivElement>>(
    (e) => {
      const oldDraggingState = draggingStateRef.current;

      if (oldDraggingState === null) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const { screenY, screenX } = e;

      const newDraggingState = {
        ...oldDraggingState,
        screenX: screenX,
        screenY: screenY,
        delta: {
          x: oldDraggingState.screenX - screenX,
          y: oldDraggingState.screenY - screenY,
        },
      };

      // Update dragging state
      draggingStateRef.current = newDraggingState;

      const delta = newDraggingState.delta.y * steps;

      setInternalValue((oldInternalValue) =>
        clamp(oldInternalValue + delta, min, max)
      );
    },
    [setInternalValue, steps, max, min]
  );

  const updateParent = useCallback(
    (value: number) => {
      onChange(value);
    },
    [onChange]
  );

  const debounceParentUpdate = useDebounce(updateParent, 0);

  const onEndDrag = useCallback<PointerEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      draggingStateRef.current = null;
      debounceParentUpdate(internalValue);
    },
    [debounceParentUpdate, internalValue]
  );

  const debounceUpdateInternalValue = useDebounce(setInternalValue, 0);

  useEffect(() => {
    debounceUpdateInternalValue(value);
  }, [debounceUpdateInternalValue, value]);

  return (
    <div
      className={classNames(
        "rounded-full",
        "h-[16rem]",
        "w-16",
        "flex",
        "flex-col",
        "justify-end",
        "overflow-hidden",
        // "xl:h-full",
        "xl:w-16",
        "bg-[#eff3f8]",
        "dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div
        style={progressIndicatorStyle}
        className={classNames(
          "w-auto",
          "flex",
          "flex-col",
          "xl:w-full",
          "items-center",
          "rounded-full",
          "p-4",
          `bg-[${style.colors.green}]`
        )}
      >
        <div
          onPointerDown={onStartDrag}
          onPointerMove={onDrag}
          onPointerUp={onEndDrag}
          onPointerCancel={onEndDrag}
          onPointerLeave={onEndDrag}
          className={classNames(
            "p-2",
            "bg-gray-100",
            "dark:bg-gray-600",
            "bg-opacity-70",
            "rounded-md",
            "cursor-pointer"
          )}
        >
          <MenuIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});
// --- Logo.tsx ---
function Logo({ className, ...props }: SVGAttributes<SVGSVGElement>) {
  const pathClassNames = "fill-white dark:fill-gray-800";
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className)}
      fill="none"
      {...props}
    >
      <path
        d="M50 10
              A40 40 0 0 1 90 50
              L82 50
              A32 32 0 0 0 50 18
              Z"
        className={pathClassNames}
      />
      <path
        d="M90 50
              A40 40 0 0 1 50 90
              A40 40 0 0 1 10 50
              A40 40 0 0 1 50 10
              L50 18
              A32 32 0 0 0 18 50
              A32 32 0 0 0 50 82
              A32 32 0 0 0 82 50
              L90 50
              Z"
        className={pathClassNames}
      />

      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="34"
        fontFamily="Inter"
        fill="#9cc4f0"
        fontWeight="bold"
      >
        B
      </text>
    </svg>
  );
}
// --- millilitersToLiters.ts ---
function millilitersToLiters(milliliters: number) {
  return milliliters / 1000;
}
// --- modules/layout/AppSidebar.tsx ---
function AppSidebar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const waterConsumptionReports = useSelector(
    ({ waterConsumptionReports }) => waterConsumptionReports
  );
  const todayWaterReports = useMemo(() => {
    return filterWaterConsumptionReportByDateRange(
      { waterConsumptionReports },
      DateTime.now().startOf("day"),
      DateTime.now().endOf("day")
    );
  }, [waterConsumptionReports]);
  const todayWaterConsumption = useMemo(
    () =>
      todayWaterReports.reduce(
        (total, report) =>
          total + report.items.reduce((sum, item) => sum + item.consumption, 0),
        0
      ),
    [todayWaterReports]
  );
  const expectedDailyMaxPerPerson = 1000 * 1000;
  const todayAverageConsumption = useMemo(
    () => todayWaterConsumption / todayWaterReports.length,
    [todayWaterConsumption, todayWaterReports.length]
  );
  return (
    <div
      {...props}
      className={classNames(
        "xl:h-screen",
        "bg-[#e3eef3]",
        "dark:bg-gray-800",
        "xl:w-80",
        "w-full",
        "flex",
        "gap-4",
        "p-4",
        "xl:overflow-y-auto",
        className
      )}
    >
      <UserProfileInformation />

      <img
        alt="Blue avatar holding the Earth planet in his hand."
        className={classNames(
          // Mirror horizontally
          "transform",
          "scale-x-[-1]"
        )}
        src="https://i.postimg.cc/Bn4hRTd8/image.png"
      />

      <div
        className={classNames(
          "gap-4",
          "flex",
          "bg-[#eff3f8]",
          "dark:bg-gray-600",
          "p-8",
          "rounded-lg",
          "xl:items-center",
          "flex-col",
          "xl:flex-row"
        )}
      >
        <div
          className={classNames(
            "w-16",
            "xl:h-16",
            "xl:w-auto",
            "h-auto",
            "p-4",
            "bg-white",
            "dark:bg-gray-700",
            "rounded-xl"
          )}
        >
          <img
            src="https://i.postimg.cc/jC0JBh2L/image.png"
            alt="Faucet"
            // className={classNames("w-full", "xl:w-auto", "h-full", "xl:h-auto")}
            className={classNames("h-full")}
          />
        </div>
        <div className="flex-1">
          Turning off the tap while you brush your teeth can save up to 36
          liters of water per day.
        </div>
      </div>

      <Card>
        <Card.Title>
          <Card.Title.Icon>
            <UsersRoundIcon />
          </Card.Title.Icon>
          Water consumed by a family now
        </Card.Title>
        <Card.Body className="flex">
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-gray-400">This day</div>
            <div>
              {Math.floor(millilitersToLiters(todayWaterConsumption) / 1000)} m3
            </div>
            <RangeHorizontalIndicator
              min={0}
              max={expectedDailyMaxPerPerson}
              value={todayAverageConsumption}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row flex-1">
              <AvatarOliver className={classNames("w-12", "h-12")} />
              <AvatarSophia className={classNames("w-12", "h-12")} />
            </div>
            <div className="flex flex-row flex-1">
              <AvatarDestiny className={classNames("w-12", "h-12")} />
              <AvatarAidan className={classNames("w-12", "h-12")} />
            </div>
          </div>
        </Card.Body>
      </Card>

      <CardWaterSavingStatus />
    </div>
  );
}
// --- modules/sideBar/components/CardWaterSavingStatus.tsx ---
function CardWaterSavingStatus({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [waterSaving, setWaterSaving] = useState(false);
  return (
    <Card className={classNames(className)} {...props}>
      <Card.Title>Water Alert</Card.Title>
      <Card.Body className="items-center flex gap-4">
        <div className="flex-1">Enable auto water saving mode.</div>
        <div>
          <Checkbox checked={waterSaving} onChange={setWaterSaving} />
        </div>
      </Card.Body>
    </Card>
  );
}
// --- modules/sideBar/components/UserProfileInformation.tsx ---
function UserProfileInformation({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const user = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.now());
  const formatCurrentTime = useCallback(() => {
    setCurrentTime(() => DateTime.now());
  }, [setCurrentTime]);
  useInterval(formatCurrentTime, 1000 / 2);
  if (user === null) {
    return null;
  }

  return (
    <div
      className={classNames(className, "flex", "flex-row", "gap-4")}
      {...props}
    >
      <div
        className={classNames(
          "w-16",
          "h-16",
          "overflow-hidden",
          "rounded-xl",
          "bg-[#f5f8f7]",
          "dark:bg-gray-600"
        )}
      >
        <AvatarRyan className="w-16 h-16" />
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="text-md">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex flex-row gap-2 text-sm">
          <div>{currentTime.toLocaleString(DateTime.TIME_SIMPLE)}</div>
          <div className="text-gray-500">
            {currentTime.toLocaleString(DateTime.DATE_MED)}
          </div>
        </div>
      </div>
    </div>
  );
}
// --- NavigationBar.tsx ---
enum NavigationBarTab {
  Automation = "automation",
}

interface INavigationBarProps extends HTMLAttributes<HTMLDivElement> {
  tab: NavigationBarTab | null;
  onChangeTab(tab: NavigationBarTab | null): void;
}

const NavigationBar = memo(
  forwardRef<HTMLDivElement, INavigationBarProps>(function NavigationBar(
    { onChangeTab, className, ...props },
    ref
  ) {
    type DialogName = "schedule" | "reportsHistory" | "settings";
    const [dialog, setDialog] = useState<DialogName | null>(null);
    const openDialog = useCallback(
      (newDialogName: DialogName) =>
        setDialog((currentDialogName) =>
          currentDialogName === newDialogName ? null : newDialogName
        ),
      [setDialog]
    );
    const openScheduleDialog = useCallback(
      () => openDialog("schedule"),
      [openDialog]
    );
    const navItems = useMemo(
      () => [
        {
          icon: <HomeIcon />,
          label: "Home",
          onClick: () => {
            onChangeTab(null);
          },
        },
        {
          icon: <CalendarDaysIcon />,
          label: "Calendar",
          onClick: openScheduleDialog,
        },
        {
          icon: <BarChart2Icon />,
          label: "Reports",
          onClick: () => setDialog("reportsHistory"),
        },
        {
          icon: <RepeatIcon />,
          label: "Automation",
          onClick: () => onChangeTab(NavigationBarTab.Automation),
        },
        null,
        {
          icon: <SettingsIcon />,
          label: "Settings",
          onClick: () => setDialog("settings"),
        },
      ],
      [openScheduleDialog, onChangeTab, setDialog]
    );

    const closeDialog = useCallback(() => {
      setDialog(null);
    }, [setDialog]);

    const dialogContents = useMemo(() => {
      switch (dialog) {
        case "schedule":
          return <DialogScheduleManagement onClose={closeDialog} />;
        case "reportsHistory":
          return <DialogReportsHistory onClose={closeDialog} />;
        case "settings":
          return <DialogSettings onClose={closeDialog} />;
      }
      return null;
    }, [dialog, closeDialog]);

    return (
      <>
        {dialogContents}
        <div
          className={classNames(
            className,
            "p-4",
            "flex",
            "flex-row",
            "xl:flex-col",
            "bg-[#080808]",
            "text-white",
            "items-center"
          )}
          ref={ref}
          {...props}
        >
          <div className="xl:mb-6 mr-6 xl:mr-0">
            <Logo className="w-10 h-10" />
          </div>
          {navItems.map((item, index) =>
            item === null ? (
              <div key={index} className="flex-1" />
            ) : (
              <NavigationBarButton onClick={item.onClick} key={index}>
                {item.icon}
              </NavigationBarButton>
            )
          )}
        </div>
      </>
    );
  })
);
// --- NavigationBarButton.tsx ---
interface INavigationBarButtonProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const NavigationBarButton = memo(
  forwardRef<HTMLDivElement, INavigationBarButtonProps>(
    function NavigationBarButton({ active = false, className, ...props }, ref) {
      return (
        <div
          ref={ref}
          className={classNames(
            {
              "bg-[#282828]": active,
            },
            "hover:bg-[#282828]",
            "rounded-lg",
            "h-12",
            "w-12",
            "cursor-pointer",
            "bg-[#080808]",
            "last:mr-0",
            "mr-2",

            // Align button icon in the middle
            "flex",
            "justify-center",
            "items-center",

            "last:xl:mb-0",
            "xl:mr-0",
            "xl:mb-2",
            className
          )}
          {...props}
        />
      );
    }
  )
);
// --- NewScheduleForm.tsx ---
interface IScheduleFormInputWaterConsumptionSchedule
  extends Omit<IWaterConsumptionSchedule, "endpointId" | "range" | "id"> {
  endpointId: string | null;
  range: {
    start: Date | null;
    end: Date | null;
  };
}

interface IScheduleFormForbiddenDateRange extends IDateRange {
  scheduleId: string;
}

interface INewScheduleFormProps {
  value?: IWaterConsumptionSchedule | null;
  forbiddenDateRanges?: ReadonlyArray<IScheduleFormForbiddenDateRange> | null;
  onSubmit: (schedule: IWaterConsumptionSchedule) => void;
}

enum ScheduleFormField {
  Title,
  Range,
  Endpoint,
}

interface IScheduleFormError extends IFormGroupError {
  field: ScheduleFormField;
}

interface IScheduleFormErrors {
  title: ReadonlyArray<IScheduleFormError>;
  range: ReadonlyArray<IScheduleFormError>;
  endpoint: ReadonlyArray<IScheduleFormError>;
}

function NewScheduleForm({
  onSubmit,
  value = null,
  forbiddenDateRanges = null,
}: INewScheduleFormProps) {
  const initialData = useRef<IScheduleFormInputWaterConsumptionSchedule>(
    Object.freeze(
      Object.seal({
        title: "",
        days: [],
        range: {
          start: null,
          end: null,
        },
        enabled: false,
        endpointId: null,
      })
    )
  );
  const [schedule, setSchedule] = useState<
    | Readonly<IScheduleFormInputWaterConsumptionSchedule>
    | Readonly<IWaterConsumptionSchedule>
  >(initialData.current);
  const [showErrors, setShowErrors] = useState(false);
  const clock = useClock();
  useEffect(() => {
    if (value !== null) {
      setSchedule(value);
    }
  }, [value, setSchedule]);
  const errors = useMemo<IScheduleFormErrors | null>(() => {
    const title = new Array<IScheduleFormError>();
    const range = new Array<IScheduleFormError>();
    const endpoint = new Array<IScheduleFormError>();
    const newErrors: IScheduleFormErrors = {
      title,
      range,
      endpoint,
    };

    if (schedule.range.start === null || schedule.range.end === null) {
      range.push({
        field: ScheduleFormField.Range,
        message: "Please select a start and an end date for the schedule",
      });
    } else {
      if (schedule.range.start.getTime() > schedule.range.end.getTime()) {
        range.push({
          field: ScheduleFormField.Range,
          message: "The start date must be before the end date",
        });
      } else if (schedule.range.start.getTime() < clock.toMillis()) {
        range.push({
          field: ScheduleFormField.Range,
          message: "The start date must be in the future",
        });
      } else if (forbiddenDateRanges !== null) {
        for (const r of forbiddenDateRanges) {
          /**
           * Do not validate against the current schedule. Otherwise, we will
           * not be able to update a schedule if the dates do not change as it'll
           * be in constant overlap with its own date range.
           */
          if ("id" in schedule && r.scheduleId === schedule.id) {
            continue;
          }
          if (
            schedule.range.start.getTime() <= r.end.getTime() &&
            schedule.range.end.getTime() >= r.start.getTime()
          ) {
            range.push({
              field: ScheduleFormField.Range,
              message: "The schedule conflicts with an existing schedule",
            });
            break;
          }
        }
      }
    }

    if (schedule.endpointId === null) {
      endpoint.push({
        field: ScheduleFormField.Endpoint,
        message: "Please select an endpoint",
      });
    }

    if (schedule.title.trim().length < 3) {
      title.push({
        field: ScheduleFormField.Title,
        message: "Title must be at least 3 characters long",
      });
    }

    const hasErrors = [title, range, endpoint].some(
      (errors) => errors.length > 0
    );

    if (!hasErrors) {
      return null;
    }

    return newErrors;
  }, [schedule, forbiddenDateRanges, clock]);
  const updateInputSchedule = useCallback(
    (
      newSchedule:
        | Partial<IScheduleFormInputWaterConsumptionSchedule>
        | ((
            s: IScheduleFormInputWaterConsumptionSchedule
          ) => Partial<IScheduleFormInputWaterConsumptionSchedule>)
    ) => {
      setSchedule((s) => ({
        ...s,
        ...(typeof newSchedule === "function" ? newSchedule(s) : newSchedule),
      }));
    },
    [setSchedule]
  );
  const createNewSchedule = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      setShowErrors(true);

      if (errors !== null) {
        return;
      }

      const { range, endpointId } = schedule;

      if (endpointId === null) {
        return;
      }

      if (range.end === null || range.start === null) {
        return;
      }

      let newSchedule = {
        ...schedule,
        range: { start: range.start, end: range.end },
        endpointId,
      };

      if (!("id" in newSchedule)) {
        newSchedule = {
          ...newSchedule,
          id: crypto.randomUUID(),
        };
      }

      // Submit the ready-to-use schedule
      onSubmit(newSchedule);

      // Reset the form
      updateInputSchedule(initialData.current);

      // Hide errors
      setShowErrors(false);
    },
    [schedule, errors, setShowErrors, onSubmit, updateInputSchedule]
  );
  const onChangeTitle = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      updateInputSchedule({ title: e.target.value });
    },
    [updateInputSchedule]
  );
  const onChangeEnabled = useCallback<Dispatch<boolean>>(
    (enabled) => {
      updateInputSchedule({ enabled });
    },
    [updateInputSchedule]
  );
  const onChangeWeekDay = useCallback(
    (weekDay: WeekDay, checked: boolean) => {
      updateInputSchedule((s) => ({
        days: checked
          ? [...s.days, weekDay]
          : s.days.filter((d) => d !== weekDay),
      }));
    },
    [updateInputSchedule]
  );
  const onChangeStartDate = useCallback(
    (start: Date | null) => {
      updateInputSchedule((s) => ({
        range: {
          ...s.range,
          start,
        },
      }));
    },
    [updateInputSchedule]
  );
  const onChangeEndDate = useCallback(
    (end: Date | null) => {
      updateInputSchedule((s) => ({
        range: {
          ...s.range,
          end,
        },
      }));
    },
    [updateInputSchedule]
  );
  const onChangeEndpointId = useCallback(
    (endpointId: string | null) => {
      updateInputSchedule({ endpointId });
    },
    [updateInputSchedule]
  );
  const endpoints = useSelector((state) => state.waterConsumptionEndpoints);
  const weekDays = useWeekDays();
  const weekDayInputList = useMemo(
    () => (
      <div className="flex flex-row flex-wrap gap-2">
        {weekDays.map((weekDay) => {
          const onChange = (checked: boolean) =>
            onChangeWeekDay(weekDay, checked);
          return (
            <div key={weekDay} className="flex items-center flex-row gap-2">
              <Checkbox
                checked={schedule.days.includes(weekDay)}
                onChange={onChange}
              />
              {weekDay}
            </div>
          );
        })}
      </div>
    ),
    [schedule.days, weekDays, onChangeWeekDay]
  );
  const endpointSelectOptions = useMemo(
    () =>
      Array.from(endpoints.values()).map((endpoint) => ({
        value: endpoint.id,
        label: endpoint.title,
      })),
    [endpoints]
  );
  const formGroupErrors = showErrors ? errors : null;
  return (
    <>
      {
        <form
          aria-label="New schedule form"
          className="flex flex-col xl:gap-4 gap-2"
          onSubmit={createNewSchedule}
        >
          <FormGroup
            errors={formGroupErrors?.title ?? null}
            required
            aria-required
            title="Title"
          >
            <Input
              required
              type="text"
              placeholder="Title"
              aria-label="Title of the schedule"
              name="title"
              onChange={onChangeTitle}
              value={schedule.title}
            />
          </FormGroup>
          <FormGroup
            errors={formGroupErrors?.endpoint ?? null}
            required
            aria-required
            title="Endpoint"
          >
            <Select
              className="min-w-[10rem]"
              aria-label="Endpoint that we are targetting"
              value={schedule.endpointId}
              onChange={onChangeEndpointId}
              options={endpointSelectOptions}
            />
          </FormGroup>
          <FormGroup
            aria-label={
              "Days of the week that the schedule is active. " +
              "If no days are selected, " +
              "the schedule will be active every week day"
            }
            title="Weekdays"
          >
            {weekDayInputList}
          </FormGroup>

          <div className={classNames("flex xl:flex-row gap-2", "flex-col")}>
            <FormGroup
              errors={formGroupErrors?.range ?? null}
              required
              aria-required
              title="Date Range"
            >
              <div className="flex flex-col gap-2">
                <div className="flex xl:flex-row flex-col gap-2">
                  <DatePickerDropdown
                    required
                    value={schedule.range.start}
                    onChange={onChangeStartDate}
                  />
                  <DatePickerDropdown
                    required
                    value={schedule.range.end}
                    onChange={onChangeEndDate}
                  />
                </div>
              </div>
            </FormGroup>

            <FormGroup
              aria-label="Whether the schedule is enabled or not"
              aria-checked={schedule.enabled}
              title="Enabled"
            >
              <Checkbox
                aria-checked={schedule.enabled}
                checked={schedule.enabled}
                onChange={onChangeEnabled}
              />
            </FormGroup>
          </div>

          <AppDialog.Button type="submit">
            {"id" in schedule ? "Update" : "Create"}
          </AppDialog.Button>
        </form>
      }
    </>
  );
}

// --- pages/Automation.tsx ---
function Automation({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  interface ICard {
    id: string;
    title: string;
    description: string;
    icon: JSX.Element;
    checked: boolean;
    onClick: Dispatch<boolean>;
  }

  const automation = useSelector(
    ({ configuration: { automation } }) => automation
  );
  const dispatch = useDispatch();
  const updateAutomationSettings = useCallback(
    (settings: Partial<IAppAutomationSettings>) => {
      dispatch({
        type: ActionType.UpdateConfiguration,
        payload: {
          automation: {
            ...automation,
            ...settings,
          },
        },
      });
    },
    [dispatch, automation]
  );
  const cards = useMemo(
    (): ICard[] => [
      {
        id: "turnOffIdleTaps",
        title: "Turn off when no motion",
        description: "Turn off the taps when there is no motion",
        icon: <FaucetIcon />,
        checked: automation.turnOffIdleTaps,
        onClick: (checked) =>
          updateAutomationSettings({
            turnOffIdleTaps: checked,
          }),
      },
      {
        id: "irrigationSchedule",
        title: "Irrigation Schedule",
        description: "Schedule irrigation based on the weather",
        icon: <CalendarIcon />,
        checked: automation.irrigationSchedule,
        onClick: (checked) =>
          updateAutomationSettings({
            irrigationSchedule: checked,
          }),
      },
      {
        id: "smartNotifications",
        title: "Smart Notifications",
        description: "Receive alerts when unusual water usage is detected.",
        icon: <BellIcon />,
        checked: automation.smartNotifications,
        onClick: (checked) =>
          updateAutomationSettings({
            smartNotifications: checked,
          }),
      },
    ],
    [automation, updateAutomationSettings]
  );
  return (
    <Section title="Automation" className={className} {...props}>
      <div>
        This section will allow users to automate water-saving actions such as
        turning off taps, scheduling irrigation based on weather, or receiving
        smart notifications.
      </div>

      <div
        className={classNames(
          "flex",
          "xl:flex-row",
          "xl:flex-wrap",
          "flex-col",
          ...style.card.spacing.classNames
        )}
      >
        {cards.map((card) => (
          <Card key={card.id} className="xl:flex-1 w-full">
            <Card.Title>
              {card.icon}
              {card.title}
            </Card.Title>
            <Card.Body>
              {card.description}
              <Checkbox
                className="self-end"
                checked={card.checked}
                onChange={card.onClick}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </Section>
  );
}
// --- pages/automation/icons/FaucetIcon.tsx ---
const FaucetIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function FaucetIcon({ className, ...props }, ref) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={classNames(
          "lucide lucide-faucet-icon lucide-faucet",
          className
        )}
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
      >
        <path d="M10.22 4.9 5.4 6H5a2 2 0 0 1 0-4h.4l4.86 1"></path>
        <circle cx="12" cy="4" r="2"></circle>
        <path d="m13.78 4.9 4.8 1h.4a2 2 0 0 0 0-4h-.4l-4.92 1M12 6v3M18 10h4v6h-4zM22 9v8"></path>
        <path d="M18 11h-2.6a3.87 3.87 0 0 0-6.8 0H7c-2.8 0-5 2.2-5 5v1h4v-1c0-.6.4-1 1-1h1.6a3.87 3.87 0 0 0 6.8 0H18"></path>
        <path d="M3.5 17S2 19 2 20a2 2 0 0 0 4 0c0-1-1.5-3-1.5-3"></path>
      </svg>
    );
  }
);
// --- pages/Home.tsx ---
interface IHomeProps extends HTMLAttributes<HTMLDivElement> {
  selectedEndpointId: string | null;
  setSelectedEndpointId: Dispatch<SetStateAction<string | null>>;
}

const Home = memo(
  forwardRef<HTMLDivElement, IHomeProps>(function Home(
    { className, selectedEndpointId, setSelectedEndpointId, ...props },
    ref
  ) {
    return (
      <>
        <div
          ref={ref}
          className={classNames(
            className,
            "xl:flex-1",
            // Enable horizontal scroll in mobile view
            "xl:overflow-y-auto",
            "xl:overflow-x-hidden"
          )}
          {...props}
        >
          <CardWelcomeUser />

          <Section title="Your home">
            <div className="xl:grid flex flex-col grid-flow-row grid-cols-3 gap-4">
              <div className="">
                <CardWaterConsumptionSelector
                  endpointId={selectedEndpointId}
                  onSelectEndpointId={setSelectedEndpointId}
                />
              </div>
              <div className="">
                <CardUserWaterConsumption endpointId={selectedEndpointId} />
              </div>
              <div className="">
                <CardTemperature />
              </div>
              <div className="">
                <CardStatistics />
              </div>
              <div className="">
                <CardWaterMineralization />
              </div>
              <div className="">
                <CardPressure />
              </div>
            </div>
          </Section>
        </div>
        <AppSidebar
          className={classNames("xl:rounded-3xl", "flex-col", "p-8")}
        />
      </>
    );
  })
);
// --- PeriodicUpdate.tsx ---
/**
 * Periodically updates the store with a new random water consumption report.
 *
 * @remarks This component is a workaround for the fact that Redux doesn't
 * support dispatching actions from outside of a component lifecycle.
 *
 * Every second, it will generate a new random water consumption report and
 * dispatch an action to update the store with the new report.
 *
 * It also checks if the currently selected water consumption report has
 * changed, and if so, it will refresh its internal timer.
 *
 * Finally, it will render a GenerateReports component if no reports have been
 * generated yet, and will not render anything if reports have been generated.
 */
function PeriodicUpdate() {
  const allReports = useSelector(
    ({ waterConsumptionReports }) => waterConsumptionReports
  );
  const generateRandomWaterConsumptionReportItems =
    useRandomWaterConsumptionReportItemsGenerator();
  const [shouldUpdateStore, refreshShouldUpdateStore] = useDuration();
  const updateStoreInterval = useRef(Duration.fromObject({ seconds: 5 }));
  const dispatch = useDispatch();
  const updateReport = useCallback(
    (waterConsumptionReport: IWaterConsumptionReport | null) => {
      if (waterConsumptionReport === null) {
        return;
      }

      const waterConsumptionReportItemList =
        generateRandomWaterConsumptionReportItems();

      if (waterConsumptionReportItemList === null) {
        return;
      }

      const action:
        | SetWaterConsumptionReportAction
        | UpdateWaterConsumptionReportAction =
        waterConsumptionReport !== null
          ? {
              type: ActionType.UpdateWaterConsumptionReport,
              payload: {
                ...waterConsumptionReport,
                items: [
                  ...waterConsumptionReport.items,
                  ...waterConsumptionReportItemList,
                ],
              },
            }
          : {
              type: ActionType.SetWaterConsumptionReport,
              payload: {
                id: crypto.randomUUID(),
                date: DateTime.now().startOf("day").toJSDate(),
                items: waterConsumptionReportItemList,
                temperature:
                  defaultAppConfiguration.temperature.maximum *
                  randomFloat(0.5, 1),
                pressure:
                  defaultAppConfiguration.pressure.maximum *
                  randomFloat(0.5, 1),
                mineralization:
                  defaultAppConfiguration.mineralization.maximum *
                  randomFloat(0.5, 1),
              },
            };

      dispatch(action);
    },
    [dispatch, generateRandomWaterConsumptionReportItems]
  );
  const updateStore = useCallback(() => {
    if (!shouldUpdateStore(updateStoreInterval.current)) {
      return;
    }

    const randomReportIndex = randomInteger(0, allReports.size - 1);

    const waterConsumptionReport =
      Array.from(allReports.values())[randomReportIndex] ?? null;

    updateReport(waterConsumptionReport);

    // Update today's water consumption report
    updateReport(
      selectTodayLatestWaterConsumptionReport({
        waterConsumptionReports: allReports,
      })
    );

    // Update internal hook timer
    refreshShouldUpdateStore();
  }, [shouldUpdateStore, updateReport, refreshShouldUpdateStore, allReports]);
  useInterval(updateStore, 1500);
  const [areReportsGenerated, setAreReportsGenerated] = useState(false);
  const onReportsGenerated = useCallback(() => {
    setAreReportsGenerated(true);
  }, [setAreReportsGenerated]);
  return areReportsGenerated ? null : (
    <GenerateInitialReports onFinished={onReportsGenerated} />
  );
}
// --- RangeHorizontalIndicator.tsx ---
interface IRangeHorizontalIndicatorProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  min: number;
  max: number;
  value: number;
}

function RangeHorizontalIndicator({
  className,
  value,
  children,
  min,
  max,
  ...props
}: IRangeHorizontalIndicatorProps) {
  const safeRange = useMemo(() => {
    const range = max - min;
    return range === 0 ? 1 : range;
  }, [min, max]);
  const clampedValue = useMemo(() => {
    if (!Number.isFinite(value)) return min;
    return clamp(value, min, max);
  }, [value, min, max]);
  const percentage = useMemo(() => {
    return ((clampedValue - min) / safeRange) * 100;
  }, [clampedValue, min, safeRange]);
  const style = useSpring({
    to: { width: `${percentage}%` },
    from: { width: "0%" },
    config: { tension: 170, friction: 26 },
  });
  return (
    <div
      className={classNames(
        "bg-[#f2f4f5]",
        "rounded-2xl",
        "h-10",
        "overflow-hidden",
        "dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <animated.div
        className={classNames(
          "h-full",
          "flex",
          "pl-4",
          "rounded-2xl",
          "bg-[#ccf6f1]",
          "dark:bg-gray-600",
          "transition-all",
          "min-width-[1rem]"
        )}
        style={style}
      >
        {children}
      </animated.div>
    </div>
  );
}
// --- ReportsHistory.tsx ---
// import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   IWaterConsumptionEndpoint,
//   IWaterConsumptionKind,
//   IWaterConsumptionLocation,
//   IWaterConsumptionReport,
// } from "./state/types";
// import WaterUsageChart from "./WaterUsageChart";
// import classNames from "classnames";
// export default memo(function ReportsHistory({
//   reports,
//   endpoints,
//   kinds,
//   locations,
// }: {
//   reports: IWaterConsumptionReport[];
//   endpoints: IWaterConsumptionEndpoint[];
//   kinds: IWaterConsumptionKind[];
//   locations: IWaterConsumptionLocation[];
// }) {
//   const sorted = [...reports].sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
//   );
//   const visibleReportsBatchSize = 10;
//   const [visibleCount, setVisibleCount] = useState(visibleReportsBatchSize);
//   const observerRef = useRef<HTMLDivElement | null>(null);
//   const visibleReports = useMemo(
//     () => sorted.slice(0, visibleCount),
//     [sorted, visibleCount],
//   );
//   const onIntersect = useCallback(
//     (entries: IntersectionObserverEntry[]) => {
//       const first = entries[0];
//       if (first.isIntersecting && visibleCount < sorted.length) {
//         setVisibleCount((prev) => prev + visibleReportsBatchSize);
//       }
//     },
//     [visibleCount, setVisibleCount, sorted.length],
//   );
//   useEffect(() => {
//     const observer = new IntersectionObserver(onIntersect, {
//       rootMargin: "100px",
//     });
//     const el = observerRef.current;
//     if (el !== null) {
//       observer.observe(el);
//     }
//     return () => {
//       if (el !== null) {
//         observer.unobserve(el);
//       }
//     };
//   }, [onIntersect]);
//   return (
//     <section
//       className="p-6 max-w-5xl mx-auto space-y-6 overflow-auto h-full"
//       ref={observerRef}
//     >
//       <h2 className="text-2xl font-bold">Water Consumption History</h2>
//       {/* Chart */}
//       <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
//         <WaterUsageChart data={sorted} />
//       </div>
//       {/* List */}
//       <div className="h-full flex flex-col gap-4">
//         {visibleReports.map((report) => {
//           const total = report.items.reduce(
//             (sum, item) => sum + item.consumption,
//             0,
//           );
//           return (
//             <div
//               key={report.id}
//               className={classNames(
//                 "rounded-xl",
//                 "border",
//                 "border-zinc-200",
//                 "dark:border-zinc-700",
//                 "p-4",
//                 "bg-white",
//                 "dark:bg-zinc-900",
//               )}
//             >
//               <h3 className="font-semibold text-lg mb-1">
//                 {new Date(report.date).toLocaleDateString()}
//               </h3>
//               <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
//                 Total: {(total / 1000).toFixed(2)} L | Temp:{" "}
//                 {report.temperature}
//                 °C | Pressure: {report.pressure.toFixed(2)} Pa | Mineral:{" "}
//                 {report.mineralization.toFixed(2)} ppm
//               </p>
//               <ul className="text-sm space-y-1">
//                 {report.items.map((item, i) => {
//                   const endpoint = endpoints.find(
//                     (e) => e.id === item.endpointId,
//                   );
//                   const kind = kinds.find((k) => k.id === item.kindId);
//                   const location = locations.find(
//                     (l) => l.id === item.locationId,
//                   );
//                   return (
//                     <li key={i} className="flex justify-between">
//                       <span>
//                         {kind?.title ?? "Unknown"} - {endpoint?.title ?? "?"} at{" "}
//                         {location?.title ?? "?"}
//                       </span>
//                       <span>{(item.consumption / 1000).toFixed(2)} L</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           );
//         })}
//         <div ref={observerRef} className="h-10" />
//       </div>
//     </section>
//   );
// });
const ReportsHistory = memo(function ReportsHistory({
  reports,
  endpoints,
  kinds,
  locations,
}: {
  reports: IWaterConsumptionReport[];
  endpoints: IWaterConsumptionEndpoint[];
  kinds: IWaterConsumptionKind[];
  locations: IWaterConsumptionLocation[];
}) {
  const sorted = useMemo(
    () =>
      [...reports]
        .filter(
          (report) =>
            // Return only reports of the last week
            DateTime.fromJSDate(report.date).toMillis() >
            DateTime.now().minus({ week: 1 }).toMillis()
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    [reports]
  );

  const BATCH_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const visibleReports = useMemo(
    () => sorted.slice(0, visibleCount),
    [sorted, visibleCount]
  );

  const onScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const target = e.currentTarget;
      const nearBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight < 100;

      if (nearBottom && visibleCount < sorted.length) {
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, sorted.length));
      }
    },
    [visibleCount, sorted.length]
  );

  return (
    <section
      className="p-6 max-w-5xl mx-auto space-y-6 overflow-auto h-full"
      onScroll={onScroll}
      ref={containerRef}
    >
      <h2 className="text-2xl font-bold">Water Consumption History</h2>

      {/* Chart */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
        <WaterUsageChart data={sorted} />
      </div>

      {/* List */}
      <div className="h-full flex flex-col gap-4">
        {visibleReports.map((report) => {
          const total = report.items.reduce(
            (sum, item) => sum + item.consumption,
            0
          );
          return (
            <div
              key={report.id}
              className={classNames(
                "rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900"
              )}
            >
              <h3 className="font-semibold text-lg mb-1">
                {new Date(report.date).toLocaleDateString()}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                Total: {(total / 1000).toFixed(2)} L | Temp:{" "}
                {report.temperature}
                °C | Pressure: {report.pressure.toFixed(2)} Pa | Mineral:{" "}
                {report.mineralization.toFixed(2)} ppm
              </p>
              <ul className="text-sm space-y-1">
                {report.items.map((item, i) => {
                  const endpoint = endpoints.find(
                    (e) => e.id === item.endpointId
                  );
                  const kind = kinds.find((k) => k.id === item.kindId);
                  const location = locations.find(
                    (l) => l.id === item.locationId
                  );
                  return (
                    <li key={i} className="flex justify-between">
                      <span>
                        {kind?.title ?? "Unknown"} - {endpoint?.title ?? "?"} at{" "}
                        {location?.title ?? "?"}
                      </span>
                      <span>{(item.consumption / 1000).toFixed(2)} L</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
});
// --- Section.tsx ---
interface ISectionProps
  extends PropsWithChildren<Omit<HTMLAttributes<HTMLDivElement>, "title">> {
  title: ReactNode;
}

function Section({ title, className, children, ...props }: ISectionProps) {
  return (
    <div
      className={classNames("flex", "flex-col", "gap-6", className)}
      {...props}
    >
      <div className="text-2xl font-bold">{title}</div>
      {children}
    </div>
  );
}
// --- Select.tsx ---
interface ISelectOptionProps<T>
  extends PropsWithChildren<
    Omit<HTMLAttributes<HTMLDivElement>, "value" | "onClick">
  > {
  onClick?: (value: T) => void;
  value: T;
}

function SelectOption<T>({
  value,
  className,
  children,
  onClick,
}: ISelectOptionProps<T>) {
  const onSelectOption = useCallback(() => {
    onClick?.(value);
  }, [value, onClick]);
  return (
    <DropdownMenu.Item
      aria-label={`Select option ${value}`}
      className={classNames(...style.select.classNames, className)}
      onClick={onSelectOption}
    >
      {children}
    </DropdownMenu.Item>
  );
}

interface ISelectProps<T>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  value: T | null;
  className?: string;
  options: ReadonlyArray<ISelectOption<T>>;
  onChange(value: T | null): void;
}

interface ISelectOption<T> {
  value: T;
  label: string;
}

function Select<T>({
  onChange,
  className,
  options,
  value,
  ...props
}: ISelectProps<T>) {
  const onChangeOption = useCallback(
    (value: T | null) => {
      onChange(value);
    },
    [onChange]
  );
  return (
    <Dropdown
      label={options.find((option) => option.value === value)?.label ?? null}
      className={classNames(className)}
      {...props}
    >
      <SelectOption onClick={onChangeOption} value={null}></SelectOption>
      {options.map((option) => (
        <SelectOption<T>
          key={option.label}
          value={option.value}
          onClick={onChangeOption}
        >
          {option.label}
        </SelectOption>
      ))}
    </Dropdown>
  );
}
// --- selectors/calculateAverageFromReportItemList.ts ---
/**
 * Calculates the average consumption of a list of water consumption report items.
 *
 * @param items - The list of water consumption report items
 * @returns The average consumption of the items in the list
 */
function calculateAverageFromReportItemList(
  items: ReadonlyArray<IWaterConsumptionReportItem>
) {
  return items.reduce((acc, item) => acc + item.consumption, 0) / items.length;
}
// --- selectors/calculateAverageFromReportList.ts ---
function calculateAverageFromReportList(
  reports:
    | ReadonlyArray<IWaterConsumptionReport>
    | ReadonlyMap<string, IWaterConsumptionReport>
): number {
  return Array.from(reports.values()).reduce<number>(
    (acc, report) =>
      acc +
      report.items.reduce((acc, item) => acc + item.consumption, 0) /
        ("size" in reports ? reports.size : reports.length),
    0
  );
}
// --- selectors/filterReportsByDateRange.ts ---
function filterReportsByDateRange(
  reports: IWaterConsumptionReport[],
  range: TimeRange,
  startPoint: DateTime
): IWaterConsumptionReport[] {
  let start: DateTime;
  let end: DateTime;
  switch (range) {
    case TimeRange.Day:
      start = startPoint.startOf("day");
      end = startPoint.endOf("day");
      break;
    case TimeRange.Week:
      start = startPoint.startOf("week");
      end = startPoint.endOf("week");
      break;
    case TimeRange.Month:
      start = startPoint.startOf("month");
      end = startPoint.endOf("month");
      break;
    case TimeRange.Year:
      start = startPoint.startOf("year");
      end = startPoint.endOf("year");
      break;
  }

  return reports.filter((report) => {
    const dt = DateTime.fromJSDate(report.date);
    return dt >= start && dt <= end;
  });
}
// --- selectors/filterWaterConsumptionReportByDateRange.ts ---
function filterWaterConsumptionReportByDateRange(
  state: Pick<IAppState, "waterConsumptionReports">,
  startDate: DateTime,
  endDate: DateTime
) {
  return Array.from(state.waterConsumptionReports.values()).filter((report) => {
    const reportDate = DateTime.fromJSDate(report.date);
    return (
      reportDate.toMillis() >= startDate.toMillis() &&
      reportDate.toMillis() <= endDate.toMillis()
    );
  });
}
// --- selectors/index.ts ---
enum TimeRange {
  Day,
  Week,
  Month,
  Year,
}
// --- selectors/selectTodayLatestWaterConsumptionReport.ts ---
/**
 * Select the latest water consumption report for today.
 *
 * @param state - The application state
 * @returns The latest water consumption report for today, or null if there are no reports for today
 */
function selectTodayLatestWaterConsumptionReport(
  state: Pick<IAppState, "waterConsumptionReports">
): IWaterConsumptionReport | null {
  const todayReports = filterWaterConsumptionReportByDateRange(
    state,
    DateTime.now().startOf("day"),
    DateTime.now().endOf("day")
  );
  return todayReports.reduce<IWaterConsumptionReport | null>(
    (latestReport, report) =>
      latestReport === null ||
      report.date.getTime() > latestReport.date.getTime()
        ? report
        : latestReport,
    null
  );
}
// --- state/actions.ts ---
enum ActionType {
  SetConfiguration = "WaterConsumptionControlApplication/SetConfiguration",
  UpdateConfiguration = "WaterConsumptionControlApplication/UpdateConfiguration",
  SetUser = "WaterConsumptionControlApplication/SetUser",
  SetWaterConsumptionKinds = "WaterConsumptionControlApplication/SetWaterConsumptionKinds",
  SetWaterConsumptionLocations = "WaterConsumptionControlApplication/SetWaterConsumptionLocations",
  SetWaterConsumptionReports = "WaterConsumptionControlApplication/SetWaterConsumptionReports",
  UpdateWaterConsumptionReport = "WaterConsumptionControlApplication/UpdateWaterConsumptionReport",
  UpdateWaterConsumptionSchedule = "WaterConsumptionControlApplication/UpdateWaterConsumptionSchedule",
  SetWaterConsumptionReport = "WaterConsumptionControlApplication/SetWaterConsumptionReport",
  SetWaterConsumptionEndpoints = "WaterConsumptionControlApplication/SetWaterConsumptionEndpoints",
  SetWaterConsumptionSchedules = "WaterConsumptionControlApplication/SetWaterConsumptionSchedules",
  DeleteWaterConsumptionSchedule = "WaterConsumptionControlApplication/DeleteWaterConsumptionSchedule",
}

interface IAppAction<ActionType extends string, Payload> {
  type: ActionType;
  payload: Readonly<Payload>;
}

type SetUserAction = IAppAction<ActionType.SetUser, IUser>;
type UpdateWaterConsumptionScheduleAction = IAppAction<
  ActionType.UpdateWaterConsumptionSchedule,
  IInputWaterConsumptionSchedule
>;

interface IInputWaterConsumptionSchedule
  extends Partial<Omit<IWaterConsumptionSchedule, "id">> {
  id: string;
}

type SetConfigurationAction = IAppAction<
  ActionType.SetConfiguration,
  IAppConfiguration
>;
type UpdateConfigurationAction = IAppAction<
  ActionType.UpdateConfiguration,
  Partial<IAppConfiguration>
>;
type SetWaterConsumptionKindsAction = IAppAction<
  ActionType.SetWaterConsumptionKinds,
  ReadonlyArray<IWaterConsumptionKind>
>;
type SetWaterConsumptionLocationsAction = IAppAction<
  ActionType.SetWaterConsumptionLocations,
  ReadonlyArray<IWaterConsumptionLocation>
>;
type SetWaterConsumptionReportsAction = IAppAction<
  ActionType.SetWaterConsumptionReports,
  ReadonlyArray<IWaterConsumptionReport>
>;
type SetWaterConsumptionReportAction = IAppAction<
  ActionType.SetWaterConsumptionReport,
  IWaterConsumptionReport
>;
type UpdateWaterConsumptionReportAction = IAppAction<
  ActionType.UpdateWaterConsumptionReport,
  IInputWaterConsumptionReport
>;

interface IInputWaterConsumptionReport
  extends Partial<Omit<IWaterConsumptionReport, "id">> {
  id: string;
}

type SetWaterConsumptionEndpointsAction = IAppAction<
  ActionType.SetWaterConsumptionEndpoints,
  ReadonlyArray<IWaterConsumptionEndpoint>
>;
type DeleteWaterConsumptionScheduleAction = IAppAction<
  ActionType.DeleteWaterConsumptionSchedule,
  string
>;
type SetWaterConsumptionSchedulesAction = IAppAction<
  ActionType.SetWaterConsumptionSchedules,
  ReadonlyArray<IWaterConsumptionSchedule>
>;
type AppAction =
  | UpdateWaterConsumptionReportAction
  | SetUserAction
  | SetConfigurationAction
  | UpdateWaterConsumptionScheduleAction
  | SetWaterConsumptionEndpointsAction
  | SetWaterConsumptionSchedulesAction
  | DeleteWaterConsumptionScheduleAction
  | SetWaterConsumptionReportAction
  | SetWaterConsumptionKindsAction
  | SetWaterConsumptionLocationsAction
  | SetWaterConsumptionReportsAction
  | UpdateConfigurationAction;
// --- state/index.ts ---
interface IAppState {
  configuration: IAppConfiguration;
  waterConsumptionReports: ReadonlyMap<string, IWaterConsumptionReport>;
  waterConsumptionKinds: ReadonlyMap<string, IWaterConsumptionKind>;
  waterConsumptionLocations: ReadonlyMap<string, IWaterConsumptionLocation>;
  waterConsumptionEndpoints: ReadonlyMap<string, IWaterConsumptionEndpoint>;
  schedules: ReadonlyArray<IWaterConsumptionSchedule>;
  user: IUser | null;
}

const useSelector = ReactRedux.useSelector.withTypes<IAppState>();
const useDispatch: () => (action: AppAction) => unknown =
  ReactRedux.useDispatch.withTypes<Redux.Dispatch<AppAction>>();

type ReducerMap<T> = {
  [K in keyof T]: (state: T[K] | undefined, action: AppAction) => T[K];
};

const reducer: ReducerMap<IAppState> = {
  configuration: (state = defaultAppConfiguration, action) => {
    switch (action.type) {
      case ActionType.UpdateConfiguration:
        return {
          ...state,
          ...action.payload,
        };
      case ActionType.SetConfiguration:
        return action.payload;
    }
    return state;
  },
  user: (state = null, action) => {
    switch (action.type) {
      case ActionType.SetUser:
        return action.payload;
    }
    return state;
  },
  waterConsumptionKinds: (
    state = new Map<string, IWaterConsumptionKind>(),
    action
  ) => {
    if (action.type === ActionType.SetWaterConsumptionKinds) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
  waterConsumptionLocations: (
    state = new Map<string, IWaterConsumptionLocation>(),
    action
  ): ReadonlyMap<string, IWaterConsumptionLocation> => {
    if (action.type === ActionType.SetWaterConsumptionLocations) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
  waterConsumptionReports: (
    state = new Map<string, IWaterConsumptionReport>(),
    action
  ) => {
    switch (action.type) {
      case ActionType.SetWaterConsumptionReports: {
        for (const report of action.payload) {
          state = reducer.waterConsumptionReports(state, {
            type: ActionType.SetWaterConsumptionReport,
            payload: report,
          });
        }
        break;
      }
      case ActionType.SetWaterConsumptionReport: {
        const report = action.payload;
        const reportDate = DateTime.fromJSDate(report.date);

        if (!reportDate.equals(reportDate.startOf("day"))) {
          console.error(
            `Report "${action.payload.id}" has date "${reportDate.toFormat(
              "yyyy-MM-dd"
            )}". ` +
              `Water consumption reports dates should have the start of the day.`
          );
          break;
        }

        state = mergeMaps(state, createMap([report], "id"));
        break;
      }
      case ActionType.UpdateWaterConsumptionReport: {
        const waterConsumptionReportId = action.payload.id;
        const report = state.get(waterConsumptionReportId) ?? null;

        if (report === null) {
          console.error(`Report ${waterConsumptionReportId} not found`);
          break;
        }

        const reportDate = DateTime.fromJSDate(report.date);
        const newReport: IWaterConsumptionReport = {
          ...report,
          ...action.payload,
        };
        const newReportDate = DateTime.fromJSDate(newReport.date);

        if (!reportDate.equals(newReportDate)) {
          console.error(
            `Report ${waterConsumptionReportId} date changed. ` +
              `The old date was "${reportDate.toFormat("yyyy-MM-dd")}", ` +
              `the new date is "${newReportDate.toFormat("yyyy-MM-dd")}". ` +
              "This is not supposed to happen."
          );
          break;
        }

        state = reducer.waterConsumptionReports(state, {
          type: ActionType.SetWaterConsumptionReport,
          payload: newReport,
        });
        break;
      }
    }
    return state;
  },
  schedules: (state = [], action) => {
    switch (action.type) {
      case ActionType.SetWaterConsumptionSchedules: {
        const scheduleIds = action.payload.map((s) => s.id);
        state = state.filter((s) => !scheduleIds.includes(s.id));
        state = [...state, ...action.payload];
        break;
      }
      case ActionType.UpdateWaterConsumptionSchedule: {
        const schedule = state.find((s) => s.id === action.payload.id) ?? null;

        if (schedule === null) {
          console.error(
            `Failed to update schedule.` +
              `Schedule "${action.payload.id}" not found`
          );
          break;
        }

        state = reducer.schedules(state, {
          type: ActionType.SetWaterConsumptionSchedules,
          payload: [
            {
              ...schedule,
              ...action.payload,
            },
          ],
        });

        break;
      }
      case ActionType.DeleteWaterConsumptionSchedule:
        state = state.filter((s) => s.id !== action.payload);
        break;
    }

    return state;
  },
  waterConsumptionEndpoints: (
    state = new Map<string, IWaterConsumptionEndpoint>(),
    action
  ) => {
    if (action.type === ActionType.SetWaterConsumptionEndpoints) {
      return mergeMaps(state, createMap(action.payload, "id"));
    }
    return state;
  },
};
const Provider = ReactRedux.Provider;

function configureStore(): Redux.Store<IAppState, AppAction> {
  const waterConsumptionKinds = createMap(
    [
      { id: "drinking", title: "Drinking" },
      { id: "cooking", title: "Cooking" },
      { id: "bathing", title: "Bathing" },
    ],
    "id"
  );
  const waterConsumptionEndpoints = createMap<IWaterConsumptionEndpoint, "id">(
    [
      { id: "shower", title: "Shower", icon: "shower" },
      { id: "kitchen", title: "Kitchen", icon: "dishes" },
      { id: "faucet", title: "Faucet", icon: "faucet" },
    ],
    "id"
  );
  const waterConsumptionLocations = createMap(
    [
      { id: "home", title: "Home" },
      { id: "office", title: "Office" },
      { id: "pool", title: "Pool" },
    ],
    "id"
  );
  const generatedReports = new Array<IWaterConsumptionReport>();
  const preloadedState: IAppState = {
    configuration: defaultAppConfiguration,
    waterConsumptionEndpoints,
    schedules: [],
    waterConsumptionReports: createMap([...generatedReports], "id"),
    waterConsumptionKinds,
    waterConsumptionLocations,
    user: {
      family: [],
      assistantTips: false,
      firstName: "John",
      lastName: "Doe",
      avatarPictureUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  };
  return Redux.configureStore<IAppState, AppAction>({
    reducer,
    preloadedState,
    //Disable serialization to avoid issues with redux-persist
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}
// --- state/types.ts ---
interface IWaterConsumptionReport {
  id: string;
  date: Date;
  items: ReadonlyArray<IWaterConsumptionReportItem>;
  temperature: number;
  pressure: number;
  mineralization: number;
}

enum WeekDay {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

interface IDateRange {
  start: Date;
  end: Date;
}

interface IWaterConsumptionSchedule {
  id: string;
  endpointId: string;
  title: string;
  enabled: boolean;
  days: WeekDay[];
  range: IDateRange;
}

interface IAppAutomationSettings {
  smartNotifications: boolean;
  irrigationSchedule: boolean;
  turnOffIdleTaps: boolean;
}

interface IAppConfiguration {
  automation: IAppAutomationSettings;
  temperature: {
    minimum: number;
    maximum: number;
  };
  mineralization: {
    minimum: number;
    maximum: number;
  };
  pressure: {
    minimum: number;
    maximum: number;
  };
}

interface IWaterConsumptionReportItem {
  locationId: string;
  consumption: number;
  kindId: string;
  endpointId: string;
}

interface IWaterConsumptionEndpoint {
  id: string;
  title: string;
  icon: "shower" | "dishes" | "faucet" | null;
}
// Water consumption kind: Drinking, cooking, bathing
interface IWaterConsumptionKind {
  id: string;
  title: string;
}
// Water consumption location: Home, office, swimming pool
interface IWaterConsumptionLocation {
  id: string;
  title: string;
}

interface IUser {
  firstName: string;
  lastName: string;
  assistantTips: boolean;
  avatarPictureUrl: string;
  family: IUser[];
}
// --- timeRangeLabel.ts ---
function timeRangeLabel(timeRange: TimeRange) {
  let label: string;
  switch (timeRange) {
    case TimeRange.Week:
      label = "Week";
      break;
    case TimeRange.Month:
      label = "Month";
      break;
    case TimeRange.Year:
      label = "Year";
      break;
    case TimeRange.Day:
      label = "Day";
      break;
  }

  return label;
}
// --- VerticalBarIndicator.tsx ---
interface IVerticalBarIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  variant: "primary" | "secondary";
  value: number;
}

function VerticalBarIndicator({
  className,
  value,
  variant,
  ...props
}: IVerticalBarIndicatorProps) {
  const style = useSpring({
    from: {
      height: "0%",
    },
    to: {
      height: `${value}%`,
    },
  });
  return (
    <div
      {...props}
      className={classNames(className, "flex", "items-end", "rounded-xl")}
    >
      <animated.div
        className={classNames(className, "rounded-xl", {
          [`bg-[#cbf6f3]`]: variant === "primary",
          [`bg-[#89b8f4]`]: variant === "secondary",
        })}
        style={style}
      />
    </div>
  );
}
// --- WaterBottleIndicator.tsx ---
interface WaterBottleIndicatorProps extends SVGAttributes<SVGSVGElement> {
  percentage: number;
}

function WaterBottleIndicator({
  percentage,
  ...props
}: WaterBottleIndicatorProps) {
  const clamped = useMemo(() => {
    return Number.isFinite(percentage)
      ? Math.max(0, Math.min(100, percentage))
      : 0;
  }, [percentage]);
  const { fillY, waveOffset } = useSpring({
    from: { fillY: 200, waveOffset: 0 },
    to: {
      fillY: 200 - (clamped / 100) * 200,
      waveOffset: 10,
    },
    config: { tension: 180, friction: 12 },
    reset: false,
  });
  const wavePath = useCallback((y: number, offset: number) => {
    const amplitude = 6;
    const wavelength = 40;
    const control = (x: number) =>
      `${x},${y + Math.sin((x + offset) / wavelength) * amplitude}`;

    const segments: string[] = [];
    for (let x = 0; x <= 150; x += 10) {
      segments.push(control(x));
    }

    return `M0,200 V${y} L ${segments.join(" L ")} V200 Z`;
  }, []);
  return (
    <svg viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Droplet Shape */}
      <path
        d="M75 0C40 50 10 90 10 130C10 170 40 200 75 200C110 200 140 170 140 130C140 90 110 50 75 0Z"
        fill="#F9FCFF"
      />

      <defs>
        <clipPath id="droplet-clip">
          <path d="M75 0C40 50 10 90 10 130C10 170 40 200 75 200C110 200 140 170 140 130C140 90 110 50 75 0Z" />
        </clipPath>
      </defs>

      {/* Animated water fill */}
      <g clipPath="url(#droplet-clip)">
        <animated.path d={to([fillY, waveOffset], wavePath)} fill="#90CAF9" />
      </g>

      {/* Face */}
      <circle cx="50" cy="95" r="5" fill="#FBCFD4" />
      <circle cx="100" cy="95" r="5" fill="#FBCFD4" />
      <circle cx="60" cy="90" r="2" fill="#1A1A1A" />
      <circle cx="90" cy="90" r="2" fill="#1A1A1A" />
      <path
        d="M63 98 Q75 108 87 98"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
// --- WaterConsumptionSelectorOption.tsx ---
const WaterConsumptionSelectorOption = memo(
  forwardRef<HTMLDivElement, ICarouselSlideProps>(
    function WaterConsumptionSelectorOption(
      { active, className, ...props },
      ref
    ) {
      return (
        <animated.div
          ref={ref}
          className={classNames(
            className,
            "p-5",
            {
              "flex-1": active,
              // If item is not active, leave the height unchanged
              "h-14": !active,
              flex: !active,
              "items-center": !active,
            },
            "xl:rounded-[30%]",
            "rounded-3xl",
            "bg-[#eff3f8]",
            "dark:bg-gray-800"
          )}
          {...props}
        />
      );
    }
  )
);
// --- WaterUsageChart.tsx ---
function WaterUsageChart({ data }: { data: IWaterConsumptionReport[] }) {
  const chartData = data.map((report) => ({
    date: new Date(report.date).toLocaleDateString(),
    consumption:
      report.items.reduce((sum, item) => sum + item.consumption, 0) / 1000,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis unit=" L" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="consumption"
          stroke="#3b82f6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
