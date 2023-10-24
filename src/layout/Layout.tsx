import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "../components";
import { navigation } from "../navigation";

const navItems = [
  {
    label: " Idoven.ai Coding Challenge",
    path: navigation.home,
  },
  {
    label: "Notes",
    path: navigation.notes,
  },
];

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box display="flex">
            {navItems.map(({ label, path }) => (
              <Box key={label} mr={2}>
                <Link to={path}>
                  <Typography variant="h6" color="white">
                    {label}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box paddingTop={10}>{children}</Box>
    </div>
  );
};
