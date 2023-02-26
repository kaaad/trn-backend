const bcrypt = require('bcrypt')
const Merchants = require('../models/merchantModel')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const otpGenerator = require('otp-generator')
const sendMail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')


const merchantCtrl = {
    merchantPage: async (req,res) => {
        try {
            const { token, webhook, amount } = req.body

            const decoded = jwt.verify(token, `${process.env.ACTIVE_TOKEN}`)

            const { merchant } = decoded

            if(!merchant) return res.status(400).json({msg: "Invalid Authentication"})

            if(!validateMerchant(webhook,amount)) return res.status(400).json({msg: "Invalid Data"})

            res.json({
                msg: "Go to login page"
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req,res) => {
        try {
            const { email, password } = req.body

            const merchant = await Merchants.findOne({ email })
            if(!merchant) return res.status(400).json({msg: "Incorrect email or password"})

            loginUser(merchant,password,res)

        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    verifyOtp: async (req,res) => {
        try {
            const { email,otp } = req.body

            const merchant = await Merchants.findOne({ email });
            if(!merchant) return res.status(400).json({msg: "User does not exist"})

            if(merchant && merchant.otp !== otp) {
                return res.status(400).json({msg: "Invalid OTP"})
            } else {
                generateToken(merchant._id,res)
            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = merchantCtrl;

async function loginUser (merchant, password, res) {
    const isMatch = await bcrypt.compare(password, merchant.password)
    if(!isMatch) return res.status(400).json({msg:"Incorrect Email or Password"})

    const code = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, digits: true })

    await sendMail(merchant.email, code)
    await Merchants.findOneAndUpdate({_id: merchant._id}, {
        otp: code
    })

    res.json({msg: "A verification email has been sent"})
}

async function generateToken (id,res) {
    const access_token = generateAccessToken({id})
    const refresh_token = generateRefreshToken({id}, res)

    await Merchants.findOneAndUpdate({_id: id}, {
        rf_token: refresh_token
    })

    return res.json({
        msg: "login Success",
        access_token
    })
}