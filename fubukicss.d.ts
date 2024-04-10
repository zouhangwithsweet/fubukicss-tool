/// <reference path="@figma/plugin-typings/plugin-api.d.ts" />

declare global {
  interface Window {
    fubukicss_figma: PluginAPI
  }
}

export {}
