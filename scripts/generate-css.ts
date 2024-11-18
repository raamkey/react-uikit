import path from "node:path";
import glob from "fast-glob";
import fs from "fs-extra";
import postcss from "postcss";
import postcssPresetMantine from "postcss-preset-mantine";
import postcssModules from "postcss-modules";
import { generateScopedName } from "hash-css-selector";

function transformFileName(filePath: string) {
    return path.basename(filePath).replace(".module.css", ".css");
}

async function processFile(
    filePath: string,
    scopeBehaviour: "local" | "global",
    outputFolder: string,
) {
    const result = await postcss([
        postcssPresetMantine,
        postcssModules({ generateScopedName, scopeBehaviour }),
    ]).process(fs.readFileSync(filePath, "utf-8"), {
        from: path.basename(filePath),
    });

    const fileName = transformFileName(filePath);
    await fs.writeFile(path.join(outputFolder, fileName), result.css);
}

export async function generateCSS() {
    const files = await glob(`src/**/*.css`);
    const modules = files.filter((file) => file.endsWith(".module.css"));
    const outputFolder = path.posix.resolve("src/styles");
    await fs.ensureDir(outputFolder);
    modules.forEach((file) => processFile(file, "global", outputFolder));
}
