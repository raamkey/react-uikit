export type DataAttributes = Record<string, string | number | boolean | null | undefined>;

export function generateDataAttributes(data: DataAttributes) {
	const entries = Object.entries(data);
	return Object.fromEntries(
		entries
			.filter(([_, value]) => value != null)
			.map(([key, value]) => [`data-${key.toLowerCase().replace(/_/g, "-")}`, String(value)])
	) as Record<`data-${string}`, string>;
}
