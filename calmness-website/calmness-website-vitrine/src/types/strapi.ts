export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface PageAccueil {
  id: number;
  attributes: {
    titre: string;
    slogan: string;
    description: string;
    image?: {
      data?: StrapiMedia;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PageAPropos {
  id: number;
  attributes: {
    titre: string;
    histoire: string;
    mission: string;
    valeurs: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Service {
  id: number;
  attributes: {
    titre: string;
    description: string;
    ordre: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PageContact {
  id: number;
  attributes: {
    titre: string;
    adresse: string;
    telephone: string;
    email: string;
    horaires?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}