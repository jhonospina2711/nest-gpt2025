import OpenAI from "openai";


interface Options {
    prompt: string;

}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
    messages: [
        {
            role: "system",
            content: `
                Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                Las palabras usadas deben de existir en el diccionario de la Real Academia de la lengua Española,
                Debes de responder en formato JSON, 
                tu tarea es corregirlos y retornar información soluciones, 
                también debes de dar un porcentaje de acierto por el usuario    
                Si no hay errores, debes de retornar un mensaje de felicitacion 
                Ejemplo de salida:
                {
                  userScore: number,
                  errors: string[], // ['error -> solución']
                  message: string, //  Usa emojis y texto para felicitar al usuario
                }    
            
            `
        },
        {
            role: 'user',
            content: prompt,
        }
    ],
    model: "gpt-4.1-nano",
    temperature: 0.3,
    max_completion_tokens: 150,
});
//console.log(completion);
const content = completion.choices[0].message.content;
if (!content) {
    throw new Error("La respuesta de OpenAI no contiene contenido.");
}
const jsonResp = JSON.parse(content);
return jsonResp;

}