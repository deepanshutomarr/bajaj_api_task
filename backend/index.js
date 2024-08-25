const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Predefined User Details
    const fullName = "Deepanshu";
    const dob = "25052003";  // Use the correct date of birth format
    const user_id = `${fullName}_${dob}`;
    const email = "tomardeepanshu12@gmail.com";
    const roll_number = "21bit0383";

    // Validation: Check if data is an array
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ 
            is_success: false, 
            user_id, 
            email, 
            roll_number 
        });
    }

    // Process input to separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    // Construct the response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
