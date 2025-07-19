import StrongholdContent from "@/app/content/services/stronghold.mdx";

export default function Stronghold() {
  return (
    <div className="prose prose-lg text-xl max-w-none [&_.styled-button]:!text-2xl">
      <StrongholdContent />
    </div>
  );
}