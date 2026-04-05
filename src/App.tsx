import { BlockViewerProvider } from "./components/block-viewer"
import { BlockViewerSidebar } from "./components/block-viewer-sidebar"
import { BlockViewerToolbar } from "./components/block-viewer-toolbar"
import { Editor } from "./components/blocks/editor-x"
import CODE_SAMPLE from "./components/blocks/editor-x.tsx?raw"
import { CodeViewer } from "./components/code-viewer"
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar"
import { useSearchParams } from "./hooks/use-search-params"

export function App() {
  const [params] = useSearchParams({ view: "preview" })
  const view = params.view as "preview" | "code"

  return (
    <BlockViewerProvider>
      <SidebarProvider defaultOpen={true}>
        <BlockViewerSidebar />
        <SidebarInset>
          <div className="flex flex-col gap-2 min-h-svh py-2 pl-1 pr-2 md:w-[calc(100vw-260px)]">
            <BlockViewerToolbar />
            {view === "preview" ? (
              <Editor />
            ) : (
              <CodeViewer code={CODE_SAMPLE} filename="editor-x.tsx" />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BlockViewerProvider>
  )
}

export default App
