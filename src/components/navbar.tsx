import pages from "@/jsons/pages.json"
import { type PageNode } from "@/models/page.model"
import TreeItem from './ui/tree-item'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight } from "lucide-react"

const pagesData = pages as PageNode[]

export default function Navbar() {
    return (
        <nav className="flex-1 p-1 overflow-y-auto">
            {pagesData.map((item) => (
                <Collapsible defaultOpen className="pl-4 group/collapsible">
                    <CollapsibleTrigger className="w-full group flex items-center gap-2 py-2 cursor-pointer">
                        <ChevronRight className="h-4 w-4 group-data-[state=open]:rotate-90 transition-transform" />
                        <span className="flex items-center gap-2">
                            {item.name}
                        </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {item.children?.map((child) => (
                            <TreeItem key={child.name} name={child.name} children={child.children} link={child.link} />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </nav>
    )
}
