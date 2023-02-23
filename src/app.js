const express=require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const {Configuration,OpenAIApi}=require('openai')




const app=express()
const PORT=process.env.port||5000;
const cors=require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use(bodyParser.json({limit: '50mb'}))
const configuration=new Configuration({
    apiKey:process.env.OPEN_AI_KEY
})

const openai=new OpenAIApi(configuration)


app.post('/find-complexity',async (req,res)=>{

    try {

        let input=`${req.body.text}+\n\nThe time complexity of this function is.`
        const response=await openai.createCompletion({
            model: "text-davinci-003",
            prompt: input,
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"]

        });

                res.status(201)
                res.send({
                    "message":"sucess",
                    "data":response.data.choices[0].text
                })


    } catch (error) {

        
    }
    
})

app.listen(PORT,()=>{
    console.log(`Listening To Port :${PORT}`)
})
