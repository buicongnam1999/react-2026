import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import type { PageNode } from "@/models/page.model";
import { Link } from "@tanstack/react-router";

interface ITreeItemProps {
    link: string | null;
    name: string;
    children?: PageNode[] | null;
}

export default function TreeItem({ name, children, link }: ITreeItemProps) {

    if (children) {
        return <Collapsible className="pl-4">
            <CollapsibleTrigger className="w-full group flex items-center gap-2 py-1">
                <ChevronRight className="h-4 w-4 group-data-[state=open]:rotate-90 transition-transform" />
                <span className="flex items-center gap-2">
                    {name}
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {children?.map((child) => (
                    <TreeItem key={child.name} name={name} children={children} link={link} />
                ))}
            </CollapsibleContent>
        </Collapsible>
    }

    return (
        <div className="flex items-center gap-2 pl-8">
            {
                link ? <Link
                    to={link}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-1 w-full"
                    activeProps={{
                        className:
                            'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                    }}>
                    <span className="font-medium">{name}</span>
                </Link> : <span className="mb-1">{name}</span>
            }
        </div>
    )
}
