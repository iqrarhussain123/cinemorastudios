// Site-wide data and configuration
export const siteData = {
  // Company Information
  company: {
    name: "Cinemora Studios",
    tagline: "Premium Content Creation Agency",
    description: "We build conversion-focused creative for brands that want real growth.",
    founded: "2023",
    location: "Global"
  },

  // Contact Information
  contact: {
    email: "hello@cinemorastudios.com",
    phone: "+1 (555) 123-4567",
    calendly: "https://calendly.com/cinemora-studios",
    address: {
      street: "123 Creative Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "USA"
    }
  },

  // Social Media Links
  social: {
    linkedin: "https://linkedin.com/company/cinemora-studios",
    instagram: "https://instagram.com/cinemorastudios",
    twitter: "https://twitter.com/cinemorastudios",
    youtube: "https://youtube.com/@cinemorastudios",
    tiktok: "https://tiktok.com/@cinemorastudios"
  },

  // SEO Configuration
  seo: {
    defaultTitle: "Cinemora Studios - Premium Content Creation Agency",
    defaultDescription: "We build conversion-focused creative for brands that want real growth. From ideation to sales, we handle it all.",
    defaultImage: "/images/og-image.jpg",
    keywords: [
      "content creation",
      "video production",
      "social media marketing",
      "brand strategy",
      "creative agency",
      "conversion optimization",
      "premium content",
      "video editing",
      "content strategy",
      "digital marketing"
    ]
  },

  // Services
  services: [
    {
      id: "content-strategy",
      name: "Content Strategy",
      description: "From ideation to scripting",
      icon: "lightbulb"
    },
    {
      id: "video-production",
      name: "Video Production",
      description: "High-end production and editing",
      icon: "video"
    },
    {
      id: "growth-conversion",
      name: "Growth & Conversion",
      description: "From content to sales",
      icon: "trending-up"
    },
    {
      id: "complete-solution",
      name: "Complete Solution",
      description: "We handle everything",
      icon: "check-circle"
    }
  ],

  // Navigation
  navigation: {
    main: [
      { name: "Home", href: "#hero" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" }
    ],
    footer: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" }
    ]
  },

  // Brand Colors
  brand: {
    colors: {
      primary: "#84cc16", // Lime green
      secondary: "#a3e635", // Light lime
      accent: "#65a30d", // Dark lime
      background: "#0a0a0a", // Dark background
      text: {
        primary: "#ffffff",
        secondary: "#d4d4d8",
        muted: "#a1a1aa"
      }
    },
    fonts: {
      heading: "Fraunces",
      body: "Space Grotesk"
    }
  }
};

export default siteData;