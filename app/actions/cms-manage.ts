"use server";

import {
  getContentfulEnvironment,
  DEFAULT_LOCALE,
} from "@/lib/cms/contentful-manage";

const environment = await getContentfulEnvironment();

/**
 * Updates the number of available seats for a specific timeslot
 * @param timeslotId The ID of the timeslot to update
 * @param availableSeats The updated number of available seats
 */
export async function updateTimeslotSeats(
  timeslotId: string,
  availableSeats: number
): Promise<void> {
  const entry = await environment.getEntry(timeslotId);

  const published = entry.isPublished();

  entry.fields.seats = {
    [DEFAULT_LOCALE]: availableSeats,
  };

  const updatedEntry = await entry.update();

  if (published) {
    await updatedEntry.publish();
  }
}
