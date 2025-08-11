# Cameron Knox's Blog

A minimal tech blog built with Hugo, featuring programming tutorials, tech reviews, and project updates.

🌐 **Live Site**: [cameronknox.io](https://cameronknox.io)

## 🚀 Quick Start

### Prerequisites
- [Hugo](https://gohugo.io/installation/) (v0.148.2+)
- Git

### Development
```bash
# Clone the repository
git clone https://github.com/CameronKnox/cameronknox-me.git
cd cameronknox-me

# Start development server
hugo server

# Build for production
hugo
```

## ✏️ Creating New Posts

Instead of using `hugo new`, use the convenient scripts provided:

### PowerShell (Windows - Recommended)
```powershell
.\new-post.ps1 "My Blog Post Title" "blog,tech" "tag1,tag2,tag3"
```

### Bash (Git Bash/WSL/Linux)
```bash
./new-post.sh "My Blog Post Title" "blog,tech" "tag1,tag2,tag3"
```

### Windows Batch
```cmd
new-post.bat "My Blog Post Title" "blog,tech" "tag1,tag2,tag3"
```

### Script Features
- ✅ Auto-generates frontmatter with current date
- ✅ Creates SEO-friendly filename from title
- ✅ Includes template content to get started
- ✅ Supports categories and tags
- ✅ Sets default category as "blog"

### Usage Examples
```powershell
# Simple post with default category
.\new-post.ps1 "Getting Started with React"

# Full example with categories and tags
.\new-post.ps1 "Advanced Hugo Tips" "blog,coding" "hugo,web,tutorial,static-sites"
```

## 📁 Project Structure

```
├── content/
│   ├── posts/           # Blog posts
│   └── about.md         # About page
├── layouts/
│   ├── _default/        # Default templates
│   └── taxonomy/        # Tag/category pages
├── static/
│   ├── css/            # Custom styles
│   └── favicon.ico     # Site icon
├── new-post.ps1        # Post creation script (PowerShell)
├── new-post.sh         # Post creation script (Bash)
└── new-post.bat        # Post creation script (Windows)
```

## 🎨 Features

- **Minimal Design**: Clean, professional tech blog aesthetic
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Responsive**: Mobile-friendly design
- **Fast**: Static site generation with Hugo
- **SEO Ready**: Proper meta tags and structured content
- **Tag System**: Organized content with clickable tags and categories
- **Typography**: Optimized for readability with proper font choices

## 🛠️ Tech Stack

- **Hugo**: Static site generator
- **CSS**: Custom minimal styling with CSS variables
- **Markdown**: Content format
- **Git**: Version control

## 📝 Content Guidelines

### Post Frontmatter
```yaml
---
title: "Your Post Title"
date: 2025-08-11T16:33:15-05:00
description: "Brief description for SEO and post previews"
tags: ["tag1", "tag2", "tag3"]
categories: ["blog", "coding", "tech-setup"]
draft: false
---
```

### Available Categories
- `blog` - General blog posts
- `coding` - Programming and development
- `tech-setup` - Hardware and setup guides

### Popular Tags
- Programming: `programming`, `c++`, `react`, `web`
- Tech: `tech`, `setup`, `apple`, `ai`
- Projects: `3d-printing`, `raspberry-pi`, `server`
- Personal: `personal`, `work`, `streaming`

## 🚢 Deployment

The site builds to the `public/` directory and can be deployed to any static hosting service:

- **Vercel** (recommended)
- **Netlify** 
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal blog, but feel free to:
- Report issues
- Suggest improvements
- Submit pull requests for fixes

---

Built with ❤️ using Hugo and deployed with modern web technologies.
