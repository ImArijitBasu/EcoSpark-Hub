export interface User {
  id: string;
  name: string;
  email: string;
  role: 'MEMBER' | 'ADMIN';
  avatar: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    ideas: number;
    votes: number;
    comments: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  miniImage?: string | null;
  bannerImage?: string | null;
  createdAt: string;
  _count?: {
    ideas: number;
  };
}

export interface Idea {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  images: string[];
  isPaid: boolean;
  price: number | null;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  adminFeedback: string | null;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    avatar: string | null;
    email?: string;
  };
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  hasPaid?: boolean;
}

export interface Vote {
  id: string;
  type: 'UPVOTE' | 'DOWNVOTE';
  createdAt: string;
  userId: string;
  ideaId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  ideaId: string;
  parentId: string | null;
  replies?: Comment[];
}

export interface Payment {
  id: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  userId: string;
  ideaId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
