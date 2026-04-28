---
layout: default
title: Blog
description: Insights, tutorials, and stories about software development, system architecture, and modern technologies.
permalink: /blog/
---

<!-- Blog Hero Section -->
<section class="hero pattern-tech-hero" style="min-height: 50vh; padding-top: 8rem;">
    <div class="hero-content">
        <h1>Developer Insights & Stories</h1>
        <p class="subtitle">Exploring system architecture, modern frameworks, and real-world engineering challenges</p>
    </div>
</section>

<!-- Search Bar -->
<div style="background: #0d0d0d; padding: 2rem 2rem 0;">
    <form class="search-form" action="/blog/search/" method="get">
        <div class="search-input-wrap">
            <i class="fas fa-search"></i>
            <input type="text" name="q" class="search-input" placeholder="Search articles…" autocomplete="off">
        </div>
        <button type="submit" class="search-btn">
            <i class="fas fa-search"></i> Search
        </button>
    </form>
</div>

<!-- Blog Posts Section -->
<section class="content-section pattern-circuit">
    <div style="max-width: 900px; margin: 0 auto;">
        <h2 class="section-title">Latest Articles</h2>

        {% if site.posts.size > 0 %}
        <div style="display: grid; gap: 2rem;">
            {% for post in site.posts %}
            <article class="content-card animate-on-scroll">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    <div>
                        <h3 style="margin-bottom: 0.5rem; margin-top: 0;">
                            <a href="{{ post.url }}" style="color: var(--text-primary); text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='var(--accent-primary)'" onmouseout="this.style.color='var(--text-primary)'">
                                {{ post.title }}
                            </a>
                        </h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.9rem; color: var(--text-secondary);">
                            <div>
                                <i class="fas fa-calendar-alt" style="margin-right: 0.3rem;"></i>
                                {{ post.date | date: "%B %-d, %Y" }}
                            </div>
                            {% if post.author %}
                            <div>
                                <i class="fas fa-user" style="margin-right: 0.3rem;"></i>
                                {{ post.author }}
                            </div>
                            {% endif %}
                            {% if post.reading_time %}
                            <div>
                                <i class="fas fa-clock" style="margin-right: 0.3rem;"></i>
                                {{ post.reading_time }} min read
                            </div>
                            {% endif %}
                        </div>
                    </div>
                </div>

                <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.8;">
                    {% if post.excerpt %}
                        {{ post.excerpt | strip_html | truncatewords: 50 }}
                    {% else %}
                        {{ post.content | strip_html | truncatewords: 50 }}
                    {% endif %}
                </p>

                <div>
                    {% if post.categories %}
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                        {% for category in post.categories %}
                        <span class="skill-tag" style="font-size: 0.8rem;">
                            <i class="fas fa-folder" style="margin-right: 0.3rem;"></i>{{ category }}
                        </span>
                        {% endfor %}
                    </div>
                    {% endif %}
                </div>

                <a href="{{ post.url }}" style="display: inline-flex; align-items: center; gap: 0.5rem; color: var(--accent-secondary); text-decoration: none; font-weight: 600; transition: color 0.3s ease;" onmouseover="this.style.color='var(--accent-primary)'" onmouseout="this.style.color='var(--accent-secondary)'">
                    Read more
                    <i class="fas fa-arrow-right"></i>
                </a>
            </article>
            {% endfor %}
        </div>
        {% else %}
        <div class="content-card" style="text-align: center;">
            <p style="color: var(--text-secondary); font-size: 1.1rem;">
                No blog posts yet. Check back soon for insights and stories about development!
            </p>
        </div>
        {% endif %}
    </div>
</section>

<!-- Blog CTA -->
<div class="blog-cta">
    <p>Want to stay updated? New articles drop regularly on system design, AI, and modern dev practices.</p>
    <a href="/blog/feed.xml" class="blog-cta-btn">
        <i class="fas fa-rss"></i> Subscribe via RSS
    </a>
</div>

<!-- Scroll Animation -->
<script>
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
</script>
