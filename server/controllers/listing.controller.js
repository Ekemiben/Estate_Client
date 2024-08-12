import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next)=>{
    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    }catch(error){
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found")); // Changed status code to 404
        }
        if (req.user.id !== listing.userRef.toString()) { // Ensure IDs are compared as strings
            return next(errorHandler(403, "You can only delete your own listing")); // Changed status code to 403
        }
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json("Listing was deleted successfully"); // Fixed typo ("Lisintg")
    } catch (error) {
        next(error);
    }
};

export const updateListing = async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);
    console.log(listing);

    if(!listing){
        return next(errorHandler(404, "Listing not found"))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(404, "You can only update your listing"))
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body,{new:true})
        res.status(200).json(updatedListing);
        console.log(updatedListing)
    } catch (error) {
        next(error)
    }
 
}

export const getListing = async(req, res, next)=>{
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}
