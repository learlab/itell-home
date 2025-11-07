import { z } from "zod";

const pageSchema = z.object({
	id: z.number(),
	documentId: z.string(),
	Title: z.string(),
	Slug: z.string(),
	ReferenceSummary: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	PageSummary: z.string().nullable(),
	Order: z.number(),
	ClozeTest: z.string().nullable(),
	EndOfPageActivity: z.string().nullable(),
});

const volumeDataSchema = z.object({
	id: z.number(),
	documentId: z.string(),
	Title: z.string(),
	Owner: z.string().nullable(),
	Description: z.string().nullable(),
	Slug: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	publishedAt: z.string().nullable(),
	FreePages: z.any().nullable(),
	VolumeSummary: z.string().nullable(),
	VolumeConfig: z.any().nullable(),
	Pages: z.array(pageSchema),
});

export const volumeResponseSchema = z.object({
	data: volumeDataSchema,
	meta: z.object({}).passthrough(),
});

export type PageData = z.infer<typeof pageSchema>;
export type VolumeData = z.infer<typeof volumeDataSchema>;
export type VolumeResponse = z.infer<typeof volumeResponseSchema>;
