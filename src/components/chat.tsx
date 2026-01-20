import { MessageCircleMore } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Chat() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="fixed bottom-20 right-6 z-50 rounded-full h-12 w-12 p-0 bg-sky-600 hover:bg-sky-700 [&_svg:not([class*='size-'])]:size-6"
                    type="button"
                >
                    <MessageCircleMore className="w-8 h-8" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <iframe
                    src="https://www.anthropic.com/"
                    className="w-full h-full border rounded-md"
                />
            </SheetContent>
        </Sheet>
    )
}
