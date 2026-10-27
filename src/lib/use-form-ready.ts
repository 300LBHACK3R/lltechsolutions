"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

/** Keep named fields inert until React owns submission; never fall back to a GET. */
export function useFormReady() {
  return useSyncExternalStore(subscribe, browserReady, serverReady);
}
