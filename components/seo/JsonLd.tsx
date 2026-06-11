export function JsonLd() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lemuria",
    "image": "https://lemuriahealing.com.au/lemuria-assets/logo/logo.png",
    "@id": "https://lemuriahealing.com.au",
    "url": "https://lemuriahealing.com.au",
    "telephone": "0435 720 595",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Perth Studio",
      "addressLocality": "Perth",
      "addressRegion": "WA",
      "postalCode": "6000",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -31.9505,
      "longitude": 115.8605
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
      "https://www.facebook.com/lemuriahealing",
      "https://www.instagram.com/lemuriahealing"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
}
