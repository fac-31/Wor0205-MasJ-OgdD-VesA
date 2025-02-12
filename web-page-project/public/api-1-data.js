async function getFacts(country_facts, name, age, country) {
    const content = `Tell me roughly how popular the name ${name} is in this ${country}. Please also
    tell me three interesting facts about that ${country} but keep the overall response to less than 100 words`;
    let response = await country_facts.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "assistant",
                content: content
            }
        ],
        store: true
    })

    return response.choices[0].message.content
};
module.exports = { getFacts }