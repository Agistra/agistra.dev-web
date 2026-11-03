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

// `blog` collection: the canonical-original posts this site's X threads
// (@AgistraHQ) link back to. Same `type: 'content'` + zod pattern as `docs`,
// fulfilling the extension point noted above.
const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		author: z.string(),
		cover: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { docs, blog };
