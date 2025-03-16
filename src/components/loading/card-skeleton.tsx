import { PAGE_LIMIT } from "@/lib/contstants";
import { Card, CardContent, CardFooter } from "../ui/card";

export function CardSkeleton() {
  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <div className="space-y-4 nimate-pulse">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 md:w-[300px] mb-4"></div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
        {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
          <Card className="animate-pulse" key={index}>
            <CardContent className="min-h-[200px]">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </CardContent>
            <CardFooter className="py-4 bg-secondary/30 border-t border-border/40">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
