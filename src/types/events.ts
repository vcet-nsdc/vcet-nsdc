export type GalleryImage = { img: string; alt: string };

export type EventItem = {
  id: string;
  title: string;
  dateStart: string; // ISO string
  dateEnd?: string;  // ISO string (optional)
  venue: string;
  shortDescription: string;
  imagePath: string; // public path or URL
  overview: string;
  highlights: string[];
  itinerary: string[];
  awards: string[];
  galleryImages?: GalleryImage[];
};






