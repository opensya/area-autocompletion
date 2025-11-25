/**
 * Représentation typée d'une zone géographique.
 */
export type AreaData = {
  /** Nom principal officiel de la zone. */
  name: string;

  /** Liste des noms alternatifs (langues locales, historiques, abréviations…). */
  alt_names: string[];

  /** Type de zone (ex. : "city", "region", "country"). */
  type: string;

  /** Code ou identifiant de la zone parente (ex. région pour une ville). */
  parent: string;

  /** Code interne ou administratif utilisé pour identifier la zone. */
  code: string;

  /** Code ISO officiel (ex. ISO 3166-2). */
  iso_code: string;

  /** Population estimée de la zone. */
  population: number;

  /** Superficie en kilomètres carrés. */
  area_km2: number;

  /** Coordonnées géographiques centrales de la zone. */
  coordinates: {
    /** Latitude décimale. */
    lat: number;

    /** Longitude décimale. */
    lng: number;
  };

  /** Boîte englobante (bounding box) définissant les limites géographiques approximatives. */
  bounding_box: {
    /** Limite nord (latitude). */
    north: number;

    /** Limite sud (latitude). */
    south: number;

    /** Limite est (longitude). */
    east: number;

    /** Limite ouest (longitude). */
    west: number;
  };

  /** Fuseau horaire principal (format IANA, ex. "Europe/Paris"). */
  timezone: string;

  /** Statut de la zone (ex. "active", "deprecated"). */
  status: string;

  /** Date de création de l’enregistrement (ISO 8601). */
  created_at: string;

  /** Date de dernière mise à jour de l’enregistrement (ISO 8601). */
  updated_at: string;

  /** Liens externes ou sources associées. */
  links: string[];

  /** Notes informatives ou remarques diverses. */
  notes: string;

  /** Identifiants des zones voisines. */
  neighbors: string[];
};
