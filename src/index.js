import express, { urlencoded } from 'express';
// import helmet from 'helmet';
import cors from 'cors';
// import fileUpload from 'express-fileupload';
import chalk from 'cli-color';
 
const app = express();
 
 
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
 
const credential = new DefaultAzureCredential();
const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);
 
 
import { AzureOpenAI } from "openai";
 
const deployment = "o1";
const apiVersion = "2024-12-17-preview";
const baseURL = "https://my-openai-service1.openai.azure.com";
const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion,baseURL });
 
 
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Can you show me an example of how to construct a chat message payload?" }
];
 
 
const vv=async () => {
  try{
 
    const result = await client.chat.completions.create({
      model: "o1",
      messages,
      max_tokens: 5000,
    });
    console.log("result",result.choices[0].message.content);
  }
  catch(error){
    console.log("error",error);
  }
}
 
vv()
 
app.listen(process.env.PORT || 3002, () => {
  console.log(chalk.magentaBright.bold.italic(`server started at port ${process.env.PORT || 3002}`))
});