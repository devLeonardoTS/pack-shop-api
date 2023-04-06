import type { Config } from "jest";

import sharedConfig from "./jest.config";

const config: Config = {
  ...sharedConfig,
  testRegex: ".e2e-spec.ts$",
};

export default config;
