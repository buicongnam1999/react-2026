import { BadgeCheck, Bell, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Navbar from './navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'


export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <Button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer bg-white text-black"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </Button>
        <div className="relative cursor-pointer ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="size-2 ring-2 ring-background rounded-full bg-green-500 absolute bottom-0 right-0"></div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Bc Nam</span>
                    <span className="truncate text-xs">buicongnam1999@gmail.com</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <Button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer bg-white text-black"
            aria-label="Close menu"
          >
            <X size={30} />
          </Button>
        </div>
        <Navbar />
      </aside>
    </div>
  )
}
