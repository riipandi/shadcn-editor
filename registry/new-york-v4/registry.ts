import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

import { blocks } from "./blocks/_registry"
import { examples } from "./examples/_registry"
import { ui } from "./editor/_registry"


export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: z.array(registryItemSchema).parse(
    [
      ...ui,
      ...blocks,
      ...examples,
    ]
  ),
} satisfies Registry
