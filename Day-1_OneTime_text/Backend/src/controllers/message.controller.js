const express = require('express');
const Message = require('../models/message.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { nanoid } = require('nanoid');
const asyncHandler = require('../utils/asyncHandler');
const { CHAR_LIMIT } = require('../constants');



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
            const newToken = nanoid(6);

            const createMessage = await Message.create({
                message: text,
                token: newToken
            });

            return res.status(201).json(
                new ApiResponse(201, createMessage, "Message Saved Successfully")
            )
        } catch(error) {
            if(error.code == 11000){
                retires++;
                continue;
            }

            throw new ApiError(500, "Something went wrong while saving the message")
        }
    };

    throw new ApiResponse(500, "Failed to generate unique token after multiple attemps")

});

const getMessage = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if(!token.trim())
        throw new ApiError(400, "URL is invalid");

    const fetchedData = await Message.findOneAndDelete(token);

    if(fetchedData == null)
        throw new ApiError(404, "Not data found");

    return res.status(201).json(
        new ApiResponse(201, fetchedData, "Message Found successfully")
    )
});



module.exports = {
    newMessageAdd,
    getMessage
}