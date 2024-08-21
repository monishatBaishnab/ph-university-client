import { z } from "zod";

export const DayjsObjectSchema = z.object({
    $D: z.number(), // Day of the month
    $H: z.number(), // Hours
    $L: z.string(), // Locale
    $M: z.number(), // Month (0-indexed)
    $W: z.number(), // Day of the week (0-indexed)
    $d: z.date(), // JavaScript Date object
    $isDayjsObject: z.literal(true), // Indicates this is a Day.js object
    $m: z.number(), // Minutes
    $ms: z.number(), // Milliseconds
    $s: z.number(), // Seconds
    $u: z.undefined(), // Undefined (timezone info)
    $x: z.object({}), // An empty object (possibly for internal metadata)
    $y: z.number(), // Year
    status: z.string().optional(), // Status, which may be undefined
});