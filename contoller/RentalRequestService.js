const PropertyModel = require('./PropertyModel');
const RentalRequestModel = require('./RentalRequestModel');;

class RentalRequestService {
    constructor() {
    }

       async  updateRentalRequest(rentalRequestId, userId) {
            var rentalRequestModelInst = new RentalRequestModel();
            var propertyModelInst = new PropertyModel();
            let rentalRequest = await rentalRequestModelInst.findRentalRequest({rentalRequestId, requestApprovalDone: false});
            if(rentalRequest.length <= 0){
                return Promise.reject("Rental request not found or is approved already");
            }
            if(rentalRequest[0].ownerUserId !== userId){
                return Promise.reject("Rental request does not belong to the logged in user");
            }
            await propertyModelInst.updateProperty(rentalRequest[0].propertyId, { availability: false, tenantUserId: rentalRequest[0].tenantUserId});
            return rentalRequestModelInst.updateRentalRequest(rentalRequestId, { requestApprovalDone: true });
        }

   

    async createRentalRequest(tenantUserId, data) {
        let propertyModelInst = new PropertyModel();
        var rentalRequestModelInst = new RentalRequestModel();
        try {
            let rentalRequest = await rentalRequestModelInst.findRentalRequest({ propertyId: data.propertyId , requestApprovalDone: true });
            console.log(">>rentalRequest>>", rentalRequest)
            if(rentalRequest && rentalRequest.length){
                return Promise.reject("Property is not available");
            } 
            let property = await propertyModelInst.findProperty({ propertyId: data.propertyId, availability: true });
            if (property && property.length) {
                data.ownerUserId = property[0].userId;
                data.tenantUserId = tenantUserId;
                data.requestApprovalDone = false;
                return rentalRequestModelInst.createRentalRequest(tenantUserId, data);
            } else {
                return Promise.reject("Property Not found")
            }
        } catch (e) {
            console.log("Error in create rental request", e)
            return Promise.reject("Property Not found or this property is not available")
        }
    }

    findRentalRequest(filter) {
        let dbFilter = {};
        if (filter.requestApprovalDone) {
            dbFilter.requestApprovalDone = filter.requestApprovalDone;
        }
        if (filter.rentalRequestId) {
            dbFilter.rentalRequestId = filter.rentalRequestId;
        }
        if (filter.tenantUserId) {
            dbFilter.tenantUserId = filter.tenantUserId;
        }
        if (filter.propertyId) {
            dbFilter.propertyId = filter.propertyId;
        }
        if (filter.ownerUserId) {
            dbFilter.ownerUserId = filter.ownerUserId;
        }

        var rentalRequestModelInst = new RentalRequestModel();
        return rentalRequestModelInst.findRentalRequest(dbFilter);
    }
}


module.exports = RentalRequestService;
