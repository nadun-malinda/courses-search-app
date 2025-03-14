import { Card, CardContent } from "../ui/card";

export function EmptyResult({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <Card className="border-dashed bg-muted/30">
      <CardContent className="pt-6 text-center">
        <p className="text-muted-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </CardContent>
    </Card>
  );
}
