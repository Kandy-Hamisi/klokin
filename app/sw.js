import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

// Declare `self` as a global variable
const self = this;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();


