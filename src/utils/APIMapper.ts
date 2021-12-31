export interface APIException {
    code: number;
    description: string;
    data?: any;
}

export function mapErrorBeer(code: number, error?: any, message?: string): APIException {
    let description: string = "";
    switch(code) {
        case 404: 
            description = "El Id de la cerveza no existe";
            break;
        case 409:
            description = "El ID de la cerveza ya existe";
            break;
        default:
            description = message ? message : "Request invalida";
            break;
    }
    const errorResponse = {
        code,
        description,
        data: error
    }
    console.error('It\'s an error', errorResponse);
    return errorResponse;
}