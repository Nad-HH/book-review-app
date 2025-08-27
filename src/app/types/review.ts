export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Review {
  id: number;
  userId: number;
  book_title: string;
  rating: number;
  review: string;
  mood: string;
  created_at: string;
  user: User;
}
