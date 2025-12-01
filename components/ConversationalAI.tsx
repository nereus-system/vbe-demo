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
} from '@mui/icons-material'
interface ConversationalAIProps {
  width?: number | string
  onAnalysisComplete?: () => void
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

export function ConversationalAI({ width = 374, onAnalysisComplete }: ConversationalAIProps) {
  const [chatTitle, setChatTitle] = useState('New AI chat')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [chatDropdownAnchor, setChatDropdownAnchor] = useState<null | HTMLElement>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [expandedThought, setExpandedThought] = useState(false)
  const [expandedSources, setExpandedSources] = useState(false)
  const [expandedMethodology, setExpandedMethodology] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<'thought' | 'sources' | 'methodology' | null>(null)
  const [messagesLeft, setMessagesLeft] = useState(22)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  // Flow state management - 3-Phase Data Ingestion & Activity Creation Workflow
  type FlowStep = 
    | 'welcome' 
    | 'phase1_goal' 
    | 'phase1_file_upload'
    | 'phase1_data_description' 
    | 'phase1_schema_review' 
    | 'phase1_cleaning_confirmation'
    | 'phase2_mapping_review'
    | 'phase2_standardisation_confirmation'
    | 'phase3_1_grouping_review'
    | 'phase3_1_grouping_confirmation'
    | 'phase3_2_ef_review'
    | 'phase3_2_ef_confirmation'
    | 'phase3_3_finalisation'
    | 'phase3_3_complete'
  
  const [flowStep, setFlowStep] = useState<FlowStep>('welcome')
  
  // Phase 1 state
  const [goal, setGoal] = useState<{type: 'PCF' | 'CCF' | null, period: string, businessUnit: string}>({type: null, period: '', businessUnit: ''})
  const [dataDescription, setDataDescription] = useState<string>('')
  const [inferredSchema, setInferredSchema] = useState<any>(null)
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{
    fileName: string
    fileSize: number
    format: string
    columns: string[]
    rowCount: number
    dataTypes: Record<string, string>
  } | null>(null)
  
  // Phase 2 state
  const [mappingTable, setMappingTable] = useState<any[]>([])
  const [standardisationSummary, setStandardisationSummary] = useState<any>(null)
  
  // Phase 3.1 state
  const [activityGroups, setActivityGroups] = useState<any[]>([])
  
  // Phase 3.2 state
  const [efAssignments, setEfAssignments] = useState<any[]>([])
  
  // Phase 3.3 state
  const [finalActivities, setFinalActivities] = useState<any>(null)
  
  const flowStartedRef = useRef(false)
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Initialize welcome message - Data Ingestion & Activity Creation Agent
  useEffect(() => {
    if (flowStartedRef.current) return
    flowStartedRef.current = true

    const initWelcome = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      const welcomeMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'Hey 👋\n\nI\'m your Data Ingestion & Activity Creation Agent.\n\nI\'ll guide you through turning your procurement and supplier data into clean, standardised, emission-factor matched PCF/CCF activities.\n\nLet\'s start with **Phase 1 — Data Ingestion**.\n\n**What\'s your goal?** Are you building a PCF (Product Carbon Footprint) or CCF (Corporate Carbon Footprint)?',
      }
      setMessages([welcomeMessage])
      setFlowStep('phase1_goal')
    }

    initWelcome()
  }, [])

  // ========== PHASE 1 HANDLERS ==========
  
  // Handle goal selection (PCF or CCF) - sends message to OpenAI and prompts for file upload
  const handleGoalSelect = async (goalType: 'PCF' | 'CCF', period: string = '2024', businessUnit: string = 'Global') => {
    setGoal({ type: goalType, period, businessUnit })
    setFlowStep('phase1_file_upload')
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: `${goalType} for ${period} (${businessUnit})`,
    }
    setMessages((prev) => [...prev, userMessage])
    
    // Show file upload prompt
    await new Promise(resolve => setTimeout(resolve, 500))
    const uploadPrompt: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: `Great! Building a **${goalType}** for ${period}.\n\n**Please upload your raw dataset file** (CSV, Excel, or other supported formats) to analyze it.\n\nYou can either:\n- Upload a file using the button below\n- Or describe your data structure if you prefer`,
    }
    setMessages((prev) => [...prev, uploadPrompt])
  }

  // Handle file upload and analysis
  const handleFileUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    if (fileArray.length === 0) return

    // Store uploaded files
    setAttachedFiles((prev) => [...prev, ...fileArray])
    
    const fileMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: `📎 Uploaded ${fileArray.length} file(s): ${fileArray.map(f => f.name).join(', ')}`,
    }
    setMessages((prev) => [...prev, fileMessage])
    setFlowStep('phase1_data_description')
    setIsLoading(true)

    // Simulate file analysis
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Extract file information (simulated)
    const fileInfo = await analyzeFile(fileArray[0])
    
    // Store file info for later use
    setUploadedFileInfo({
      fileName: fileArray[0].name,
      fileSize: fileArray[0].size,
      format: fileInfo.format,
      columns: fileInfo.columns,
      rowCount: fileInfo.rowCount,
      dataTypes: fileInfo.dataTypes,
    })
    
    setIsLoading(false)

    // Send file analysis to OpenAI
    const analysisMessage = `I've uploaded a file: ${fileArray[0].name} (${(fileArray[0].size / 1024).toFixed(2)} KB). 

File analysis:
- Format: ${fileInfo.format}
- Columns detected: ${fileInfo.columns.join(', ')}
- Estimated rows: ~${fileInfo.rowCount}
- Sample data types: ${Object.entries(fileInfo.dataTypes).map(([k, v]) => `${k} (${v})`).join(', ')}

Please analyze this dataset and proceed with the schema inference.`
    
    await sendMessage(analysisMessage)
  }

  // Simulate file analysis
  const analyzeFile = async (file: File): Promise<{
    format: string
    columns: string[]
    rowCount: number
    dataTypes: Record<string, string>
  }> => {
    // Simulate reading file based on extension
    const extension = file.name.split('.').pop()?.toLowerCase()
    let format = 'Unknown'
    let columns: string[] = []
    let rowCount = 0
    let dataTypes: Record<string, string> = {}

    if (extension === 'csv') {
      format = 'CSV'
      // Simulate CSV reading
      const text = await file.text()
      const lines = text.split('\n').slice(0, 100) // Read first 100 lines
      if (lines.length > 0) {
        columns = lines[0].split(',').map(c => c.trim().replace(/"/g, ''))
        rowCount = Math.max(100, Math.floor(Math.random() * 2000) + 500)
        // Infer data types from sample
        if (lines.length > 1) {
          const sampleRow = lines[1].split(',')
          columns.forEach((col, idx) => {
            const value = sampleRow[idx]?.trim().replace(/"/g, '')
            if (value && !isNaN(Number(value))) {
              dataTypes[col] = 'number'
            } else if (value && !isNaN(Date.parse(value))) {
              dataTypes[col] = 'date'
            } else {
              dataTypes[col] = 'string'
            }
          })
        }
      }
    } else if (['xlsx', 'xls'].includes(extension || '')) {
      format = 'Excel'
      // Simulate Excel reading
      columns = ['Material', 'Supplier', 'Quantity', 'Unit', 'Country', 'Amount', 'Date']
      rowCount = Math.floor(Math.random() * 2000) + 500
      dataTypes = {
        Material: 'string',
        Supplier: 'string',
        Quantity: 'number',
        Unit: 'string',
        Country: 'string',
        Amount: 'number',
        Date: 'date',
      }
    } else {
      format = extension?.toUpperCase() || 'Unknown'
      // Default fallback
      columns = ['Column1', 'Column2', 'Column3']
      rowCount = 100
      dataTypes = { Column1: 'string', Column2: 'string', Column3: 'string' }
    }

    return { format, columns, rowCount, dataTypes }
  }

  // Handle data description input - sends to OpenAI
  const handleDataDescription = async (description: string) => {
    setDataDescription(description)
    setFlowStep('phase1_schema_review')
    
    // If user typed a description instead of uploading, send it to OpenAI
    // If file was uploaded, the analysis message was already sent in handleFileUpload
    if (!uploadedFileInfo) {
      await sendMessage(description)
    }
  }

  // Handle schema confirmation - sends to OpenAI
  const handleSchemaConfirm = async (confirmed: boolean, corrections?: string) => {
    setFlowStep('phase1_cleaning_confirmation')
    const message = confirmed ? 'Yes, this looks correct' : (corrections || 'Let me correct it')
    await sendMessage(message)
  }

  // ========== PHASE 2 HANDLERS ==========

  // Handle Phase 2 start - sends to OpenAI
  const handlePhase2Start = async () => {
    setFlowStep('phase2_mapping_review')
    await sendMessage('Yes, proceed to Phase 2')
  }

  // Handle mapping confirmation - sends to OpenAI
  const handleMappingConfirm = async (confirmed: boolean) => {
    setFlowStep('phase2_standardisation_confirmation')
    await sendMessage(confirmed ? 'The mapping looks good' : 'Let me adjust it')
  }

  // ========== PHASE 3.1 HANDLERS ==========

  // Handle Phase 3.1 start - sends to OpenAI
  const handlePhase3_1Start = async () => {
    setFlowStep('phase3_1_grouping_review')
    await sendMessage('Yes, proceed to Phase 3')
  }

  // Handle grouping confirmation - sends to OpenAI
  const handleGroupingConfirm = async (confirmed: boolean) => {
    setFlowStep('phase3_1_grouping_confirmation')
    await sendMessage(confirmed ? 'The grouping looks good' : 'Let me adjust it')
  }

  // ========== PHASE 3.2 HANDLERS ==========

  // Handle Phase 3.2 start - sends to OpenAI
  const handlePhase3_2Start = async () => {
    setFlowStep('phase3_2_ef_review')
    await sendMessage('Yes, proceed to EF matching')
  }

  // Handle EF confirmation - sends to OpenAI
  const handleEfConfirm = async (confirmed: boolean) => {
    setFlowStep('phase3_2_ef_confirmation')
    await sendMessage(confirmed ? 'These EF selections look good' : 'Let me adjust some')
  }

  // ========== PHASE 3.3 HANDLERS ==========

  // Handle Phase 3.3 start - sends to OpenAI
  const handlePhase3_3Start = async () => {
    setFlowStep('phase3_3_finalisation')
    await sendMessage('Yes, proceed to finalisation')
  }

  // Handle final confirmation - sends to OpenAI
  const handleFinalConfirm = async (confirmed: boolean) => {
    setFlowStep('phase3_3_complete')
    await sendMessage(confirmed ? 'Yes, mark as ready' : 'Not yet')
    
    // If confirmed, call the completion callback after a short delay
    if (confirmed && onAnalysisComplete) {
      setTimeout(() => {
        onAnalysisComplete()
      }, 2000) // Wait for OpenAI response to start
    }
  }

  // Update chat title when first user message is sent
  useEffect(() => {
    if (messages.length > 0 && chatTitle === 'New AI chat') {
      const firstUserMessage = messages.find((m) => m.role === 'user')
      if (firstUserMessage) {
        const title = firstUserMessage.content.length > 30 
          ? firstUserMessage.content.substring(0, 30) + '...' 
          : firstUserMessage.content
        setChatTitle(title)
        if (currentChatId) {
          saveChatToHistory(currentChatId, title, messages)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    // Handle file upload phase - if user types, treat as data description
    if (flowStep === 'phase1_file_upload') {
      setFlowStep('phase1_data_description')
      setDataDescription(messageText.trim())
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()

    try {
      // Prepare messages for API (convert to OpenAI format)
      const apiMessages = messages
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
        .concat({
          role: 'user',
          content: messageText.trim(),
        })

      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to get response' }))
        throw new Error(errorData.error || 'Failed to get response from API')
      }

      // Create assistant message for streaming
      const assistantMessageId = `assistant-${Date.now()}`
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Stream the response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta
              if (delta?.content) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: msg.content + delta.content }
                      : msg
                  )
                )
                scrollToBottom()
              }
            } catch {
              // Ignore parse errors for incomplete JSON
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer) {
        const lines = buffer.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta
              if (delta?.content) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: msg.content + delta.content }
                      : msg
                  )
                )
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User cancelled, don't show error
        return
      }
      setError(err instanceof Error ? err : new Error('An error occurred'))
      console.error('Error sending message:', err)
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
      scrollToBottom()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
    }
  }

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsLoading(false)
  }

  const reload = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
      if (lastUserMessage) {
        // Remove last assistant message if exists
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.role !== 'assistant' || m.id !== prev[prev.length - 1]?.id)
          return filtered
        })
        sendMessage(lastUserMessage.content)
      }
    }
  }

  const handleNewChat = () => {
    if (messages.length > 0 && currentChatId) {
      saveChatToHistory(currentChatId, chatTitle, messages)
    }
    const newChatId = `chat-${Date.now()}`
    setCurrentChatId(newChatId)
    setChatTitle('New AI chat')
    setShowSuggestions(true)
    setMessages([])
    setInput('')
    setAttachedFiles([])
    setExpandedThought(false)
    flowStartedRef.current = false
    setFlowStep('welcome')
    setGoal({ type: null, period: '', businessUnit: '' })
    setDataDescription('')
    setInferredSchema(null)
    setUploadedFileInfo(null)
    setMappingTable([])
    setStandardisationSummary(null)
    setActivityGroups([])
    setEfAssignments([])
    setFinalActivities(null)
  }

  const handleCloseChat = () => {
    if (isLoading) {
      stop()
    } else {
      handleNewChat()
    }
  }

  const saveChatToHistory = (id: string, title: string, msgs: any[]) => {
    setChatHistory((prev) => {
      const existing = prev.findIndex((chat) => chat.id === id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { id, title, messages: msgs }
        return updated
      }
      return [...prev, { id, title, messages: msgs }]
    })
  }

  const updateChatHistory = (id: string, msgs: any[]) => {
    setChatHistory((prev) => {
      const existing = prev.findIndex((chat) => chat.id === id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing].messages = msgs
        return updated
      }
      return prev
    })
  }

  const handleChatSelect = (chat: ChatHistory) => {
    if (messages.length > 0 && currentChatId && currentChatId !== chat.id) {
      saveChatToHistory(currentChatId, chatTitle, messages)
    }
    setCurrentChatId(chat.id)
    setChatTitle(chat.title)
    setMessages(chat.messages)
    setShowSuggestions(chat.messages.length === 0)
    setChatDropdownAnchor(null)
    setExpandedThought(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (!currentChatId) {
      const newChatId = `chat-${Date.now()}`
      setCurrentChatId(newChatId)
    }
    sendMessage(suggestion)
  }

  const handleRefreshSuggestions = () => {
    setShowSuggestions(true)
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (flowStep === 'phase1_file_upload') {
        // Handle file upload in the workflow
        handleFileUpload(e.target.files)
      } else {
        // Legacy behavior for other cases
        const files = Array.from(e.target.files)
        setAttachedFiles((prev) => [...prev, ...files])
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleRegenerate = () => {
    if (messages.length > 0) {
      let lastUserMessageIndex = messages.length - 1
      while (lastUserMessageIndex >= 0 && messages[lastUserMessageIndex].role !== 'user') {
        lastUserMessageIndex--
      }
      if (lastUserMessageIndex >= 0) {
        const messagesToKeep = messages.slice(0, lastUserMessageIndex + 1)
        setMessages(messagesToKeep)
        const lastUserMessage = messages[lastUserMessageIndex]
        sendMessage(lastUserMessage.content)
      }
    }
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const suggestions = [
    "What are my top 5 emission hotspots?",
    "What's driving the changes between past years?",
    "Can I see hotspots broken down by country?",
  ]

  const hasMessages = messages.length > 0
  const chatDropdownOpen = Boolean(chatDropdownAnchor)

  return (
    <Box
      sx={{
        width: width,
        height: '100%',
        backgroundColor: '#17161D',
        border: '1px solid #3d3744',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          px: 0,
          py: '13px',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: '8px',
            pt: '4px',
            px: '17px',
            borderBottom: '1px solid #2b2733',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              onClick={(e) => setChatDropdownAnchor(e.currentTarget)}
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 14,
                fontWeight: 400,
                color: '#ffffff',
                letterSpacing: '0.17px',
                lineHeight: 1.43,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {chatTitle}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => setChatDropdownAnchor(e.currentTarget)}
              sx={{
                width: 24,
                height: 24,
                color: '#73696d',
                p: 0,
              }}
            >
              <ArrowDropDown sx={{ fontSize: 24 }} />
            </IconButton>
            <Menu
              anchorEl={chatDropdownAnchor}
              open={chatDropdownOpen}
              onClose={() => setChatDropdownAnchor(null)}
              PaperProps={{
                sx: {
                  backgroundColor: '#17161D',
                  border: '1px solid #3d3744',
                  mt: 0.5,
                  minWidth: 200,
                },
              }}
            >
              <MenuItem
                onClick={handleNewChat}
                sx={{
                  color: '#ffffff',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 14,
                  '&:hover': {
                    backgroundColor: '#2b2733',
                  },
                }}
              >
                <Add sx={{ fontSize: 16, mr: 1 }} />
                New chat
              </MenuItem>
              {chatHistory.length > 0 && <Box sx={{ borderTop: '1px solid #2b2733', my: 0.5 }} />}
              {chatHistory.map((chat) => (
                <MenuItem
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  selected={chat.id === currentChatId}
                  sx={{
                    color: '#ffffff',
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    '&:hover': {
                      backgroundColor: '#2b2733',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#2b2733',
                    },
                  }}
                >
                  {chat.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Chip
              label="Beta"
              size="small"
              sx={{
                backgroundColor: '#103856',
                color: '#ffffff',
                fontFamily: 'Roboto, sans-serif',
                fontSize: 13,
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                height: 'auto',
                '& .MuiChip-label': {
                  px: '6px',
                  py: '3px',
                },
              }}
            />
            <Tooltip title="New chat">
              <IconButton
                size="small"
                onClick={handleNewChat}
                sx={{
                  width: 32,
                  height: 32,
                  color: '#b6bab1',
                  borderRadius: '2px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Add sx={{ fontSize: 24 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={isLoading ? 'Stop generation' : 'Close chat'}>
              <IconButton
                size="small"
                onClick={handleCloseChat}
                sx={{
                  width: 32,
                  height: 32,
                  color: '#b6bab1',
                  borderRadius: '2px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Close sx={{ fontSize: 24 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content Area */}
        <Box
          ref={contentRef}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            py: '8px',
            px: '17px',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#17161D',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#3d3744',
              borderRadius: '4px',
            },
          }}
        >
          {/* Hidden: Existing welcome content */}
          {false && !hasMessages && showSuggestions && (
            <>
              {/* Starting Block */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  pt: 5,
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PurpleLogo size={56} id="purpleGradWelcome" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 20,
                      fontWeight: 500,
                      color: '#ffffff',
                      letterSpacing: '0.15px',
                      lineHeight: 1.6,
                    }}
                  >
                    CO2 AI sustainability AI assistant
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#ffffff',
                      letterSpacing: '0.17px',
                      lineHeight: 1.43,
                    }}
                  >
                    I can help you with any questions you may have about your
                    footprints, hotspots, and gap analysis between previous years.
                  </Typography>
                </Box>
              </Box>

              {/* Suggestions Block */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#b6bab1',
                      letterSpacing: '0.17px',
                      lineHeight: 1.43,
                    }}
                  >
                    Suggestions
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 13,
                        fontWeight: 400,
                        color: '#73696d',
                        letterSpacing: '0.46px',
                        lineHeight: '22px',
                      }}
                    >
                      Not interested?{' '}
                    </Typography>
                    <Typography
                      component="span"
                      onClick={handleRefreshSuggestions}
                      sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#73696d',
                        letterSpacing: '0.46px',
                        lineHeight: '22px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': {
                          color: '#b6bab1',
                        },
                      }}
                    >
                      Try new suggestions
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      onClick={() => handleSuggestionClick(suggestion)}
                      fullWidth={index > 0}
                      sx={{
                        borderColor: '#d2d7cb',
                        color: '#d2d7cb',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: '0.4px',
                        lineHeight: '24px',
                        px: 2,
                        py: '6px',
                        borderRadius: '4px',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        '&:hover': {
                          borderColor: '#d2d7cb',
                          backgroundColor: 'rgba(210, 215, 203, 0.1)',
                        },
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </>
          )}

          {/* Error Display */}
          {error && (
            <Box
              sx={{
                p: 2,
                m: 2,
                backgroundColor: '#ff4444',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            >
              <Typography variant="body2">
                Error: {error.message || 'Failed to send message'}
              </Typography>
              <Button
                onClick={() => reload()}
                sx={{ mt: 1, color: '#ffffff' }}
                size="small"
              >
                Retry
              </Button>
            </Box>
          )}

          {/* Loading Indicator */}
          {isLoading && messages.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                color: '#b6bab1',
              }}
            >
              <CircularProgress size={16} />
              <Typography variant="body2">Thinking...</Typography>
            </Box>
          )}

          {/* Messages */}
          {hasMessages && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              {messages.map((message, index) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                    width: '100%',
                  }}
                >
                  {message.role === 'user' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', width: '100%' }}>
                      <Box
                        sx={{
                          backgroundColor: '#3d3744',
                          borderRadius: '12px 12px 12px 0',
                          p: '10px',
                          maxWidth: '100%',
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 14,
                            fontWeight: 400,
                            color: '#ffffff',
                            letterSpacing: '0.17px',
                            lineHeight: 1.43,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {message.content}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 12,
                          fontWeight: 400,
                          color: '#73696d',
                          letterSpacing: '0.4px',
                          lineHeight: 1.66,
                          textAlign: 'right',
                        }}
                      >
                        {formatTimestamp(new Date())}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          mb: '8px',
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            position: 'relative',
                          }}
                        >
                          <PurpleLogo size={24} id="purpleGradMessage" />
                        </Box>
                      </Box>
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 14,
                          fontWeight: 400,
                          color: '#ffffff',
                          letterSpacing: '0.17px',
                          lineHeight: 1.43,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {message.content.split('```json').map((part, idx) => {
                          if (part.includes('```')) {
                            const [jsonPart, rest] = part.split('```')
                            try {
                              const parsed = JSON.parse(jsonPart.trim())
                              return (
                                <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                  <Typography
                                    component="pre"
                                    sx={{
                                      fontFamily: 'monospace',
                                      fontSize: 12,
                                      backgroundColor: '#1e1c26',
                                      padding: 2,
                                      borderRadius: '4px',
                                      overflow: 'auto',
                                      color: '#ffffff',
                                      whiteSpace: 'pre-wrap',
                                    }}
                                  >
                                    {JSON.stringify(parsed, null, 2)}
                                  </Typography>
                                  {rest && <Typography component="span">{rest}</Typography>}
                                </Box>
                              )
                            } catch {
                              return <span key={idx}>{part}</span>
                            }
                          }
                          return <span key={idx}>{part}</span>
                        })}
                      </Typography>
                      
                      {/* Phase 1: Goal Selection Buttons */}
                      {flowStep === 'phase1_goal' && message.content.includes('What\'s your goal?') && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', mt: 2, width: '100%' }}>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                            {(['PCF', 'CCF'] as const).map((goalType) => (
                              <Button
                                key={goalType}
                                variant="outlined"
                                onClick={() => handleGoalSelect(goalType)}
                                sx={{
                                  borderColor: '#44c571',
                                  color: '#44c571',
                                  fontFamily: 'Roboto, sans-serif',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  letterSpacing: '0.4px',
                                  lineHeight: '24px',
                                  px: 2,
                                  py: '6px',
                                  borderRadius: '4px',
                                  textTransform: 'none',
                                  '&:hover': {
                                    borderColor: '#44c571',
                                    backgroundColor: 'rgba(68, 197, 113, 0.1)',
                                  },
                                }}
                              >
                                {goalType}
                              </Button>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Phase 1: File Upload Interface */}
                      {flowStep === 'phase1_file_upload' && message.content.includes('Please upload your raw dataset file') && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".csv,.xlsx,.xls,.txt,.json"
                          />
                          <Button
                            variant="outlined"
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                              borderColor: '#44c571',
                              color: '#44c571',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              alignSelf: 'flex-start',
                              '&:hover': {
                                borderColor: '#44c571',
                                backgroundColor: 'rgba(68, 197, 113, 0.1)',
                              },
                            }}
                          >
                            📎 Upload Dataset File
                          </Button>
                          <Typography
                            sx={{
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 12,
                              fontWeight: 400,
                              color: '#73696d',
                              letterSpacing: '0.4px',
                              lineHeight: 1.5,
                              mt: 0.5,
                            }}
                          >
                            Supported formats: CSV, Excel (.xlsx, .xls), JSON, TXT
                            <br />
                            <span style={{ fontStyle: 'italic' }}>Or describe your data structure in the text input below</span>
                          </Typography>
                        </Box>
                      )}

                      {/* Phase 1: Schema Confirmation Buttons */}
                      {flowStep === 'phase1_schema_review' && message.content.includes('Does this schema look correct?') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="outlined"
                            onClick={() => handleSchemaConfirm(true)}
                            sx={{
                              borderColor: '#44c571',
                              color: '#44c571',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#44c571',
                                backgroundColor: 'rgba(68, 197, 113, 0.1)',
                              },
                            }}
                          >
                            Yes, looks correct
                          </Button>
                        </Box>
                      )}

                      {/* Phase 1: Proceed to Phase 2 Button */}
                      {flowStep === 'phase1_cleaning_confirmation' && message.content.includes('Ready to proceed to Phase 2') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="contained"
                            onClick={() => handlePhase2Start()}
                            sx={{
                              backgroundColor: '#44c571',
                              color: '#ffffff',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#3db362',
                              },
                            }}
                          >
                            Proceed to Phase 2
                          </Button>
                        </Box>
                      )}

                      {/* Phase 2: Mapping Confirmation Buttons */}
                      {flowStep === 'phase2_mapping_review' && message.content.includes('Please confirm or correct') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="outlined"
                            onClick={() => handleMappingConfirm(true)}
                            sx={{
                              borderColor: '#44c571',
                              color: '#44c571',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#44c571',
                                backgroundColor: 'rgba(68, 197, 113, 0.1)',
                              },
                            }}
                          >
                            Mapping looks good
                          </Button>
                        </Box>
                      )}

                      {/* Phase 2: Standardisation Confirmation */}
                      {flowStep === 'phase2_standardisation_confirmation' && message.content.includes('Are you happy with the standardisation?') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="contained"
                            onClick={() => handlePhase3_1Start()}
                            sx={{
                              backgroundColor: '#44c571',
                              color: '#ffffff',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#3db362',
                              },
                            }}
                          >
                            Yes, proceed to Phase 3
                          </Button>
                        </Box>
                      )}

                      {/* Phase 3.1: Grouping Confirmation */}
                      {flowStep === 'phase3_1_grouping_review' && message.content.includes('Does this grouping make sense?') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="outlined"
                            onClick={() => handleGroupingConfirm(true)}
                            sx={{
                              borderColor: '#44c571',
                              color: '#44c571',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#44c571',
                                backgroundColor: 'rgba(68, 197, 113, 0.1)',
                              },
                            }}
                          >
                            Grouping looks good
                          </Button>
                        </Box>
                      )}

                      {/* Phase 3.1: Proceed to 3.2 */}
                      {flowStep === 'phase3_1_grouping_confirmation' && message.content.includes('Ready to proceed to Phase 3.2') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="contained"
                            onClick={() => handlePhase3_2Start()}
                            sx={{
                              backgroundColor: '#44c571',
                              color: '#ffffff',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#3db362',
                              },
                            }}
                          >
                            Proceed to EF Matching
                          </Button>
                        </Box>
                      )}

                      {/* Phase 3.2: EF Confirmation */}
                      {flowStep === 'phase3_2_ef_review' && message.content.includes('Do you accept these EF selections?') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="outlined"
                            onClick={() => handleEfConfirm(true)}
                            sx={{
                              borderColor: '#44c571',
                              color: '#44c571',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#44c571',
                                backgroundColor: 'rgba(68, 197, 113, 0.1)',
                              },
                            }}
                          >
                            Accept EF selections
                          </Button>
                        </Box>
                      )}

                      {/* Phase 3.2: Proceed to 3.3 */}
                      {flowStep === 'phase3_2_ef_confirmation' && message.content.includes('Ready to proceed to Phase 3.3') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="contained"
                            onClick={() => handlePhase3_3Start()}
                            sx={{
                              backgroundColor: '#44c571',
                              color: '#ffffff',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#3db362',
                              },
                            }}
                          >
                            Proceed to Finalisation
                          </Button>
                        </Box>
                      )}

                      {/* Phase 3.3: Final Confirmation */}
                      {flowStep === 'phase3_3_finalisation' && message.content.includes('Do you want me to consider these activities as ready') && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', mt: 2, width: '100%' }}>
                          <Button
                            variant="contained"
                            onClick={() => handleFinalConfirm(true)}
                            sx={{
                              backgroundColor: '#44c571',
                              color: '#ffffff',
                              fontFamily: 'Roboto, sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              letterSpacing: '0.4px',
                              lineHeight: '24px',
                              px: 2,
                              py: '6px',
                              borderRadius: '4px',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#3db362',
                              },
                            }}
                          >
                            Yes, mark as ready
                          </Button>
                        </Box>
                      )}
                      {false && index === messages.length - 1 && message.role === 'assistant' && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '134px' }}>
                          <Box
                            onClick={() => {
                              setSelectedMessageId(message.id)
                              setDialogType('thought')
                              setDialogOpen(true)
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8,
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              🧠
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              Thought
                            </Typography>
                            <ChevronRight sx={{ fontSize: 20, color: '#73696d' }} />
                          </Box>
                          <Box
                            onClick={() => {
                              setSelectedMessageId(message.id)
                              setDialogType('sources')
                              setDialogOpen(true)
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8,
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              🔎
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              {message.sources?.length || 66} sources
                            </Typography>
                            <ChevronRight sx={{ fontSize: 20, color: '#73696d' }} />
                          </Box>
                          <Box
                            onClick={() => {
                              setSelectedMessageId(message.id)
                              setDialogType('methodology')
                              setDialogOpen(true)
                            }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8,
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 400,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              ⚙
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#73696d',
                                letterSpacing: '0.17px',
                                lineHeight: 1.43,
                              }}
                            >
                              Methodology
                            </Typography>
                            <ChevronRight sx={{ fontSize: 20, color: '#73696d' }} />
                          </Box>
                        </Box>
                      )}
                      <Typography
                        sx={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 12,
                          fontWeight: 400,
                          color: '#73696d',
                          letterSpacing: '0.4px',
                          lineHeight: 1.66,
                        }}
                      >
                        {formatTimestamp(new Date())}
                      </Typography>
                      {index === messages.length - 1 && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleCopyMessage(message.content)}
                            sx={{
                              width: 16,
                              height: 16,
                              color: '#73696d',
                              p: 0,
                              '&:hover': {
                                color: '#b6bab1',
                              },
                            }}
                          >
                            <ContentCopy sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: '#73696d',
                              p: 0,
                              '&:hover': {
                                color: '#b6bab1',
                              },
                            }}
                          >
                            <ThumbUp sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              width: 16,
                              height: 16,
                              color: '#73696d',
                              p: 0,
                              '&:hover': {
                                color: '#b6bab1',
                              },
                            }}
                          >
                            <ThumbDown sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleRegenerate}
                            disabled={isLoading}
                            sx={{
                              width: 16,
                              height: 16,
                              color: '#73696d',
                              p: 0,
                              '&:hover': {
                                color: '#b6bab1',
                              },
                            }}
                          >
                            <Refresh sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ))}
              {isLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <PurpleLogo size={24} id="purpleGradSuggestion" />
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#73696d',
                      letterSpacing: '0.17px',
                      lineHeight: 1.43,
                    }}
                  >
                    Thinking...
                  </Typography>
                </Box>
              )}
              {error && (
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '4px',
                    px: 1.25,
                    py: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#ff6b6b',
                      letterSpacing: '0.17px',
                      lineHeight: 1.43,
                    }}
                  >
                    Error: {error.message || 'Failed to get response'}
                  </Typography>
                  <Button
                    onClick={() => reload()}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      color: '#ff6b6b',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 12,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      },
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>
          )}

          {/* Suggestions after messages - Hidden */}
          {false && hasMessages && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#b6bab1',
                    letterSpacing: '0.17px',
                    lineHeight: 1.43,
                  }}
                >
                  Suggestions
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 13,
                      fontWeight: 400,
                      color: '#73696d',
                      letterSpacing: '0.46px',
                      lineHeight: '22px',
                    }}
                  >
                    Not interested?{' '}
                  </Typography>
                  <Typography
                    component="span"
                    onClick={handleRefreshSuggestions}
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 13,
                      fontWeight: 500,
                      color: '#73696d',
                      letterSpacing: '0.46px',
                      lineHeight: '22px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#b6bab1',
                      },
                    }}
                  >
                    Try new suggestions
                  </Typography>
                </Box>
              </Box>
              <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleSuggestionClick(suggestion)}
                    fullWidth={index > 0}
                    sx={{
                      borderColor: '#d2d7cb',
                      color: '#d2d7cb',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: '0.4px',
                      lineHeight: '24px',
                      px: 2,
                      py: '6px',
                      borderRadius: '4px',
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      '&:hover': {
                        borderColor: '#d2d7cb',
                        backgroundColor: 'rgba(210, 215, 203, 0.1)',
                      },
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        {/* Attached Files */}
        {attachedFiles.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              px: 1,
              pb: 0.5,
            }}
          >
            {attachedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#2b2733',
                  borderRadius: '4px',
                  px: 1,
                  py: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 12,
                    color: '#b6bab1',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  sx={{
                    width: 20,
                    height: 20,
                    color: '#73696d',
                    ml: 1,
                  }}
                >
                  <Close sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Input Container */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: '#17161D',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'auto',
            px: '17px',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls,.txt,.json"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {messagesLeft > 0 && (
              <Box
                sx={{
                  backgroundColor: '#1e1c26',
                  borderRadius: '12px 12px 0 0',
                  px: '8px',
                  py: '6px',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#73696d',
                    letterSpacing: '0.4px',
                    lineHeight: 1.66,
                    textAlign: 'center',
                  }}
                >
                  {messagesLeft} messages left
                </Typography>
              </Box>
            )}
            <TextField
              inputRef={inputRef}
              placeholder="Type your question here"
              value={input}
              onChange={handleInputChange}
              onFocus={(e) => {
                e.stopPropagation()
              }}
              onBlur={(e) => {
                e.stopPropagation()
              }}
              disabled={isLoading}
              fullWidth
              variant="outlined"
              autoFocus
              multiline={false}
              name="message"
              InputProps={{
                startAdornment: (
                  <IconButton
                    size="small"
                    onClick={handleFileAttach}
                    disabled={isLoading}
                    sx={{
                      mr: 0,
                      pr: '8px',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      '&:disabled': {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <AttachFile sx={{ fontSize: 24 }} />
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    type="button"
                    disabled={isLoading || !input?.trim()}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (!isLoading && input.trim()) {
                        handleSubmit(e as any)
                      }
                    }}
                    sx={{
                      ml: 1,
                      p: '4px',
                      color: '#ffffff',
                      cursor: isLoading || !input?.trim() ? 'not-allowed' : 'pointer',
                      pointerEvents: 'auto !important',
                      zIndex: 10,
                      position: 'relative',
                      '&:hover:not(:disabled)': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                    ) : (
                      <Send
                        sx={{
                          fontSize: 24,
                          color: '#ffffff',
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault()
                  e.stopPropagation()
                  if (input.trim()) {
                    handleSubmit(e as any)
                  }
                }
              }}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderColor: '#554b55',
                  borderRadius: messagesLeft > 0 ? '0 0 4px 4px' : '4px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: 16,
                  fontWeight: 400,
                  letterSpacing: '0.15px',
                  lineHeight: '24px',
                  height: '40px',
                  minHeight: '40px',
                  maxHeight: '40px',
                  py: '8px',
                  px: '12px',
                  '& fieldset': {
                    borderColor: '#554b55',
                  },
                  '&:hover fieldset': {
                    borderColor: '#554b55',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#554b55',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.6,
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff !important',
                  WebkitTextFillColor: '#ffffff !important',
                  '&::placeholder': {
                    color: '#b6bab1',
                    opacity: 1,
                  },
                },
                '& input': {
                  color: '#ffffff !important',
                  WebkitTextFillColor: '#ffffff !important',
                },
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              color: '#73696d',
              letterSpacing: '0.4px',
              lineHeight: 1.66,
              textAlign: 'center',
            }}
          >
            AI can make mistakes. Always check information
          </Typography>
        </Box>
      </Box>

      {/* Dialog for Thought/Sources/Methodology */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e1c26',
            color: '#ffffff',
            border: '1px solid #2b2733',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: 18,
            fontWeight: 500,
            color: '#ffffff',
            borderBottom: '1px solid #2b2733',
            pb: 2,
          }}
        >
          {dialogType === 'thought' && '🧠 Thought Process'}
          {dialogType === 'sources' && '🔎 Sources'}
          {dialogType === 'methodology' && '⚙ Methodology'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {(() => {
            const selectedMessage = messages.find((m) => m.id === selectedMessageId)
            if (!selectedMessage) return null

            if (dialogType === 'thought') {
              return (
                <Typography
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#b6bab1',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selectedMessage.thought || 
                    'The AI analyzed your question about creating a footprint and considered various approaches to help you understand the process. It evaluated different methodologies for carbon footprint calculation and selected the most appropriate guidance based on your needs.'}
                </Typography>
              )
            }

            if (dialogType === 'sources') {
              const sources = selectedMessage.sources || [
                'Carbon Trust - Footprint Calculation Guide',
                'GHG Protocol Corporate Standard',
                'ISO 14064-1:2018 Standard',
                'EPA Carbon Footprint Calculator',
                'IPCC Guidelines for National Greenhouse Gas Inventories',
              ]
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {sources.map((source, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 2,
                        backgroundColor: '#17161D',
                        borderRadius: '8px',
                        border: '1px solid #2b2733',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#ffffff',
                          mb: 0.5,
                        }}
                      >
                        Source {idx + 1}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 13,
                          fontWeight: 400,
                          color: '#b6bab1',
                        }}
                      >
                        {typeof source === 'string' ? source : source}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )
            }

            if (dialogType === 'methodology') {
              return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#ffffff',
                      mb: 1,
                    }}
                  >
                    Calculation Approach
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#b6bab1',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedMessage.methodology || 
                      `The carbon footprint calculation follows the GHG Protocol methodology, which includes:

1. Scope 1: Direct emissions from owned or controlled sources
2. Scope 2: Indirect emissions from purchased energy
3. Scope 3: All other indirect emissions in the value chain

The calculation uses activity data multiplied by emission factors, following the formula:
Emissions = Activity Data × Emission Factor

All calculations are based on the latest IPCC guidelines and verified against ISO 14064-1 standards.`}
                  </Typography>
                </Box>
              )
            }

            return null
          })()}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #2b2733', p: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              color: '#ffffff',
              fontFamily: 'Roboto, sans-serif',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
