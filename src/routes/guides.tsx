import { guides } from "@/data/guides"
import { GuideCard } from "@/components/GuideCard"

export default function GuidesPage() {
  return (
    <div className="p-4 space-y-4">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  )
}
