app.service('validateSportsmanData', function() {
    this.validData = function (data) {
            var reEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            var id=parseInt(data.id);
            var phone =parseInt(data.phone);
            var email=String(data.email);
            var firstname=String(data.firstname);
            var lastname= String(data.lastname);
            var idCoach=parseInt(data.idCoach);
            var address =String(data.address);

            if(address.length<1)
                return false;

            if(!(!isNaN(id)&& id.toString().length==9))
                return false;

            if(!(isNaN(parseInt(firstname))))
                return false;

            if(!isNaN(parseInt(lastname)))
                return false;

            if(!(!isNaN(idCoach)&& idCoach.toString().length==9))
                return false;

            if(!(!isNaN(phone) && phone.toString().length==10))
                return false;

            if (!email.match(reEmail))
                return false;

            return true;
        }

});