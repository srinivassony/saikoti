const { body } = require('express-validator');

let phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
let emailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const add = () =>
{
    return [
        body('password').not().isEmpty().withMessage('Password is required').trim().isLength({max: 15}).withMessage('Password maximum character limit is 15'),
        body('dob').not().isEmpty().withMessage('Date of birth is required'),
        body('country').not().isEmpty().withMessage('Country is required').trim().isLength({max: 30}).withMessage('Contury maximum character limit is 30'),
        body('state').not().isEmpty().withMessage('State is required').trim().isLength({max: 30}).withMessage('Contury maximum character limit is 30'),
        body('gender').not().isEmpty().withMessage('Gender is required'),
        body('email').custom( email => {      
                
           if(email && !(email.match(emailValidation)))
            {
                throw new Error('Invalid email address')   
            }
            else if (email && email.length > 50)
            {
                throw new Error('Email maximum character limit is 50')
            }
            else if (!email) 
            {
                throw new Error('Email is required')
            }    
                                                                    
            return true
        }), 
        body('phone').custom( phone => {            

            if(phone && !(phone.toString().match(phoneValidation)))
            {
                throw new Error('Invalid phone number')     
            }
            else if (!phone)
            {
                throw new Error('Phone number is required')     
            }
                                                                        
            return true
        }), 
         body('userName').trim().not().isEmpty().withMessage('First name is required').custom( userName => {            
                
            if(userName.toString().length < 2 )
            {
                throw new Error( 'User name minimum character limit is 2')   
            }
            else if(userName.toString().length > 30 )
            {
                throw new Error( 'User name maximum character limit is 30')   
            }
            else if(!userName)
            {
                throw new Error( 'User name is required')   
            }
                                                                        
            return true
        })
    ]
};

module.exports = {
    add
}