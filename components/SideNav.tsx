'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Box,
  ListItem,
  ListItemButton,
  Collapse,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material'
import tokens from '@/context/ui-tokens.json'
import NextLink from 'next/link'
import {
  Home,
  ExpandMore,
  ExpandLess,
  UnfoldMore,
  Menu as MenuIcon,
  Timeline,
  Storage,
  Description,
  MenuBook,
  HeadsetMic,
  Nature,
} from '@mui/icons-material'

interface NavItem {
  id: string
  label: string
  icon?: React.ReactNode | string
  path?: string
  children?: NavItem[]
}

interface SideNavProps {
  clientName?: string
  logoUrl?: string
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
          id: 'corporate-carbon-footprint',
          label: 'Corporate Carbon Footprint',
          children: [
            { id: 'footprint-explorer', label: 'Footprint Explorer', path: '/footprint-explorer' },
            { id: 'footprint-analysis', label: 'Footprint Analysis', path: '/footprint-analysis' },
          ],
        },
        {
          id: 'products-carbon-footprint',
          label: 'Products Carbon Footprint',
          children: [
            { id: 'products-catalog', label: 'Products Catalog', path: '/products-catalog' },
            { id: 'products-analysis', label: 'Products Analysis', path: '/products-analysis' },
          ],
        },
        {
          id: 'supply-chain-footprint',
          label: 'Supply Chain Footprint',
          children: [
            { id: 'supply-chain-explorer', label: 'Supply Chain Explorer', path: '/supply-chain-explorer' },
            { id: 'supply-chain-analysis', label: 'Supply Chain Analysis', path: '/supply-chain-analysis' },
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
          id: 'planning-strategy',
          label: 'Planning Strategy',
          children: [
            { id: 'strategy-settings', label: 'Strategy Settings', path: '/strategy-settings' },
            { id: 'levers-library', label: 'Levers Library', path: '/levers-library' },
            { id: 'roadmap-overview', label: 'Roadmap Overview', path: '/roadmap-overview' },
          ],
        },
        {
          id: 'progress-tracking',
          label: 'Progress Tracking',
          children: [
            { id: 'reduction-tracking', label: 'Reduction Tracking', path: '/reduction-tracking' },
            { id: 'financial-analysis', label: 'Financial Analysis', path: '/financial-analysis' },
            { id: 'teams-dashboard', label: 'Teams Dashboard', path: '/teams-dashboard' },
          ],
        },
      ],
    },
    {
      id: 'my-data-computation',
      label: 'My Data & Computation',
      icon: 'storage',
      children: [
        {
          id: 'company-carbon-footprint',
          label: 'Company Carbon footprint',
          children: [
            { id: 'data-ingestion', label: 'Data Ingestion', path: '/data-ingestion' },
            { id: 'footprint-builder', label: 'Footprint Builder', path: '/footprint-builder' },
            { id: 'footprint-ef-matching', label: 'Footprint EF Matching', path: '/footprint-ef-matching' },
          ],
        },
        {
          id: 'product-carbon-footprint',
          label: 'Product Carbon Footprint',
          children: [
            { id: 'data-set', label: 'Data Set', path: '/data-set' },
            { id: 'computation-engine', label: 'Computation Engine', path: '/computation-engine' },
          ],
        },
        {
          id: 'emission-factors',
          label: 'Emission Factors',
          children: [
            { id: 'ef-hub', label: 'EF Hub', path: '/ef-hub' },
            { id: 'matching-rules', label: 'Matching Rules', path: '/matching-rules' },
          ],
        },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'description',
      path: '/reports',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: 'menu-book',
      path: '/documentation',
    },
    {
      id: 'contact-support',
      label: 'Contact Support',
      icon: 'headset',
      path: '/contact-support',
    },
  ]

const iconMap: Record<string, React.ReactNode> = {
  home: <Home sx={{ fontSize: 24 }} />,
  nature: <Nature sx={{ fontSize: 24 }} />,
  timeline: <Timeline sx={{ fontSize: 24 }} />,
  storage: <Storage sx={{ fontSize: 24 }} />,
  description: <Description sx={{ fontSize: 24 }} />,
  'menu-book': <MenuBook sx={{ fontSize: 24 }} />,
  headset: <HeadsetMic sx={{ fontSize: 24 }} />,
}

