'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
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
  Close,
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

// File Row Component for Data Quality Review
interface FileRowProps {
  fileName: string
  category: string
  description: string
  errors: number
  warnings: number
  missing: number
  importedRows: string
}

function FileRow({
  fileName,
  category,
  description,
  errors,
  warnings,
  missing,
  importedRows,
}: FileRowProps) {
  return (
    <Box
      sx={{
        border: '1px solid #2b2733',
        borderRadius: 1,
        p: 1,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        height: 66,
      }}
    >
      {/* Chevron Icon Container */}
      <Box sx={{ width: 18, height: 42, display: 'flex', alignItems: 'flex-start', pt: 0.5 }}>
        <ChevronRight sx={{ fontSize: 18, color: '#ffffff' }} />
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
        {/* Left Side - Status Icon + File Info */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          {/* Status Icon */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
            <CheckCircle sx={{ fontSize: 20, color: '#44c571' }} />
          </Box>

          {/* File Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.5,
                  letterSpacing: '0.15px',
                  fontFamily: 'Roboto, sans-serif',
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
                  '& .MuiChip-label': { px: 0.75, py: 0.375 },
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
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Validation Info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: 160,
            alignItems: 'flex-start',
            height: 50,
          }}
        >
          <Box sx={{ display: 'flex', gap: 0, alignItems: 'center' }}>
            <Button
              size="small"
              startIcon={<ErrorIcon sx={{ fontSize: 18, color: '#e53e3b' }} />}
              sx={{
                minWidth: 'auto',
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
                fontFamily: 'Roboto, sans-serif',
                '&:hover': { bgcolor: 'rgba(229, 62, 59, 0.1)' },
              }}
            >
              {errors}
            </Button>
            <Button
              size="small"
              startIcon={<Warning sx={{ fontSize: 18, color: '#edbf2f' }} />}
              sx={{
                minWidth: 'auto',
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
                fontFamily: 'Roboto, sans-serif',
                '&:hover': { bgcolor: 'rgba(237, 191, 47, 0.1)' },
              }}
            >
              {warnings}
            </Button>
            <Button
              size="small"
              startIcon={<SwapHoriz sx={{ fontSize: 18, color: '#d2d7cb' }} />}
              sx={{
                minWidth: 'auto',
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
                fontFamily: 'Roboto, sans-serif',
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
              fontFamily: 'Roboto, sans-serif',
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Chevron Icon Container - gap 10px, height 42px, padding y 15px */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 1.25, // 10px
            height: 42,
            alignItems: 'center',
            px: 0,
            py: 1.875, // 15px
            flexShrink: 0,
          }}
        >
          <Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'flex-start' }}>
            <ChevronRight
              sx={{
                fontSize: 18,
                color: '#ffffff',
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                width: 18,
                height: 18,
              }}
            />
          </Box>
        </Box>

        {/* Folder Content - gap 10px, padding left 8px, padding y 8px */}
        <Box 
          sx={{ 
            display: 'flex',
            gap: 1.25, // 10px
            alignItems: 'center',
            flex: 1,
            pl: 1, // 8px
            pr: 0,
            py: 1, // 8px
            minHeight: 0,
            minWidth: 0,
          }}
        >
          {/* Folder Icon Wrapper - gap 10px, padding top 2px */}
          <Box 
            sx={{ 
              display: 'flex',
              gap: 1.25, // 10px
              alignItems: 'center',
              pb: 0,
              pt: 0.25, // 2px
              px: 0,
            }}
          >
            <Folder sx={{ fontSize: 20, width: 20, height: 20, color: '#ffffff' }} />
          </Box>

          {/* Folder Name and Icons */}
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              minHeight: 0,
              minWidth: 0,
            }}
          >
            {/* Text Container - gap 10px */}
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5, // 4px
                alignItems: 'flex-start',
                maxWidth: 720,
                flexShrink: 0,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 1.25, // 10px
                  alignItems: 'center',
                  lineHeight: 1.5,
                  fontSize: 16,
                  letterSpacing: '0.15px',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#ffffff',
                    lineHeight: 1.5,
                    letterSpacing: '0.15px',
                    fontFamily: 'Roboto, sans-serif',
                    flexShrink: 0,
                  }}
                >
                  Footprint 2027
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#73696d',
                    lineHeight: 1.5,
                    letterSpacing: '0.15px',
                    fontFamily: 'Roboto, sans-serif',
                    flexShrink: 0,
                  }}
                >
                  3 files
                </Typography>
              </Box>
            </Box>

            {/* Icon Buttons Container */}
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexShrink: 0,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  pb: 0,
                  pt: 0.5, // 4px
                  px: 0,
                }}
              >
                <IconButton
                  sx={{
                    color: '#ffffff',
                    width: 40, // 24px icon + 8px padding * 2
                    height: 40,
                    p: 1, // 8px
                    borderRadius: '50%',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <StarBorder sx={{ fontSize: 24 }} />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#ffffff',
                    width: 40,
                    height: 40,
                    p: 1,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <StarBorder sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// Activity Config Card Component
interface ActivityConfigCardProps {
  label: string
  title: string
  description: string
  children?: React.ReactNode
  actionButton?: React.ReactNode
}

function ActivityConfigCard({
  label,
  title,
  description,
  children,
  actionButton,
}: ActivityConfigCardProps) {
  return (
    <Box
      sx={{
        bgcolor: '#1e1c26',
        border: '1px solid #2b2733',
        borderRadius: 1,
        p: 1.5,
        mb: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 400,
            color: '#73696d',
            lineHeight: 1.66,
            letterSpacing: '0.4px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {label}
        </Typography>
        {actionButton}
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.5,
              letterSpacing: '0.15px',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              color: '#73696d',
              lineHeight: 1.66,
              letterSpacing: '0.4px',
              fontFamily: 'Roboto, sans-serif',
              height: 40,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  )
}

// Main Component
export function Phase1Content() {
  const [tabValue, setTabValue] = useState(0)
  const [showSecondTab, setShowSecondTab] = useState(true)

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
              minHeight: 36,
              height: 36,
              bgcolor: '#2b2733',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              width: 'auto',
              '& .MuiTabs-flexContainer': {
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
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
                display: 'flex',
                alignItems: 'center',
                gap: 1,
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
            <Tab 
              label="My Decision Timeline" 
              disableRipple 
              sx={{ width: 'auto' }}
            />
            {showSecondTab && (
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>Standardized Data</span>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowSecondTab(false)
                        if (tabValue === 1) {
                          setTabValue(0)
                        }
                      }}
                      sx={{
                        width: 16,
                        height: 16,
                        padding: 0,
                        color: 'inherit',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <Close sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Box>
                }
                disableRipple
                sx={{ width: 'auto' }}
              />
            )}
          </Tabs>

          {/* Step Title */}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.22,
              mb: 2,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Step 1 – Data Ingestion
          </Typography>

          {/* Folder Creation Card */}
          <ActivityConfigCard
            label="Folder Creation"
            title="You've Created a new folder named: Footprint 2027"
            description="This is for creating your scope 3.1"
          >
            <DataReqFolderSection />
          </ActivityConfigCard>

          {/* Files Upload Card */}
          <ActivityConfigCard
            label="Files Upload"
            title="You've uploaded 3 Files"
            description="This is for creating your scope 3.1"
          />

          {/* Data Quality Review Card */}
          <ActivityConfigCard
            label="Data Quality Review"
            title="We've analyzed your files"
            description="Let's review it together"
            actionButton={
              <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#ffffff',
                    borderColor: '#d2d7cb',
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1,
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: '0.46px',
                    '&:hover': {
                      borderColor: '#d2d7cb',
                      bgcolor: 'rgba(210, 215, 203, 0.1)',
                    },
                  }}
                >
                  Bookmark for Support Decision
                </Button>
                <IconButton
                  size="small"
                  sx={{
                    color: '#ffffff',
                    width: 24,
                    height: 24,
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  <BookmarkBorder sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {sampleFiles.map((file, index) => (
                <FileRow key={index} {...file} />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#44c571',
                    borderColor: '#44c571',
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1,
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: '0.46px',
                    '&:hover': {
                      borderColor: '#44c571',
                      bgcolor: 'rgba(68, 197, 113, 0.1)',
                    },
                  }}
                >
                  Validate All
                </Button>
              </Box>
            </Box>
          </ActivityConfigCard>
        </Box>
      </Box>
    </Box>
  )
}
