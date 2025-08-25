export const GetAllProjects = `*[_type == "project"]{
	_id,
	title,
	description,
	license,
	image,
	year,
	"technologies": coalesce(technologies, []),
	"tags": coalesce(tags, []),
	githubRepo,
	demoLink
}`;
// Centralized Sanity queries (GROQ)
export const GetTopPostsSortByDate = `*[_type == "post"]{_id, title, description, publishedAt, author -> { name }, slug, categories[] -> { title }, mainImage}| order(publishedAt desc)`;

export const GetAllPostsSortByDate = `*[_type == "post"]{_id, title, description , publishedAt, author -> { name }, slug, categories[]->{title}, mainImage}| order(publishedAt desc)`;

export const GetPostBySlug = `*[_type == "post" && slug.current == $slug]{ _id, title, description, publishedAt, author->{name}, slug, categories[]->{title}, mainImage, body }`;

// Utility: estimate reading time (client side) will be added where content is rendered
