import { GetConverterResultRequest, ConverterResult} from '../types/Converter';

export const ConverterResultMapper = (response: any, body: GetConverterResultRequest): ConverterResult | null => {
    switch(body.ResonatorType) {
        case "Split-Post":
            return CreateSplitPostResult(response);
        case "Single-Post":
            return CreateSinglePostResult(response);
        default: 
            return null;            
    }
}

const CreateSplitPostResult = (response: any): ConverterResult  => ({
    H: response.h !== undefined ? response.h : '',
    Permittivity: response.permittivity !== undefined && response.permittivity !== null  ? response.permittivity : '',
    DielectricLossTangent: response.dielectricLossTangent !== undefined && response.dielectricLossTangent !== null ? response.dielectricLossTangent : '',
    Resistivity: response.resistivity !== undefined && response.resistivity !== null ? response.resistivity : '',
    SheetRessistance: response.sheetRessistance !== undefined && response.sheetRessistance !== null ? response.sheetRessistance : '',
});

const CreateSinglePostResult = (response: any): ConverterResult => ({
    H: response.h !== undefined ? response.h : '',
    Resistivity: response.resistivity !== undefined && response.resistivity !== null ? response.resistivity : '',
    SheetRessistance: response.sheetRessistance !== undefined && response.sheetRessistance !== null ? response.sheetRessistance : '',
    Permittivity: '',
    DielectricLossTangent: '',
})