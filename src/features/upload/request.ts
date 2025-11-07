import { uploadResponseSchema, type UploadResponse } from "./schema";

const API_ENDPOINT = "https://itell-api.learlab.vanderbilt.edu/generate/volume";

const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64String = reader.result as string;
			// Remove the data URL prefix (e.g., "data:application/pdf;base64,")
			const base64Data = base64String.split(",")[1];
			resolve(base64Data);
		};
		reader.onerror = (error) => reject(error);
	});
};

export const uploadPdfToApi = async (file: File): Promise<UploadResponse> => {
	const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

	if (!apiKey) {
		throw new Error("API key is not configured");
	}

	const base64File = await convertFileToBase64(file);

	const response = await fetch(API_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"API-Key": apiKey,
		},
		body: JSON.stringify({
			file: base64File,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Upload failed: ${response.status} ${errorText}`);
	}

	const data = await response.json();

	// Validate response with Zod schema
	const validatedData = uploadResponseSchema.parse(data);

	return validatedData;
};
