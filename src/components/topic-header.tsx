import { topics } from "@/types/topics";

interface TopicHeaderProps {
    topicName: string;

}

export default function TopicHeader({ topicName }: TopicHeaderProps) {
  
    return (
        <div className="space-y-2 mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
                {topics.find(topic => topic.id === topicName)?.name}
            </h1>
        </div>
    )
}
