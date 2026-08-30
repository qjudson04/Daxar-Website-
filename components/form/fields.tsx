"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  wide?: boolean;
};

const labelClass = "block text-sm font-medium text-graphite";
const errorClass = "mt-1.5 text-xs font-medium text-red-700";
const hintClass = "mt-1.5 text-xs text-graphite/55";
const inputBaseClass =
  "mt-1.5 w-full rounded border bg-white px-3.5 py-2.5 text-sm text-graphite placeholder:text-graphite/40 focus:border-sea focus:outline-none focus:ring-1 focus:ring-sea";

function wrapperClass(wide?: boolean) {
  return cn(wide && "sm:col-span-2");
}

export function TextField({
  label,
  name,
  error,
  hint,
  required,
  wide,
  ...rest
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={wrapperClass(wide)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-federal"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={cn(inputBaseClass, error ? "border-red-500" : "border-silver")}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  hint,
  required,
  wide = true,
  rows = 5,
  ...rest
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `field-${name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={wrapperClass(wide)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-federal"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={cn(inputBaseClass, error ? "border-red-500" : "border-silver")}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  required,
  wide,
  children,
  ...rest
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const id = `field-${name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={wrapperClass(wide)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-federal"> *</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={cn(inputBaseClass, error ? "border-red-500" : "border-silver")}
        {...rest}
      >
        {children}
      </select>
      {hint ? (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={errorClass} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckboxGroup({
  legend,
  name,
  options,
  wide,
}: {
  legend: string;
  name: string;
  options: string[];
  wide?: boolean;
}) {
  return (
    <div className={wrapperClass(wide)}>
      <span className={labelClass}>{legend}</span>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {options.map((option) => {
          const id = `field-${name}-${option.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
          return (
            <label key={option} htmlFor={id} className="flex items-center gap-2 text-sm text-graphite/85">
              <input
                id={id}
                type="checkbox"
                name={name}
                value={option}
                className="h-4 w-4 rounded border-silver text-ocean focus:ring-sea"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  required,
  wide,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={wrapperClass(wide)}>
      <span className={labelClass}>
        {legend}
        {required ? <span className="text-federal"> *</span> : null}
      </span>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {options.map((option) => {
          const id = `field-${name}-${option.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
          return (
            <label key={option} htmlFor={id} className="flex items-center gap-2 text-sm text-graphite/85">
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                required={required}
                className="h-4 w-4 border-silver text-ocean focus:ring-sea"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}
