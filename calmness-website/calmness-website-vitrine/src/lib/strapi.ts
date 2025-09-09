import { 
  PageAccueil, 
  PageAPropos, 
  Service, 
  PageContact, 
  StrapiResponse 
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}

export async function getPageAccueil(): Promise<PageAccueil | null> {
  try {
    const response: StrapiResponse<PageAccueil> = await fetchAPI('/page-accueil?populate=image');
    return response.data;
  } catch (error) {
    console.error('Error fetching page accueil:', error);
    return null;
  }
}

export async function getPageAPropos(): Promise<PageAPropos | null> {
  try {
    const response: StrapiResponse<PageAPropos> = await fetchAPI('/page-a-propos');
    return response.data;
  } catch (error) {
    console.error('Error fetching page à propos:', error);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const response: StrapiResponse<Service[]> = await fetchAPI('/services?sort=ordre:asc');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getPageContact(): Promise<PageContact | null> {
  try {
    const response: StrapiResponse<PageContact> = await fetchAPI('/page-contact');
    return response.data;
  } catch (error) {
    console.error('Error fetching page contact:', error);
    return null;
  }
}

export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}