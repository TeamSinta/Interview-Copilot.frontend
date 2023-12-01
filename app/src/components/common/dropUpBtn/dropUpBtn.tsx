import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";

interface DropUpBtnProps {
  mainButtonContent: React.ReactNode;
  dropdownItems: React.ReactNode[];
}

const DropUpBtn: React.FC<DropUpBtnProps> = ({
  mainButtonContent,
  dropdownItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={openMenu}>{mainButtonContent}</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {dropdownItems.map((item, index) => (
          <MenuItem key={index} onClick={closeMenu}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropUpBtn;
