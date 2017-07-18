
module.exports.accounts = [
    {
        id: 1,
        name:"Scrooge McDuck",
        username:"Scroogie",
        password:"money",
        permissions: [],
        transactions:[
            {
                tranactionId: 1024,
                value: "£10",
                recipient:"Donald Trump"
            },
            {
                transactionId: 2048,
                value: "£300",
                recipient:"Donald Duck"
            }
        ]
    },
    {
        id: 2,
        name:"Rick Sanchez",
        username:"PickleRick",
        password:"morty",
        permissions: [],
        transactions:[
            {
                tranactionId: 2345,
                value: "£20",
                recipient:"Morty"
            },
            {
                transactionId: 1234,
                value: "£5000000",
                recipient:"Squanchy"
            }
        ]
    },
]