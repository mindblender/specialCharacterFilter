/**
 * jQuery Restrict Special Characters plug-in
 * Alerts the user when they enter an invalid character
 * 
 * @author Jeff Sittler
 * @version 1.0
 * 
 * @param {Object}   options    Various options that the user can pass in to override the default settings.
 *                              noStyle     Flag to set if the plug-in should set an error style or not on the field.  Defualt: false
 *                              errorStyle  Error class name to be appplied if nostyle is set to false.
 *                              errorMsg    Error message displayed in alert box or returned.
 *                              regex       Regular expression to test for valid characters.
 * @param {Function} callback   Callback function. If present, script will call that function.
 */
(
    function($){
        $.fn.specialCharacterFilter=function(options, callback){
            var settings=$.extend({
                noStyle:false,
                errorStyle: 'validationError',
                errorMsg:'The folder name must only contain:\n letters, numbers, underscores, hyphens, periods, parenthesis and spaces.',
                regex: /^[a-z0-9_.\- ()]+$/i,
                evt: 'blur',
                alert: true
            },options||{});
            
            return this.filter('input:text, textarea').each(function(){
                
                if(!this.specialChars){
                    $(this).bind(settings.evt,
                        function(evt){
                            var self = $(this);
                            if (this.value.length == 0) {
                                if (self.hasClass(settings.errorStyle)) {
                                    self.removeClass(settings.errorStyle);
                                }
                                return;
                            };
                            if (!settings.regex.test(this.value)) {
                                if (!settings.noStyle) {
                                    self.addClass(settings.errorStyle);
                                }
                                if (settings.alert === true) {
                                    alert(settings.errorMsg);
                                } else {
                                    if (callback) {
                                        callback(settings.errorMsg);
                                    } else {
                                        return settings.errorMsg;
                                    }
                                }
                            } else {
                                self.removeClass(settings.errorStyle);
                            }
                        });
                    this.specialChars=true;
                }
            }
        );
    };
})(jQuery);