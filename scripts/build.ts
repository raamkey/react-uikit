import type { RollupOptions, OutputOptions } from "rollup";

import path from "node:path";
import chalk from "chalk";
import { rollup } from "rollup";

import { logger } from "./logger";
import { generateDts } from "./generate-dts";
import { createPackageConfig } from "./create-package-config";
import { generateCSS } from "./generate-css";

export async function compile(config: RollupOptions) {
    const build = await rollup(config);
    const outputs: OutputOptions[] = Array.isArray(config.output)
        ? config.output
        : [config?.output || {}];
    return Promise.all(outputs.map((output) => build.write(output)));
}

export async function buildPackage() {
    const packagePath = path.posix.resolve(".");

    logger.log("Building package...");
    try {
        const startTime = Date.now();

        logger.log("Generating *.d.ts files...");
        await generateDts(path.resolve("."));

        const config = createPackageConfig(packagePath);
        logger.log("Compiling package with rollup...");
        await compile(config);

        await generateCSS();

        logger.success(
            `Package has been built in ${chalk.green(`${((Date.now() - startTime) / 1000).toFixed(2)}s`)}`,
        );
    } catch (error) {
        logger.error("Failed to compile package", error.message);
        // logger.error(error);
        process.exit(1);
    }
}

(async () => {
    await buildPackage();
})();
