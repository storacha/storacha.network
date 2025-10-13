import GhostContentAPI from '@tryghost/content-api'

export default defineCachedEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({ status: 400, message: 'Missing slug parameter' })
    }

    const config = useRuntimeConfig(event)
    const { url, key, version } = config.public.ghost

    const api = new GhostContentAPI({ url, key, version })

    try {
        const post = await api.posts.read({ slug })

        return {
            title: post.title || 'Untitled',
            content: post.html || '',
            snippet: post.excerpt || '',
            pubDate: post.published_at || new Date().toISOString(),
            isoDate: post.published_at || new Date().toISOString(),
            slug: post.slug,
            images: post.feature_image ? [post.feature_image] : [],
        }
    }
    catch (error: any) {
        throw createError({
            status: error.response?.status || 404,
            message: 'Post not found',
        })
    }
})