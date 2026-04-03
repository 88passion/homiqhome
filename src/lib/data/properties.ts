import { getAllThaiProvinces, getDistrictsByProvince, sortProvincesByPriority } from "@/lib/constants/thaiLocations";
import type { Property, PropertyImage, PropertyListingCard } from "@/types/property";

const images = (prefix: string, count: number): PropertyImage[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-img-${i}`,
    imageUrl: `https://images.unsplash.com/photo-${["1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1600047509807-ba8f99d2cdde", "1600566753190-17f0baa2a6c3", "1600211892481-0d12a3cd4f71"][i % 5]}?w=1200&q=80`,
    sortOrder: i,
    altText: null,
  }));

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "real-001",
    code: "HM-001",
    slug: "chanthong-iam-land-bang-bua-thong",
    title: "ที่ดินเปล่าแปลงสวย 130 ตร.ว. จันทร์ทองเอี่ยม บางบัวทอง นนทบุรี",
    purpose: "buy",
    propertyType: "land",
    province: "นนทบุรี",
    district: "บางบัวทอง",
    subdistrict: "บางรักพัฒนา",
    locationText: "ซอยเทศบาล 11/4 จันทร์ทองเอี่ยม ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี",
    addressText: "ซอยเทศบาล 11/4 จันทร์ทองเอี่ยม",
    price: 3_900_000,
    landAreaSqw: 130,
    usableAreaSqm: null,
    floorCount: null,
    bedrooms: null,
    bathrooms: null,
    parking: null,
    highlights: [
      "ที่ดินแปลงสวยทรงสี่เหลี่ยม",
      "เข้า-ออกได้หลายเส้นทาง",
      "ใกล้ BTS คลองบางไผ่ 4 นาที",
      "ใกล้เซ็นทรัล เวสต์เกต",
      "ใกล้โรงพยาบาลเกษมราษฎร์ รัตนาธิเบศร์",
      "ใกล้ร้านสะดวกซื้อ ร้านขายยา ตลาด และแหล่งจับจ่ายในชีวิตประจำวัน",
    ],
    shortDescription: "ที่ดินเปล่า 130 ตร.ว. ราคา 30,000 บาท/ตร.ว. ในโซนบางรักพัฒนา บางบัวทอง เดินทางสะดวก ใกล้รถไฟฟ้า โรงเรียน ห้าง โรงพยาบาล และแหล่งจับจ่ายในชีวิตประจำวัน",
    fullDescription: `รายละเอียดทรัพย์
- ที่ดินเปล่าแปลงสวย ขนาด 130 ตร.ว.
- ราคาเฉลี่ย 30,000 บาท/ตร.ว.
- ราคารวม 3,900,000 บาท
- ทำเล: ซอยเทศบาล 11/4 จันทร์ทองเอี่ยม ต.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี
- เจ้าของขายเอง
- สามารถนัดเข้าชมที่ดินจริงได้ทันที

จุดเด่นของแปลง
- รูปแปลงสี่เหลี่ยมสวย จัดวางพื้นที่ได้ง่าย
- เหมาะสำหรับสร้างบ้านพักอาศัย หรือซื้อเก็บไว้พัฒนาในอนาคต
- เข้า-ออกได้หลายเส้นทาง ช่วยให้การเดินทางในโซนบางบัวทองสะดวกขึ้น
- ทำเลอยู่ในย่านชุมชน ใกล้แหล่งอำนวยความสะดวกหลายจุด

สถานที่ใกล้เคียง
- BTS คลองบางไผ่ 4 นาที
- โรงเรียนจันทร์ทองเอี่ยม
- เซ็นทรัล เวสต์เกต
- โรงพยาบาลเกษมราษฎร์ รัตนาธิเบศร์
- ใกล้ร้านสะดวกซื้อ 7-11
- ใกล้ Big C
- ใกล้ Lotus
- ใกล้ร้านขายยา
- ใกล้ตลาดและแหล่งจับจ่ายในชีวิตประจำวัน

เหมาะสำหรับ
- ผู้ที่ต้องการซื้อที่ดินเพื่อปลูกบ้าน
- ผู้ที่มองหาทำเลในโซนบางบัวทองที่เดินทางสะดวก
- ผู้ที่ต้องการซื้อเก็บไว้เป็นทรัพย์ลงทุนระยะกลางถึงระยะยาว`,
    mapUrl: "https://maps.app.goo.gl/Mdw5BaAhQG1pgPNn9",
    lineMessage: "สนใจที่ดินเปล่า 130 ตร.ว. จันทร์ทองเอี่ยม บางบัวทอง นนทบุรี",
    images: images("real-001", 4),
    isFeatured: true,
    isLatest: true,
    status: "published",
  },
];

