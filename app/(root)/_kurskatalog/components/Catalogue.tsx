"use client";

import dynamic from "next/dynamic";
import { Loading, PageContainer } from "@/components";
import CatalogueFilters from "./CatalogueFilters";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import ActivityList from "./ActivityList";
import { INITIAL_FILTERS } from "../constants/filters";
import MobileFiltersContainer from "./MobileFiltersContainer";
import usePrevious from "@/lib/hooks/usePrevious";
import { UserContext } from "@/lib/context/UserContext";
import { User } from "@/api/types/user";
import useFilters from "../hooks/useFilters";

const Map = dynamic(() => import("@/components/geo/Map"), { ssr: false });
const GeocodingProvider = dynamic(
  () => import("@/components/geo/GeocodingProvider"),
  { ssr: false }
);
const AutocompleteProvider = dynamic(
  () => import("@/components/geo/AutocompleteProvider"),
  { ssr: false }
);

function Catalogue({
  user,
  isMobile,
}: {
  user: User | null;
  isMobile: boolean;
}) {
  const { filters, setFilters } = useFilters({ user });

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const [expandMap, setExpandMap] = useState(false);
  const [hideMap, setHideMap] = useState(isMobile);

  const wasMobile = usePrevious(isMobile);

  useEffect(() => {
    if (wasMobile !== undefined && wasMobile !== isMobile) {
      setHideMap(isMobile);
      setExpandMap(false);
    }
  }, [isMobile, wasMobile]);

  useEffect(() => {
    if (mapRef && filters.location) {
      mapRef.setCenter(filters.location);
    }
  }, [filters.location, mapRef]);

  const toggleMap = useCallback(() => {
    setHideMap((previous) => !previous);
    setExpandMap(isMobile ? (previous) => !previous : false);
  }, [isMobile]);

  const toggleExpandMap = () => {
    setExpandMap((previous) => !previous);
    setHideMap(isMobile ? (previous) => !previous : false);
  };

  const clearFilters = () => {
    setFilters({ ...INITIAL_FILTERS });
  };

  const headerOffsetHeight = {
    xs: "58px",
    sm: "64px",
    lg: "90px",
  };

  const mapHeight = Object.fromEntries(
    Object.entries(headerOffsetHeight).map(([key, value]) => [
      key,
      `calc(100vh - ${value})`,
    ])
  );

  return (
    <PageContainer
      containerOverrides={{
        maxWidth: false,
        disableGutters: true,
      }}
      boxOverrides={{
        sx: {
          pt: headerOffsetHeight,
          pb: 0,
          minHeight: "unset",
        },
      }}
    >
      <GeocodingProvider>
        <AutocompleteProvider>
          <CatalogueFilters
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            hidden={isMobile && !hideMap}
          />
          {isMobile ? (
            <MobileFiltersContainer
              setFilters={setFilters}
              filters={filters}
              hideMap={hideMap}
              toggleMap={toggleMap}
              clearFilters={clearFilters}
            />
          ) : null}
        </AutocompleteProvider>
      </GeocodingProvider>
      <Stack direction="row">
        <Box
          sx={{
            width: hideMap ? "100vw" : expandMap ? 0 : "50vw",
            display: expandMap ? "none" : "block",
          }}
        >
          <ActivityList
            fullWidth={hideMap}
            mapRef={mapRef}
            filters={filters}
            toggleMap={toggleMap}
            user={user}
          />
        </Box>
        <Box
          sx={{
            display: hideMap ? "none" : "block",
            width: hideMap ? 0 : expandMap ? "100vw" : "50vw",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: mapHeight,
              position: "sticky",
              top: headerOffsetHeight,
            }}
          >
            <Stack
              sx={{
                bgcolor: "grey.400",
                textAlign: "center",
                justifyContent: "center",
                position: "relative",
                height: "100%",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 16, left: 17, zIndex: 4 }}
                onClick={toggleExpandMap}
              >
                {expandMap ? (
                  <ArrowForwardIosRounded />
                ) : (
                  <ArrowBackIosRounded />
                )}
              </IconButton>
              {!isMobile ? (
                <Button
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 17,
                    width: 170,
                    zIndex: 4,
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                  onClick={toggleMap}
                  variant="outlined"
                >
                  Karte ausblenden
                </Button>
              ) : null}
              <Map setMapRef={setMapRef} />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </PageContainer>
  );
}

export default function CatalogueBreakpointWrapper() {
  const { user, loading } = useContext(UserContext);

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("lg")
  );

  if (loading) return <Loading />;

  return <Catalogue isMobile={isMobile} user={user} />;
}
