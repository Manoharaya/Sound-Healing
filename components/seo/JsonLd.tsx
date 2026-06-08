export function JsonLd() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Heart Strong",
    "image": "https://www.heartstrong.com.au/assets/logo.png",
    "@id": "https://www.heartstrong.com.au",
    "url": "https://www.heartstrong.com.au",
    "telephone": "0435 720 595",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mornington Peninsula",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3931",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -38.214,
      "longitude": 145.034
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/heartstrong",
      "https://www.instagram.com/heartstrong"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
}
