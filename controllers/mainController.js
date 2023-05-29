import { LogError } from 'concurrently';
import Owner  from '../models/Owners.js';
import User  from '../models/User.js';
///*************************************************************************************************/
const userRequest = async (req,res) =>{
    const {name,age,phoneNum,driverLicense, userEmail,vehicle, userID} = req.body;
    const request = {
        name:name,
        age:age,
        phoneNum:phoneNum,
        driverLicense:driverLicense,
        userEmail:userEmail,
        vehicle:vehicle,
        userId: userID
    }
    try{
        await Owner.find().then((owners)=>{ // we find the id of the owner with the lowest requests and add the re
            //to the owners requests list.
            owners.sort((a,b) => a.requests.length - b.requests.length);// sort by requests length
            return Owner.updateOne(
                { _id: owners[0]._id }, //grab the first owner that has the least number of requests
                { $push: { requests: request }}//push the user request onto the queue
            );
        })
    }
    catch(err){
        res.status(500).send();
    }    
}
///*************************************************************************************************/
const ownerRequest = async (req,res)=>{
    const {id} = req.body;

    await Owner.find({_id:id}).then((foundOwner)=>{
        const requests = foundOwner[0].requests
        res.status(200).json({requests});
    })  
}
///*************************************************************************************************/
//This can be improved by having just one function that handles both approved and denied requests
//This is much better now.
const updateDB = async (req,res)=>{
    const {approved, token, userId, vehicle} = req.body;

    const userReq = {
        status:false,
        vehicle:vehicle   
    };
    console.log(req.body);

    //the ID is the managers ID and the name is the name of the user who requested
    if(approved){
        userReq.status = true;
    try{
        //first we need to go to the User and append the request for the car into the users Mycars array
        await User.updateOne(
            {_id:userId},
            {$push: {requests: userReq}});
        //then we need to go to the Owner and remove the request that was approved via the userId
        await Owner.updateOne(
            { _id: token.id },
            { $pull: { requests: { userId: userId }}});
        }catch(err){
            if(!err){
                res.status(200).send();
            }
            else{
                res.status(400).send();
            }
        }
    }
    else{//request not approved means we have to append a denied request to the users requests array.
        try{
            await User.updateOne(
                {_id:userId},
                {$push: {requests: userReq}});
    
            await Owner.updateOne(
                { _id: token.id },
                { $pull: { requests: { userId: userId }}});
        }catch(err){
            res.status(400).send();
        }
    }
}
const getCars = async(req,res) =>{
    const {id} = req.body;

    
    await User.find({_id:id}).then((foundUser)=>{
        if(foundUser){
            const requests = foundUser[0].requests;
            res.status(200).json({requests});
        }
        else{
            res.status(400).send();
        }
    })
    
   
}
export {userRequest, ownerRequest,updateDB,getCars};
    