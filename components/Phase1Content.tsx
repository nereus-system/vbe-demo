'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  LinearProgress,
  Divider,
} from '@mui/material'
import {
  ChevronRight,
  Folder,
  TableChart,
  AccountTree,
  Download,
  Upload,
  Settings,
  UnfoldMore,
  Factory,
  Description,
  OpenInNew,
} from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface FolderItem {
  id: string
  name: string
  uploaded: number
  total: number
  icon?: 'folder' | 'factory' | 'files'
  hasAction?: boolean
  actionLabel?: string
  actionIcon?: React.ReactNode
}

const folders: FolderItem[] = [
  { id: '1', name: 'First CCF 2027', uploaded: 0, total: 0, icon: 'folder' },
  { id: '2', name: 'Energy', uploaded: 1, total: 1, icon: 'folder' },
  { id: '3', name: 'Employees', uploaded: 2, total: 2, icon: 'folder' },
  { id: '4', name: 'Purchases', uploaded: 3, total: 4, icon: 'folder' },
  { id: '5', name: 'Some special activity files', uploaded: 2, total: 2, icon: 'folder' },
  {
    id: '6',
    name: 'Site info for 2024',
    uploaded: 3,
    total: 3,
    icon: 'factory',
    hasAction: true,
    actionLabel: 'Manage Sites List',
    actionIcon: <OpenInNew sx={{ fontSize: 18 }} />,
  },
  { id: '7', name: 'Other files', uploaded: 2, total: 3, icon: 'files' },
]

