import { CodeEditor } from "@/components/code-editor";
import { Label } from "@/components/ui/label";

const tableCodeMirror = `
import { flexRender, type Table as TanStackTTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { PaginationTable } from "./pagination-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface IDynamicTableProps<TData> {
    table: TanStackTTable<TData>
}

export const DynamicTable = <TData,>({ table }: IDynamicTableProps<TData>) => {

    return (
        <div className="w-full">
            <div className="grid w-full [&>div]:max-h-[calc(100vh-260px)] [&>div]:border [&>div]:rounded">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="*:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0">
                                <TableHead>
                                    No
                                </TableHead>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex items-center gap-1'
                                                            : ''
                                                    }
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    title={
                                                        header.column.getCanSort()
                                                            ? header.column.getNextSortingOrder() === 'asc'
                                                                ? 'Sort ascending'
                                                                : header.column.getNextSortingOrder() === 'desc'
                                                                    ? 'Sort descending'
                                                                    : 'Clear sort'
                                                            : undefined
                                                    }
                                                >
                                                    {header.column.getIsVisible() && flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: <ArrowDown size={16} />,
                                                        desc: <ArrowUp size={16} />,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-hidden">
                        {table.getRowModel().rows.map((row) => {
                            const pageIndex = table.getState().pagination?.pageIndex ?? 0;
                            const pageSize = table.getState().pagination?.pageSize ?? row.index + 1;

                            return <TableRow key={row.id} className="odd:bg-muted/50 *:whitespace-nowrap">
                                <TableCell >
                                    {pageIndex * pageSize + row.index + 1}
                                </TableCell>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-[25px] ml-auto">
                <PaginationTable table={table} />
            </div>
        </div>

    )
}

`
const example = `
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
`

export default function TableDynamicPage() {
  return <div className="h-full">
    <div className="grid grid-cols-2 gap-2">
      <div>
        <div className="">
          <Label>table-dynamic.tsx</Label>
        </div>
        <div className="mt-[20px]">
          <CodeEditor
            value={tableCodeMirror}
            height="86vh"
          />
        </div>
      </div>
      <div>
        <div className="">
          <Label>example.tsx</Label>
        </div>
        <div className="mt-[20px]">
          <CodeEditor
            value={example}
            height="86vh"
          />
        </div>
      </div>
    </div>
  </div>
}
