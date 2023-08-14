import axios from 'axios';

const apiUrl = "https://nelson-openai-webapp.azurewebsites.net/v1/chat/completions";
const chatGptApiKey = "test0521:0521:bf59b58a187941548bc065148d2d27e0:2023-05-15";

export async function askQuestion(question: string): Promise<string> {
  try {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: question
        }
      ]
    };

    const headers = {
      Authorization: `Bearer ${chatGptApiKey}`
    };

    const response = await axios.post(apiUrl, requestBody, { headers });
    const responseBody = response.data;
    return extractGptResponse(responseBody);
  } catch (error) {
    console.error(error);
    return "Unable to get a response from ChatGPT.";
  }
}

function extractGptResponse(responseBody: string): string {
  try {
    const jsonObject = JSON.parse(responseBody);
    const choices = jsonObject.choices;
    if (choices && choices.length > 0) {
      const choice = choices[0];
      const message = choice.message;
      return message.content;
    }
  } catch (error) {
    console.error(error);
  }
  return "No response from ChatGPT.";
}
