const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req,res)=>{
    res.status(200).json({message:"Get Goals"})
})

const setGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `set goals`})
})

const updateGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `Update goals ${req.params.id}`})
})
const deleteGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `Deleted goals ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}