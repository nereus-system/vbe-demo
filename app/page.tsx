import { PageLayout } from '@/components/PageLayout'
import { Typography, Box } from '@mui/material'

export default function Home() {
  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to VBE Demo
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Next.js 14 + TypeScript + MUI v6
        </Typography>
      </Box>
    </PageLayout>
  )
}
