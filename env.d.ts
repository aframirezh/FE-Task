/// <reference types="vite/client" />
// Including environment variables types to let Vite know about them at avoid any TS errors

interface ImportMetaEnv {
  readonly API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
