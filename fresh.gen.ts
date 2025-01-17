// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_upload from "./routes/api/upload.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $Dropzone from "./islands/Dropzone.tsx";
import * as $SlidesDisplay from "./islands/SlidesDisplay.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/upload.ts": $api_upload,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Dropzone.tsx": $Dropzone,
    "./islands/SlidesDisplay.tsx": $SlidesDisplay,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
