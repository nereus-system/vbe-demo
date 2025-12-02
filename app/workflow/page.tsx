'use client'

import { useState } from 'react'
import { Box, Typography, Chip, Link } from '@mui/material'
import { usePathname } from 'next/navigation'
import { PageLayout } from '@/components/PageLayout'
import { ConversationalAI } from '@/components/ConversationalAI'
import { Phase1Content } from '@/components/Phase1Content'
import { ProjectsList } from '@/components/ProjectsList'
import { getBreadcrumbs } from '@/aidd/breadcrumb-paths'
import { ChevronRight } from '@mui/icons-material'
import NextLink from 'next/link'

export default function Workflow() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const [showPhase1, setShowPhase1] = useState(false)

  const handleGoalSelected = () => {
    setShowPhase1(true)
  }

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
          height: '100%',
          position: 'relative',
          alignItems: 'center',
          padding: 0,
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            zIndex: 2,
            backgroundColor: 'transparent',
          }}
        >
          <Box
            sx={{
              padding: '0 24px',
              backgroundColor: 'transparent',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: { xs: 'auto', sm: '44px' },
                minHeight: { xs: '44px', sm: '44px' },
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '12px', sm: 0 },
                paddingY: { xs: '8px', sm: 0 },
              }}
            >
              {/* Breadcrumbs - max width 700px */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: '4px', sm: '6px', md: '8px' },
                  width: { xs: '100%', sm: 'auto', md: '700px' },
                  maxWidth: { xs: '100%', md: '700px' },
                  flexShrink: 0,
                  backgroundColor: 'transparent',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
              >
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1
                  return (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.path && !isLast ? (
                        <Link
                          component={NextLink}
                          href={item.path}
                          sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 14,
                            lineHeight: 1.43,
                            color: '#b6bab1',
                            textDecoration: 'none',
                            fontWeight: 400,
                            letterSpacing: '0.17px',
                            padding: '8px',
                            borderRadius: '4px',
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
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 14,
                            lineHeight: 1.43,
                            color: '#b6bab1',
                            fontWeight: 400,
                            letterSpacing: '0.17px',
                            padding: '8px',
                          }}
                        >
                          {item.label}
                        </Typography>
                      )}
                      {!isLast && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                          }}
                        >
                          <ChevronRight sx={{ fontSize: 16, color: '#3d3744' }} />
                        </Box>
                      )}
                    </Box>
                  )
                })}
              </Box>

              {/* Data Access Chip */}
              <Chip
                label="Data Access: Europe"
                sx={{
                  height: { xs: 22, sm: 23, md: 24 },
                  borderRadius: '4px',
                  backgroundColor: '#3d3744',
                  color: '#ffffff',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: { xs: 12, sm: 12.5, md: 13 },
                  lineHeight: 1.38,
                  fontWeight: 400,
                  letterSpacing: '0.16px',
                  padding: '3px 6px',
                  flexShrink: 0,
                  '& .MuiChip-label': {
                    px: '2px',
                    py: 0,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            backgroundColor: '#17161d',
            display: 'flex',
            gap: '16px',
            paddingLeft: { xs: '16px', sm: '24px', md: '24px' },
            paddingRight: { xs: '16px', sm: '24px', md: '24px' },
            paddingTop: { xs: '16px', sm: '24px', md: '32px' },
            paddingBottom: { xs: '16px', sm: '24px', md: '16px' },
            borderRadius: '4px',
            position: 'sticky',
            top: 0,
            width: '100%',
            height: { xs: 'auto', md: '980px' },
            minHeight: { xs: 'auto', md: '980px' },
            zIndex: 1,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {/* Left Side - Content (Projects or Phase 1) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              height: { xs: 'auto', md: '948px' },
              width: { xs: '100%', md: 'inherit' },
              maxWidth: { xs: '100%', md: '1180px' },
              flexShrink: 0,
              marginRight: { lg: 'auto' },
            }}
          >
            {showPhase1 ? <Phase1Content /> : <ProjectsList />}
          </Box>

          {/* Right Side - Chat Container */}
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderRadius: '4px',
              position: { xs: 'relative', lg: 'sticky' },
              top: 0,
              flexShrink: 0,
              zIndex: 3,
              width: { xs: '100%', sm: '100%', md: '100%', lg: '400px' },
              maxWidth: { xs: '100%', lg: '400px' },
              height: { xs: '600px', sm: '700px', md: '750px', lg: '800px' },
              mt: { xs: 2, lg: 0 },
              marginLeft: { lg: 'auto' },
            }}
          >
            <Box
              sx={{
                backgroundColor: '#17161d',
                border: '1px solid #3d3744',
                height: '100%',
                width: '100%',
                position: 'relative',
                flexShrink: 0,
                borderRadius: '4px',
              }}
            >
              <ConversationalAI width="100%" onGoalSelected={handleGoalSelected} />
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}
