import React from 'react';
import { db } from '@/lib/db';
import ProjectManagerClient from '@/components/admin/ProjectManagerClient';
import { MOCK_PROJECTS, MOCK_CATEGORIES } from '@/lib/data';

async function getProjectData() {
  let projects = MOCK_PROJECTS;
  let categories = MOCK_CATEGORIES;

  try {
    // Check if DB is online
    await db.$queryRaw`SELECT 1`;
    
    // Fetch real db values
    const dbProjects = await db.portfolioProject.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const dbCategories = await db.category.findMany({
      orderBy: { name: 'asc' }
    });

    if (dbCategories.length > 0) {
      categories = dbCategories.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug }));
    }
    
    projects = dbProjects.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      client: p.client,
      role: p.role,
      year: p.year,
      url: p.url,
      isFeatured: p.isFeatured,
      categoryId: p.categoryId,
      category: { id: p.category.id, name: p.category.name, slug: p.category.slug },
      images: p.images.map((img: any) => ({ id: img.id, url: img.url, isCover: img.isCover }))
    }));

  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.warn('DB read failed for Project Manager, fallback mock data triggered:', errMessage);
  }

  return {
    projects,
    categories: categories.map((c: any) => ({ id: c.id, name: c.name }))
  };
}

export const revalidate = 0; // Dynamic editor page

export default async function AdminProjectsPage() {
  const { projects, categories } = await getProjectData();

  return (
    <div className="space-y-8 page-transition">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Project Manager</h1>
        <p className="text-sm text-muted-foreground font-light mt-1">
          Catalog creative projects, upload visual covers, and tag portfolios with client metadata.
        </p>
      </div>

      <ProjectManagerClient initialProjects={projects as any} categories={categories} />
    </div>
  );
}
