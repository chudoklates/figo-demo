import React, { Suspense } from "react";

import { Metadata } from "next";

import {
  PageContainer,
  EventsList,
  EventsFilters,
  DraftModeButton,
} from "@/components";
import {
  Divider,
  Grid2,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getFilters } from "@/utils/filters";
import { draftMode } from "next/headers";

export default async function Events({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { isEnabled } = await draftMode();

  const searchParams = await searchParamsPromise;

  const page = parseInt(searchParams.page || "1", 10);

  const filtersChanged = !!searchParams.location || !!searchParams.startDate;

  const filters = await getFilters(searchParams);

  return (
    <PageContainer
      boxOverrides={{
        sx: {
          pt: 5,
          pb: 10,
        },
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ textAlign: "center", mb: 3.75 }}
      >
        Nächste Termine
      </Typography>
      <Suspense fallback={<LoadingState />}>
        <EventsList
          page={page}
          filters={filters}
          filtersChanged={filtersChanged}
        />
      </Suspense>
      <DraftModeButton isEnabled={isEnabled} pathname="/termine" />
    </PageContainer>
  );
}

export const metadata: Metadata = {
  title: "Treffen",
  description: "Figo Social - Treffen",
};

function LoadingState() {
  return (
    <React.Fragment>
      <Stack spacing={3.75}>
        <EventsFilters />
        <Divider flexItem />
        <Grid2
          container
          columnSpacing={3.75}
          rowSpacing={3.75}
          sx={{ justifyContent: "center" }}
        >
          {new Array(9).fill(null).map((_, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rounded"
                height={390}
                sx={{ borderRadius: "20px" }}
              />
              <Divider flexItem />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
      <Stack sx={{ alignItems: "center", mt: 5 }}>
        <Pagination count={3} />
      </Stack>
    </React.Fragment>
  );
}
