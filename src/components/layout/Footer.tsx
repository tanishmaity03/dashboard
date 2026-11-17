import { TextLink } from "../ui/TextLink";
import { REPO_URL } from "../../lib/config";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-120 px-2 pb-4 sm:px-4">
      <p className="text-[13px] text-faint">
        Precomputed results on the held-out test period, not live data. Source:{" "}
        <TextLink href={REPO_URL}>the project repository</TextLink>.
      </p>
    </footer>
  );
}
