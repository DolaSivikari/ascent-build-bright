/**
 * Content Migration Script
 * 
 * Migrates static JSON content to Supabase database
 * Run with: npx tsx scripts/migrate-content.ts
 */

import { createClient } from '@supabase/supabase-js';
import blogPosts from '../src/data/blog-posts-complete.json';
import projects from '../src/data/projects-expanded.json';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function migrateArticles() {
  console.log('\n📝 Migrating Articles...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const post of blogPosts.posts) {
    try {
      const articleData = {
        title: post.title,
        slug: post.slug || generateSlug(post.title),
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: [],
        featured: post.featured || false,
        status: 'published',
        featured_image_url: post.image,
        read_time: post.readTime,
        published_at: new Date(post.date).toISOString(),
        created_at: new Date(post.date).toISOString(),
      };

      const { error } = await supabase
        .from('articles')
        .upsert(articleData, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error migrating article "${post.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Migrated: ${post.title}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception migrating article "${post.title}":`, err);
      errorCount++;
    }
  }

  console.log(`\n✨ Articles Migration Complete: ${successCount} succeeded, ${errorCount} failed`);
}

async function migrateProjects() {
  console.log('\n🏗️ Migrating Projects...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const project of projects.projects) {
    try {
      const projectData = {
        title: project.title,
        slug: project.id,
        category: project.category,
        location: project.location,
        year: project.year,
        short_description: project.shortDescription,
        full_description: project.shortDescription,
        services: project.services || [],
        tags: project.tags || [],
        featured: project.featured || false,
        status: 'published',
        thumbnail_url: project.thumbnail,
        before_image_url: project.beforeImage,
        after_image_url: project.afterImage,
        timeline: project.timeline,
        cost_band: project.costBand,
        testimonial: project.testimonial || null,
        published_at: new Date(`${project.year}-01-01`).toISOString(),
        created_at: new Date(`${project.year}-01-01`).toISOString(),
      };

      const { error } = await supabase
        .from('projects')
        .upsert(projectData, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error migrating project "${project.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Migrated: ${project.title}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Exception migrating project "${project.title}":`, err);
      errorCount++;
    }
  }

  console.log(`\n✨ Projects Migration Complete: ${successCount} succeeded, ${errorCount} failed`);
}

async function main() {
  console.log('🚀 Starting Content Migration...\n');
  console.log(`Target: ${SUPABASE_URL}\n`);

  try {
    await migrateArticles();
    await migrateProjects();
    
    console.log('\n🎉 All migrations completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Verify data in Lovable Backend');
    console.log('   2. Update frontend components to use API endpoints');
    console.log('   3. Test the live website');
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

main();
