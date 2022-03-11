/**
 * Test runner for IE 11
 */
import {
  legacyDesktop,
  config as sauceConfig,
} from "@ideal-postcodes/supported-browsers";
import * as defaults from "./config";

const customLaunchers = { ie: legacyDesktop.ie };

module.exports = (config: any): void =>
  config.set({
    ...sauceConfig({ testName: "Address-Lookup", defaults }),
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    files: ["dist/address-lookup.js", { pattern: "test/umd.integration.ts" }],
  });
