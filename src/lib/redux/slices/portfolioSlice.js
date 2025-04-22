import { createSlice } from "@reduxjs/toolkit";

// Initial portfolio template
const initialState = {
  currentPortfolio: {
    id: "default",
    title: "My Portfolio",
    sections: [
      {
        id: "header",
        type: "header",
        content: {
          name: "Your Name",
          title: "Professional Title",
          subtitle: "Brief tagline about yourself",
          image:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
        },
        order: 0,
      },
      {
        id: "about",
        type: "about",
        content: {
          title: "About Me",
          description: "Write a compelling introduction about yourself here.",
          skills: ["Web Design", "UX/UI", "Frontend Development"],
        },
        order: 1,
      },
      {
        id: "projects",
        type: "projects",
        content: {
          title: "My Projects",
          projects: [
            {
              id: "project1",
              title: "Project One",
              description: "Description of your first project",
              image:
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
              link: "#",
            },
            {
              id: "project2",
              title: "Project Two",
              description: "Description of your second project",
              image:
                "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
              link: "#",
            },
          ],
        },
        order: 2,
      },
      {
        id: "contact",
        type: "contact",
        content: {
          title: "Contact Me",
          email: "your.email@example.com",
          phone: "+1 123 456 7890",
          social: {
            twitter: "https://twitter.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername",
            github: "https://github.com/yourusername",
          },
        },
        order: 3,
      },
    ],
    theme: {
      primaryColor: "#6E59A5",
      secondaryColor: "#2DD4BF",
      fontFamily: "Inter, sans-serif",
    },
  },
  savedPortfolios: [],
  isDragging: false,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updatePortfolioTitle: (state, action) => {
      state.currentPortfolio.title = action.payload;
    },
    updateSection: (state, action) => {
      const { sectionId, updates } = action.payload;
      const sectionIndex = state.currentPortfolio.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        state.currentPortfolio.sections[sectionIndex] = {
          ...state.currentPortfolio.sections[sectionIndex],
          ...updates,
        };
      }
    },
    addSection: (state, action) => {
      const newSection = {
        ...action.payload,
        id: `${action.payload.type}-${Date.now()}`, // Make ID unique
        order: state.currentPortfolio.sections.length
      };
      state.currentPortfolio.sections.push(newSection);
    },
    removeSection: (state, action) => {
      const sectionId = action.payload;
      state.currentPortfolio.sections = state.currentPortfolio.sections.filter(
        (section) => section.id !== sectionId
      );

      // Reorder remaining sections
      state.currentPortfolio.sections.forEach((section, index) => {
        section.order = index;
      });
    },
    reorderSections: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      // Make a copy of the sections array to avoid direct modification
      const sections = [...state.currentPortfolio.sections];
      const [removed] = sections.splice(sourceIndex, 1);
      sections.splice(destinationIndex, 0, removed);

      // Update order property for each section
      sections.forEach((section, index) => {
        section.order = index;
      });

      state.currentPortfolio.sections = sections;
    },
    updateTheme: (state, action) => {
      state.currentPortfolio.theme = {
        ...state.currentPortfolio.theme,
        ...action.payload,
      };
    },
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    savePortfolio: (state) => {
      const portfolioExists = state.savedPortfolios.some(
        (p) => p.id === state.currentPortfolio.id
      );

      if (!portfolioExists) {
        // Use a deep copy to ensure we don't maintain references to the current portfolio
        state.savedPortfolios.push(
          JSON.parse(JSON.stringify(state.currentPortfolio))
        );
      } else {
        state.savedPortfolios = state.savedPortfolios.map((p) =>
          p.id === state.currentPortfolio.id
            ? JSON.parse(JSON.stringify(state.currentPortfolio))
            : p
        );
      }
    },
    loadPortfolio: (state, action) => {
      // Create a deep copy to ensure we don't have reference issues
      state.currentPortfolio = JSON.parse(JSON.stringify(action.payload));
    },
    importPortfolio: (state, action) => {
      // Create a deep copy to ensure we don't have reference issues
      state.currentPortfolio = JSON.parse(JSON.stringify(action.payload));
    },
    createNewPortfolio: (state, action) => {
      const id = `portfolio-${Date.now()}`;
      // Create a deep copy of the initial template
      const newPortfolio = JSON.parse(
        JSON.stringify(initialState.currentPortfolio)
      );
      newPortfolio.id = id;
      newPortfolio.title =
        action.payload || `Portfolio ${state.savedPortfolios.length + 1}`;
      state.currentPortfolio = newPortfolio;
    },
  },
});

export const {
  updatePortfolioTitle,
  updateSection,
  addSection,
  removeSection,
  reorderSections,
  updateTheme,
  setDragging,
  savePortfolio,
  loadPortfolio,
  importPortfolio,
  createNewPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
