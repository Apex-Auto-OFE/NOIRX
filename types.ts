export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HERO = 'hero',
  PHILOSOPHY = 'philosophy',
  PROTOCOL = 'protocol',
  NETWORK = 'network',
  SERVICES = 'services',
  ALGORITHM = 'algorithm',
  DOSSIERS = 'dossiers',
  CONCIERGE = 'concierge',
  CONTACT = 'contact'
}