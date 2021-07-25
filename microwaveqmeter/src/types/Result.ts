export type Result = {
    q: string;
    frequencyDifference: string;
    f0: string;
    bw: string;
    peak: string;
    points: string;
}

export type ResultBackend = {
    Q_factor: number;
    CenterFrequency: number;
    Bandwidth: number;
    PeakTransmittance: number;
    CenterFrequencyDifference: number;
    NumberOfPoints: number;
}