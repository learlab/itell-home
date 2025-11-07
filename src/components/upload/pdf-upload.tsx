'use client'

import { FormEvent, useRef, useState, useTransition, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  SectionShell,
  SectionHeader,
  SectionHeading,
  SectionDescription,
} from '@/components/section-shell'
import { Button } from '@/components/ui/button'
import { uploadPdfToApi } from '@/features/upload/request'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function PdfUpload() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!file.type.includes('pdf')) {
      return 'Please select a PDF file'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 10MB'
    }
    return null
  }

  const handleFileSelect = (file: File) => {
    const error = validateFile(file)
    if (error) {
      toast.error(error)
      return
    }
    setSelectedFile(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast.error('Please select a PDF file')
      return
    }

    startTransition(async () => {
      try {
        const response = await uploadPdfToApi(selectedFile)

        // Redirect to the debug page
        router.push(`/volumes/${response.document_id}`)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('Failed to upload PDF. Please try again.')
        }
      }
    })
  }

  return (
    <SectionShell className="bg-slate-50">
      <SectionHeader>
        <SectionHeading>Upload Your PDF</SectionHeading>
        <SectionDescription>
          Transform your PDF documents into interactive learning experiences
          with iTELL AI
        </SectionDescription>
      </SectionHeader>

      <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-2xl">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
            isDragOver
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          } `}
        >
          <Upload className="mx-auto size-12 text-gray-400" />
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">
              Drop your PDF here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-indigo-600 hover:text-indigo-500"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">PDF files up to 10MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="sr-only"
            disabled={pending}
          />
        </div>

        {selectedFile && (
          <div className="mt-4 flex items-center justify-between rounded-md bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded bg-indigo-100">
                <Upload className="size-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!pending && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button type="submit" disabled={pending || !selectedFile}>
            {pending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload PDF'
            )}
          </Button>
        </div>
      </form>
    </SectionShell>
  )
}
