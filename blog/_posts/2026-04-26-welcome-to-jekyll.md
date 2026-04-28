---
layout: post
title: "Welcome to Jekyll and Obsidian Blog"
date: 2026-04-26
categories: [blogging, jekyll, setup]
description: "Learn how to get started with your new Jekyll + Obsidian blog setup"
author: "Buu Pham"
permalink: /blog/welcome-jekyll-obsidian/
---

# Welcome to Your New Blog!

This is your first example blog post. It demonstrates the proper front matter format and markdown structure for your Jekyll blog managed through Obsidian.

## What You Get

With this Jekyll + Obsidian setup, you have:

1. **Content Management** - Write your blog posts in Obsidian with full markdown support
2. **Static Site Generation** - Jekyll automatically converts markdown to HTML
3. **SEO Optimization** - Built-in sitemap and feed generation
4. **GitHub Pages Hosting** - Free hosting with automatic deployments

## How It Works

```
Obsidian (Writing)
       ↓
Markdown Files (_posts/)
       ↓
Jekyll (Build)
       ↓
Static HTML (_site/)
       ↓
GitHub Pages (Deploy)
```

## Getting Started

To start writing your own posts:

1. Open this `/blog` folder in Obsidian
2. Create a new note in `_posts/` folder
3. Use this post as a template for the front matter
4. Write your content in markdown
5. Save and let Jekyll rebuild

## Front Matter Explained

```yaml
---
layout: post          # Don't change this
title: "Your Title"   # Keep under 60 characters
date: YYYY-MM-DD      # Publication date
categories: [tag1]    # For organizing posts
description: "..."    # SEO meta - under 160 chars
author: "Your Name"   # Post author
permalink: /blog/your-slug/  # Custom URL
---
```

## Next Steps

- [ ] Customize `_config.yml` with your blog title and URL
- [ ] Update the `keep_files` section with all your HTML files
- [ ] Create your first original blog post
- [ ] Run `bundle exec jekyll serve` to test locally
- [ ] Push to GitHub and verify deployment

Happy blogging!
