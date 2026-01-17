import { DynamicTable as PostTable } from "@/components/dynamic-table"
import Loading from "@/components/loading"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { PAGE_SIZE_10 } from "@/enum/search.enum"
import { useQueryPost } from "@/hooks/usePosts"
import { useTable } from "@/hooks/useTable"
import type { Post, PostSearch } from "@/models/admin/post.model"
import { CirclePlus, Settings2 } from "lucide-react"
import { useState } from "react"
import { postColumns } from "./post-table-columns"

export default function PostPage() {
  const [search, _setSearch] = useState<PostSearch>({
    pageIndex: 0,
    pageSize: PAGE_SIZE_10,
    title: ""
  })
  const { data, isLoading, error } = useQueryPost(search)
  const table = useTable<Post>({ data: data ?? [], columns: postColumns })

  if (isLoading) return <Loading />

  if (error instanceof Error) return <div>{error.message}</div>

  return (
    <div>
      <h1>List Posts</h1>
      <div className="flex justify-between w-full mt-[10px]">
        <div className="flex">
          <Input type="text"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            placeholder="Filter title..."
            onChange={e =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button">
                <Settings2 size={18} /> View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) rounded-lg min-w-40"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="font-normal font-semibold">
                Toggle columns
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllLeafColumns().map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(checked) =>
                    column.toggleVisibility(!!checked)
                  }
                  className="cursor-pointer py-2 font-normal"
                >
                  {column.columnDef.meta?.label ?? column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button type="button">
            <CirclePlus size={18} /> Add Post
          </Button>
        </div>
      </div>
      <div className="mt-[20px]">
      </div>
      <PostTable table={table} />
    </div>
  )
}
