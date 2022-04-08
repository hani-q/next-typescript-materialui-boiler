import { useEffect } from 'react';
import Link from './Link';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, Theme, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../svg/icons/ChatBar';
import { Cog as CogIcon } from '../svg/icons/Cog';
import { User as UserIcon } from '../svg/icons/User';
import { Logo } from '../svg/Logo';
import { NavItem } from './NavItem';

const items = [
  {
    href: '/',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard'
  },
  {
    href: '/about',
    icon: <UserIcon fontSize="small" />,
    title: 'About'
  },
  {
    href: '/settings',
    icon: <CogIcon fontSize="small" />,
    title: 'Settings'
  }
];

type DashboardSidebarProps = {
  onClose: () => void;
  open: boolean;
};

export const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <Link href="/" passHref>
            <a>
              <Logo
                variant="primary"
                sx={{
                  height: 42,
                  width: 42
                }}
              />
            </a>
          </Link>
        </Box>
      </div>
      <Divider
        variant="middle"
        sx={{
          borderColor: '#2D3748',
          my: 3
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
