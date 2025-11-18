'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  IconButton,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Switch,
  Link,
} from '@mui/material'
import tokens from '@/context/ui-tokens.json'
import NextLink from 'next/link'
import {
  Home,
  ExpandMore,
  ExpandLess,
  UnfoldMore,
  Menu as MenuIcon,
  TrackChanges,
  DarkMode,
  LightMode,
  Logout,
} from '@mui/icons-material'

interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode | string
  path?: string
  external?: boolean
  children?: NavItem[]
}

interface SideNavProps {
  clientName?: string
  logoUrl?: string
  userEmail?: string
  companies?: Array<{ id: string; name: string }>
  onCompanyChange?: (companyId: string) => void
  onTogglePin?: (pinned: boolean) => void
  onLogout?: () => void
  onThemeChange?: (mode: 'light' | 'dark') => void
  currentTheme?: 'light' | 'dark'
  version?: string
  versionDate?: string
}

const getNavItems = (): NavItem[] => [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      id: 'my-footprint',
      label: 'My Footprint',
      icon: 'nature',
      children: [
        {
          id: 'company-carbon-footprint',
          label: 'Company Carbon Footprint',
          children: [
            { id: 'ccf-explorer', label: 'CCF Explorer', path: '/footprint/82' },
            { id: 'ccf-analysis', label: 'CCF Analysis', path: '/footprint/82/analysis' },
          ],
        },
        {
          id: 'supply-chain-hub',
          label: 'Supply Chain Hub',
          children: [
            { id: 'supply-chain-explorer', label: 'Supply Chain Explorer', path: '/supply-chain/explorer' },
            { id: 'supply-chain-analysis', label: 'Supply Chain Analysis', path: '/supply-chain/analysis' },
          ],
        },
      ],
    },
    {
      id: 'my-reduction-journey',
      label: 'My Reduction Journey',
      icon: 'timeline',
      children: [
        {
          id: 'strategy-planning',
          label: 'Strategy Planning',
          children: [
            { id: 'strategy-settings', label: 'Strategy Settings', path: '/strategy' },
            { id: 'levers-library', label: 'Levers Library', path: '/levers' },
            { id: 'roadmap-overview', label: 'Roadmap Overview', path: '/strategy/roadmap' },
          ],
        },
        {
          id: 'progress-tracking',
          label: 'Progress Tracking',
          icon: 'track-changes',
          children: [
            { id: 'reduction-tracking', label: 'Reduction Tracking', path: '/strategy/engage-monitor' },
            { id: 'financial-analysis', label: 'Financial Analysis', path: '/strategy/financial-analysis' },
            { id: 'teams-dashboard', label: 'Teams Dashboard', path: '/strategy/teams' },
          ],
        },
      ],
    },
    {
      id: 'data-computation',
      label: 'Data & Computation',
      icon: 'storage',
      children: [
        {
          id: 'company-carbon-footprint-data',
          label: 'Company Carbon Footprint',
          children: [
            { id: 'data-ingestion', label: 'Data Ingestion', path: '/data-ingestion' },
            { id: 'footprint-builder', label: 'Footprint Builder', path: '/builder' },
            { id: 'footprint-ef-matching', label: 'Footprint EF Matching', path: '/footprint/82/ef-matching-review' },
          ],
        },
        {
          id: 'emission-factors',
          label: 'Emission Factors',
          children: [
            { id: 'ef-hub', label: 'Emission Factors Hub', path: '/ef-hub' },
            { id: 'ef-matching-rules', label: 'EF Matching Rules', path: '/ef-matching-configurations' },
          ],
        },
      ],
    },
    {
      id: 'reporting',
      label: 'Report',
      icon: 'description',
      path: '/reporting',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: 'menu-book',
      path: 'https://co2-ai.gitbook.io/delivery-documentation',
      external: true,
    },
    {
      id: 'contact-support',
      label: 'Contact Support',
      icon: 'headset',
      path: 'https://support.co2ai.com/hc/en-us/requests/new',
      external: true,
    },
  ]

