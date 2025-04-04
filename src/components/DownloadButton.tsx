import { Download, FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { downloadHierarchyData } from "@/utils/downloadUtils";

export function DownloadButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Download Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileJson className="mr-2 h-4 w-4" />
              <span>JSON Format</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => downloadHierarchyData('frontend', 'json')}>
                  Frontend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('backend', 'json')}>
                  Backend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('all', 'json')}>
                  Complete Data
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>CSV Format</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => downloadHierarchyData('frontend', 'csv')}>
                  Frontend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('backend', 'csv')}>
                  Backend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('all', 'csv')}>
                  Complete Data
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileText className="mr-2 h-4 w-4" />
              <span>PDF Format</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => downloadHierarchyData('frontend', 'pdf')}>
                  Frontend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('backend', 'pdf')}>
                  Backend Hierarchy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadHierarchyData('all', 'pdf')}>
                  Complete Data
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}