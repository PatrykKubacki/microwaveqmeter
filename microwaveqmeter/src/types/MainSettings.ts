export type MainSettings = {
    defaultResonatorType: DefaultResonatorType;
    automaticMeasurement: boolean;
    connection: Connection;
    calculation: Calculation;
} 

export enum DefaultResonatorType {
    singlePost = 'Single-Post',
    splitPost= 'Split-Post'
};

type Connection = {
    serialPort: SerialPort;
}

export enum SerialPort {
    com1 = 'COM1',
    auto = 'AUTO'
}

type Calculation = {
    measType: MeasType;
    algorithmSettings: AlgorithmSettings;
    noiseReduction: NoiseReduction;
}

export enum MeasType {
    s21 = '|S21| [dB]',
    power = 'Power [dBm]'
};

type AlgorithmSettings = {
    algorithm: Algorithm;
    unloadedQCorrection: boolean;
}

export enum Algorithm {
    db3Bandwidth = '3-dB Bandwidth',
    leastSquaresFit = 'Least Squares Fit'
};

type NoiseReduction = {
    oversampling: string;
    averaging: string;
}