// Custom icons matching the HTML structure
const NatureIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M208.06,184H152a8,8,0,0,0-8,8v12a36,36,0,0,0,72.05,0V192A8,8,0,0,0,208.06,184Zm-8,20a20,20,0,0,1-40,0v-4h40ZM104,160h-56a8,8,0,0,0-8,8v12A36,36,0,0,0,112,180V168A8,8,0,0,0,104,160Zm-8,20a20,20,0,0,1-40,0v-4H96ZM76,16C64.36,16,53.07,26.31,44.2,45c-13.93,29.38-18.56,73,.29,96a8,8,0,0,0,6.2,2.93h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C98.85,26.31,87.57,16,76,16ZM97.15,128H54.78c-11.4-18.1-7.21-52.7,3.89-76.11C65.14,38.22,72.17,32,76,32s10.82,6.22,17.3,19.89C104.36,75.3,108.55,109.9,97.15,128Zm57.61,40h50.55a8,8,0,0,0,6.2-2.93c18.85-23,14.22-66.65.29-96C202.93,50.31,191.64,40,180,40s-22.89,10.31-31.77,29c-13.93,29.38-18.56,73,.29,96A8.05,8.05,0,0,0,154.76,168Zm8-92.11C169.22,62.22,176.25,56,180,56s10.82,6.22,17.29,19.89c11.1,23.41,15.29,58,3.9,76.11H158.85C147.45,133.9,151.64,99.3,162.74,75.89Z" />
  </svg>
)

const TimelineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g id="Icon">
      <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.7166 6.09478C5.83992 4.9509 3.5444 4.57455 2.01459 4.59239C1.46235 4.59883 1.00944 4.15637 1.003 3.60412C0.996558 3.05187 1.43902 2.59897 1.99127 2.59253C3.78633 2.57159 6.47811 2.99765 8.75753 4.38702C11.0928 5.81043 12.9775 8.24575 12.9775 12.0819C12.9775 15.1289 14.4158 16.9356 16.2312 18.021C18.1049 19.1412 20.3986 19.491 21.9289 19.4553C22.481 19.4424 22.939 19.8796 22.9519 20.4317C22.9648 20.9839 22.5276 21.4419 21.9755 21.4548C20.181 21.4966 17.4873 21.1021 15.2049 19.7376C12.8642 18.3381 10.9775 15.9195 10.9775 12.0819C10.9775 9.03341 9.53743 7.20463 7.7166 6.09478ZM9.01196 11.4497C9.56425 11.4497 10.012 11.8974 10.012 12.4497V13.6838C10.012 14.2361 9.56425 14.6838 9.01196 14.6838C8.45968 14.6838 8.01196 14.2361 8.01196 13.6838V12.4497C8.01196 11.8974 8.45968 11.4497 9.01196 11.4497ZM22.012 12.4497C22.012 11.8974 21.5642 11.4497 21.012 11.4497C20.4597 11.4497 20.012 11.8974 20.012 12.4497V13.6838C20.012 14.2361 20.4597 14.6838 21.012 14.6838C21.5642 14.6838 22.012 14.2361 22.012 13.6838V12.4497ZM6.01196 11.4497C6.56425 11.4497 7.01196 11.8974 7.01196 12.4497V13.6838C7.01196 14.2361 6.56425 14.6838 6.01196 14.6838C5.45968 14.6838 5.01196 14.2361 5.01196 13.6838V12.4497C5.01196 11.8974 5.45968 11.4497 6.01196 11.4497ZM19.012 12.4497C19.012 11.8974 18.5642 11.4497 18.012 11.4497C17.4597 11.4497 17.012 11.8974 17.012 12.4497V13.6838C17.012 14.2361 17.4597 14.6838 18.012 14.6838C18.5642 14.6838 19.012 14.2361 19.012 13.6838V12.4497ZM3.01196 11.4497C3.56425 11.4497 4.01196 11.8974 4.01196 12.4497V13.6838C4.01196 14.2361 3.56425 14.6838 3.01196 14.6838C2.45968 14.6838 2.01196 14.2361 2.01196 13.6838V12.4497C2.01196 11.8974 2.45968 11.4497 3.01196 11.4497ZM16.012 12.4497C16.012 11.8974 15.5642 11.4497 15.012 11.4497C14.4597 11.4497 14.012 11.8974 14.012 12.4497V13.6838C14.012 14.2361 14.4597 14.6838 15.012 14.6838C15.5642 14.6838 16.012 14.2361 16.012 13.6838V12.4497Z" />
    </g>
  </svg>
)

const StorageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const DescriptionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

const MenuBookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const HeadsetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88.12,88.12,0,0,1,190.54,65.93,87.39,87.39,0,0,1,215.65,120H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h24a24,24,0,0,1-24,24H136a8,8,0,0,0,0,16h56a40,40,0,0,0,40-40V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm128,56a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24v56Z" />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  home: <Home sx={{ fontSize: 24 }} />,
  nature: <NatureIcon />,
  timeline: <TimelineIcon />,
  storage: <StorageIcon />,
  description: <DescriptionIcon />,
  'menu-book': <MenuBookIcon />,
  headset: <HeadsetIcon />,
  'track-changes': <TrackChanges sx={{ fontSize: 24 }} />,
}

export function SideNav({
  clientName = 'Demo Company',
  logoUrl,
  userEmail = 'user@example.com',
  companies = [{ id: '1', name: 'Demo Company' }],
  onCompanyChange,
  onTogglePin,
  onLogout,
  onThemeChange,
  currentTheme = 'dark',
  version = 'd6334c7',
  versionDate = 'Nov 18 2025',
}: SideNavProps) {
  const pathname = usePathname()
  const navItems = getNavItems()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'my-footprint': true,
    'company-carbon-footprint': true,
    'supply-chain-hub': true,
    'my-reduction-journey': true,
    'strategy-planning': true,
    'progress-tracking': true,
    'data-computation': true,
    'company-carbon-footprint-data': true,
    'emission-factors': true,
  })
  const [companyMenuAnchor, setCompanyMenuAnchor] = useState<null | HTMLElement>(null)
  const [isPinned, setIsPinned] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(currentTheme)

  useEffect(() => {
    setThemeMode(currentTheme)
  }, [currentTheme])

  // Close menu when clicking outside (backdrop is non-blocking)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyMenuAnchor) {
        const target = event.target as Element
        const menuElement = document.querySelector('[id="_r_2_"]')
        const buttonElement = document.querySelector('[aria-describedby="_r_2_"]')
        
        // Close if clicking outside both menu and button
        if (menuElement && !menuElement.contains(target) && 
            buttonElement && !buttonElement.contains(target)) {
          handleCompanyMenuClose()
        }
      }
    }

    if (companyMenuAnchor) {
      // Use a small delay to avoid closing immediately when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [companyMenuAnchor])

  // Find active item based on pathname
  const findActiveItem = (items: NavItem[], path: string): string | null => {
    for (const item of items) {
      if (item.path === path) {
        return item.id
      }
      if (item.children) {
        const found = findActiveItem(item.children, path)
        if (found) return found
      }
    }
    return null
  }

  const activeItem = findActiveItem(navItems, pathname) || ''

  // Auto-expand sections containing the active item
  useEffect(() => {
    const findAndExpandParents = (items: NavItem[], targetPath: string, parents: string[] = []): string[] => {
      for (const item of items) {
        const currentPath = [...parents, item.id]
        if (item.path === targetPath) {
          return currentPath
        }
        if (item.children) {
          const found = findAndExpandParents(item.children, targetPath, currentPath)
          if (found.length > 0) {
            return found
          }
        }
      }
      return []
    }

    const parentIds = findAndExpandParents(navItems, pathname)
    if (parentIds.length > 0) {
      setExpanded((prev) => {
        const newExpanded = { ...prev }
        parentIds.forEach((id) => {
          newExpanded[id] = true
        })
        return newExpanded
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCompanyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Toggle menu: close if already open, open if closed
    if (companyMenuAnchor) {
      handleCompanyMenuClose()
    } else {
      setCompanyMenuAnchor(event.currentTarget)
    }
  }

  const handleCompanyMenuClose = (event?: {} | React.SyntheticEvent) => {
    setCompanyMenuAnchor(null)
  }

  const handleCompanySelect = (companyId: string) => {
    if (onCompanyChange) {
      onCompanyChange(companyId)
    }
    handleCompanyMenuClose()
  }

  const handleTogglePin = () => {
    const newPinnedState = !isPinned
    setIsPinned(newPinnedState)
    if (onTogglePin) {
      onTogglePin(newPinnedState)
    }
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleThemeToggle = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
    if (onThemeChange) {
      onThemeChange(newMode)
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expanded[item.id]
    const isActive = activeItem === item.id

    if (hasChildren && level === 0) {
      // Top-level expandable item
      return (
        <ListItem key={item.id} disablePadding>
          <Box sx={{ width: '100%' }}>
            <ListItemButton
              onClick={() => toggleExpand(item.id)}
              sx={{
                height: 48,
                px: 1,
                py: 0.75,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '&:focus-visible': {
                  outline: `2px solid ${tokens.palette.border.focus.dark}`,
                  outlineOffset: 2,
                },
              }}
            >
              {item.icon && typeof item.icon === 'string' && iconMap[item.icon] && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.primary' }}>
                  {iconMap[item.icon]}
                </Box>
              )}
              {item.icon && typeof item.icon !== 'string' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.primary' }}>
                  {item.icon}
                </Box>
              )}
              <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.43,
                    color: 'text.primary',
                    flexGrow: 1,
                  }}
                  className="menu-label"
                >
                  {item.label}
                </Typography>
                <Box />
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <ExpandMore sx={{ fontSize: 18 }} />
                </Box>
              </Stack>
            </ListItemButton>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.children?.map((child) => renderNavItem(child, level + 1))}
              </List>
            </Collapse>
          </Box>
        </ListItem>
      )
    }

    if (hasChildren && level === 1) {
      // Second-level expandable item (sub-section)
      return (
        <ListItem key={item.id} disablePadding>
          <Box sx={{ width: '100%' }}>
            <ListItemButton
              onClick={() => toggleExpand(item.id)}
              sx={{
                height: 32,
                pl: 2,
                pr: 1,
                py: 0.75,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '&:focus-visible': {
                  outline: `2px solid ${tokens.palette.border.focus.dark}`,
                  outlineOffset: 2,
                },
              }}
            >
              {item.icon && typeof item.icon === 'string' && iconMap[item.icon] && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.primary' }}>
                  {iconMap[item.icon]}
                </Box>
              )}
              {item.icon && typeof item.icon !== 'string' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.primary' }}>
                  {item.icon}
                </Box>
              )}
              <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.43,
                    color: 'text.primary',
                    flexGrow: 1,
                  }}
                  className="menu-label"
                >
                  {item.label}
                </Typography>
                <Box />
              </Stack>
              <Stack direction="row" spacing={0.5}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.primary',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  <ExpandMore sx={{ fontSize: 18 }} />
                </Box>
              </Stack>
            </ListItemButton>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.children?.map((child) => renderNavItem(child, level + 2))}
              </List>
            </Collapse>
          </Box>
        </ListItem>
      )
    }

    // Leaf item (no children)
    return (
      <ListItem
        key={item.id}
        disablePadding
        sx={{
          mb: 0.5,
          pl: level === 2 ? 2.5 : level === 0 ? 0 : 2,
        }}
      >
        {item.path ? (
          <ListItemButton
            component={item.external ? 'a' : NextLink}
            href={item.path}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            selected={isActive}
            sx={{
              minHeight: 32,
              height: 32,
              px: 1,
              py: 0.75,
              borderRadius: 0.75,
              backgroundColor: isActive ? 'action.disabled' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-selected': {
                backgroundColor: 'action.disabled',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
              '&:focus-visible': {
                outline: `2px solid ${tokens.palette.border.focus.dark}`,
                outlineOffset: 2,
              },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }} className="menu-label">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.43,
                  color: 'text.primary',
                  flexGrow: 1,
                }}
              >
                {item.label}
              </Typography>
              <Box />
            </Stack>
          </ListItemButton>
        ) : (
          <ListItemButton
            selected={isActive}
            sx={{
              minHeight: 32,
              height: 32,
              px: 1,
              py: 0.75,
              borderRadius: 0.75,
              backgroundColor: isActive ? 'action.disabled' : 'transparent',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-selected': {
                backgroundColor: 'action.disabled',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              },
              '&:focus-visible': {
                outline: `2px solid ${tokens.palette.border.focus.dark}`,
                outlineOffset: 2,
              },
            }}
          >
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }} className="menu-label">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.43,
                  color: 'text.primary',
                  flexGrow: 1,
                }}
              >
                {item.label}
              </Typography>
              <Box />
            </Stack>
          </ListItemButton>
        )}
      </ListItem>
    )
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isCollapsed ? 64 : 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 64 : 300,
          boxSizing: 'border-box',
          borderRight: `1px solid ${tokens.palette.border.default.dark}`,
          backgroundColor: 'background.surface',
          transition: 'width 0.2s ease-in-out',
          '--Paper-shadow': 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
        className="expanded"
      >
        {/* Header */}
        <Stack direction="row" spacing={1} sx={{ p: 1, alignItems: 'center' }}>
          <Box
            onClick={(e) => {
              if (isCollapsed) {
                handleToggleCollapse()
              } else {
                handleCompanyMenuOpen(e)
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flex: 1,
              p: 1.25,
              position: 'relative',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderRadius: 1,
              },
            }}
            aria-describedby={companyMenuAnchor ? '_r_2_' : undefined}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flex: 1,
                minWidth: 0,
              }}
            >
              {logoUrl ? (
                <img
                  alt="Company logo"
                  width="32"
                  height="32"
                  src={logoUrl}
                  style={{ borderRadius: '4px' }}
                />
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.95008 2.6974C4.37949 3.19461 3.96726 3.95616 3.96726 5.06038C3.96726 7.01869 5.28043 8.24444 7.12869 9.55913C9.06844 8.23669 10.4434 7.06544 10.4434 5.06039C10.4434 3.95618 10.0312 3.19461 9.46062 2.69741C8.87112 2.18371 8.05512 1.90476 7.20537 1.90476C6.35561 1.90476 5.53959 2.18371 4.95008 2.6974ZM8.80181 10.7191C10.5614 9.4665 12.3482 7.81338 12.3482 5.06039C12.3482 3.42594 11.7128 2.13349 10.712 1.26136C9.73006 0.405721 8.45087 9.08264e-07 7.20537 0C5.95987 -9.99086e-07 4.68065 0.405717 3.69872 1.26136C2.69789 2.13348 2.0625 3.42593 2.0625 5.06038C2.0625 7.72781 3.73941 9.414 5.45052 10.6967C4.80421 11.154 4.16807 11.6514 3.63435 12.2126C2.72828 13.1651 2.0625 14.3543 2.0625 15.9189C2.0625 17.4781 2.72358 18.6926 3.61809 19.6816C4.18122 20.3041 4.85866 20.8599 5.54458 21.3725C4.8566 21.8994 4.17938 22.467 3.61647 23.0926C2.73296 24.0743 2.0625 25.2721 2.0625 26.7773C2.0625 28.4913 2.68217 29.8338 3.68917 30.7353C4.67881 31.6212 5.96909 32.0163 7.21819 31.9995C9.6915 31.9661 12.3482 30.2581 12.3482 27.0036C12.3482 25.4123 11.696 24.1684 10.8002 23.154C10.2087 22.4842 9.49231 21.8943 8.771 21.3553C9.49044 20.8102 10.2036 20.2231 10.7917 19.5749C11.6744 18.6019 12.3482 17.4137 12.3482 15.9189C12.3482 14.4151 11.6664 13.2639 10.7704 12.3388C10.1959 11.7456 9.50062 11.2134 8.80181 10.7191ZM7.11231 11.8651C6.29351 12.4189 5.57384 12.9372 5.01446 13.5253C4.34911 14.2248 3.96726 14.9666 3.96726 15.9189C3.96726 16.8764 4.3538 17.6554 5.03071 18.4038C5.59718 19.0301 6.32725 19.5931 7.15025 20.1873C8.01462 19.5506 8.78712 18.9497 9.38094 18.2951C10.0696 17.5359 10.4434 16.7839 10.4434 15.9189C10.4434 15.0627 10.0776 14.3614 9.40219 13.6639C8.79706 13.0391 8.00856 12.4814 7.11231 11.8651ZM7.16344 22.5389C6.3395 23.1493 5.60307 23.7324 5.03234 24.3667C4.34442 25.1311 3.96726 25.8946 3.96726 26.7773C3.96726 28.0041 4.39521 28.8108 4.95964 29.3161C5.54142 29.8369 6.34639 30.1063 7.1925 30.0949C8.90969 30.0717 10.4434 28.9519 10.4434 27.0036C10.4434 25.9933 10.0481 25.1799 9.37237 24.4147C8.78581 23.7504 8.02206 23.1591 7.16344 22.5389Z" fill="url(#paint0_linear_1107_9511)" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.1828 7.43663C14.6674 7.47175 13.3036 8.47 13.3036 10.2663C13.3036 11.2053 13.6623 11.9957 14.2839 12.7691C14.8088 13.4219 15.4854 14.0214 16.2468 14.6613C17.8726 13.3056 19.0179 12.1018 19.0179 10.2663C19.0179 9.21225 18.6429 8.52581 18.1527 8.09706C17.6439 7.652 16.9342 7.41913 16.1828 7.43663ZM17.7283 15.9087C19.3192 14.5611 20.9226 12.8654 20.9226 10.2663C20.9226 8.71069 20.3452 7.48413 19.4068 6.66331C18.487 5.85883 17.292 5.50558 16.1386 5.53234C13.8446 5.58559 11.3988 7.19694 11.3988 10.2663C11.3988 11.7599 11.9924 12.9585 12.7994 13.9624C13.3637 14.6644 14.0562 15.2987 14.7462 15.8873C13.1084 17.2526 11.3988 18.9666 11.3988 21.6378C11.3988 23.1868 11.9759 24.422 12.9013 25.2626C13.8107 26.0886 14.9997 26.4833 16.1607 26.4833C17.3217 26.4833 18.5107 26.0886 19.4201 25.2626C20.3455 24.422 20.9226 23.1868 20.9226 21.6378C20.9226 19.0531 19.3227 17.3035 17.7283 15.9087ZM16.2302 17.1348C14.5203 18.5447 13.3036 19.758 13.3036 21.6378C13.3036 22.6842 13.6788 23.3956 14.1821 23.8527C14.7012 24.3243 15.4169 24.5786 16.1607 24.5786C16.9045 24.5786 17.6202 24.3243 18.1394 23.8527C18.6426 23.3956 19.0179 22.6842 19.0179 21.6378C19.0179 19.8032 17.8574 18.5352 16.2302 17.1348Z" fill="url(#paint1_linear_1107_9511)" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.9881 12.7689C23.3049 12.7689 21.9405 14.1334 21.9405 15.8165C21.9405 17.4997 23.3049 18.8641 24.9881 18.8641C26.6712 18.8641 28.0357 17.4997 28.0357 15.8165C28.0357 14.1334 26.6712 12.7689 24.9881 12.7689ZM20.0357 15.8165C20.0357 13.0814 22.253 10.8641 24.9881 10.8641C27.7232 10.8641 29.9405 13.0814 29.9405 15.8165C29.9405 18.5516 27.7232 20.7689 24.9881 20.7689C22.253 20.7689 20.0357 18.5516 20.0357 15.8165Z" fill="url(#paint2_linear_1107_9511)" />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_1107_9511" x1="16.0016" y1="0" x2="16.0016" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#42E697" />
                    <stop offset="1" stopColor="#42E697" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_1107_9511" x1="16.0014" y1="0.00000742095" x2="16.0014" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#42E697" />
                    <stop offset="1" stopColor="#42E697" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_1107_9511" x1="24.9882" y1="10.8641" x2="24.9882" y2="20.7689" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#42E697" />
                    <stop offset="1" stopColor="#42E697" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
              )}
              {!isCollapsed && (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.43,
                    color: 'text.primary',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={clientName}
                  className="MuiTypography-noWrap"
                >
                  {clientName}
                </Typography>
              )}
            </Box>
            {!isCollapsed && (
              <IconButton
                size="small"
                onClick={handleCompanyMenuOpen}
                sx={{
                  width: 24,
                  height: 24,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label="Toggle dropdown"
                aria-describedby={companyMenuAnchor ? '_r_2_' : undefined}
              >
                <UnfoldMore sx={{ fontSize: 24 }} />
              </IconButton>
            )}
            <Menu
              id="_r_2_"
              anchorEl={companyMenuAnchor}
              open={Boolean(companyMenuAnchor)}
              onClose={handleCompanyMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                elevation: 8,
                sx: {
                  mt: 1,
                  minWidth: 274,
                  maxWidth: 274,
                  backgroundColor: '#17161D',
                  border: '1px solid #2b2733',
                  borderRadius: '8px',
                },
              }}
              disableAutoFocus
              disableEnforceFocus
              disableRestoreFocus
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: 'transparent',
                    pointerEvents: 'none',
                  },
                },
                root: {
                  sx: {
                    pointerEvents: 'none',
                    '& > *': {
                      pointerEvents: 'auto',
                    },
                  },
                },
              }}
            >
              <Box sx={{ p: '16px 8px' }}>
                {/* User Email */}
                <Box sx={{ px: 1, py: 1 }}>
                  <Typography 
                    sx={{ 
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.66,
                      letterSpacing: '0.4px',
                      color: 'text.primary'
                    }}
                  >
                    {userEmail}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1, borderColor: '#3d3744' }} />

                {/* Theme Toggle */}
                <Box sx={{ px: 1, py: 1 }}>
                  <Box
                    onClick={(e) => {
                      e.stopPropagation()
                      handleThemeToggle()
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      backgroundColor: themeMode === 'dark' ? '#1e1c26' : '#edeedf',
                      border: themeMode === 'dark' ? '1px solid #2b2733' : '1px solid #c6ca92',
                      borderRadius: '40px',
                      px: 0,
                      py: '4px',
                      width: '92px',
                      height: '32px',
                      cursor: 'pointer',
                      gap: 0,
                    }}
                  >
                    {/* Dark Section */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        pl: '4px',
                        pr: themeMode === 'dark' ? '16px' : '4px',
                        py: 0,
                        flex: themeMode === 'dark' ? '1 1 auto' : '0 0 50%',
                        justifyContent: 'flex-start',
                        transition: 'all 0.2s ease-in-out',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      {themeMode === 'dark' && (
                        <Box
                          sx={{
                            backgroundColor: '#3d3744',
                            borderRadius: '40px',
                            p: '4px',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <DarkMode sx={{ fontSize: 18, color: '#ffffff' }} />
                        </Box>
                      )}
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 500,
                          lineHeight: '22px',
                          letterSpacing: '0.46px',
                          color: themeMode === 'dark' ? '#ffffff' : '#554b55',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Dark
                      </Typography>
                    </Box>
                    {/* Light Section */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        pl: themeMode === 'light' ? '16px' : '4px',
                        pr: '4px',
                        py: 0,
                        flex: themeMode === 'light' ? '1 1 auto' : '0 0 50%',
                        justifyContent: 'flex-end',
                        transition: 'all 0.2s ease-in-out',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 500,
                          lineHeight: '22px',
                          letterSpacing: '0.46px',
                          color: themeMode === 'light' ? '#554b55' : '#ffffff',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Light
                      </Typography>
                      {themeMode === 'light' && (
                        <Box
                          sx={{
                            backgroundColor: '#c6ca92',
                            borderRadius: '40px',
                            p: '4px',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <LightMode sx={{ fontSize: 18, color: '#ffffff' }} />
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Typography 
                    sx={{ 
                      mt: 1,
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.66,
                      letterSpacing: '0.4px',
                      color: '#b6bab1'
                    }}
                  >
                    This only applies to the current browser.
                  </Typography>
                </Box>

                <Divider sx={{ my: 1, borderColor: '#3d3744' }} />

                {/* Company Settings */}
                <MenuItem
                  component={NextLink}
                  href="/company-settings"
                  onClick={handleCompanyMenuClose}
                  sx={{ 
                    px: 1, 
                    py: 0.75,
                    borderRadius: '6px',
                    minHeight: 'auto',
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.17px', color: 'text.primary' }}>
                    Company Settings
                  </Typography>
                </MenuItem>

                {/* Admin */}
                <MenuItem
                  component={NextLink}
                  href="/admin-settings"
                  onClick={handleCompanyMenuClose}
                  sx={{ 
                    px: 1, 
                    py: 0.75,
                    borderRadius: '6px',
                    minHeight: 'auto',
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.17px', color: 'text.primary' }}>
                    Admin
                  </Typography>
                </MenuItem>

                {/* Log Out */}
                <MenuItem
                  onClick={() => {
                    handleLogout()
                    handleCompanyMenuClose()
                  }}
                  sx={{ 
                    px: 1, 
                    py: 0.75,
                    borderRadius: '6px',
                    minHeight: 'auto',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.17px', color: 'text.primary' }}>
                      Log Out
                    </Typography>
                    <Logout sx={{ fontSize: 16 }} />
                  </Stack>
                </MenuItem>

                <Divider sx={{ my: 1, borderColor: '#3d3744' }} />

                {/* Version Info */}
                <Box sx={{ px: 1, py: 0.75 }}>
                  <Typography 
                    sx={{ 
                      fontSize: '10px',
                      fontWeight: 500,
                      lineHeight: '14px',
                      color: 'text.primary'
                    }}
                  >
                    Version {version} ({versionDate})
                  </Typography>
                </Box>

                {/* Terms of use */}
                <MenuItem
                  component={NextLink}
                  href="/terms"
                  onClick={handleCompanyMenuClose}
                  sx={{ 
                    px: 1, 
                    py: 0.75,
                    borderRadius: '6px',
                    minHeight: 'auto',
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: 'text.primary' }}>
                    Terms of use
                  </Typography>
                </MenuItem>
              </Box>
            </Menu>
          </Box>
          <IconButton
            size="small"
            onClick={handleToggleCollapse}
            sx={{
              width: 24,
              height: 24,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Stack>

        {/* Navigation */}
        {!isCollapsed && (
          <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
            <List disablePadding>
              {navItems.map((item) => renderNavItem(item))}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

