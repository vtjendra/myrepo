import 'server-only';
import type { IndustryLaw, LawsMap } from './types';
import { ID } from './id';
import { MY } from './my';
import { PH } from './ph';
import { TH } from './th';
import { VN } from './vn';
import { SG } from './sg';
import { IN } from './in';

export type { IndustryLaw, LawsMap } from './types';

const LAWS: LawsMap = { ID, MY, PH, TH, VN, SG, IN };

export function getLawReference(country_code: string, industry: string): IndustryLaw | null {
  return LAWS[country_code.toUpperCase()]?.[industry] ?? null;
}
