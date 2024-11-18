import type { RollupOptions, InputPluginOption } from "rollup";

import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import { generateScopedName } from "hash-css-selector";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import packageJson from "../package.json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export const ROLLUP_EXTERNALS = [
    "react",
    "react/jsx-runtime",
    ...Object.keys({
        ...packageJson.devDependencies,
        ...packageJson.dependencies,
    }),
];

export function createPackageConfig(packagePath: string): RollupOptions {
    const outputOptions = {
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: "src",
    };

    return {
        input: path.resolve(packagePath, "src/index.ts"),
        output: [
            {
                format: "cjs",
                dir: path.resolve(packagePath, "dist/cjs"),
                entryFileNames: "[name].cjs",
                exports: "auto",
                ...outputOptions,
            },
            {
                format: "esm",
                dir: path.resolve(packagePath, "dist/esm"),
                entryFileNames: "[name].mjs",
                ...outputOptions,
            },
        ],
        external: ROLLUP_EXTERNALS,
        plugins: [
            nodeResolve(),
            commonjs(),
            esbuild({
                sourceMap: false,
                tsconfig: path.posix.resolve("tsconfig.json"),
            }),
            replace({ preventAssignment: true }),
            postcss({
                extract: true,
                modules: { generateScopedName },
            }) as InputPluginOption,
            terser(),
        ],
    };
}
