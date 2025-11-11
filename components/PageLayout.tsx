'use client'

import { usePathname } from 'next/navigation'
import { Box } from '@mui/material'
import { SideNav } from './SideNav'
import { Breadcrumb } from './Breadcrumb'
import { getBreadcrumbs } from '@/aidd/breadcrumb-paths'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideNav />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Breadcrumb items={breadcrumbs} />
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

