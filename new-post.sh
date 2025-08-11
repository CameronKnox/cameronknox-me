#!/bin/bash

# Simple script to create a new blog post
# Usage: ./new-post.sh "My Post Title" [category1,category2] [tag1,tag2,tag3]

# Check if title is provided
if [ -z "$1" ]; then
    echo "Usage: ./new-post.sh \"Post Title\" [categories] [tags]"
    echo "Example: ./new-post.sh \"My New Post\" \"blog,tech\" \"programming,web,tutorial\""
    exit 1
fi

TITLE="$1"
CATEGORIES="${2:-blog}"
TAGS="${3:-}"

# Convert title to filename (lowercase, replace spaces with underscores, remove special chars)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | tr ' ' '_')
POST_FILE="content/posts/${FILENAME}.md"

# Get current date and time
CURRENT_DATE=$(date -u +"%Y-%m-%dT%H:%M:%S-05:00")

# Create the post file
cat > "$POST_FILE" << EOF
---
title: "$TITLE"
date: $CURRENT_DATE
description: ""
tags: [$(echo "$TAGS" | sed 's/,/", "/g' | sed 's/^/"/; s/$/"/' | sed 's/""//g')]
categories: [$(echo "$CATEGORIES" | sed 's/,/", "/g' | sed 's/^/"/; s/$/"/')]
draft: false
---

# $TITLE

Write your post content here...

## Subsection

More content...
EOF

echo "✅ New post created: $POST_FILE"
echo "📝 Title: $TITLE"
echo "📁 Categories: $CATEGORIES"
echo "🏷️  Tags: $TAGS"
echo ""
echo "Next steps:"
echo "1. Edit the post: code $POST_FILE"
echo "2. Add a description in the frontmatter"
echo "3. Build and preview: hugo server"
echo "4. Build for production: hugo"