import { ReactNode } from 'react'

interface ComponentPreviewProps {
  children: ReactNode
  className?: string
}

export default function ComponentPreview({ 
  children, 
  className = '' 
}: ComponentPreviewProps) {
  return (
    <div className="my-6 not-prose rounded-lg border bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className={`flex min-h-[350px] items-center justify-center p-8 ${className}`}>
        {children}
      </div>
    </div>
  )
}