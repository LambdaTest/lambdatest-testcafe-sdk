import { t as TestCafe } from "testcafe"

export default function smartuiSnapshot(
  t: typeof TestCafe,
  snapshotName: string,
): Promise<void>