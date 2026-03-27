import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { blocks } from "@/registry/new-york-v4/blocks/_registry"
import { examples } from "@/registry/new-york-v4/examples/_registry"
import { ui } from "@/registry/new-york-v4/editor/_registry"

// Shared between index and style for backward compatibility.
// const NEW_YORK_V4_STYLE = {
//   type: "registry:style",
//   dependencies: ["class-variance-authority", "lucide-react"],
//   devDependencies: ["tw-animate-css"],
//   registryDependencies: ["utils"],
//   cssVars: {},
//   files: [],
// }

export const registry = {
  name: "shadcn/editor",
  homepage: "https://shadcn-editor.vercel.app",
  items: z.array(registryItemSchema).parse([...ui, ...blocks, ...examples]),
} satisfies Registry
