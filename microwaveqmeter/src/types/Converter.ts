export type GetConverterResultRequest = {
    UnloadedCenterFrequency: string;
    UnloadedQ: string;
    CenterFrequency: string;
    H: string;
    QFactor: string;
    ResonatorType: string;
    ResonatorName: string;
} 

export type ConverterResult = {
    H: string,
    Permittivity: string,
    DielectricLossTangent: string,
    Resistivity: string,
    SheetRessistance: string, 
}

export type SinglePostResult = {
    H: string,
    Resistivity: string,
    SheetRessistance: string,
}

export type SplitPostResult = {
    H: string,
    Permittivity: string,
    DielectricLossTangent: string,
    Resistivity: string,
    SheetRessistance: string,
}