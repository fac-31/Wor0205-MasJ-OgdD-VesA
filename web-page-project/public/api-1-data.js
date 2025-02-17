async function getFacts(country_facts, name, age, country) {
    const content = `Tell me roughly how popular the name ${name} is in this ${country}. Please also
    tell me three interesting facts about that ${country} but keep the overall response to less than 100 words`;

   let jsonSchema = {
        "type": "object",
        "properties": {
          "namePopularity": {
            "type": "string",
            "description": "A short statement about the popularity of the name in the specified country."
          },
          "countryFacts": {
            "type": "array",
            "description": "A list of three interesting facts about the country.",
            "items": {
              "type": "string"
            },
            "minItems": 3,
            "maxItems": 3
          }
        },
        "required": ["namePopularity", "countryFacts"]
      };
      
    let response = await country_facts.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are a knowledgeable tour guide."
            },
            {
                role: "user",
                content: `Tell me about the popularity of the name "${name}" in ${country}. Also, provide three interesting facts about ${country}.`
            }
        ],
        tools: [ // OpenAI now uses 'tools' instead of 'functions' for function calling
            {
                type: "function",
                function: {
                    name: "getCountryFacts",
                    description: "Returns name popularity and three facts about a country.",
                    parameters: jsonSchema
                }
            }],
            tool_choice: { type: "function", function: { name: "getCountryFacts" } }

    })

    return JSON.parse(response.choices[0].message.tool_calls[0].function.arguments)
};
module.exports = { getFacts }