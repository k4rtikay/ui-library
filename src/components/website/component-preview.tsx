import { ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ComponentPreviewProps {
  children: ReactNode
  className?: string
}

export default function ComponentPreview({
  children,
  className = "",
}: ComponentPreviewProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList
          variant="line"
          className="w-full justify-start border-b bg-transparent px-0">
            <div className="flex items-center gap-2">
              <TabsTrigger
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
              >
                Code
              </TabsTrigger>
            </div>
          </TabsList>
        </div>
        <div className="relative not-prose rounded-lg p-10 border">
          {children}
          </div>
      </Tabs>
    </div>
  )
}