function firstImage(p: Property): string {
  return p.images.length > 0 ? p.images[0].imageUrl : "";
}

export function getPropertiesByPurpose(purpose: "buy" | "rent"): Property[] {
  return MOCK_PROPERTIES.filter((p) => p.purpose === purpose);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.slug === slug);
}

export function getRelatedProperties(
  currentId: string,
  purpose: Property["purpose"],
  limit: number = 4
): Property[] {
  return MOCK_PROPERTIES.filter((p) => p.id !== currentId && p.purpose === purpose).slice(
    0,
    limit
  );
}

export interface ListingFilters {
  propertyType?: string;
  province?: string;
  district?: string;
  maxPrice?: string;
  bedrooms?: string;
}

export function filterProperties(
  purpose: "buy" | "rent",
  filters: ListingFilters
): Property[] {
  let list = MOCK_PROPERTIES.filter(
    (p) => p.purpose === purpose && p.status !== "sold" && p.status !== "rented"
  );

  if (filters.propertyType) {
    list = list.filter((p) => p.propertyType === filters.propertyType);
  }
  if (filters.province) {
    list = list.filter((p) => p.province === filters.province);
  }
  if (filters.district) {
    list = list.filter((p) => p.district === filters.district);
  }
  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (!Number.isNaN(max)) list = list.filter((p) => p.price <= max);
  }
  if (filters.bedrooms !== undefined && filters.bedrooms !== "") {
    const beds = Number(filters.bedrooms);
    if (!Number.isNaN(beds))
      list = list.filter((p) => (p.bedrooms ?? 0) >= beds);
  }

  return list;
}

export function getUniqueProvinces(purpose: "buy" | "rent"): string[] {
  const propertyCounts = new Map<string, number>();

  MOCK_PROPERTIES.filter((p) => p.purpose === purpose).forEach((p) => {
    propertyCounts.set(p.province, (propertyCounts.get(p.province) ?? 0) + 1);
  });

  const boostedByCount = Array.from(propertyCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "th"))
    .map(([province]) => province);

  return sortProvincesByPriority(getAllThaiProvinces(), boostedByCount);
}

export function getUniqueDistricts(
  purpose: "buy" | "rent",
  province?: string
): string[] {
  if (!province) return [];

  const list = MOCK_PROPERTIES.filter(
    (p) => p.purpose === purpose && p.province === province
  );

  const propertyDistricts = Array.from(new Set(list.map((p) => p.district))).sort((a, b) =>
    a.localeCompare(b, "th")
  );

  const canonicalDistricts = getDistrictsByProvince(province);
  const merged = Array.from(new Set([...propertyDistricts, ...canonicalDistricts]));

  return merged.sort((a, b) => a.localeCompare(b, "th"));
}

export function toListingCard(p: Property): PropertyListingCard {
  return {
    id: p.id,
    code: p.code,
    slug: p.slug,
    title: p.title,
    purpose: p.purpose,
    propertyType: p.propertyType,
    province: p.province,
    district: p.district,
    locationText: p.locationText,
    price: p.price,
    landAreaSqw: p.landAreaSqw,
    usableAreaSqm: p.usableAreaSqm,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    parking: p.parking,
    imageUrl: firstImage(p),
    status: p.status,
  };
}
