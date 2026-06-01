import { ok, handleRouteError } from '@/server/http';
import { getSettings } from '@/server/services/settingsService';

// Public: business settings the storefront needs (e.g. UPI id, registration
// open flag, contact info). Technical settings are never exposed here.
export async function GET() {
  try {
    return ok(await getSettings('business'));
  } catch (error) {
    return handleRouteError(error);
  }
}
