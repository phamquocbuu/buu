# Blog Vault

This folder is an Obsidian vault for managing your blog content with Jekyll integration.

## Structure

- **`_posts/`** - Contains all blog post markdown files
- **`.obsidian/`** - Obsidian vault configuration (auto-generated, not committed to git)

## How to Use

1. **Open in Obsidian**: Open the `/blog` folder as a vault in Obsidian
2. **Create New Posts**: Use Obsidian to create new markdown files in `_posts/`
3. **Use Front Matter Template**: Start each post with the provided YAML front matter
4. **Local Testing**: Run `bundle exec jekyll serve` from the repo root to preview
5. **Publish**: Commit and push your changes to deploy via GitHub Pages

## Front Matter Template

```yaml
---
layout: post
title: "Your Article Title"
date: 2026-04-26
categories: [tag1, tag2]
description: "SEO meta description - keep under 160 characters"
author: "Buu Pham"
permalink: /blog/article-slug/
---
```

## Quick Commands

### Local Development
```bash
# Navigate to repo root
cd ..

# Install dependencies
bundle install

# Start Jekyll dev server
bundle exec jekyll serve

# Visit http://localhost:4000 in your browser
```

### Adding a Blog Post
1. Create new markdown file in `_posts/` folder
2. Name it as: `YYYY-MM-DD-post-slug.md`
3. Copy the front matter template and fill in your content
4. Save the file (Jekyll will auto-detect and rebuild)

### File Naming Convention
- Format: `YYYY-MM-DD-slug-title.md`
- Example: `2026-04-26-my-first-post.md`
- Slugs should be lowercase with hyphens, no spaces

## SEO Best Practices

- **Title**: Keep under 60 characters
- **Description**: 155-160 characters for optimal display in search results
- **Permalink**: Use meaningful slugs (e.g., `/blog/jekyll-setup/`)
- **Categories**: Use consistent, relevant tags for better organization
- **Keywords**: Include main keywords naturally in title and first paragraph

## Viewing Published Blog

After pushing to GitHub:
1. Blog posts will be available at `https://yourdomain.com/blog/YYYY/MM/DD/slug/`
2. Sitemap auto-generated at `/sitemap.xml`
3. RSS feed available at `/blog/feed.xml`

## Tips

- Use Obsidian's backlink and tag features to organize content
- The vault is configured to store new notes in `_posts/` by default
- All markdown links use relative paths
- `.obsidian/` folder is ignored in git (won't pollute the repository)
