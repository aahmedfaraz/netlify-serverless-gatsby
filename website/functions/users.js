exports.handler = async (event, context) => {
    console.log(`Inside Serverless Function >> {\nRequest:${event.httpMethod}\n${event.body !== undefined ? `Body:${event.body}` : ''}}`);
    switch(event.httpMethod){
        case 'GET':
            return {
                statusCode: 200,
                body: JSON.stringify([
                    {
                        name: "Ahmed Faraz",
                        profession: "Software Engineer",
                        type: "default"
                    },
                    {
                        name: "Ahmed Faraz 2",
                        profession: "Astronaut",
                        type: "default"
                    }
                ])
            };
        case 'POST':
            const newUser = JSON.parse(event.body);
            newUser.type = 'posted';
            return {
                statusCode: 200,
                body: JSON.stringify(newUser)
            };
    }
}