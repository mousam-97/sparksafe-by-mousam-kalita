export function formatCurrency(
    value: number,
    options?: {
        currency?: string;
        maximumFractionDigits?: number;
        locale?: string;
    }
): string {
    const currency = options?.currency ?? "USD";
    const maximumFractionDigits = options?.maximumFractionDigits ?? 0;
    const locale = options?.locale as any;
    try {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            maximumFractionDigits,
        }).format(value);
    } catch {
        return `$${value}`;
    }
}


