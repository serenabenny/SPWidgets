define(["jquery"], function($){

    /**
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {jQuery|XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    var doesMsgHaveError = function(xmlMsg) {

// TODO: need to check if message is XML format. See http://stackoverflow.com/questions/8672597/how-should-i-test-if-an-object-is-a-xml-document-in-a-cross-browser-way

        var $msg        = $(xmlMsg),
            spErrCode   = $msg.find("ErrorCode"),
            response    = false;

        if (!spErrCode.length) {
            // Any "fauldcode" nodes?
            if ($msg.find("faultcode").length) {
                return true;
            }

            // Any CopyResult nodes with ErrorMessage
            if ($msg.find("CopyResult[ErrorMessage]").length){
                return true;
            }

            return false;
        }

        spErrCode.each(function(){
            if ( $(this).text() !== "0x00000000" && $(this).text() !== "NoError" ) {
                response = true;
                return false;
            }
        });
        return response;
    }; /* doesMsgHaveError() */

    return doesMsgHaveError;

});
