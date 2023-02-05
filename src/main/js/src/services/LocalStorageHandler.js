const LocalStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service;
        }
        return _service;
    }
    /* Token */

    //To store token
    function _setToken(token) {
        localStorage.setItem("samay_token", token);
    }
    //To Access the stored token
    function _getAccessToken() {
        return localStorage.getItem("samay_token");
    }
    function _clearToken() {
        localStorage.removeItem("samay_token");
    }

    /* End of Token */

    /* Super Admin */

    //To store token
    function _setIsSuperAdmin(bool) {
        localStorage.setItem("isSuperAdmin", bool);
    }
    //To Access the stored token
    function _getIsSuperAdmin() {
        return localStorage.getItem("isSuperAdmin");
    }

    /* End of Super Admin */
    /* Super Admin */

    //To store token
    function _setPermissions(data) {
        let tempPerms = JSON.stringify(data);
        localStorage.setItem("permissions", tempPerms);
    }
    //To Access the stored token
    function _getPermissions() {
        return JSON.stringify(localStorage.getItem("Permissions"));
    }

    /* End of Super Admin */
    /* storing draft data */
    //To store draft
    function _setBatchDraft(data) {
        let tempPerms = JSON.stringify(data);
        localStorage.setItem("batch_draft", tempPerms);
    }
    //To Access the stored draft
    function _getBatchDraft() {
        return JSON.parse(localStorage.getItem("batch_draft"));
    }
    //To store draft
    function _setPoolDraft(data) {
        let tempPerms = JSON.stringify(data);
        localStorage.setItem("pool_draft", tempPerms);
    }
    //To Access the stored draft
    function _getPoolDraft() {
        return JSON.parse(localStorage.getItem("pool_draft"));
    }

    //Set Data
    function _setData(data) {
        localStorage.setItem("local_data", data);
    }
    //Get data
    function _getData() {
        return localStorage.getItem("local_data");
    }
    function _clear() {
        localStorage.clear();
        sessionStorage.clear();
    }

    return {
        getService: _getService,

        setToken: _setToken,
        getAccessToken: _getAccessToken,

        setIsSuperAdmin: _setIsSuperAdmin,
        getIsSuperAdmin: _getIsSuperAdmin,

        setPermissions: _setPermissions,
        getPermissions: _getPermissions,

        setBatchDraft: _setBatchDraft,
        getBatchDraft: _getBatchDraft,

        setPoolDraft: _setPoolDraft,
        getPoolDraft: _getPoolDraft,
        
        setData: _setData,
        getData: _getData,
        clearToken: _clearToken,
        clear: _clear,
    };
})();

export default LocalStorageService;
