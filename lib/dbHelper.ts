import { db } from '@/lib/db';

/**
 * Checks whether the primary tables in the database are empty.
 * Returns true if there are no records in newsletter subscriptions, projects, and contact messages.
 */
export async function isDatabaseEmpty(): Promise<boolean> {
  try {
    const [newsletterCount, projectCount, contactCount] = await Promise.all([
      db.newsletterSubscription.count(),
      db.portfolioProject.count(),
      db.contactMessage.count(),
    ]);
    return newsletterCount === 0 && projectCount === 0 && contactCount === 0;
  } catch (error) {
    // If we cannot reach the DB, assume it's not empty (so we won't use mock data).
    console.error('Failed to check database emptiness:', error);
    return false;
  }
}
