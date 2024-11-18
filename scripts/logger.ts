import { Signale } from "signale";

export const createLogger = () => {
	return new Signale({
		scope: "build-package",
		types: {
			success: { badge: "✔", color: "green", label: "" },
			error: { badge: "✖", color: "red", label: "" },
		},
	});
};

export const logger = createLogger();
