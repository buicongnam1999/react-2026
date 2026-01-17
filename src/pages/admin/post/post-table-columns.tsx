import type { Post } from '@/models/admin/post.model'
import {
  createColumnHelper
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<Post>()

export const postColumns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    meta: {
      label: "ID",
    }
  }),
  columnHelper.accessor('title', {
    header: () => 'Title',
    cell: (info) => info.renderValue(),
    sortUndefined: 'last',
    sortDescFirst: false,
    footer: (info) => info.column.id,
    filterFn: "includesString",
    meta: {
      label: "Title",
    }
  }),
  columnHelper.accessor('body', {
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    meta: {
      label: "Body",
    }
  }),
]