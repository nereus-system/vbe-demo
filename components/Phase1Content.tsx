'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
} from '@mui/material'
import {
  ChevronRight,
  Folder,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  SwapHoriz,
  BookmarkBorder,
  Add,
  Star,
  StarBorder,
} from '@mui/icons-material'

// Vertical Stepper Component
interface Step {
  id: number
  label: string
  state: 'done' | 'default'
  fontWeight?: 'medium' | 'regular'
}

const steps: Step[] = [
  { id: 1, label: 'Data Ingestion', state: 'done', fontWeight: 'medium' },
  { id: 2, label: 'Step 2', state: 'default', fontWeight: 'medium' },
  { id: 3, label: 'Step 3', state: 'default', fontWeight: 'regular' },
  { id: 4, label: 'Step 4', state: 'default', fontWeight: 'regular' },
  { id: 5, label: 'Step 5', state: 'default', fontWeight: 'regular' },
  { id: 6, label: 'Step 6', state: 'default', fontWeight: 'regular' },
]

function VerticalStepper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 125,
        alignItems: 'flex-start',
      }}
    >
      {steps.map((step, index) => (
        <Box key={step.id} sx={{ width: '100%' }}>
          {/* Step Row - Icon + Label */}
          <Box
            sx={{
              display: 'flex',
              gap: 1, // Exactly 8px between icon and text
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Icon Container - exactly 24x24px, no padding */}
            <Box
              sx={{
                width: 24,
                height: 24,
                minWidth: 24,
                minHeight: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {step.state === 'done' ? (
                <CheckCircle 
                  sx={{ 
                    fontSize: 24,
                    width: 24,
                    height: 24,
                    color: '#44c571',
                    display: 'block',
                  }} 
                />
              ) : (
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: '#554b55',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 2, // 2px offset from left
                    top: 2,  // 2px offset from top
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 12,
                      color: '#ffffff',
                      fontWeight: 400,
                      lineHeight: 1.66,
                      fontFamily: 'Roboto, sans-serif',
                      letterSpacing: '0.4px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {step.id}
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* Step Label */}
            <Typography
              component="div"
              sx={{
                fontSize: 14,
                fontWeight: step.fontWeight === 'medium' ? 500 : 400,
                color: step.state === 'done' ? '#ffffff' : '#73696d',
                lineHeight: step.fontWeight === 'medium' ? 1.57 : 1.43,
                letterSpacing: step.fontWeight === 'medium' ? '0.1px' : '0.17px',
                fontFamily: 'Roboto, sans-serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                margin: 0,
                padding: 0,
              }}
            >
              {step.label}
            </Typography>
          </Box>
          
          {/* Connector Line - centered with icon */}
          {index < steps.length - 1 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '16px', // Increased height for better spacing
                padding: 0,
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              {/* Center the 1px line in the 24px icon area */}
              <Box
                sx={{
                  width: '1px', // Explicit 1px width
                  height: '100%',
                  bgcolor: '#554b55',
                  position: 'absolute',
                  left: '11.5px', // Perfectly centered: (24 - 1) / 2
                }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

// File Row Component
interface FileRowProps {
  fileName: string
  category: string
  description: string
  errors: number
  warnings: number
  missing: number
  importedRows: string
  status?: 'success' | 'error' | 'warning'
}

function FileRow({
  fileName,
  category,
  description,
  errors,
  warnings,
  missing,
  importedRows,
  status = 'success',
}: FileRowProps) {
  return (
    <Box
      sx={{
        border: '1px solid #2b2733',
        borderRadius: 1,
        p: 1,
        mb: 1.5,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      {/* Chevron Icon */}
      <Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'center' }}>
        <ChevronRight sx={{ fontSize: 18, color: '#ffffff' }} />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
        {/* Status Icon */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
          {status === 'success' && (
            <CheckCircle sx={{ fontSize: 20, color: '#44c571' }} />
          )}
        </Box>

        {/* File Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.5,
                letterSpacing: '0.15px',
              }}
            >
              {fileName}
            </Typography>
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: '#103856',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 700,
                height: 24,
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              color: '#b6bab1',
              lineHeight: 1.43,
              letterSpacing: '0.17px',
              maxHeight: 54,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Validation Info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            width: 160,
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Button
              size="small"
              startIcon={<ErrorIcon sx={{ fontSize: 16, color: '#e53e3b' }} />}
              sx={{
                minWidth: 42,
                height: 30,
                px: 1.25,
                py: 1,
                borderRadius: 1,
                color: '#e53e3b',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '22px',
                letterSpacing: '0.46px',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(229, 62, 59, 0.1)' },
              }}
            >
              {errors}
            </Button>
            <Button
              size="small"
              startIcon={<Warning sx={{ fontSize: 16, color: '#edbf2f' }} />}
              sx={{
                minWidth: 50,
                height: 30,
                px: 1.25,
                py: 1,
                borderRadius: 1,
                color: '#edbf2f',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '22px',
                letterSpacing: '0.46px',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(237, 191, 47, 0.1)' },
              }}
            >
              {warnings}
            </Button>
            <Button
              size="small"
              startIcon={<SwapHoriz sx={{ fontSize: 16, color: '#d2d7cb' }} />}
              sx={{
                minWidth: 50,
                height: 30,
                px: 1.25,
                py: 1,
                borderRadius: 1,
                color: '#d2d7cb',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '22px',
                letterSpacing: '0.46px',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(210, 215, 203, 0.1)' },
              }}
            >
              {missing}
            </Button>
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              color: '#73696d',
              lineHeight: 1.43,
              letterSpacing: '0.17px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {importedRows}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

// Data Requirement Folder Section
function DataReqFolderSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ChevronRight
            sx={{
              fontSize: 18,
              color: '#ffffff',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        }
        sx={{
          px: 0,
          py: 0,
          minHeight: 56,
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', width: '100%' }}>
          <Folder sx={{ fontSize: 20, color: '#ffffff' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  color: '#ffffff',
                  lineHeight: 1.5,
                  letterSpacing: '0.15px',
                }}
              >
                Footprint 2027
                <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: '#73696d', ml: 1.25 }}>
                  3 files
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                sx={{
                  color: '#ffffff',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <StarBorder sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: '#ffffff',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <StarBorder sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, py: 1 }}>
        {/* Folder content would go here */}
      </AccordionDetails>
    </Accordion>
  )
}

// Activity Config Card Component
interface ActivityConfigCardProps {
  title: string
  subtitle?: string
  description: string
  showFolderSection?: boolean
  showFileRows?: boolean
  files?: FileRowProps[]
  actionButton?: React.ReactNode
}

function ActivityConfigCard({
  title,
  subtitle,
  description,
  showFolderSection = false,
  showFileRows = false,
  files = [],
  actionButton,
}: ActivityConfigCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid #3d3744',
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
        {actionButton}
      </Box>

      {/* Content */}
      <Box>
        {subtitle && (
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.5,
              mb: 1,
            }}
          >
            {subtitle}
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#b6bab1',
            lineHeight: 1.5,
            mb: showFolderSection || showFileRows ? 2 : 0,
          }}
        >
          {description}
        </Typography>

        {showFolderSection && <DataReqFolderSection />}
        {showFileRows && (
          <Box sx={{ mt: 2 }}>
            {files.map((file, index) => (
              <FileRow key={index} {...file} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <Button
                size="small"
                sx={{
                  color: '#44c571',
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(68, 197, 113, 0.1)' },
                }}
              >
                Add File
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// Main Component
export function Phase1Content() {
  const [tabValue, setTabValue] = useState(0)

  const sampleFiles: FileRowProps[] = [
    {
      fileName: 'Non-Food Product',
      category: 'Non-Food Products',
      description: 'All of the non-food items, except farm equipments',
      errors: 3,
      warnings: 21,
      missing: 21,
      importedRows: "1'209 imported rows",
    },
    {
      fileName: 'Food Products',
      category: 'Food Products',
      description: 'All food-related items and ingredients',
      errors: 0,
      warnings: 5,
      missing: 12,
      importedRows: "856 imported rows",
    },
    {
      fileName: 'Raw Materials',
      category: 'Raw Materials',
      description: 'Primary materials and components',
      errors: 1,
      warnings: 8,
      missing: 15,
      importedRows: "432 imported rows",
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      {/* Page Title */}
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1,
            mb: 1,
          }}
        >
          My footprint 2026
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#b6bab1',
            lineHeight: 1.5,
            letterSpacing: '0.15px',
          }}
        >
          Management page
        </Typography>
      </Box>

      {/* Main Content Layout */}
      <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
        {/* Left Sidebar - Stepper */}
        <Box sx={{ width: 125, flexShrink: 0 }}>
          <VerticalStepper />
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{
              width: 250,
              minHeight: 36,
              height: 36,
              bgcolor: '#2b2733',
              borderRadius: '8px 8px 0 0',
              '& .MuiTabs-flexContainer': {
                height: '100%',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                minHeight: 36,
                height: 36,
                padding: '7px 12px',
                fontSize: 14,
                fontWeight: 500,
                color: '#b6bab1',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '0.4px',
                lineHeight: 'normal',
                borderRadius: '8px 8px 0 0',
                '&.Mui-selected': {
                  color: '#ffffff',
                  bgcolor: '#1e1c26',
                },
                '&:hover:not(.Mui-selected)': {
                  color: '#ffffff',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
              },
            }}
          >
            <Tab label="My Decision Timeline" disableRipple />
            <Tab label="Standardized Data" disableRipple />
          </Tabs>

          {/* Step Title */}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.22,
              mb: 1,
            }}
          >
            Step 1 – Data Ingestion
          </Typography>

          {/* Data Requirement Card */}
          <ActivityConfigCard
            title="Data Requirements"
            subtitle="Required Files"
            description="To compute a Scope 3.1 footprint, we recommend uploading purchased products list, suppliers list, and procurement information including quantities, locations, and associated brands and categories."
            showFolderSection={true}
          />

          {/* Uploaded Files Card */}
          <ActivityConfigCard
            title="Uploaded Files"
            subtitle="Files"
            description="Review your uploaded files and their validation status. You can add more files or correct issues found during ingestion."
            showFileRows={true}
            files={sampleFiles}
            actionButton={
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  size="small"
                  sx={{
                    color: '#44c571',
                    borderColor: '#44c571',
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      borderColor: '#44c571',
                      bgcolor: 'rgba(68, 197, 113, 0.1)',
                    },
                  }}
                  variant="outlined"
                >
                  Upload Files
                </Button>
                <IconButton
                  size="small"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <BookmarkBorder sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  )
}
