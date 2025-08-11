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

# Create the post content
$PostContent = @"
---
title: "$Title"
date: $CurrentDate
description: ""
tags: [$TagsFormatted]
categories: [$CategoriesFormatted]
draft: false
---

# $Title

Write your post content here...

## Subsection

More content...
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