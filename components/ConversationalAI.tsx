'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  AttachFile,
  Send,
  Close,
  Add,
  ArrowDropDown,
  ContentCopy,
  Refresh,
  ThumbUp,
  ThumbDown,
  ExpandMore,
  ChevronRight,
  CheckCircle,
  RadioButtonUnchecked,
  Receipt,
  People,
  Category,
  Business,
  LocationOn,
  AttachMoney,
  Description
} from '@mui/icons-material'

interface ConversationalAIProps {
  width?: number | string
  onAnalysisComplete?: () => void
  onGoalSelected?: () => void
}

// Purple Logo Component based on Figma design
const PurpleLogo = ({ size = 24, id = 'purpleGrad' }: { size?: number; id?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Left infinity symbol */}
    <path
      d="M6 8C6 6.9 6.9 6 8 6H10C11.1 6 12 6.9 12 8V10C12 11.1 11.1 12 10 12H8C6.9 12 6 11.1 6 10V8Z"
      fill={`url(#${id})`}
    />
    <path
      d="M6 14C6 12.9 6.9 12 8 12H10C11.1 12 12 12.9 12 14V16C12 17.1 11.1 18 10 18H8C6.9 18 6 17.1 6 16V14Z"
      fill={`url(#${id})`}
    />
    <path
      d="M8 10C8 9.45 8.45 9 9 9H11C11.55 9 12 9.45 12 10V14C12 14.55 11.55 15 11 15H9C8.45 15 8 14.55 8 14V10Z"
      fill={`url(#${id})`}
      opacity="0.8"
    />
    {/* Middle infinity symbol */}
    <path
      d="M10 8C10 6.9 10.9 6 12 6H14C15.1 6 16 6.9 16 8V10C16 11.1 15.1 12 14 12H12C10.9 12 10 11.1 10 10V8Z"
      fill={`url(#${id})`}
    />
    <path
      d="M10 14C10 12.9 10.9 12 12 12H14C15.1 12 16 12.9 16 14V16C16 17.1 15.1 18 14 18H12C10.9 18 10 17.1 10 16V14Z"
      fill={`url(#${id})`}
    />
    <path
      d="M12 10C12 9.45 12.45 9 13 9H15C15.55 9 16 9.45 16 10V14C16 14.55 15.55 15 15 15H13C12.45 15 12 14.55 12 14V10Z"
      fill={`url(#${id})`}
      opacity="0.8"
    />
    {/* Right circles */}
    <circle cx="18" cy="9" r="2.5" fill={`url(#${id})`} />
    <circle cx="18" cy="15" r="2.5" fill={`url(#${id})`} />
  </svg>
)

interface ChatHistory {
  id: string
  title: string
  messages: Message[]
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  methodology?: string
  thought?: string
}

// Helper to render text with bold markdown support
const RenderContent = ({ content }: { content: string }) => {
  const parts = content.split(/(\*\*.*?\*\*)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return part
      })}
    </span>
  )
}

