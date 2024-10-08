import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import packageJson from "./package.json" with  { type: "json" };
const { version, license } = packageJson;
const targets = "last 2 versions";

const input = "index.ts";

const banner = `/**
 * @license
 * AddressZen <https://addresszen.com>
 * Copyright IDDQD Limited
 * Address Lookup ${version}
 * ${license} Licence
 */`;

// Configure terser to ignore build info banner
const terserConfig = {
  output: {
    comments: (_, { value, type }) => {
      if (type === "comment2") return /@license/i.test(value);
    },
  },
};

const sourceMap = false;

const babelHelpers = "bundled";

/**
 * Whitelist files processed by Babel
 */
const include = [
  "node_modules/@ideal-postcodes/address-finder/esm/**",
  "node_modules/@ideal-postcodes/core-axios/esm/**",
  "node_modules/@ideal-postcodes/core-interface/esm/**",
  "node_modules/@ideal-postcodes/jsutil/esm/**",
  "node_modules/capitalise-post-town/dist/**",
  "node_modules/lodash/debounce.js",
];

const context = "window";

export default [
  /**
   * ESM build targeting minimum browser versions that allow [ES6 Modules](https://caniuse.com/#feat=es6-module)
   */
  {
    input,
    context,
    output: {
      file: "./dist/address-lookup.esm.js",
      banner,
      format: "esm",
      exports: "named",
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        dedupe: ["@ideal-postcodes/jsutil"],
        mainFields: ["browser", "module", "main"],
        browser: true,
      }),
      commonjs(),
      babel({
        babelrc: false,
        include,
        sourceMap,
        babelHelpers,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                edge: "16",
                firefox: "60",
                chrome: "61",
                safari: "11",
              },
            },
          ],
        ],
      }),
      terser(terserConfig),
    ],
  },
  /**
   * UMD build that targets ie11 as base
   */
  {
    input,
    context,
    output: {
      file: "./dist/address-lookup.js",
      banner,
      format: "umd",
      extend: true,
      name: "AddressZen",
      exports: "named",
    },
    plugins: [
      resolve({
        preferBuiltins: true,
        dedupe: ["@ideal-postcodes/jsutil"],
        mainFields: ["browser", "module", "main"],
        browser: true,
      }),
      commonjs(),
      babel({
        babelrc: false,
        include,
        babelHelpers,
        sourceMap,
        presets: [["@babel/preset-env", { targets }]],
      }),
      terser(terserConfig),
    ],
  },
];
