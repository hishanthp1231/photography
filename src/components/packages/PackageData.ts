export interface Package {
  id: string;
  name: string;
  category: "wedding" | "ceremony" | "birthday" | "shoot";
  price: string;
  tagline: string;
  duration: string;
  photos: string;
  delivery: string;
  features: string[];
  tier: "silver" | "gold" | "platinum" | "standard";
}

export const PACKAGES: Package[] = [
  // Wedding
  {
    id: "wed-silver",
    name: "Silver Wedding",
    category: "wedding",
    price: "Bespoke Pricing",
    tagline: "Elegant coverage for intimate celebrations.",
    duration: "6 Hours Coverage",
    photos: "300+ Edited Images",
    delivery: "4 Weeks Delivery",
    features: [
      "1 Principal Photographer",
      "High-Resolution Digital Gallery",
      "Online Highlight Gallery",
      "Pre-Wedding Consultation",
      "Digital Download Access",
    ],
    tier: "silver",
  },
  {
    id: "wed-gold",
    name: "Gold Wedding",
    category: "wedding",
    price: "Bespoke Pricing",
    tagline: "Cinematic storytelling for the grand day.",
    duration: "10 Hours Coverage",
    photos: "600+ Edited Images",
    delivery: "6 Weeks Delivery",
    features: [
      "2 Principal Photographers",
      "100 Page Premium Fine Art Album",
      "Complimentary Pre-Shoot Session",
      "High-Res Digital Gallery + Print Release",
      "Drone Aerial Shots (Venue)",
      "Sneak Peek within 48 Hours",
    ],
    tier: "gold",
  },
  {
    id: "wed-platinum",
    name: "Platinum Wedding",
    category: "wedding",
    price: "Bespoke Portfolio",
    tagline: "Elite storytelling with zero compromise.",
    duration: "Full Day Coverage",
    photos: "1000+ Edited Images",
    delivery: "8 Weeks Delivery",
    features: [
      "Lead Photographer + 2 Associates",
      "Premium Leather-Bound Archival Album",
      "Two Parent Replica Albums",
      "Full Cinematic Pre-Shoot & Video Highlight",
      "Next-Day Visual Highlights Reel",
      "Same-Day Edit Slideshow",
      "Lifetime Cloud Backup",
    ],
    tier: "platinum",
  },
  
  // Puberty Ceremony
  {
    id: "cer-puberty",
    name: "Puberty Ceremony",
    category: "ceremony",
    price: "Bespoke Pricing",
    tagline: "Preserving traditional milestones with modern editorial style.",
    duration: "5 Hours Coverage",
    photos: "250+ Edited Images",
    delivery: "3 Weeks Delivery",
    features: [
      "1 Senior Photographer",
      "Traditional & Candid Coverage",
      "Online Shareable Gallery",
      "Premium Print Package (10 Prints)",
      "USB Archive Box",
    ],
    tier: "standard",
  },

  // Birthday Packages
  {
    id: "bday-first",
    name: "First Birthday",
    category: "birthday",
    price: "Bespoke Pricing",
    tagline: "Delicate captures of the magical first milestone.",
    duration: "3 Hours Coverage",
    photos: "150+ Edited Images",
    delivery: "2 Weeks Delivery",
    features: [
      "1 Portrait Photographer",
      "Cake Smash Setup Capture",
      "Family & Guest Group Portraits",
      "Custom Digital Album Layout",
      "Download Link",
    ],
    tier: "silver",
  },
  {
    id: "bday-key",
    name: "Key Milestone Birthday",
    category: "birthday",
    price: "Bespoke Pricing",
    tagline: "Energetic and candid coverage for youth milestones.",
    duration: "4 Hours Coverage",
    photos: "200+ Edited Images",
    delivery: "3 Weeks Delivery",
    features: [
      "1 Principal Photographer",
      "Candid Party Highlights",
      "Red Carpet Entry Portraits",
      "High-Resolution Downloads",
      "Optional Video Clip Highlight",
    ],
    tier: "gold",
  },
  {
    id: "bday-sixty",
    name: "60th Diamond Jubilee",
    category: "birthday",
    price: "Bespoke Pricing",
    tagline: "Graceful documentation of generations gathered.",
    duration: "5 Hours Coverage",
    photos: "300+ Edited Images",
    delivery: "3 Weeks Delivery",
    features: [
      "1 Senior + 1 Assistant Photographer",
      "Multi-Generational Family Portraits",
      "Speech & Toast Videography Clips",
      "Jubilee Commemorative Album",
      "Gold Foil USB Keepsake",
    ],
    tier: "platinum",
  },

  // Shoots
  {
    id: "shoot-pre",
    name: "Pre-Shoot Fine Art",
    category: "shoot",
    price: "Bespoke Pricing",
    tagline: "Curated editorial session in premium locations.",
    duration: "4 Hours Session",
    photos: "50+ Graded Portraits",
    delivery: "2 Weeks Delivery",
    features: [
      "Location Consultation & Moodboarding",
      "Two Outfit Changes",
      "Signature Color Grading styles",
      "Fine Art Matte Prints (5)",
      "High-Resolution Digital Files",
    ],
    tier: "gold",
  },
  {
    id: "shoot-outdoor",
    name: "Outdoor Story",
    category: "shoot",
    price: "Bespoke Pricing",
    tagline: "Raw emotions captured in wild, natural light.",
    duration: "3 Hours Session",
    photos: "40+ Graded Portraits",
    delivery: "2 Weeks Delivery",
    features: [
      "Natural Light Specialist",
      "Adventure Location Scouting",
      "Atmospheric Grading",
      "Digital High-Res Gallery",
      "Print Release",
    ],
    tier: "silver",
  },
];
