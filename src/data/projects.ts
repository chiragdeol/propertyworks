export interface ProjectConfiguration {
  name: string;
  carpetArea: string;
  startingPrice: string; // Gated/locked
}

export interface ProjectLocation {
  city: string;
  locality: string;
  address: string;
  mapsLink: string;
}

export interface ProjectDescription {
  overview: string;
  amenities: string[];
  highlights: string[];
  connectivity: string[];
  locationAdvantages: string[];
  lifestyle: string;
}

export interface ProjectFAQ {
  question: string;
  answer: string;
}

export interface ProjectMedia {
  heroImage: string;
  galleryImages: string[];
  floorPlans: string[]; // Gated/locked
  masterPlan: string;   // Gated/locked
  brochurePdf: string;  // Gated/locked
}

export interface Project {
  id: string; // URL slug
  name: string;
  developer: string; // Gated/locked
  type: "Residential" | "Commercial";
  status: "Active" | "Limited Availability" | "Sold Out" | "Coming Soon";
  location: ProjectLocation;
  pricing: {
    startingPrice: string;
    maxPrice: string; // Gated/locked
  };
  configurations: ProjectConfiguration[];
  media: ProjectMedia;
  description: ProjectDescription;
  faqs: ProjectFAQ[];
}

export const PROJECTS: Project[] = [
  {
    id: "prestige-sanctuary",
    name: "Prestige Sanctuary",
    developer: "Prestige Group",
    type: "Residential",
    status: "Limited Availability",
    location: {
      city: "Bengaluru",
      locality: "Nandi Hills",
      address: "Karalahalli Village, Nandi Hills Road, Devanahalli, Bengaluru, Karnataka 562110",
      mapsLink: "https://maps.google.com/?q=Prestige+Sanctuary+Nandi+Hills"
    },
    pricing: {
      startingPrice: "₹3.75 Cr",
      maxPrice: "₹5.50 Cr"
    },
    configurations: [
      { name: "3 BHK Luxury Villa", carpetArea: "3,200 sq.ft.", startingPrice: "₹3.75 Cr" },
      { name: "4 BHK Premium Villa", carpetArea: "4,100 sq.ft.", startingPrice: "₹4.85 Cr" },
      { name: "4 BHK Grand Villa", carpetArea: "4,800 sq.ft.", startingPrice: "₹5.50 Cr" }
    ],
    media: {
      heroImage: "/images/hero-image.jpg",
      galleryImages: [
        "/images/residential-image.webp",
        "/images/site-visits-image.webp",
        "/images/clarity-confident.webp"
      ],
      floorPlans: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"
      ],
      masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
      brochurePdf: "#"
    },
    description: {
      overview: "Prestige Sanctuary offers an exquisite collection of luxury villas nestled in the serene foothills of Nandi Hills. Designed for those who appreciate natural beauty, quiet, and fine living, this gated community combines world-class architecture with natural landscaping. Each villa offers sweeping, unobstructed views of the surrounding hills, private landscaped gardens, and a personal deck designed to facilitate a tranquil resort-like lifestyle right in the comfort of your home.",
      amenities: [
        "Signature Clubhouse & Lounge",
        "Temperature-Controlled Infinity Pool",
        "Wellness Spa & Meditation Pavilion",
        "Fully Equipped Multi-fit Gym",
        "Clay Tennis & Badminton Courts",
        "Children's Adventure Play Area",
        "24/7 High-Security & Smart Patrols"
      ],
      highlights: [
        "Unobstructed and panoramic scenic view of Nandi Hills",
        "Private landscaped gardens and deck for every villa unit",
        "High-end smart home automation & energy-efficient architecture",
        "Pedestrian-friendly development with zero vehicle noise zones at ground level",
        "Premium location in Bengaluru's major northern expansion corridor"
      ],
      connectivity: [
        "20 minutes drive to Kempegowda International Airport",
        "10 minutes to National Highway 44 (NH 44)",
        "Easy connection to the upcoming Metro Phase-2B Airport line",
        "15 minutes to Devanahalli Business Park & IT Hubs"
      ],
      locationAdvantages: [
        "Located in Nandi Hills micro-market, offering a clean, pollution-free microclimate",
        "High water table and rich green ecosystem",
        "Surrounded by premium resorts and elite educational institutions"
      ],
      lifestyle: "Prestige Sanctuary is built for the premium lifestyle that balances fast-paced city connections with peace, clean air, and wellness-focused natural ecosystems. Here, luxury matches sustainability with solar roof capability, organic waste management, and rainwater recycling systems."
    },
    faqs: [
      {
        question: "What is the total acreage of Prestige Sanctuary?",
        answer: "Prestige Sanctuary is spread across 23 acres of green landscape, consisting of only 85 exclusive luxury villas to ensure low density and high privacy."
      },
      {
        question: "Is the project registered under RERA?",
        answer: "Yes, Prestige Sanctuary is fully registered and approved under Karnataka RERA with active registration numbers available for verification."
      },
      {
        question: "What is the expected possession timeline for the villas?",
        answer: "Possession is scheduled to begin in phases, with the final phase slated for handover by December 2027."
      }
    ]
  },
  {
    id: "lodha-world-towers",
    name: "Lodha World Towers",
    developer: "Lodha Group",
    type: "Residential",
    status: "Active",
    location: {
      city: "Mumbai",
      locality: "Lower Parel",
      address: "Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
      mapsLink: "https://maps.google.com/?q=Lodha+World+Towers+Lower+Parel"
    },
    pricing: {
      startingPrice: "₹8.50 Cr",
      maxPrice: "₹18.00 Cr"
    },
    configurations: [
      { name: "3 BHK Residences", carpetArea: "1,850 sq.ft.", startingPrice: "₹8.50 Cr" },
      { name: "4 BHK Residences", carpetArea: "2,400 sq.ft.", startingPrice: "₹11.20 Cr" },
      { name: "5 BHK Duplex Penthouse", carpetArea: "4,200 sq.ft.", startingPrice: "₹18.00 Cr" }
    ],
    media: {
      heroImage: "/images/residential-image.webp",
      galleryImages: [
        "/images/hero-image.jpg",
        "/images/site-visits-image.webp",
        "/images/clarity-confused.webp"
      ],
      floorPlans: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"
      ],
      masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
      brochurePdf: "#"
    },
    description: {
      overview: "Lodha World Towers, an iconic curved skyscraper landmark standing tall in Mumbai's skyline, redefines the parameters of ultra-luxury. Spanning a vast central park, this architectural marvel is designed by world-renowned structural experts and interior designers. It offers standard-setting residences featuring private entry foyers, high floor-to-ceiling heights, and wide decks looking out to stunning panoramic views of the Arabian Sea and the city lights.",
      amenities: [
        "Private Resident's Club & Sky Lounge",
        "Indoor Heated Lap Pool & Outdoor Resort Pool",
        "Armani/Casa Designed Interior Spaces",
        "Athletic Tracks & State-of-the-art Gym",
        "Private Theater Room",
        "Concierge Services & Valet Parking",
        "Advanced Multi-tier Security System"
      ],
      highlights: [
        "Architectural skyscraper masterpiece with unique curved structural geometry",
        "Interiors curated by world-leading Armani/Casa studio",
        "Sprawling 5-acre landscaped podium park and organic garden",
        "Unmatched views overlooking the Arabian Sea and Mumbai city skyline",
        "Highly coveted address in Mumbai's prime corporate and lifestyle district"
      ],
      connectivity: [
        "5 minutes from Lower Parel commercial hubs",
        "Direct connectivity to Eastern Express Highway & Bandra-Worli Sea Link",
        "10 minutes walk to nearby luxury shopping destination, Palladium Mall",
        "Close proximity to leading corporate hubs and business offices"
      ],
      locationAdvantages: [
        "Lower Parel represents the epicenter of South Mumbai's premium commercial & residential life",
        "Direct access to fine dining, high-end nightlife, and cultural centers",
        "Surrounded by top medical institutions and elite schools"
      ],
      lifestyle: "Living at the Lodha World Towers represents status, comfort, and luxury. Residents have access to private lounge facilities, personal concierge assistance, and a private park, providing a peaceful escape from the energy of the metropolis."
    },
    faqs: [
      {
        question: "Who is the design architect for World Towers?",
        answer: "The World Towers were designed by the famous architectural firm Pei Cobb Freed & Partners, based in New York, with interiors crafted by Armani/Casa."
      },
      {
        question: "Is there a sports facility inside the premises?",
        answer: "Yes, the complex includes extensive sports amenities, including tennis courts, an indoor squash court, a standard athletic track, and a fully equipped gym."
      }
    ]
  },
  {
    id: "dlf-cybercity",
    name: "DLF CyberCity",
    developer: "DLF Limited",
    type: "Commercial",
    status: "Active",
    location: {
      city: "Gurugram",
      locality: "Sector 24, Phase 3",
      address: "DLF Cyber City, Sector 24, Gurugram, Haryana 122002",
      mapsLink: "https://maps.google.com/?q=DLF+Cyber+City+Gurugram"
    },
    pricing: {
      startingPrice: "₹2.20 Cr",
      maxPrice: "₹15.00 Cr"
    },
    configurations: [
      { name: "Grade-A Office Space", carpetArea: "800 sq.ft.", startingPrice: "₹2.20 Cr" },
      { name: "Premium Office Suite", carpetArea: "1,500 sq.ft.", startingPrice: "₹4.50 Cr" },
      { name: "Retail Showroom Space", carpetArea: "2,200 sq.ft.", startingPrice: "₹8.80 Cr" }
    ],
    media: {
      heroImage: "/images/commercial-image.jpg",
      galleryImages: [
        "/images/hero-image.jpg",
        "/images/site-visits-image.webp",
        "/images/clarity-confident.webp"
      ],
      floorPlans: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"
      ],
      masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
      brochurePdf: "#"
    },
    description: {
      overview: "DLF CyberCity Gurugram is the definitive corporate powerhouse of Northern India. Known as one of the most prominent business hubs in the country, it houses a major share of Fortune 500 companies. This integrated commercial ecosystem offers grade-A commercial buildings, next-generation computing infrastructure, high-efficiency floor layouts, and unmatched lifestyle amenities integrated into a single futuristic work destination.",
      amenities: [
        "Grade-A LEED Certified Building Structures",
        "24/7 Advanced Power Backups & Chillers",
        "Direct High-Speed Fiber Connectivity",
        "Integrated Cyber Hub Food & Lifestyle Court",
        "Multi-layer Smart Security & CCTV network",
        "Professional Business Lounge & Meeting Rooms",
        "Ample Automated Multi-level Parking Slots"
      ],
      highlights: [
        "Leading commercial corporate ecosystem in India housing top-tier global brands",
        "LEED Platinum certified green buildings with high energy efficiency",
        "Immediate access to DLF CyberHub – India's premier food & lifestyle zone",
        "Advanced high-capacity mechanical, electrical, and HVAC systems",
        "Unbeatable brand positioning and corporate networking advantages"
      ],
      connectivity: [
        "Directly connected to Rapid Metro station within the campus",
        "Immediate access to National Highway 8 (NH-8 / Delhi-Gurugram Expressway)",
        "15 minutes drive to Indira Gandhi International Airport, New Delhi",
        "Direct skywalk connections to major transit networks"
      ],
      locationAdvantages: [
        "Gurugram's ultimate corporate district with excellent social infrastructure",
        "Surrounded by premium residential townships and elite hotels",
        "Excellent city connectivity and access to top engineering talent pools"
      ],
      lifestyle: "Designed to support modern business needs, DLF CyberCity blends high-productivity office designs with lifestyle amenities. With CyberHub steps away, professionals enjoy access to premium dining, fitness centers, and entertainment zones right after work."
    },
    faqs: [
      {
        question: "Is there access control security implemented?",
        answer: "Yes, all towers inside DLF CyberCity implement RFID-card access control at entry turnstiles, guest registrations, and 24/7 security desks."
      },
      {
        question: "What are the eco-friendly certifications of these commercial spaces?",
        answer: "The commercial buildings in DLF CyberCity have achieved LEED Platinum certification, demonstrating energy efficiency, green compliance, and waste management standards."
      }
    ]
  },
  {
    id: "brigade-signature-towers",
    name: "Brigade Signature Towers",
    developer: "Brigade Group",
    type: "Commercial",
    status: "Coming Soon",
    location: {
      city: "Bengaluru",
      locality: "Old Madras Road",
      address: "Brigade Golden Triangle, Old Madras Road, Katamnallur, Bengaluru, Karnataka 560049",
      mapsLink: "https://maps.google.com/?q=Brigade+Signature+Towers+Old+Madras+Road"
    },
    pricing: {
      startingPrice: "₹1.45 Cr",
      maxPrice: "₹9.80 Cr"
    },
    configurations: [
      { name: "Smart Office Space", carpetArea: "650 sq.ft.", startingPrice: "₹1.45 Cr" },
      { name: "Executive Commercial Floor", carpetArea: "2,000 sq.ft.", startingPrice: "₹4.80 Cr" },
      { name: "Anchor Retail Space", carpetArea: "3,500 sq.ft.", startingPrice: "₹9.80 Cr" }
    ],
    media: {
      heroImage: "/images/site-visits-image.webp",
      galleryImages: [
        "/images/hero-image.jpg",
        "/images/commercial-image.jpg",
        "/images/clarity-confused.webp"
      ],
      floorPlans: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400"
      ],
      masterPlan: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800",
      brochurePdf: "#"
    },
    description: {
      overview: "Brigade Signature Towers is the upcoming landmark commercial development in East Bengaluru. Part of the larger Brigade Golden Triangle township, it offers Grade-A office spaces designed to foster productivity, innovation, and corporate collaboration. With a double-height entrance lobby, smart building management systems, and a green plaza, it is the ideal destination for mid-to-large-scale businesses looking to establish a prominent presence in Bengaluru's growth corridor.",
      amenities: [
        "Double-Height Corporate Entrance Lobby",
        "Integrated Smart Building Management System (BMS)",
        "Zero-Outage High-Capacity Power Backup",
        "Centralized VRV Air Conditioning System",
        "Eco-friendly Landscaped Central Plaza",
        "Retail Shops & Cafeterias at Ground Level",
        "Dedicated Multi-level Basements for Parking"
      ],
      highlights: [
        "Part of the thriving 20-acre Brigade Golden Triangle integrated township",
        "Grade-A commercial workspace with high-efficiency floor plates",
        "LEED Gold certified green building construction standards",
        "Double-height grand entrance lobby with modern visitor lounges",
        "Strategic location connecting Bengaluru with Chennai corridor"
      ],
      connectivity: [
        "Located on Old Madras Road, connecting Whitefield with Central Bengaluru",
        "15 minutes drive to KR Puram railway station and upcoming Metro",
        "30 minutes drive to Kempegowda International Airport via Cargo Road",
        "Immediate access to NH 75 and Outer Ring Road connecting key city zones"
      ],
      locationAdvantages: [
        "Old Madras Road is Bengaluru's fastest-growing residential and commercial corridor",
        "Within an integrated township containing retail, residential, and hotel components",
        "Direct connection to Whitefield IT district and Hoodi industrial zones"
      ],
      lifestyle: "Brigade Signature Towers represents the next generation of business spaces. Blending green architecture with retail conveniences, cafeterias, and relaxation plazas, it offers a refreshing work environment designed to support employee well-being."
    },
    faqs: [
      {
        question: "Is this property part of an integrated township?",
        answer: "Yes, Brigade Signature Towers is located inside the Brigade Golden Triangle integrated township, which includes luxury residential apartments, retail stores, and a Signature Holiday Inn hotel."
      },
      {
        question: "What is the security system proposed?",
        answer: "The building will deploy advanced 24/7 security with physical guards, boom barriers, CCTV surveillance across all floors, and fire safety systems."
      }
    ]
  }
];
