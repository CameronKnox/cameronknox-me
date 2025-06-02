import './styles.css';

// Interface for blog configuration
interface BlogConfig {
  id: string;
  filePath: string;
}

// Blog files configuration
const blogConfigs: BlogConfig[] = [
  { id: 'blog1', filePath: '/blogs/Blog_1-23-2025.txt' },
  { id: 'blog2', filePath: '/blogs/current-setups.txt' },
  { id: 'blog3', filePath: '/blogs/Blog_3-5-2025.txt' }
];

// Function to create and style blog content containers
function createBlogContainer(content: string): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'responsive-iframe';
  
  const contentDiv = document.createElement('div');
  contentDiv.style.cssText = `
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    white-space: pre-wrap;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  `;
  contentDiv.textContent = content;
  
  container.appendChild(contentDiv);
  return container;
}

// Function to create loading placeholder
function createLoadingContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'responsive-iframe';
  container.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
  `;
  container.textContent = 'Loading...';
  return container;
}

// Function to load blog content
async function loadBlogContent(filePath: string): Promise<string> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return 'Content not available';
  }
}

// Function to initialize the website
async function initializeWebsite(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Could not find app container');
    return;
  }

  // Create the main structure
  app.innerHTML = `
    <div class="content-wrapper">
      <h1>I'm Cameron</h1>
      <p>
        Welcome to my website, this is where I showcase things I am interested
        in and working on.
      </p>
      <section class="iframes-section" id="blogs-container">
      </section>
    </div>
  `;

  const blogsContainer = document.getElementById('blogs-container');
  if (!blogsContainer) {
    console.error('Could not find blogs container');
    return;
  }

  // Create loading placeholders
  const loadingContainers = blogConfigs.map(() => createLoadingContainer());
  loadingContainers.forEach(container => blogsContainer.appendChild(container));

  // Load and replace with actual content
  const blogPromises = blogConfigs.map(async (config, index) => {
    try {
      const content = await loadBlogContent(config.filePath);
      const blogContainer = createBlogContainer(content);
      
      // Replace loading container with actual content
      const loadingContainer = loadingContainers[index];
      if (loadingContainer && loadingContainer.parentNode) {
        loadingContainer.parentNode.replaceChild(blogContainer, loadingContainer);
      }
    } catch (error) {
      console.error(`Failed to load blog ${config.id}:`, error);
      const errorContainer = createBlogContainer('Error loading content');
      const loadingContainer = loadingContainers[index];
      if (loadingContainer && loadingContainer.parentNode) {
        loadingContainer.parentNode.replaceChild(errorContainer, loadingContainer);
      }
    }
  });

  // Wait for all blogs to load
  await Promise.all(blogPromises);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
  initializeWebsite();
}