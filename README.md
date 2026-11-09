# cameronknox.io

My personal tech blog, built with Hugo.

## Development

```bash
# Start dev server (add -D to include drafts)
hugo server

# Build for production
hugo
```

## Create New Post

Each script takes a title, then optional comma-separated categories and tags. The post is created in `content/posts/` as a draft.

```bash
# Linux/Mac
./new-post.sh "Post Title" "blog,coding" "tag1,tag2"
```

```powershell
# PowerShell
.\new-post.ps1 "Post Title" "blog,coding" "tag1,tag2"
```

```batch
:: Windows Batch
new-post.bat "Post Title" "blog,coding" "tag1,tag2"
```

Set `draft: false` in the frontmatter when the post is ready to publish.

## Deploy

The site builds to `public/`, which can be deployed to any static host. Security headers live in `static/_headers`.
