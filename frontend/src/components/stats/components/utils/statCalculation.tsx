import {
  isToday,
  parseISO,
  differenceInDays,
  min,
  isSameDay,
  isBefore,
} from "date-fns";

// Count the number of applications today
export function countApplicationsToday(jobs: Job[]) {
  const count = jobs.reduce((total, job) => {
    // Parse the appliedDate string to a Date object
    const applicationDate = parseISO(job.appliedDate);
    if (isToday(applicationDate)) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  return count;
}

export function calculatePercentageChange(jobs: Job[]): number {
  let lastDateCount = 0;
  let todayCount = 0;
  let latestDate: Date | null = null;

  // Find the latest date that isn't today
  jobs.forEach((job) => {
    const applicationDate = parseISO(job.appliedDate);

    if (
      !isToday(applicationDate) &&
      (!latestDate || isBefore(latestDate!, applicationDate))
    ) {
      latestDate = applicationDate;
    }
  });

  // Count the number of entries on the latest date that isn't today
  if (latestDate) {
    jobs.forEach((job) => {
      const applicationDate = parseISO(job.appliedDate);

      if (isSameDay(latestDate!, applicationDate)) {
        lastDateCount += 1;
      }
    });
  }

  // Count the number of entries from today
  jobs.forEach((job) => {
    const applicationDate = parseISO(job.appliedDate);

    if (isToday(applicationDate)) {
      todayCount += 1;
    }
  });

  // Avoid division by zero
  const percentageChange =
    lastDateCount !== 0
      ? ((todayCount - lastDateCount) / lastDateCount) * 100
      : 0;

  const roundedPercentageChange = parseFloat(percentageChange.toFixed(2));

  return roundedPercentageChange;
}
export function calculateAverageEntriesPerDay(jobs: Job[]) {
  if (!jobs || jobs.length === 0) {
    return 0;
  }

  const dates = jobs.map((job) => parseISO(job.appliedDate));
  const earliestDate = min(dates);
  const today = new Date();
  const days = differenceInDays(today, earliestDate);

  const averageEntriesPerDay = jobs.length / days;
  const roundedAverageEntriesPerDay = parseFloat(
    averageEntriesPerDay.toFixed(2)
  );

  return roundedAverageEntriesPerDay;
}

export function countRejections(jobs: Job[]) {
  if (!jobs) {
    return 0;
  }

  const rejectionCount = jobs.filter((job) => job.status === "Rejected").length;

  return rejectionCount;
}

export function countOaAndApplied(jobs: Job[]) {
  if (!jobs) {
    return 0;
  }

  const oaAndAppliedCount = jobs.filter(
    (job) =>
      job.status === "OA" ||
      job.status === "Applied" ||
      job.status === "Callback"
  ).length;

  return oaAndAppliedCount;
}

export function countOffers(jobs: Job[]) {
  if (!jobs) {
    return 0;
  }

  const offerCount = jobs.filter((job) => job.status === "Offer").length;

  return offerCount;
}

export function calculateOfferPercentage(jobs: Job[]) {
  if (!jobs || jobs.length === 0) {
    return 0;
  }

  const offerCount = countOffers(jobs);
  const totalJobs = jobs.length;

  const offerPercentage = (offerCount / totalJobs) * 100;

  // Round the result to two decimal places
  const roundedOfferPercentage = parseFloat(offerPercentage.toFixed(2));

  return roundedOfferPercentage;
}
