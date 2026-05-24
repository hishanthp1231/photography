export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  img: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah & David",
    role: "Wedding Client",
    quote: "Studio 96 did not just photograph our wedding; they directed a cinematic love story. Every glance, tear, and golden particle of light was captured with an emotional gravity that still takes our breath away years later.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "test-2",
    name: "Michael R.",
    role: "60th Birthday Celebration",
    quote: "Gathering four generations of our family under one lens was no easy feat, but the photographers handled it with graceful professionalism. The resulting archival portraits are now our family's most treasured legacy.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "test-3",
    name: "Priya S.",
    role: "Puberty Ceremony",
    quote: "Capturing traditional cultural ceremonies requires a delicate balance of respect and artistry. The team integrated flawlessly, preserving each sacred ritual in stunning detail with elegant, modern editorial clarity.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "test-4",
    name: "Emma & Chris",
    role: "Fine Art Pre-Shoot",
    quote: "We were nervous about modeling, but the atmosphere created was so relaxed and genuine. The photographer directed us like actors in a movie scene, using natural light to carve out our emotions beautifully.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
];
