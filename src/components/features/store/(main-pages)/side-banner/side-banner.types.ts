export type SideBanner = {
  id: number;
  title: string;
  subtitle?: string;
  image_url: string;
  link?: string;
  position: "top_left" | "top_right" | "bottom_left" | "bottom_right";
  badge_text?: string | null;
  badge_color?: string | null;
  background_color?: string | null;
  sort_order: number;
  is_active: boolean;
};