export function SideNav({ clientName = 'Co2Ai Client', logoUrl }: SideNavProps) {
  const pathname = usePathname()
  const navItems = getNavItems()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'my-footprint': true,
    'my-reduction-journey': true,
    'my-data-computation': true,
  })

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
    const expandForPath = (items: NavItem[], path: string) => {
      for (const item of items) {
        if (item.path === path) {
          // Find parent sections and expand them
          if (item.id.includes('footprint')) {
            setExpanded((prev) => ({ ...prev, 'my-footprint': true }))
          }
          if (item.id.includes('reduction') || item.id.includes('strategy') || item.id.includes('tracking')) {
            setExpanded((prev) => ({ ...prev, 'my-reduction-journey': true }))
          }
          if (item.id.includes('data') || item.id.includes('computation') || item.id.includes('ef')) {
            setExpanded((prev) => ({ ...prev, 'my-data-computation': true }))
          }
        }
        if (item.children) {
          expandForPath(item.children, path)
        }
      }
    }
    expandForPath(navItems, pathname)
  }, [pathname])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expanded[item.id]
    const isActive = activeItem === item.id

    if (hasChildren && level === 0) {
      // Top-level expandable item
      return (
        <Box key={item.id}>
          <ListItemButton
            onClick={() => toggleExpand(item.id)}
            sx={{
              height: 48,
              px: 1,
              py: 0.75,
              borderRadius: 1,
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
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 1.43,
                color: 'text.primary',
                flexGrow: 1,
              }}
            >
              {item.label}
            </Typography>
            {isExpanded ? (
              <ExpandLess sx={{ fontSize: 16, color: 'text.primary' }} />
            ) : (
              <ExpandMore sx={{ fontSize: 16, color: 'text.primary' }} />
            )}
          </ListItemButton>

          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 2 }}>
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </Box>
          </Collapse>
        </Box>
      )
    }

    if (hasChildren && level === 1) {
      // Second-level expandable item (sub-section)
      return (
        <Box key={item.id} sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => toggleExpand(item.id)}
            sx={{
              height: 32,
              pl: 2,
              pr: 1,
              py: 0.75,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:focus-visible': {
                outline: `2px solid ${tokens.palette.border.focus.dark}`,
                outlineOffset: 2,
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: 14,
                lineHeight: 1.43,
                color: 'text.primary',
                flexGrow: 1,
              }}
            >
              {item.label}
            </Typography>
            {isExpanded ? (
              <ExpandLess sx={{ fontSize: 16, color: 'text.primary' }} />
            ) : (
              <ExpandMore sx={{ fontSize: 16, color: 'text.primary' }} />
            )}
          </ListItemButton>

          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              pl: 2.5,
              borderLeft: `1px solid ${tokens.palette.border.strong.dark}`,
              ml: 2,
              py: 0.25,
            }}
          >
              {item.children?.map((child) => renderNavItem(child, level + 2))}
            </Box>
          </Collapse>
        </Box>
      )
    }

    // Leaf item (no children)
    return (
      <ListItem
        key={item.id}
        disablePadding
        sx={{
          mb: 0.5,
          pl: level === 2 ? 2.5 : 0,
        }}
      >
        {item.path ? (
          <ListItemButton
            component={NextLink}
            href={item.path}
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
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.43,
                color: 'text.primary',
              }}
            >
              {item.label}
            </Typography>
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
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.43,
                color: 'text.primary',
              }}
            >
              {item.label}
            </Typography>
          </ListItemButton>
        )}
      </ListItem>
    )
  }

  return (
    <Box
      sx={{
        width: 284,
        height: '100vh',
        backgroundColor: 'background.surface',
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        gap: 1.25,
        borderRight: `1px solid ${tokens.palette.border.default.dark}`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flex: 1,
            p: 1.25,
            borderRadius: 1,
            border: `1px solid ${tokens.palette.border.default.dark}`,
          }}
        >
          {logoUrl ? (
            <Avatar src={logoUrl} sx={{ width: 24, height: 24 }} />
          ) : (
            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
              <Home sx={{ fontSize: 16 }} />
            </Avatar>
          )}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: 14,
              lineHeight: 1.43,
              color: 'text.primary',
              flexGrow: 1,
            }}
          >
            {clientName}
          </Typography>
          <IconButton
            size="small"
            sx={{
              width: 32,
              height: 32,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:focus-visible': {
                outline: `2px solid ${tokens.palette.border.focus.dark}`,
                outlineOffset: 2,
              },
            }}
            aria-label="Toggle dropdown"
          >
            <UnfoldMore sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
        <IconButton
          size="small"
          sx={{
            width: 32,
            height: 32,
            border: `1px solid ${tokens.palette.border.default.dark}`,
            borderRadius: 1,
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&:focus-visible': {
              outline: `2px solid ${tokens.palette.border.focus.dark}`,
              outlineOffset: 2,
            },
          }}
          aria-label="Pin sidebar"
        >
          <MenuIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {navItems.map((item) => renderNavItem(item))}
      </Box>
    </Box>
  )
}

