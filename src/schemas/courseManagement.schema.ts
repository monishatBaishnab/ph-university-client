import { z } from "zod";
import { DayjsObjectSchema } from "./global.schema";

export const semesterRegistrationSchema = z.object({
    academicSemester: z.string({ required_error: "Academic Semester is required." }),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"], { required_error: "Status is required." }),
    startDate: DayjsObjectSchema.refine((data) => !!data, { message: "Start date is required." }),
    endDate: DayjsObjectSchema.refine((data) => !!data, { message: "End date is required." }),
    minCredit: z.string({ required_error: "Min Credit is required." }),
    maxCredit: z.string({ required_error: "Max credit is required." }),
});
