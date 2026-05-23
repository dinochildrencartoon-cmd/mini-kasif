import React from "react";
import CategoryGameClient from "./CategoryGameClient";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  return <CategoryGameClient slug={resolvedParams.slug} />;
}

export async function generateStaticParams() {
  return [
    { slug: "colors" },
    { slug: "numbers" },
    { slug: "shapes" },
    { slug: "animals" },
    { slug: "emotions" },
    { slug: "manners" },
    { slug: "english" },
    { slug: "attention" },
  ];
}
export const dynamicParams = false;
