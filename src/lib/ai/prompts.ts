export function getRightsBriefingPrompt(params: {
  country_code: string;
  industry: string;
  issue_category: string;
  locale: string;
}): string {
  const { country_code, industry, issue_category, locale } = params;

  return `You are a consumer rights expert. Generate a concise rights briefing (300-500 words) for a consumer in country code "${country_code}" who has an issue in the "${industry}" industry, specifically about "${issue_category}".

The briefing should be written in the language corresponding to locale "${locale}" and include:
1. Relevant consumer protection laws (e.g., for Indonesia: UU No. 8/1999 tentang Perlindungan Konsumen)
2. The applicable regulator and how to contact them
3. What the company is legally obligated to do
4. The consumer's specific rights in this situation
5. Escalation options if the company doesn't respond

Be factual, specific, and empowering. Use simple language accessible to non-lawyers. Format with clear headings.`;
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
