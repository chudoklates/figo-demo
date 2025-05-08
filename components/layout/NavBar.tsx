import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import NextLink from "next/link";
import NavLink from "./components/NavLink";
import DrawerMenu from "./components/DrawerMenu";
import { routes } from "../../constants/routes";
import figoLogo from "@/public/figo.svg";

export default function NavBar({
  transparent = false,
}: {
  transparent?: boolean;
}) {
  return (
    <AppBar color={transparent ? "transparent" : "default"} elevation={0}>
      <Toolbar>
        <Grid2
          container
          columns={24}
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Grid2
            size={{
              xs: 12,
              md: 4,
              xl: 3,
            }}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link href="/" component={NextLink} sx={{ height: 35 }}>
              <Image
                src={figoLogo}
                alt="logo"
                priority
                style={{ width: 82.5, height: 35 }}
              />
            </Link>
          </Grid2>
          <Grid2
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            size={{
              md: 16,
              xl: 18,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
                height: "100%",
                px: { md: 2, xl: 8 },
              }}
            >
              {routes.map((route) => (
                <NavLink href={route.path} key={route.path}>
                  {route.label}
                </NavLink>
              ))}
            </Stack>
          </Grid2>
          <Grid2
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            size={{
              xs: 12,
              md: 0,
            }}
          >
            <DrawerMenu />
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}
