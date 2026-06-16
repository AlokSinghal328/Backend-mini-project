const express = require('express');
const Message = require('../models/message.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const crypto = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const { CHAR_LIMIT } = require('../constants');

const generateToken = () => {
    return crypto.randomBytes(6).toString('base64url').substring(0, 6);
};

// Make an API to make the data entry in database

const newMessageAdd = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if(!text) {
        throw new ApiError(400, "Message is required");
    }

    if(text.length > CHAR_LIMIT)
        throw new ApiError(400, "Message exceeds Char limit");


    let retries = 0;

    while(retries < 5){
        try{
            const newToken = generateToken();

            const createMessage = await Message.create({
                message: text,
                token: newToken
            });

            return res.status(201).json(
                new ApiResponse(201, createMessage, "Message Saved Successfully")
            )
        } catch(error) {
            if(error.code == 11000){
                retries++;
                continue;
            }

            throw new ApiError(500, "Something went wrong while saving the message")
        }
    };

    throw new ApiError(500, "Failed to generate unique token after multiple attempts")

});

const getMessage = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if(!token.trim())
        throw new ApiError(400, "URL is invalid");

    const fetchedData = await Message.findOneAndDelete({ token });

    if(fetchedData == null)
        throw new ApiError(404, "No data found");

    return res.status(200).json(
        new ApiResponse(200, fetchedData, "Message Found successfully")
    )
});



module.exports = {
    newMessageAdd,
    getMessage
}