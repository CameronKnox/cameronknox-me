# PowerShell script to create a new blog post
# Usage: .\new-post.ps1 "Post Title" "categories" "tags"

param(
    [Parameter(Mandatory=$true)]
    [string]$Title,
    [string]$Categories = "blog",
    [string]$Tags = ""
)

if (-not $Title) {
    Write-Host "Usage: .\new-post.ps1 'Post Title' 'categories' 'tags'"
    Write-Host "Example: .\new-post.ps1 'My New Post' 'blog,tech' 'programming,web,tutorial'"
    exit 1
}

# Convert title to filename
$Filename = $Title.ToLower() -replace '[^a-z0-9\s]', '' -replace '\s+', '_'
$PostFile = "content\posts\$Filename.md"

# Get current date and time
$CurrentDate = Get-Date -Format "yyyy-MM-ddTHH:mm:ss-05:00"

# Format tags and categories for YAML
$TagsFormatted = if ($Tags) { 
    ($Tags -split ',' | ForEach-Object { "`"$($_.Trim())`"" }) -join ', '
} else { 
    "" 
}

$CategoriesFormatted = ($Categories -split ',' | ForEach-Object { "`"$($_.Trim())`"" }) -join ', '

# Create the post content with professional formatting
$PostContent = @"
---
title: "$Title"
date: $CurrentDate
description: ""
tags: [$TagsFormatted]
categories: [$CategoriesFormatted]
draft: false
---

Your opening paragraph goes here. This should be a compelling introduction that hooks the reader and clearly explains what this post is about.

This is where you can expand on your introduction with more context, background information, or explain why this topic matters.

## Main Section

This is your primary content section. Use this area to dive deep into your main topic. Break up long paragraphs for better readability.

### Subsection

Use subsections to organize your content hierarchically. This helps with both readability and SEO.

- **Bold points** help emphasize important concepts
- Use lists to break down complex information
- Keep paragraphs focused and concise

### Technical Details

If you're writing about technical topics, this is where you can include:

- Code examples or configurations
- Step-by-step instructions
- Links to relevant resources
- Explanations of complex concepts

## Key Takeaways

Summarize the most important points from your post:

- **Main insight #1** - Brief explanation
- **Main insight #2** - Brief explanation  
- **Main insight #3** - Brief explanation

## Looking Forward

End with a forward-looking conclusion that engages readers. You might mention:

- What you plan to explore next
- Questions you're still investigating
- How readers can apply this information
- Invitation for discussion or feedback

Remember to replace all placeholder content with your actual post material!
"@

# Write the file
$PostContent | Out-File -FilePath $PostFile -Encoding UTF8

Write-Host "✅ New post created: $PostFile" -ForegroundColor Green
Write-Host "📝 Title: $Title" -ForegroundColor Cyan
Write-Host "📁 Categories: $Categories" -ForegroundColor Cyan
Write-Host "🏷️  Tags: $Tags" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit the post: code $PostFile"
Write-Host "2. Add a description in the frontmatter"
Write-Host "3. Build and preview: hugo server"
Write-Host "4. Build for production: hugo"