export function Phase1Content() {
  const [dataType, setDataType] = useState<'yearly' | 'business'>('yearly')
  const [cycle, setCycle] = useState('2024')
  const [dataView, setDataView] = useState<'raw' | 'standardized'>('raw')
  const [contentView, setContentView] = useState<'folders' | 'table' | 'dependencies'>('folders')
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [allExpanded, setAllExpanded] = useState(false)

  const totalUploaded = folders.reduce((sum, f) => sum + f.uploaded, 0)
  const totalFiles = folders.reduce((sum, f) => sum + f.total, 0)
  const uploadProgress = totalFiles > 0 ? (totalUploaded / totalFiles) * 100 : 0

  const handleFolderToggle = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleExpandAll = () => {
    const newExpanded: Record<string, boolean> = {}
    folders.forEach((folder) => {
      newExpanded[folder.id] = !allExpanded
    })
    setExpandedFolders(newExpanded)
    setAllExpanded(!allExpanded)
  }

  const getFolderIcon = (icon?: string) => {
    switch (icon) {
      case 'factory':
        return <Factory sx={{ fontSize: 20, color: '#ffffff' }} />
      case 'files':
        return <Description sx={{ fontSize: 20, color: '#ffffff' }} />
      default:
        return <Folder sx={{ fontSize: 20, color: '#ffffff' }} />
    }
  }

  const getFileStatusColor = (uploaded: number, total: number) => {
    if (uploaded === 0) return '#b6bab1'
    if (uploaded < total) return '#edbf2f'
    return '#b6bab1'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
      }}
    >
      {/* Stepper */}
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 24, color: '#44c571' }} />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              lineHeight: 1.57,
              letterSpacing: '0.1px',
              textAlign: 'center',
            }}
          >
            Ingestion
          </Typography>
        </Box>
        <Box
          sx={{
            width: '51px',
            height: '1px',
            backgroundColor: '#554b55',
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Page Title */}
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
              Phase 1
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
              Start by uploading your raw data. We'll take it from there—analyzing and preparing it
              for standardization.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Header Footprint Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'flex-start',
        }}
      >
        {/* Data Type Toggle & Cycle Selector */}
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <ToggleButtonGroup
            value={dataType}
            exclusive
            onChange={(_, value) => value && setDataType(value)}
            sx={{
              height: 30,
              border: '1px solid #3d3744',
              borderRadius: '4px',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRight: '1px solid #3d3744',
                padding: '4px',
                '&:last-child': {
                  borderRight: 'none',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(210, 215, 203, 0.24)',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(210, 215, 203, 0.24)',
                  },
                },
                '&:not(.Mui-selected)': {
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="yearly">
              <Typography
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.43,
                  letterSpacing: '0.17px',
                  textTransform: 'none',
                }}
              >
                Yearly Data
              </Typography>
            </ToggleButton>
            <ToggleButton value="business">
              <Typography
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.43,
                  letterSpacing: '0.17px',
                  textTransform: 'none',
                }}
              >
                Business Entities
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          <FormControl
            sx={{
              minWidth: 95,
              '& .MuiOutlinedInput-root': {
                height: 30,
                border: '1px solid #554b55',
                borderRadius: '4px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputLabel-root': {
                fontSize: 12,
                color: '#b6bab1',
                lineHeight: '12px',
                top: '-2px',
                left: '8px',
                backgroundColor: '#2b2733',
                padding: '0 4px',
                '&.Mui-focused': {
                  color: '#b6bab1',
                },
              },
              '& .MuiSelect-select': {
                padding: '3px 24px 3px 8px',
                fontSize: 14,
                color: '#ffffff',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: 1.43,
                letterSpacing: '0.17px',
              },
            }}
          >
            <InputLabel>Cycle</InputLabel>
            <Select
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              label="Cycle"
              IconComponent={(props) => (
                <ChevronRight
                  {...props}
                  sx={{
                    fontSize: 24,
                    color: '#73696d',
                    transform: 'rotate(90deg)',
                    right: 0,
                  }}
                />
              )}
            >
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2026">2026</MenuItem>
              <MenuItem value="2027">2027</MenuItem>
            </Select>
          </FormControl>

          {/* Files & Footprint Status */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  color: uploadProgress < 100 ? '#edbf2f' : '#ffffff',
                  lineHeight: 1.5,
                  letterSpacing: '0.15px',
                }}
              >
                {totalUploaded}/{totalFiles} files uploaded
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 4,
                  position: 'relative',
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 4,
                    borderRadius: '2px',
                    backgroundColor: '#2b2733',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: uploadProgress < 100 ? '#b6bab1' : '#44c571',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    border: '1.5px solid #73696d',
                    backgroundColor: 'transparent',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  color: '#73696d',
                  lineHeight: 1.5,
                  letterSpacing: '0.15px',
                }}
              >
                No footprint created yet
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Data View Tabs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderBottom: '1px solid #3d3744',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 0,
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => setDataView('raw')}
              sx={{
                padding: '12px 16px',
                minWidth: 'auto',
                borderRadius: 0,
                borderBottom: dataView === 'raw' ? '2px solid #44c571' : 'none',
                color: dataView === 'raw' ? '#44c571' : '#d2d7cb',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.4px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              Raw Data
            </Button>
            <Button
              onClick={() => setDataView('standardized')}
              sx={{
                padding: '12px 16px',
                minWidth: 'auto',
                borderRadius: 0,
                borderBottom: dataView === 'standardized' ? '2px solid #44c571' : 'none',
                color: dataView === 'standardized' ? '#44c571' : '#d2d7cb',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.4px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              CO2 AI Standardized Data
            </Button>
          </Box>
        </Box>

        {/* Content View Toggle & Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <ToggleButtonGroup
            value={contentView}
            exclusive
            onChange={(_, value) => value && setContentView(value)}
            sx={{
              border: '1px solid #3d3744',
              borderRadius: '4px',
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRight: '1px solid #3d3744',
                padding: '4px',
                '&:last-child': {
                  borderRight: 'none',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(210, 215, 203, 0.24)',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(210, 215, 203, 0.24)',
                  },
                },
                '&:not(.Mui-selected)': {
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="folders">
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Folder sx={{ fontSize: 20 }} />
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.43,
                    letterSpacing: '0.17px',
                    textTransform: 'none',
                  }}
                >
                  Folders
                </Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="table">
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <TableChart sx={{ fontSize: 20 }} />
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.43,
                    letterSpacing: '0.17px',
                    textTransform: 'none',
                  }}
                >
                  Table
                </Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="dependencies">
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <AccountTree sx={{ fontSize: 20 }} />
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.43,
                    letterSpacing: '0.17px',
                    textTransform: 'none',
                  }}
                >
                  Dependencies
                </Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>

          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Download sx={{ fontSize: 18 }} />}
              sx={{
                borderColor: '#44c571',
                color: '#44c571',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '22px',
                letterSpacing: '0.46px',
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#44c571',
                  backgroundColor: 'rgba(68, 197, 113, 0.1)',
                },
              }}
            >
              All Templates
            </Button>
            <Button
              variant="contained"
              startIcon={<Upload sx={{ fontSize: 18 }} />}
              sx={{
                backgroundColor: '#44c571',
                color: '#ffffff',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '22px',
                letterSpacing: '0.46px',
                padding: '4px 10px',
                borderRadius: '4px',
                textTransform: 'none',
                boxShadow:
                  '0px 1px 5px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#3db362',
                },
              }}
            >
              Upload Files
            </Button>
            <IconButton
              sx={{
                padding: '5px',
                borderRadius: '50%',
                color: '#44c571',
                '&:hover': {
                  backgroundColor: 'rgba(68, 197, 113, 0.1)',
                },
              }}
            >
              <Settings sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Expand All Button */}
        <Box>
          <Button
            startIcon={<UnfoldMore sx={{ fontSize: 18, color: '#95938e' }} />}
            onClick={handleExpandAll}
            sx={{
              padding: '4px 5px',
              minWidth: 'auto',
              color: '#95938e',
              fontFamily: 'Roboto, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: '22px',
              letterSpacing: '0.46px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(149, 147, 142, 0.1)',
              },
            }}
          >
            Expand all
          </Button>
        </Box>

        {/* Folder List */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
          }}
        >
          {folders.map((folder, index) => {
            const isExpanded = expandedFolders[folder.id] || false
            const progress = folder.total > 0 ? (folder.uploaded / folder.total) * 100 : 0
            const statusColor = getFileStatusColor(folder.uploaded, folder.total)

            return (
              <Box key={folder.id}>
                {index > 0 && (
                  <Divider
                    sx={{
                      borderColor: '#2b2733',
                      marginBottom: '16px',
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    },
                  }}
                  onClick={() => handleFolderToggle(folder.id)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '15px 0',
                      paddingRight: '10px',
                    }}
                  >
                    <ChevronRight
                      sx={{
                        fontSize: 18,
                        color: '#ffffff',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flex: 1,
                      padding: '12px 0',
                      paddingLeft: '8px',
                    }}
                  >
                    {getFolderIcon(folder.icon)}
                    <Typography
                      sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 16,
                        fontWeight: 400,
                        color: '#ffffff',
                        lineHeight: 1.5,
                        letterSpacing: '0.15px',
                      }}
                    >
                      {folder.name}
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 4,
                        position: 'relative',
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 4,
                          borderRadius: '2px',
                          backgroundColor: '#2b2733',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#b6bab1',
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 14,
                        fontWeight: 400,
                        color: statusColor,
                        lineHeight: 1.43,
                        letterSpacing: '0.17px',
                      }}
                    >
                      {folder.uploaded}/{folder.total} file{folder.total !== 1 ? 's' : ''}
                    </Typography>
                    {folder.hasAction && (
                      <Button
                        variant="outlined"
                        startIcon={folder.actionIcon}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle action
                        }}
                        sx={{
                          borderColor: '#554b55',
                          color: '#95938e',
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 13,
                          fontWeight: 500,
                          lineHeight: '22px',
                          letterSpacing: '0.46px',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          textTransform: 'none',
                          marginLeft: 'auto',
                          '&:hover': {
                            borderColor: '#554b55',
                            backgroundColor: 'rgba(85, 75, 85, 0.1)',
                          },
                        }}
                      >
                        {folder.actionLabel}
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

