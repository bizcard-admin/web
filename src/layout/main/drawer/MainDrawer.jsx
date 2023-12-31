import PropTypes from 'prop-types';

import { Box, Drawer, useMediaQuery } from "@mui/material";
import MiniDrawerStyled from "./MiniDrawerStyled";
import DrawerHeader from "./header/DrawerHeader";
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { drawerWidth } from '../../../config';
import DrawerContent from './content/DrawerContent';


const MainDrawer =({ open, handleDrawerToggle, window })=>{
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                {drawerHeader}
                {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    borderRight: `1px solid ${theme.palette.divider}`,
                    backgroundImage: 'none',
                    boxShadow: 'inherit'
                    }
                }}
                >
                {open && drawerHeader}
                {open && drawerContent}
                </Drawer>
            )}
        </Box>
    );
}

MainDrawer.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    window: PropTypes.object
};
  
export default MainDrawer;