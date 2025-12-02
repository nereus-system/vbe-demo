'use client'

import { Box, Typography, Chip, Button } from '@mui/material'
import { AccountTree } from '@mui/icons-material'

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

export function ProjectsList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
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
                fontSize: 32,
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              Projects
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 16,
                fontWeight: 400,
                color: '#b6bab1',
                letterSpacing: '0.15px',
                lineHeight: 1.5,
                maxWidth: '926px',
              }}
            >
              Whether you're starting something new or continuing an existing process, we will guide
              you step-by-step and assist you throughout the journey.
            </Typography>
          </Box>
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
              fontSize: 24,
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.334,
            }}
          >
            Latest Projects
          </Typography>
        </Box>
      </Box>

      {/* Projects List */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
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
              height: '69px',
              minHeight: '69px',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingX: '10px',
              paddingY: 0,
              width: '100%',
              borderRadius: 0,
            }}
          >
            {/* Left Side - Icon and Project Name */}
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flex: 1,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingX: '16px',
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
                      fontSize: 24,
                      color: '#ffffff',
                      width: 24,
                      height: 24,
                      marginRight: '10px',
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
                      padding: '10px',
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
                          fontSize: 16,
                          fontWeight: 400,
                          color: '#ffffff',
                          letterSpacing: '0.15px',
                          lineHeight: 1.5,
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
                  height: 24,
                  borderRadius: '4px',
                  backgroundColor: '#3d3744',
                  color: '#ffffff',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 13,
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
                  height: 24,
                  borderRadius: '4px',
                  backgroundColor: '#3d3744',
                  color: '#ffffff',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 13,
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
                    height: 24,
                    borderRadius: '4px',
                    backgroundColor: '#3d3744',
                    color: '#ffffff',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 13,
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
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.46px',
                lineHeight: '22px',
                paddingX: '10px',
                paddingY: '4px',
                borderRadius: '4px',
                textTransform: 'none',
                boxShadow:
                  '0px 1px 5px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
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
  )
}


