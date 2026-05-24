export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: "wedding" | "birthday" | "outdoor" | "preshoot" | "puberty";
  aspect: "portrait" | "landscape" | "square";
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // Wedding
  {
    id: "gal-wed-1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    title: "Sacred Exchange",
    category: "wedding",
    aspect: "portrait",
  },
  {
    id: "gal-wed-2",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    title: "Golden Hour Waltz",
    category: "wedding",
    aspect: "landscape",
  },
  {
    id: "gal-wed-3",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    title: "The Sendoff Spark",
    category: "wedding",
    aspect: "portrait",
  },

  // Birthday
  {
    id: "gal-bday-1",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
    title: "The First Candle",
    category: "birthday",
    aspect: "square",
  },
  {
    id: "gal-bday-2",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
    title: "Celebration Confetti",
    category: "birthday",
    aspect: "landscape",
  },
  {
    id: "gal-bday-3",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    title: "Generations Laughing",
    category: "birthday",
    aspect: "portrait",
  },

  // Outdoor
  {
    id: "gal-out-1",
    url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    title: "Sunset Ridge Walk",
    category: "outdoor",
    aspect: "portrait",
  },
  {
    id: "gal-out-2",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
    title: "Under the Canopy",
    category: "outdoor",
    aspect: "landscape",
  },

  // Pre-Shoot
  {
    id: "gal-pre-1",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    title: "Silent Chemistry",
    category: "preshoot",
    aspect: "landscape",
  },
  {
    id: "gal-pre-2",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    title: "High Fashion Romance",
    category: "preshoot",
    aspect: "portrait",
  },

  // Puberty
  {
    id: "gal-pub-1",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    title: "The Traditional Rite",
    category: "puberty",
    aspect: "portrait",
  },
  {
    id: "gal-pub-2",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    title: "Gathered Kinship",
    category: "puberty",
    aspect: "landscape",
  },
];
