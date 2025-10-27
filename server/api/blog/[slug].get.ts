import GhostContentAPI from '@tryghost/content-api'

// Comprehensive encoding fix function
function fixEncodingIssues(text: string): string {
    if (!text) return ''

    // Common UTF-8 mojibake patterns
    const fixes: Record<string, string> = {
        // Bullets and dashes
        'â€¢': '•',
        'â€"': '—',



        'â€¦': '…',

        // Special characters
        'Â ': ' ',
        'Â·': '·',
        'Â°': '°',
        'Â±': '±',
        'Â§': '§',

        // Currency
        'â‚¬': '€',
        'Â£': '£',
        'Â¥': '¥',
        'Â¢': '¢',

        // Math symbols
        'Ã—': '×',
        'Ã·': '÷',
        'â‰¤': '≤',
        'â‰¥': '≥',
        'â‰ ': '≠',


    }

    // Apply all fixes
    let fixed = text
    for (const [bad, good] of Object.entries(fixes)) {
        fixed = fixed.split(bad).join(good)
    }

    return fixed
}

export default defineCachedEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({ status: 400, message: 'Missing slug parameter' })
    }

    const config = useRuntimeConfig(event)
    const { url, key, version } = config.public.ghost

    const api = new GhostContentAPI({ url, key, version })

    try {
        const post = await api.posts.read({ slug }, { formats: ['html'] })

        // Get and fix HTML content
        let htmlContent = post.html || ''
        htmlContent = fixEncodingIssues(htmlContent)

        // Log what we're fixing
        if (post.html && post.html !== htmlContent) {
            console.log('✓ Fixed encoding issues in:', slug)
        }

        console.log('Post:', slug)
        console.log('- Has video:', htmlContent.includes('kg-video'))
        console.log('- Has audio:', htmlContent.includes('kg-audio'))
        console.log('- Has toggle:', htmlContent.includes('kg-toggle'))
        console.log('- Content length:', htmlContent.length)

        return {
            title: post.title || 'Untitled',
            content: htmlContent,
            snippet: post.excerpt || '',
            pubDate: post.published_at || new Date().toISOString(),
            isoDate: post.published_at || new Date().toISOString(),
            slug: post.slug,
            images: post.feature_image ? [post.feature_image] : [],
        }
    }
    catch (error: any) {
        console.error('Ghost API error:', error)
        throw createError({
            status: error.response?.status || 404,
            message: 'Post not found',
        })
    }
})