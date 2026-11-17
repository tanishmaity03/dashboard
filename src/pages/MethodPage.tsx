import { Github } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CodeBlock } from "../components/ui/CodeBlock";
import { DataTable } from "../components/ui/DataTable";
import { TextLink } from "../components/ui/TextLink";
import { LIMITS, PIPELINE, VERIFY_STEPS, WARNING_SNIPPET } from "../constants/method";
import { useDash } from "../context/DashContext";
import { BRANCH, REPO_URL } from "../lib/config";

export default function MethodPage() {
  const d = useDash();
  const file = (p: string) => `${REPO_URL}/blob/${BRANCH}/${p}`;
  return (
    <div className="space-y-3">
      <Card title="How to check this project" hint="Every number on this dashboard comes from a CSV in results/. These steps rebuild them from the raw data."
        action={<Button icon={Github} href={REPO_URL}>Open the repository</Button>}>
        <CodeBlock>{VERIFY_STEPS}</CodeBlock>
      </Card>
      <Card title="Pipeline and where the code is" hint="Each stage is one file, so a result can be traced back to the code that produced it.">
        <DataTable columns={["Stage", "What it does", "Code"]} rows={PIPELINE.map((p) => [
          <span className="font-semibold">{p.stage}</span>, <span className="text-muted">{p.what}</span>,
          <span className="flex flex-col">{p.files.map((f) => <TextLink key={f.path} href={file(f.path)}>{f.label}</TextLink>)}</span>])} />
      </Card>
      <Card title="Warning logic" hint="The rule is short enough to read in full.">
        <CodeBlock>{WARNING_SNIPPET}</CodeBlock>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {["1", "24"].map((h) => {
          const b = d.best[h], params = b[b.best_model] as Record<string, unknown>;
          return (
            <Card key={h} title={`Selected model, ${h} h ahead`} hint={`${b.best_model} won cross-validation with ${b.cv_mae_pct[b.best_model].toFixed(2)}% mean error.`}>
              <DataTable columns={["Setting", "Value"]} rows={Object.entries(params).map(([k, v]) => [<span className="text-muted">{k}</span>, <span className="font-medium">{String(v)}</span>])} />
            </Card>
          );
        })}
      </div>
      <Card title="Limits to state honestly">
        <ul className="list-disc space-y-1 pl-2 text-[13px] text-muted">{LIMITS.map((l) => <li key={l}>{l}</li>)}</ul>
      </Card>
    </div>
  );
}
