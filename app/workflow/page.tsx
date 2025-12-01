'use client'

import { Box, Typography, Chip, Link, Button } from '@mui/material'
import { usePathname } from 'next/navigation'
import { PageLayout } from '@/components/PageLayout'
import { ConversationalAI } from '@/components/ConversationalAI'
import { getBreadcrumbs } from '@/aidd/breadcrumb-paths'
import { ChevronRight, AccountTree } from '@mui/icons-material'
import NextLink from 'next/link'

interface Project {
  id: string
  name: string
  workflowType: string
  taskProgress: string
  fidelity?: string
  actionButton: 'Continue' | 'Optimize'
}

const projects: Project[] = [
  {
    id: '1',
    name: '100 PCF',
    workflowType: 'PCF Workflow',
    taskProgress: '4/8 Tasks',
    actionButton: 'Continue',
  },
  {
    id: '2',
    name: 'Company CCF 2027',
    workflowType: 'CCF Workflow',
    taskProgress: '6/7 Tasks',
    actionButton: 'Continue',
  },
  {
    id: '3',
    name: 'Footprint 2020-25',
    workflowType: 'CCF & PCF Workflow',
    taskProgress: '5/11 Tasks',
    actionButton: 'Continue',
  },
  {
    id: '4',
    name: '50 PCF',
    workflowType: 'PCF Workflow',
    taskProgress: '8/8 Tasks',
    fidelity: 'Medium Fidelity',
    actionButton: 'Optimize',
  },
]

export default function Workflow() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

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
          {/* Left Side - Projects Content */}
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
            {/* Page Title Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  paddingTop: 0,
                  paddingX: 0,
                  width: '100%',
                }}
              >
                {/* Title & Subtitle */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: { xs: 24, sm: 28, md: 32 },
                      fontWeight: 300,
                      color: '#ffffff',
                      lineHeight: 1,
                      whiteSpace: { xs: 'normal', md: 'nowrap' },
                    }}
                  >
                    Projects
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: { xs: 14, sm: 15, md: 16 },
                      fontWeight: 400,
                      color: '#b6bab1',
                      letterSpacing: '0.15px',
                      lineHeight: 1.5,
                      width: { xs: '100%', md: '926px' },
                      maxWidth: '100%',
                    }}
                  >
                    Whether you're starting something new or continuing an existing process, we will guide you step-by-step and assist you throughout the journey.
                  </Typography>
                </Box>
                {/* Right Container - empty */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                />
              </Box>
            </Box>

            {/* Latest Projects Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  borderBottom: '1px solid #3d3744',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  paddingTop: 0,
                  paddingX: 0,
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: { xs: 20, sm: 22, md: 24 },
                    fontWeight: 400,
                    color: '#ffffff',
                    lineHeight: 1.334,
                    whiteSpace: { xs: 'normal', md: 'nowrap' },
                  }}
                >
                  Latest Projects
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                />
              </Box>
            </Box>

            {/* Projects List */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '12px', sm: '10px', md: '8px' },
                width: '100%',
              }}
            >
              {projects.map((project) => (
                <Box
                  key={project.id}
                  sx={{
                    backgroundColor: '#1e1c26',
                    borderLeft: '1px solid #3d3744',
                    display: 'flex',
                    height: { xs: 'auto', md: '69px' },
                    minHeight: { xs: '69px', md: '69px' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingX: { xs: '12px', sm: '10px', md: '10px' },
                    paddingY: { xs: '12px', sm: '8px', md: 0 },
                    width: '100%',
                    borderRadius: { xs: '4px', md: 0 },
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    gap: { xs: '12px', md: 0 },
                  }}
                >
                  {/* Left Side - Icon and Project Name */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: { xs: '12px', sm: '14px', md: '16px' },
                      alignItems: 'center',
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingX: { xs: '8px', sm: '12px', md: '16px' },
                        paddingY: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AccountTree
                          sx={{
                            fontSize: { xs: 20, sm: 22, md: 24 },
                            color: '#ffffff',
                            width: { xs: 20, sm: 22, md: 24 },
                            height: { xs: 20, sm: 22, md: 24 },
                            marginRight: { xs: '8px', sm: '9px', md: '10px' },
                            flexShrink: 0,
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            padding: { xs: '8px', sm: '9px', md: '10px' },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              height: '26px',
                              alignItems: 'flex-end',
                              gap: '4px',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: { xs: 14, sm: 15, md: 16 },
                                fontWeight: 400,
                                color: '#ffffff',
                                letterSpacing: '0.15px',
                                lineHeight: 1.5,
                                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                              }}
                            >
                              {project.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Workflow Type Chip */}
                    <Chip
                      label={project.workflowType}
                      sx={{
                        height: { xs: 22, sm: 23, md: 24 },
                        borderRadius: '4px',
                        backgroundColor: '#3d3744',
                        color: '#ffffff',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: { xs: 12, sm: 12.5, md: 13 },
                        lineHeight: '18px',
                        fontWeight: 400,
                        letterSpacing: '0.16px',
                        padding: '3px 6px',
                        '& .MuiChip-label': {
                          px: '2px',
                          py: 0,
                        },
                      }}
                    />

                    {/* Task Progress Chip */}
                    <Chip
                      label={project.taskProgress}
                      sx={{
                        height: { xs: 22, sm: 23, md: 24 },
                        borderRadius: '4px',
                        backgroundColor: '#3d3744',
                        color: '#ffffff',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: { xs: 12, sm: 12.5, md: 13 },
                        lineHeight: '18px',
                        fontWeight: 400,
                        letterSpacing: '0.16px',
                        padding: '3px 6px',
                        '& .MuiChip-label': {
                          px: '2px',
                          py: 0,
                        },
                      }}
                    />

                    {/* Fidelity Chip (if exists) */}
                    {project.fidelity && (
                      <Chip
                        label={project.fidelity}
                        sx={{
                          height: { xs: 22, sm: 23, md: 24 },
                          borderRadius: '4px',
                          backgroundColor: '#3d3744',
                          color: '#ffffff',
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: { xs: 12, sm: 12.5, md: 13 },
                          lineHeight: '18px',
                          fontWeight: 400,
                          letterSpacing: '0.16px',
                          padding: '3px 6px',
                          '& .MuiChip-label': {
                            px: '2px',
                            py: 0,
                          },
                        }}
                      />
                    )}
                  </Box>

                  {/* Right Side - Action Button */}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#44c571',
                      color: '#ffffff',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: { xs: 12, sm: 12.5, md: 13 },
                      fontWeight: 500,
                      letterSpacing: '0.46px',
                      lineHeight: '22px',
                      paddingX: { xs: '8px', sm: '9px', md: '10px' },
                      paddingY: { xs: '6px', sm: '5px', md: '4px' },
                      borderRadius: '4px',
                      textTransform: 'none',
                      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
                      flexShrink: 0,
                      '&:hover': {
                        backgroundColor: '#3db362',
                      },
                    }}
                  >
                    {project.actionButton}
                  </Button>
                </Box>
              ))}
            </Box>
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
              <ConversationalAI width="100%" />
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  )
}
