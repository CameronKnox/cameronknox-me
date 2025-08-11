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

# Create the post file with professional formatting
cat > "$POST_FILE" << EOF
---
title: "$TITLE"
date: $CURRENT_DATE
description: ""
tags: [$(echo "$TAGS" | sed 's/,/", "/g' | sed 's/^/"/; s/$/"/' | sed 's/""//g')]
categories: [$(echo "$CATEGORIES" | sed 's/,/", "/g' | sed 's/^/"/; s/$/"/')]
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