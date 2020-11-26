import { Result } from './Result';

export type SavedResult = Result & {
    sampleName: string;
    h: string;
    permittivity: string;
    dielLossTangent: string;
    resistivity: string;
    sheetResistance: string;
}
