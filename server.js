const express = require('express')
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'copewithcovid'
    }
});

const app = express();

app.use(express.json());
app.use(cors());




const database = {
    entities: [
        {
            kind: 'Medical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Amrapali Leisure Valley',
            description: 'Extra masks by a quantity of 4.',
            created: new Date()
        },
        {
            kind: 'Technical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Amrapali Leisure Valley',
            description: 'Can provide vehicle repair equipment.',
            created: new Date()
        },
        {
            kind: 'Supplies',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Ace Aspire',
            description: 'Can offer 10kgs of rice and 4 kgs of sugar.',
            created: new Date()
        },
        {
            kind: 'Medical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Shipra Riviera',
            description: 'Hand Sanitizers x 10',
            created: new Date()
        },
        {
            kind: 'Technical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Shipra Riviera',
            description: 'Can provide vehicle jump start.',
            created: new Date()
        },
        {
            kind: 'Supplies',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Ace Aspire',
            description: 'Water Bottles x 10',
            created: new Date()
        },
        {
            kind: 'Medical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Gaur City',
            description: 'Extra masks by a quantity of 4.',
            created: new Date()
        },
        {
            kind: 'Technical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Gaur City',
            description: 'Can provide assistance with electrical issues.',
            created: new Date()
        },
        {
            kind: 'Technical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Gaur City',
            description: 'Extra masks by a quantity of 4.',
            created: new Date()
        },
        {
            kind: 'Technical',
            email: 'lakshya_tyagi@icloud.com',
            phone: '8384081791',
            society: 'Amrapali Leisure Valley',
            description: 'Extra masks by a quantity of 4.',
            created: new Date()
        }
    ]
}

const shop_database = {
    entities: [
        {
            type: 'Medical',
            delivery_type: "Home Delivery",
            contact: '9599844401',
            shop_name: 'A1 Pharmacy',
            society_name: 'Amrapali Leisure Valley',
            description: 'Extra masks by a quantity of 4.',
            created: new Date()
        },
        {
            type: 'Groceries',
            delivery_type: "Home Delivery",
            contact: '9599844402',
            shop_name: 'A1 Groceries',
            society_name: 'Amrapali Leisure Valley',
            description: 'Large stock of milk.',
            created: new Date()
        },
        {
            type: 'Medical',
            delivery_type: "Pick-up",
            contact: '9599844409',
            shop_name: 'A1 Pharmacy',
            society_name: 'Amrapali Leisure Valley',
            description: 'Restocked with cough and cold medicine.',
            created: new Date()
        },
        {
            type: 'Hygiene',
            delivery_type: "Home Delivery",
            contact: '9599844406',
            shop_name: 'Bean Groceries',
            society_name: 'Amrapali Leisure Valley',
            description: 'Lizol restocked',
            created: new Date()
        },
        {
            type: 'Fruits/Vegetables',
            delivery_type: "Home Delivery",
            contact: '9599844408',
            shop_name: 'Grocery Mart',
            society_name: 'Amrapali Leisure Valley',
            description: '40 kgs of Bananas and 12 kgs of mangoes recieved.',
            created: new Date()
        },
        {
            type: 'Fruits/Vegetables',
            delivery_type: "Pick-Up",
            contact: '9599844401',
            shop_name: 'A1 Fruits',
            society_name: 'Amrapali Leisure Valley',
            description: '40 kgs of oranges. ',
            created: new Date()
        }

    ]
}

const result = []


app.post('/register', (req, res) => {
    const {kind, email, phone, society, description} = req.body;
    db('residents')
    .returning('*')
    .insert({
        kind: kind,
        email: email,
        phone: phone,
        society: society.toLowerCase(),
        description: description
    })
    .then(residents => {
        res.json(residents[0]);
    })
    .catch(err => res.status(400).json('Unable to accept submission.'))
})



app.post('/registerShop', (req, res) => {
    const {type, delivery_type, contact, shop_name, society, description} = req.body;
    db('shops')
    .returning('*')
    .insert({
        type: type,
        delivery_type: delivery_type,
        contact: contact,
        shop_name: shop_name,
        society_name: society.toLowerCase(),
        description: description
    })
    .then(shops => {
        res.json(shops[0]);
    })
    .catch(err => res.status(400).json('Unable to accept submission.'))
})



app.post('/findService', (req,res) => {
    const {societyName} = req.body;

    db.select('*').from('residents').where({
        society: societyName.toLowerCase()
    })
    .then(residents => {
        res.json(residents)
    })
    .catch(err => res.status(400).json("Unable to fetch data."))
})


app.post('/findShop', (req, res) => {
    const {societyName} = req.body;

    db.select('*').from('shops').where({
        society_name: societyName.toLowerCase()
    })
    .then(shops => {
        res.json(shops)
    })
    .catch(err => res.status(400).json("Unable to fetch data."))

})


app.post('/vulnerabilityAnalysis', (req, res) => {
    const {ques2, ques3, ques4, ques5, ques6, ques7, ques8,ques9,ques10} = req.body;
    

    const marks_ques2 = parseInt(ques2);
    const marks_ques3 = parseInt(ques3);
    const marks_ques4 = parseInt(ques4);
    const marks_ques5 = parseInt(ques5);
    const marks_ques6 = parseInt(ques6);
    const marks_ques7 = parseInt(ques7);
    const marks_ques8 = parseInt(ques8);
    const marks_ques9 = parseInt(ques9);
    const marks_ques10 = parseInt(ques10);

    const total =
             marks_ques2 +
             marks_ques3 +
             marks_ques4 +
             marks_ques5 +
             marks_ques6 +
             marks_ques7 +
             marks_ques8 +
             marks_ques9 +
             marks_ques10;
    
    result.push(total);
    res.json(result[result.length-1])
})

app.post('/getResult', (req, res) => {
    res.json(result[result.length-1])
})



app.listen(3005, () => {
    console.log('The server is running on port 3005');
})