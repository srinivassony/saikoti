function validateContactForm() 
{
    var name = document.contactForm.name.value;

    if (!name) 
    {
        document.getElementById("validationError").innerHTML = "Name is required.";
        return false;
    } 
    else if(name.length <= 2)
    {
        document.getElementById("validationError").innerHTML = "Character limit is greater than two.";
        return false;
    }
    else 
    {
        return true;
    }
}  