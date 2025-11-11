'use client'

import { useState } from 'react'
import { Box, Chip, Typography, Link, Menu, MenuItem } from '@mui/material'
import { ChevronRight, ArrowDropDown } from '@mui/icons-material'
import tokens from '@/context/ui-tokens.json'
import NextLink from 'next/link'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  dataAccess?: string
}

export function Breadcrumb({ items, dataAccess = 'Europe' }: BreadcrumbProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Show "1 more" if there are more than 3 items (excluding current)
  const showMore = items.length > 3
  const visibleItems = showMore ? items.slice(-3) : items
  const hiddenItems = showMore ? items.slice(0, -3) : []

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.25,
        width: '100%',
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, maxWidth: '700px' }}>
        {/* "1 more" dropdown */}
        {showMore && (
          <>
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 12,
                      lineHeight: 1.66,
                      color: tokens.palette.content.muted.dark,
                      fontWeight: 400,
                      letterSpacing: 0.4,
                    }}
                  >
                    {hiddenItems.length} more
                  </Typography>
                  <ArrowDropDown sx={{ fontSize: 16, color: tokens.palette.content.muted.dark }} />
                </Box>
              }
              onClick={handleClick}
              sx={{
                height: 24,
                borderRadius: '100px',
                border: `1px solid ${tokens.palette.border.default.dark}`,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: tokens.palette.background.hover.dark,
                },
                '& .MuiChip-label': {
                  px: 0.75,
                  py: 0.375,
                },
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                mt: 0.5,
                '& .MuiPaper-root': {
                  backgroundColor: tokens.palette.background.surface.dark,
                  border: `1px solid ${tokens.palette.border.default.dark}`,
                  borderRadius: 1,
                  p: 1,
                  minWidth: 200,
                },
              }}
            >
              {hiddenItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={handleClose}
                  sx={{
                    px: 1,
                    py: 0.75,
                    borderRadius: 0.75,
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: tokens.palette.background.hover.dark,
                    },
                    '&:last-child': {
                      mb: 0,
                    },
                  }}
                >
                  {item.path ? (
                    <Link
                      component={NextLink}
                      href={item.path}
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.71,
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.71,
                        color: 'text.primary',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32 }}>
              <ChevronRight sx={{ fontSize: 16, color: tokens.palette.border.default.dark }} />
            </Box>
          </>
        )}

        {/* Visible breadcrumb items */}
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1
          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.path && !isLast ? (
                <Link
                  component={NextLink}
                  href={item.path}
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.71,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontWeight: 400,
                    letterSpacing: 0.17,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.71,
                    color: isLast ? tokens.palette.content.positive.dark : 'text.secondary',
                    fontWeight: 400,
                    letterSpacing: 0.17,
                  }}
                >
                  {item.label}
                </Typography>
              )}
              {!isLast && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32 }}>
                  <ChevronRight sx={{ fontSize: 16, color: tokens.palette.border.default.dark }} />
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      {/* Data Access Chip */}
      {dataAccess && (
        <Chip
          label={`Data Access: ${dataAccess}`}
          sx={{
            height: 24,
            borderRadius: 0.5,
            backgroundColor: tokens.palette.background.subtle.dark,
            color: 'text.primary',
            fontSize: 13,
            lineHeight: 1.38,
            fontWeight: 400,
            letterSpacing: 0.16,
            '& .MuiChip-label': {
              px: 0.75,
              py: 0.375,
            },
          }}
        />
      )}
    </Box>
  )
}

