import { z } from "zod";

export const uploadResponseSchema = z.object({
	document_id: z.string(),
	status: z.literal("pending"),
	message: z.string(),
});

export type UploadResponse = z.infer<typeof uploadResponseSchema>;
