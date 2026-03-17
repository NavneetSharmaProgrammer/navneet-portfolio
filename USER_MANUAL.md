# Portfolio Website User Manual

Welcome to your portfolio website! This manual provides step-by-step instructions on how to maintain, update, and enhance your site.

## 🚀 Local Development Setup

To run the website on your local machine for testing and updates:

1. **Open Terminal**: Navigate to the project root directory.
2. **Install Dependencies**: Run `npm install` (first time only).
3. **Start Dev Server**: Run `npm run dev`.
4. **View Site**: Open the URL provided in the terminal (usually `http://localhost:5173`).

---

## 📄 How to Update Content

Most of your content is managed within the `src/components` directory.

### 1. Updating your Resume
**File:** `src/components/SocialIcons.tsx`

Locate the `<a>` tag with the class name `resume-button` (near the bottom of the file). Replace the `href` attribute with your new Google Drive or file link:

```tsx
// src/components/SocialIcons.tsx (Line 87)
<a className="resume-button" href="YOUR_NEW_LINK_HERE" target="_blank">
  <HoverLinks text="RESUME" />
  ...
</a>
```

### 2. Updating Featured Projects
**File:** `src/components/Projects.tsx`

Modify the `projectsData` array at the top of the file. You can add, remove, or edit existing projects:

```tsx
// src/components/Projects.tsx (Line 6)
const projectsData = [
  {
    id: 1,
    title: "Project Title",
    category: "Category Name",
    icon: <MdNetworkCheck ... />, // Icons from react-icons/md
    description: "Brief project description...",
    tech: ["Tech 1", "Tech 2"],
    link: "Project Link"
  },
  ...
];
```

### 3. Updating the Work Gallery
**File:** `src/components/Work.tsx`

Modify the `projects` array to update the sliding carousel items:

```tsx
// src/components/Work.tsx (Line 10)
const projects = [
  {
    title: "Project Name",
    category: "Detailed description of what it does...",
    tools: "List of tools used",
    image: import.meta.env.BASE_URL + "images/your-image.png",
  },
  ...
];
```
> [!NOTE]
> Make sure to place your images in the `public/images` folder.

### 4. Updating About & Skills
**File:** `src/components/About.tsx`

- **Bio:** Edit the paragraphs inside the `<div className="bio-text">` (Lines 26-34).
- **Core Skills:** Edit the `skills` array (Line 6) to change the icons and labels in the expertise grid.
- **Tech Pills:** Edit the pills section (Lines 52-55) to update your list of familiar technologies.

---

## 🌟 Future Update Ideas

Keep your portfolio fresh and competitive with these ideas:

### Short-Term (Easy)
- **Testimonial Section**: Add a slider for recommendations from colleagues or clients.
- **Micro-interactions**: Use Framer Motion to add "entrance" animations to text as you scroll.
- **Dark/Light Mode**: Implement a theme toggle for user preference.

### Long-Term (Advanced)
- **Interactive Blog**: Integrate a headless CMS (like Sanity or Contentful) to post tech articles.
- **3D Interactive Backgrounds**: Expand your use of Three.js to create more immersive background effects.
- **API Integration**: Connect your "featured projects" to your GitHub API to show live star counts or commit history.
- **Custom Cursor Enhancements**: Make the custom cursor react differently when hovering over specific "Tech Stack" icons.

---

## 🛠 Troubleshooting

- **GSAP Warnings**: If you see GSAP "target not found" warnings, ensure the component is fully mounted before initializing animations (usually inside `useEffect`).
- **Build Errors**: Run `npm run build` locally to catch any TypeScript or linting errors before deploying.
