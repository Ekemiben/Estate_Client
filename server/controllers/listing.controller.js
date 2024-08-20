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


// Define an asynchronous function to get listings from the database
export const getListings = async (req, res, next) => {
    try {
      // Parse 'limit' from query parameters, default to 9 if not provided
      const limit = parseInt(req.query.limit) || 9;
  
      // Parse 'startIndex' from query parameters, default to 0 if not provided
      const startIndex = parseInt(req.query.startIndex) || 0;
  
      // Get 'offer' from query parameters
      let offer = req.query.offer;
  
      // If 'offer' is not provided or is 'false', set it to include both true and false values
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      // Get 'furnished' from query parameters
      let furnished = req.query.furnished;
  
      // If 'furnished' is not provided or is 'false', set it to include both true and false values
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      // Get 'parking' from query parameters
      let parking = req.query.parking;
  
      // If 'parking' is not provided or is 'false', set it to include both true and false values
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      // Get 'type' from query parameters
      let type = req.query.type;
  
      // If 'type' is not provided or is 'all', set it to include both 'sale' and 'rent'
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      // Get 'searchTerm' from query parameters, default to an empty string if not provided
      const searchTerm = req.query.searchTerm || '';
  
      // Get 'sort' from query parameters, default to sorting by 'createdAt' if not provided
      const sort = req.query.sort || 'createdAt';
  
      // Get 'order' from query parameters, default to 'desc' (descending) if not provided
      const order = req.query.order || 'desc';
  
      // Query the database to find listings matching the criteria
      const listings = await Listing.find({
        // Search for listings where the name matches the searchTerm (case insensitive)
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        // Sort the results by the 'sort' field in the specified 'order'
        .sort({ [sort]: order })
        // Limit the number of results returned
        .limit(limit)
        // Skip the number of results specified by 'startIndex'
        .skip(startIndex);
  
      // Send the results back as a JSON response with status code 200
      return res.status(200).json(listings);
    } catch (error) {
      // If there's an error, pass it to the next middleware function
      next(error);
    }
  };
  
