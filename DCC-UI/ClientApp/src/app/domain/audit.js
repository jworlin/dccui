"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Audit = /** @class */ (function () {
    function Audit(id, registrationRequestId, logicAppId, data, status, type, eventAt) {
        this.id = id;
        this.registrationRequestId = registrationRequestId;
        this.logicAppId = logicAppId;
        this.data = data;
        this.status = status;
        this.type = type;
        this.eventAt = eventAt;
    }
    return Audit;
}());
exports.Audit = Audit;
//# sourceMappingURL=audit.js.map