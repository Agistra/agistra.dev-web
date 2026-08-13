import { defineCollection, z } from 'astro:content';

// `docs` collection: quickstart/install guidance (task_3 fills in the real content set).
// Shape mirrors the `blog` collection this repo's sibling site (vladsetchin.me) already
// runs in production, so a future `blog` collection can be added here later without
// reworking this file — same `type: 'content'` + zod schema pattern, new key added to
// `collections` below.
const docs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number().default(0),
	}),
});

export const collections = { docs };
