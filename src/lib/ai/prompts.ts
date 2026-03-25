import { getLawReference } from './laws/index';

export function getRightsBriefingPrompt(params: {
  country_code: string;
  industry: string;
  issue_category: string;
  locale: string;
}): string {
  const { country_code, industry, issue_category, locale } = params;
  const law = getLawReference(country_code, industry);

  const lawContext = law
    ? `
Verified legal reference — use these exact details and do not invent alternatives:
- Law: ${law.primary_law} (${law.statute_number}, effective ${law.effective_date})
- Regulator: ${law.regulator_name} — ${law.regulator_url}${law.regulator_complaint_url ? `\n- Complaint portal: ${law.regulator_complaint_url}` : ''}
- Rights to convey (plain language): ${law.plain_rights.join(' | ')}
- Company obligations: ${law.plain_obligations.join(' | ')}
- Escalation steps: ${law.plain_escalation.join(' | ')}`
    : '';

  return `You are a consumer rights advocate helping an everyday person understand their rights — NOT a lawyer writing for other lawyers.

Generate a rights briefing for a consumer in ${country_code} with a "${issue_category}" issue in the "${industry}" sector. Write in the language for locale "${locale}".
${lawContext}

## OUTPUT FORMAT — follow this structure exactly:

### What this means for you
[2–3 sentences in plain, everyday language explaining what the law means for their specific situation. Write as if explaining to a trusted friend. No legal jargon.]

### Your rights
[3–5 bullet points. Start each with "You have the right to..." or "You can...". One sentence each. No statute references in this section.]

### What the company must do
[2–4 bullet points on company obligations. Include specific timeframes and amounts where they exist in the law. Plain language only.]

### If they don't respond
[2–3 clear steps for escalation. Name the regulator and explain how to reach them. Plain language.]

---
### Legal reference *(for reference)*
[1–2 sentences citing the exact law name and statute number. Keep brief. This is the ONLY section that may include formal legal citations.]

Rules:
- Plain language throughout the main body — a 16-year-old should understand it without a dictionary
- Never use: "pursuant to", "notwithstanding", "inter alia", "ipso facto", "hereinafter", or similar legalese in the main body
- Use specific timeframes, amounts, and deadlines where they exist in the law
- The legal reference section is the ONLY place for statute numbers and formal law names
- If no verified law reference was provided above, use your best knowledge but note that users should verify current laws`;
}

export function getComplaintDraftPrompt(params: {
  company_name: string;
  issue_category: string;
  issue_subcategory: string | null;
  what_happened: string;
  when_occurred: string | null;
  amount_involved: number | null;
  currency_code: string;
  desired_outcome: string;
  rights_text: string | null;
  locale: string;
}): string {
  const {
    company_name,
    issue_category,
    issue_subcategory,
    what_happened,
    when_occurred,
    amount_involved,
    currency_code,
    desired_outcome,
    rights_text,
    locale,
  } = params;

  let context = `Company: ${company_name}
Issue: ${issue_category}${issue_subcategory ? ` - ${issue_subcategory}` : ''}
What happened: ${what_happened}`;

  if (when_occurred) context += `\nWhen: ${when_occurred}`;
  if (amount_involved) context += `\nAmount: ${currency_code} ${amount_involved.toLocaleString()}`;
  context += `\nDesired outcome: ${desired_outcome}`;
  if (rights_text) context += `\n\nRelevant consumer rights:\n${rights_text}`;

  return `You are a consumer advocacy assistant. Write a formal complaint letter based on the following details. The letter should be written in the language corresponding to locale "${locale}".

${context}

Requirements:
1. Be firm but polite and professional
2. Clearly state the problem, when it occurred, and the impact
3. Reference specific consumer protection laws if rights information is provided
4. State the desired resolution clearly with a reasonable deadline (14 business days)
5. Mention escalation to the relevant regulator if the issue is not resolved
6. Include a closing that requests written confirmation of receipt

Do NOT include placeholder brackets like [Your Name] - the user will add their details separately. Start the letter with "Dear Customer Service" or equivalent.`;
}

export function getLawMonitoringPrompt(params: {
  country_code: string;
  law_name: string;
  statute_number: string;
  last_verified_date: string;
}): string {
  const { country_code, law_name, statute_number, last_verified_date } = params;

  return `You are a legal research assistant. Check if the following consumer protection law has been amended or superseded since the date shown.

Law: ${law_name} (${statute_number})
Country: ${country_code}
Last verified: ${last_verified_date}

Search official government sources for any amendments, replacements, or new implementing regulations issued since ${last_verified_date}.

Respond ONLY with valid JSON matching this exact schema:
{
  "amended": boolean,
  "new_version": string | null,
  "effective_date": string | null,
  "key_changes": string | null,
  "confidence": "high" | "medium" | "low",
  "source_urls": string[]
}

- "amended": true if any change was found, false if the law appears unchanged
- "new_version": the new statute number or amendment name if changed, otherwise null
- "effective_date": ISO date (YYYY-MM-DD) when the change takes effect, otherwise null
- "key_changes": plain-language summary of what changed for consumers (1–3 sentences), otherwise null
- "confidence": how confident you are in this assessment based on the sources found
- "source_urls": list of official government URLs you found (empty array if none found)`;
}
