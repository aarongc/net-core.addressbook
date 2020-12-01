// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
$(function() {
    console.log( "ready!" );
    
    const dbName = 'address-book',
      table = sessionStorage.getItem(dbName),
      addressBook = [];
    
    if (table) {
        // Restore the contents of the text field
        JSON.parse(table).forEach(address => addressBook.push(address));
        console.log(addressBook);
    }

    const form = $('form.needs-validation'),    
      save = form.find('button[type="submit"]'),
      names = form.find('.name'),
      phones = form.find('.phone'),
      regexName = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
      regexUkPhone = /(^(?:0?(?:(\+|[00])44)?[2-3,7-9]\d{9})$)|(^(?:0?(?:(\+|[00])44)?[2-3,7-9]\d{8})$)/;

    names.each(function (e) {
      let name = $(this);
      
      name.keyup(function (e) {
        let value = $(this).val().trim(),
          isValid = regexName.test(value);
  
        name.attr('valid', isValid);
        
        if (isValid) {
          name.removeClass('invalid').next().removeClass('d-block');
        } else {
          name.addClass('invalid').next().addClass('d-block');
        }
      });
    });

    phones.each(function (e) {
      let phone = $(this);

      phone.keyup(function (e) {
        let value = $(this).val().trim(),
          splitValue = value.split(''),
          valid = (splitValue.includes('(') ? 
                  splitValue.filter(s => s === '(').length === 1
                  && splitValue.filter(s => s === ')').length === 1 : true);
        
        //https://en.wikipedia.org/wiki/UK_telephone_code_misconceptions
        //+44(0)203739182 - i'm not really sure if this is valid.
  
        if (value.indexOf('(0)') > 0) {
          value = value.replace('(0)', '');
        }
  
        let isValid = valid && regexUkPhone.test(value);
  
        phone.attr('valid', isValid);
  
        if (isValid) {
          phone.removeClass('invalid').next().removeClass('d-block');
        } else {
          phone.addClass('invalid').next().addClass('d-block');
        }
      });
    });    
    
    const modal = $('#modal-ModalCenter');

    save.click(function (e) {  
      e.preventDefault();
      const formControls = form.find('.form-controls');
      let valid = false;

      formControls.each(function (e) {
        let formControl = $(this),
          name = formControl.find('input.name'),
          phone = formControl.find('input.phone');

        if (name.hasClass('invalid') || phone.hasClass('invalid')) {
          openModal(0);
          return false;
        }          

        valid = addAddress(name, phone);
        
        if (!valid) {
          return false;
        }
      });
      
      if (valid) saveAddress();
    });   

    function addAddress(name, phone) {
      if (name && phone) {
        const newAddress = {
          name: name.val().trim(),
          phone: phone.val().trim()
        };

        if (!newAddress.name.length && !newAddress.phone.length) return true;
        
        if (addressBook.findIndex( ({ name }) => name === newAddress.name ) >= 0) {
          openModal(1);
          return false;
        }          
        
        addressBook.push(newAddress);

        return true;
      }

      return false;
    }

    function saveAddress() {
      sessionStorage.setItem(dbName, JSON.stringify(addressBook));
      openModal(2);      
    }

    function openModal(type) {
      const error = modal.find('#error'),
        exist = modal.find('#exist'),
        success = modal.find('#success');
     
      switch (type) {
        case 0:
          success.addClass('d-none');
          exist.addClass('d-none');
          error.removeClass('d-none');
          break;
        case 1:
          success.addClass('d-none');
          error.addClass('d-none');
          exist.removeClass('d-none');
          break;
        case 2:
          error.addClass('d-none');
          exist.addClass('d-none');
          success.removeClass('d-none');
          break;
      }
              
      modal.modal('show');
    }
});