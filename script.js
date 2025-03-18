// Array of blog files - in a production environment
const blogFiles = [
  './blogs/Blog_1-23-2025.txt',
  './blogs/Blog_3-5-2025.txt',
  './blogs/current-setups.txt'
];

// Function to create a formatted date from blog filename
function formatBlogDate(filename) {
  // Extract date portion if it matches pattern like Blog_1-23-2025.txt
  const dateMatch = filename.match(/Blog_(\d+-\d+-\d+)/);

  if (dateMatch) {
    const dateParts = dateMatch[1].split('-');
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    // Create a formatted date (e.g., "January 23, 2025")
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // Return the filename without extension if no date pattern found
  return filename.split('/').pop().replace('.txt', '');
}

// Function to create and load blog posts
function loadBlogPosts() {
  const blogContainer = document.getElementById('blog-container');

  // Clear container
  blogContainer.innerHTML = '';

  // Sort blog files by date (most recent first)
  // This assumes filenames follow a pattern that can be sorted chronologically
  const sortedBlogs = [...blogFiles].sort().reverse();

  // Create and load each blog post
  sortedBlogs.forEach((blogPath, index) => {
    // Create a blog card
    const blogCard = document.createElement('div');
    blogCard.className = 'blog-card';

    // Create a heading with formatted date/title
    const blogTitle = document.createElement('h2');
    blogTitle.className = 'blog-title';
    blogTitle.textContent = formatBlogDate(blogPath);

    // Create content container
    const blogContent = document.createElement('div');
    blogContent.className = 'blog-content';
    blogContent.id = `blog-content-${index}`;

    // Add to card and container
    blogCard.appendChild(blogTitle);
    blogCard.appendChild(blogContent);
    blogContainer.appendChild(blogCard);

    // Load the blog content
    loadBlogContent(blogPath, `blog-content-${index}`);
  });
}

// Function to load blog content
function loadBlogContent(filePath, containerId) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById(containerId);

      // Format the content - convert newlines to <br> tags and preserve spacing
      const formattedContent = data
        .replace(/\n/g, '<br>')
        .replace(/\s{2,}/g, match => '&nbsp;'.repeat(match.length));

      container.innerHTML = formattedContent;
    })
    .catch(error => {
      console.error('Error loading blog:', error);
      document.getElementById(containerId).innerHTML =
        `<p class="error">Failed to load blog content. Please try again later.</p>`;
    });
}

// Initialize the blog posts when the page loads
window.onload = function () {
  loadBlogPosts();

};