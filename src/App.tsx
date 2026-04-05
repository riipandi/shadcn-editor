import { useMemo } from "react";

import { BlockViewerProvider, useBlockViewer } from "./components/block-viewer-provider";
import { BlockViewerSidebar } from "./components/block-viewer-sidebar";
import { BlockViewerToolbar } from "./components/block-viewer-toolbar";
import { Editor } from "./components/blocks/editor-x";
import { CodeViewer } from "./components/code-viewer";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { useSearchParams } from "./hooks/use-search-params";
import { generateEditorCode } from "./lib/generate-editor-code";

function GeneratedCodeViewer() {
  const state = useBlockViewer();
  const code = useMemo(() => generateEditorCode(state), [state]);
  return <CodeViewer code={code} filename="editor-x.tsx" />;
}

export function App() {
  const [params] = useSearchParams({ view: "preview" });
  const view = params.view as "preview" | "code";

  return (
    <BlockViewerProvider>
      <SidebarProvider
        defaultOpen={true}
        className="bg-background text-foreground"
      >
        <BlockViewerSidebar />
        <SidebarInset>
          <div className="flex flex-col gap-2 min-h-svh py-2 pr-1 md:w-[calc(100vw-260px)]">
            <BlockViewerToolbar />
            {view === "preview" ? (
              <Editor />
            ) : (
              <GeneratedCodeViewer />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BlockViewerProvider>
  );
}

export default App;
