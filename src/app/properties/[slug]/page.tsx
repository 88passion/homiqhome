import { notFound } from "next/navigation";
import { getPropertyBySlugServer, getRelatedPropertiesServer } from "@/lib/data/properties.server";
import { PropertyDetailContent } from "@/components/property/PropertyDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlugServer(slug);
  if (!property) return { title: "ไม่พบรายการ | homiqhome" };
  return {
    title: `${property.code} ${property.title} | homiqhome`,
    description: property.shortDescription ?? property.title,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlugServer(slug);
  if (!property) notFound();

  const related = await getRelatedPropertiesServer(property, 4);

  return <PropertyDetailContent property={property} related={related} />;
}
