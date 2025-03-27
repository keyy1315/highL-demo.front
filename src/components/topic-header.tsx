import { Badge } from "@/components/ui/badge";

interface TopicHeaderProps {
    topicName: string;

}

export default function TopicHeader({ topicName }: TopicHeaderProps) {
    const topics = [{
        id: "1",
        name: "Mastery",
      },
      {
        id: "2",
        name: "Issues",
      },
      {
        id: "3",
        name: "Am I Wrong?",
      }];
    
    return (
        <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
                {topics.find(topic => topic.id === topicName)?.name}
            </h1>
        </div>
    )
}
