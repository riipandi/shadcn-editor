"use client"

import { ImageIcon } from "lucide-react"

import { useToolbarContext } from "@/registry/new-york-v4/editor/context/toolbar-context"
import { InsertImageDialog } from "@/registry/new-york-v4/editor/plugins/images-plugin"
import { DropdownMenuItem } from "@/registry/new-york-v4/ui/dropdown-menu"

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext()

  return (
    <DropdownMenuItem
      onClick={() => {
        showModal("Insert Image", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }}
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="size-4" />
        <span>Image</span>
      </div>
    </DropdownMenuItem>
  )
}
