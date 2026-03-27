"use client"

import { PlusIcon } from "lucide-react"

import { useEditorModal } from "@/registry/new-york-v4/editor/editor-hooks/use-modal"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal()

  return (
    <>
      {modal}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1 px-2">
            <PlusIcon className="size-4" />
            <span className="text-sm">Insert</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
