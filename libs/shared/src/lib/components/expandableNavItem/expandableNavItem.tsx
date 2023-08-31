import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
type NavItemProps = {
  children: React.ReactNode;
  listHeaderTxt: string;
  enableDivider: boolean;
};

const expandableNavItem = ({
  children,
  listHeaderTxt,
  enableDivider,
}: NavItemProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List sx={{ width: '100%' }} component="nav">
        <ListItemButton onClick={handleClick} sx={{ pl: 0 }}>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {listHeaderTxt}
              </Typography>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" >
          {children}
        </Collapse>
      </List>
      {enableDivider && <Divider sx={{ my: 1 }} />}
    </>
  );
};

export default expandableNavItem;