export function ConversationalAI({ width = 374, onAnalysisComplete, onGoalSelected }: ConversationalAIProps) {
  const [chatTitle, setChatTitle] = useState('New AI chat')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [chatDropdownAnchor, setChatDropdownAnchor] = useState<null | HTMLElement>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [expandedThought, setExpandedThought] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'thought' | 'sources' | 'methodology' | null>(null)
  const [messagesLeft, setMessagesLeft] = useState(22)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  // 22-Step Flow State
  type FlowStep = 
    | 'welcome' // Initial state
    | 'phase1_step1_select_footprint'
    | 'phase1_step2_select_year'
    | 'phase1_step3_prior_experience'
    | 'phase1_step4_file_recommendations'
    | 'phase1_step5_collaborator_support'
    | 'phase1_step6_file_upload_description'
    | 'phase1_step7_error_warning_review'
    | 'phase1_step8_optional_files'
    | 'phase1_step9_validate_clean_data'
    | 'phase1_step10_transition_standardisation'
    | 'phase2_step11_optional_bu_check'
    | 'phase2_step12_transformation'
    | 'phase2_step13_standardised_available'
    | 'phase2_step14_review_standardised'
    | 'phase2_step15_validate_standardised'
    | 'phase2_step16_activity_creation_summary'
    | 'phase2_step17_optional_custom_rules'
    | 'phase3_step18_select_ef_priority'
    | 'phase3_step19_explain_ef_matching'
    | 'phase3_step20_footprint_ready'
    | 'phase4_step21_ask_ready_engage'
    | 'phase4_step22_gaia_hotspots'
    | 'completed'
  
  const [flowStep, setFlowStep] = useState<FlowStep>('welcome')
  
  // State for flow data
  const [goal, setGoal] = useState<{type: string | null, period: string}>({type: null, period: ''})
  const [priorExperience, setPriorExperience] = useState<boolean | null>(null)
  const [uploadedFilesInfo, setUploadedFilesInfo] = useState<any[]>([])
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>(['procurement', 'suppliers'])
  const [otherFileDescription, setOtherFileDescription] = useState('')
  
  const flowStartedRef = useRef(false)
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Step 4 Options Data
  const fileOptions = [
    { id: 'procurement', label: 'Procurement Data', desc: 'Purchase orders, invoices, transaction records', icon: <Receipt sx={{ fontSize: 20 }} /> },
    { id: 'suppliers', label: 'Suppliers List', desc: 'Supplier names, locations, contact info, spend data', icon: <People sx={{ fontSize: 20 }} /> },
    { id: 'products', label: 'Products Catalog', desc: 'Product names, categories, quantities, materials', icon: <Category sx={{ fontSize: 20 }} /> },
    { id: 'business_units', label: 'Business Units', desc: 'BU hierarchy, departments, cost centers', icon: <Business sx={{ fontSize: 20 }} /> },
    { id: 'sites', label: 'Sites / Locations', desc: 'Facility addresses, geographic data', icon: <LocationOn sx={{ fontSize: 20 }} /> },
    { id: 'spend', label: 'Spend Data', desc: 'Financial records, budgets, cost allocations', icon: <AttachMoney sx={{ fontSize: 20 }} /> },
    { id: 'other', label: 'Other', desc: 'Add custom document type', icon: <Add sx={{ fontSize: 20 }} /> },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Initialize welcome message - Step 1
  useEffect(() => {
    if (flowStartedRef.current) return
    flowStartedRef.current = true

    const initWelcome = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      const welcomeMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '**Welcome to CO2 AI!**\n\nI\'m here to help you compute your carbon footprint.\n\nWhich footprint do you want to build?',
      }
      setMessages([welcomeMessage])
      setFlowStep('phase1_step1_select_footprint')
    }

    initWelcome()
  }, [])

  // ========== FLOW HANDLERS ==========

  // Step 1: Footprint Selection
  const handleStep1Select = async (selection: string) => {
    setGoal(prev => ({ ...prev, type: selection }))
    setFlowStep('phase1_step2_select_year')
    if (onGoalSelected) onGoalSelected()
    await sendMessage(selection)
  }

  // Step 2: Year Selection
  const handleStep2Select = async (year: string) => {
    setGoal(prev => ({ ...prev, period: year }))
    setFlowStep('phase1_step3_prior_experience')
    await sendMessage(year)
  }

  // Step 3: Prior Experience
  const handleStep3Select = async (hasExperience: boolean) => {
    setPriorExperience(hasExperience)
    await sendMessage(hasExperience ? 'Yes' : 'No')
  }

  // Step 3 Follow-up: Motivation (if No)
  const handleStep3MotivationSelect = async (motivation: string) => {
    setFlowStep('phase1_step4_file_recommendations')
    await sendMessage(motivation)
  }

  // Step 4: File Recommendations - NEW LOGIC
  const toggleFileType = (id: string) => {
    setSelectedFileTypes(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleStep4Continue = async () => {
    const selectedLabels = fileOptions
        .filter(opt => selectedFileTypes.includes(opt.id))
        .map(opt => opt.id === 'other' ? `Other: ${otherFileDescription}` : opt.label)
    
    const message = `I plan to upload: ${selectedLabels.join(', ')}`
    setFlowStep('phase1_step5_collaborator_support')
    await sendMessage(message)
  }

  // Step 5: Collaborators
  const handleStep5Select = async (response: string) => {
    setFlowStep('phase1_step6_file_upload_description')
    await sendMessage(response)
  }

  // Step 6: File Upload -> Handled by handleFileUpload
  
  // Step 7: Error Review
  const handleStep7Action = async (action: string) => {
    setFlowStep('phase1_step8_optional_files')
    await sendMessage(action)
  }

  // Step 8: Optional Files
  const handleStep8Action = async (action: string) => {
    setFlowStep('phase1_step9_validate_clean_data')
    await sendMessage(action)
  }

  // Step 9: Validate Clean Data
  const handleStep9Action = async (action: string) => {
    if (action.includes('Yes')) {
      setFlowStep('phase1_step10_transition_standardisation')
    }
    await sendMessage(action)
  }

  // Step 10: Transition
  const handleStep10Proceed = async () => {
    setFlowStep('phase2_step11_optional_bu_check')
    await sendMessage('Proceed')
  }

  // Step 11: BU/Brand Check
  const handleStep11Action = async (action: string) => {
    setFlowStep('phase2_step12_transformation')
    await sendMessage(action)
  }

  // Step 12: Transformation
  const handleStep12Proceed = async () => {
    setFlowStep('phase2_step13_standardised_available')
    await sendMessage('Proceed')
  }

  // Step 13: Standardised Available
  const handleStep13Action = async (action: string) => {
    if (action === 'Proceed to activities') {
      setFlowStep('phase2_step16_activity_creation_summary') 
    } else {
        // Wait for user confirmation if they viewed reports
    }
    await sendMessage(action)
    if (action === 'Proceed to activities') {
         setFlowStep('phase2_step16_activity_creation_summary') 
    }
  }

  // Step 14: Review Standardised (Optional)
  const handleStep14Action = async (action: string) => {
    if (action.includes('Yes')) {
       // handled by AI
    } else {
      setFlowStep('phase2_step15_validate_standardised')
    }
    await sendMessage(action)
  }

  // Step 15: Validate Standardised
  const handleStep15Action = async (action: string) => {
    setFlowStep('phase2_step16_activity_creation_summary')
    await sendMessage(action)
  }

  // Step 16: Activity Creation Summary
  const handleStep16Action = async (action: string) => {
    if (action.includes('EF Matching')) {
       setFlowStep('phase2_step17_optional_custom_rules')
    }
    await sendMessage(action)
  }

  // Step 17: Custom Rules
  const handleStep17Action = async (action: string) => {
    setFlowStep('phase3_step18_select_ef_priority')
    await sendMessage(action)
  }

  // Step 18: EF Priority
  const handleStep18Action = async (action: string) => {
    setFlowStep('phase3_step19_explain_ef_matching')
    await sendMessage(action)
  }

  // Step 19: Explain EF Matching
  const handleStep19Proceed = async () => {
    setFlowStep('phase3_step20_footprint_ready')
    await sendMessage('Proceed to EF Matching')
  }

  // Step 20: Footprint Ready
  const handleStep20Action = async (action: string) => {
    if (action === 'Engage suppliers') {
      setFlowStep('phase4_step21_ask_ready_engage')
    }
    await sendMessage(action)
  }

  // Step 21: Ask Ready Engage
  const handleStep21Action = async (action: string) => {
    if (action.includes('Yes')) {
      setFlowStep('phase4_step22_gaia_hotspots')
    }
    await sendMessage(action)
  }

  // Step 22: Gaia Hotspots
  const handleStep22Action = async (action: string) => {
    setFlowStep('completed')
    await sendMessage(action)
    if (onAnalysisComplete) onAnalysisComplete()
  }


  // Generic Send Message
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
    }

    // Handle state transitions for text-input steps
    // Step 3: Yes path (Description)
    if (flowStep === 'phase1_step3_prior_experience' && priorExperience === true && messageText !== 'Yes') {
        setFlowStep('phase1_step4_file_recommendations')
    }
    // Step 17: Yes path (Rule Description)
    if (flowStep === 'phase2_step17_optional_custom_rules' && messageText !== 'Yes' && messageText !== 'No') {
         setFlowStep('phase3_step18_select_ef_priority')
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)
    abortControllerRef.current = new AbortController()

    try {
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content })).concat({ role: 'user', content: messageText.trim() })
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) throw new Error('Failed to get response')

      const assistantMessageId = `assistant-${Date.now()}`
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }])

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('No response body')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                setMessages(prev => prev.map(msg => msg.id === assistantMessageId ? { ...msg, content: msg.content + content } : msg))
              }
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') setError(err)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  // File Upload Handler
  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    if (fileArray.length === 0) return
    setAttachedFiles(prev => [...prev, ...fileArray])
    
    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content: `📎 Uploaded: ${fileArray.map(f => f.name).join(', ')}` }
    setMessages(prev => [...prev, userMsg])
    
    // Advance step based on current step
    if (flowStep === 'phase1_step4_file_recommendations') {
        setFlowStep('phase1_step5_collaborator_support')
    } else if (flowStep === 'phase1_step6_file_upload_description') {
        setFlowStep('phase1_step7_error_warning_review')
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate
    setIsLoading(false)
    
    await sendMessage(`I have uploaded ${fileArray.length} files.`)
  }

  const handleFileAttach = () => fileInputRef.current?.click()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFileUpload(e.target.files)
  }
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if(input.trim()) sendMessage(input)
  }
  
  // Other helpers
  const handleNewChat = () => {
      setMessages([])
      setFlowStep('welcome')
      // Reset other state...
      window.location.reload() // Simplest reset for demo
  }
  
  const handleCloseChat = () => handleNewChat()
  const formatTimestamp = (d: Date) => d.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})

  return (
    <Box sx={{ width, height: '100%', bgcolor: '#17161D', border: '1px solid #3d3744', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #2b2733' }}>
        <Typography sx={{ color: '#fff', fontSize: 14 }}>{chatTitle}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="New chat"><IconButton size="small" onClick={handleNewChat} sx={{ color: '#b6bab1' }}><Add /></IconButton></Tooltip>
            <Tooltip title="Close"><IconButton size="small" onClick={handleCloseChat} sx={{ color: '#b6bab1' }}><Close /></IconButton></Tooltip>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((msg, idx) => (
            <Box key={msg.id} sx={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                {msg.role === 'assistant' && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                        <PurpleLogo size={20} />
                        <Typography sx={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>CO2 AI</Typography>
                    </Box>
                )}
                <Box sx={{ 
                    bgcolor: msg.role === 'user' ? '#3d3744' : 'transparent', 
                    p: msg.role === 'user' ? 1.5 : 0, 
                    borderRadius: 2,
                    color: '#fff'
                }}>
                    <Typography sx={{ fontSize: 14, whiteSpace: 'pre-wrap' }}>
                        <RenderContent content={msg.content} />
                    </Typography>
                </Box>

                {/* Interactive Elements based on Flow Step & Message Index */}
                {msg.role === 'assistant' && idx === messages.length - 1 && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {/* Step 1 */}
                        {flowStep === 'phase1_step1_select_footprint' && (
                            <>
                                {['Scope 3.1', 'Product Carbon Footprint', 'Supplier Engagement'].map(opt => (
                                    <Button key={opt} variant="outlined" onClick={() => handleStep1Select(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>{opt}</Button>
                                ))}
                            </>
                        )}

                        {/* Step 2 */}
                        {flowStep === 'phase1_step2_select_year' && (
                            <FormControl fullWidth size="small" sx={{ maxWidth: 200 }}>
                                <InputLabel sx={{ color: '#b6bab1' }}>Year</InputLabel>
                                <Select 
                                    label="Year" 
                                    onChange={(e) => handleStep2Select(e.target.value as string)}
                                    sx={{ color: '#fff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#554b55' } }}
                                >
                                    {Array.from({length: 16}, (_, i) => 2020 + i).map(y => (
                                        <MenuItem key={y} value={y.toString()}>{y}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* Step 3 */}
                        {flowStep === 'phase1_step3_prior_experience' && !priorExperience && (
                             <>
                                <Button variant="outlined" onClick={() => handleStep3Select(true)} sx={{ color: '#44c571', borderColor: '#44c571' }}>Yes</Button>
                                <Button variant="outlined" onClick={() => handleStep3Select(false)} sx={{ color: '#44c571', borderColor: '#44c571' }}>No</Button>
                             </>
                        )}
                        {/* Step 3 Motivation (implicit if No was selected and AI asked Why) */}
                        {flowStep === 'phase1_step3_prior_experience' && messages[messages.length-1].content.includes('Why') && (
                            <>
                                {['CSRD Compliance', 'CDP Reporting', 'SBTi Targets', 'Internal Goals', 'Other Reasons'].map(opt => (
                                    <Button key={opt} variant="outlined" onClick={() => handleStep3MotivationSelect(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>{opt}</Button>
                                ))}
                            </>
                        )}

                        {/* Step 4 - NEW UX */}
                        {flowStep === 'phase1_step4_file_recommendations' && (
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography sx={{ color: '#b6bab1', fontSize: 13, mb: 1 }}>Select the documents you plan to upload:</Typography>
                                
                                <Stack spacing={1.5} sx={{ width: '100%' }}>
                                    {fileOptions.map((opt) => {
                                        const isSelected = selectedFileTypes.includes(opt.id)
                                        return (
                                            <Box 
                                                key={opt.id}
                                                onClick={() => toggleFileType(opt.id)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    p: 2,
                                                    borderRadius: 1,
                                                    border: `1px solid ${isSelected ? '#44c571' : '#3d3744'}`,
                                                    bgcolor: isSelected ? 'rgba(68, 197, 113, 0.04)' : 'transparent',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        borderColor: isSelected ? '#44c571' : '#554b55',
                                                        bgcolor: isSelected ? 'rgba(68, 197, 113, 0.08)' : 'rgba(255,255,255,0.02)'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                                    {/* Selection Icon */}
                                                    <Box sx={{ color: isSelected ? '#44c571' : '#73696d', display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        {isSelected ? <CheckCircle sx={{ fontSize: 22 }} /> : <RadioButtonUnchecked sx={{ fontSize: 22 }} />}
                                                    </Box>
                                                    
                                                    {/* Content */}
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                            <Box sx={{ color: isSelected ? '#44c571' : '#b6bab1', display: 'flex', alignItems: 'center' }}>
                                                                {opt.icon}
                                                            </Box>
                                                            <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{opt.label}</Typography>
                                                        </Box>
                                                        <Typography sx={{ color: '#b6bab1', fontSize: 12, lineHeight: 1.4 }}>{opt.desc}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Other Input */}
                                                {opt.id === 'other' && isSelected && (
                                                    <Box sx={{ mt: 1.5, ml: 4.5 }} onClick={(e) => e.stopPropagation()}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            placeholder="Describe your document(s)..."
                                                            value={otherFileDescription}
                                                            onChange={(e) => setOtherFileDescription(e.target.value)}
                                                            sx={{
                                                                bgcolor: 'rgba(0,0,0,0.2)',
                                                                borderRadius: 1,
                                                                '& .MuiOutlinedInput-root': {
                                                                    color: '#fff',
                                                                    fontSize: 13,
                                                                    '& fieldset': { borderColor: '#3d3744' },
                                                                    '&:hover fieldset': { borderColor: '#554b55' },
                                                                    '&.Mui-focused fieldset': { borderColor: '#44c571' }
                                                                },
                                                                '& input::placeholder': { color: '#73696d' }
                                                            }}
                                                        />
                                                    </Box>
                                                )}
                                            </Box>
                                        )
                                    })}
                                </Stack>

                                <Button 
                                    variant="contained" 
                                    fullWidth
                                    onClick={handleStep4Continue}
                                    sx={{ 
                                        mt: 2,
                                        bgcolor: '#44c571',
                                        textTransform: 'none',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        py: 1.5,
                                        borderRadius: 1,
                                        '&:hover': {
                                            bgcolor: '#3db362',
                                        }
                                    }}
                                    endIcon={<ChevronRight />}
                                >
                                    Continue
                                </Button>
                            </Box>
                        )}

                        {/* Step 5 */}
                        {flowStep === 'phase1_step5_collaborator_support' && (
                            <>
                                <Button variant="outlined" onClick={() => handleStep5Select('Yes, create folders')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Yes, create folders</Button>
                                <Button variant="outlined" onClick={() => handleStep5Select('No, I’ll upload everything')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No, I’ll upload everything</Button>
                            </>
                        )}

                        {/* Step 6 Dropzone Simulated */}
                        {flowStep === 'phase1_step6_file_upload_description' && (
                             <Box sx={{ width: '100%', border: '1px dashed #554b55', borderRadius: 2, p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleFileAttach}>
                                <Typography sx={{ color: '#b6bab1' }}>Click to upload files</Typography>
                             </Box>
                        )}

                        {/* Step 7 */}
                        {flowStep === 'phase1_step7_error_warning_review' && (
                            <>
                                <Button variant="outlined" onClick={() => handleStep7Action('Review issues')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Review issues</Button>
                                <Button variant="outlined" onClick={() => handleStep7Action('Fix automatically')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Fix automatically</Button>
                            </>
                        )}

                         {/* Step 8 */}
                         {flowStep === 'phase1_step8_optional_files' && (
                            <>
                                <Button variant="outlined" onClick={() => handleStep8Action('Yes, add more files')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Yes, add more files</Button>
                                <Button variant="outlined" onClick={() => handleStep8Action('No, continue')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No, continue</Button>
                            </>
                        )}

                        {/* Step 9 */}
                        {flowStep === 'phase1_step9_validate_clean_data' && (
                            <>
                                <Button variant="contained" onClick={() => handleStep9Action('Yes, validate')} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Yes, validate</Button>
                                <Button variant="outlined" onClick={() => handleStep9Action('No, correct more data')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No, correct more data</Button>
                            </>
                        )}
                        
                        {/* Step 10 */}
                        {flowStep === 'phase1_step10_transition_standardisation' && (
                             <Button variant="contained" onClick={handleStep10Proceed} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Proceed</Button>
                        )}

                        {/* Step 11 */}
                        {flowStep === 'phase2_step11_optional_bu_check' && (
                            <>
                                <Button variant="outlined" onClick={() => handleStep11Action('Yes, add BU/Brand')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Yes, add BU/Brand</Button>
                                <Button variant="outlined" onClick={() => handleStep11Action('No, continue without')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No, continue without</Button>
                            </>
                        )}

                        {/* Step 12 */}
                        {flowStep === 'phase2_step12_transformation' && (
                             <Button variant="contained" onClick={handleStep12Proceed} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Proceed</Button>
                        )}

                        {/* Step 13 */}
                        {flowStep === 'phase2_step13_standardised_available' && (
                            <>
                                {['View standardised dataset', 'View mapping clean → standard', 'Show file list', 'Proceed to activities'].map(opt => (
                                     <Button key={opt} variant="outlined" onClick={() => handleStep13Action(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none', mb: 1 }}>{opt}</Button>
                                ))}
                            </>
                        )}

                        {/* Step 14 */}
                        {flowStep === 'phase2_step14_review_standardised' && (
                            <>
                                <Button variant="outlined" onClick={() => handleStep14Action('Yes, review')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Yes, review</Button>
                                <Button variant="outlined" onClick={() => handleStep14Action('No, proceed to activities')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No, proceed to activities</Button>
                            </>
                        )}

                        {/* Step 15 */}
                        {flowStep === 'phase2_step15_validate_standardised' && (
                             <>
                                <Button variant="contained" onClick={() => handleStep15Action('Yes')} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Yes</Button>
                                <Button variant="outlined" onClick={() => handleStep15Action('No')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No</Button>
                             </>
                        )}

                        {/* Step 16 */}
                        {flowStep === 'phase2_step16_activity_creation_summary' && (
                             <>
                                <Button variant="outlined" onClick={() => handleStep16Action('View Details')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>View Details</Button>
                                <Button variant="contained" onClick={() => handleStep16Action('Proceed to EF Matching')} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Proceed to EF Matching</Button>
                             </>
                        )}
                        
                        {/* Step 17 */}
                        {flowStep === 'phase2_step17_optional_custom_rules' && (
                             <>
                                <Button variant="outlined" onClick={() => handleStep17Action('Yes')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Yes</Button>
                                <Button variant="outlined" onClick={() => handleStep17Action('No')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>No</Button>
                             </>
                        )}

                        {/* Step 18 */}
                        {flowStep === 'phase3_step18_select_ef_priority' && (
                            <>
                                {['EXIOBASE', 'GHG Protocol', 'ADEME Base Carbone', 'Ecoinvent', 'Use CO2 AI choices'].map(opt => (
                                     <Button key={opt} variant="outlined" onClick={() => handleStep18Action(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none', mb: 1 }}>{opt}</Button>
                                ))}
                            </>
                        )}

                        {/* Step 19 */}
                        {flowStep === 'phase3_step19_explain_ef_matching' && (
                             <Button variant="contained" onClick={handleStep19Proceed} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Proceed to EF Matching</Button>
                        )}

                        {/* Step 20 */}
                        {flowStep === 'phase3_step20_footprint_ready' && (
                             <>
                                {['Engage suppliers', 'Export report', 'Deep dive analytics'].map(opt => (
                                     <Button key={opt} variant="outlined" onClick={() => handleStep20Action(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>{opt}</Button>
                                ))}
                             </>
                        )}

                        {/* Step 21 */}
                        {flowStep === 'phase4_step21_ask_ready_engage' && (
                             <>
                                <Button variant="contained" onClick={() => handleStep21Action('Yes, let’s start')} sx={{ bgcolor: '#44c571', textTransform: 'none' }}>Yes, let’s start</Button>
                                <Button variant="outlined" onClick={() => handleStep21Action('Not now')} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none' }}>Not now</Button>
                             </>
                        )}

                        {/* Step 22 */}
                        {flowStep === 'phase4_step22_gaia_hotspots' && (
                             <>
                                {['Supplier hotspots', 'Top emissive purchased products', 'Classify suppliers by maturity', 'Prioritise suppliers'].map(opt => (
                                     <Button key={opt} variant="outlined" onClick={() => handleStep22Action(opt)} sx={{ color: '#44c571', borderColor: '#44c571', textTransform: 'none', mb: 1 }}>{opt}</Button>
                                ))}
                             </>
                        )}
                    </Box>
                )}
            </Box>
        ))}
        {isLoading && (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <PurpleLogo size={20} />
                <Typography sx={{ color: '#b6bab1', fontStyle: 'italic' }}>Thinking...</Typography>
            </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: '1px solid #2b2733' }}>
         <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleFileChange} />
         <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            disabled={isLoading}
            sx={{
                bgcolor: '#1e1c26',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { border: 'none' } }
            }}
            InputProps={{
                startAdornment: <IconButton onClick={handleFileAttach} sx={{ color: '#fff' }}><AttachFile /></IconButton>,
                endAdornment: <IconButton type="submit" disabled={!input.trim() || isLoading} sx={{ color: '#fff' }}><Send /></IconButton>
            }}
         />
         <Typography sx={{ textAlign: 'center', color: '#73696d', fontSize: 10, mt: 1 }}>AI can make mistakes. Always check information.</Typography>
      </Box>
    </Box>
  )
}
