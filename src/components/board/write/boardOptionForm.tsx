import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";

export default function BoardSideForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Publishing Options
          </CardTitle>
          <CardDescription>Control how your video is published</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="comments">Comments</Label>
              <p className="text-xs text-muted-foreground">
                Allow viewers to comment
              </p>
            </div>
            <Switch id="comments" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify">Notify Subscribers</Label>
              <p className="text-xs text-muted-foreground">
                Send notification to subscribers
              </p>
            </div>
            <Switch id="notify" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Content Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Before you publish, please ensure your content follows our community
            guidelines:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>No copyright infringement</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>No harmful or dangerous content</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>Respect privacy and consent</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <span>No harassment or cyberbullying</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
