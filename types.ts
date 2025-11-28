export interface Slide {
  id: number;
  type: 'title' | 'section' | 'content' | 'image-text' | 'list' | 'end';
  title?: string;
  subtitle?: string;
  content?: string[];
  imageUrl?: string;
  imageCaption?: string;
  citations?: string[];
  layout?: 'split' | 'full'; // Split for text + image
}

export interface AppState {
  currentSlideIndex: number;
  isChatOpen: boolean;
  chatHistory: ChatMessage[];
  isLoading: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
