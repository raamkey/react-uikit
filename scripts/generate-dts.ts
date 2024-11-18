import path from "node:path";
import fs from "fs-extra";
import { execa } from "execa";

export async function generateDts(packagePath: string) {
    await execa("pnpm", [
        "tsc",
        "--project",
        path.join(packagePath, "tsconfig.build.json"),
    ]);

    await fs.copy(
        path.join(packagePath, "dist/types/index.d.ts"),
        path.join(packagePath, "dist/types/index.d.mts"),
    );
}
